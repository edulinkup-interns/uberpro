const express = require('express');
const router = express.Router();
const authmiddleware = require('../middilewares/auth.middileware.js');
const mapController = require('../controllers/map.controller')
const {query} = require('express-validator');


router.get('/get-coordinates' , 
    query('address').isString().isLength({min:3}),
    authmiddleware.authuser , mapController.getCordinates);


router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authmiddleware.authuser,
    mapController.getDistanceTime
)
// yaha se sara input jata hai pahle chek hota hai 3 length hai ya nahi ukse baadauthentication hota hai user ka then uske baad mapcontroller me jata hai 
router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authmiddleware.authuser,
    mapController.getAutoCompleteSuggestions
)


module.exports = router;