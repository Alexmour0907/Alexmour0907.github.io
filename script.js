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

/**
 * Tema-bytter funksjonalitet
 * Implementerer mørk/lys modus ved hjelp av localStorage for å huske brukerens preferanse
 * og data-attribute for å styre CSS-stilene som brukes.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Henter referanse til tema-bryteren
    const themeToggle = document.getElementById('theme-switch');
    
    /**
     * Sjekker etter lagret brukerpreferanse
     * Henter tema-preferansen fra localStorage og anvender den hvis den finnes.
     * Dette sikrer at brukerens valg blir husket mellom besøk.
     */
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        // Setter data-theme attributtet på dokumentets rot-element
        document.documentElement.setAttribute('data-theme', savedTheme);
        // Hvis lagret tema er 'light', markerer vi bryteren som avkrysset
        if (savedTheme === 'light') {
            themeToggle.checked = true;
        }
    }
    
    /**
     * Lytter etter endringer på tema-bryteren
     * Oppdaterer tema når brukeren endrer posisjon på bryteren og 
     * lagrer valget i localStorage for fremtidige besøk.
     */
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Aktiverer lyst tema
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            // Aktiverer mørkt tema
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});

        // Profile Card Tilt Effect
        document.addEventListener('DOMContentLoaded', function() {
            const profileCard = document.querySelector('.pc-card');
            const cardWrapper = document.querySelector('.pc-card-wrapper');
            const contactBtn = document.querySelector('.pc-contact-btn');
            
            if (!profileCard || !cardWrapper) return;
            
            let rafId = null;
            
            // Utility functions
            const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
            const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
            const adjust = (value, fromMin, fromMax, toMin, toMax) =>
                round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
            const easeInOutCubic = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
            
            // Update card transform
            function updateCardTransform(offsetX, offsetY, card, wrap) {
                const width = card.clientWidth;
                const height = card.clientHeight;
                
                const percentX = clamp((100 / width) * offsetX);
                const percentY = clamp((100 / height) * offsetY);
                
                const centerX = percentX - 50;
                const centerY = percentY - 50;
                
                const properties = {
                    '--pointer-x': `${percentX}%`,
                    '--pointer-y': `${percentY}%`,
                    '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
                    '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
                    '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
                    '--pointer-from-top': `${percentY / 100}`,
                    '--pointer-from-left': `${percentX / 100}`,
                    '--rotate-x': `${round(-(centerX / 5))}deg`,
                    '--rotate-y': `${round(centerY / 4)}deg`,
                };
                
                Object.entries(properties).forEach(([property, value]) => {
                    wrap.style.setProperty(property, value);
                });
            }
            
            // Smooth animation
            function createSmoothAnimation(duration, startX, startY, card, wrap) {
                const startTime = performance.now();
                const targetX = wrap.clientWidth / 2;
                const targetY = wrap.clientHeight / 2;
                
                function animationLoop(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = clamp(elapsed / duration);
                    const easedProgress = easeInOutCubic(progress);
                    
                    const currentX = adjust(easedProgress, 0, 1, startX, targetX);
                    const currentY = adjust(easedProgress, 0, 1, startY, targetY);
                    
                    updateCardTransform(currentX, currentY, card, wrap);
                    
                    if (progress < 1) {
                        rafId = requestAnimationFrame(animationLoop);
                    }
                }
                
                rafId = requestAnimationFrame(animationLoop);
            }
            
            // Event handlers
            function handlePointerMove(event) {
                const rect = profileCard.getBoundingClientRect();
                updateCardTransform(
                    event.clientX - rect.left,
                    event.clientY - rect.top,
                    profileCard,
                    cardWrapper
                );
            }
            
            function handlePointerEnter() {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                cardWrapper.classList.add('active');
                profileCard.classList.add('active');
            }
            
            function handlePointerLeave(event) {
                createSmoothAnimation(
                    600,
                    event.offsetX,
                    event.offsetY,
                    profileCard,
                    cardWrapper
                );
                cardWrapper.classList.remove('active');
                profileCard.classList.remove('active');
            }
            
            // Add event listeners
            profileCard.addEventListener('pointerenter', handlePointerEnter);
            profileCard.addEventListener('pointermove', handlePointerMove);
            profileCard.addEventListener('pointerleave', handlePointerLeave);
            
            // Contact button functionality
            if (contactBtn) {
                contactBtn.addEventListener('click', function() {
                    alert('Contact button clicked! You can integrate this with your contact section.');
                });
            }
            
            // Initial animation
            const initialX = cardWrapper.clientWidth - 70;
            const initialY = 60;
            updateCardTransform(initialX, initialY, profileCard, cardWrapper);
            createSmoothAnimation(1500, initialX, initialY, profileCard, cardWrapper);
        });
