const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const usercontroller = require('../controllers/usercontroller');
const authmiddileware = require('../middilewares/auth.middileware');


router.post('/register',[
    body('email').isEmail().withMessage('invalid message'),
    body('fullname.firstname').isLength({min:3}).withMessage('firstname length is must be min length 3'),
    body('password').isLength({min:6}).withMessage('password must be of length more then 6')     
],
 usercontroller.registeruser
)

router.post('/login' ,[
 body('email').isEmail().withMessage('invalid message'),
    body('password').isLength({min:6}).withMessage('password must be of length more then 6')     
],
  usercontroller.loginuser    // iska matlab ye hai ki  agar uper wala data jo bhi dala hai wo sahi hai then usko loginuser me dalo or usercontroller me chale jao
)

router.get('/profile' ,authmiddileware.authuser ,usercontroller.getuserprofile)   // abb  hum profile bana rahe hai to sbse pahle token check karenge hai ya nahi uske baad hi profile bana  sakte hai

router.get('/logout', authmiddileware.authuser, usercontroller.logoutuser);  // logout karne ke liye bhi token ki jarurat hai

module.exports = router;


