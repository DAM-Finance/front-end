import { FC } from 'react'
import Disclaimer from '../Disclaimer'

// interface DDPrimeProps {}

const Teleport: FC = () => {
  return (
    <div className="flex p-4 w-full justify-center py-24">
      <div className="flex flex-col max-w-7xl gap-6">
        <Disclaimer infoTxt="Teleport dPrime from one blockchain to another" actionTxt="Learn More"></Disclaimer>
        <div className="flex flex-col" style={{ background: 'linear-radient(124.57deg, #4B2BA5 -118.12%, #1F212C 57.01%' }}>
          <div>1. Select Network</div>
          <div></div>
          <div>2. Select the amount of dPRIME to teleport</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Teleport
