import React, { useEffect, useState } from 'react'
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { earningData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Tables from '../components/Table';
import Header, { Title } from '../components/Header';
import { MerchantTokenUrl } from '../Utilities/Urls';
import { ErrorHandler } from '../components/NotificationProvider';
import { Loadings } from '../components/Loading';
import { setTime } from '@syncfusion/ej2-react-schedule';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [loading, setLoading] = useState(true)

  const [voucher, setVoucher] = useState([])
  const [submerchant, subMerchant] = useState([])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
    Title("Dashboard")

    MerchantTokenUrl().get('/dashboard').then(res => {
      setVoucher(res?.data?.data?.voucher['rows'])
      subMerchant(res?.data?.data?.merchant['rows'])
    }).catch(err => {
      ErrorHandler(err)
    })
  }, [])


  const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
      <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
    </div>
  );
  const { currentColor, currentMode } = useStateContext();


  return (
    <div className="mt-18 p-10">
      <Header category="Merchants" title="List of Sub-Merchants" />

      {loading ? <Loadings /> :
        submerchant?.length > 0 ?
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Parent Company
                </th>
                <th scope="col" className="py-3 px-6">
                  Merchant Code
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone
                </th>


              </tr>
            </thead>
            <tbody>
              {
                submerchant.map((e, i) =>
                  <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-4 px-6">
                      {i + 1}
                    </td>

                    <td className="py-4 px-6">
                      <Link to={ `/sub-merchant/${e.id}`}>
                        {e.parent_company}

                      </Link>

                    </td>
                    <td className="py-4 px-6">
                      {e.merchant_code}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {/* <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" />   */}
                        {e.store_phone}
                      </div>
                    </td>


                  </tr>

                )
              }


            </tbody>
          </table>
          : <p className='p-5  text-white'>No Sub Merchant Data.</p>
      }

      <div className='p-4'></div>
      <Header category="Vouchers Collections" title="List of Voucher category." />

      {
        voucher.length > 0 ? <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-2xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

              <th scope="col" className="py-3 px-6">
                Voucher Name
              </th>
              <th scope="col" className="py-3 px-6">
                Total Point
              </th>
              <th scope="col" className="py-3 px-6">
                Total Vouchers
              </th>

            </tr>
          </thead>
          <tbody>
            {
              voucher.map((e, i) =>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    <Link to={`vouchers/${e.id}/batch`}>
                      {e.name}
                    </Link>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {e.total_point}
                  </td>

                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                    {e.total_vouchers}
                  </td>

                </tr>
              )

            }

          </tbody>



        </table>
          :
          <p className='p-5 text-white'>No Games Found.</p>
      }







    </div>
  )
}

export default Dashboard