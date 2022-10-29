import { FC } from 'react'
import utils from '../../constants/utils'

interface TransactionCompletedPopupProps {
  show: boolean
  handleClose: () => void
  imgName?: string
  txLink?: string
}

const TransactionCompletedPopup: FC<TransactionCompletedPopupProps> = ({ show, handleClose, imgName = 'tfailed.svg', txLink = '' }) => {
  return (
    <>
      {show && (
        <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-damtranspdarkgray">
          <div className="flex fixed bg-damgray px-32 py-12 rounded-xl text-white">
            <div className="flex flex-col items-center gap-1">
              <img width="240" src={utils.getImageSrc(imgName)} alt="transaction in progress" />
              <div className="font-light text-2xl pt-4">Transaction failed!</div>
              {!!txLink && (
                <a className="flex gap-1 hover:cursor-pointer" href={txLink} target="_blank" rel="noreferrer">
                  <div className="text-sm text-damlabelgray">
                    <span>See the </span>
                    <span className="text-damyellow">transaction</span>
                  </div>
                  <img src={utils.getImageSrc('diagonal-arrow.svg')} alt="arrow" />
                </a>
              )}
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
