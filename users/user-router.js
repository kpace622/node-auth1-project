const express = require('express');

const Users = require('./user-model');

const router = express.Router();

router.get('/', (req, res) => {
    Users.find()
        .then(user => {
            res.json(user)
        })
        .catch(err => res.send(err))
})

module.exports  = router;