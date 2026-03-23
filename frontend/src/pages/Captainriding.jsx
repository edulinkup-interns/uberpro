import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Finishride from '../components/Finishride'

const Captainriding = () => {
  const [finishridepanel , setFinishridepanel] = useState(false);
  const finishridepanelref = useRef(null);

    useGSAP(function() {
   if(finishridepanel){
     gsap.to(finishridepanelref.current, {
      transform:'translateY(0)'
    })
   }else{
    gsap.to(finishridepanelref.current, {
      transform:'translateY(100%)'
    })
   }
  } , [finishridepanel])

  return (
     <div className='h-screen'>
      
        <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
          <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/Captain-login' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i class=" text-lg  font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
        <div className='h-4/5'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
         {/*yaha pe relative likhne par hi hamra icon hamri scrren par show hoga because abhi hamne usse hamari screen ke dusre part me apply kiya hai to uss part me agar hum relative likhenge tabhi wo mere niche wale part ke prospective se jagh lega  */}
        <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 '>
        <h5 onClick={()=>{
          setFinishridepanel(true);
      }} className='p-3 text-center w-[93%] absolute  top-0 '> <i className="text-3xl text-black ri-arrow-up-wide-fill"></i></h5>
           <h4 className='text-xl font-semibold '>5 km Away</h4>
           <button className='  bg-green-600 text-white font-semibold p-3 px-10 rounded'>Complete Ride</button>
        </div>

        <div ref={finishridepanelref} className='fixed  w-full h-screen z-10 bottom-0 px-3 translate-y-full bg-white py-10 pt-12'>
             <Finishride setFinishridepanel={setFinishridepanel}/>
      </div>
        
    </div>
  )
}

export default Captainriding
