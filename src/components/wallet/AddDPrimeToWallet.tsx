import { FC, useState } from 'react'
import { localStorageObjects } from '../../constants/persist'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

const AddDPrimeToWallet: FC = () => {
  const appStore = useAppStore()
  const [dprimeAddedToWalletByNetwork, setDprimeAddedToWalletByNetwork] = useState(
    JSON.parse(localStorage.getItem(localStorageObjects.DPrimeAddedWallet) || '{}')
  )
  const isDprimeAdded = !!appStore.selectedNetwork && !!dprimeAddedToWalletByNetwork && dprimeAddedToWalletByNetwork[appStore.selectedNetwork.id]

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
      {!isDprimeAdded && (
        <div className="flex items-center px-4 py-2 gap-2 rounded-full bg-dambackgroundgrayed text-damyellow cursor-pointer" onClick={addDPrime}>
          <div>dPRIME</div>
          <img className="pb-1" width="25px" src={utils.getImageSrc('metamask.png')} alt="wallet" />
          {/* <img className="pb-1" src={utils.getImageSrc('link-external.svg')} alt="wallet" /> */}
        </div>
      )}
    </>
  )
}

export default AddDPrimeToWallet
