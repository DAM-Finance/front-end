import { FC, useState } from 'react'
import utils from '../constants/utils'
import { useAppStore } from '../stores/appStore/appStore'
import SwaperInput from './SwaperInput'
import SwaperInputList from './SwaperInputList'

// interface DDPrimeProps {}

const Swaper: FC = () => {
  const [stableCoins] = useState([
    { name: 'USDC', icon: utils.getImageSrc('usdc.svg'), balance: '10' },
    { name: 'DAI', icon: utils.getImageSrc('DAI.svg'), balance: '30' }
  ])

  const [firstCoin, setFirstCoin] = useState('0')
  const [secondCoin, setSecondCoin] = useState('0')
  const [selectedStableCoin, setSelectedStableCoin] = useState(stableCoins[0])
  const [isInverted, setIsInverted] = useState(false)
  const appStore = useAppStore()

  let swaperFirstElement = (
    <SwaperInputList
      value={firstCoin}
      coins={stableCoins}
      selectedCoin={selectedStableCoin}
      handleChange={(value) => setFirstCoin(value)}
      handleListChange={(coin) => setSelectedStableCoin(coin)}
    ></SwaperInputList>
  )
  let swaperSecondElement = <SwaperInput handleChange={(value) => setSecondCoin(value)} coin={'dPRIME'} value={secondCoin} balance="0.0"></SwaperInput>

  if (isInverted) {
    const temp = swaperSecondElement
    swaperSecondElement = swaperFirstElement
    swaperFirstElement = temp
  }

  function swapIt(amount: string){
    //Change to make this accept multiple types when more PSM are deployed
    appStore.stableSwap(amount);
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-damgray rounded-2xl p-6">
      {swaperFirstElement}

      <button onClick={() => setIsInverted(!isInverted)} className="w-fit p-4 bg-damdarkgray rounded-full">
        <img src={utils.getImageSrc('invertswap.svg')} alt="invert swap" />
      </button>

      {swaperSecondElement}

      <button
        onClick = {() => swapIt(firstCoin)}
        className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold">
        <span>Swap</span>
      </button>
    </div>
  )
}

export default Swaper
