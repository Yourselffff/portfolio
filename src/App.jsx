import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import CustomCursor from './components/CustomCursor';
import './index.css';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-container cursor-none"> {/* Hide default cursor */}
      <CustomCursor />
      <Navbar />
      <div className="stars-bg">
        <div className="overlay" />
      </div>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
