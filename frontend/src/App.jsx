import React from 'react'
import { Route, Routes } from 'react-router-dom'



import { ToastContainer, toast } from 'react-toastify';
import Login from './pages/login';
import Home from './pages/Home';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      
      <Routes>
        
        
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    
    </div>
  )
}

export default App
