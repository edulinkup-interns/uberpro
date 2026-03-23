import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import Locationsearchpannel from '../components/Locationsearchpannel'
import Vehiclepannel from '../components/Vehiclepannel'
import Confirmride from '../components/Confirmride'
import Lookingfordriver from '../components/Lookingfordriver'
import Waitfordriver from '../components/Waitfordriver'
import axios from 'axios';

const Home = () => {

   const [pickup , setPickup] = useState('')
   const [destination , setDestination] = useState('')
   const [pannel , setPannel] = useState(false);
   const [vehicalpanel , setVehicalpannel] = useState(false);
   const [confirmridepannel , setConfirmridepannel] = useState(false);
   const [vehicalfound , setVehicalfound] = useState(false);
   const [waitingfordriver , setWaitingfordriver] = useState(false);
   const [vehicleType , setVehicleType] = useState(null)

   const confirmridepannelref = useRef(null);
   const vehicalpanelref = useRef(null);
   const pannelcloseref = useRef(null);
   const pannelref = useRef(null)
   const Vehicalfoundref = useRef(null);
   const Waitingfordriverref = useRef(null);


   const [ pickupSuggestions, setPickupSuggestions ] = useState([])
   const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
   const [ activeField, setActiveField ] = useState(null)
   const [ fare, setFare ] = useState({})

   // this ref we will give to that page in which we want to make a change 

   const submithandler = (e)=>{
    e.preventDefault();
   }

   const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        console.log("API response:", response.data);
        console.log("Setting pickup suggestions:", response.data);
        setPickupSuggestions(response.data)
    } catch (error) {
        console.log("Error fetching suggestions:", error);
    }
}




const handleDestinationChange = async (e) => {
  setDestination(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      console.log("Destination API response:", response.data);
      setDestinationSuggestions(response.data)
  } catch {
      // handle error
  }
}


















  
   //in this gsap hum bus hamare pannel ko uper or niche le ja sakte hai saath hi agar uper le gaye to aarow dikhega opacity 1 ki wajh se agar niche layenge to arrow gayab due to opacity 0
   useGSAP(function() {
    if(pannel){
      gsap.to(pannelref.current, {
        height: '70%',
        padding:24
      })
      gsap.to(pannelcloseref.current, {
        opacity: 1
      })
    }else{
      gsap.to(pannelref.current, {
        height: '0%',
        padding:0
      })
      gsap.to(pannelcloseref.current, {
        opacity: 0
      })
    }
   },[pannel]);

   useGSAP(function() {
   if(vehicalpanel){
     gsap.to(vehicalpanelref.current, {
      transform:'translateY(0)'
    })
   }else{
    gsap.to(vehicalpanelref.current, {
      transform:'translateY(100%)'
    })
   }
  } , [vehicalpanel])



   useGSAP(function() {
   if(confirmridepannel){
     gsap.to(confirmridepannelref.current, {
      transform:'translateY(0)'
    })
   }else{
    gsap.to(confirmridepannelref.current, {
      transform:'translateY(100%)'
    })
   }
  } , [confirmridepannel])


  useGSAP(function() {
   if(vehicalfound){
     gsap.to(Vehicalfoundref.current, {
      transform:'translateY(0)'
    })
   }else{
    gsap.to(Vehicalfoundref.current, {
      transform:'translateY(100%)'
    })
   }
  } , [vehicalfound])

  useGSAP(function() {
   if(waitingfordriver){
     gsap.to(Waitingfordriverref.current, {
      transform:'translateY(0)'
    })
   }else{
    gsap.to(Waitingfordriverref.current, {
      transform:'translateY(100%)'
    })
   }
  } , [waitingfordriver])

  // by this there was an button will be given so after click find trip my that page was now false means close and another page setviecalpanel was open
  async function findTrip() {
    try {
      console.log('Finding trip for:', pickup, 'to', destination);
      
      if (!pickup || !destination) {
        alert('Please enter both pickup and destination locations');
        return;
      }

      setVehicalpannel(true)
      setPannel(false)

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: { pickup, destination },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      console.log('Fare response:', response.data)
      setFare(response.data)
    } catch (error) {
      console.error('Error fetching fare:', error);
      alert('Error fetching fare. Please try again.');
      setVehicalpannel(false)
    }
  }



// abb hame iske andar viechal type nahi dalna padega hamne confirm ride me sidthe usse pass kar diya hai niche 
  async function createRide() {
    console.log("createRide called");
    try {
      console.log("createRide called with:", vehicleType);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Ride created (full response):", response.data);
    } catch (error) {
      console.error("Error creating ride:", error);
      if (error.response) {
        console.error("Backend response:", error.response.data);
      }
    }
  }



   // in this the concept of pannel is like that we firstly make it false so it will at its 0%height but when we make it as true when we click on the add a pick location so at that time the arrow will false so when we first click on arror it does not affect

  return (
    // we are just use this overflow hidden to save the screen to overflow otherwise the screen will be overflow and will be scrollable 
    <div className='relative flex h-screen overflow-hidden'>    
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
       
      <div className='h-screen w-screen'>
       <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' absolute justify-end flex flex-col w-full top-0 h-screen'>
        <div className='h-[30%] bg-white p-6 relative'>
          <h5  ref={pannelcloseref} onClick={()=>setPannel(false)}  className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i class="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className='font-semibold text-2xl '>Find a trip</h4>
        <form onSubmit={(e)=>{
          submithandler(e)
        }}>
          <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
          <input 
          className='bg-[#eeeeee] px-12 mb-2  py-2 text-base rouded-lg w-full mt-5  placeholder:text-sm' 
          value={pickup}
          onClick={()=>{
            setPannel(true) 
            setActiveField('pickup')
          } }
          // onChange={(e)=>setPickup(e.target.value)}
          onChange={handlePickupChange}
          type="text" 
          placeholder='Add a pick-up location' />
          <input 
          className='bg-[#eeeeee] px-12 mb-2 py-2  text-base rouded-lg w-full mt-3 placeholder:text-sm' 
          type="text"
          value={destination}
          onClick={()=>{
            setPannel(true)
            setActiveField('destination')
          }}
          // onChange={(e)=>setDestination(e.target.value)} 
          onChange={handleDestinationChange}
          placeholder='Enter your destination'/>
        </form>
        <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
        </button>
        </div>
        <div ref={pannelref} className='h-0 bg-white'>
         <Locationsearchpannel 
         suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
         setPannel={setPannel} 
         setVehicalpannel={setVehicalpannel}
         setPickup={setPickup}
         setDestination={setDestination}
         activeField={activeField}  
        />
        </div>
      </div>
      <div ref={vehicalpanelref} className='  fixed  w-full z-10 bottom-0 px-3 bg-white py-10 pt-12 translate-y-full'>
             <Vehiclepannel selectVehicle={setVehicleType} setConfirmridepannel={setConfirmridepannel} fare={fare} setVehicalpannel={setVehicalpannel}/>
      </div>
      {/* that confirm ride was an another pop up page that will come when i just click on any viehcal like car , moto and others  */}
       <div ref={confirmridepannelref} className='  fixed  w-full z-10 bottom-0 px-3 bg-white py-6 pt-12 translate-y-full'>
           <Confirmride vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination} createRide={createRide} setVehicalfound = {setVehicalfound} setConfirmridepannel={setConfirmridepannel} /> 
      </div>

      <div ref={Vehicalfoundref} className='  fixed  w-full z-10 bottom-0 px-3 bg-white py-6 pt-12 translate-y-full'>
           <Lookingfordriver setVehicalfound = {setVehicalfound} />
      </div>

      <div ref={Waitingfordriverref} className='  fixed  w-full z-10 bottom-0 px-3 bg-white py-6 pt-12 translate-y-full'>
           <Waitfordriver setWaitingfordriver = {setWaitingfordriver}/>
      </div>

    </div>
  )
}

export default Home


//-ml-2 iski mada se hum apne content jo ki gadi ke side me hai usko control kar sakte hai