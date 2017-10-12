const express = require('express')

const db = require('../db/registrations')

const router = express.Router()

module.exports = {
  router,
  getRegistrations,
  createRegistration,
  deleteRegistration
}

// GET /registrations/:id
router.get('/:id', (req, res) => {
  db.getRegistration(Number(req.params.id))
    .then(registration => {
      res.json(registration)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// used in events route
// GET /events/:id/registrations
function getRegistrations (req, res) {
  db.getRegistrations(Number(req.params.id))
    .then(registrations => {
      res.json(registrations)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}

// used in events route
// POST /events/:id/registrations
function createRegistration (req, res) {
  db.createRegistration(req.body, Number(req.params.id))
    .then(() => {
      res.status(201).end()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}

// used in events route
// DELETE /events/:id/registrations
function deleteRegistration (req, res) {
  const registrationName = req.body.name
  const eventId = Number(req.params.id)
  db.deleteRegistration(registrationName, eventId)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}
