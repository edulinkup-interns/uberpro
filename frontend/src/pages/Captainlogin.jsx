import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Captaindatacontext } from '../context/Captaincontext.jsx';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Captainlogin = () => {
const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const { captain , setCaptain} = React.useContext(Captaindatacontext); // this is how we can use the context that we have created in UseContext.jsx file
  const navigate = useNavigate(); // this is used to navigate to the other page after login 

  // now we can use this userdata anywhere because that consist the email and password that we have fill in our form
   const handlesubmit= async(e)=>{
    e.preventDefault();   // so forms ka default feature hota hai ki wo submit hone ke baad refresh ho jati hai so iise wo refresh nahi hoti or hame output dikh jata hai 
    const captaindata ={
      email : email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captaindata); // this is the api that we have created in our backend to login the user
    
      if(response.status === 200){ // if the response is successful then we will set the user data in the context and navigate to the home page
        const data = response.data; // this will give us the user data that we have set in our backend
        setCaptain(data.captain); // this will set the user data in the context
        localStorage.setItem('token', data.token); // this will set the token in the local storage so that we can use it later to authenticate the user
        navigate('/Captain-home'); // this will navigate to the home page
      }
    

    
    setEmail('');
    setPassword('');
   }

  return (
    <div>
        <div className="p-7 h-screen flex flex-col justify-between">
            {/* this is an simple form of login */}
            <div>
              <img
                className="w-20 mb-3"
                src="https://www.svgrepo.com/show/505031/uber-driver.svg"
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
               <p className="text-center">Join a Fleet?  <Link to='/Captain-signup' className="text-blue-600">Register as a Captain</Link></p>
            </div>
              
            <div>
              <Link to='/login' className="bg-[#b48810] flex items-center justify-center font-semibold text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign in as User</Link>
            </div>
          </div>
    </div>
  )
}

export default Captainlogin
