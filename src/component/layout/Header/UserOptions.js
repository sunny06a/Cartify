import { Dashboard, ExitToApp, ListAlt, Person } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { logout } from '../../../actions/userActions';
const UserOptions = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, SetOpen] = useState(false);
    const options = [
      { icon: <ListAlt />, name: 'Orders', func:orders},
      { icon: <Person />, name: 'Profile', func:account},
      { icon: <ExitToApp />, name: 'Logout', func:logoutUser}
      ];

    if(user.role === 'admin'){
        options.unshift({ icon: <Dashboard />, name: 'Dashboard', func:dashboard})
    }

    function dashboard(){
      navigate('/admin/dashboard');
    }
    function orders(){
      navigate('/orders');
    }
    function account(){
      navigate('/profile');
    }
    function logoutUser(){
      dispatch(logout());
      navigate('/login');
    } 

  return (
    <Fragment>
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => SetOpen(false)}
            onOpen={() => SetOpen(true)}
            open={open}
            direction='down'
            icon={
                <img className='speedDialIcon'
                src={user.avatar.url ? user.avatar.url : './Profile.png'}
                alt={user.name}
                />
            }>
            {options.map((option) => (
                <SpeedDialAction
                key={option.name}
                icon={option.icon}
                tooltipTitle={option.name}
                onClick={option.func}
                />
            ))}
            </SpeedDial>
    </Fragment>
  )
}

export default UserOptions