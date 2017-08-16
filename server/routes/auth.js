const express = require('express')

const token = require('../auth/token.js')
const {userExists, createUser} = require('../db/users')

const router = express.Router()

router.post('/register', register, token.issue)

function register (req, res, next) {
  userExists(req.body.username)
    .then(exists => {
      if (exists) {
        return res.status(400).send({
          errorType: 'USERNAME_UNAVAILABLE'
        })
      }
      createUser(req.body.username, req.body.password)
        .then(() => next())
    })
    .catch(() => {
      res.status(400).send({
        errorType: 'DATABASE_ERROR'
      })
    })
}

module.exports = router
