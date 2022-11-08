import React, { useEffect, useState } from 'react'
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { earningData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Tables from '../components/Table';
import { Title } from '../components/Header';
import { MerchantTokenUrl } from '../Utilities/Urls';
import { ErrorHandler } from '../components/NotificationProvider';
import { Loadings } from '../components/Loading';
import { setTime } from '@syncfusion/ej2-react-schedule';


const Dashboard = () => {
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState([])
  useEffect(()=>{
    setTimeout(()=>setLoading(false), 1000)
    Title("Dashboard")
    MerchantTokenUrl().get('/dashboard').then(res=>{
      setData(res?.data?.data)
      console.log(res?.data?.data)
    }).catch(err=>{
      ErrorHandler(err)
    })
  },[])


  const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
      <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
    </div>
  );
  const { currentColor, currentMode } = useStateContext();


  return (
    <div className="mt-18 p-10">
        {loading ? <Loadings /> :
          data?.merchant?.length > 0 ?
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
                  data?.merchant.map((e, i) =>
                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="py-4 px-6">
                        {i + 1}
                      </td>

                      <td className="py-4 px-6">
                        
                          {e.parent_company}
                      
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
            : <p className='p-5'>No data found.</p>
        }
        







    </div>
  )
}

export default Dashboard