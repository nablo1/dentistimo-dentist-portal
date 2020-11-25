const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dentalClinicSchema = new Schema({
  // Data for end-user authentication
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  // Data for dental clinic information
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
  dentists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'dentist',
    },
  ],
  openingHours: [
    {
      day: String,
      periods: [
        {
          start_hours: Date,
          end_hours: Date,
        },
      ],
    },
  ],
  // Location information
  streetAddress: {
    type: String,
    require: true,
    trim: true,
  },
  postcode: {
    type: Number,
    require: true,
    trim: true,
    max: 5,
    min: 5,
  },
  city: {
    type: String,
    require: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

module.exports = mongoose.model('dentalClinic', dentalClinicSchema)
