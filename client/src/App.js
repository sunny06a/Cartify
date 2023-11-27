import './App.css';
import Header from './component/layout/Header/Header';
import WebFont from 'webfontloader';
import React, { useEffect, useState } from 'react';
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
// import AdminRoute from './component/Route/AdminRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UserList from './component/Admin/UserList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./component/layout/Not Found/NotFound";
import About from './component/layout/About/About';

function App() {
  const {isAuthenticated, user} = useSelector((state) => state.user);
  
  const [stripeApiKey, setStripeApiKey] = useState("");
  
  async function getStripeApiKey() { 
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }
  
    
  // load font before rendering 
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <BrowserRouter>
    <ToastContainer position="bottom-center" theme="colored" autoClose={3000} transition={Zoom}/>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/> }
    {
      stripeApiKey && 
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Routes>
          <Route
            path="/payment/process"
            element={
              <ProtectedRoute redirectTo="/login">
                <Payment/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Elements>
    }
   
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route  path="/product/:id" element={<ProductDetails/>} />
      <Route exact path="/products" element={<Products/>} />
      <Route path="/products/:keyword" element={<Products/>} />
      <Route exact path="/search" element={<Search/>} />
      <Route exact path="/login" element={<LoginSignUp/>} />
      <Route exact path="/about" element={<About/>} />
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
    <Route
        path="/profile/update"
        element={
          <ProtectedRoute redirectTo="/login">
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
    <Route
        path="/password/update"
        element={
          <ProtectedRoute redirectTo="/login">
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
    <Route
        path="/password/forgot"
        element={
            <ForgotPassword />
        }
      />
    </Routes>
    <Routes>
      <Route path ="/password/reset/:token" element={<ResetPassword/>} />
      <Route path ="/cart" element={<Cart/>} />
    </Routes>
    <Routes>
    <Route
        path="/shipping"
        element={
          <ProtectedRoute redirectTo="/login">
            <Shipping />
          </ProtectedRoute>
        }
      />
    <Route
       exact path="/order/confirm"
        element={
          <ProtectedRoute redirectTo="/login">
            <ConfirmOrder/>
          </ProtectedRoute>
        }
      />  
    </Routes>  
    <Routes>
    <Route
        path="/success"
        element={
          <ProtectedRoute redirectTo="/login">
            <OrderSuccess/>
          </ProtectedRoute>
        }
      />  
    <Route
        path="/orders"
        element={
          <ProtectedRoute redirectTo="/login">
            <MyOrders/>
          </ProtectedRoute>
        }
      />  
    <Route
        path="/order/:id"
        element={
          <ProtectedRoute redirectTo="/login">
            <OrderDetails/>
          </ProtectedRoute>
        }
      />  
    <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute redirectTo="/login">
            <Dashboard/>
          </ProtectedRoute>
        }
      />
    <Route
        path="/admin/products"
        element={
          <ProtectedRoute redirectTo="/login">
            <ProductList/>
          </ProtectedRoute>
        } 
      />
    <Route
        path="/admin/product"
        element={
          <ProtectedRoute redirectTo="/login">
            <NewProduct/>
          </ProtectedRoute>
        }
      />
    <Route
        path="/admin/product/:id"
        element={
          <ProtectedRoute redirectTo="/login">
            <UpdateProduct/>
          </ProtectedRoute>
        }
      />
    <Route
        path="/admin/orders"
        element={
          <ProtectedRoute redirectTo="/login">
            <OrderList/>
          </ProtectedRoute>
        }
      />
    <Route
        path="/admin/order/:id"
        element={
          <ProtectedRoute redirectTo="/login">
            <ProcessOrder/>
          </ProtectedRoute>
        }
      />
    <Route
        path="/admin/users"
        element={
          <ProtectedRoute redirectTo="/login">
            <UserList/>
          </ProtectedRoute>
        }
      />
    <Route
        path="/admin/user/:id"
        element={
          <ProtectedRoute redirectTo="/login">
            <UpdateUser/>
          </ProtectedRoute>
        }
      />
    <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute redirectTo="/login">
            <ProductReviews/>
          </ProtectedRoute>
        }
      />
      <Route
          element={
            window.location.pathname === "/payment/process" ? null : NotFound
          }
        />

  </Routes>

    <Footer/>
    </BrowserRouter> 
  );
}

export default App;
