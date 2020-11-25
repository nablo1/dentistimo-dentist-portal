const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5050

app.use(express.json())

// Connection to MongoDB Atlas database
const uri = process.env.URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
