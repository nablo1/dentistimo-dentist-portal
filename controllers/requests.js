var express = require('express')
var router = express.Router()
const Request = require('../models/request')

router.post(
    '/api/requests',
    function (req, res, next) {
        Request.findOne({}, {}, { sort: {  _id: -1 } }, function(err, lastRequest) {
            var request
            if(lastRequest) {
                request = new Request({
                number: lastRequest.number +1
                })
            } else {
                request = new Request({
                number: 1
                })
            }
            request.save(function (err, request) {
                if (err) {
                return next(err)
                }
                res.status(201).json(request)
            })
        }) 
    }
)

router.get('/api/requests', function (req, res, next) {
    Request.findOne({}, {}, { sort: {  _id: -1 } }, function(err, lastRequest) {
        if (err) { return next(err); }
        res.status(200).json(lastRequest)
    })
})

module.exports = router
