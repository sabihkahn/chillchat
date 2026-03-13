import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Contactus from './pages/Contactus'
import PrivacyPolicy from './pages/PrivacyPolicy'

const App = () => {
  return (
    <>
   
  <Routes>
    <Route path='/' element={<Homepage />} />
     <Route path='/about' element={<About />} />
     <Route path='/contactus' element={<Contactus />} />
     <Route path='/privacypolicy' element={<PrivacyPolicy />} />
  </Routes>
    
    </>
  )
}

export default App