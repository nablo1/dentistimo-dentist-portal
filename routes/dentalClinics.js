const express = require('express')
const dentalClinics = require('../controllers/dentalClinics')

const router = express.Router()

router
  .route('/')
  .post(dentalClinics.createDentalClinic)
  .get(dentalClinics.getAllDentalClinics)

router.route('/:dentalClinicId').get(dentalClinics.getDentalClinic)

module.exports = router
