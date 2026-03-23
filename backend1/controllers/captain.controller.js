const captainmodel = require('../model/captain.model');
const captainService = require('../services/captain.services');
const {validationResult} = require('express-validator');    // jo apka data aa raha hai wo sahi hai ya nahi hai
const blacklistTokenmodel = require('../model/blacklist.model'); // Model to store blacklisted tokens

module.exports.registercaptain = async (req, res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle} = req.body;

    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment variables');
            return res.status(500).json({ error: 'Server configuration error: JWT secret not set' });
        }
        const isCaptainExists = await captainmodel.findOne({ email }); // Check if captain already exists
        if (isCaptainExists) {
            return res.status(400).json({ error: 'Captain with this email already exists' });   
        }

        const hashedPassword = await captainmodel.hashPassword(password); // Hashing the password before saving

        const captain = await captainService.createcaptain({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password:hashedPassword, // Hashing the password before saving
            color : vehicle.color,
            numberplate : vehicle.numberplate,
            capacity: vehicle.capacity,
            vehicletype : vehicle.vehicletype,
        });

        console.log('Created captain:', captain);
        console.log('generateAuthToken exists:', typeof captain.generateAuthToken);

        if (typeof captain.generateAuthToken !== 'function') {
            return res.status(500).json({ error: 'Token generation method not found on captain object' });
        }

        const token = await captain.generateAuthToken(); // Generate token after creating the captain
        console.log('Generated token:', token);
        return res.status(201).json({token, captain});
    } catch (error) {
        console.error('Error in registercaptain:', error);
        return res.status(500).json({message: 'Error registering captain', error: error.message});
    }
}


    module.exports.logincaptain = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await captainmodel.findOne({ email }).select('+password'); // Select the captain with the given email and include the password field

        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await captain.comparePassword(password); // Compare the provided password with the stored hashed password

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        try {
            const token = await captain.generateAuthToken(); // Generate token after successful login
            res.cookie('token',token);
            res.status(200).json({ token, captain });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }


    }

    module.exports.getcaptainprofile = async (req, res, next) => {
        // try {
        //     const captain = req.captain; // The authenticated captain is available in req.captain
        //     console.log(captain);
        //     res.status(200).json(captain);
        // } catch (error) {
        //     res.status(500).json({ message: 'Internal server error', error: error.message });
        // }
        res.status(200).json({captain : req.captain}); // The authenticated captain is available in req.captain
    }

module.exports.logoutcaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get the token from cookies or headers
        // await captainService.blacklistToken(token); // Blacklist the token to prevent further use
        await blacklistTokenmodel.create({ token }); // Save the token to the blacklist collection
        res.clearCookie('token'); // Clear the cookie
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}   

