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
  getAllDentalClinics: async function (req, res, next) {
    try {
      const dentalClinics = await DentalClinic.find(req.value)
      res.status(200).json(dentalClinics)
    } catch (error) {
      next(error)
    }
  },

  // Logic to get a specific dental clinic
  getDentalClinic: async function (req, res, next) {
    try {
      const dentalClinic = await DentalClinic.findById(
        req.params.dentalClinicId
      ).select(req.value.select)
      if (dentalClinic === null) next()
      else res.status(200).json(dentalClinic)
    } catch (error) {
      next(error)
    }
  },

  // Logic to delete a specific dental clinic
  deleteDentalClinic: async function (req, res, next) {
    try {
      const dentalClinic = await DentalClinic.findByIdAndDelete(
        req.params.dentalClinicId
      )
      if (dentalClinic === null) next()
      else res.status(200).json(dentalClinic)
    } catch (error) {
      next(error)
    }
  },

  // Logic to update all the data for a specific dental clinic
  replaceDentalClinicData: async function (req, res, next) {
    try {
      const dentalClinic = await DentalClinic.findByIdAndUpdate(
        req.params.dentalClinicId,
        req.value.body
      )
      res.status(200).json(dentalClinic)
    } catch (error) {
      next(error)
    }
  },

  // Logic to set opening hours for a specific dental clinic
  updateDentalClinicData: async function (req, res, next) {
    try {
      const dentalClinic = await DentalClinic.findByIdAndUpdate(
        req.params.dentalClinicId,
        req.value.body
      )
      res.status(200).json(dentalClinic)
    } catch (error) {
      next(error)
    }
  },
}
