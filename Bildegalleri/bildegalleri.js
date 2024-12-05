let bilde = document.getElementById("bilde");

// bilde.src = "bilder/bil.jpg";



let bildeGalleri = [
    "Bie på blomst.png",
    "Brann stadion.png",
    "Pinguin.png",
];

let aktivtBilde = 0;

bilde.src = "./Bilder til bildegalleri/" + bildeGalleri[aktivtBilde];

setInterval(skiftBilde, 5000);

function skiftBilde() {
    aktivtBilde = aktivtBilde + 1;
    if (aktivtBilde >= bildeGalleri.length) {     // Sjekker om jeg kommer utenfor arrayan, altså ikke noe bilder
        aktivtBilde = 0;    
    }
    bilde.src = "./Bilder til bildegalleri/" + bildeGalleri[aktivtBilde]
}

let bildeGalleriMedTekst = [
    { "bilde" : "Bil.jpg",            "bildeTekst" : "Et Flott bilde av en bil"},
    { "bilde" : "Fjell_landskap.jpg", "bildeTekst" : "Fjell FTW!"}

];

console.log(bildeGalleriMedTekst[0].bilde);
console.log(bildeGalleriMedTekst[0].bildeTekst)
console.log(bildeGalleriMedTekst[1].bildeTekst)

document.getElementById("btnForrige").addEventListener("click", forrigeBilde);
document.getElementById("btnNeste").addEventListener("click", nesteBilde);

function nesteBilde() {
    if (aktivtBilde < bildeGalleri.length -1) {
        aktivtBilde++; 
        bildeKilde
    } else {
        
    }
}


