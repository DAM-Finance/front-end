import { FC, useCallback, useState, useEffect } from 'react' //useState,
import { useAppStore } from '../../../stores/appStore/appStore'
import { createClient } from '@layerzerolabs/scan-client'
import { IPendingTransaction } from '../../../constants/IPendingTransaction'
import PendingTransaction from './PendingTransaction'
import TransactionCompletedPopup from '../../wallet/TransactionCompletedPopup'

const client = createClient('testnet')

interface PendingTransactionsProps {}

const PendingTransactions: FC<PendingTransactionsProps> = () => {
  // const [lastUpdate, setLastUpdate] = useState(new Date())
  const appStore = useAppStore()
  const [transactionsQueue, setTransactionsQueue] = useState<{ [key: string]: IPendingTransaction }>({})
  const [popupTx, setPopupTx] = useState<IPendingTransaction | null>()

  const processTransaction = useCallback(
    async (pendingTransaction: IPendingTransaction) => {
      try {
        const transaction: IPendingTransaction = { ...pendingTransaction }
        console.log(transaction.hash, transaction)
        if (['DELIVERED', 'FAILED'].includes(transaction.status)) {
          const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
          appStore.setPendingTransactions(txs)
          return
        }
        if (transaction.status === 'REQUESTING') {
          await appStore.walletProvider.web3Provider!.waitForTransaction(transaction.hash)
          transaction.status = 'INFLIGHT'
          const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
          appStore.setPendingTransactions([...txs, transaction])
        }
        const res = await client.getMessagesBySrcTxHash(transaction.hash)
        if (res.messages && res.messages.length && (!transaction.lzData || transaction.lzData.status !== res.messages[0].status)) {
          const message = res.messages[0]
          transaction.status = message.status
          transaction.lzData = message
          setPopupTx(transaction)
          const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
          appStore.setPendingTransactions([...txs, transaction])
        } else {
          setTimeout(() => {
            processTransaction(transaction)
          }, 30000)
        }
      } catch (err) {
        console.error(err)
      }
    },
    [appStore]
  )

  useEffect(() => {
    appStore.pendingTransactions.forEach(async (pendingTx) => {
      if (transactionsQueue[pendingTx.hash]) {
        return
      }
      transactionsQueue[pendingTx.hash] = pendingTx
      setTransactionsQueue(transactionsQueue)
      processTransaction(pendingTx)
    })
  }, [appStore.pendingTransactions, processTransaction, transactionsQueue])

  if (!appStore.walletProvider.web3Provider) {
    return <></>
  }

  return (
    // <></>
    <div className="text-white px-12 py-4">
      <div className="flex flex-col gap-4">
        {appStore.pendingTransactions.map((tx) => (
          <PendingTransaction key={tx.hash} tx={tx}></PendingTransaction>
        ))}
      </div>

      <TransactionCompletedPopup handleClose={() => setPopupTx(null)} show={!!popupTx} imgName="teleport-completed.svg" message="Step 3: Teleport successful!">
        <div className="flex flex-col gap-6">
          <div className="text-md text-damlabelgray">
            <span>Switch network to use your dPRIME.</span>
          </div>
          <button
            onClick={() => {}} //appStore.switchNetwork(destinationNetwork.chainId)
            className="flex items-center justify-center gap-2 rounded-full py-3 px-6 mx-auto bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
          >
            <span>Switch Network</span>
          </button>
        </div>
      </TransactionCompletedPopup>
    </div>
  )
}

export default PendingTransactions
