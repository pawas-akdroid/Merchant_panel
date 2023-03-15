import { Outlet, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import ForgetPassword from './pages/ForgetPassword';
import CustomerPlay from './pages/Games/CustomerPlay';
import Games from './pages/Games/Games';
import GamesPlayed from './pages/Games/GamesPlayed';
import SelfPlay from './pages/Games/SelfPlay';
import AddInventory from './pages/Inventory/AddInventory';
import Inventory from './pages/Inventory/Inventory';
import ViewInventory from './pages/Inventory/inventoryshow';
import LoginPage from './pages/Login';
import Points from './pages/points/point';
import PointHistory from './pages/points/PointHistory';
import Profile from './pages/Profile/Profile';
import UpdateProfile from './pages/Profile/UpdateProfile';
import AddSubMerchant from './pages/SubMerchant/AddSubMerchant';
import EditSubMerchant from './pages/SubMerchant/EditSubMerchant';
import SubMerchant from './pages/SubMerchant/SubMerchant';
import ViewSubMerchant from './pages/SubMerchant/ViewSubMerchant';
import CreateVoucherCategory from './pages/Voucher/CreateVoucherCategory';
import MerchantVoucherBatch from './pages/Voucher/VoucherBatch';
import VoucherCategory from './pages/Voucher/VoucherCategory';
import VoucherList from './pages/Voucher/VoucherLists';

function Router() {
  const element = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: 'dashboard', index: true, element: <Dashboard /> },
        { path: '/', element: <Dashboard /> },
        {
          path: '/sub-merchant', element: <Outlet />, children: [
            { element: <SubMerchant />, index: true },
            { element: <AddSubMerchant />, path: "add" },
            { element: <ViewSubMerchant />, path: ":id" },
            { element: <EditSubMerchant />, path: ":id/edit" },


          ]
        },
        {
          path: '/inventory', element: <Outlet />, children: [
            { element: <Inventory />, index: true },
            { element: <AddInventory />, path: "add" },
            { element: <ViewInventory />, path: ":id" },
            { element: <EditSubMerchant />, path: ":id/edit" },


          ]
        },
        {
          path: 'games', element: <Outlet />, children: [
            { element: <Games />, index: true, },
            { element: <SelfPlay />, path: ":uid/self-play" },
            { element: <CustomerPlay />, path: ":uid/customer-play" },
          ]
        },
        { element: <GamesPlayed />, path: "game-played" },

        { path: 'points', element: <Points /> },
        {
          path: 'profile', element: <Outlet />, children: [
            { index: true, element: <Profile /> },
            { path: 'update', element: <UpdateProfile /> },

          ]
        },
        { path: 'point-history', element: <PointHistory /> },
        {
          path: 'vouchers', element: <Outlet />, children: [
            { element: <VoucherCategory />, index: true, },
            { element: <CreateVoucherCategory />, path: "create" },
            {
              element: <MerchantVoucherBatch />, path: ":id/batch", element: <Outlet />, children:
                [
                  { element: <MerchantVoucherBatch />, index: true },
                  { element: <VoucherList />, path: ':batch' },
                ]
            },
          ]
        },
      ],

    },
    { path: '/login', index: true, element: <LoginPage /> },
    { path: '/forget-password', index: true, element: <ForgetPassword /> },

  ]);

  return element;
}
export default Router;



{/* <Routes>
  
        
  
  
                  <Route path="/" element={(<Dashboard />)} exact />
                  <Route path="/dashboard" element={(<Dashboard />)} exact />
  
                  <Route path="/pages/color-picker" element={<ColorPicker />} />
  
  
  
                  <Route path="/gamescategory/" element={(<GamesCategory />)} />
                  <Route path="/gamescategory/userplay" element={(<UserPlay />)} />
                  <Route path="/gamescategory/userplay/otp" element={(<OTP />)} />
                  <Route path="/gamescategory/confirmotp" element={(<ConfirmOTP />)} />
                  <Route path="/gamescategory/gamepanel" element={(<GamePanel />)} />
                  <Route path="/gamescategory/gameshow" element={(<GameShow />)} />
                  <Route path="/gamesplayed/" element={(<GamesPlayed />)} />
  
  
                  <Route path="/merchanttransfer/" element={(<MerchantTransfer />)} />
                  <Route path="/merchanttransfer/merchantshow" element={(<MerchantShow />)} />
                  <Route path="/pointsredeemed/" element={(<PointsRedeemed />)} />
  
                  <Route path="/inventorylist/" element={(<InventoryList />)} />
                  <Route path="/orderlist/" element={(<OrderList />)} />
                  <Route path="/inventorylist/inventoryadd" element={(<InventoryAdd />)} />
                  <Route path="/inventorylist/inventoryedit" element={(<InventoryEdit />)} />
                  <Route path="/inventorylist/inventoryshow" element={(<InventoryShow />)} />
                  <Route path="/orderlist/map" element={(<LocationMap />)} />
  
  
                  <Route path="/voucherlist/" element={(<VoucherList />)} />
                  <Route path="/voucherlist/voucheradd" element={(<VoucherAdd />)} />
                  <Route path="/voucherlist/voucheredit" element={(<VoucherEdit />)} />
                  <Route path="/voucherlist/vouchershow" element={(<VoucherShow />)} />
  
  
                  <Route path="/points/" element={(<Points />)} />
  
  
                  <Route path="/updateprofile/" element={(<UpdateProfile />)} />
                </Routes> */}
