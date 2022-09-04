// import React from 'react';

// import { Navigate, Route, Routes } from 'react-router-dom';
// import { Box } from '@mui/system';

// import ComingSoon from './components/pages/ComingSoon';
// import Home from './components/pages/HomePage';
// import NotFound from './components/pages/NotFound';
// import Navbar from './navigation/Navbar/Navbar';

import './App.css'

const App = () => {
  return (
    <div className="w-full h-screen flex flex-row">
      <div>Hey</div>
      <div>I am</div>
      <div>ME!</div>
      {/* <Navbar /> */}
      {/* <Routes>
        <Route path="mint" element={<ComingSoon />} />
        <Route path="stake" element={<ComingSoon />} />
        <Route path="liquidate" element={<ComingSoon />} />
        <Route path="ecosystem" element={<ComingSoon />} />
        <Route path="" element={<Home />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes> */}
    </div>
  )
}

export default App
