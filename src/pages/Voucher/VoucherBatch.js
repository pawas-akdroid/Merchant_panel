import { Button, MultiSelect } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components'
import { MerchantTokenUrl } from '../../Utilities/Urls'
import { ErrorHandler, SuccessNotification } from '../../components/NotificationProvider'
import slugify from 'react-slugify'
import { Loadings } from '../../components/Loading'


const MerchantVoucherBatch = () => {
  const [data, setData] = useState()
  const [batch, setBatch] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
    MerchantTokenUrl().get(`/voucher-category/${id}`).then((res) => {
      setBatch(res?.data?.data?.batch)
      setRefresh(false)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [refresh])

  const handleEnable = (active, batch) => {
    MerchantTokenUrl().put(`voucher-list?active=${active}&batch=${batch}&id=${id}`,{}).then((res) => {
      SuccessNotification({ title: "Added!", message: "The Batch has been Updated." })
      setRefresh(true)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }

  const Addbatch = (e) => {
    e.preventDefault
    const body = { "batch": batch, id: id }
    console.log(body)
    MerchantTokenUrl().put(`voucher-category`, body).then((res) => {
      SuccessNotification({ title: "Added!", message: "The Batch has been added." })
      setRefresh(true)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }


  return (
    loading ? <Loadings /> :
      <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
        <Header category={"Sub Vouchers List"} title="List of Vouchers" />
        <form className='flex' >
          <MultiSelect
            data={batch}
            placeholder="Add Batch"
            searchable
            className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12  leading-tight"
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: slugify(query), label: query };
              setBatch(() => [...batch, item]);
              return item;
            }}
          />
          <Button onClick={Addbatch} className='m-1 p-1 w-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Add New</Button>
        </form>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Batch Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                <td className="py-4 px-6">
                  <Link to={"all"}>
                    All Batch voucher
                  </Link>
                </td>
                <td className="py-4 px-6">
                  Enable / Disable
                </td>
              </tr>
              {
                batch.map((e, i) =>
                  <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" htmlFor={i}>
                    <td className="py-4 px-6">
                      <Link to={e.value}>
                        {e.label}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <Button.Group>
                        <Button variant='outline' className='text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onClick={() => handleEnable(true, e.value)}>Enable</Button>
                        <Button variant='outline' className='text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onClick={() => handleEnable(false, e.value)}>Disable</Button>
                      </Button.Group>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>

        </div>
      </div>
  )
}

export default MerchantVoucherBatch