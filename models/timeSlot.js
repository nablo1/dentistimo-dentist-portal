const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeSlotSchema = new Schema( {
timeSlot: { type: String, unique: true},
dentalClinic: {type: mongoose.Schema.Types.ObjectId, ref: 'dentalClinic'}
})

module.exports = mongoose.model('timeSlot', timeSlotSchema)


