const Joi = require('joi')

module.exports = {
  // Validation for new dental clinics
  newDentalClinicSchema: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().required(),
    owner: Joi.string().required(),
  }),

  // Validation for setting a clinic's opening hours
  openingHoursSchema: Joi.object().keys({
    openingHours: Joi.array().items(
      Joi.object({
        day: Joi.string().valid(
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ),
        opening: Joi.date(),
        closing: Joi.date(),
      })
    ),
  }),
}
