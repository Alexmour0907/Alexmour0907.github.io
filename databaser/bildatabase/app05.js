// Video med forklaring: https://youtu.be/Fqi6RsVPOa4
/*
    Denne videoen viser hvordan du kan lage en rute i app.js-filen din som 
    tillater å legge til data i databasen. I tillegg blir det vist hvordan du lager 
    en nettside (i public-mappen), som bruker et skjema (form), litt enkel JS (await, async), 
    og ruten du lagde på serveren, for å kunne sette inn faktiske data.

    Merk at det blir vist litt om feilmeldinger og problemer som kan oppstå, men her er det mer arbeid å gjøre.

*/

const express = require("express");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("bil.db");

const PORT = 3000;

// Middleware for å servere statiske filer fra public-mappen
app.use(express.static('public'));

// Middleware for å parse JSON-data
app.use(express.json());

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

// Rute for å legge til ein ny bil i databasen
app.post("/leggtilbil", (req, res) => {
    const { registreringsnummer, merke, modell, personnummer } = req.body;

    const stmt = db.prepare("INSERT INTO bil (personnummer, registreringsnummer, merke, modell) VALUES (?, ?, ?, ?)");
    const info = stmt.run(personnummer, registreringsnummer, merke, modell);

    // console.log({ message: "Ny bil lagt til", info });
    res.json({ message: "Ny bil lagt til", info });
});

app.listen(PORT, () => {
    console.log(`Server køyrer: http://localhost:${PORT}`);
});