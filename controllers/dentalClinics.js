const DentalClinic = require('../models/dentalClinic')

module.exports = {
  // Logic to create a new dental clinic
  createDentalClinic: async function(req, res, next) {
    try {
      const dentalClinic = new DentalClinic(req.value.body)
      await dentalClinic.save()
      res.status(201).json(dentalClinic)
    } catch (error) {
      next(error)
    }
  },
}
