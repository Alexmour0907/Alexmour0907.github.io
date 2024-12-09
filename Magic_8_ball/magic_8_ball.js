// let magic8Ball = {};

listOfAwnsers = ["nei_8-ball", "JA_8-Ball", "Tror_ikke_8-ball", "Selfølge_8-ball", "aldri_8-ball"];

let previousIndex = -1; // Variabel for å lagre forrige indeks

document.getElementById("btnSpør").addEventListener("click", spør);

function spør() {
    let tilfeldig;
    do {
        tilfeldig = Math.floor(Math.random() * listOfAwnsers.length);
    } while (tilfeldig === previousIndex); // Sjekk om tallet er likt det forrige

    previousIndex = tilfeldig; // Oppdater forrige indeks
    console.log(tilfeldig);
    document.getElementById("bilde").src = "/Magic_8_ball/Bilder_til_magic8ball/SVG/" + listOfAwnsers[tilfeldig] + ".svg";
}
