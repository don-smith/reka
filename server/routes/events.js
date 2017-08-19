const express = require('express')

const token = require('../auth/token')
const {getGuests, createGuest} = require('./guests')
const {getOfferings, createOffering} = require('./offerings')

const db = require('../db')

const router = express.Router()

module.exports = router

// GET /events
router.get('/', (req, res) => {
  db.getEvents()
    .then(events => {
      res.json(events)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// GET /events/:id
router.get('/:id', (req, res) => {
  db.getEvent(Number(req.params.id))
    .then(event => {
      res.json(event)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// POST /events
router.post('/', token.decode, (req, res) => {
  db.createEvent(req.body)
    .then(() => {
      res.status(201).end()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// GET /events/:id/guests
router.get('/:id/guests', getGuests)

// POST /events/:id/guests
router.post('/:id/guests', token.decode, createGuest)

// GET /events/:id/offerings
router.get('/:id/offerings', getOfferings)

// POST /events/:id/offerings
router.post('/:id/offerings', token.decode, createOffering)
