tidlig utviklingsfase

// let boks = document.getElementById("boks");

// boks.addEventListener("click", startTest);

// function startTest(){
//     boks.style.backgroundColor = "red";
//     boks.innerHTML = "Vent på grønt";
    
//     const randomDelay = (Math.floor(Math.random() * 6) + 5) * 1000; // Random delay between 5 and 10 seconds
//     setInterval(showGreen, randomDelay)


// }

// function showGreen(){
//     boks.style.backgroundColor = "green";
//     boks.innerHTML = "Klikk!";
// }

SLUTT AV OPPRINELIGE KODE // VAR IKKE FERDIG UTVIKLET





VERSJON 1 (BETA)


// let boks = document.getElementById("boks");
// let allowClick = false; // Indikerer om det er lov å klikke
// let isRunning = false;  // Indikerer om testen er aktiv
// let timeoutId;          // Referanse til timeren

// boks.addEventListener("click", handleClick);

// function handleClick() {
//     if (!isRunning) {
//         // Start testen når den ikke kjører
//         startTest();
//     } else if (!allowClick) {
//         // Hvis brukeren trykker for tidlig
//         tooSoon();
//     } else {
//         // Hvis brukeren klikker riktig (grønn skjerm)
//         success();
//     }
// }

// function startTest() {
//     isRunning = true;
//     allowClick = false;

//     // Sett skjermen til rød
//     boks.style.backgroundColor = "red";
//     boks.innerHTML = "Vent på grønt";

//     // Start en tilfeldig timer mellom 5 og 10 sekunder
//     const randomDelay = (Math.floor(Math.random() * 6) + 5) * 1000;
//     timeoutId = setTimeout(() => {
//         showGreen();
//     }, randomDelay);
// }

// function tooSoon() {
//     // Avbryt eventuell aktiv timer
//     clearTimeout(timeoutId);
//     isRunning = false;

//     // Vis lyseblå skjerm med melding
//     boks.style.backgroundColor = "lightblue";
//     boks.innerHTML = "For tidlig! Trykk for å starte på nytt.";
// }

// function showGreen() {
//     allowClick = true; // Nå er det lov å klikke

//     // Sett skjermen til grønn
//     boks.style.backgroundColor = "green";
//     boks.innerHTML = "Klikk!";
// }

// function success() {
//     isRunning = false;

//     // Vis melding for vellykket reaksjon
//     boks.style.backgroundColor = "lime";
//     boks.innerHTML = "Bra reaksjon! Trykk for å starte på nytt.";
// }
SLUTT AV VERSJON 1(BETA)