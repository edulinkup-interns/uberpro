const express = require('express');
const router = express.Router();
const { body , query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authmiddleware = require('../middilewares/auth.middileware.js');


router.post('/create',
    authmiddleware.authuser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

// to jo bhi frontend se mera data ayega usko hum get kar lenge or check karenge then aage processing ke liye bejenge 
router.get('/get-fare',
    authmiddleware.authuser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

module.exports = router;