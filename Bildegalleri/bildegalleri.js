let bilde = document.getElementById("bilde");


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
    { "bilde" : "TEST",   "bildeTekst" : "TEST NR1"},
    { "bilde" : "TEST",   "bildeTekst" : "TEST NR2"}

];

console.log(bildeGalleriMedTekst[0].bilde);
console.log(bildeGalleriMedTekst[0].bildeTekst)
console.log(bildeGalleriMedTekst[1].bildeTekst)






document.getElementById("btnForrige").addEventListener("click", forrigeBilde);
document.getElementById("btnNeste").addEventListener("click", nesteBilde);

function nesteBilde() {
    if (aktivtBilde < bildeGalleri.length -1) {
        aktivtBilde++; 
        bildeKilde = bilder[aktivtBilde]
        document.getElementById("bilde").src = bildeKilde;
        console.log(bildeKilde);
    } else {
        console.log("utenfor array.length")
        aktivtBilde = 0;
        document.getElementById("bilde").src = bilde[aktivtBilde]   
    }
}

function forrigeBilde{
    if (aktivtBilde > 0) {
        aktivtBilde = aktivtBilde - 1;
        bildeKilde = bilde
    } else {
        
    }
}


