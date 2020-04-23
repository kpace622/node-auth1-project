const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

const router = express.Router();

router.post('/register', (req, res) => {

    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
    .then(user => {
        res.status(201).json({saved})
    })
    .catch(err => {
        res.status(500).json({message: 'problem with the database', err})
    })
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    Users.findBy({username})
    .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = username;
            res.status(200).json({message: 'Welcome!'})
        } else {
            res.status(401).json({message: 'incorrect username or password'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error logging in', err})
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send('error logging out')
        } else {
            res.send('logged out')
        }
    })
})

module.exports  = router;