import { FC } from 'react'
import Disclaimer from '../Disclaimer'
import Swaper from '../swap/Swaper'

// interface DDPrimeProps {}

const Swap: FC = () => {
  return (
    <div className="flex p-4 w-full justify-center lg:py-24 py-12 max-w-full">
      <div className="flex flex-col max-w-full gap-6">
        <Disclaimer
          infoTxt={['Mint and burn d2o with existing stablecoins at a 1:1 ratio.', 'Mint and burn are only available on Ethereum at this time.']}
          // actionTxt="Learn More"
        ></Disclaimer>
        <Swaper></Swaper>
      </div>
    </div>
  )
}

export default Swap
