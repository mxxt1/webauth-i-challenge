const express = require('express');
const session = require('express-session');
const KnexSS = require('connect-session-knex');

const apiRouter = require('./api-router');
const knexConnection = require("../database/dbConfig.js");


const mainMW = require('../middleware/mainMW');



const server = express();

mainMW(server);

server.use('/user', apiRouter);

module.exports = server;