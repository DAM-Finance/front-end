import Navbar from './components/common/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'
import WrongNetworkPop from './components/wallet/WrongNetworkPopup'

import { useMemo, useEffect, useState } from 'react'
import { useAppStore } from './stores/appStore/appStore'
import { supportedNetworks } from './constants/config'
import WaitingForConfirmationPopup from './components/wallet/WaitingForConfirmationPopup'
import TermsAndConditionsPopup from './components/wallet/TermsAndConditionsPopup'
import { useLocation } from 'react-router-dom'
import { localStorageObjects } from './constants/persist'

const App = () => {
  const appStore = useAppStore()
  const location = useLocation()
  const [agreedTCs, setAgreedTCs] = useState(JSON.parse(localStorage.getItem(localStorageObjects.agreedTcByWallet)!) || {})

  const showWrongNetwork = useMemo(() => {
    if (!appStore.isWrongNetworkPopupEnabled) {
      return false
    }

    // TODO: review
    if (location.pathname === '/teleport') {
      const missingCapability = !!(appStore.selectedNetwork && appStore.walletProvider.connected && !appStore.selectedNetwork.capabilities.canTeleport)
      const invalidNetwork = !supportedNetworks.find((network) => network.chainId === appStore.selectedNetwork?.chainId)
      return missingCapability || invalidNetwork
    }

    if (location.pathname === '/swap') {
      const missingCapability = !!(appStore.selectedNetwork && appStore.walletProvider.connected && !appStore.selectedNetwork.capabilities.canSwap)
      const invalidNetwork = !supportedNetworks.find((network) => network.chainId === appStore.selectedNetwork?.chainId)
      return missingCapability || invalidNetwork
    }

    return false
    // const isSelectedNetworkSupported =
    // return !isSelectedNetworkSupported
  }, [appStore.isWrongNetworkPopupEnabled, appStore.selectedNetwork, appStore.walletProvider.connected, location])

  useEffect(() => {
    appStore.initWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    debugger
    const tcs = JSON.parse(localStorage.getItem(localStorageObjects.agreedTcByWallet)!) || {}
    setAgreedTCs(tcs)
  }, [appStore.walletProvider.accounts])

  const updateTcs = () => {
    const tcs = { ...agreedTCs }
    const account = appStore.walletProvider.accounts[0]
    tcs[account] = 'true'
    setAgreedTCs(tcs)
    localStorage.setItem(localStorageObjects.agreedTcByWallet, JSON.stringify(tcs))
  }

  const showTcs = useMemo(() => {
    if (!appStore.walletProvider.connected) {
      return false
    }
    const account = appStore.walletProvider.accounts[0]
    return !agreedTCs[account]
  }, [appStore.walletProvider, agreedTCs])

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-damdarkgray">
        <Navbar />
        <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
          <Routes />
        </div>
      </div>
      <WrongNetworkPop
        show={showWrongNetwork}
        handleClose={() => {
          appStore.setIsWrongNetworkPopupEnabled(false)
        }}
      />
      <WaitingForConfirmationPopup
        handleClose={() => appStore.setShowWaitingForConfirmation(false)}
        show={appStore.showWaitingForConfirmation}
      ></WaitingForConfirmationPopup>
      <TermsAndConditionsPopup
        handleDecline={() => (window.location.href = 'https://dam.finance')}
        handleAgree={updateTcs}
        show={showTcs}
      ></TermsAndConditionsPopup>
    </>
  )
}

export default App
