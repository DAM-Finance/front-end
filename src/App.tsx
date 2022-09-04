// import React from 'react';

// import { Navigate, Route, Routes } from 'react-router-dom'
// import { Box } from '@mui/system';

// import ComingSoon from './components/pages/ComingSoon'
// import Dashboard from './components/pages/Dashboard'
// import NotFound from './components/pages/PageNotFound'
import Navbar from './navigation/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'

import './App.css'

const App = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
