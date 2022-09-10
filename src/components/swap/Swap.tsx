import { FC } from 'react'
import utils from '../../constants/utils'
import Disclaimer from './Disclaimer'

// interface DDPrimeProps {}

const Swap: FC = () => {
  const xUrl = utils.getImageSrc('x.svg')
  return (
    <div className="px-96 py-24">
      <Disclaimer></Disclaimer>
      <div></div>
    </div>
  )
}

export default Swap
