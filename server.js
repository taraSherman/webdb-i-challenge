const express = require('express');

const knex = require('knex');

const Router = require('./Router');

const db = require('./data/dbConfig.js');

const server = express();

const logger = require('morgan');

server.use(express.json());
server.use(logger('dev'));
server.use('/api/accounts', Router);

server.get('/', (req, res) => {
  res.send(`
  <h2>Web DB I Challenge</h2>
  `)
});

module.exports = server;