import { utils as ethersUtils } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { burnFee, estimateForBurnFee, supportedNetworks, supportedTokens } from '../../constants/config'
import { IPendingTransaction } from '../../constants/IPendingTransaction'
import { ITxState } from '../../constants/ITxState'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'
import InfoPopupWithNetwork from '../wallet/InfoPopup'
import TransactionCompletedPopup from '../wallet/TransactionCompletedPopup'
import TransactionFailedPopup from '../wallet/TransactionFailedPopup'
import TransactionInProgressPopup from '../wallet/TransactionInProgressPopup'
import WaitingForConfirmationPopup from '../wallet/WaitingForConfirmationPopup'
import SwaperBalance from './SwaperBalance'
import SwapperBalanceWithFees from './SwaperBalanceWithFees'
import SwaperInput from './SwaperInput'
import SwaperInputList, { Coin } from './SwaperInputList'

// interface DDPrimeProps {}
type ApproveButtonState = 'ShowApprove' | 'HideApprove' | 'loading'

const Swaper: FC = () => {
  const appStore = useAppStore()
  const dPrimeBalance = appStore.balances.dPrime
  const usdcBalance = appStore.balances.usdc
  const [stableCoins] = useState<Coin[]>([
    {
      name: 'USDC',
      balancesMapper: 'usdc',
      tokenJoin: 'usdcJoin',
      tokenPSM: 'usdcPSM',
      icon: utils.getImageSrc('usdc.svg'),
      balance: usdcBalance,
      decimals: 6,
      symbol: 'usdc'
    }
  ])

  const [firstCoin, setFirstCoin] = useState('0')
  const [secondCoin, setSecondCoin] = useState('0')
  const [selectedStableCoin, setSelectedStableCoin] = useState(stableCoins[0])
  const [isInverted, setIsInverted] = useState(false)
  const [gasPrice, setGasPrice] = useState('')
  const [approveButtonState, setApproveButtonState] = useState<ApproveButtonState>('loading')
  const [txState, setTxState] = useState<ITxState>()
  const [txLink, setTxLink] = useState('')
  const [hideUnsupported, setHideUnsupported] = useState(false)
  const swapLabel: string = isInverted ? 'Burn d2O' : 'Mint d2O'
  const isMint = !isInverted

  const isNetworkUnsupported = () => {
    const isSupported = supportedNetworks.findIndex((network) => network.chainId === appStore.selectedNetwork?.chainId) > -1
    return isSupported && !appStore.selectedNetwork?.capabilities.canSwap
  }

  const checkNeedsApprove = async () => {
    try {
      if (!appStore.selectedNetwork || !appStore.walletProvider.connected) {
        return
      }

      if (isInverted) {
        const requiresApproval = await appStore.tokenRequiresApproval('dPrime', selectedStableCoin.tokenPSM as any, secondCoin, supportedTokens.dPrime.units)
        setApproveButtonState(requiresApproval ? 'ShowApprove' : 'HideApprove')
      } else {
        const requiresApproval = await appStore.tokenRequiresApproval(
          selectedStableCoin.balancesMapper,
          selectedStableCoin.tokenJoin,
          firstCoin,
          selectedStableCoin.decimals
        )
        setApproveButtonState(requiresApproval ? 'ShowApprove' : 'HideApprove')
      }
    } catch (err: any) {
      if (err.message === 'Contracts not set') {
        // empty
      } else {
        throw err
      }
    }
  }

  const approve = async () => {
    let txUpdate: IPendingTransaction | undefined
    try {
      const pendingTransaction: IPendingTransaction = {
        hash: '',
        status: 'INFLIGHT',
        type: 'APPROVE',
        startedAt: new Date()
      }
      const dPrimeDetails = {
        amount: '',
        token: supportedTokens.dPrime.symbol,
        networkImg: appStore.selectedNetwork!.iconName,
        network: appStore.selectedNetwork!.name,
        chainId: appStore.selectedNetwork!.chainId
      }
      const stableDetails = {
        amount: '',
        token: selectedStableCoin.symbol,
        networkImg: appStore.selectedNetwork!.iconName,
        network: appStore.selectedNetwork!.name,
        chainId: appStore.selectedNetwork!.chainId
      }

      setTxState('waiting')
      let tx
      if (isInverted) {
        tx = await appStore.approveToken('dPrime', selectedStableCoin.tokenPSM as any)
        pendingTransaction.from = dPrimeDetails
        pendingTransaction.to = stableDetails
      } else {
        tx = await appStore.approveToken(selectedStableCoin.balancesMapper, selectedStableCoin.tokenJoin)
        pendingTransaction.from = stableDetails
        pendingTransaction.to = dPrimeDetails
      }

      const link = utils.getTxLink(appStore.selectedNetwork!, tx.hash!)
      setTxLink(link)
      setTxState('inprogress')
      pendingTransaction.hash = tx.hash
      pendingTransaction.link = link
      appStore.setPendingTransactions([...appStore.pendingTransactions, pendingTransaction])
      await tx.wait()
      txUpdate = { ...pendingTransaction }
      txUpdate.status = 'DELIVERED'
      setTxState('approveCompleted')
    } catch (err: any) {
      setTxState('failed')
      if (!!txUpdate) {
        txUpdate!.status = 'FAILED'
      }
      if (err.code === 4001) {
        // alert('User rejected approve process')
      }
      console.error(err)
    } finally {
      if (txUpdate) {
        const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== txUpdate!.hash)
        appStore.setPendingTransactions([...txs, txUpdate!])
      }
    }
  }

  const swap = async (amount: string) => {
    let txUpdate: IPendingTransaction | undefined
    try {
      let swapCall

      const pendingTransaction: IPendingTransaction = {
        hash: '',
        status: 'INFLIGHT',
        type: 'SWAP',
        startedAt: new Date()
      }
      const dPrimeDetails = {
        amount: amount,
        token: supportedTokens.dPrime.symbol,
        networkImg: appStore.selectedNetwork!.iconName,
        network: appStore.selectedNetwork!.name,
        chainId: appStore.selectedNetwork!.chainId
      }
      const stableDetails = {
        amount: amount,
        token: selectedStableCoin.symbol,
        networkImg: appStore.selectedNetwork!.iconName,
        network: appStore.selectedNetwork!.name,
        chainId: appStore.selectedNetwork!.chainId
      }

      if (isMint) {
        swapCall = appStore.swapStableToDPrime(selectedStableCoin.symbol, selectedStableCoin.tokenPSM, amount)
        pendingTransaction.from = stableDetails
        pendingTransaction.to = dPrimeDetails
      } else {
        swapCall = appStore.swapDPrimeToStable(selectedStableCoin.symbol, selectedStableCoin.tokenPSM, amount)
        pendingTransaction.from = dPrimeDetails
        pendingTransaction.to = stableDetails
      }

      setTxState('waiting')
      const tx = await swapCall

      const link = utils.getTxLink(appStore.selectedNetwork!, tx.hash!)
      pendingTransaction.hash = tx.hash
      pendingTransaction.link = link
      setTxLink(link)
      appStore.setPendingTransactions([...appStore.pendingTransactions, pendingTransaction])
      setTxState('inprogress')

      txUpdate = { ...pendingTransaction }
      await tx.wait()
      txUpdate.status = 'DELIVERED'
      appStore.updateBalances()
      setTxState(isMint ? 'mintCompleted' : 'burnCompleted')
    } catch (err) {
      setTxState('failed')
      if (txUpdate) {
        txUpdate!.status = 'FAILED'
      }
      console.error(err)
    } finally {
      if (txUpdate) {
        const txs = appStore.pendingTransactions.filter((tx) => tx.hash !== txUpdate!.hash)
        // appStore.pushHistoryTransaction(txUpdate)
        appStore.setPendingTransactions([...txs, txUpdate])
      }
    }
  }

  const isBelowZero = () => {
    return Number(firstCoin) <= 0
  }

  const getMaxDecimals = () => {
    return Math.min(supportedTokens.dPrime.units, selectedStableCoin.decimals)
  }

  const isAboveBalance = () => {
    const balance = isInverted ? dPrimeBalance : usdcBalance
    return Number(firstCoin) > Number(balance)
  }

  let AmtLessFee = Number(firstCoin) - (estimateForBurnFee * Number(firstCoin) / 100)

  const calculateBurnFee = () => {
    return burnFee * AmtLessFee / 100
  }
  const beautifulBurnFee = () => {
    return utils.beautifyNumber(calculateBurnFee().toFixed(2))
  }

  const calculateExpectedBurnOutput = () => {
    return utils.beautifyNumber(AmtLessFee.toFixed(2))
  }

  useEffect(() => {
    const getGasPrice = async () => {
      const web3Provider = appStore.walletProvider?.web3Provider
      if (!web3Provider) {
        return
      }

      const gasPrice = await web3Provider.getGasPrice()
      const priceInGwei = ethersUtils.formatUnits(gasPrice, 'gwei')
      setGasPrice(priceInGwei.toString())
    }
    getGasPrice()
  }, [appStore.walletProvider?.web3Provider])

  checkNeedsApprove()

  const gasDetails = (
    <div className="flex flex-col gap-1 text-sm text-damlabelgray2">
      <div className="flex">
        <div>Expected Output</div>
        <div className="ml-auto">{isInverted ? `${calculateExpectedBurnOutput()} ${selectedStableCoin.name}` : `${secondCoin} d2O`}</div>
      </div>
      <div className="flex">
        <div>{isMint ? 'Mint fee' : `Burn fee (${burnFee.toFixed(2)}%)`}</div>
        <div className="ml-auto"> ~ {isInverted ? `${beautifulBurnFee()} ${selectedStableCoin.name}` : `0 d2O`}</div>
      </div>
    </div>
  )

  const updateBothInputs = (value: string) => {
    setFirstCoin(value)
    setSecondCoin(value)
  }
  return (
    <div className="flex flex-col items-center gap-4 bg-damgray rounded-2xl p-6">
      {!isInverted ? (
        <SwaperInputList
          value={firstCoin}
          coins={stableCoins}
          selectedCoin={selectedStableCoin}
          handleChange={updateBothInputs}
          maxDecimals={getMaxDecimals()}
          handleListChange={(coin) => setSelectedStableCoin(coin)}
        >
          <div className="">
            <SwaperBalance balance={appStore.balances[selectedStableCoin.balancesMapper]} rightAligned={false} decimals={2}></SwaperBalance>
          </div>
        </SwaperInputList>
      ) : (
        <SwaperInput handleChange={updateBothInputs} coin={supportedTokens.dPrime} value={secondCoin} maxDecimals={getMaxDecimals()} maxBalance={dPrimeBalance}>
          <SwaperBalance balance={dPrimeBalance} rightAligned={false} decimals={2}></SwaperBalance>
        </SwaperInput>
      )}

      <button
        onClick={() => setIsInverted(!isInverted)}
        style={{ backgroundColor: 'rgba(255, 184, 0, 0.05)' }}
        className="w-fit p-4 bg-damdarkgray rounded-full"
      >
        <img src={utils.getImageSrc('invertswap.svg')} alt="invert swap" />
      </button>

      {!isInverted ? (
        <SwaperInput
          handleChange={updateBothInputs}
          coin={supportedTokens.dPrime}
          value={secondCoin}
          disabled={true}
          maxDecimals={getMaxDecimals()}
          maxBalance={dPrimeBalance}
        >
          <SwapperBalanceWithFees available={dPrimeBalance} children={gasDetails} gasPrice={gasPrice} decimals={2}></SwapperBalanceWithFees>
        </SwaperInput>
      ) : (
        <SwaperInputList
          value={isMint ? firstCoin : AmtLessFee.toFixed(2).toString()}
          coins={stableCoins}
          selectedCoin={selectedStableCoin}
          handleChange={updateBothInputs}
          handleListChange={(coin) => setSelectedStableCoin(coin)}
          disabled={true}
          maxDecimals={getMaxDecimals()}
        >
          <div className="">
            <SwapperBalanceWithFees available={usdcBalance} children={gasDetails} gasPrice={gasPrice} decimals={2}></SwapperBalanceWithFees>
          </div>
        </SwaperInputList>
      )}

      {/* Swap / Approve */}
      <div className="flex w-full pt-4 gap-4">
        {approveButtonState === 'ShowApprove' && (
          <>
            <button
              onClick={approve}
              className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold"
            >
              <span>Approve</span>
            </button>
            <button
              disabled
              className="flex items-center w-full justify-center rounded-full py-3 px-6  bg-dambackgroundgrayed hover:bg-dambackgroundgrayedhover text-damyellow cursor-not-allowed font-bold opacity-50"
            >
              <span>{swapLabel}</span>
            </button>
          </>
        )}

        {approveButtonState === 'HideApprove' && (
          <button
            onClick={() => isMint ? swap(firstCoin) : swap(AmtLessFee.toFixed(6).toString())}
            className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isBelowZero() || isAboveBalance()}
          >
            <span>{isAboveBalance() ? 'Insuficient balance' : swapLabel}</span>
          </button>
        )}

        {approveButtonState === 'loading' && appStore.walletProvider?.connected && (
          <button
            onClick={() => isMint ? swap(firstCoin) : swap(AmtLessFee.toFixed(6).toString())}
            className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={true}
          >
            <span>{swapLabel}</span>
          </button>
        )}

        {approveButtonState === 'loading' && !appStore.walletProvider?.connected && (
          <button
            onClick={appStore.connectWallet}
            className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold"
          >
            <span>Connect</span>
          </button>
        )}
      </div>

      <InfoPopupWithNetwork
        handleClose={() => setHideUnsupported(true)}
        show={isNetworkUnsupported() && !hideUnsupported}
        title="Unsupported network"
        description={`Mint and burn are only available on Ethereum at this time`}
      ></InfoPopupWithNetwork>
      <WaitingForConfirmationPopup handleClose={() => setTxState('none')} show={txState === 'waiting'}></WaitingForConfirmationPopup>
      <TransactionInProgressPopup handleClose={() => setTxState('none')} show={txState === 'inprogress'} txLink={txLink}></TransactionInProgressPopup>
      <TransactionCompletedPopup
        handleClose={() => setTxState('none')}
        show={['mintCompleted', 'burnCompleted', 'approveCompleted'].includes(txState!)}
        txLink={txLink}
      >
        <></>
        {
          <div className="flex flex-col gap-2 pt-6">
            {txState === 'mintCompleted' && (
              <>
                <div className="text-md text-damlabelgray">
                  <span>Do you want to teleport your d2o to a different network?</span>
                </div>

                <NavLink to="/teleport">
                  <button className="flex items-center justify-center gap-2 rounded-full py-3 px-6 mx-auto bg-damyellow text-damgray hover:bg-yellow-200 font-bold">
                    <span>Teleport</span>
                  </button>
                </NavLink>
              </>
            )}
            {txState === 'burnCompleted' && (
              <button
                onClick={() => setTxState('none')}
                className="flex items-center justify-center gap-2 rounded-full py-3 px-6 mx-auto bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
              >
                <span>Done</span>
              </button>
            )}
          </div>
        }
        {txState === 'approveCompleted' && (
          <button
            onClick={() => setTxState('none')}
            className="flex items-center justify-center gap-2 rounded-full py-3 px-6 mt-4 mx-auto bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
          >
            <span>Done</span>
          </button>
        )}
      </TransactionCompletedPopup>
      <TransactionFailedPopup handleClose={() => setTxState('none')} show={txState === 'failed'} txLink={txLink}></TransactionFailedPopup>
    </div>
  )
}

export default Swaper
