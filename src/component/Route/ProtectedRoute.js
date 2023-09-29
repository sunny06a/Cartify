import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,} from 'react-router-dom'
const ProtectedRoute = ({ children, redirectTo }) => {
    const {isAuthenticated} = useSelector((state) => state.user);

    return (isAuthenticated===true) ? children : <Navigate to={redirectTo} />;
}
  
export default ProtectedRoute