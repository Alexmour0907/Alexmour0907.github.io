// Video med forklaring: https://youtu.be/y2S_wVNT32g
/*
    Det einaste nye i denne fila er linje 15, som lar oss bruke public-mappa til å servere statiske filer.
*/

const express = require("express");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("bil.db");

const PORT = 3000;

// Middleware for å servere statiske filer fra public-mappen
app.use(express.static('public'));

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