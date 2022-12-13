import { FC, useCallback, useState, useEffect } from 'react' //useState,
import { useAppStore } from '../../../stores/appStore/appStore'
import { createClient } from '@layerzerolabs/scan-client'
import { IPendingTransaction } from '../../../constants/IPendingTransaction'
import TransactionCompletedPopup from '../../wallet/TransactionCompletedPopup'
import WaitingForConfirmationPopup from '../../wallet/WaitingForConfirmationPopup'
import TransactionInProgressPopup from '../../wallet/TransactionInProgressPopup'
import TransactionFailedPopup from '../../wallet/TransactionFailedPopup'
import utils from '../../../constants/utils'
import {
  isDev,
  scanDestinationLzIdMask,
  scanDestinationLzPipeMask,
  scanNonceMask,
  scanOriginLzIdMask,
  scanOriginLzPipeMask,
  supportedNetworks,
  supportedTokens
} from '../../../constants/config'
import { ISupportedTokensMap } from '../../../constants/ISupportedToken'
const moveDecimal = require('move-decimal-point')
const BN = require('bn.js')

const client = createClient('testnet')

interface PendingTransactionsProps {}

const PendingTransactionsEngine: FC<PendingTransactionsProps> = () => {
  const appStore = useAppStore()
  const [forceUpdate, setForceUpdate] = useState(0)
  const [showDevSwitch, setShowDevSwitch] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate((cur) => cur + 1)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleTeleport = useCallback(
    async (transaction: IPendingTransaction) => {
      if (transaction.status === 'REQUESTING') {
        const txReceipt = await appStore.walletProvider.web3Provider!.waitForTransaction(transaction.hash)
        console.log({ txReceipt })
        if (txReceipt.status === 1) {
          transaction.status = 'INFLIGHT'
          const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
          appStore.setNotifyTransaction(transaction)
          appStore.setPendingTransactions([...txs, transaction])
        } else {
          transaction.status = 'FAILED'
          const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
          appStore.setNotifyTransaction(transaction)
          appStore.setPendingTransactions([...txs])
          return
        }
      }

      const res = await client.getMessagesBySrcTxHash(transaction.hash)
      if (appStore.selectedNetwork && res.messages && res.messages.length && (!transaction.lzData || transaction.lzData.status !== res.messages[0].status)) {
        const message = res.messages[0]
        transaction.status = message.status
        transaction.lzData = message

        const originChain = supportedNetworks.find((net) => net.chainId === transaction.from?.chainId)!
        const dstChain = supportedNetworks.find((net) => net.chainId === transaction.to?.chainId)!
        let url = appStore.selectedNetwork!.scanLz
        url = url.replace(scanOriginLzIdMask, originChain.layerZeroChainIds)
        url = url.replace(scanOriginLzPipeMask, originChain.addresses.lzPipe!)
        url = url.replace(scanDestinationLzIdMask, dstChain.layerZeroChainIds)
        url = url.replace(scanDestinationLzPipeMask, dstChain.addresses.lzPipe!)
        url = url.replace(scanNonceMask, transaction.lzData.srcUaNonce.toString())
        transaction.lzScan = url

        appStore.setNotifyTransaction(transaction)
        const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
        appStore.setPendingTransactions([...txs, transaction])
        await appStore.updateTokenBalance('dPrime')
      }
      if (isDev) {
        const balance: string = moveDecimal(appStore.balances.dPrime, supportedTokens.dPrime.units)
        const dPrimeBalance = await appStore.getTokenBalance('dPrime')
        const newBalance = moveDecimal(dPrimeBalance, supportedTokens.dPrime.units)
        const newBalanceBN = new BN(newBalance, 10)
        const diff = newBalanceBN.sub(new BN(balance, 10))
        if (diff.eq(new BN('0'))) {
          return
        }
        const transferValue: string = moveDecimal(diff.toString(), -supportedTokens.dPrime.units)
        const foundTx = appStore.pendingTransactions.filter((tx) => tx.type === 'TELEPORT').find((tx) => tx.from?.amount === transferValue)
        if (!foundTx) {
          return
        }
        const txUpdate = { ...foundTx }
        txUpdate.status = 'DELIVERED'
        appStore.setNotifyTransaction(txUpdate)
        const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== txUpdate.hash)
        appStore.setPendingTransactions([...txs, txUpdate])
        await appStore.updateTokenBalance('dPrime')
        setShowDevSwitch(true)
      }
    },
    [appStore]
  )

  const handleSwap = useCallback(
    async (transaction: IPendingTransaction) => {
      if (!appStore.walletProvider.web3Provider) {
        return
      }

      const receipt = await appStore.walletProvider.web3Provider.getTransactionReceipt(transaction.hash)
      if (!receipt) {
        return
      }

      if (receipt.status === 1) {
        transaction.status = 'DELIVERED'
      } else if (receipt.status === 0) {
        transaction.status = 'FAILED'
      }
      const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
      appStore.setPendingTransactions([...txs, transaction])
      await appStore.updateTokenBalance(transaction.from?.token as keyof ISupportedTokensMap)
      await appStore.updateTokenBalance(transaction.from?.token as keyof ISupportedTokensMap)

      if (['DELIVERED', 'FAILED'].includes(transaction.status)) {
        const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
        appStore.setPendingTransactions(txs)
        return
      }
    },
    [appStore]
  )

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
        const now = new Date().getTime()
        const deltaReq = now - new Date(transaction.startedAt!).getTime()
        if (deltaReq > 1000 * 3600 * 24) {
          const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== transaction.hash)
          appStore.setPendingTransactions(txs)
          return
        }

        if (transaction.type === 'TELEPORT') {
          handleTeleport(transaction)
        } else if (transaction.type === 'SWAP') {
          handleSwap(transaction)
        }
      } catch (err) {
        console.error(err)
      }
    },
    [appStore, handleTeleport, handleSwap]
  )

  const processPendingTasks = useCallback(() => {
    appStore.pendingTransactions.forEach(async (pendingTx) => {
      processTransaction(pendingTx)
    })
  }, [appStore.pendingTransactions, processTransaction])

  useEffect(() => {
    processPendingTasks()
  }, [forceUpdate, processPendingTasks])

  const showTeleportWaiting = () => {
    if (!appStore.notifyTransaction) {
      return false
    }
    return appStore.notifyTransaction.type === 'TELEPORT' && appStore.notifyTransaction.status === 'CONFIRMING'
  }

  const showTeleportRequesting = () => {
    if (!appStore.notifyTransaction) {
      return false
    }
    return appStore.notifyTransaction.type === 'TELEPORT' && appStore.notifyTransaction.status === 'REQUESTING'
  }

  const showTeleportInflight = () => {
    if (!appStore.notifyTransaction) {
      return false
    }
    return appStore.notifyTransaction.type === 'TELEPORT' && appStore.notifyTransaction.status === 'INFLIGHT'
  }

  const showTeleportComplete = () => {
    if (!appStore.notifyTransaction) {
      return false
    }
    return appStore.notifyTransaction.type === 'TELEPORT' && appStore.notifyTransaction.status === 'DELIVERED'
  }

  const showTeleportFailed = () => {
    if (!appStore.notifyTransaction) {
      return false
    }
    return appStore.notifyTransaction.type === 'TELEPORT' && appStore.notifyTransaction.status === 'FAILED'
  }

  if (!appStore.walletProvider.web3Provider) {
    return <></>
  }

  return (
    <div className="text-black">
      <></>
      {/* <div className="flex flex-col gap-4">
        {appStore.pendingTransactions.map((tx) => (
          <PendingTransaction key={tx.hash} tx={tx}></PendingTransaction>
        ))}
      </div> */}

      <WaitingForConfirmationPopup handleClose={() => appStore.setNotifyTransaction(null)} show={showTeleportWaiting()} addTokenOption={false}>
        <div className="text-[14px] text-damlabelgray">
          <span>Teleporting d2O takes on average </span>
          <span className="text-damyellow font-bold">15 min.</span>
        </div>
      </WaitingForConfirmationPopup>

      <TransactionInProgressPopup
        handleClose={() => appStore.setNotifyTransaction(null)}
        show={showTeleportRequesting()}
        message="Step 1/3: Requesting teleport on origin network!"
        imgName="teleport-progress.svg"
        txLink={utils.getTxLink(appStore.selectedNetwork!, appStore.notifyTransaction! && appStore.notifyTransaction.hash)}
        txLinkMsg={true}
      ></TransactionInProgressPopup>

      <TransactionInProgressPopup
        handleClose={() => {
          appStore.setNotifyTransaction(null)
          setShowDevSwitch(true)
        }}
        show={showTeleportInflight()}
        message="Step 2/3: Teleportation in flight between origin and destination! ETA is 15 minutes."
        txLink={appStore.notifyTransaction?.lzScan || ''}
        imgName="teleport-progress.svg"
      >
        {isDev && showDevSwitch && (
          <div className="flex flex-col gap-2 pt-4">
            <div className="text-md text-damlabelgray">
              <span>Switch network </span>
              <span className="font-bold text-damyellow">now </span>
              <span>to track teleportation.</span>
            </div>
            <button
              onClick={async () => {
                await appStore.switchNetwork(appStore.notifyTransaction?.to?.chainId!)
                setShowDevSwitch(false)
              }}
              className="flex items-center justify-center gap-2 rounded-full py-3 px-6 mx-auto bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
            >
              <span>Switch Network</span>
            </button>
          </div>
        )}
        {!showDevSwitch && (
          <div className="pt-4 text-sm text-damlabelgray">
            <span>Please reach out on </span>
            <a href="https://discord.com/invite/FqzSeEzhNS" target="_blank" rel="noreferrer">
              <span style={{ textDecoration: 'underline' }}>Discord</span>
            </a>
            <span> with any issues.</span>
          </div>
        )}
      </TransactionInProgressPopup>

      <TransactionCompletedPopup
        handleClose={() => appStore.setNotifyTransaction(null)}
        show={showTeleportComplete()}
        imgName="teleport-completed.svg"
        message="Step 3/3: Teleport successful!"
      >
        {!isDev && (
          <div className="flex flex-col gap-6">
            <div className="text-md text-damlabelgray">
              <span>Switch network to use your d2O.</span>
            </div>
            <button
              onClick={() => {
                appStore.switchNetwork(appStore.notifyTransaction?.to?.chainId!)
              }}
              className="flex items-center justify-center gap-2 rounded-full py-3 px-6 mx-auto bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
            >
              <span>Switch Network</span>
            </button>
          </div>
        )}
      </TransactionCompletedPopup>

      <TransactionFailedPopup
        handleClose={() => appStore.setNotifyTransaction(null)}
        imgName="teleport-failed.svg"
        show={showTeleportFailed()}
        txLink={''} // TODO txlink
      ></TransactionFailedPopup>
    </div>
  )
}

export default PendingTransactionsEngine
