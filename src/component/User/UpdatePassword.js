import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import { Lock, LockOpen, VpnKey } from '@mui/icons-material'
import './UpdatePassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import MetaData from '../layout/MetaData'

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {loading, error, isUpdated} = useSelector(state => state.profile);
   
    const[oldPassword,setOldPassword] = useState("");
    const[newPassword,setNewPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    
    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('oldPassword', oldPassword);
        myForm.set('newPassword', newPassword);
        myForm.set('confirmPassword', confirmPassword);
        dispatch(updatePassword(myForm));
    }
 
    useEffect(() => {
        if(error){
            dispatch(clearErrors());
        }  
        if(isUpdated){
            navigate('/profile');
            dispatch({type: UPDATE_PASSWORD_RESET});
        }
    },[dispatch, error, isUpdated, navigate]);

  
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Update Password" />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>

            <form
              className="updatePasswordForm"
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >
            <div className='loginPassword'>
            <VpnKey/>
            <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>   
            <div className='loginPassword'>
            <Lock/>
            <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>   
            <div className='loginPassword'>
            <LockOpen/>
            <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>   
              <input
                type="submit"
                value="Change"
                className="updatePasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default UpdatePassword