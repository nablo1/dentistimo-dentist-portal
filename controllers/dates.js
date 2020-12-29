var express = require('express')
const Date = require('../models/date')
const TimeSlot = require('../models/timeSlot')
const DentalClinic = require('../models/dentalClinic')
var router = express.Router()

router.post(
  '/api/dentalClinics/:dentalClinicId/dates',
  function (req, res, next) {
    var date = new Date({
      date: req.body.date,
      dentalClinic: req.params.dentalClinicId,
    })
    date.save(function (err, date) {
      if (err) {
        return next(err)
      }
      res.status(201).json(date)
    })
  }
)

router.get(
  '/api/dentalClinics/:dentalClinicId/dates',
  function (req, res, next) {
    const dentalClinic_id = req.params.dentalClinicId
    DentalClinic.findById(dentalClinic_id, function (err, dentalClinic) {
      if (err) {
        return next(err)
      }
      if (dentalClinic === null) {
        return res.status(404).json({ message: 'Dental clinic is not found!' })
      }
      Date.find(
        { dentalClinic: { $eq: dentalClinic_id } },
        function (err, date) {
          if (err) {
            return next(err)
          }
          if (date === null) {
            return res
              .status(404)
              .json({ message: 'There are no dates for this denal clinic!' })
          }
          res.status(200).json(date)
        }
      )
    })
  }
)
//Get specific date for a dentalClinic
router.get(
  '/api/dentalClinics/:dentalClinicId/dates/:dateId',
  function (req, res, next) {
    const dentalClinic_id = req.params.dentalClinicId
    const date_id = req.params.dateId
    DentalClinic.findById(dentalClinic_id, function (err, dentalClinic) {
      if (err) {
        return next(err)
      }
      if (dentalClinic === null) {
        return res.status(404).json({ message: 'Dental clinic is not found!' })
      }
      Date.findById(date_id, function (err, date) {
        if (err) {
          return next(err)
        }
        if (date === null) {
          return res.status(404).json({
            message: 'No date found!',
          })
        }
        res.status(200).json(date)
      })
    })
  }
)

module.exports = router
