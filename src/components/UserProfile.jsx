import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { useDispatch } from 'react-redux';
import { fetchTokenSuccess } from '../action/Token';
import { fetchUserSuccess } from '../action/UserAction';
import { fetchSiteSuccess } from '../action/SiteSetting';

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentColor } = useStateContext();

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(fetchTokenSuccess(null))
    dispatch(fetchUserSuccess(null))
    dispatch(fetchSiteSuccess(null))
    navigate('/login')
    SuccessNotification({ title: "Thank you!", message: "You have been Logged out." })

  }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Merchant Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>

      <div className="mt-5">
        <Link to='/profile'>
          <Button
            color="white"
            bgColor={currentColor}
            text="Update Profile"
            borderRadius="10px"
            width="full"
          />
        </Link>

      </div>
      <div className="mt-5">
        <a onClick={handleLogout}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
        </a>
      </div>
    </div>

  );
};

export default UserProfile;
