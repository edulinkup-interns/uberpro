
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidepopup = (props) => {
  const [otp , setOtp] = useState('');

  const submithandler=(e)=>{
    e.preventDefault();
  }
  return (
     <div>
     <h5 onClick={()=>{
        props.setRidepopuppanel(false);  // mera ye page uss home page se juda hua hai abhi mere home page par iss page ko true de rakaha hai to ye dikh raha hai jaisi hi mai click karunga to ye false set ho jayega or iss props ke through home page pe chala jayega 
      }} className='p-3 text-center w-[93%] absolute top-0 '> <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
        
        <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg '>
            <div className='flex items-center gap-3 '>
                <img className='h-12 w-12 rounded-full object-cover'  src="https://live.staticflickr.com/7160/6410037157_8a32776d93_b.jpg" alt="" />
                <h2 className='text-lg font-medium'>Satyaprakash agrawal</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
        <div className='flex  justify-between flex-col items-center'>
          
          <div className='w-full mt-5'>

            <div className=' flex items-center gap-5 p-2  border-b-2'>
              <i className="ri-map-pin-line text-lg"></i>
              <div>
                <h3 className='text-lg font-medium'>345/34</h3>
                <p className='text-sm -mt-1 text-gray-600'> Bhilwara , Rajasthan</p>
              </div>
            </div>


            <div  className=' flex items-center gap-5 p-2 border-b-2'>
              <i className="ri-map-pin-user-fill text-lg"></i>
              <div>
                <h3 className='text-lg font-medium'>345/34</h3>
                <p className='text-sm -mt-1 text-gray-600'> Karauli , Rajasthan</p>
              </div>
            </div>


            <div  className=' flex items-center gap-5 p-2'>
              <i className="ri-currency-line text-lg"></i>
              <div>
                <h3 className='text-lg font-medium'>₹290.20</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
              </div>
            </div>

          </div>

          {/* so in this the system is happne like in home.jsx i am just building an div that contains the hole page of this confirmride so i am just gave the value from there to home .jsx so when i am click to
             confirm button the true will go to the home page and then it will initiate the another page looking driver with thw help of gsap and that change in ui will be done only by the usestate 
          */}

          <div className="w-full mt-6">

            <form onSubmit={(e)=>{
              submithandler(e)
            }}>
              <input value={otp} onChange={(e)=>setOtp(e.target.value)} className='bg-[#eeeeee] px-5 mb-2 py-4 font-mono  text-base rouded-lg w-full mt-3 placeholder:text-lg'  type="text" placeholder='Enter OTP' />

            <Link to='/captain-riding' className=' w-full mt-1  flex justify-center bg-green-600 text-white font-semibold p-3 rounded'>Confirm</Link>
           <button onClick={()=>{
              props.setConfirmRidepopuppanel(false)
              props.setRidepopuppanel(false)
          }} className=' bg-red-700 w-full mt-1 text-white font-semibold p-3 rounded'>Cancel</button>

            </form>
          </div>
          
        </div>
    </div>
  )
}

export default ConfirmRidepopup



