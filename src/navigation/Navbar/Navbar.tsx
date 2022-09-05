import { Button, Toolbar, Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React, { FunctionComponent, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { EthProviderContext } from '../../components/common/EthProvider/EthProviderContext'

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const ethProviderContext = useContext(EthProviderContext)

  const onClick = async () => {
    await ethProviderContext.connectWallet()
  }

  const logoUrl = process.env.PUBLIC_URL + '/damlogo.svg'
  return (
    <nav className="flex items-center flex-wrap gap-12 bg-damgray px-4 md:px-24 py-4">
      <NavLink to="/">
        <img src={logoUrl} alt="Dam Finance logo" />
      </NavLink>
      {/* className="text-gray-500 hover:text-gray-300" */}
      <NavLink to="/" className={({ isActive }) => (isActive ? 'text-gray-300' : 'text-gray-500 hover:text-gray-300')}>
        Dashboard
      </NavLink>
      <NavLink to="/manage" className={({ isActive }) => (isActive ? 'text-gray-300' : 'text-gray-500 hover:text-gray-300')}>
        Manage
      </NavLink>
      <NavLink to="/earn" className={({ isActive }) => (isActive ? 'text-gray-300' : 'text-gray-500 hover:text-gray-300')}>
        Earn
      </NavLink>

      <button
        onClick={() => onClick()}
        className="ml-auto outline outline-1 px-12 py-2 rounded-full bg-transparent text-yellow-300 outline-yellow-300 hover:bg-yellow-300 hover:text-damgray"
      >
        {ethProviderContext.connected ? 'Connected' : 'Connect'}
      </button>
    </nav>
  )
}

export default Navbar
