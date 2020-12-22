const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dentalClinicSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    require: true,
    trim: true,
  },
  dentists: {
    type: Number
  },
  address: {
    type: String,
    require: true,
    trim: true,
  },
  city: {
    type: String,
    require: true,
  },
  coordinates: [{
    longitude: Number,
    latitude: Number
  }],
  openingHours: [
    {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String
    }
  ],
  timeSlots: {
        _id: {type:mongoose.Schema.Types.ObjectId, ref: 'timeSlot'}
    } 
})

module.exports = mongoose.model('dentalClinic', dentalClinicSchema)
