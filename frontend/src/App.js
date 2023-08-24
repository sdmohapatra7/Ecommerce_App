import React from 'react';
import './App.css';
import { useEffect } from "react";
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router ,Route,Routes} from "react-router-dom";
import webFont from 'webfontloader';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';


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
      <Route path='/' Component={Home}/>
      <Route path='/product/:id' Component={ProductDetails}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
