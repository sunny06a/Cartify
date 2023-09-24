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
function App() {

  // load font before rendering 
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      }
    });
  }, []);
  
  return (
    <BrowserRouter>
    <Header/>
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
    <Footer/>
    </BrowserRouter> 
  );
}

export default App;
