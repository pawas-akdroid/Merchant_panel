
import OTPInput, { ResendOTP } from "otp-input-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card, Container, Toast } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import Circle from './Circles';
import YouTube from 'react-youtube';
import ReactLoading from 'react-loading';
import { Header } from '../../components';
import { GameImgUrl, MerchantTokenUrl } from '../../Utilities/Urls';
import { ErrorHandler, SuccessNotification } from '../../components/NotificationProvider';
import { Button, Grid, Modal } from '@mantine/core';
import ReactPhoneInput from "react-phone-input-2";
import { useNavigate, useParams } from "react-router-dom";
import { Loadings } from "../../components/Loading";


const CustomerPlay = () => {


    const [otpVerify, setOtpVerify] = useState(false)
    const { uid } = useParams()
    const [phone, setPhone] = useState("")


    return (
        <>
            <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
                <Header category="Game" title="Customer Game Play" />
                {
                    otpVerify === false ? <OTPComponent setOtpVerify={setOtpVerify} setPhone={setPhone} phone={phone} /> : <GameComponent id={uid} phone={phone} />
                }


            </div>
        </>

    )
}

export default CustomerPlay



const OTPComponent = ({ setOtpVerify, setPhone, phone }) => {
    const [optPortion, setOtpVerified] = useState(false)
    const [OTP, setOTP] = useState("")



    const handleUserPhone = () => {
        if (confirm("Are you sure?")) {
            MerchantTokenUrl().get(`/get-transfer-token?customer=${phone}`).then((res) => {
                setOtpVerified(true)
                console.log(res)
                SuccessNotification({ title: "Success", message: "The otp has sent to the number please verify the number." })
            }).catch((err) => {
                ErrorHandler(err)
            })
        }
    }

    const handleOtpVerify = () => {
        MerchantTokenUrl().post(`/verify-transfer-token?customer=${phone}`, { "token": OTP }).then(res => {
            setOtpVerify(true)
        }).catch((err) => {
            ErrorHandler(err)
        })
    }


    return (
        optPortion === true ?
            <>
                <p className='mb-2'>An OTP has been sent to the users phone number for reconfirmation of the User</p>
                <div className='mt-5'>
                    <OTPInput classname="border-2 border-black text-black" value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                </div>
                <Button className="mt-5" variant='outline' onClick={handleOtpVerify}>Verify Code</Button>
                <ResendOTP onResendClick={() => console.log("Resend clicked")} /></>
            :
            <>
                <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 text-gray-200">
                    Customer Phone
                </h2>
                <ReactPhoneInput
                    className="ml-5 mb-3 justify-between  white  rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultCountry="pl"
                    searchClass="search-class"
                    value={phone}
                    onChange={(e) => setPhone(e)}
                    enableSearchField
                    disableSearchIcon
                />
                <Button variant='outline' className='ml-5' onClick={handleUserPhone} >Verify Phone</Button>


            </>



    )
}


const GameComponent = ({ id, phone }) => {
    const [data, setData] = useState(null)
    const [loading, setLaoding] = useState(true)
    const [circles, setCirlces] = useState([])
    const [allowed, setAllowed] = useState(5)
    const [selectionComplete, setSelectionComplete] = useState(false)
    const [selectedNumbers, setSelectedNumbers] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [toastError, setToastError] = useState(null)
    const [confirmBox, setConfirmBox] = useState(false)
    const [showYoutube, setShowYoutube] = useState(false)
    const videoRef = useRef(null)
    const [submitLoading, setSubmitLoading] = useState(false)


    const [plusOne, setPlusOne] = useState(true)
    const [plusCircles, setPlusCirlces] = useState([])
    const [plusSelectedNumbers, setPlusSelectedNumbers] = useState([])
    const [plusSelectionComplete, setPlusSelectionComplete] = useState(false)
    const [plusAllowed, setPlusAllowed] = useState(1)


    useEffect(() => {
        setTimeout(() => setLaoding(false), 1000)
        MerchantTokenUrl().get(`game/${id}`).then(res => {
            setData(res?.data?.data?.data)
            console.log(res?.data?.data?.data)
            setAllowed(res?.data?.data?.data?.allowed_numbers)
            setPlusOne(res?.data?.data?.data?.extra)
            addInCircle(res?.data?.data?.data.total_numbers)
        }).catch((err) => {
            ErrorHandler(err)
        })
    }, [])



    const countdownRenderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <p className="p-5">The game has been expired.</p>
        } else {
            return <span>{hours} Hours:{minutes} Minues:{seconds} Seconds</span>;
        }
    }

    const showVideo = () => {
        setShowYoutube(!showYoutube)
        videoRef.current.scrollIntoView({ behaviour: 'smooth' })
    }

    const opts = {
        height: '390',
        width: '500',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }



    const addInCircle = (total_number) => {
        console.log(total_number)
        let temp = []
        for (let i = 1; i < total_number.split("-")[1]; i++) {
            temp.push({ value: i })
        }
        setCirlces(temp)
        setPlusCirlces(temp)
    }

    useEffect(() => {
        setSelectionComplete(selectedNumbers.length === allowed)
    }, [allowed, selectedNumbers.length])

    const playNow = () => {
        if (selectedNumbers.length === allowed) {
            console.log(plusOne)
            if (plusOne === false || plusSelectedNumbers.length === plusAllowed) {
                setConfirmBox(true)
            }
            else {
                setShowToast(true)
                setToastError(`Please Pick Extra +1 Number.`)
            }
        }
        else {
            setShowToast(true)
            setToastError(`Please Pick Only ${allowed} numbers.`)
        }
    }

    const confirmPlay = () => {
        setConfirmBox(false)
        setMain(false)
        MerchantTokenUrl().get(`/get-transfer-token?customer=${phone}`).then((res) => {
            SuccessNotification({ title: "Success", message: "The otp has sent to the number please verify the number." })
            console.log(res)
        }).catch((err) => {
            ErrorHandler(err)
        })
    }

    const cancelGame = () => {
        setConfirmBox(true)
    }

    const fullCancelGame = () => {
        setSelectedNumbers([])
        setOTP([])
        setSelectionComplete(false)
        setMain(true)
        setConfirmBox(false)
    }

    const history = useNavigate()


    // OTP FROM BELOW

    const [main, setMain] = useState(true)
    const [disabledOtp, setDisabledOtp] = useState(true)
    const [OTP, setOTP] = useState("")

    const resendOtp = () => {
        MerchantTokenUrl().get(`/get-transfer-token?customer=${phone}`).then((res) => {
            SuccessNotification({ title: "Success", message: "The otp has sent to the number please verify the number." })
            console.log(res)
        }).catch((err) => {
            ErrorHandler(err)
        })
    }

    useEffect(() => {
        if (OTP.length === 6) {
            // setSubmitLoading(true)
            MerchantTokenUrl().post(`/verify-transfer-token?customer=${phone}`, { "token": OTP }).then(res => {
                SuccessNotification({ title: "Congratulation", message: "Your otp has been verified." })
                console.log(res)
            }).catch((err) => {
                ErrorHandler(err)
            })
            MerchantTokenUrl().post('/game', { game_id: id, user_id: phone, "chosen_number": selectedNumbers }).then(res => {
                SuccessNotification({ title: "Congratulation", message: "You have played the game." })
                history('/games')
            }).catch(err => {
                console.log(err)
                ErrorHandler(err)
            })
            // check if value is correct and if current play the game now
        }
    }, [OTP])
    return (
        loading ? <Loadings /> :
            <>
                <Modal opened={confirmBox} onClose={() => setConfirmBox(false)} transition="fade"
                    transitionDuration={600}
                    transitionTimingFunction="ease" title="Confirmation dialogue box" >

                    {main ? <p className="mb-5">Are You Sure You Want To Continue With <strong classname="text-gray-400">
                        <span style={{ marginLeft: 5 }}>{selectedNumbers.map((v, i) => <>{v}
                            {i !== selectedNumbers.length - 1 ? <> , </> : <></>}
                        </>)}</span> </strong>numbers? {plusOne ? `Your Extra Number Is - ${plusSelectedNumbers[0]}.` : <></>}</p> : <p>
                        Are You Sure You Want To Go Back?
                    </p>}
                    <div>

                        {main ?
                            <Button variant="outline" classname="p-5" onClick={confirmPlay}>
                                YES. PLAY!!
                            </Button> :

                            <Button variant="outline" classname="p-5" onClick={fullCancelGame}>Cancel Game</Button>
                        }
                        <Button variant="outline" className="ml-5" onClick={() => setConfirmBox(false)}>
                            Close
                        </Button>

                    </div>
                </Modal>
                <div className='bannerImage'>
                    <Grid>
                        <Grid.Col sm={12}>
                            <img src={`${GameImgUrl}${data?.Category?.image}`}
                            />
                        </Grid.Col>
                    </Grid>

                </div>
                {main ?
                    <Container fluid className='gameContainer'>
                        <h2 className="p-5 text-white">Description:</h2>
                        <p className="p-5">{data?.description}</p>
                        <Container className="d-flex align-items-center justify-content-center">
                            <Toast show={showToast} onClose={() => setShowToast(false)}>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Something's Not Right</strong>
                                </Toast.Header>
                                <Toast.Body>{toastError}</Toast.Body>
                            </Toast>
                        </Container>
                        <Container className="mt-5 d-flex align-items-center justify-content-center">
                            <Card style={{ width: '100%' }}>
                                <Card.Header style={{ userSelect: 'none' }}>
                                    <span style={{ marginLeft: 20 }}>
                                        Closing_time:
                                        <Countdown
                                            date={new Date(data?.closing_time)}
                                            renderer={countdownRenderer}
                                        />
                                    </span>
                                </Card.Header>
                                <Card.Body className='p-3'>
                                    <Card.Title></Card.Title>
                                    <Card.Body style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {circles.map((v, i) => (
                                            <Circle key={i} value={v.value}
                                                selectedNumbers={selectedNumbers} setSelectedNumbers={setSelectedNumbers} allowed={allowed} />
                                        ))}
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Container>
                        <Container className="mt-3 d-flex align-items-center justify-content-center">
                            <b>{selectedNumbers.length === 0 ? 'Select Your Numbers' : 'Your Selected Numbers: '}</b>
                            <span style={{ marginLeft: 5 }}>{selectedNumbers.map((v, i) => <>{v}
                                {i !== selectedNumbers.length - 1 ? <>,</> : <></>}
                            </>)}</span>
                        </Container>

                        {plusOne ? <Container className="mt-5 d-flex align-items-center justify-content-center">
                            <Card style={{ width: '100%' }}>
                                <Card.Header style={{ userSelect: 'none' }}>
                                    <span style={{ marginLeft: 5 }}>Your Plus One</span>
                                </Card.Header>
                                <Card.Body className='p-3'>
                                    <Card.Title></Card.Title>
                                    <Card.Body style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {plusCircles.map((v, i) => (
                                            <Circle key={i} value={v.value}
                                                selectedNumbers={plusSelectedNumbers} setSelectedNumbers={setPlusSelectedNumbers} allowed={plusAllowed} />
                                        ))}
                                    </Card.Body>
                                    <span className="mt-2 d-flex align-items-center justify-content-center">
                                        {plusSelectionComplete ? <Button onClick={playNow} variant="outline">Play</Button> : <></>}
                                    </span>
                                </Card.Body>
                            </Card>
                        </Container> : <></>}

                        <span className="mt-2 d-flex align-items-center justify-content-center">
                            {selectionComplete ? <Button onClick={playNow} variant="outline">Play</Button> : <></>}
                        </span>

                        {/* <Container style={{ flexDirection: 'column' }} className="mt-5 d-flex align-items-center justify-content-center">
                        <span onClick={showVideo} style={{ color: 'blue', cursor: 'pointer' }}>
                            <strong>{!showYoutube ? 'Learn How To Play By Watching A Video' : 'Hide Video'}</strong>
                        </span>
                        {showYoutube ? <YouTube ref={videoRef} className='mt-4' videoId="2g811Eo7K8U" opts={opts} /> : <></>}
                    </Container> */}
                    </Container> :
                    <Container style={{ flexDirection: 'column' }} className="mt-5 d-flex align-items-center justify-content-center">
                        <h3>{submitLoading ? 'Please Wait...' : 'Enter Your OTP'}</h3>
                        {!submitLoading ? <>
                            <div className='mt-3'>
                                <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                                <ResendOTP className="mt-4 d-flex align-items-center justify-content-center"
                                    maxTime={2} onTimerComplete={() => setDisabledOtp(false)}
                                    onResendClick={resendOtp}
                                    renderTime={remainingTime => remainingTime === 0 ? <></> : <span style={{ marginRight: 10 }}>{remainingTime} seconds remaining</span>}
                                    renderButton={() => <Button variant={'dark'} onClick={resendOtp} disabled={disabledOtp}>Resend OTP</Button>} />
                            </div>
                            <Button onClick={cancelGame} variant='danger' className='mt-5'>Cancel Your Game</Button>
                        </> : <>
                            <ReactLoading type={'bars'} color={'#0b1'} height={100} width={100} />
                        </>}
                    </Container>
                }



            </>

    )
}