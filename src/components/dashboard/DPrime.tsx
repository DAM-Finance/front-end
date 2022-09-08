import { FC } from 'react'
import utils from '../../constants/utils'

// interface DPrimeProps {}

const DPrime: FC = () => {
  const dPrimeLogo = utils.getImageSrc('dprime.png')
  return (
    <div className="flex flex-col bg-damgray rounded-xl p-6 gap-1">
      <img height="48px" width="38px" src={dPrimeLogo} alt="dPrime" />
      <div className="text-gray-500">dPRIME</div>
      <div className="text-2xl">23,000</div>
    </div>
  )
}

export default DPrime
