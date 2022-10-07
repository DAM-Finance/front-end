import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import utils from '../../constants/utils'

const TVLButton: FC = () => {
  return (
    <NavLink to="/analytics">
      <div className="flex items-center px-4 py-2 gap-2 rounded-full bg-dambackgroundgrayed text-white">
        <div>Stats</div>
        <img className="pb-1" src={utils.getImageSrc('link-external.svg')} alt="wallet" />
      </div>
    </NavLink>
  )
}

export default TVLButton
