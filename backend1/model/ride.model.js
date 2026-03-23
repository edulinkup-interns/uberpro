const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {  // jab bhi captain ride ko accept kar lega da hum uski id de rahe honhge
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: { // iske liye hum alag se ek service function banayenge jisse hum pikup o destination ki distance ko dekhkar price set karenge ride.service
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: [ 'pending', 'accepted', "ongoing", 'completed', 'cancelled' ],
        default: 'pending',
    },

    duration: {
        type: Number,
    }, // in seconds

    distance: {
        type: Number,
    }, // in meters

    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },

    otp: {
        type: String,
        select: false,  // ye isliye rakh ahai kyuki hame directly ye rider ko nahi bejna hai 
        required: true,
    },
})

module.exports = mongoose.model('ride', rideSchema);