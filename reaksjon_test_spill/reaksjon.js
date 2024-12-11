let boks = document.getElementById("boks");

boks.addEventListener("click", startTest);

function startTest(){
    boks.style.backgroundColor = "red";
    boks.innerHTML = "Vent på grønt";
    
    const randomDelay = (Math.floor(Math.random() * 6) + 5) * 1000; // Random delay between 5 and 10 seconds
    setInterval()
}