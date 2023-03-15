import { Button, Grid, Modal, MultiSelect, Pagination, Switch } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components'
import { Title } from '../../components/Header'
import { Loadings } from '../../components/Loading'
import { ErrorHandler } from '../../components/NotificationProvider'
import { MerchantTokenUrl } from '../../Utilities/Urls'
import slugify from 'react-slugify';




const VoucherCategory = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState("")
    const [pages, setPages] = useState("")
    const [opened, setOpened] = useState(false);
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [validity, setValidity] = useState("")
    const [active, setActived] = useState(false);
    const [batch, setBatch] = useState([]);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
        Title("Voucher Categories")
        MerchantTokenUrl().get(`/voucher-categories`).then((res) => {
            setData(res?.data?.data?.data);
            setPages(res?.data?.data?.totalPages);
            setRefresh(false)
            setOpened(false)
        }).catch(err => {
            console.log(err)
            ErrorHandler(err)
        })
    }, [refresh,])


    const handleUpdate = (e) => {
        const body = { "validity": validity, "active": active, "id": id, "batch": batch }
        MerchantTokenUrl().put(`voucher-category`, body).then((res) => {
            setRefresh(true)
            setOpened(false)
        }).catch((err) => {
            ErrorHandler(err)
        })
    }

    return (loading ? <Loadings /> :
        <>
            <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
                <Header category={"Vouchers"} title="List of Vouchers" />
                <Link to="create">
                    <button className="text-gray-400 dark:text-gray-400 font-bold py-2 px-4 rounded border mb-2">
                        Add Voucher
                    </button>
                </Link>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                            </div>
                            <input type="text" id="table-search-users" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Merchants" />
                        </div>
                    </div>
                    {
                        data.length > 0 ?
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ height: "300", overflowY: "scroll" }}>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            Name
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Total Point
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Total Vouchers
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.length > 0 ?
                                            data.map((e, i) =>
                                                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                    <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                                        <Link to={`${e.id}/batch`}>
                                                            {e.name}
                                                        </Link>
                                                    </th>
                                                    <td className="py-4 px-6">
                                                        {e.total_point}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {e.total_vouchers}
                                                    </td>
                                                    <td className="py-4 px-6" >

                                                        <Button variant='outline' className='text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onClick={() => { setOpened(true); setId(e.id); setName(e.name), setValidity(e.validity), setActived(e?.active), setBatch(e?.batch) }}>Edit</Button>
                                                    </td>

                                                </tr>
                                            )
                                            :
                                            <><tr className='p-5'>No data Found</tr></>}
                                </tbody>

                            </table>
                            : <p className='p-5'>No data found.</p>
                    }
                    <div className='p-5 justify-center'>
                        <Pagination total={pages} onChange={setPage} />
                    </div>


                </div>
            </div>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
            >
                <div className='dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl'>
                    <Grid grow >
                        <Grid.Col span={6}>
                            <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                Edit Validity
                            </h2>
                            <input
                                className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e => setValidity(e.target.value))}
                                type="datetime-local"
                                value={validity}
                                placeholder="Name"
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                Edit Batch
                            </h2>
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
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                Deactive or Active
                            </h2>
                            <Switch className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" checked={active} onChange={(e) => setActived(e.currentTarget.checked)} label={active ? "Activated" : "Deactivated"} />
                        </Grid.Col>
                    </Grid>
                    <Button className='ml-5' variant={"outline"} onClick={handleUpdate}>Update</Button>
                </div>
            </Modal>
        </>
    )
}

export default VoucherCategory