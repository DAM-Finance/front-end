import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import utils from '../../../constants/utils'
import ConnectButton from './../../wallet/ConnectButton'
// import TVLButton from './../../wallet/TVLButton'
import SwitchNetworkSelector from './../../wallet/SwitchNetworkSelector'
import { useAppStore } from '../../../stores/appStore/appStore'
import AddDPrimeToWallet from '../../wallet/AddDPrimeToWallet'
import { localStorageObjects } from '../../../constants/persist'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const appStore = useAppStore()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dprimeAddedToWalletByNetwork, setDprimeAddedToWalletByNetwork] = useState(
    JSON.parse(localStorage.getItem(localStorageObjects.DPrimeAddedWallet) || '{}')
  )
  const isDprimeAdded = !!appStore.selectedNetwork && !!dprimeAddedToWalletByNetwork && dprimeAddedToWalletByNetwork[appStore.selectedNetwork.id]

  return (
    <nav className="flex items-center flex-wrap gap-12 bg-damgray px-4 md:px-24 py-5">
      <NavLink to="/">
        {/* <img src={utils.getImageSrc('damlogo.svg')} alt="Dam Finance logo" /> */}
        <img src={utils.getImageSrc('mainlogowhite.svg')} width="100" alt="Dam Finance logo" />
      </NavLink>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Dashboard
      </NavLink>
      <NavLink to="/swap" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Get
      </NavLink>
      {/* <NavLink to="/manage" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Manage
      </NavLink> */}
      <NavLink to="/teleport" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Teleport
      </NavLink>

      {/* <NavLink to="/earn" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Earn
      </NavLink> */}

      <div className="flex ml-auto gap-4">
        {!appStore.walletProvider.loading && (
          <>
            {/* <TVLButton /> */}
            {!isDprimeAdded && <AddDPrimeToWallet></AddDPrimeToWallet>}
            <SwitchNetworkSelector />
            <ConnectButton />
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
