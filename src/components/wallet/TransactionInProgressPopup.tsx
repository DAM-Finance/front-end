import { FC } from 'react'
import utils from '../../constants/utils'

interface TransactionInProgressPopupProps {
  show: boolean
  handleClose: () => void
}

const TransactionInProgressPopup: FC<TransactionInProgressPopupProps> = ({ show, handleClose }) => {
  return (
    <>
      {show && (
        <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-damtranspdarkgray">
          <div className="fixed bg-damgray flex flex-col items-center p-16 gap-2 rounded-xl text-white">
            <img width="128" src={utils.getImageSrc('progress.svg')} alt="progress animation" />
            <div className="font-light text-2xl">Transaction in progress</div>
            <div className="text-sm text-damlabelgray">
              <span>Please confirm the transaction on </span>
              <span>your wallet.</span>
            </div>
            <div className="flex flex-col gap-2 mt-6 items-center">
              <div className="text-damyellow">
                <span>Transaction in progress</span>
                <span className="font-bold">dPRIME </span>
                <span>to Metamask</span>
              </div>
              <button
                onClick={() => {}}
                className="flex items-center  w-fit gap-2 rounded-full py-2 px-6 bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
              >
                <img width={18} src={utils.getImageSrc('add.svg')} alt="Add" />
                <span>Add</span>
              </button>
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
