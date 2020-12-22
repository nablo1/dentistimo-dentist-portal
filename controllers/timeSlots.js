var express = require('express');
const TimeSlot = require('../models/timeSlot');
const DentalClinic = require('../models/dentalClinic')
var router = express.Router();

router.post('/api/dentalClinics/:dentalClinicId/timeSlots',function(req, res, next) {
    var timeSlot = new TimeSlot({
        timeSlot: req.body.timeSlot,
        dentalClinic: req.params.dentalClinicId
    });
    timeSlot.save(function(err, timeSlot) {
        if (err) { return next(err); }
       res.json(timeSlot)
    });
});

/* router.get('api/dentalClinics/:dentalClinicId/timeSlots', function(req, res, next) {
    TimeSlot.find(function(err, timeSlots) {
        if (err) { return next(err); }
        res.json({'time slots': timeSlots })
    })
}); */

router.get('/api/dentalClinics/:dentalClinicId/timeSlots', function (req, res, next) {

    const dentalClinic_id = req.params.dentalClinicId;
    DentalClinic.findById(dentalClinic_id, function(err, dentalClinic) {
        if (err) { return next(err); }
        if(dentalClinic === null){
            return res.status(404).json({'message':'Event is not found!'});
        }
    TimeSlot.find({dentalClinic: {$eq:dentalClinic_id}}, function(err,timeSlot) {
        if (err) { return next(err); }
        if(timeSlot === null) {
            return res.status(404).json({'message' : 'There are no reviews for this event!'});
        }
        res.json( {'time slots' : timeSlot });
    })
 })

    /* DentalClinic.findOne({'_id': req.params.dentalClinicId}, function (err, dentalClinic) {
        
        if (!dentalClinic) {    
            var err = new Error('No dental clinic found with this ID');
            err.status = 404;
            return next(err);
        }
        res.status(200).json(dentalClinic)

    })
    .select('timeSlots')
    .catch(err => {

        res.status(500).json({ error: err });
    });
 */
   /*  TimeSlot.find(function (err, timeSlots) {
        if (!timeSlots) {

            return res.status(404).json({
                message: "no time slots found"
            });
        }
        res.status(200).json({ 'time slots found:': timeSlots });
    })
    .catch(err => {
        res.status(500).json({ error: err });
    }); */
});



module.exports = router;


