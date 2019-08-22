const express = require('express');

const knex = require('knex');
const db = require('./data/dbConfig.js');
const router = express.Router();

router.get('', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Unable to get all records from the database.'
      })
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('accounts')
    .where({ id })
    .then(accounts => {
      const account = accounts[0];
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({
          message: 'Invalid account ID'
        });
      };
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error retrieving account information from the database.'
      })
    })
})

module.exports = router;