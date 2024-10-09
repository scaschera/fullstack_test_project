const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const myArticles = require('./models/Articles');

const syncTable = () => {
    myArticles.sync();

}

// Création d'un endpoint
app.post('/insert-row', (req, res) => {
    //Code pour créer un nouvel article
    myArticles.create({
        title: req.body.title,
        content: req.body.content
    }).then((data) => {
        res.json({ message: 'Article créé avec succès' });
        return;
    })
});

syncTable();
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
