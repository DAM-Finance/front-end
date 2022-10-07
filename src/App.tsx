import Navbar from './components/common/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'
import WrongNetworkPop from './components/wallet/WrongNetworkPopup'

import { useCallback, useEffect } from 'react'
import { useAppStore } from './stores/appStore/appStore'
import { supportedNetworks } from './constants/config'
import WaitingForConfirmationPopup from './components/wallet/WaitingForConfirmationPopup'

const App = () => {
  const appStore = useAppStore()

  const isSelectedNetworkSupported = useCallback(() => {
    return !!supportedNetworks.find((network) => network.chainId === appStore.selectedNetwork?.chainId)
  }, [appStore.selectedNetwork])

  useEffect(() => {
    appStore.initWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-damdarkgray">
        <Navbar />
        <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
          <Routes />
        </div>
      </div>
      <WrongNetworkPop
        show={appStore.isWrongNetworkPopupEnabled && appStore.walletProvider.connected && !isSelectedNetworkSupported()}
        handleClose={() => {
          appStore.setIsWrongNetworkPopupEnabled(false)
        }}
      />
      <WaitingForConfirmationPopup
        handleClose={() => appStore.setShowConnectingWalletPopup(false)}
        show={appStore.showConnectingWalletPopup}
      ></WaitingForConfirmationPopup>
    </>
  )
}

export default App
