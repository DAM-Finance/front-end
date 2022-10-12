import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import utils from '../../../constants/utils'
import ConnectButton from './../../wallet/ConnectButton'
import TVLButton from './../../wallet/TVLButton'
import SwitchNetworkSelector from './../../wallet/SwitchNetworkSelector'
import { useAppStore } from '../../../stores/appStore/appStore'

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const logoUrl = utils.getImageSrc('damlogo.svg')
  const appStore = useAppStore()

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

      {/* <NavLink to="/earn" className={({ isActive }) => (isActive ? 'text-white font-bold' : 'text-damNavGray hover:text-gray-300')}>
        Earn
      </NavLink> */}

      <div className="flex ml-auto gap-4">
        {!appStore.walletProvider.loading && (
          <>
            <TVLButton />
            <SwitchNetworkSelector />
            <ConnectButton />
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
