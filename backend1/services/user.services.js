const usermodel = require('../model/user.model');

module.exports.createUse = async({
    firstname , lastname , email , password
})=>{
    if(!firstname || !email || !password){
        throw new Error('all feilds are required');
    }
    const user =  usermodel.create({
        fullname:{
            firstname ,
            lastname
        },
        email ,
        password
    })
    return user;
}