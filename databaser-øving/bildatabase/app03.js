// Video med forklaring: https://www.youtube.com/watch?v=kqha32VOwAY 
// NB: Det einaste nye her er at me tillet alle forespørsler med cors-middleware (linje 14 og 15).
// Dette gjer me for å kunne teste API-et vårt frå ei anna side enn der serveren køyrer.
// Me må tenke gjennom om det er trygt å tillate alle forespørsler i produksjon, altså: per no for testing!

const express = require("express");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("bil.db");

const PORT = 3000;

// Bruk cors-middleware
// CORS (Cross-Origin Resource Sharing): me konfigurerer serveren til å tillate forespørsler frå andre sider
const cors = require("cors");
app.use(cors()); // tillat alle forespørsler

// Eksempel på rute som hentar brukarar frå databasen (besøk http://localhost:3000/personer)
app.get("/personer", (req, res) => {
    const users = db.prepare("SELECT * FROM person").all();
    res.json(users);
});

// Eksempel på rute som hentar bilar frå databasen (besøk http://localhost:3000/biler)
app.get("/biler", (req, res) => {
    const cars = db.prepare("SELECT * FROM bil").all();
    res.json(cars);
});

app.listen(PORT, () => {
    console.log(`Server køyrer: http://localhost:${PORT}`);
});