require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
const express = require('express')
const customServer = require('./api/config/custom-server');

const { server, baseServer} = customServer;

// serving the swagger documentation
server.use('/doc', express.static('doc'))

module.exports = server;