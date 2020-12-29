var express = require('express');
const TimeSlot = require('../models/timeSlot');
const Date = require('../models/date')
var router = express.Router();

router.post('/api/dentalClinics/:dentalClinicId/dates/:dateId/timeSlots',function(req, res, next) {
    var timeSlot = new TimeSlot({
        timeSlot: req.body.timeSlot,
        date: req.params.dateId
    });
    timeSlot.save(function(err, timeSlot) {
        if (err) { return next(err); }
       res.status(201).json(timeSlot)
    });
});


router.get('/api/dentalClinics/:dentalClinicId/dates/:dateId/timeSlots', function (req, res, next) {

    const date_id = req.params.dateId;
    Date.findById(date_id, function(err, date) {
        if (err) { return next(err); }
        if(date === null){
            return res.status(404).json({'message':'No date found'});
        }
    TimeSlot.find({date: {$eq:date_id}}, function(err,timeSlot) {
        if (err) { return next(err); }
        if(timeSlot === null) {
            return res.status(404).json({'message' : 'There are no time slots in this date!'});
        }
        res.status(200).json(timeSlot);
    })
 })

});



module.exports = router;


