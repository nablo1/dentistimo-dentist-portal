const { string } = require('joi')
const mongoose = require('mongoose')
const dentalClinic = require('./dentalClinic')
const Schema = mongoose.Schema

const timeSlotSchema = new Schema( {
timeSlot: { 
    type: String, required: true
},
date: {type: mongoose.Schema.Types.ObjectId, ref: 'date'},
dentalClinic: {type: mongoose.Schema.Types.ObjectId, ref: 'dentalClinic'}
}
)


module.exports = mongoose.model('timeSlot', timeSlotSchema)


