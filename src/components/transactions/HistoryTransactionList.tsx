import { FC } from 'react'
import { useAppStore } from '../../stores/appStore/appStore'
import HistoryTransaction from './HistoryTransaction'

interface PendingTransactionsListProps {}

const PendingTransactionsList: FC<PendingTransactionsListProps> = () => {
  const appStore = useAppStore()
  const hasTxs = useAppStore((store) => store.historyTransactions.length) > 0

  return (
    <>
      {hasTxs && appStore.isHistoryTransactionsVisible && (
        <div className="text-white p-4 bg-damgray rounded-xl flex flex-col justify-center items-center gap-2 z-40 absolute right-4 top-4">
          <div className="font-bold text-center">History Transactions</div>
          {appStore.historyTransactions.map((tx) => (
            <HistoryTransaction key={tx.hash} tx={tx}></HistoryTransaction>
          ))}
        </div>
      )}
    </>
  )
}

export default PendingTransactionsList
