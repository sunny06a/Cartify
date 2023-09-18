import React from 'react';
import './App.css';
import  Header  from './component/layout/Header';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import webFont from 'webfontloader';


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
    <Routes>
      <Route path="/" element={<Header></Header>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
