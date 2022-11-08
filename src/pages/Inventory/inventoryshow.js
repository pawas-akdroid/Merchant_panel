import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Link, useParams } from 'react-router-dom';
import { ImgUrl2, MerchantTokenUrl } from '../../Utilities/Urls';
import { ErrorHandler } from '../../components/NotificationProvider';
import { Grid } from '@mantine/core';

function ViewInventory() {

  const [data, setData] = useState('')
  const [images, setImages] = useState([])
  const [variations, setVariations] = useState([])

  const { id } = useParams()


  useEffect(() => {
    MerchantTokenUrl().get(`/get-inventory/${id}`).then(res => {
      setImages(res?.data?.data?.ProductImages)
      setVariations(res?.data?.data?.ProductVariations)
      console.log(res?.data?.data?.ProductVariations)

      setData(res?.data?.data)
    }).catch(err => {
      ErrorHandler(err)
    })

  }, [])




  return (
    <div className="m-2 md:m-5 mt-5 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category='Product List' title={data.name} />
      <div className=" flex mt-2 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <Grid>

          {
            images.length > 0 ?
              images.map((e) =>
                <Grid.Col sm={6}>
                  <img src={`${ImgUrl2}${e.image}`} />
                </Grid.Col>
              ) : ""
          }

          <Grid.Col sm={6}>
          <h2 className='text-base mb-5'>Variations of {data.name}</h2>
            {
            variations.length > 0 ?
            variations.map((e) =>

              <p className="text-white-700 white text-base">
                <strong className='text-gray-400'>Variation: {e.size}</strong><strong className='ml-5 text-gray-400'>Price: {e.price} </strong>
              </p>
            ): null}

          </Grid.Col>
        </Grid>



      </div>
    </div>
  );
}

export default ViewInventory;