// Video med forklaring: https://youtu.be/p8lsmmZfxtM 
/*
    Denne videoen viser hvordan du kan la brukere registrere seg på 
    nettsiden, med et kryptert passord. Vi bruker bcrypt for å få dette til. 
    I tillegg viser videoen hvordan du kan unngå feil med fremmednøkler, 
    slik vi så i forrige video. Dette blir håndtert med en ny rute som 
    henter alle postnummer fra databasen, for så at disse blir fylt ut i 
    HTML-en i form av et select-element.
*/

const express = require("express");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("bil.db");

const bcrypt = require("bcrypt"); // Importerer bcrypt, ein pakke for å m.a. hashe passord

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

// Rute for å hente alle postnummer
app.get("/postnummer", (req, res) => {
    const postnummer = db.prepare("SELECT postnummer, poststed FROM postadresse").all();
    res.json(postnummer);
});

// Rute for å legge til ein ny bil i databasen
app.post("/leggtilbil", (req, res) => {
    const { registreringsnummer, merke, modell, personnummer } = req.body;

    const stmt = db.prepare("INSERT INTO bil (personnummer, registreringsnummer, merke, modell) VALUES (?, ?, ?, ?)");
    const info = stmt.run(personnummer, registreringsnummer, merke, modell);

    res.json({ message: "Ny bil lagt til", info });
});

app.post("/leggtilperson", async (req, res) => {
    const { personnummer, fornavn, etternavn, postnummer, passord } = req.body;

    // Hash passordet med bcrypt
    const saltRounds = 10; // Antall runder med hashing
    const hashPassord = await bcrypt.hash(passord, saltRounds);

    const stmt = db.prepare("INSERT INTO person (personnummer, fornavn, etternavn, postnummer, passord) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(personnummer, fornavn, etternavn, postnummer, hashPassord);

    res.json({ message: "Ny person lagt til", info });
});

app.listen(PORT, () => {
    console.log(`Server køyrer: http://localhost:${PORT}`);
});