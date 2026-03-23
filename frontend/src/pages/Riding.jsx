import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        {/* right-2 se hum uper the ab right side me 2 chodkar chale gae hai or top-2 se hum top se 2 kadam niche chale gaye */}
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg ri-home-5-line"></i>
        </Link>
        <div className='h-1/2'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>

        <div className='h-1/2 p-4'>
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
            <button className='w-full mt-5 bg-green-600 font-semibold p-2 rounded'>Make a Payment</button> 
        </div>
    </div>
  )
}

export default Riding
