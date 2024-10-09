const express = require('express');
const mysql = require('mysql2');

const app = express();

const myArticles = require('./models/Articles');
myArticles.sync();

// Création d'un endpoint
app.get('/api/data', (req, res) => {
    // Code pour récupérer les données de la base de données
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
}); 
