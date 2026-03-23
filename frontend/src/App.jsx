import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/Usersignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import Start from './pages/Start'
import Userprotectwrapper from './pages/Userprotectwrapper'
import Userlogout from './pages/Userlogout'
import Captainhome from './pages/Captainhome'
import Captainprotectwrapper from './pages/Captainprotectwrapper'
import Riding from './pages/Riding'
import Captainriding from './pages/Captainriding'

const App = () => {
  return (
    <div>     
      {/* yaha par jayada kuch nahi horaha hai just hamne routws banaya hai isme hamne path define kiya hai or iss path ke jariye hum in elemnt me jayenge tahts it */}
      <Routes>   
         <Route path="/" element={<Start/>} /> 
         <Route path="/login" element={<Userlogin/>} />
         <Route path='/signup' element={<Usersignup/>}/>
         <Route path='/riding' element={<Riding/>} />
         <Route path='/Captain-login' element={<Captainlogin/>}/>
         <Route path='/captain-riding' element={<Captainriding/>}   />
         <Route path='/Captain-signup'  element={<Captainsignup/>}/>
         <Route path='/home' element={
          <Userprotectwrapper>
            <Home/>
          </Userprotectwrapper>
         }/>
         <Route path='/user/logout' element={<Userlogout/>} />
         {/* yaha par hamne user logout ka route banaya hai jisse user logout kar sake */}
         <Route path='/Captain-home' element={
          <Captainprotectwrapper>
            <Captainhome/>
          </Captainprotectwrapper>
         }/>
         {/* yaha par hamne captain home ka route banaya hai jisse captain home page par ja sake */}
      </Routes>
    </div>
  )
}


export default App
