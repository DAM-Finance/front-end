import { FC } from 'react'
import { IPendingTransaction } from '../../constants/IPendingTransaction'
import utils from '../../constants/utils'

interface HistoryTransactionTeleportProps {
  tx: IPendingTransaction
}

const HistoryTransactionTeleport: FC<HistoryTransactionTeleportProps> = ({ tx }) => {
  return (
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
          {tx.status === 'FAILED' && <img width="30" src={utils.getImageSrc('failed.png')} alt="failed" />}
          {tx.status === 'DELIVERED' && <img width="30" src={utils.getImageSrc('success.png')} alt="failed" />}
          <img width="10" src={utils.getImageSrc('diagonal-arrow.svg')} alt="arrow" />
        </a>
      ) : (
        <>
          {tx.status === 'FAILED' || tx.status === 'DELIVERED' ? (
            <>
              {tx.status === 'FAILED' && <img width="30" src={utils.getImageSrc('failed.png')} alt="failed" />}
              {tx.status === 'DELIVERED' && <img width="30" src={utils.getImageSrc('success.png')} alt="failed" />}
            </>
          ) : (
            <img width="25" src={utils.getImageSrc('progress.svg')} className="rotate" alt="progress animation" />
          )}
        </>
      )}
    </div>
  )
}

export default HistoryTransactionTeleport
