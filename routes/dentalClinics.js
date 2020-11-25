const express = require('express')
const dentalClinics = require('../controllers/dentalClinics')

const router = express.Router()

router.route('/')
  .post(dentalClinics.createDentalClinic)
  .get(dentalClinics.getAllClinics)

module.exports = router