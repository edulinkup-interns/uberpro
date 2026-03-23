const rideModel = require('../model/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
// console.log('getFare called with:', pickup, destination);
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    try {
        const distanceTime = await mapService.getDistanceTime(pickup, destination);
        // console.log('Distance time result:', distanceTime);
      
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

//    console.log(distanceTime);

        const fare = {
            auto: Math.round(baseFare.auto + ((distanceTime.distance_meters / 1000) * perKmRate.auto) + ((distanceTime.duration_seconds / 60) * perMinuteRate.auto)),
            car: Math.round(baseFare.car + ((distanceTime.distance_meters / 1000) * perKmRate.car) + ((distanceTime.duration_seconds / 60) * perMinuteRate.car)),
            moto: Math.round(baseFare.moto + ((distanceTime.distance_meters / 1000) * perKmRate.moto) + ((distanceTime.duration_seconds / 60) * perMinuteRate.moto))
        };

        // console.log('Calculated fare:', fare);
        return fare;
    } catch (error) {
        console.error('Error in getFare:', error);
        throw error;
    }


}
module.exports.getFare = getFare;  // by this we can send the fare to our viechalpannel page 


// by this we can genrate the otp with the help of crypto module that will help to genrate the best otp and secure otp insted of bycrypt module
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    // console.log(fare);

   // iska kuch ye hisab hai ki agar maini information apni dali when mai ke user hu to agar rider accept karega to muje ye sari information dikhegi na ki rider ko
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),  // ye otp kewal user ke pass jayega naki rider ke pass
        fare: fare[ vehicleType ]
    })

    return ride;
}