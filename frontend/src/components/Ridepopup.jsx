import React from "react";

const Ridepopup = (props) => {
  return (
    <div>
     <h5 onClick={()=>{
        props.setRidepopuppanel(false);  // mera ye page uss home page se juda hua hai abhi mere home page par iss page ko true de rakaha hai to ye dikh raha hai jaisi hi mai click karunga to ye false set ho jayega or iss props ke through home page pe chala jayega 
      }} className='p-3 text-center w-[93%] absolute top-0 '> <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
        
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
          
          <div className="flex w-full items-center justify-between mt-5">  {/*buttons ka jaal in this ignore and accept buttons was therir so the rider will choose either accept or reject*/}
            <button onClick={()=>{
               props.setRidepopuppanel(false)
           }} className='  bg-gray-300 text-black font-semibold p-3 px-10 rounded'>Ignore</button>

            <button onClick={()=>{
           props.setConfirmRidepopuppanel(true)
          }} className='  bg-green-600 text-white font-semibold p-3 px-10 rounded'>Accept</button>

          </div>

        </div>
    </div>
  )
}

export default Ridepopup




