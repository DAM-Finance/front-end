import { FC } from 'react'
import { IPendingTransaction } from '../../constants/IPendingTransaction'
import utils from '../../constants/utils'

interface PendingTransactionProps {
  tx: IPendingTransaction
}

const PendingTransaction: FC<PendingTransactionProps> = ({ tx }) => {
  return (
    <div className="w-full">
      {tx.type === 'TELEPORT' && (
        <div className="flex gap-2">
          <div className="flex items-center">
            <img
              src={utils.getImageSrc(tx.from?.networkImg as string)}
              width="30"
              alt="origin network"
              className="border-damgray border-solid border-2"
              style={{ borderRadius: '50%' }}
            />
            <img
              src={utils.getImageSrc(tx.to?.networkImg as string)}
              width="30"
              alt="origin network"
              className="-ml-2 border-damgray border-solid border-2"
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div className="flex items-center">
            <span>Teleport&nbsp;</span>
            <span className="font-bold ">
              {tx.from?.amount}&nbsp;{tx.from?.token}&nbsp;
            </span>
            <span>from&nbsp;</span>
            <span className="font-bold ">{tx.from?.network}&nbsp;</span>
            <span>to&nbsp;</span>
            <span className="font-bold"> {tx.to?.network}</span>
          </div>
          {!!tx.lzScan ? (
            <a className="flex gap-1 justify-center" href={tx.lzScan} target="_blank" rel="noreferrer">
              <img width="10" src={utils.getImageSrc('diagonal-arrow.svg')} alt="arrow" />
            </a>
          ) : (
            <img width="25" src={utils.getImageSrc('progress.svg')} className="rotate" alt="progress animation" />
          )}
        </div>
      )}
    </div>
  )
}

export default PendingTransaction
