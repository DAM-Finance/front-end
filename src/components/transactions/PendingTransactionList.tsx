import { FC, useState } from 'react'
import { useAppStore } from '../../stores/appStore/appStore'
import PendingTransaction from './PendingTransaction'

interface PendingTransactionsListProps {}

const PendingTransactionsList: FC<PendingTransactionsListProps> = () => {
  const appStore = useAppStore()
  const hasPendingTxs = useAppStore((store) => store.pendingTransactions.length) > 0

  return (
    <>
      {hasPendingTxs && appStore.isPendingTransactionsVisible && (
        <div className="text-white p-4 bg-damgray rounded-xl flex flex-col justify-center items-center gap-2 z-40 absolute right-4 top-4">
          <div className="font-bold text-center">Pending Transactions</div>
          {appStore.pendingTransactions.map((tx) => (
            <PendingTransaction tx={tx}></PendingTransaction>
          ))}
        </div>
      )}
    </>
  )
}

export default PendingTransactionsList
