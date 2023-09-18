import React from 'react';
import './App.css';
import  Header  from './component/layout/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import webFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';


function App() {
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ['Roboto', 'sans-serif']
      }
    });
  }, []);
  
  return (
    <>
    <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home></Home>}/>
    </Routes>
    <Footer></Footer>
    </BrowserRouter>
    </>
  );
}

export default App;
