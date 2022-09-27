import { utils as ethersUtils } from 'ethers'
import { FC, useState, useEffect } from 'react'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'
import SwaperBalance from './SwaperBalance'
import SwaperInput from './SwaperInput'
import SwaperInputList from './SwaperInputList'
import SwapperBalanceWithFees from './SwaperBalanceWithFees'

// interface DDPrimeProps {}

const Swaper: FC = () => {
  const appStore = useAppStore()
  const dPrimeBalance = appStore.balances.dPrime
  const usdcBalance = appStore.balances.usdc

  const [stableCoins] = useState([
    { name: 'USDC', icon: utils.getImageSrc('usdc.svg'), balance: usdcBalance },
    { name: 'DAI', icon: utils.getImageSrc('DAI.svg'), balance: '0.0' }
  ])

  const [firstCoin, setFirstCoin] = useState('0')
  const [secondCoin, setSecondCoin] = useState('0')
  const [selectedStableCoin, setSelectedStableCoin] = useState(stableCoins[0])
  const [isInverted, setIsInverted] = useState(false)
  const [gasPrice, setGasPrice] = useState('')

  function swapIt(amount: string) {
    //Change to make this accept multiple types when more PSM are deployed
    appStore.stableSwap(amount)
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

  const generateComponent = (isFirstInput = true) => {
    const isSecondCoin = (!isFirstInput && !isInverted) || (isFirstInput && isInverted)

    const gasDetails = (
      <div className="flex flex-col gap-1 text-sm text-damlabelgray2">
        <div className="flex">
          <div>Expected Output</div>
          <div className="ml-auto">
            {isInverted ? firstCoin : secondCoin} {isSecondCoin ? 'dPRIME' : selectedStableCoin.name}
          </div>
        </div>
        <div className="flex">
          <div>Teleport Fee</div>
          <div className="ml-auto">0 {isSecondCoin ? 'dPRIME' : selectedStableCoin.name}</div>
        </div>
        <div className="flex">
          <div>Gas fee</div>
          <div className="ml-auto">$0</div>
        </div>
      </div>
    )

    let balanceComponent = (
      <SwaperBalance balance={isSecondCoin ? dPrimeBalance : usdcBalance} coinName={isSecondCoin ? 'dPRIME' : selectedStableCoin.name}></SwaperBalance>
    )
    if (!isFirstInput) {
      balanceComponent = (
        <SwapperBalanceWithFees available={isSecondCoin ? dPrimeBalance : usdcBalance} children={gasDetails} gasPrice={gasPrice}></SwapperBalanceWithFees>
      )
    }

    const updateBothInputs = (value: string) => {
      setFirstCoin(value)
      setSecondCoin(value)
    }

    let component = (
      <SwaperInputList
        value={firstCoin}
        coins={stableCoins}
        selectedCoin={selectedStableCoin}
        handleChange={updateBothInputs}
        handleListChange={(coin) => setSelectedStableCoin(coin)}
      >
        <div className="">{balanceComponent}</div>
      </SwaperInputList>
    )
    if (isSecondCoin) {
      component = (
        <SwaperInput handleChange={updateBothInputs} coin={'dPRIME'} value={secondCoin}>
          {balanceComponent}
        </SwaperInput>
      )
    }

    return component
  }

  const swaperFirstElement = generateComponent(true)
  const swaperSecondElement = generateComponent(false)
  return (
    <div className="flex flex-col items-center gap-4 bg-damgray rounded-2xl p-6">
      {swaperFirstElement}
      <button
        onClick={() => setIsInverted(!isInverted)}
        style={{ backgroundColor: 'rgba(255, 184, 0, 0.05)' }}
        className="w-fit p-4 bg-damdarkgray rounded-full"
      >
        <img src={utils.getImageSrc('invertswap.svg')} alt="invert swap" />
      </button>
      {swaperSecondElement}
      <button
        onClick={() => swapIt(firstCoin)}
        className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold"
      >
        <span>Swap</span>
      </button>
      <div className="text-damlightyellow text-sm font-light">
        Note: If the stablecoin lacks approval, two pop ups will appear, the first one asking for approval, and the second making the swap
      </div>
    </div>
  )
}

export default Swaper
