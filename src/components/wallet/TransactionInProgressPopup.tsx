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
  children?: any
}

const TransactionInProgressPopup: FC<TransactionInProgressPopupProps> = ({
  show,
  handleClose,
  message = 'Transaction in progress',
  imgName = 'tip.svg',
  txLink = '',
  txLinkMsg = false,
  children = <></>
}) => {
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
                        <b>Notice:</b> Teleportation takes on average 15 minutes.
                      </span>
                    </div>
                  )}
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
