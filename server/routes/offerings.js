const express = require('express')

const db = require('../db/offerings')

const router = express.Router()

module.exports = {
  router,
  getOfferings,
  createOffering
}

// GET /offerings/:id
router.get('/:id', (req, res) => {
  db.getOffering(Number(req.params.id))
    .then(offering => {
      res.json(offering)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// used in events route
// GET /events/:id/offerings
function getOfferings (req, res) {
  db.getOfferings(Number(req.params.id))
    .then(offerings => {
      res.json(offerings)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}

// used in events route
// POST /events/:id/offerings
function createOffering (req, res) {
  db.createOffering(req.body, Number(req.params.id))
    .then(() => {
      res.status(201).end()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}
