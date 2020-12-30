const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    number: {type: Number, unique: true}
})

module.exports = mongoose.model('request',requestSchema)