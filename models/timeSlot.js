const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeSlotSchema = new Schema( {
timeSlot: { 
    type: String
},
date: {type: mongoose.Schema.Types.ObjectId, ref: 'date'}
})

module.exports = mongoose.model('timeSlot', timeSlotSchema)


