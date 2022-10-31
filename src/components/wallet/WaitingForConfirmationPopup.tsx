import { FC } from 'react'
import React from 'react'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

interface WaitingForConfirmationPopupProps {
  show: boolean
  handleClose: () => void
  addTokenOption?: boolean
  children?: React.ReactNode
}

const defaultChildren = (
  <div className="text-[14px] text-damlabelgray">
    <span>Please confirm the transaction on </span>
    <span className="font-bold">your wallet.</span>
  </div>
)

const WaitingForConfirmationPopup: FC<WaitingForConfirmationPopupProps> = ({ show, handleClose, children = defaultChildren }) => {
  return (
    <>
      {show && (
        <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-damtranspdarkgray">
          <div className="flex fixed bg-damgray flex-col items-center px-16 py-12 gap-2 rounded-xl text-white">
            <img width="128" src={utils.getImageSrc('progress.svg')} className="rotate" alt="progress animation" />
            <div className="font-light text-2xl">Waiting for your confirmation</div>

            {children}

            <button>
              <img onClick={handleClose} className="absolute top-3 right-3" src={utils.getImageSrc('x2.svg')} alt="close" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default WaitingForConfirmationPopup
