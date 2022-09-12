import { FC } from 'react'
import utils from '../../constants/utils'
import Disclaimer from '../Disclaimer'

// interface DDPrimeProps {}

const Teleport: FC = () => {
  return (
    <div className="lg:px-96 px-12 py-24">
      <Disclaimer infoTxt="Teleport dPrime from one blockchain to another" actionTxt="Learn More"></Disclaimer>
      <div></div>
    </div>
  )
}

export default Teleport
