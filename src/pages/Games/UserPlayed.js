
import React from 'react'


import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function UserPlayed() {
 
    const [value, setValue] = useState()
  
    
    return (
      <div className='ml-4 w-11/12 border-2 p-4 mt-0 '>
        <div className=' ml-2  p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full'>
          <h1 className='text-3xl font-extrabold tracking-tight text-slate-900'> User Play</h1>
          <h4 className=' text-lg text-gray-400 '> Help your users play the game they want and they desire</h4>
        </div>
  
        <div className=' flex justify-between md:p-5 mt-0 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl ml-8 w-5/12' >
           <img src="https://i.ytimg.com/vi/uODKrZnGk7g/maxresdefault.jpg" alt="Game A" /> 
        </div>
        
      <PhoneInput
        className='w-1/2 flex justify-between dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full ml-2 md:m-2 p-2 md:p-10 '
        placeholder="phone number"
        value={value}
        
        onChange={setValue}/>
          
          <Link to = "/gamescategory/userplay/otp">
         <button type="submit" className="ml-8 flex px-4 py-2 text-white bg-green-500 rounded shadow-xl">
                  Submit
                </button>
                </Link> 
        </div>
    )
  }

export default UserPlayed