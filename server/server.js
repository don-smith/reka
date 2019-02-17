const path = require('path')
const express = require('express')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const eventRoutes = require('./routes/events')
const registrationRoutes = require('./routes/registrations')
const offeringRoutes = require('./routes/offerings')

const server = express()
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.json())

server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/events', eventRoutes)
server.use('/api/v1/registrations', registrationRoutes.router)
server.use('/api/v1/offerings', offeringRoutes.router)

// Default route for non-API requests
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = server
