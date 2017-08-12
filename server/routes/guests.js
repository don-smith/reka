const express = require('express')

const db = require('../db')

const router = express.Router()

module.exports = {
  router,
  getGuests,
  createGuest
}

// GET /guests/:id
router.get('/:id', (req, res) => {
  db.getGuest(Number(req.params.id))
    .then(guest => {
      res.json(guest)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// used in events route
// GET /events/:id/guests
function getGuests (req, res) {
  db.getGuests(Number(req.params.id))
    .then(guests => {
      res.json(guests)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}

// used in events route
// POST /events/:id/guests
function createGuest (req, res) {
  db.createGuest(req.body, Number(req.params.id))
    .then(() => {
      res.status(201).end()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}
