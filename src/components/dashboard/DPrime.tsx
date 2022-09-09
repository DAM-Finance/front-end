import { FC } from 'react'
import utils from '../../constants/utils'
import { IPortfolio } from '../../features/dashboard'

const DPrime: FC<Partial<IPortfolio>> = (props) => {
  const dPrimeLogo = utils.getImageSrc('dprime.png')
  return (
    <div className="flex flex-col bg-damgray rounded-xl p-6 gap-1">
      {props.hasOwnProperty('dPrime') && <img height="48px" width="38px" src={dPrimeLogo} alt="dPrime" />}
      <div className="text-gray-500">dPrime</div>
      {props.hasOwnProperty('dPrime') ? <div className="text-2xl">{props.dPrime}</div> : <div className="text-2xl text-gray-500">0</div>}
    </div>
  )
}

export default DPrime
