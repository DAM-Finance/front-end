import { FC, useState } from 'react'
import utils from '../../constants/utils'
import { INetwork } from '../../features/Network'
import AvailableInput from '../AvailableInput'
import Disclaimer from '../Disclaimer'
import SelectNetwork from '../SelectNetwork'

// interface DDPrimeProps {}

const Teleport: FC = () => {
  const [amount, setAmount] = useState('0')
  const [available] = useState('1020')
  const [networks] = useState<INetwork[]>([
    { name: 'Ethereum', symbol: 'eth' },
    { name: 'Moonbeam', symbol: 'glmr' }
  ])
  const [originNetwork, setOriginNetwork] = useState(networks[0])
  const [destinationNetwork, setDestinationNetwork] = useState(networks[1])

  return (
    <div className="flex p-4 w-full justify-center py-24">
      <div className="flex flex-col max-w-7xl gap-6">
        <Disclaimer infoTxt="Teleport dPrime from one blockchain to another" actionTxt="Learn More"></Disclaimer>
        <div
          className="flex flex-col gap-8 rounded-2xl p-6 text-gray-500"
          style={{ background: 'linear-gradient(124.57deg, #4B2BA5 -118.12%, #1F212C 57.01%)' }}
        >
          <div className="flex flex-col gap-2">
            <div>1. Select Network</div>
            <div className="flex gap-4">
              <SelectNetwork networks={networks} selectedNetwork={originNetwork} handleChange={(network) => setOriginNetwork(network)}></SelectNetwork>
              <img src={utils.getImageSrc('right-arrow.svg')} alt="" />
              <SelectNetwork
                networks={networks}
                selectedNetwork={destinationNetwork}
                handleChange={(network) => setDestinationNetwork(network)}
              ></SelectNetwork>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>2. Select the amount of dPRIME to teleport</div>
            <AvailableInput amount={amount} available={available} handleChange={(value) => setAmount(value)}></AvailableInput>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="flex items-center w-full justify-center gap-2 rounded-full py-4 px-6 text-black font-bold"
              style={{ background: 'linear-gradient(90deg, #7742CD 5.88%, #F1DD79 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
            >
              <img src={utils.getImageSrc('teleport.svg')} alt="teleport" />
              Teleport
            </button>
            <div className="flex justify-center items-center gap-2">
              <img src={utils.getImageSrc('warning.svg')} alt="" />
              <div className="text-damlightyellow text-xs font-light">Make sure you have enough gas on the destination chain.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teleport
