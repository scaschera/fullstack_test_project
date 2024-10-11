const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { Sequelize, Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const myArticles = require('./models/Articles');

const syncTable = () => {
    myArticles.sync();

}

function generateToken(payload) {
    const secretKey = 'votreCléSecrète';
    const token = jwt.sign(payload, secretKey);
    return token;
}

function verifyToken(token) {
    const secretKey = 'votreCléSecrète';
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
}

function verifyTokenMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    if (decoded) {
        req.user = decoded;
        next();
    } else {
        res.status(401).json({ error: 'Invalid token' });
    }
}

/******************************gestion des endpoint (deb ) */

app.post('/login', (req, res) => {
    // Vérification des informations d'identification
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'password') {
        const payload = { email };
        const token = generateToken(payload);
        res.json(
            {
                message: "Connexion réussie",
                user: {
                    nom: "admin",
                    prenom: "admin",
                    email: "admin@example.com",
                    token: token
                }
            });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/insert-row', verifyTokenMiddleware, (req, res) => {
    //Code pour créer un nouvel article
    myArticles.create({
        title: req.body.title,
        content: req.body.content
    }).then((data) => {
        res.json({ message: 'Article créé avec succès' });
        return;
    })
});



app.post('/delete-row', (req, res) => {
    //Code pour créer un nouvel article
    myArticles.destroy({
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Article supprimé avec succès' });
    })
});

app.post('/get-rows', (req, res) => {

    myArticles.findAll({
        where: {
            title: {
                [Op.like]: `%${req.body.q}%`

            }
        }
    }).then((data) => {
        res.json(data);
        return;
    })


});

app.post('/get-row', (req, res) => {
    myArticles.findOne({
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json(data);
        return;
    })
});

app.post('/update-row', (req, res) => {
    //Code pour mise à jour un article
    myArticles.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Article mise à jour !' });
        return;
    })
});

/******************************gestion des endpoint (deb ) */

syncTable();
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
