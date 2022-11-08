import React, { useState } from "react";
import Header from "../../components/Header";
import { Button, Grid } from "@mantine/core";
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { MerchantTokenUrl } from "../../Utilities/Urls";
import { ErrorHandler, SuccessNotification } from "../../components/NotificationProvider";
import { useNavigate } from "react-router-dom";
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileEncode)


function AddInventory() {
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState([{ size: "", price: "" }])


  const handleAddProduct = (e) => {
e.preventDefault()
    MerchantTokenUrl().post('/add-product', { variation: formValues, images: images, name: name }).then(res => {
      SuccessNotification({ title: "Successfully Added.", message: "The Product has been added." })
      navigate('/inventory')
    }).catch(err => {
      console.log(err)
      ErrorHandler(err)
    })
  }

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    console.log(newFormValues)
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);

  }

  let addFormFields = () => {
    setFormValues([...formValues, { size: "", price: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }



  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Product" title="Add Product" />
      <div className="mt-2 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="rounded-lg dark:bg-secondary-dark-bg">
          <div className="mb-4">
            <Grid grow>
              <Grid.Col span={12}>
                <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                  Product Image <small>upto 3 images</small>
                </h2>
                <div className="ml-5 justify-between shadow appearance-none  rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <FilePond
                    files={files} onupdatefiles={setFiles} name='image'
                    maxParallelUploads={1} maxFiles={4} allowBrowse={true} allowDrop={true}
                    allowImageEdit={true} allowImageCrop={true} allowMultiple={true}
                    imageCropAspectRatio='1:1' allowReorder={true}
                    imageEditInstantEdit={true} allowImagePreview={true}
                    imageTransformClientTransforms={'crop'} credits={false}
                    onaddfile={(err, item) => {
                      if (err) return console.log(err)
                      const base64 = item.getFileEncodeBase64String()
                      const items = images
                      items.push(base64)
                      setImages(items)
                    }}
                    onremovefile={(err, item) => {
                      if (err) return console.log(err)
                      const base64 = item.getFileEncodeBase64String()
                      const items = images
                      items.pop(base64)
                      setImages(items)
                    }} allowFileTypeValidation={true} acceptedFileTypes={['image/*']}
                  />

                </div>

              </Grid.Col>
              <Grid.Col span={12}>
                <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                  Product Name
                </h2>

                <input
                  className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="PID"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Product Name"
                />
              </Grid.Col>

              {formValues.map((element, index) => (

                <>
                  <Grid.Col span={4}>
                    <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                      Product Size
                    </h2>
                    <input type="text" name="size" value={element.size || ""} onChange={e => handleChange(index, e)} className="ml-5 justify-between shadow appearance-none border rounded w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Product Size" />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                      Price
                    </h2>
                    <input type="number" name="price" value={element.price || ""} onChange={e => handleChange(index, e)} className="ml-5 justify-between shadow appearance-none border rounded w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Product Price" />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    {
                      index ? <Button type="button" variant="outline" className="mt-7" onClick={() => removeFormFields(index)}>Remove this variation</Button>
                        :
                        <Button className="mt-7" variant="outline" type="button" onClick={() => addFormFields()}>Add Variation</Button>

                    }
                  </Grid.Col>
                </>


              ))}
            </Grid>
            <div className="flex p-2 space-x-4 justify-between">
              <button
                type="submit"
                className="ml-5 px-4 py-2 text-white bg-green-500 rounded shadow-xl"
                onClick={handleAddProduct}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddInventory;
