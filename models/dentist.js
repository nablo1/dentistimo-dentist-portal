const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dentistSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  bio: String,
  gender: String,
  profilePhoto: String,
  employer: Schema.Types.ObjectId,
})

module.exports = mongoose.model('dentist', dentistSchema)
