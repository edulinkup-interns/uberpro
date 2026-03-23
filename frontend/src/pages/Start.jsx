import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className=' bg-cover bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)]   h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
         <img className='w-16 ml-8' src="https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b652bd5f15b96e6dbd1aa1/1656115924895/uber+logo+white.png?format=1500w" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
        <h2 className='text-3xl font-bold'>Get started with Uber</h2>
        <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>   
        </div>
        {/* 2. link ke andar to ki madad se hum jaha jana hai wha ja sakte hai bina kisi reload ke  */}
          
      </div>
    </div>
  )
}

export default Start