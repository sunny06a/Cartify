import './App.css';
import Header from './component/layout/Header/Header';
import WebFont from 'webfontloader';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/Header/UserOptions';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';

function App() {
  const {isAuthenticated, user} = useSelector((state) => state.user);
  // load font before rendering 
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      }
    });
    store.dispatch(loadUser());
  }, []);
  
  return (
    <BrowserRouter>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/> }
    <Routes>
      <Route exact path="/" element={<Home/>} />
    </Routes>
    <Routes>
      <Route  path="/product/:id" element={<ProductDetails/>} />
    </Routes>
    <Routes>
      <Route exact path="/products" element={<Products/>} />
    </Routes>
    <Routes>
      <Route path="/products/:keyword" element={<Products/>} />
    </Routes>
    <Routes>
      <Route exact path="/search" element={<Search/>} />
    </Routes>
    <Routes>
      <Route exact path="/login" element={<LoginSignUp/>} />
    </Routes>
    <Routes>
    <Route
        path="/profile"
        element={
          <ProtectedRoute redirectTo="/login">
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
    <Routes>
    <Route
        path="/profile/update"
        element={
          <ProtectedRoute redirectTo="/login">
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
    <Routes>
    <Route
        path="/password/update"
        element={
          <ProtectedRoute redirectTo="/login">
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
    </Routes>
    <Routes>
    <Route
        path="/password/forgot"
        element={
            <ForgotPassword />
        }
      />
    </Routes>

    <Routes>
      <Route path ="/password/reset/:token" element={<ResetPassword/>} />
    </Routes>
    <Routes>
      <Route path ="/cart" element={<Cart/>} />
    </Routes>
    <Routes>
    <Route
        path="/login/shipping"
        element={
          <ProtectedRoute redirectTo="/login">
            <Shipping />
          </ProtectedRoute>
        }
      />
    <Route
        path="/order/confirm"
        element={
          <ProtectedRoute redirectTo="/login">
            <ConfirmOrder/>
          </ProtectedRoute>
        }
      />  
    </Routes>  
    <Footer/>
    </BrowserRouter> 
  );
}

export default App;
