import { FC } from 'react'
import React from 'react'
import utils from '../../constants/utils'

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

const WaitingForConfirmationPopup: FC<WaitingForConfirmationPopupProps> = ({ show, handleClose, addTokenOption = true, children = defaultChildren }) => {
  return (
    <>
      {show && (
        <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-damtranspdarkgray">
          <div className="flex fixed bg-damgray flex flex-col items-center px-16 py-12 gap-2 rounded-xl text-white">
            <img width="128" src={utils.getImageSrc('progress.svg')} className="rotate" alt="progress animation" />
            <div className="font-light text-2xl">Waiting for your confirmation</div>
            {children}

            {addTokenOption && (
              <div className="flex flex-col gap-2 mt-6 items-center">
                <button
                  onClick={() => {}}
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
