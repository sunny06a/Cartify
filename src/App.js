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
      <Route path="/" element={<Home/>} />
    </Routes>
    <Routes>
      <Route path="/product/:id" element={<ProductDetails/>} />
    </Routes>
    <Routes>
      <Route path="/products" element={<Products/>} />
    </Routes>
    <Routes>
      <Route path="/products/:keyword" element={<Products/>} />
    </Routes>
    <Routes>
      <Route path="/search" element={<Search/>} />
    </Routes>
    <Routes>
      <Route path="/login" element={<LoginSignUp/>} />
    </Routes>
    <Footer/>
    </BrowserRouter> 
  );
}

export default App;
