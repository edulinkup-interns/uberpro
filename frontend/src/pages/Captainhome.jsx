import React from 'react'
import { Link } from 'react-router-dom'
import Captaindetail from '../components/Captaindetail'
import Ridepopup from '../components/Ridepopup'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import  { useRef } from 'react'
import { useState } from 'react';
import ConfirmRidepopup from '../components/ConfirmRidepopup';


const Captainhome = () => {

   const [ridepopupPanel , setRidepopuppanel] = useState(true);
   const [confirmRidepopuppanel,setConfirmRidepopuppanel] = useState(false);
   const ridepopupPanelref = useRef(null);
   const confirmRidepopuppanelref = useRef(null); 

  useGSAP(function() {
   if(ridepopupPanel){
     gsap.to(ridepopupPanelref.current, {
      transform:'translateY(0)'
    })
   }else{
    gsap.to(ridepopupPanelref.current, {
      transform:'translateY(100%)'
    })
   }
  } , [ridepopupPanel])

   useGSAP(function() {
   if(confirmRidepopuppanel){
     gsap.to(confirmRidepopuppanelref.current, {
      transform:'translateY(0)'
    })
   }else{
    gsap.to(confirmRidepopuppanelref.current, {
      transform:'translateY(100%)'
    })
   }
  } , [confirmRidepopuppanel])


  return (
     <div className='h-screen'>
        <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
          <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/Captain-login' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i class=" text-lg  font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
        <div className='h-3/5'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>

        <div className='h-2/5 p-6'>
           <Captaindetail/>  {/* by this we are just taking all the stuf present on the diffrent page to taht page  */} 
        </div>
        <div ref={ridepopupPanelref} className='fixed  w-full z-10 bottom-0 px-3 translate-y-full bg-white py-10 pt-12'>
             <Ridepopup setRidepopuppanel={setRidepopuppanel} setConfirmRidepopuppanel={setConfirmRidepopuppanel}/>
      </div>
       <div ref={confirmRidepopuppanelref} className='fixed  w-full h-screen z-10 bottom-0 px-3 translate-y-full bg-white py-10 pt-12'>
             <ConfirmRidepopup setConfirmRidepopuppanel={setConfirmRidepopuppanel} setRidepopuppanel={setRidepopuppanel}/>
      </div>
    </div>
  )
  
}

export default Captainhome




