import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Userlogout = () => {

  const token = localStorage.getItem('token'); // token ko local storage se uthayenge
  const navigate = useNavigate(); // useNavigate hook se navigate karenge

  axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
    headers:{
      Authorization: `Bearer ${token}` // token ko header me bhejenge
    }
  }).then((response) => {
    if(response.status === 200){
      localStorage.removeItem('token'); // agar response 200 aata hai to iska matlab hai ki user successfully logout ho gaya hai
      navigate('/login'); // user ko login page par redirect karenge
    }
  })
  // 


  return (
    <div>
     Userlogout
    </div>
  )
}

export default Userlogout
