import Navbar from './components/common/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'
import WrongNetworkPop from './components/wallet/WrongNetworkPopup'

import { useMemo, useEffect, useState } from 'react'
import { useAppStore } from './stores/appStore/appStore'
import { supportedNetworks } from './constants/config'
import WaitingForConfirmationPopup from './components/wallet/WaitingForConfirmationPopup'
import TermsAndConditionsPopup from './components/wallet/TermsAndConditionsPopup'
import { useLocation } from 'react-router-dom'

const App = () => {
  const appStore = useAppStore()
  const location = useLocation()
  const [agreedTCs, setAgreedTCs] = useState(localStorage.getItem('agreedTC') === 'true')

  const isSelectedNetworkSupported = useMemo(() => {
    console.log('SUPPORTED', supportedNetworks)
    console.log('SELECTED', appStore.selectedNetwork)
    if (!appStore.isWrongNetworkPopupEnabled || !appStore.selectedNetwork || !appStore.walletProvider.connected) {
      return false
    }

    // if (location.)
    const isSelectedNetworkSupported = !!supportedNetworks.find((network) => network.chainId === appStore.selectedNetwork?.chainId)
    return !isSelectedNetworkSupported
  }, [appStore.isWrongNetworkPopupEnabled, appStore.selectedNetwork, appStore.walletProvider.connected, location])

  useEffect(() => {
    appStore.initWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('agreedTC', agreedTCs.toString())
  }, [agreedTCs])

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-damdarkgray">
        <Navbar />
        <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
          <Routes />
        </div>
      </div>
      <WrongNetworkPop
        show={isSelectedNetworkSupported}
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
        handleAgree={() => setAgreedTCs(true)}
        show={appStore.walletProvider.connected && !agreedTCs}
      ></TermsAndConditionsPopup>
    </>
  )
}

export default App
