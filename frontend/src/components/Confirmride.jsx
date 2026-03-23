import React from 'react'

const Confirmride = (props) => {
  return (
    <div>
      <h5 onClick={()=>{
        props.setVehicalpannel(false);
      }} className='p-3 text-center w-[93%] absolute top-0 '> <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>
        
        <div className='flex  justify-between flex-col items-center'>
          <img className='h-21' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          
          <div className='w-full mt-5'>

            <div className=' flex items-center gap-5 p-2  border-b-2'>
              <i className="ri-map-pin-line text-lg"></i>
              <div>
                <h3 className='text-lg font-medium'>345/34</h3>
                <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
              </div>
            </div>


            <div  className=' flex items-center gap-5 p-2 border-b-2'>
              <i className="ri-map-pin-user-fill text-lg"></i>
              <div>
                <h3 className='text-lg font-medium'>345/34</h3>
                <p className='text-sm -mt-1 text-gray-600'> {props.destination}</p>
              </div>
            </div>


            <div  className=' flex items-center gap-5 p-2'>
              <i className="ri-currency-line text-lg"></i>
              <div>
                <h3 className='text-lg font-medium'>
                  {console.log('Confirmride - props.fare:', props.fare)}
                  {console.log('Confirmride - props.vehicleType:', props.vehicleType)}
                  {console.log('Confirmride - props.fare[props.vehicleType]:', props.fare?.[props.vehicleType])}
                  {props.fare?.[props.vehicleType] ? `₹${props.fare[props.vehicleType]}` : '₹--'}
                </h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
              </div>
            </div>

          </div>

          {/* so in this the system is happne like in home.jsx i am just building an div that contains the hole page of this confirmride so i am just gave the value from there to home .jsx so when i am click to
             confirm button the true will go to the home page and then it will initiate the another page looking driver with thw help of gsap and that change in ui will be done only by the usestate 
          */}
          <button onClick={()=>{
            props.setVehicalfound(true);
            props.setConfirmridepannel(false);   // iska matalab ye hai ki apne jab click kiya tab to apka viechl confirm ya fir kahe sakte hai veihcal foind wala page khul gaya or apka confirm panale wala page band ho jayega apne aap confirm panel wale me apke sare viechlla ke option aate hai 
            props.createRide(); // iske through hamne createRide function ko call kar diya hai 
          }} className='w-full mt-5 bg-green-600 font-semibold p-2 rounded'>Confirm</button>
        </div>

    </div>
  )
}

export default Confirmride
