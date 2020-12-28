const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dateSchema = new Schema( {
    date: {type: String},
    timeSlots:  [{
            _id: {type: mongoose.Schema.Types.ObjectId, ref: 'timeSlot'}
        }]
    ,
    dentalClinic: {type: mongoose.Schema.Types.ObjectId, ref: 'dentalClinic'}
})

module.exports = mongoose.model('date', dateSchema)