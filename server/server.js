const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const authRoutes = require('./routes/auth')
const hostRoutes = require('./routes/hosts')
const eventRoutes = require('./routes/events')
const guestRoutes = require('./routes/guests')
const offeringRoutes = require('./routes/offerings')

const server = express()
server.use(passport.initialize())
server.use(express.static(path.join(__dirname, '../public')))
server.use(bodyParser.json())

server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/hosts', hostRoutes)
server.use('/api/v1/events', eventRoutes)
server.use('/api/v1/guests', guestRoutes.router)
server.use('/api/v1/offerings', offeringRoutes.router)

module.exports = server
