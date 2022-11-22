import { FC, useState } from 'react'
import { useAppStore } from '../../stores/appStore/appStore'

interface PendingTransactionsWidgetProps {}

const PendingTransactionsWidget: FC<PendingTransactionsWidgetProps> = () => {
  const appStore = useAppStore()
  const pendingTxs = appStore.pendingTransactions.length

  if (!pendingTxs) {
    return <></>
  }

  return (
    <button
      onClick={appStore.tooglePendingTransactions}
      className="outline outline-1 px-4 py-2 rounded-full bg-transparent text-damyellow outline-damtext-damyellow hover:bg-damyellow hover:text-damgray"
    >
      {pendingTxs} Pending
    </button>
  )
}

export default PendingTransactionsWidget
