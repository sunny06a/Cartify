import './App.css';
import Header from './component/layout/Header/Header';
import WebFont from 'webfontloader';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';


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
    <Footer/>
    </BrowserRouter> 
  );
}

export default App;
