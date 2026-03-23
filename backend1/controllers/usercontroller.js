const usermodel = require('../model/user.model');
const userservice = require('../services/user.services');
const {validationResult} = require('express-validator');
const blacklisttoeknmodel = require('../model/blacklist.model');


module.exports.registeruser = async (req, res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);

    const {fullname,email, password} = req.body;
    
    const isUserExists = await usermodel.findOne({email});  // isme hum check kar rahe hai ki user already exist karta hai ya nahi agar karta hai to error de do
    if(isUserExists){   
        return res.status(400).json({error: 'user with this email already exists'});
    }

    const hashedPassword = await usermodel.hashPassword(password);
    const user = await userservice.createUse({
        firstname : fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

try{
    const token = await user.generateAuthToken();   // await ka use nahi karoge to jo token hai wo  waa postman pe show nahi hoga so use await
    console.log(token);
    
    res.status(201).json({token, user});
}catch{
    res.status(500).json({message:'internal server error'});
}

}


module.exports.loginuser = async(req , res , next)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});   // uper ki teen line me bus ye check karna hai ki error hai ya nahi
    }
    console.log(req.body);
   const {email, password} = req.body;    // body me se email or password ko nikal lo
    
   const user = await usermodel.findOne({email}).select('+password');  // isme basically hum just user ko select kar rahe hai email ki madad se saath hi is +password ka matlab hai email ke saath uska password bhi aayega jissse ye pata laga sake password sahi hai nahi 
    
   if(!user){
    return res.status(401).json({message:'invalis email and password'});
   }

   const ismatch = await user.comparePassword(password);

   if(!ismatch){
    return res.status(401).json({message:'invalid email or password'});
   }

  
const token = await user.generateAuthToken();

res.status(201).json({token, user});

   
}


module.exports.getuserprofile = async(req , res , next)=>{   // abb iske liye hum ek alag se folder banayenge middileware 
res.status(200).json(req.user);
}


module.exports.logoutuser = async(req , res , next)=>{
    // res.cookie('token', '', {expires: new Date(0)});  // cookie ko clear karne ke liye isme hum token ko empty string de rahe hai or uski expiry date ko 0 de rahe hai yani wo cookie ab kabhi nahi chalegi
    res.clearCookie('token');  // isse hum cookie ko clear kar sakte hai yani cookie ko delete kar sakte hai
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  // agar cookie me token nahi hai to header se le lo

   await blacklisttoeknmodel.create({token});  // isme hum token ko blacklist kar rahe hai yani ab ye token use nahi hoga

    res.status(200).json({message:'logout successfully'});
}
