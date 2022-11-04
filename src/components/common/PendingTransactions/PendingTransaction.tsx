import { FC } from 'react'
import { IPendingTransaction } from '../../../constants/IPendingTransaction'
import utils from '../../../constants/utils'

interface PendingTransactionProps {
  tx: IPendingTransaction
}

const PendingTransaction: FC<PendingTransactionProps> = ({ tx }) => {
  return (
    <div>
      {/* <div>Hash: {utils.shortenWalletAddress(tx.hash)}</div> */}
      {/* <div>Type: {tx.type}</div> */}
      {tx.type === 'TELEPORT' && (
        <div>
          <span>Teleport </span>
          <span>
            {tx.from?.amount} {tx.from?.token} [{tx.from?.network}]{' '}
          </span>
          <span>
            for {tx.to?.amount} {tx.to?.token} [{tx.to?.network}]
          </span>
        </div>
      )}
      <div>Status: {tx.status}</div>
      <div>Started at: {tx.startedAt.toString()}</div>
    </div>
  )
}

export default PendingTransaction
