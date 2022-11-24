import React, { useState } from 'react';
import { Header } from '../../components';
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileEncode)
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import MerchantJSON from '../../data/MerchantJSON.json'
import { ErrorHandler, ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { Grid, PasswordInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Title } from '../../components/Header';
import { MerchantTokenUrl } from '../../Utilities/Urls';

function AddSubMerchant() {

  const history = useNavigate()

  const [name, setName] = useState('')
  const [merchant_name, setMerchaantName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [store, setStore] = useState('')
  const [storephone, setStorePhone] = useState('')
  const [pan, setPan] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const site = useSelector(p => p?.site?.site)
  const merchant = useSelector(p => p?.merchant.merchant.Merchant)


  const handleAddMerchant = (e) => {
    e.preventDefault()
    const body = {
      email: email,
      phone: phone,
      merchant_id:merchant.id,
      password: password,
      name: name,
      parent_company: name,
      store_address: store,
      pan_number: pan,
      region: site,
      site: site,
      store_phone: storephone,
      role: role,
    }

    console.log(body)
    if (confirm("Are you sure, you want to add sub-merchant?")) {
      MerchantTokenUrl().post('/add-submerchant', body).then((res) => {
        SuccessNotification({ title: "Added!", message: "Your merchant has been added." })
        history('/sub-merchant')
      }).catch((err) => {
        console.log(err)
        ErrorHandler(err)
      })
    }

  }
  useEffect(() => {
    Title("Create Merchant")
  }, [])




  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category="Merchant" title="Create Sub Merchnat" />
      <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="rounded-lg  dark:bg-secondary-dark-bg">
          <form onSubmit={handleAddMerchant}>

            <div className="mb-4">
              <h1 className='mb-2 text-center font-bold'>
                Credential Details
              </h1>
              <>
                <Grid grow>
                  <Grid.Col span={6}>
                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                      Email
                    </h2>

                    <input
                      className="ml-5 justify-between border text-gray-500 rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={email}
                      onChange={(e => setEmail(e.target.value))}
                      placeholder="Sub Merchant Email"
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                      Name
                    </h2>

                    <input
                      className="ml-5 justify-between text-gray-500 shadow appearance-none border rounded  py-2 px-3 w-10/12 leading-tight focus:outline-none focus:shadow-outline"
                      value={name}
                      onChange={(e => setName(e.target.value))}
                      required
                      type="text"
                      placeholder="Sub Merchant Name"
                    />
                  </Grid.Col>

                </Grid>
                <Grid grow>
                  <Grid.Col span={6}>
                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                      Phone
                    </h2>
                    <ReactPhoneInput inputStyle={{ width: "83.333%" }}
                      className="ml-5 justify-between shadow text-gray-500 w-10/12 appearance-none rounded leading-tight focus:outline-none focus:shadow-outline"
                      id="Store"
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(`+${e}`)}
                      placeholder="Sub Merchant Phone"
                    />

                  </Grid.Col>
                  <Grid.Col span={6}>
                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                      Password
                    </h2>

                    <PasswordInput
                      className="ml-5 justify-between shadow text-gray-500 appearance-none border rounded   w-10/12 leading-tight focus:outline-none focus:shadow-outline"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      placeholder="Password"
                    />

                  </Grid.Col>
                </Grid>
              </>

              <h1 className='mb-5 mt-5 text-center font-bold'>
                Merchant Details
              </h1>

              <Grid grow>
                <Grid.Col span={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Store Address
                  </h2>

                  <input
                    className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={store}
                    onChange={(e => setStore(e.target.value))}
                    placeholder="Store Address"
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Store Phone
                  </h2>

                  <input
                    className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={storephone}
                    onChange={(e => setStorePhone(e.target.value))}
                    placeholder="Store Phone"
                  />
                </Grid.Col>
              </Grid>
              <Grid grow>
                <Grid.Col span={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Pan Number
                  </h2>

                  <input
                    className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={pan}
                    onChange={(e => setPan(e.target.value))}
                    placeholder="Pan Number"
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Role
                  </h2>

                  <select
                    className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e => setRole(e.target.value))}
                    value={role}
                  >
                    <option>--select--</option>
                    {MerchantJSON.map((e, i) => (
                      <option value={e.value}>{e.name}</option>
                    ))}
                  </select>
                </Grid.Col>
              </Grid>
              <button className="ml-5 px-4 py-2 text-white bg-green-500 rounded shadow-xl" type='submit'>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSubMerchant;
