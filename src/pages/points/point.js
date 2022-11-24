import { Button, Grid } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { Loadings } from '../../components/Loading';
import { ErrorHandler, ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { MerchantTokenUrl } from '../../Utilities/Urls';
import { Outlet } from 'react-router-dom';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import OTPInput, { ResendOTP } from "otp-input-react";


function Points() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [amount, setAmount] = useState('')
  const [display, setDisplay] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState("")
  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    MerchantTokenUrl().get('/point').then(res => {
      setData(res?.data?.data["point"])
      setAmount(res?.data?.data["config"]?.amounts)
      setValue(res?.data?.data["config"]?.value)
      setRefresh(false)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [refresh])


  const handlePointConfig = (e) => {
    e.preventDefault()
    MerchantTokenUrl().put('/pointsConfig', { "amounts": amount, "value": value }  ).then(res => {
      SuccessNotification({title:"Success", message:"Your Point config has been updated."})
      setRefresh(true)
    }).catch(err => {
      ErrorHandler(err)
    })
  }
  const handleDisplay = () => {
    display ? setDisplay(false) : setDisplay(true)
  }

  setTimeout(()=>setLoading(false), 1000)

  const Wait = () => {
    setTimeout(() => setDisabled(false), 60000)
  }

  return ( loading ? <Loadings/> :
  
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-600 dark:text-gray-200">
      <Header category="Point" title="Point Information" />


      {loading ? <Loadings /> : <>
        <div className='bg-white dark:bg-gray-800 rounded p-2'>
          {data ?
            <>
              <Grid grow className="p-5">
                <Grid.Col span={6} >
                  <h2 className=" text-base mb-4">
                    <strong> Total Remaining Points: </strong> {data.points}
                  </h2>
                  <h1 className='text-base mb-8'><strong>Point Config</strong></h1>
                  <form onSubmit={handlePointConfig}>
                    <div className='flex text-base mb-2'>
                      Enter the amount:
                    </div>
                    <div className='flex text-base mb-4'>
                      <input placeholder='Enter Amount' className='dark:bg-gray-300 justify-between shadow appearance-none border rounded w-11/12  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"number"} min={0} value={amount} onChange={(e => setAmount(e.target.value))} />
                    </div>
                    <div className='flex text-base mb-2'>
                      Enter the Value:
                    </div>
                    <div className='flex text-base mb-4'>
                      <input className='dark:bg-gray-300 justify-between shadow appearance-none border rounded py-2 px-3 w-11/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Please enter value of your amount.' type={"text"} value={value} onChange={(e => setValue(e.target.value))} />
                    </div>
                    <p><button type='submit' className='px-4 py-2 text-white bg-green-500 rounded shadow-xl'>submit</button></p>
                  </form>
                </Grid.Col>
                {display ?
                  <Grid.Col span={6}>
                    <PointTransferDisplay setRefresh={setRefresh} Wait={Wait} setDisabled={setDisabled} setDisplay={setDisplay} />
                  </Grid.Col>
                  :
                  <Grid.Col span={6}>
                    <button onClick={handleDisplay} className='px-4 py-2 text-white bg-green-500 rounded shadow-xl' disabled={disabled}>Send Points</button>
                  </Grid.Col>}

              </Grid>
            </> : <p className='p-5'>No data found.</p>}
        </div>
      </>}
    </div>
  )
}

export default Points;




const PointTransferDisplay = ({ setRefresh, setDisabled, setDisplay, Wait }) => {
  const [verification, setVerification] = useState(false)
  const [transfer, setTransfer] = useState(false)
  const [token, setToken] = useState("")



  const handleVerify = (e) => {
    e.preventDefault()
    MerchantTokenUrl().get("/get-transfer-token").then(res => {
      console.log(res)
      SuccessNotification({ title: " Verification Token Sent!", message: "Please verify yourself first." })
      setVerification(true)
    }).catch(err => {
      ErrorHandler(err)
    })
  }


  const handleVerification = (e) => {
    e.preventDefault()
    MerchantTokenUrl().post('/verify-transfer-token', { "token": token }).then(res => {
      console.log(res)
      setTransfer(true)
    }).catch(err => {
      setDisplay(false)
      setDisabled(true)
      Wait()
      ErrorNotification({ title: "Token Expired.", message: "Your token has been expired. Please request new one after 60s." })
    })

  }
  return (
    <>
      <div className='flex'>

      </div>
      {verification ? transfer ? <>
        <PointTransfer setRefresh={setRefresh} setDisabled={setDisabled} Wait={Wait} setDisplay={setDisplay} /></> :
        <>
          <form onSubmit={handleVerification}>
            <OTPInput value={token} onChange={setToken} autoFocus OTPLength={6} otpType="number" disabled={false} className="ml-5  mb-3 justify-between  appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <Button className='ml-5' variant={"outline"} type={"submit"} on onClick={handleVerification}>Confirm me!</Button>
          </form>
        </>
        :
        <>
          <div className="overflow-x-auto relative sm:rounded-lg">
            <Button variant='outline' onClick={handleVerify} className='text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Verify first!</Button>
          </div>

        </>
      }
    </>
  )
}

const PointTransfer = ({ setRefresh, Wait, setDisabled, setDisplay }) => {

  const [point, setPoint] = useState("")
  const [phone, setPhone] = useState("")
  const [remarks, setRemarks] = useState("")


  const handleSendPoint = (e) => {
    e.preventDefault()
    MerchantTokenUrl().post('/transfer-points', { "point": point, "phone": phone, "remarks": remarks }).then(res => {
      setRefresh(true)
      setDisplay(false)
      setDisabled(true)
      Wait()
      SuccessNotification({ title: "Successffully Sent!", message: "Your point has been suessfully sent." })
    }).catch(err => {
      setDisplay(false)
      setDisabled(true)
      Wait()
      ErrorHandler(err)
    })
  }

  return (
    <>
      <form onSubmit={handleSendPoint}>
        <div className='flex text-base mb-2'>
          Enter the phone you want to send:
        </div>
        <div className='flex text-base mb-4'>
          <ReactPhoneInput
            className="dark:bg-gray-300 justify-between shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultCountry="pl"
            searchClass="search-class"
            value={phone}
            onChange={(e) => setPhone(`+${e}`)}
            enableSearchField
            disableSearchIcon
          />
        </div>
        <div className='flex text-base mb-2'>
          Enter the point:
        </div>
        <div className='flex text-base mb-4'>
          <input className='dark:bg-gray-300 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Please enter your point.' type={"text"} value={point} onChange={(e => setPoint(e.target.value))} />
        </div>
        <div className='flex text-base mb-2'>
          Enter the remarks :
        </div>
        <div className='flex text-base mb-4'>
          <input className='dark:bg-gray-300 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Please enter your remarks.' type={"text"} value={remarks} onChange={(e => setRemarks(e.target.value))} />
        </div>
        <p><button type='submit' className='px-4 py-2 text-white bg-green-500 rounded shadow-xl'>Send</button></p>
      </form>
    </>
  )
}