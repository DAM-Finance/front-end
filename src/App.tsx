import Navbar from './components/common/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'
import WrongNetworkPop from './components/wallet/WrongNetworkPopup'

import { useEffect, useState } from 'react'
import { useAppStore } from './stores/appStore/appStore'
import { supportedNetworks } from './constants/config'
import WaitingForConfirmationPopup from './components/wallet/WaitingForConfirmationPopup'
import TermsAndConditionsPopup from './components/wallet/TermsAndConditionsPopup'
import { localStorageObjects } from './constants/persist'
import PendingTransactionsEngine from './components/common/PendingTransactions/PendingTransactionsEngine'
import PendingTransactionsList from './components/transactions/PendingTransactionList'

const App = () => {
  const appStore = useAppStore()
  const [agreedTCs, setAgreedTCs] = useState(JSON.parse(localStorage.getItem(localStorageObjects.agreedTcByWallet)!) || {})

  const showWrongNetwork = () => {
    if (!appStore.isWrongNetworkPopupEnabled || !appStore.walletProvider.provider) {
      return false
    }

    return !supportedNetworks.find((network) => network.chainId === appStore.selectedNetwork?.chainId)
  }

  useEffect(() => {
    appStore.initWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const tcs = JSON.parse(localStorage.getItem(localStorageObjects.agreedTcByWallet)!) || {}
    setAgreedTCs(tcs)
  }, [appStore.walletProvider.accounts])

  const updateTcs = () => {
    const tcs = { ...agreedTCs }
    const account = appStore.walletProvider.accounts[0].toLowerCase()
    tcs[account] = 'true'
    setAgreedTCs(tcs)
    localStorage.setItem(localStorageObjects.agreedTcByWallet, JSON.stringify(tcs))
  }

  const showTcs = () => {
    if (!appStore.walletProvider.connected) {
      return false
    }
    const account = appStore.walletProvider.accounts[0].toLowerCase()
    return !agreedTCs[account]
  }

  return (
    <>
      <PendingTransactionsEngine></PendingTransactionsEngine>
      <div className="flex flex-col w-full h-full bg-damdarkgray">
        <Navbar />
        <div className="w-full h-full relative">
          <PendingTransactionsList></PendingTransactionsList>
          <Routes />
        </div>
      </div>
      <WrongNetworkPop
        show={showWrongNetwork()}
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
        show={showTcs()}
      ></TermsAndConditionsPopup>
    </>
  )
}

export default App
