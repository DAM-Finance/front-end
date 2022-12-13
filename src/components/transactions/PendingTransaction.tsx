import { FC } from 'react'
import { IPendingTransaction } from '../../constants/IPendingTransaction'
import PendingTransactionSwap from './PendingTransactionSwap'
import PendingTransactionTeleport from './PendingTransactionTeleport'

interface PendingTransactionProps {
  tx: IPendingTransaction
}

const PendingTransaction: FC<PendingTransactionProps> = ({ tx }) => {
  return (
    <div className="w-full">
      {tx.type === 'TELEPORT' && <PendingTransactionTeleport tx={tx}></PendingTransactionTeleport>}
      {tx.type === 'SWAP' && <PendingTransactionSwap tx={tx}></PendingTransactionSwap>}
    </div>
  )
}

export default PendingTransaction
