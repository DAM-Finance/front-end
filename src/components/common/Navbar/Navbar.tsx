import React, { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import utils from '../../../constants/utils'
import { useAppStore } from '../../../stores/appStore/appStore'
import { EthProviderContext } from '../EthProvider/EthProviderContext'
import { ChevronDownIcon, BeakerIcon } from '@heroicons/react/24/solid'

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const appStore = useAppStore()
  const ethProviderContext = useContext(EthProviderContext)

  const onClick = async () => {
    await ethProviderContext.connectWallet()
  }

  const shortenWalletAddress = (wallet: string) => {
    return `${wallet.slice(0, 5)}...${wallet.slice(-4, wallet.length)}`
  }

  // Connect button
  let connectBtn = (
    <button
      onClick={() => onClick()}
      className="outline outline-1 px-12 py-2 rounded-full bg-transparent text-damyellow outline-damtext-damyellow hover:bg-damyellow hover:text-damgray"
    >
      Connect
    </button>
  )

  if (ethProviderContext.connected) {
    connectBtn = (
      <div className="flex items-center px-4 py-2 gap-2 rounded-full bg-dambackgroundgrayed text-damyellow">
        <div>{shortenWalletAddress(ethProviderContext.accounts[0])}</div>
        <img className="pb-1" src={utils.getImageSrc('walleticon.png')} alt="wallet" />
      </div>
    )
  }

  const logoUrl = utils.getImageSrc('damlogo.svg')

  return (
    <nav className="flex items-center flex-wrap gap-12 bg-damgray px-4 md:px-24 py-5">
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

      <div className="flex ml-auto gap-4">
        <div className="relative">
          <div className="flex px-2 py-1 gap-2 rounded-full border-solid border-[1px] border-damyellow">
            <img className="" width={29} height={29} src={utils.getImageSrc(appStore.selectedNetwork?.iconName as string)} alt="selected network" />
            <ChevronDownIcon width={14} className="text-damyellow"></ChevronDownIcon>
          </div>
          <select
            className="absolute w-full h-full top-0 bg-transparent text-transparent outline-none"
            name="from"
            id="from"
            value={appStore.selectedNetwork?.symbol}
            onChange={() => {}}
          >
            {appStore.supportedNetworks.map((network) => (
              <option className="bg-damgray text-white" key={network.symbol} value={network.symbol}>
                {network.name}
              </option>
            ))}
          </select>
        </div>

        {connectBtn}
      </div>
    </nav>
  )
}

export default Navbar
