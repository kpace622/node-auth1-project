const express = require('express');
const session = require('express-session');
// const knexSessionStore = require('express-session')(session);
const restricted = require('./auth/restricted');
const cors = require('cors');

const server = express();

const sessionConfig = {
    name: 'rockyroad',
    secret: 'pretty good',
    cookie: {
        maxAge: 3600 * 1000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}

const AuthRouter = require('./auth/auth-router');
const UserRouter = require('./users/user-router');

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', restricted, UserRouter);
server.use('/api/auth', AuthRouter);

server.get('/', (req, res) => {
    res.json({message: 'It works!'})
})

module.exports = server;