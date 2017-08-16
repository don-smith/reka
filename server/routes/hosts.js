const express = require('express')

const db = require('../db')
const token = require('../auth/token.js')

const router = express.Router()

module.exports = router

// GET /hosts
router.get('/', (req, res) => {
  db.getHosts()
    .then(hosts => {
      res.json(hosts)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// GET /hosts/:id
router.get('/:id', (req, res) => {
  db.getHost(Number(req.params.id))
    .then(host => {
      res.json(host)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// POST /hosts
router.post('/', token.decode, (req, res) => {
  db.createHost(req.body)
    .then(() => {
      res.status(201).end()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})
