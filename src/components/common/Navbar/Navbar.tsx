import React, { FunctionComponent, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import utils from '../../../constants/utils'

import { EthProviderContext } from '../EthProvider/EthProviderContext'

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const ethProviderContext = useContext(EthProviderContext)

  const onClick = async () => {
    await ethProviderContext.connectWallet()
  }

  const shortenWalletAddress = (wallet: string) => {
    return `${wallet.slice(0, 5)}...${wallet.slice(-4, wallet.length)}`
  }

  let connectBtn = (
    <button
      onClick={() => onClick()}
      className="ml-auto outline outline-1 px-12 py-2 rounded-full bg-transparent text-yellow-300 outline-yellow-300 hover:bg-yellow-300 hover:text-damgray"
    >
      Connect
    </button>
  )

  if (ethProviderContext.connected) {
    connectBtn = (
      <div className="ml-auto outline outline-1 px-12 py-2 rounded-full bg-transparent text-yellow-300 outline-yellow-300">
        {shortenWalletAddress(ethProviderContext.accounts[0])}
      </div>
    )
  }

  const logoUrl = utils.getImageSrc('damlogo.svg')
  return (
    <nav className="flex items-center flex-wrap gap-12 bg-damgray px-4 md:px-24 py-4">
      <NavLink to="/">
        <img src={logoUrl} alt="Dam Finance logo" />
      </NavLink>

      <NavLink to="/" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Dashboard
      </NavLink>
      <NavLink to="/swap" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        dPRIME Swap
      </NavLink>
      <NavLink to="/manage" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Manage
      </NavLink>
      <NavLink to="/teleport" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Teleport
      </NavLink>
      <NavLink to="/earn" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Earn
      </NavLink>

      {connectBtn}
    </nav>
  )
}

export default Navbar
