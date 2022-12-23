import { FC, useState } from 'react'
import { localStorageObjects } from '../../constants/persist'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

const AddDPrimeToWallet: FC = () => {
  const appStore = useAppStore()
  const [dprimeAddedToWalletByNetwork, setDprimeAddedToWalletByNetwork] = useState(
    JSON.parse(localStorage.getItem(localStorageObjects.DPrimeAddedWallet) || '{}')
  )
  const isDprimeAdded = !!appStore.selectedNetwork && !!dprimeAddedToWalletByNetwork && dprimeAddedToWalletByNetwork[appStore.selectedNetwork.addresses.dPrime]
  const isConnected = appStore.walletProvider.connected && appStore.walletProvider.provider
  const addDPrime = async () => {
    try {
      const dprimeAdded = await appStore.addDPrimeToWallet()
      setDprimeAddedToWalletByNetwork(dprimeAdded)
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <>
      {!isDprimeAdded && isConnected && (
        <div className="flex items-center px-4 gap-2 rounded-full bg-dambackgroundgrayed text-white cursor-pointer" onClick={addDPrime}>
          <div>Add</div>
          <img className="pb-1" width="28px" src={utils.getImageSrc('dprimelogo.svg')} alt="wallet" />
        </div>
      )}
    </>
  )
}

export default AddDPrimeToWallet
