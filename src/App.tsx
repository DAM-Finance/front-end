import Navbar from './components/common/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'
import WrongNetworkPop from './components/wallet/WrongNetworkPopup'

import { useCallback, useEffect, useState } from 'react'
import { StateContext } from './components/common/State/State'
import { IPortfolio } from './features/dashboard'
import { supportedNetworks, useAppStore } from './stores/appStore/appStore'

const App = () => {
  const [portfolio, setPortfolio] = useState<Partial<IPortfolio>>({})
  // const [showWrongNetwork, setShowWrongNetwork] = useState(true)
  const appStore = useAppStore()

  const isSelectedNetworkSupported = useCallback(() => {
    return !!supportedNetworks.find((network) => network.chainId === appStore.walletProvider.chainId)
  }, [appStore.walletProvider.chainId])

  useEffect(() => {
    appStore.setupWallet()
  }, [])

  return (
    <StateContext.Provider value={{ portfolio, setPortfolio }}>
      <div className="flex flex-col w-full h-screen bg-damdarkgray">
        <Navbar />
        <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
          <Routes />
        </div>
      </div>
      <WrongNetworkPop show={appStore.walletProvider.connected && !isSelectedNetworkSupported()} handleClose={() => {}} />
    </StateContext.Provider>
  )
}

export default App
