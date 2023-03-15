import React, { useEffect, useState } from 'react';
import slugify from 'react-slugify';
import Header from '../../components/Header';
import { ErrorNotification, SuccessNotification, LoadingNotification, ErrorHandler } from '../../components/NotificationProvider';
import { Grid, MultiSelect, Select } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/Header';
import { MerchantTokenUrl } from '../../Utilities/Urls';
import { useSelector } from 'react-redux';
import { SmallLoader } from '../../components/Loading';

const CreateVoucherCategory = () => {
    const history = useNavigate()
    const [name, setName] = useState('')
    const [temp, setTemp] = useState("")
    const [temp_, setTemp_] = useState("")
    const [val, setValue] = useState(0)
    const [batch, setBatch] = useState([])
    const [total_point, setTotalPoint] = useState('')
    const [total_vouchers, setTotalVoucher] = useState('')
    const [validity, setValidity] = useState("")
    const [loading, setLoading] = useState(false)
    const site = useSelector(p => p?.site?.site)
    const [data, setData] = useState([])
    const [point, setPoint] = useState("")

    const handleName = () => {
        setName(`${temp_}-${temp}`)
    }

    const handleAddMerchantVoucher = (e) => {
        e.preventDefault()
        setLoading(true)
        LoadingNotification({ title: "Wait!", message: "Please wait while we are adding your data." })

        const body = {
            name: name,
            batch: batch,
            total_point: total_point,
            total_vouchers: total_vouchers,
            site: site,
            validity: validity,
        }

        MerchantTokenUrl().post(`/voucher-category`, body).then((res) => {
            SuccessNotification({ title: "Added!", message: "Your voucher has been added." })
            history(`/vouchers`)
        }).catch((err) => {
            setLoading(false)
            ErrorHandler(err)
        })

    }
    const handlePointValue = () => {
        if (total_point && total_vouchers) {
            const a = (total_point / total_vouchers).toFixed(2)
            setValue(a)
        }
        else setValue(0)
    }

    useEffect(() => {
        MerchantTokenUrl().get('/get-all-inventory').then(res => {
            setData(res?.data?.data)
        }).catch(err => { ErrorHandler(err)})
        MerchantTokenUrl().get('/point').then(res => {
            setPoint(res?.data?.data?.point?.points)
        }).catch(err => {
            ErrorHandler(err)
        })
        Title("Create Merchant Voucher")
    }, [])


    return (
        <div className="m-2 md:m-10 mt-20 pMerchant-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
            <Header category="Voucher" title="Create Merchant Voucher" />
            <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
                <div className="rounded-lg  dark:bg-secondary-dark-bg">
                    <div className='ml-5'>Total remaining point: {point ? point : 0}</div>
                    <form onSubmit={handleAddMerchantVoucher}>

                        <div className="mb-4">
                            <Grid grow>
                                <Grid.Col span={12}>
                                    <h2 className="ml-5 block text-sm font-bold mb-2">
                                        Product Name
                                    </h2>
                                    <select onChange={((e)=> {setTemp_(e.target.value); handleName})} className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-11/12  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                                        
                                        <option>
                                            --select one--
                                        </option>
                                        {data?.map((e) =>
                                            <option value={e.name}>
                                                {e.name}
                                            </option>
                                        )}
                                    </select>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className="ml-5 block text-sm font-bold mb-2">
                                        Voucher Name
                                    </h2>
                                    <input
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={(e => setTemp(e.target.value))}
                                        onKeyDown={handleName}
                                        type="text"
                                        value={temp}
                                        placeholder="Name"
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Total Points
                                    </h2>
                                    <input
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        value={total_point}
                                        onKeyUp={handlePointValue}
                                        onChange={(e => setTotalPoint(e.target.value))}
                                        placeholder="Total Points"
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Batch
                                    </h2>
                                    <MultiSelect
                                        data={batch}
                                        placeholder="Create Batch"
                                        searchable
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12  leading-tight"
                                        creatable
                                        getCreateLabel={(query) => `+ Create ${query}`}
                                        onCreate={(query) => {
                                            const item = { value: slugify(query), label: query };
                                            setBatch((current) => [...current, item]);
                                            return item;
                                        }}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Voucher Count
                                    </h2>
                                    <input
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        value={total_vouchers}
                                        onKeyUp={handlePointValue}
                                        onChange={(e => setTotalVoucher(e.target.value))}
                                        placeholder="Total Voucher Counts"
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Voucher value
                                    </h2>
                                    <p className="ml-5 mb-5 justify-between shadow text-white-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                    >{val}</p>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Validity
                                    </h2>
                                    <input
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                        type="datetime-local"
                                        value={validity}
                                        onChange={(e => setValidity(e.target.value))}
                                        placeholder="Validity"
                                    />
                                </Grid.Col>

                            </Grid>
                            {loading ? <SmallLoader /> : <button className="ml-5 px-4 py-2 text-white bg-green-500 rounded shadow-xl" type='submit'>
                                Add
                            </button>}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateVoucherCategory