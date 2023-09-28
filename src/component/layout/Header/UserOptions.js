import { Dashboard, ExitToApp, ListAlt, Person, ShoppingCart } from '@mui/icons-material';
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { logout } from '../../../actions/userActions';
import './Header.css'



const UserOptions = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart);
    const [open, SetOpen] = useState(false);
    const options = [
      { icon: <ListAlt />, name: 'Orders', func:orders},
      { icon: <Person />, name: 'Profile', func:profile},
      { icon: <ShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}}/>, name: `cart${cartItems.length}`, func:cart},
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
    function cart(){
      navigate('/cart');
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
                tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
            ))}
            </SpeedDial>
    </Fragment>
  )
}

export default UserOptions