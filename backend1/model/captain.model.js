const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');   


const captainschema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'first name must be 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'last name must be 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'password must be 6 characters long'],
        select: false, // This means that the password will not be returned by default when querying the database
    },
    // socketid: {
    //     type: String,
    //     // required: true,
    // },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
       color: {
            type: String,
            required: true,
            minlength: [3, 'color must be at least 3 characters long'],
        },
        numberplate: {
            type: String,
            required: true,
            minlength: [3, 'number plate must be at least 3 characters long'],
            unique: true,
            sparse: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'capacity must be at least 1'],
        },
        vehicletype: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'], // Example vehicle types
        },
    },
    location:{
        lat:{
            type: Number,
        },
        long:{
            type: Number,
        }
    }

})


captainschema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // this._id is used to get the id of the captain which is logged in
    return token;       
}

captainschema.methods.comparePassword = async function (password) { // in this password will be compared which will store to our database and that we gave to it as input
    return await bcrypt.compare(password, this.password);
}   

captainschema.statics.hashPassword = async function (password) { // to convert password to hash values
    return await bcrypt.hash(password, 10);
}


const captainmodel = mongoose.model('captain', captainschema);

module.exports = captainmodel;
// This code defines a Mongoose schema and model for a "captain" entity, which includes fields for personal information, vehicle details, and methods for authentication. It uses bcrypt for password hashing and JWT for token generation.