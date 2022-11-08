import { Grid } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { BsShopWindow } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components';
import { Loadings } from '../../components/Loading';
import { ErrorHandler, SuccessNotification } from '../../components/NotificationProvider';
import { MerchantTokenUrl, ImgUrl, imgUrl } from '../../Utilities/Urls';

const ViewSubMerchant = () => {
  const { id } = useParams()
  const [point, setPoint] = useState('')
  const [user, setUser] = useState('')
  const [data, setData] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [points, setPoints] = useState(0)
  const [remarks, setRemarks] = useState("")
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
    MerchantTokenUrl().get(`/submerchants?id=${id}`).then((data) => {
      setData(data?.data?.data);
      setUser(data?.data?.data?.User);
      console.log(data?.data?.data?.User);

      setPoint(data?.data?.data?.User?.Point);
      setRefresh(false)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [refresh,])


  const handlePoint = (e) => {
    e.preventDefault()
    const body = {
      points: points,
      remarks: remarks
    }
    if (confirm("Do you want to proceed?")) {
      MerchantTokenUrl().post(`/send-point/${id}`, body).then((res) => {
        console.log(res?.data?.data)
        SuccessNotification({ title: "Sent", message: `You have successfully sent ${points}.` })
        setRefresh(true)
        setRemarks("")
        setPoints(0)
      }).catch(err=>{
        console.log(err)
        ErrorHandler(err)
      })
    }
  }

  const handleUpdate = (e)=>{
    let body
    if (e === "secret_key"){
      body = {"secret_key":true, "merchant_id" : id }
    }
    else if (e === "enable") {
      body = {"verified":true, "merchant_id" : id}
    }
    else{
      body = {"verified":false, "merchant_id": id}
    }
    adminTokenUrl().put('/merchant', body).then((res)=>{
      SuccessNotification({ title: "Updated", message: `${res?.data?.data}` })
      setRefresh(true)
    }).catch(err=>{

      ErrorHandler(err)

    }
      )
  }
  return (
    <div className="rounded-lg shadow-lg dark:text-white m-5 p-10">
    {loading ? <Loadings /> : <>
      <Header category="Merchant" title={data.parent_company} />
      <div className='bg-white dark:bg-gray-800 rounded p-2'>
        {data? 
        <Grid grow>
          <Grid.Col span={6}>
            <div className="p-8">
              <p className=" text-base mb-4">
                <strong> Points: </strong> {point.points}
              </p>
              <p className=" text-base mb-4">
                <strong> Merchant ID: </strong> {data.merchant_code}
              </p>
              <p className=" text-base mb-4">
                <strong> Store: </strong> {data.store_address}
              </p>
              <p className=" text-base mb-4">
                <strong> Pan Number: </strong> {data.pan_number}
              </p>
              <p className=" text-base mb-4">
                <strong> Parent Company: </strong> {data.parent_company}
              </p>
              {/* <p className=" text-base mb-4">
                <strong> Region: </strong> {data.region}
              </p>
              <p className=" text-base mb-4">
                <strong> Disabled: </strong> {data.verified === false ? <>Disabled <button className='px-4 py-2 text-white bg-green-500 rounded shadow-xl' onClick={()=>handleUpdate("enable")}>Enable</button></> : <>Enabled <button onClick={()=>handleUpdate("disable")} className='px-4 py-2 text-white bg-red-500 rounded shadow-xl'>Disable</button></>} 
              </p>
              <p className=" text-base mb-4">
                <strong> Secret Key: </strong> 
                <>{ data.secret_key ? data.secret_key : <button className='px-4 py-2 text-white bg-green-500 rounded shadow-xl' onClick={()=>handleUpdate("secret_key")}>Generate Secret Key</button>}</>
              </p> */}

              
            </div>
            <div className="p-8 ">
              <p className="text-base mb-4">
                <strong> Name: </strong> {user.name}
              </p>
              <p className="text-base mb-4">
                <strong> Email: </strong> {user.email}
              </p>
              <p className=" text-base mb-4">
                <strong> Phone: </strong> {user.phone}
              </p>

            </div>

          </Grid.Col>
          <Grid.Col span={6}>
            <Grid.Col span={12}>
              { user?.image ? <img className="rounded-t-lg" src={`${ImgUrl}${data?.User?.image}`} /> : <img src=""/> }
            </Grid.Col>
            {/* <Grid.Col span={12}>
              <Link to={'vouchers'} className="px-4 py-2 text-white bg-green-500 rounded shadow-xl">See All Vouchers</Link>
            </Grid.Col> */}
            <Grid.Col span={12}>
              <h1 className='text-base mb-8'><strong>Transfer Points To Merchant</strong></h1>
              <form onSubmit={handlePoint}>
                <div className='flex text-base mb-4'>
                  <p className="mb-4 w-20 ">
                    <strong> Points: </strong>
                  </p>
                  <input placeholder='Enter Points' className='dark:bg-gray-300 justify-between shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"number"} min={0} value={points} onChange={(e => setPoints(e.target.value))} />
                </div>
                <div className='flex text-base mb-4'>
                  <p className="mb-4 w-20">
                    <strong> Remarks: </strong>
                  </p>
                  <input className='dark:bg-gray-300 justify-between shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Please Enter your remarks.' type={"text"} value={remarks} onChange={(e => setRemarks(e.target.value))} />
                </div>
                <p><button type='submit' className='px-4 py-2 text-white bg-green-500 rounded shadow-xl'>submit</button></p>
              </form>

            </Grid.Col>

          </Grid.Col>
        </Grid>: <p className='p-5'>No data found.</p>}
      </div>
    </>}

  </div>
  )
}

export default ViewSubMerchant