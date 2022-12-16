import { FC } from 'react'
import Disclaimer from '../Disclaimer'
import Swaper from '../swap/Swaper'

// interface DDPrimeProps {}

const Swap: FC = () => {
  return (
    <div className="flex p-4 w-full justify-center py-24">
      <div className="flex flex-col max-w-7xl gap-6">
        <Disclaimer
          infoTxt={['Mint and burn d2O with existing stablecoins at a 1:1 ratio.', 'Mint and burn are only available on Goerli at this time.']}
          // actionTxt="Learn More"
        ></Disclaimer>
        <Swaper></Swaper>
      </div>
    </div>
  )
}

export default Swap
