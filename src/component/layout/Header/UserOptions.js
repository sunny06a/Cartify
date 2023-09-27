import { Dashboard, ExitToApp, ListAlt, Person } from '@mui/icons-material';
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { logout } from '../../../actions/userActions';
import './Header.css'



const UserOptions = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, SetOpen] = useState(false);
    const options = [
      { icon: <ListAlt />, name: 'Orders', func:orders},
      { icon: <Person />, name: 'Profile', func:profile},
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
    function profile(){
      navigate('/profile');
    }
    function logoutUser(){
      dispatch(logout());
      navigate('/login');
    } 

  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}} />
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => SetOpen(false)}
            onOpen={() => SetOpen(true)}
            open={open}
            className='speedDial'
            style={{zIndex:"11"}}
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