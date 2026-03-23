const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captaincontroller = require('../controllers/captain.controller.js');
const authmiddleware = require('../middilewares/auth.middileware.js');


router.post('/register', [
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').optional().isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.numberplate').isLength({min: 3}).withMessage('Number plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicletype').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
], 
    captaincontroller.registercaptain
);


router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], 
    captaincontroller.logincaptain
);

 // authcaptain middleware should be added here to protect the route
router.get('/profile', authmiddleware.authcaptain,
    captaincontroller.getcaptainprofile
);

router.get('/logout', authmiddleware.authcaptain, 
    captaincontroller.logoutcaptain
);  


module.exports = router;
