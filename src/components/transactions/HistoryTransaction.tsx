import { FC } from 'react'
import { IPendingTransaction } from '../../constants/IPendingTransaction'
import HistoryTransactionSwap from './HistoryTransactionSwap'
import HistoryTransactionTeleport from './HistoryTransactionTeleport'
import HistoryTransactionApprove from './HistoryTransactionApprove'

interface HistoryTransactionProps {
  tx: IPendingTransaction
}

const HistoryTransaction: FC<HistoryTransactionProps> = ({ tx }) => {
  return (
    <div className="w-full">
      {tx.type === 'TELEPORT' && <HistoryTransactionTeleport tx={tx}></HistoryTransactionTeleport>}
      {tx.type === 'SWAP' && <HistoryTransactionSwap tx={tx}></HistoryTransactionSwap>}
      {tx.type === 'APPROVE' && <HistoryTransactionApprove tx={tx}></HistoryTransactionApprove>}
    </div>
  )
}

export default HistoryTransaction
