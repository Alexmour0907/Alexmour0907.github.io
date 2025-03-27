// Video med forklaring: https://youtu.be/tS0khfvhBqs

const express = require("express");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("bil.db");

const PORT = 3000;

// Eksempel på å hente brukarar frå databasen (besøk http://localhost:3000/personer)
app.get("/personer", (req, res) => {
    const users = db.prepare("SELECT * FROM person").all();
    res.json(users);
});

// Eksempel på ein meir avansert spørring som hentar data frå fleire tabellar
app.get("/personer-alt", (req, res) => {
    const biler = db.prepare("SELECT person.fornavn, person.etternavn, person.postnummer, postadresse.poststed FROM person INNER JOIN postadresse ON person.postnummer = postadresse.postnummer").all();
    res.json(biler);
});

// Alternativ 1, hente bilane til ein gitt brukar (IKKJE ANBEFALT)
// Enkel rute som hentar ut alle bilane til Halvard med personnummer 67567657575
// NB: Dette er _IKKJE_ slik me gjer det til vanleg, men viser prinsippet for å hente ut noko spesifikt
app.get("/halvard", (req, res) => {
    const biler = db.prepare("SELECT * FROM bil WHERE personnummer = 67567657575").all();
    res.json(biler);
});

// Alternativ 2, hente bilane til ein gitt brukar (vanleg, men bruk heller alternativ 3)
// Hent alle biler til ein gitt person ved å bruke query parameter
// Besøk til dømes http://localhost:3000/bilerTil?personnummer=67567657575 for å sjå alle bilane til Halvard
app.get("/bilerTil", (req, res) => {
    const personnummer = req.query.personnummer;
    if (!personnummer) {
        return res.status(400).json({ error: "Personnummer er påkrevd" });
    }
    const biler = db.prepare("SELECT * FROM bil WHERE personnummer = ?").all(personnummer);
    res.json(biler);
});

// Alternativ 3, hente bilane til ein gitt brukar (ANBEFALT)
// Dette er ei rute som gjer det same som over, men no med ein parameter som spesifiserer personnummeret
// Hent alle biler til en gitt person: 
// Besøk til dømes http://localhost:3000/personer/67567657575/biler for å sjå alle bilane til Halvard
// (Me lærer seinare korleis me kan benytte velge noko frå nettsida for å hente ut data)
app.get("/personer/:id/biler", (req, res) => {
    const personId = req.params.id;
    const biler = db.prepare("SELECT * FROM bil WHERE personnummer = ?").all(personId);
    res.json(biler);
});

app.listen(PORT, () => {
    console.log(`Server køyrer: http://localhost:${PORT}`);
});