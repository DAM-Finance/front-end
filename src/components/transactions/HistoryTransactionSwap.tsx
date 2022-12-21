import { FC } from 'react'
import { supportedTokens } from '../../constants/config'
import { IPendingTransaction } from '../../constants/IPendingTransaction'
import utils from '../../constants/utils'

interface HistoryTransactionSwapProps {
  tx: IPendingTransaction
}

const HistoryTransactionSwap: FC<HistoryTransactionSwapProps> = ({ tx }) => {
  const isBurn = tx.from?.token === supportedTokens.dPrime.symbol

  let action = 'Mint'
  let actionDesc = `${tx.to?.amount} ${tx.to?.token} `
  let actionDesc2 = ` ${tx.from?.token.toUpperCase()}` //  [${tx.from?.network}]

  if (isBurn) {
    action = 'Burn'
    actionDesc = `${tx.from?.amount} ${tx.from?.token} `
    actionDesc2 = ` ${tx.to?.token.toUpperCase()}` //  [${tx.from?.network}]
  }

  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <img
          src={utils.getImageSrc(tx.to?.networkImg as string)}
          width="30"
          alt="origin network"
          className="border-damgray border-solid border-2"
          style={{ borderRadius: '50%' }}
        />
      </div>
      <div className="flex items-center w-full">
        <span>{action}&nbsp;</span>
        <span className="font-bold">{actionDesc}</span>
        <span>&nbsp;with&nbsp;</span>
        <span className="font-bold">{actionDesc2}</span>
      </div>
      {!!tx.link ? (
        <a className="flex gap-1 justify-center ml-auto" href={tx.link} target="_blank" rel="noreferrer">
          {tx.status === 'FAILED' && <img width="30" src={utils.getImageSrc('failed.png')} alt="failed" />}
          {tx.status === 'DELIVERED' && <img width="30" src={utils.getImageSrc('success.png')} alt="failed" />}
          <img width="10" src={utils.getImageSrc('diagonal-arrow.svg')} alt="arrow" />
        </a>
      ) : (
        <img width="25" src={utils.getImageSrc('progress.svg')} className="rotate" alt="progress animation" />
      )}
    </div>
  )
}

export default HistoryTransactionSwap
