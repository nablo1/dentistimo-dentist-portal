var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Passcode = require('../models/passcode');
const passcode = require('../models/passcode');

//Initializing the passcode
router.post('/api/passcode', function (req, res, next) {
    bcrypt.hash('dentistimo', 10, function (err, hash) {

        var passcode = new Passcode({
            'code': hash
        });
        passcode.save();
    });
    res.status(201).json(passcode)
});

router.post('/api/login', function (req, res, next) {

    Passcode.findOne({}, function (err, passcode) {

        if (!passcode) {

            var err = new Error('Passcode not found');
            err.status = 404;
            return next(err);
        }
        bcrypt.compare(req.body.code, passcode.code, function (err, result) {
            if (err) {
                var err = new Error('Authentication has failed');
                err.status = 401;
                return next(err);
            }

            if (result) {
                var token = jwt.sign(
                    {

                        'code': passcode.code
                    },
                    process.env.JWT_KEY || "secret",//private key
                    {
                        expiresIn: "1h"//should epiresin be commented? because the token seems to work for longer than an hour
                    });



                return res.status(201).json({
                    message: 'Authentication successful',
                    token: token
                });
            }
            else {
                var err = new Error('Authentication has failed');
                err.status = 401;
                return next(err);
            }

        });
    });
});


//changing the passcode
router.put('/api/passcode', adminToken, function (req, res, next) {

    bcrypt.hash(req.body.code, 10, function (err, hash) {
        Passcode.findOneAndUpdate({}, { $set: { 'code': hash } }, function (err, result) {
            if (err) { return next(err); }
            res.status(200).json('new passcode set');
        });


    });
});



function adminToken(req, res, next) {

    try {

        const token = req.headers.authorization.split(" ")[1];
        var decoded = jwt.decode(token, process.env.JWT_KEY || 'KEY');
        req.userData = decoded;

        if (req.userData.code) {
            next();
        }
        else {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });

    }

}




module.exports = router;

