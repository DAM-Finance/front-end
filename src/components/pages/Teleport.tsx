import { FC, useState } from 'react'
import utils from '../../constants/utils'
import AvailableInput from '../AvailableInput'
import Disclaimer from '../Disclaimer'

// interface DDPrimeProps {}

const Teleport: FC = () => {
  const [amount, setAmount] = useState('0')
  const [available] = useState('1020')

  return (
    <div className="flex p-4 w-full justify-center py-24">
      <div className="flex flex-col max-w-7xl gap-6">
        <Disclaimer infoTxt="Teleport dPrime from one blockchain to another" actionTxt="Learn More"></Disclaimer>
        <div
          className="flex flex-col gap-3 rounded-2xl p-6 text-gray-500"
          style={{ background: 'linear-gradient(124.57deg, #4B2BA5 -118.12%, #1F212C 57.01%)' }}
        >
          <div>1. Select Network</div>
          <div className="flex gap-4">
            <img height={160} src={utils.getImageSrc('ethnet.png')} alt="" />
            <img src={utils.getImageSrc('right-arrow.svg')} alt="" />
            <img height={160} src={utils.getImageSrc('moonbeamnet.png')} alt="" />
          </div>
          <div>2. Select the amount of dPRIME to teleport</div>
          <AvailableInput amount={amount} available={available} handleChange={(value) => setAmount(value)}></AvailableInput>
          <button
            className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6 text-black font-bold"
            style={{ background: 'linear-gradient(90deg, #7742CD 5.88%, #F1DD79 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
          >
            Teleport
          </button>
        </div>
      </div>
    </div>
  )
}

export default Teleport
