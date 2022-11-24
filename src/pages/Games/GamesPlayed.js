import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components'
import { Loadings } from '../../components/Loading'
import { ErrorHandler } from '../../components/NotificationProvider'
import { MerchantTokenUrl } from '../../Utilities/Urls'

const GamesPlayed = () => {


    const [data, setData] = useState('')
    const [loading, setLoadings] = useState(true)


    useEffect(() => {
        MerchantTokenUrl().get('/played-game').then((res) => {
            console.log(res)
            setLoadings(false)
        }).catch(err => {
            setLoadings(false)
            ErrorHandler(err)
        })
    }, [])
    return (
        loading ? <Loadings /> :

            <>
                <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
                    <Header category="Games" title="List of Games Played" />



                    <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-800 p-5 mb-2 rounded-t-2xl">

                    </div>
                    {
                        data.length > 0 ? <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-2xl">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>

                                    <th scope="col" className="py-3 px-6">
                                        Game Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Winner Number
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Point
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Helped user to play
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((e, i) =>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                            <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                                {e.name}
                                            </td>
                                            <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                                {e.id}
                                            </td>

                                            <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                                <Link to={e.id}>
                                                    View
                                                </Link>
                                            </td>

                                        </tr>
                                    )

                                }

                            </tbody>



                        </table>
                            :
                            <p className='p-5'>No Data Found.</p>
                    }




                </div>

            </>
    )
}

export default GamesPlayed