import React from 'react';
import './App.css';
import { useEffect } from "react";
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router ,Route,Routes } from "react-router-dom";
import webFont from 'webfontloader';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';

function App() {
  useEffect(()=>{
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

  },[]);
  return (
    <Router>
      <Header />
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/product/:id' element={<ProductDetails />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
