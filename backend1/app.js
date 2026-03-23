const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connecttodb = require('./db/db');
connecttodb();
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/' , (req , res)=>{
   res.send("hello world");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)

module.exports = app;

