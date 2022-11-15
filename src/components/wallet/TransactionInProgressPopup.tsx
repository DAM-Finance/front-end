import { FC, useState } from 'react'
import { localStorageObjects } from '../../constants/persist'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

interface TransactionInProgressPopupProps {
  show: boolean
  handleClose: () => void
  message?: string
  imgName?: string
  txLink?: string
  txLinkMsg?: boolean
  addTokenOption?: boolean
  children?: any
}

const TransactionInProgressPopup: FC<TransactionInProgressPopupProps> = ({
  show,
  handleClose,
  message = 'Transaction in progress',
  imgName = 'tip.svg',
  txLink = '',
  addTokenOption = true,
  txLinkMsg = false,
  children = <></>
}) => {
  const appStore = useAppStore()
  const [dprimeAddedToWalletByNetwork, setDprimeAddedToWalletByNetwork] = useState(
    JSON.parse(localStorage.getItem(localStorageObjects.DPrimeAddedWallet) || '{}')
  )

  const addDPrimeToWallet = async () => {
    try {
      const dprimeAdded = await appStore.addDPrimeToWallet()
      setDprimeAddedToWalletByNetwork(dprimeAdded)
    } catch (err) {
      // console.log(err)
    }
  }

  const isDprimeAdded = !!appStore.selectedNetwork && !!dprimeAddedToWalletByNetwork && dprimeAddedToWalletByNetwork[appStore.selectedNetwork.id]

  return (
    <>
      {show && (
        <div className="w-screen h-screen z-30 fixed flex justify-center items-center top-0 left-0 bg-damtranspdarkgray">
          <div className="fixed bg-damgray px-32 py-12 rounded-xl text-white">
            <div className="flex flex-col items-center gap-1">
              <img width="240" src={utils.getImageSrc(imgName)} alt="transaction in progress" />
              <div className="font-light text-2xl pt-4">{message}</div>
              {!!txLink && (
                <div className="flex flex-col">
                  <a className="flex gap-1 justify-center" href={txLink} target="_blank" rel="noreferrer">
                    <div className="text-sm text-damlabelgray">
                      <span>Follow the </span>
                      <span className="text-damyellow">transaction</span>
                    </div>
                    <img src={utils.getImageSrc('diagonal-arrow.svg')} alt="arrow" />
                  </a>
                  {txLinkMsg && (
                    <div className="pt-4 text-sm max-w-xl text-damlabelgray text-center">
                      <span>
                        <b>Notice:</b> Transaction tracking will be delayed in testnet.
                      </span>
                      <span>
                        For a more real time experience in testnet, search your wallet address on Goerli and Moonbase Alpha as both networks need to confirm the
                        teleportation.
                      </span>
                    </div>
                  )}
                </div>
              )}
              {addTokenOption && !isDprimeAdded && (
                <div className="flex flex-col gap-2 mt-6 items-center">
                  <button
                    onClick={addDPrimeToWallet}
                    className="flex items-center  w-fit gap-2 rounded-full py-2 px-6 bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
                  >
                    <img width={18} src={utils.getImageSrc('add.svg')} alt="Add" />
                    <span>Add</span>
                  </button>
                  <div className="text-damlightyellow">
                    <span>Add </span>
                    <span className="font-bold">dPRIME </span>
                    <span>to Metamask</span>
                  </div>
                </div>
              )}
              {children}
            </div>
            <button>
              <img onClick={handleClose} className="absolute top-3 right-3" src={utils.getImageSrc('x2.svg')} alt="close" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default TransactionInProgressPopup
