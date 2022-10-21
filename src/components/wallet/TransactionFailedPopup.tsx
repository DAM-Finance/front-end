import { FC } from 'react'
import utils from '../../constants/utils'

interface TransactionCompletedPopupProps {
  show: boolean
  handleClose: () => void
}

const TransactionCompletedPopup: FC<TransactionCompletedPopupProps> = ({ show, handleClose }) => {
  return (
    <>
      {show && (
        <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-damtranspdarkgray">
          <div className="fixed bg-damgray px-32 py-12 rounded-xl text-white">
            <div className="flex flex-col items-center gap-4">
              <img width="240" src={utils.getImageSrc('tfailed.svg')} alt="transaction in progress" />
              <div className="font-light text-2xl pt-4">Transaction failed!</div>
              <div className="flex gap-1 hover:cursor-pointer">
                <div className="text-sm text-damlabelgray">
                  <span>See the </span>
                  <span className="text-damyellow">transaction</span>
                </div>
                <img src={utils.getImageSrc('diagonal-arrow.svg')} alt="arrow" />
              </div>
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

export default TransactionCompletedPopup
