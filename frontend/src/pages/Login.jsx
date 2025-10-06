import React from 'react'
import { Form, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { AppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'

const Login = () => {


  const { backendUrl, token, setToken } = useContext(AppContext)
  console.log(token)

  const navigate = useNavigate()


  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [dateOfBirth, setdateOfBirth] = useState('')

  const onSubmitHandler = async (event) => {
  
    event.preventDefault()
   

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/signup', { dateOfBirth,username, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          console.log("show error")
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/home');        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log("show error")
      toast.error(error.message)
    }
  }




  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3  m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "Sign Up" : "Log in"} to book appointment</p>
        {
          state === "Sign Up" && <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setUsername(e.target.value)} value={username} required />
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
         <div className='w-full'>
          <p>DOB</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setdateOfBirth(e.target.value)} value={dateOfBirth} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button type='submit' onClick={onSubmitHandler} className='bg-blue-500 text-white w-full py-2 rounded-md text-base  ' >{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up"
            ? <p>Already have a account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
