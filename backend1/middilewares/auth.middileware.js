const usermodel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklisttoeknmodel = require('../model/blacklist.model');  // isme hum token ko blacklist karte hai yani agar user ne logout kar diya to uska token use nahi kar sakte
const captainmodel = require('../model/captain.model');  // isme hum captain ki detail nikalte hai yani agar user ne login kiya to uska token use karte hai or uski detail nikalte hai

// in this we are now doing the authorization we can done with the authentication by login and register
// so now we can do authorizatioon by doing the decode of token 

module.exports.authuser = async (req , res , next)=>{      //header ki help se hum token deke aram se user ko authenticate kar sakte hai yani uski detail nikal sakte hai just postman pe jao header me jao then authorization select karo or firvalue me bearer token daal do then run it
    let token;
    
    // Check for token in cookies first
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    // Then check for token in authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message:'unauthorized'});
    } 


    // ye hum isliye kar rahe hia ki agar user ne logout to kar liya but usse pahle hi wo kisi or user ko mil chuka hai ya usne localstorage me save kar liya ho the iss case me iss blacklist token ko use nahi karna hai
    const isBlacklisted = await blacklisttoeknmodel.findOne({token : token});  // isme hum token ko check kar rahe hai ki wo blacklist me hai ya nahi agar hai to use use nahi kar sakte
    if(isBlacklisted){
        return res.status(401).json({message:'unauthorized'});
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);   //by this we can decode the token 
        const user = await usermodel.findById(decoded._id)

        req.user = user;
        return next();
    }catch(err){
        console.error('JWT verification error:', err);
        return res.status(401).json({message:'unauthorized'});
    }
}

module.exports.authcaptain = async (req , res , next)=>{      //header ki help se hum token deke aram se user ko authenticate kar sakte hai yani uski detail nikal sakte just postman pe jao header me jao then authorization select karo or firvalue me bearer token daal do then run it
    let token;
    
    // Check for token in cookies first
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    // Then check for token in authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    console.log('Captain auth token:', token);
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }

    const isBlacklisted = await blacklisttoeknmodel.findOne({token : token});  // isme hum token ko check kar rahe hai ki wo blacklist me hai ya nahi agar hai to use use nahi kar sakte
    if(isBlacklisted){  
        return res.status(401).json({message:'unauthorized'});
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);   //by this we can decode the token 
        const captain = await captainmodel.findById(decoded._id)

        req.captain = captain;
        return next();  // iise jo control hai profile tak chala jayega agar isse nahi lagaenge to control jayega hi nahi
    }catch(err){
        console.error('Captain JWT verification error:', err);
        return res.status(401).json({message:'unauthorized'});
    }
}

