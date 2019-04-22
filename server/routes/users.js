const express = require('express')
const { decodeToken } = require('authenticare/server')

const db = require('../db/users')

const router = express.Router()

module.exports = router

// GET /users/:id
router.get('/:id', decodeToken, (req, res) => {
  db.getUserById(Number(req.params.id))
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// PUT /users/:id
router.put('/:id', decodeToken, (req, res) => {
  const id = Number(req.params.id)
  const { username, currentPassword, newPassword } = req.body
  db.updateUser(id, username, currentPassword, newPassword)
    .then(() => {
      res.status(202).end()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})
