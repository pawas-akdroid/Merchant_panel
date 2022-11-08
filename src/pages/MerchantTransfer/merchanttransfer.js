import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import OTPInput, { ResendOTP } from "otp-input-react";


function merchanttransfer() {
  const [OTP, setOTP] = useState("");
    return (
        
          <div className="container p-5 mx-auto">
            <div className="max-w-xl mx-auto bg-white rounded-md shadow-sm">
              <div className="text-center">
                <h1 className="my-3 text-3xl font-semibold text-gray-700">
                  Merchant Transfer
                </h1>
                <p className="text-gray-400">Send Points to User</p>
              </div>
              <div>
                <form action="" method="POST">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-600">
                      User Phone Number
                    </label>
                    <input
                      type="number"
                      name="name"
                      placeholder="9841XXXXX0"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-600">
                      Enter Points
                    </label>
    
                    <input
                      type="text"
                      name="name"
                      placeholder="10"
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </div>

                  
<div class="flex items-center">
    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to send points to the User. By agreeing you will receive an OTP.</label>
</div>


<div className='mt-2'>
    <p className='mb-2'>An OTP has been sent to your phone</p>
    <div className='mt-5'>
      <OTPInput classname="border-2 border-black text-black" value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false}  />
      
      </div>
      <ResendOTP onResendClick={() => console.log("Resend clicked")} />
    </div>

                  <div className="mb-6 mt-2">
                    <button
                      type="submit"
                      className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                    >
                      Send Points
                    </button>
                  </div>
                </form>
              </div>
            </div>
          
          
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-2xl p-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="py-3 px-6">
                  Customer ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Customer Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Points Transferred
                </th>
    
              
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             
                
                
                <td className="p-4 w-32">
                  <img
                    src="https://i.ytimg.com/vi/uODKrZnGk7g/maxresdefault.jpg"
                    alt="Product A"
                  />
                </td>
               
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                     +977-98XXXXXXXX
                  </td>
                
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    Pawas Mishra
                  </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                   20 Points
                </td>
    
                
                
              </tr>
    
    
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             
                
                
             <td className="p-4 w-32">
               <img
                 src="https://i.ytimg.com/vi/uODKrZnGk7g/maxresdefault.jpg"
                 alt="Product A"
               />
             </td>
           
               <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  +977-98XXXXXXXX
               </td>
            
             <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                 Sanam Maharjan
               </td>
             <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                30 Points
             </td>
    
             
             
           </tr>
    
    
           <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             
                
                
             <td className="p-4 w-32">
               <img
                 src="https://i.ytimg.com/vi/uODKrZnGk7g/maxresdefault.jpg"
                 alt="Product A"
               />
             </td>
             
               <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  +977-98XXXXXXXX
               </td>
            
             <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                 Sanjay Shrestha
               </td>
             <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                10 Points
             </td> 
           </tr>
    
           <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             
                
                
             <td className="p-4 w-32">
               <img
                 src="https://i.ytimg.com/vi/uODKrZnGk7g/maxresdefault.jpg"
                 alt="Product A"
               />
             </td>
           
               <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  +977-98XXXXXXXX
               </td>
      
             <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                 Apurba NR
               </td>
             <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                5 Points
             </td>
    
    
             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          
             
         
          
          
        </tr>
    
             
             
           </tr>
    
            </tbody>
    
        
    
          </table>
          <Link to= './merchantshow'>
          <div className='flex justify-end'>
            <p className='font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2 hover:cursor-pointer'> See all </p> 
          </div>
          </Link>
          </div>
      );
}

export default merchanttransfer