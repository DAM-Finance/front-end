import { FC } from 'react'
// import { supportedNetworks } from '../../constants/config'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

interface WrongNetworkPopupProps {
  show: boolean
  handleClose: () => void
}

const WrongNetworkPop: FC<WrongNetworkPopupProps> = ({ show, handleClose }) => {
  const appStore = useAppStore()
  const defaultNetwork = utils.getDefaultNetwork()

  return (
    <>
      {show && (
        <div className="w-screen h-screen z-30 fixed flex justify-center items-center top-0 left-0 bg-damtranspdarkgray">
          <div className="fixed bg-damgray flex flex-col items-center p-8 gap-4 rounded-xl text-white">
            <div className="font-light text-2xl">Wrong Network</div>
            <div className="text-sm font-light text-damlabelgray">
              <span>Please switch to the </span>
              <span className="font-bold">{defaultNetwork.name} Network</span>
              <span> in order to use dam.finance</span>
            </div>
            <button
              onClick={() => appStore.switchNetwork(defaultNetwork.chainId)}
              className="flex items-center mt-8 gap-2 rounded-full py-2 px-6 bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
            >
              Switch Network
            </button>
            <button>
              <img onClick={handleClose} className="absolute top-3 right-3" src={utils.getImageSrc('x2.svg')} alt="close" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default WrongNetworkPop
