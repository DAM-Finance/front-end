import { FC } from 'react'
import { useAppStore } from '../../stores/appStore/appStore'

interface HistoryTransactionsWidgetProps {}

const HistoryTransactionsWidget: FC<HistoryTransactionsWidgetProps> = () => {
  const appStore = useAppStore()
  const account = appStore.walletProvider.accounts && appStore.walletProvider.accounts[0] && appStore.walletProvider.accounts[0].toLowerCase()

  if (!account) {
    return <></>
  }

  const history = appStore.historyTransactions[account]
  if (!account || !history || !history.length || !appStore.walletProvider.connected) {
    return <></>
  }

  return (
    <button
      onClick={appStore.toogleHistoryTransactions}
      className="outline outline-1 px-4 py-2 rounded-full bg-transparent text-damyellow outline-damtext-damyellow hover:bg-damyellow hover:text-damgray"
    >
      History
    </button>
  )
}

export default HistoryTransactionsWidget
