/**
 * Hovedinitialisering - Venter på at hele HTML-dokumentet er lastet inn
 * før JavaScript kjører for å unngå feil ved manipulering av DOM-elementer
 * som kanskje ikke er tilgjengelige ennå.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Henter referanser til hamburger-menyen og navigasjonen
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    
    /**
     * Hamburger-meny funksjonalitet
     * Legger til en hendelseslytter som aktiverer/deaktiverer menyen når brukeren klikker
     * på hamburger-ikonet. Dette gjøres ved å veksle 'active'-klassen på både
     * hamburger-elementet og navigasjonselementet.
     */
    hamburger.addEventListener('click', function() {
        // Legger til/fjerner 'active'-klassen for å animere hamburger-ikonet
        hamburger.classList.toggle('active');
        // Legger til/fjerner 'active'-klassen for å vise/skjule navigasjonsmenyen
        nav.classList.toggle('active');
    });
    
    /**
     * Lukk menyen når en lenke klikkes
     * Dette forbedrer brukeropplevelsen ved å automatisk lukke menyen
     * når brukeren har valgt et navigasjonselement.
     */
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            // Fjerner 'active'-klassen fra hamburger-ikonet for å tilbakestille det
            hamburger.classList.remove('active');
            // Fjerner 'active'-klassen fra navigasjonen for å lukke menyen
            nav.classList.remove('active');
        });
    });
});

/**
 * Fade-in animasjon funksjonalitet
 * Bruker IntersectionObserver API for å detektere når elementer kommer inn i
 * visningsområdet og animerer dem inn med en fade-effekt.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Henter alle elementer med 'fade-in' klassen som skal animeres
    const fadeElements = document.querySelectorAll('.fade-in');
    
    /**
     * Oppretter en IntersectionObserver
     * Dette API-et gir en effektiv måte å overvåke når elementer blir synlige
     * i visningsområdet uten å belaste nettleseren med mange scroll-hendelser.
     */
    const fadeObserver = new IntersectionObserver((entries) => {
        // Går gjennom hvert element som har endret synlighetsstatus
        entries.forEach(entry => {
            // Sjekker om elementet er synlig i visningsområdet
            if (entry.isIntersecting) {
                // Legger til 'visible'-klassen som utløser CSS-animasjonen
                entry.target.classList.add('visible');
                // Slutter å observere elementet etter at det er blitt synlig
                // for å spare ressurser og unngå unødvendig prosessering
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        // IntersectionObserver konfigurasjon
        root: null,        // Bruker visningsområdet som referanse
        threshold: 0.1,    // Elementet må være minst 10% synlig for å aktivere
        rootMargin: '0px 0px -50px 0px'  // Justerer grensen for når animasjonen utløses
                                         // (-50px betyr at den trigger litt før elementet 
                                         // er fullt synlig i bunnen av skjermen)
    });
    
    // Starter observering av alle fade-in elementer
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
});