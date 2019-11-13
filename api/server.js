const express = require('express');
const session = require('express-session');
const KnexSS = require('connect-session-knex')(session);

const apiRouter = require('./api-router');
const knexConnection = require("../database/dbConfig.js");


const mainMW = require('../middleware/mainMW');

const server = express();

const sessionConfiguration = {
    name: 'session',
    secret: process.env.COOKIE_SECRET,
    cookie: {
        maxAge: 1000*60*24,
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: false
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSS({
        knex: knexConnection,
        clearInterval: 1000*60*24,
        tablename: "user_sessions",
        sidfieldname: "id",
        createtable: true
    })
};

mainMW(server);
server.use(session(sessionConfiguration));

server.use('/user', apiRouter);

module.exports = server;