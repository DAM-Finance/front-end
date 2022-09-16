import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import utils from '../../constants/utils'
import { IPortfolio } from '../../features/dashboard'

const DPrime: FC<Partial<IPortfolio>> = (props) => {
  const isDisabled = !props.hasOwnProperty('dPrime')

  return (
    <div className="flex flex-col bg-damgray rounded-xl overflow-hidden" style={{ opacity: isDisabled ? '0.2' : '1' }}>
      <div className="flex flex-col p-6 gap-2 relative overflow-hidden pb-16">
        <div className="text-damlabelgray">dPRIME</div>
        <div className="text-2xl">{props.dPrime || 0}</div>
        <img className="absolute top-0 right-0" width={115} src={utils.getImageSrc('dprimebg.png')} alt="dPrime background" />
      </div>
      <NavLink className="mt-auto" to="/swap">
        <button className="bg-damtranspgray rounded-none w-full text-damyellow font-light py-3">Swap for dPRIME</button>
      </NavLink>
    </div>
  )
}

export default DPrime
