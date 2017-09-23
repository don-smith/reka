const express = require('express')

const token = require('../auth/token')
const {getOfferings, createOffering} = require('./offerings')
const {getGuests, createGuest, deleteGuest} = require('./guests')

const db = require('../db')

const router = express.Router()

module.exports = router

// GET /events
router.get('/', token.decode, (req, res) => {
  const events = {}
  db.getHostedEvents(req.user.id)
    .then(hosted => {
      events.hosted = hosted
      return db.getAttendedEvents(req.user.id)
    })
    .then(attended => {
      events.attended = attended
      res.json(events)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// GET /events/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const event = {}
  db.getEvent(id)
    .then(details => {
      event.details = details
      return db.getGuests(id)
    })
    .then(guests => {
      event.guests = guests
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

// DELETE /events/:id/guests
router.delete('/:id/guests', token.decode, deleteGuest)

// GET /events/:id/offerings
router.get('/:id/offerings', getOfferings)

// POST /events/:id/offerings
router.post('/:id/offerings', token.decode, createOffering)
