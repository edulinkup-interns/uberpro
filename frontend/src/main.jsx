import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UseContext from './context/UseContext.jsx'
import Captaincontext from './context/Captaincontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Captaincontext>
     <UseContext>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </UseContext>
   </Captaincontext>
  </StrictMode>,
)
