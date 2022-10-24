import { utils as ethersUtils } from 'ethers'
import { FC, useState, useEffect } from 'react'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'
import SwaperBalance from './SwaperBalance'
import SwaperInput from './SwaperInput'
import SwaperInputList, { Coin } from './SwaperInputList'
import SwapperBalanceWithFees from './SwaperBalanceWithFees'
import WaitingForConfirmationPopup from '../wallet/WaitingForConfirmationPopup'
import TransactionInProgressPopup from '../wallet/TransactionInProgressPopup'
import TransactionCompletedPopup from '../wallet/TransactionCompletedPopup'
import TransactionFailedPopup from '../wallet/TransactionFailedPopup'

// interface DDPrimeProps {}
type ApproveButtonState = 'ShowApprove' | 'HideApprove' | 'loading'
type ITxState = 'none' | 'waiting' | 'inprogress' | 'completed' | 'failed'

const Swaper: FC = () => {
  const appStore = useAppStore()
  const dPrimeBalance = appStore.balances.dPrime
  const usdcBalance = appStore.balances.usdc
  const [stableCoins] = useState<Coin[]>([
    { name: 'USDC', balancesMapper: 'usdc', tokenJoin: 'usdcJoin', icon: utils.getImageSrc('usdc.svg'), balance: usdcBalance }
    // { name: 'DAI', balancesMapper: 'usdc', icon: utils.getImageSrc('DAI.svg'), balance: '0.0' }
  ])

  const [firstCoin, setFirstCoin] = useState('0')
  const [secondCoin, setSecondCoin] = useState('0')
  const [selectedStableCoin, setSelectedStableCoin] = useState(stableCoins[0])
  const [isInverted, setIsInverted] = useState(false)
  const [gasPrice, setGasPrice] = useState('')
  const [approveButtonState, setApproveButtonState] = useState<ApproveButtonState>('loading')
  const [txState, setTxState] = useState<ITxState>()

  const checkNeedsApprove = async () => {
    try {
      if (!appStore.selectedNetwork || !appStore.walletProvider.connected) {
        return
      }

      if (isInverted) {
        const requiresApproval = await appStore.tokenRequiresApproval('dPrime', 'dPrimeJoin')
        setApproveButtonState(requiresApproval ? 'ShowApprove' : 'HideApprove')
      } else {
        const requiresApproval = await appStore.tokenRequiresApproval(selectedStableCoin.balancesMapper, selectedStableCoin.tokenJoin)
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
    try {
      if (isInverted) {
        setTxState('waiting')
        await appStore.approveToken(selectedStableCoin.balancesMapper, 'dPrimeJoin')
        setTxState('none')
        // & REFRESH
      } else {
        setTxState('waiting')
        await appStore.approveToken(selectedStableCoin.balancesMapper, selectedStableCoin.tokenJoin)
        setTxState('none')
        // & REFRESH
      }
    } catch (err: any) {
      setTxState('failed')
      if (err.code === 4001) {
        // alert('User rejected approve process')
      }
      console.error(err)
    }
  }

  const swapIt = async (amount: string) => {
    try {
      let swapCall

      if (!isInverted) {
        swapCall = appStore.swapStableToDPrime('usdc', 'usdcPSM', amount)
      } else if (isInverted) {
        swapCall = appStore.swapDPrimeToStable('usdc', 'usdcPSM', amount)
      }

      setTxState('waiting')
      const tx = await swapCall
      setTxState('inprogress')
      await tx.wait()
      setTxState('completed')
      appStore.updateBalances()
    } catch (err) {
      setTxState('failed')
    }
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

  // TODO: Fix this
  const gasDetails = (
    <div className="flex flex-col gap-1 text-sm text-damlabelgray2">
      <div className="flex">
        <div>Expected Output</div>
        <div className="ml-auto">
          {isInverted ? firstCoin : secondCoin} {true ? 'dPRIME' : selectedStableCoin.name}
        </div>
      </div>
      <div className="flex">
        <div>Teleport Fee</div>
        <div className="ml-auto">0 {true ? 'dPRIME' : selectedStableCoin.name}</div>
      </div>
      <div className="flex">
        <div>Gas fee</div>
        <div className="ml-auto">$0</div>
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
          handleListChange={(coin) => setSelectedStableCoin(coin)}
        >
          <div className="">
            <SwaperBalance balance={appStore.balances[selectedStableCoin.balancesMapper]} coinName={selectedStableCoin.name}></SwaperBalance>
          </div>
        </SwaperInputList>
      ) : (
        <SwaperInput handleChange={updateBothInputs} coin={'dPRIME'} value={secondCoin}>
          <SwaperBalance balance={dPrimeBalance} coinName={'dPRIME'}></SwaperBalance>
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
        <SwaperInput handleChange={updateBothInputs} coin={'dPRIME'} value={secondCoin} disabled={true}>
          <SwapperBalanceWithFees available={dPrimeBalance} children={gasDetails} gasPrice={gasPrice}></SwapperBalanceWithFees>
        </SwaperInput>
      ) : (
        <SwaperInputList
          value={firstCoin}
          coins={stableCoins}
          selectedCoin={selectedStableCoin}
          handleChange={updateBothInputs}
          handleListChange={(coin) => setSelectedStableCoin(coin)}
          disabled={true}
        >
          <div className="">
            <SwapperBalanceWithFees available={usdcBalance} children={gasDetails} gasPrice={gasPrice}></SwapperBalanceWithFees>
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
              <span>Swap</span>
            </button>
          </>
        )}

        {approveButtonState === 'HideApprove' && (
          <button
            onClick={() => swapIt(firstCoin)}
            className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold"
          >
            <span>Swap</span>
          </button>
        )}

        {approveButtonState === 'loading' && appStore.walletProvider?.connected && <div></div>}

        {approveButtonState === 'loading' && !appStore.walletProvider?.connected && (
          <button
            onClick={() => swapIt(firstCoin)}
            className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold"
          >
            <span>Connect</span>
          </button>
        )}
      </div>
      <TransactionInProgressPopup handleClose={() => setTxState('none')} show={txState === 'inprogress'}></TransactionInProgressPopup>
      <TransactionCompletedPopup handleClose={() => setTxState('none')} show={txState === 'completed'}></TransactionCompletedPopup>
      <TransactionFailedPopup handleClose={() => setTxState('none')} show={txState === 'failed'}></TransactionFailedPopup>
      <WaitingForConfirmationPopup handleClose={() => setTxState('none')} show={txState === 'waiting'}></WaitingForConfirmationPopup>
    </div>
  )
}

export default Swaper

// const generateComponent = (isFirstInput = true) => {
//   const isSecondCoin = (!isFirstInput && !isInverted) || (isFirstInput && isInverted)

//   const gasDetails = (
//     <div className="flex flex-col gap-1 text-sm text-damlabelgray2">
//       <div className="flex">
//         <div>Expected Output</div>
//         <div className="ml-auto">
//           {isInverted ? firstCoin : secondCoin} {isSecondCoin ? 'dPRIME' : selectedStableCoin.name}
//         </div>
//       </div>
//       <div className="flex">
//         <div>Teleport Fee</div>
//         <div className="ml-auto">0 {isSecondCoin ? 'dPRIME' : selectedStableCoin.name}</div>
//       </div>
//       <div className="flex">
//         <div>Gas fee</div>
//         <div className="ml-auto">$0</div>
//       </div>
//     </div>
//   )

//   let balanceComponent = (
//     <SwaperBalance balance={isSecondCoin ? dPrimeBalance : usdcBalance} coinName={isSecondCoin ? 'dPRIME' : selectedStableCoin.name}></SwaperBalance>
//   )
//   if (!isFirstInput) {
//     balanceComponent = (
//       <SwapperBalanceWithFees available={isSecondCoin ? dPrimeBalance : usdcBalance} children={gasDetails} gasPrice={gasPrice}></SwapperBalanceWithFees>
//     )
//   }

//   const updateBothInputs = (value: string) => {
//     setFirstCoin(value)
//     setSecondCoin(value)
//   }

//   let component = (
//     <SwaperInputList
//       value={firstCoin}
//       coins={stableCoins}
//       selectedCoin={selectedStableCoin}
//       handleChange={updateBothInputs}
//       handleListChange={(coin) => setSelectedStableCoin(coin)}
//     >
//       <div className="">{balanceComponent}</div>
//     </SwaperInputList>
//   )
//   if (isSecondCoin) {
//     component = (
//       <SwaperInput handleChange={updateBothInputs} coin={'dPRIME'} value={secondCoin}>
//         {balanceComponent}
//       </SwaperInput>
//     )
//   }

//   return component
// }

// const swaperFirstElement = generateComponent(true)
// const swaperSecondElement = generateComponent(false)
