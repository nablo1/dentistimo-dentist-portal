const DentalClinic = require('../models/dentalClinic')

module.exports = {
  // Logic to create a new dental clinic
  createDentalClinic: async function (req, res, next) {
    try {
      const dentalClinic = new DentalClinic(req.value.body)
      await dentalClinic.save()
      res.status(201).json(dentalClinic)
    } catch (error) {
      next(error)
    }
  },

  // Logic to get all dental clinics
  getAllClinics: async function (req, res, next) {
    try {
      const dentalClinics = await DentalClinic.find(req.value)
      res.status(200).json(dentalClinics)
    } catch (error) {
      next(error)
    }
  },
}
