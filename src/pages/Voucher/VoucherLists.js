import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Header } from '../../components'
import { MerchantTokenUrl } from '../../Utilities/Urls'
import { Button, Checkbox, Modal, Pagination, Select } from '@mantine/core'
import { Loadings } from '../../components/Loading'
import {  SuccessNotification, ErrorHandler } from '../../components/NotificationProvider'
import { Title } from '../../components/Header'
import { useSelector } from 'react-redux'




const VoucherList = () => {
  const { id, batch } = useParams()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [enable, setEnable] = useState(false)
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [opened, setOpened] = useState(false)
  const [pages, setPages] = useState('')
  const [items, setItem] = useState([])
  const [button, setButton] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [batche, setBatch] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [batch_, setBatchOf] = useState("")
  const history = useNavigate()
  const merchant = useSelector(p=>p?.merchant.merchant)



  useEffect(() => {
    Title("Voucher Lists")
    setTimeout(()=>setLoading(false), 1000)
    let batchData = batch === "all" ? null : batch
    MerchantTokenUrl().get(`/voucher-lists/${id}?page=${page}&enable=${enable}&batch=${batchData}`).then((res) => {
      setPages(res?.data?.data?.totalPages)
      setData(res?.data?.data?.data)
      console.log(res?.data?.data)
      setRefresh(false)
      setBatchOf("")
    }).catch((err) => {
      ErrorHandler(err)
    })

  }, [page, enable, refresh,])


  const [batchs, setBatchs] = useState([])

  useEffect(() => {
    MerchantTokenUrl().get(`/voucher-category/${id}`).then((res) => {
      setBatchs(res?.data?.data?.batch)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [])


  const handlePrint = () => {
    let batchData = batch === "all" ? null : batch
    MerchantTokenUrl().get(`/download-voucher-lists-admin/${id}?batch=${batchData}&merchant=${merchant.id}`,).then((res) => {
      window.open(`${ImgUrl}${res.data.data}`, "_blank", 'noopener, noreferrer')
    }).catch((err) => { 
      console.log(err)
      ErrorHandler(err)
    })
  }


  const Select = (e) => {
    var item = items;
    if (item.includes(e)) {
      item.pop(e)
      setItem(item)
    }
    else {
      item.push(e)
      setItem(item)
    }
    console.log(items);
    if (items.length>0) return setButton(true) 
    else return setButton(false)
  }
  const handleEnable = (e) => {
    setEnable(e.target.value)
    if (e.target.value === "false") return setActive(true)
    else return setActive(false)
  }

  const Update = () => {
    let active;
    if (enable === true) {active = false}
    else {active = true}
    if (items==="") return ErrorNotification({title:"Error", message:"Please select one item to update."})
    if (confirm("Do You want to update?")) {
      MerchantTokenUrl().put('/voucher-list', { items: items, from: from, to: to, active: active, batch: batch_, id: id }).then((res) => {
        SuccessNotification({ title: "Updated!", message: "Your voucher has been updated." })
        setBatchOf("")
        setItem([])
        setOpened(false)
        setRefresh(true)
      }).catch(err=>{
        setBatchOf("")
        console.log(err)
        ErrorHandler(err)
      })
    }
  }

  return (
    <>{
      loading ?<Loadings/>: <>
      <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
        <Header category={"Sub Vouchers List"} title="List of Vouchers" />
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">
          <select placeholder="Select voucher Action" onChange={(e) => handleEnable(e)} value={enable} defaultValue={"Enabled Lists"}
              className=" p-2 m-1 w-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value={true}>Enabled Lists</option>
              <option value={false}>Disabled Lists</option>
            </select>
            <input type={"button"} value={"Update"} onClick={() => setOpened(true)} className={"m-1 p-1 w-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} />
            {batch === "all" ? null : <Button onClick={handlePrint} className={"m-1 p-1 w-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}>Print</Button>}


          </div>
          {
            data.length > 0 ?
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      select
                    </th>
                    <th scope="col" className="py-3 px-6">
                      UID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Index
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Value
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Active
                    </th>
                    {enable === "true" ?
                      <th scope="col" className="py-3 px-6">
                        Users
                      </th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((e, i) =>
                      <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" htmlFor={i}>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <Checkbox onChange={() => Select(e.id)} on className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" id={i}/>
                            <label className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {e.uid}
                        </td>
                        <td className="py-4 px-6">
                          {e.index}
                        </td>
                        <td className="py-4 px-6">
                          {e.value}
                        </td>
                        <td className="py-4 px-6">
                          {e.active? "Active":"In-active"}
                        </td>
                        {enable === "true" ?
                          <td className="py-4 px-6">
                            {e?.RedeemedVoucher === null ? "Not redeemed" : <Link to={`/customers/${e?.RedeemedVoucher?.User?.id}/show`}>Redeemed by {e?.RedeemedVoucher?.User?.name}</Link>}
                          </td>
                          : ""}

                      </tr>
                    )
                  }
                </tbody>
              </table>
              : <p className='p-5'>No data found.</p>
          }
            <div className='p-5 justify-center flex'>
            <select placeholder="Select Batch" onChange={(e) => setBatchOf(e.target.value)} value={batch_}
              className="m-1 p-2 w-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>--Select Batch--</option>
              {batchs.map((e, i) => <option value={e.value} key={i}>{e.label}</option>)}
            </select>
            <Button className="m-1 p-2 w-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" variant='outline' onClick={Update}>Update</Button>
          </div> 
          <div className='p-5 justify-center flex'>
            <Pagination total={pages} onChange={setPage} />
          </div>

        </div>
      </div>
      <Modal
        opened={opened}
        size={"md"}
        onClose={() => setOpened(false)}
      >
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">
          <input min={0} onChange={(e) => setFrom(e.target.value)} placeholder="Voucher From" type={"number"} className={"m-1 p-1 w-40 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} />
          <input min={0} onChange={(e) => setTo(e.target.value)} placeholder="Voucher to" type={"number"} className={"m-1 p-1 w-40 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} />
        </div>
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">
          <select placeholder="Select Batch" onChange={(e) => setBatchOf(e.target.value)} value={batch_}
            className="m-1 p-2 w-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>--Select Batch--</option>
            {batchs.map((e, i) => <option value={e.value} key={i}>{e.label}</option>)}
          </select>
        </div>
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">
          <input value={"Change"} type={"button"} className={"m-1 p-1 w-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} onClick={Update} />
        </div>

      </Modal>
     </>}</>
  )
}

export default VoucherList




