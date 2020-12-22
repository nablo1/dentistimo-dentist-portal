//work here

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
var morgan = require('morgan');

const dentalClinicRoute = require('./routes/dentalClinics')
var timeSlotsController = require('./controllers/timeSlots');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

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

app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Router middleware
app.use('/api/dentalClinics', dentalClinicRoute)
app.use(timeSlotsController)


const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

server.on('upgrade', (request, socket, head) => {
  wsS.handleUpgrade(request, socket, head, socket => {
    wsS.emit('connection', socket, request)
  })
})
