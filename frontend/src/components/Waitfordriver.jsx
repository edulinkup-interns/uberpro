import React from 'react'

const Waitfordriver = (props) => {
  return (
     <div>
      <h5 onClick={()=>{
        props.setWaitingfordriver(false);
      }} className='p-3 text-center w-[93%] absolute top-0 '> <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
        

       <div className='flex items-center justify-between'>
           <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>Shreyansh</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>RJ 3490 1234</h4>
            <p className='text-sm text-gray-600'>AUDI A00</p>
          </div>
       </div>
          
        <div>
          <div className='flex  justify-between flex-col items-center'>
          <div className='w-full mt-5'>

            <div className=' flex items-center gap-5 p-2  border-b-2'>
              <i className="ri-map-pin-line text-lg"></i>
              <div>
                <h3 className='text-lg font-medium'>345/34</h3>
                <p className='text-sm -mt-1 text-gray-600'> Karauli , Rajasthan</p>
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
          
        </div>
        
        </div>

    </div>
  )
}

export default Waitfordriver
