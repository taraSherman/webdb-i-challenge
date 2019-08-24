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
      console.log(error);
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
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving account information from the database.'
      })
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('accounts')
    .where({ id })
    .delete()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} account(s) has been deleted.`
        });
      } else {
        res.status(404).json({
          message: 'Invalid account ID'
        });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving account information from the database.'
      })
    });
});

router.post('/', (req, res) => {
  const account = req.body;

  db('accounts')
    .insert(account)
    .then(newAccount => {
      res.status(201).json(newAccount[0]);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Failed to create new account.'
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('accounts')
    .where({ id })
    .update(changes)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Failed to update account.'
      });
    });
});

module.exports = router;