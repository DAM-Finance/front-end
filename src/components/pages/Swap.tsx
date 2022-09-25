import { FC } from 'react'
import Disclaimer from '../Disclaimer'
import Swaper from '../swap/Swaper'

// interface DDPrimeProps {}

const Swap: FC = () => {
  return (
    <div className="flex p-4 w-full justify-center py-24">
      <div className="flex flex-col max-w-7xl gap-6">
        <Disclaimer infoTxt="Swap existing stablecoins directly for dPrime at a 1:1 rate, rather than borrowing dPrime." actionTxt="Learn More"></Disclaimer>
        <Swaper></Swaper>
      </div>
    </div>
  )
}

export default Swap
