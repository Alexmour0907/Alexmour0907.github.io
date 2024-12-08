let bilde = document.getElementById("bilde");

let bildeGalleri = [
    "Bie på blomst.png",
    "Brann stadion.png",
    "Pinguin.png",
];

let aktivtBilde = 0;
let intervalId; // Referanse til setInterval

// Setter første bilde
bilde.src = "./Bilder til bildegalleri/" + bildeGalleri[aktivtBilde];

// Funksjon for å starte bildegalleri med automatisk bytte
function startAutoSwitch() {
    intervalId = setInterval(skiftBilde, 7000);
}

// Starter automatisk bytte
startAutoSwitch();

function skiftBilde() {
    aktivtBilde = (aktivtBilde + 1) % bildeGalleri.length; // Loop til start
    bilde.src = "./Bilder til bildegalleri/" + bildeGalleri[aktivtBilde];
}

// Navigasjonsknapper
document.getElementById("btnForrige").addEventListener("click", () => {
    clearInterval(intervalId); // Stopp eksisterende interval
    forrigeBilde(); // Bytt til forrige bilde
    startAutoSwitch(); // Start nytt interval
});

document.getElementById("btnNeste").addEventListener("click", () => {
    clearInterval(intervalId); // Stopp eksisterende interval
    nesteBilde(); // Bytt til neste bilde
    startAutoSwitch(); // Start nytt interval
});

function nesteBilde() {
    if (aktivtBilde < bildeGalleri.length - 1) {
        aktivtBilde++;
    } else {
        aktivtBilde = 0; // Gå tilbake til første bilde
    }
    bilde.src = "./Bilder til bildegalleri/" + bildeGalleri[aktivtBilde];
}

function forrigeBilde() {
    if (aktivtBilde > 0) {
        aktivtBilde--;
    } else {
        aktivtBilde = bildeGalleri.length - 1; // Gå til siste bilde
    }
    bilde.src = "./Bilder til bildegalleri/" + bildeGalleri[aktivtBilde];
}



