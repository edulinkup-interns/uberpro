import React, {  useState } from "react";
import { Link } from "react-router-dom";
import {Captaindatacontext} from '../context/Captaincontext.jsx'
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { header } from "express-validator";

const Captainsignup = () => {
  
    const navigate = useNavigate(); // this is used to navigate to the other page after login

  const [firstname , setFirst] = useState('');
    const [lastname , setSecond] = useState('');
    const [password , setPassword] = useState('');
    const [email , setEmail] = useState('');


const [color, setColor] = useState('');
const [numberplate, setNumberplate] = useState('');
const [capacity, setCapacity] = useState('');
const [vehicletype, setVehicletype] = useState('');
    
    

       const {captain , setCaptain} = React.useContext(Captaindatacontext); // this is how we can use the context that we have created in UseContext.jsx file
      const submithandler = async(e)=>{
        
        e.preventDefault();
        const captaindata =({
          fullname:{
            firstname:firstname ,
            lastname:lastname
          },
          email:email,
          password : password ,
          vehicle:{
            color:color,
            numberplate:numberplate,
            capacity:capacity,
            vehicletype:vehicletype
          }
        })

        const respnse = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captaindata); // this is the api that we have created in our backend to login the user
         
        if(respnse.status === 201){ // if the response is successful then we will set the user data in the context and navigate to the home page
          const data = respnse.data; // this will give us the user data that we have set in our backend
          setCaptain(data.captain); // this will set the user data in the context
          localStorage.setItem('token', data.token); // this will set the token in the local storage so that we can use it later to authenticate the user
          navigate('/Captain-home'); // this will navigate to the home page
        }
        
          setEmail('');
          setFirst('');
          setPassword('');
          setSecond('');
          setColor('');
          setNumberplate('');
          setCapacity('');
          setVehicletype('');

      }


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      {/* this is an simple form of login */}
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={(e)=>submithandler(e)}>
          
         <h3 className="text-lg mb-2 font-medium">What's Our Captain name</h3>
          <div className="flex gap-4 mb-5">
            <input
            required
            type="text"
            value={firstname}
            onChange={(e)=>setFirst(e.target.value)}
            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
            placeholder="First name"
          />
          <input
            required
            type="text"
            value={lastname}
            onChange={(e)=>setSecond(e.target.value)}
            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
            placeholder="Last name"
          />
          </div>




          <h3 className="text-lg mb-2 font-medium">What's Our Captain email</h3>
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
          <br />


          <h3 className="text-lg font-medium mb-2">Vehical Information</h3>
           <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={color}
              onChange={(e) => {
                setColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={numberplate}
              onChange={(e) => {
                setNumberplate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={capacity}
              onChange={(e) => {
                setCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicletype}
              onChange={(e) => {
                setVehicletype(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>





          
          <button className="bg-[#111] font-semibold text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Create captain Account
          </button>

        </form>
         <p className="text-center">Already have a account?  <Link to='/Captain-login' className="text-blue-600">Login here</Link></p>
      </div>
        
      <div>
        <p className="text-[10px] leading-tight mt-8 ">This site is protected by reCAPTCHA and the <span className="underline"> Google Privacy Policy </span>  and <span className="underline"> Terms of Service apply</span></p>
      </div>
    </div>
  )
}

export default Captainsignup
