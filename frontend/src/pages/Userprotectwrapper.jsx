import React,{useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Userdatacontext } from "../context/UseContext";

const Userprotectwrapper = ({children}) => {

   const token = localStorage.getItem('token'); // token ko local storage se uthayenge
   const navigate = useNavigate();
   console.log(token); // ye token ko console me dekhne ke liye hai ki kya wo sahi se aa raha hai ya nahi
  
   // agar hum logout kar dete hai to token apne ap delete ho jata hai but jaisi man lo aapne login kiya to aaap home page par redirect ho gaye then agar hum logout kar dete hai to token delete ho jayenge to ab hum chahte hai
   // ki agar hum logout ho chuke hai to hum home page ko chodkar login page par chale jayenge to iss use effect me yahi hai ki agartoken nahi hai to login pe navigate karo
   //isliye humne app.js pe home ke uper userprotectwrapper laga diya jisse pahle sara content yaha aaye then home page par aap ja sakte hai
    useEffect(()=>{
      if(!token){
        navigate('/login'); // agar user ka email nahi hai to wo login page  par hi redirect ho jayega
    }
    } ,[token])
  return (
    <div>
     {children}
    </div>
  )
}

export default Userprotectwrapper
