const express = require('express')

const db = require('../db')
const token = require('../auth/token')

const router = express.Router()

module.exports = router

// GET /users/:id
router.get('/:id', token.decode, (req, res) => {
  db.getUserById(Number(req.params.id))
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})
