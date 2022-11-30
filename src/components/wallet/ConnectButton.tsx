import { FC } from 'react'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

const ConnectButton: FC = () => {
  const appStore = useAppStore()

  let connectBtn = <></>

  if (!appStore.walletProvider.connected && appStore.walletProvider.provider) {
    connectBtn = (
      <button
        onClick={appStore.connectWallet}
        className="outline outline-1 px-12 py-2 rounded-full bg-transparent text-damyellow outline-damtext-damyellow hover:bg-damyellow hover:text-damgray"
      >
        Connect
      </button>
    )
  }

  if (appStore.walletProvider.connected) {
    connectBtn = (
      <div className="flex items-center px-4 py-2 gap-2 rounded-full bg-dambackgroundgrayed text-damyellow">
        <div>{utils.shortenWalletAddress(appStore.walletProvider.accounts[0])}</div>
        <img className="pb-1" src={utils.getImageSrc('walleticon.png')} alt="wallet" />
      </div>
    )
  }

  return <>{connectBtn}</>
}

export default ConnectButton
