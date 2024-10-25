const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { Sequelize, Op } = require('sequelize');
const { generateToken, verifyTokenMiddleware, cryptMdp } = require('./functions/auth');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const myArticles = require('./models/Articles');
const myUsers = require('./models/Users');
const myClients = require('./models/Clients');
const { sendEmail } = require('./functions/mail');

const syncTable = () => {
    myArticles.sync();
    myUsers.sync();
    myClients.sync();

    //creation de l'utilisateur admin si il n'exsite pas
    myUsers.findOne({ where: { email: 'admin@example.com' } }).then(user => {
        if (!user) {

            //generation d'un mot de passe
            let email_admin = 'admin@example.com';
            let password = Math.random().toString(36).slice(2);

            //hehooo

            myUsers.create({
                nom: 'admin',
                prenom: 'admin',
                email: email_admin,
                password: cryptMdp(password),
                droit: 'admin',
            });

            //envoi du mail avec les informations de connexion
            let from = 'noreply@localhost';
            let to = email_admin;
            let subject = 'Vos identifiants de connexion';
            let text = '';
            let html = `<h4>Bonjour, voici vos informations de connexion :</h4>
            <p>Email : admin@example.com</p>
            <p>Mot de passe : ${password}</p>`;
            sendEmail(from, to, subject, text, html);
        }
    });
}


/******************************gestion des endpoint (deb ) */

app.post('/login', (req, res) => {
    // Vérification des informations d'identification
    const { email, password } = req.body;

    myUsers.findOne({ where: { email } }).then(user => {
        if (!user) {
            res.status(401).json({ error: 'Mauvaise combinaison email et mot de passe' });
            return;
        }
        if (user.password !== cryptMdp(password)) {
            res.status(401).json({ error: 'Mauvaise combinaison email et mot de passe' });
            return;
        }
        const payload = { email };
        const token = generateToken(payload);
        res.json(
            {
                message: "Connexion réussie",
                user: {
                    id: user.id,
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    droit: user.droit,
                    token: token
                }
            });
    });

});

app.post('/check-pwd-user', verifyTokenMiddleware, (req, res) => {

    myUsers.findOne({ where: { id: req.body.id, password: cryptMdp(req.body.pwd) } }).then(user => {

        if (!user) {
            res.status(401).json({ error: 'Ancien mot de passe incorrect' });
            return;
        }
        res.json({ message: "ok" });
    });
});

app.post('/insert-row', verifyTokenMiddleware, (req, res) => {
    //Code pour créer un nouvel article
    myArticles.create({
        url_img: req.body.url_img,
        title: req.body.title,
        content: req.body.content,
        price: req.body.price,
        qte: req.body.qte
    }).then((data) => {
        res.json({ message: 'Article créé avec succès' });
        return;
    })
});

app.post('/delete-user', verifyTokenMiddleware, (req, res) => {

    myUsers.destroy({
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Utilisateur supprimé avec succès' });
        return;
    })

})

app.post('/add-user', verifyTokenMiddleware, (req, res) => {
    //Code pour créer un nouvel article
    myUsers.create({
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: cryptMdp(req.body.password),
        droit: req.body.droit
    }).then((data) => {

        //envoi du mail avec les informations de connexion
        let from = 'noreply@localhost';
        let to = req.body.email;
        let subject = 'Vos identifiants de connexion';
        let text = '';
        let html = `<h4>Bonjour, voici vos informations de connexion :</h4>
        <p>Email : ${req.body.email}</p>
        <p>Mot de passe : ${req.body.password}</p>`;
        sendEmail(from, to, subject, text, html);

        res.json({ message: 'Utilisateur créé avec succès' });
        return;
    })
});

app.post('/new-client', verifyTokenMiddleware, (req, res) => {
    //Code pour créer un nouveau client
    myClients.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        cp: req.body.cp,
        ville: req.body.ville,
        email: req.body.email,
        telephone: req.body.telephone,
        password: cryptMdp(req.body.password)
    }).then((data) => {

        //envoi du mail avec les informations de connexion
        let from = 'noreply@localhost';
        let to = req.body.email;
        let subject = 'Vos identifiants de connexion';
        let text = '';
        let html = `<h4>Bonjour, voici vos informations de connexion :</h4>
        <p>Email : ${req.body.email}</p>
        <p>Mot de passe : ${req.body.password}</p>`;
        sendEmail(from, to, subject, text, html);

        res.json({ message: 'Client créé avec succès' });
        return;
    })
});

app.post('/delete-row', verifyTokenMiddleware, (req, res) => {
    //Code pour créer un nouvel article
    myArticles.destroy({
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Article supprimé avec succès' });
    })
});

app.post('/delete-client', verifyTokenMiddleware, (req, res) => {
    //Code pour créer un nouvel article
    myClients.destroy({
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Client supprimé avec succès' });
    })
});

app.post('/get-rows', (req, res) => {

    myArticles.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${req.body.q}%` } },
                { content: { [Op.like]: `%${req.body.q}%` } },
                { id: { [Op.like]: `%${req.body.q}%` } }
            ]
        }
    }).then((data) => {
        res.json(data);
        return;
    })


});

app.post('/get-users', verifyTokenMiddleware, (req, res) => {

    myUsers.findAll({
        where: {
            [Op.or]: [
                { nom: { [Op.like]: `%${req.body.q}%` } },
                { prenom: { [Op.like]: `%${req.body.q}%` } },
                { email: { [Op.like]: `%${req.body.q}%` } }
            ]
        }
    }).then((data) => {
        const dataToSend = data.map((user) => {
            const { password, ...userWithoutPassword } = user.dataValues; // Suppression du mot de passe
            return userWithoutPassword;
        });
        res.json(dataToSend);
        return;
    })


});

app.post('/get-clients', verifyTokenMiddleware, (req, res) => {

    myClients.findAll({
        where: {
            [Op.or]: [
                { nom: { [Op.like]: `%${req.body.q}%` } },
                { prenom: { [Op.like]: `%${req.body.q}%` } },
                { email: { [Op.like]: `%${req.body.q}%` } }
            ]
        }
    }).then((data) => {
        const dataToSend = data.map((user) => {
            const { password, ...userWithoutPassword } = user.dataValues; // Suppression du mot de passe
            return userWithoutPassword;
        });
        res.json(dataToSend);
        return;
    })


});

app.post('/get-client', verifyTokenMiddleware, (req, res) => {
    //Code pour rechercher un article
    myClients.findOne({
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json(data);
        return;
    })
});

app.post('/update-user', verifyTokenMiddleware, (req, res) => {
    //Code pour modifier un utilisateur
    myUsers.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        droit: req.body.droit
    }, {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        myUsers.findOne({ where: { id: req.body.id } }).then((dataUser) => {
            const { password, ...userWithoutPassword } = dataUser.dataValues; // Suppression du mot de passe
            res.json(userWithoutPassword);
            return;
        })
        return;
    })

});

app.post('/update-client', verifyTokenMiddleware, (req, res) => {
    //Code pour modifier un utilisateur
    myClients.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        cp: req.body.cp,
        ville: req.body.ville,
        email: req.body.email,
        telephone: req.body.telephone
    }, {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        myClients.findOne({ where: { id: req.body.id } }).then((dataUser) => {
            const { password, ...userWithoutPassword } = dataUser.dataValues; // Suppression du mot de passe
            res.json(userWithoutPassword);
            return;
        })
        return;
    })

});

app.post('/update-user-pwd', verifyTokenMiddleware, (req, res) => {
    //Code pour modifier un utilisateur
    myUsers.update({
        password: cryptMdp(req.body.new_pwd)
    }, {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Mot de passe mis à jour !' });

        if (req.body.sendMailChangePwd) {
            //envoi du mail avec les informations de connexion
            let from = 'noreply@localhost';
            let to = req.body.email;
            let subject = 'Vos identifiants de connexion';
            let text = '';
            let html = `<h4>Bonjour, voici vos informations de connexion :</h4>
            <p>Email : ${req.body.email}</p>
            <p>Mot de passe : ${req.body.new_pwd}</p>`;
            sendEmail(from, to, subject, text, html);
        }

        return;
    })

});

app.post('/update-client-pwd', verifyTokenMiddleware, (req, res) => {
    //Code pour modifier un utilisateur
    myClients.update({
        password: cryptMdp(req.body.new_pwd)
    }, {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Mot de passe mis à jour !' });

        if (req.body.sendMailChangePwd) {
            //envoi du mail avec les informations de connexion
            let from = 'noreply@localhost';
            let to = req.body.email;
            let subject = 'Vos identifiants de connexion';
            let text = '';
            let html = `<h4>Bonjour, voici vos informations de connexion :</h4>
            <p>Email : ${req.body.email}</p>
            <p>Mot de passe : ${req.body.new_pwd}</p>`;
            sendEmail(from, to, subject, text, html);
        }

        return;
    })

});

app.post('/get-user', verifyTokenMiddleware, (req, res) => {
    //Code pour rechercher un article
    myUsers.findOne({
        where: {
            id: req.body.id
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

app.post('/update-row', verifyTokenMiddleware, (req, res) => {
    //Code pour mise à jour un article
    myArticles.update({
        title: req.body.title,
        url_img: req.body.url_img,
        content: req.body.content,
        price: req.body.price,
        qte: req.body.qte
    }, {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Article mise à jour !' });
        return;
    })
});

app.post('/update-qte', verifyTokenMiddleware, (req, res) => {
    //Code pour mise à jour un article
    myArticles.update({
        qte: req.body.qte
    }, {
        where: {
            id: req.body.id
        }
    }).then((data) => {
        res.json({ message: 'Qte mise à jour !' });
        return;
    })
});

/******************************gestion des endpoint (deb ) */

syncTable();
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
