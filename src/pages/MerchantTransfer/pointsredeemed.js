import React from 'react'
import { Header } from '../../components';

function pointsredeemed() {
    return (
        <div className="md:m-1 mt-5 p-2 md:p-10 bg-white rounded-3xl  dark:bg-gray-700 dark:text-gray-200">
          <Header
            category="Points Table"
            title="List of points Redeemed"
          />
    
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-800 p-5 mb-2 rounded-t-2xl">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for Customers"
                />
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
                    Points Redeemed
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
    
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"></tr>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default pointsredeemed