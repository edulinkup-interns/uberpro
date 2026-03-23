import React, {  useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {Userdatacontext} from "../context/UseContext";

// in this ek baat hamesha yad rakhna ki jo apne backend me schema bana rahe hai same apne ko yaha pe naam rakhna hai ex le to agar waha par hamene firstname likha hai to yaha par bhi firstname hi hona chaiye
const Usersignup = () => {
  const [firstname , setFirst] = useState('');
  const [lastname , setSecond] = useState('');
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [userdata , setUserdata] = useState('');
  
  const navigate = useNavigate();
  
     const {user,setUser} = useContext(Userdatacontext);
    const submithandler = async (e)=>{
      
      e.preventDefault();
      const newuser={
        fullname:{
          firstname:firstname ,
          lastname:lastname
        },
        email:email,
        password : password 
      }
      // abb jo ue uper newuser ke andar jo bhi data hai iss backend me bej denge
      //  abb isme jo hum url use karnge wo development me alag rahegi or production ke time wo change ho jayegi
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newuser);
      
       if(response.status === 201){
        // agar response 200 aata hai to iska matlab hai ki user successfully register ho gaya hai
        // ab hame user ko home page par redirect karna hai
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token); // this will set the token in the local storage so that we can use it later to authenticate the user
        navigate('/home');
       }
        

        setEmail('');
        setFirst('');
        setPassword('');
        setSecond('');
    }
  return (
      <div className="p-7 h-screen flex flex-col justify-between">
           {/* this is an simple form of login */}
           <div>
             <img
               className="w-16 mb-10"
               src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
               alt=""
             />
             <form onSubmit={(e)=>submithandler(e)}>
               
              <h3 className="text-lg mb-2 font-medium">What's your name</h3>
               <div className="flex gap-4 mb-5">
                 <input
                 required
                 type="text"
                 value={firstname}
                 onChange={(e)=>setFirst(e.target.value)}
                 className="bg-[#eeeeee] mb-5 w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                 placeholder="First name"
               />
               <input
                 required
                 type="text"
                 value={lastname}
                 onChange={(e)=>setSecond(e.target.value)}
                 className="bg-[#eeeeee] mb-5 w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                 placeholder="Last name"
               />
               </div>
     
     
     
     
               <h3 className="text-lg mb-2 font-medium">What's your email</h3>
               <input
                 required
                 type="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                 placeholder="email@gmail.com"
               />
               <h3 className="text-lg mb-2 font-medium">Enter password</h3>
               <input
                 required
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 type="password"
                 className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                 placeholder="password"
               />
               <br /><br />
               <button className="bg-[#111] font-semibold text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
                 Create Account
               </button>
     
             </form>
              <p className="text-center">Already have a account?  <Link to='/login' className="text-blue-600">Login here</Link></p>
           </div>
             
           <div>
             <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and the <span className="underline"> Google Privacy Policy </span>  and <span className="underline"> Terms of Service apply</span></p>
           </div>
         </div>
  )
}

export default Usersignup
