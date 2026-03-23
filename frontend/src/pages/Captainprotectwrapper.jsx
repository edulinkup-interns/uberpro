import React,{useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Captaindatacontext } from "../context/Captaincontext";
import axios from "axios";

const Captainprotectwrapper = ({children}) => {

   const token = localStorage.getItem('token'); // token ko local storage se uthayenge
   const navigate = useNavigate();
   const {captain , setCaptain} = useContext(Captaindatacontext); // isse hum context se captain ka data le sakte hai
   const [isloading , setIsLoading] = useState(true); // isse hum loading state ko control kar sakte hai

    console.log(token);
    // ye token ko console me dekhne ke liye hai ki kya wo sahi se aa raha hai ya nahi
   // agar hum logout kar dete hai to token apne ap delete ho jata hai but jaisi man lo aapne login kiya to aaap home page par redirect ho gaye then agar hum logout kar dete hai to token delete ho jayenge to ab hum chahte hai
   // ki agar hum logout ho chuke hai to hum home page ko chodkar login page par chale jayenge to iss use effect me yahi hai ki agartoken nahi hai to login pe navigate karo
   //isliye humne app.js pe home ke uper userprotectwrapper laga diya jisse pahle sara content yaha aaye then home page par aap ja sakte hai
    useEffect(() => {
  if (!token) {
    navigate('/Captain-login'); // redirect if no token
    return; // stop further execution
  }

  //  Moved axios call inside useEffect
  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if (response.status === 200) {
      setCaptain(response.data.captain);
      setIsLoading(false);
    }
  }).catch((error) => {
    console.error("Error verifying captain:", error);
    navigate('/Captain-login');
  });

}, [token]); // all logic now inside one useEffect


    if(isloading){
      return (
        <div>Loading ...</div>
      )
        
    }



  return (
    <div>
     {children}
    </div>
  )
}

export default Captainprotectwrapper

