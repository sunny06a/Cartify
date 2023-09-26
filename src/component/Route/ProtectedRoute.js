import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate,} from 'react-router-dom'
const ProtectedRoute = ({component : Component, ...rest}) => {
    const {isAuthenticated, loading} = useSelector((state) => state.user);
  return (
    <Fragment>
        <Route {...rest} render={props => {
            if(!isAuthenticated && !loading){
                return <Navigate to='/login' />
            }else{
                return <Component {...props} />
            }
        }} />
        
    </Fragment>
  )
}

export default ProtectedRoute