const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true ,
            minlength:[3 , 'first name must be 3 cahrachters long'],   
        },
        lastname:{
            type: String,
            minlength:[3 , 'last name must be 3 cahrachters long'],   
        },
    },
    email:{
        type: String,
        required: true ,
        unique: true
    },  
        password:{
            type: String,
            required: true ,
            minlength:[6 , 'password must be 6 characters long'],  
            select: false,   // iska matlab hai ki jab bhi app find karoge email ko to password by defauult nahi aayega 
        },
        // socketid:{
        //     type: String,
        //     required: true ,
        // },

})

userschema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET , { expiresIn: '24h' });  // this._id is used to get the id of the user which is logged in
    return token;
}

userschema.methods.comparePassword = async function (password) {  // in this password will be compared which will store to our database and that we gave to it as input
    return await bcrypt.compare(password, this.password);
}

userschema.statics.hashPassword = async function (password) {   // to convert password to hash values
    return await bcrypt.hash(password, 10);
}

const usermodel = mongoose.model('user', userschema);

module.exports = usermodel;