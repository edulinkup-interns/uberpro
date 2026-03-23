const captainmodel = require('../model/captain.model');

module.exports.createcaptain = async({
    firstname, lastname, email, password, color, numberplate, capacity, vehicletype
}) => { 

    if(!firstname || !email || !password || !color || !numberplate || !capacity || !vehicletype) {
        throw new Error('All fields are required');
    }   

    const captain = await captainmodel.create({
        fullname: {
            firstname,
            lastname
        },
        email, 
        password,
        vehicle: {
            color,
            numberplate,
            capacity,
            vehicletype
        }
    }); 
    return captain;
}