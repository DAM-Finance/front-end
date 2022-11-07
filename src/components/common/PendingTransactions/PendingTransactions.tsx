// import { FC, useState, useEffect } from 'react'
import { FC } from 'react'
import { useAppStore } from '../../../stores/appStore/appStore'
// import { createClient } from '@layerzerolabs/scan-client'
// import { IPendingTransaction } from '../../../constants/IPendingTransaction'
// import PendingTransaction from './PendingTransaction'

// const client = createClient('testnet')

interface PendingTransactionsProps {}

const PendingTransactions: FC<PendingTransactionsProps> = () => {
  const appStore = useAppStore()
  // const [lastUpdate, setLastUpdate] = useState(new Date())

  // useEffect(() => {
  //   const interval = setInterval(() => setLastUpdate(new Date()), 30000)
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  if (!appStore.walletProvider.web3Provider) {
    return <></>
  }

  // appStore.pendingTransactions.forEach(async (pendingTx) => {
  //   try {
  //     const copyTx: IPendingTransaction = { ...pendingTx }
  //     if (pendingTx.status === 'DELIVERED' || pendingTx.status === 'FAILED') {
  //       // const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== pendingTx.hash)
  //       // appStore.setPendingTransactions(txs)
  //       return
  //     }

  //     // if (pendingTx.status === 'requesting') {
  //     //   await appStore.walletProvider.web3Provider!.waitForTransaction(pendingTx.hash)
  //     //   pendingTx.status = 'bridging'
  //     //   appStore.setPendingTransactions(appStore.pendingTransactions)
  //     // }

  //     if (pendingTx.status === 'REQUESTING') {
  //       await appStore.walletProvider.web3Provider!.waitForTransaction(pendingTx.hash)
  //       copyTx.status = 'INFLIGHT'
  //       const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== pendingTx.hash)
  //       appStore.setPendingTransactions([...txs, copyTx])
  //     }

  //     const res = await client.getMessagesBySrcTxHash(pendingTx.hash)
  //     console.log({ res })
  //     if (res.messages && res.messages.length && (!copyTx.lzData || copyTx.lzData.status !== res.messages[0].status)) {
  //       const message = res.messages[0]
  //       copyTx.status = message.status
  //       copyTx.lzData = message
  //       const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== pendingTx.hash)
  //       appStore.setPendingTransactions([...txs, copyTx])
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   }
  // })

  return (
    <></>
    // <div className="text-white px-12 py-4">
    //   <div className="flex flex-col gap-4">
    //     {appStore.pendingTransactions.map((tx) => (
    //       <PendingTransaction key={tx.hash} tx={tx}></PendingTransaction>
    //     ))}
    //   </div>
    // </div>
  )
}

export default PendingTransactions
