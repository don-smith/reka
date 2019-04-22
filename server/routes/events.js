const express = require('express')
const { decodeToken } = require('authenticare/server')

const { getOfferings, createOffering } = require('./offerings')
const {
  getRegistrations,
  createRegistration,
  deleteRegistration
} = require('./registrations')

const db = require('../db/events')
const {
  getRegistrations: getRegistrationsFromDb
} = require('../db/registrations')

const router = express.Router()

module.exports = router

// GET /events
router.get('/', decodeToken, (req, res) => {
  const { id: userId } = req.user
  return Promise.all([
    db.getUpcomingEvents(userId),
    db.getHostedEvents(userId),
    db.getAttendedEvents(userId)
  ])
    .then(([upcoming, hosted, attended]) => ({
      upcoming, hosted, attended
    }))
    .then(events => res.json(events))
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
      return getRegistrationsFromDb(id)
    })
    .then(registrations => {
      event.registrations = registrations
      res.json(event)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// POST /events
router.post('/', decodeToken, (req, res) => {
  db.createEvent(req.body)
    .then(() => {
      res.status(201).end()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// GET /events/:id/registrations
router.get('/:id/registrations', getRegistrations)

// POST /events/:id/registrations
router.post('/:id/registrations', createRegistration)

// DELETE /events/:id/registrations
router.delete('/:id/registrations', decodeToken, deleteRegistration)

// GET /events/:id/offerings
router.get('/:id/offerings', getOfferings)

// POST /events/:id/offerings
router.post('/:id/offerings', decodeToken, createOffering)
