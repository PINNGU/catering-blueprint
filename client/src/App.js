
import './App.css';
import axios from 'axios';
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import React, { useState, useEffect,useLayoutEffect } from 'react';
import Menu from './components/Menu';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [atTop, setAtTop] = useState(true);
  const [showShadow, setShowShadow] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setAtTop(scrollY === 0);
      setShowShadow(false);
      setScrolling(true);
  
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY === 0) {
          setShowShadow(true);
        }
        setScrolling(false);
        if (currentScrollY !== 0) {
          setShowShadow(true);
        }
      }, 500);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    handleScroll();
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="App">
    
        <Navbar showShadow={showShadow  || !scrolling}/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;
