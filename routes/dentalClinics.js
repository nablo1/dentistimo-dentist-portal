const express = require('express')
const rateLimit = require('express-rate-limit')
const dentalClinics = require('../controllers/dentalClinics')

const router = express.Router()

const limiter = rateLimit({
  windowMs: 1000 * 60 * 60 * 24, //24 hours
  max: 2
})  


router.post('/', dentalClinics.createDentalClinic)
  .get('/', dentalClinics.getAllDentalClinics)
  .delete('/', dentalClinics.deleteAllDentalClinics)

router
  .get('/:dentalClinicId', dentalClinics.getDentalClinic)
  .delete('/:dentalClinicId', dentalClinics.deleteDentalClinic)
  .put('/:dentalClinicId', dentalClinics.replaceDentalClinicData)
  .patch('/:dentalClinicId', dentalClinics.updateDentalClinicData)

module.exports = router
