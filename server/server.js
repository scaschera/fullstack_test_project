const express = require('express');
const mysql = require('mysql2');

const app = express();

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test_backend'
});

// Création d'un endpoint
app.get('/api/data', (req, res) => {
    // Code pour récupérer les données de la base de données
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
}); 
