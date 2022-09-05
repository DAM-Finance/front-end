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
    <div className="flex flex-col w-full h-screen bg-damdarkgray">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
