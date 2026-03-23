import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Userdatacontext } from "../context/UseContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Userlogin = () => {
    
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [userdata , setUserdata] = useState({});

  const {user, setUser} = useContext(Userdatacontext); // this is how we can use the context that we have created in UseContext.jsx file
  const navigate = useNavigate(); // this is used to navigate to the other page after login

  // now we can use this userdata anywhere because that consist the email and password that we have fill in our form
   const handlesubmit= async(e)=>{
    e.preventDefault();   // so forms ka default feature hota hai ki wo submit hone ke baad refresh ho jati hai so iise wo refresh nahi hoti or hame output dikh jata hai 
    const userdata = {
      email : email,
      password: password
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userdata); // this is the api that we have created in our backend to login the user
    // agar user page ko reload kar dega to sara data chala jayega to ab uss data ke liye user pe rely hone se accha token pe relay ho lete
    if(response.status === 201){ // if the response is successful then we will set the user data in the context and navigate to the home page
      const data = response.data; // this will give us the user data that we have set in our backend
      setUser(data.user); // this will set the user data in the context
      localStorage.setItem('token', data.token); // this will set the token in the local storage so that we can use it later to authenticate the user
      navigate('/home'); // this will navigate to the home page
    }

    setEmail('');
    setPassword('');
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
        <form onSubmit={(e)=>handlesubmit(e)}>
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}   // hum ye isliye kar rahe hai ki agar hum input feild me kuch bhi likhe to raect ko uska pata chalta rahe without this react will not know what we want to write
            type="email"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="email@gmail.com"
          />
          <h3 className="text-lg mb-2 font-medium">Enter password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="password"
          />
          <button className="bg-[#111] font-semibold text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            log in
          </button>

        </form>
         <p className="text-center">New Here?  <Link to='/signup' className="text-blue-600">Create new Account</Link></p>
      </div>
        
      <div>
        <Link to='/Captain-login' className="bg-[#10b461] flex items-center justify-center font-semibold text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign in as Captain</Link>
      </div>
    </div>
  );
};

export default Userlogin;
