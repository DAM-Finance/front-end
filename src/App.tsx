// import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom'
// import { Box } from '@mui/system';

import Navbar from './navigation/Navbar/Navbar'
import ComingSoon from './components/pages/ComingSoon'
import Homepage from './components/pages/HomePage'
// import Home from './components/pages/HomePage'
import NotFound from './components/pages/NotFound2'

import './App.css'

const App = () => {
  return (
    <div className="w-full h-screen flex flex-row">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="manager" element={<ComingSoon />} />
        <Route path="earn" element={<ComingSoon />} />
        <Route path="not-found" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate to="/not-found" replace />} /> */}
      </Routes>
    </div>
  )
}

export default App
