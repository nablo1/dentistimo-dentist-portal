const express = require('express')
const dentalClinics = require('../controllers/dentalClinics')

const router = express.Router()

router
  .route('/')
  .post(dentalClinics.createDentalClinic)
  .get(dentalClinics.getAllDentalClinics)
  .delete(dentalClinics.deleteAllDentalClinics)

router
  .route('/:dentalClinicId')
  .get(dentalClinics.getDentalClinic)
  .delete(dentalClinics.deleteDentalClinic)
  .put(dentalClinics.replaceDentalClinicData)
  .patch(dentalClinics.updateDentalClinicData)

module.exports = router
