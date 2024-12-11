//START AV VERSJON 2 (I BRUK)

let boks = document.getElementById("boks");
let allowClick = false; // Indikerer om det er lov å klikke
let isRunning = false;  // Indikerer om testen er aktiv
let timeoutId;          // Referanse til timeren
let greenTime;          // Tidspunkt når skjermen blir grønn

boks.addEventListener("click", handleClick);

function handleClick() {
    if (!isRunning) {
        // Start testen når den ikke kjører
        startTest();
    } else if (!allowClick) {
        // Hvis brukeren trykker for tidlig
        tooSoon();
    } else {
        // Hvis brukeren klikker riktig (grønn skjerm)
        success();
    }
}

function startTest() {
    isRunning = true;
    allowClick = false;

    // Sett skjermen til rød
    boks.style.backgroundColor = "red";
    boks.innerHTML = "Vent på grønt";

    // Start en tilfeldig timer mellom 5 og 10 sekunder
    const randomDelay = (Math.floor(Math.random() * 6) + 5) * 1000;
    timeoutId = setTimeout(() => {
        showGreen();
    }, randomDelay);
}

function tooSoon() {
    // Avbryt eventuell aktiv timer
    clearTimeout(timeoutId);
    isRunning = false;

    // Vis lyseblå skjerm med melding
    boks.style.backgroundColor = "lightblue";
    boks.innerHTML = "For tidlig! Trykk for å starte på nytt.";
}

function showGreen() {
    allowClick = true; // Nå er det lov å klikke
    greenTime = Date.now(); // Lagre tidspunktet når skjermen blir grønn

    // Sett skjermen til grønn
    boks.style.backgroundColor = "green";
    boks.innerHTML = "Klikk!";
}

function success() {
    isRunning = false;
    allowClick = false;

    const reactionTime = Date.now() - greenTime; // Beregn reaksjonstiden

    // Vis reaksjonstiden til brukeren
    boks.style.backgroundColor = "lime";
    boks.innerHTML = `Din reaksjonstid var ${reactionTime} ms. Trykk for å starte på nytt.`;
}