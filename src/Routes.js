import React from 'react';
import {MdDashboard,MdGames, MdInventory, MdInventory2, MdVerifiedUser } from 'react-icons/md'
import {FiUsers, FiUser} from 'react-icons/fi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RiCouponLine } from 'react-icons/ri'

import { FaCoins } from 'react-icons/fa';

const Routes = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'dashboard',
        icon: <><MdDashboard/></>,
        link:'dashboard'
      },
    ],
  },

  {
    title: 'Sub Merchants',
    links: [
      {
        name: 'Sub Merchant',
        icon: <MdVerifiedUser/>,
        link:'sub-merchant'
      },
      
    ],
  },
  {
    title: 'Game',
    links: [
      {
        name: 'Games',
        icon: <MdGames/>,
        link:'games'
      },
      {
        name: 'Games Played',
        icon: <MdGames/>,
        link:'game-played'
      },
  
    ],
  },
  {
    title: 'Points',
    links: [
      {
        name: 'Points',
        icon: <><FiUser/></>,
        link:'points'
      },
      {
        name: 'Points history',
        icon: <><FiUser/></>,
        link:'point-history'
      },

    ],
  },
  {
    title: 'Inventory',
    links: [
      {
        name: 'Inventory',
        icon: <><MdInventory2/></>,
        link:'inventory'
      },
    ],
  },
  {
    title: 'Voucher',
    links: [
      {
        name: 'Voucher List',
        icon: <><RiCouponLine/></>,
        link:'vouchers'
      },
      
      
    ],
  },
];
export default Routes;
