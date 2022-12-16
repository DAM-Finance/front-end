import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { supportedNetworks } from '../../constants/config'
import utils from '../../constants/utils'
import { IPortfolio } from '../../features/dashboard'
import { useAppStore } from '../../stores/appStore/appStore'

const DPrime: FC<Partial<IPortfolio>> = (props) => {
  const appStore = useAppStore()

  const isValidNetworkConnected = () => {
    const isSupported = supportedNetworks.findIndex((network) => network.chainId === appStore.selectedNetwork?.chainId) > -1
    return isSupported && appStore.walletProvider.connected
  }

  return (
    <div className="flex flex-col bg-damgray rounded-xl overflow-hidden" style={{ opacity: isValidNetworkConnected() ? '1' : '0.2' }}>
      <div className="flex flex-col p-6 gap-2 relative">
        <div className="text-damlabelgray">d2O Balance</div>
        <div className="text-3xl">{appStore.balances.dPrime ? utils.beautifyNumber(utils.format(appStore.balances.dPrime, 2)) : 0}</div>
        {/* <img className="absolute top-2 right-2" width={115} src={utils.getImageSrc('dprimebg.svg')} alt="dPrime background" /> */}
        <img
          className="absolute right-[-10px] top-[-30px]"
          width={150}
          src={utils.getImageSrc('dprimelogowhite.svg')}
          style={{ opacity: 0.3 }}
          alt="dPrime background"
        />
      </div>
      <NavLink className="mt-auto" to="/swap">
        <button className="bg-damtranspgray rounded-none w-full text-damyellow font-light py-3">Get d2O</button>
      </NavLink>
    </div>
  )
}

export default DPrime
