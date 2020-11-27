const express = require('express')
const mongoose = require('mongoose')
const ws = require('ws')

const dentalClinicRoute = require('./routes/dentalClinics')

require('dotenv').config()

const app = express()
const wss = new ws.Server({ noServer: true })
const port = process.env.PORT || 5050

app.use(express.json())

// Connection to MongoDB Atlas database
const uri = process.env.URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully 🥳')
})

// Router middleware
app.use('/api/dentalClinics', dentalClinicRoute)

// Logic to run WebSocket server from app http
wss.on('connection', socket => {
  console.log('A new client connected 👀')
  socket.send('Hello new client!')
  socket.on('message', function incoming(message) {
    console.log(`Received message: ${message}`)
    socket.send(`Message received: ${message}`)
  })
})

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, socket => {
    wss.emit('connection', socket, request)
  })
})
