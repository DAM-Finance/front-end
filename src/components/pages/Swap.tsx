import { FC } from 'react'
import utils from '../../constants/utils'
import Progress from '../common/Progress/Progress'
import Disclaimer from '../Disclaimer'

// interface DDPrimeProps {}

const Swap: FC = () => {
  return (
    <div className="lg:px-96 px-12 py-24">
      <Disclaimer infoTxt="Swap directly dor dPrime at a 1:1 rate, rather than borrowing dPrime." actionTxt="Learn More"></Disclaimer>
      <div></div>
    </div>
  )
}

export default Swap
