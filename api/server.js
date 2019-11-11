const express = require('express');

const mainMW = require('../middleware/mainMW');

const apiRouter = require('./api-router');

const server = express();

mainMW(server);

server.use('/user', apiRouter);

module.exports = server;