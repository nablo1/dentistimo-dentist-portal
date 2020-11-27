const express = require('express')
const dentalClinics = require('../controllers/dentalClinics')

const router = express.Router()

router
  .route('/')
  .post(dentalClinics.createDentalClinic)
  .get(dentalClinics.getAllDentalClinics)

router
  .route('/:dentalClinicId')
  .get(dentalClinics.getDentalClinic)
  .delete(dentalClinics.deleteDentalClinic)

module.exports = router
