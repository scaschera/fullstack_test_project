const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { Sequelize, Op } = require('sequelize');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const myArticles = require('./models/Articles');

const syncTable = () => {
    myArticles.sync();

}

/******************************gestion des endpoint (deb ) */

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
