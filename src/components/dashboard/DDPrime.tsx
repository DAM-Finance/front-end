import { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import utils from '../../constants/utils'
import { NavLink } from 'react-router-dom'

// interface DDPrimeProps {}

const DDPrime: FC = () => {
  return (
    <div
      className="flex rounded-xl p-8 py-8 overflow-hidden"
      style={{
        background: `url(${utils.getImageSrc('ddprimeback.png')}), linear-gradient(124.57deg, #4B2BA5 -118.12%, #1F212C 57.01%)`,
        backgroundSize: 'cover'
      }}
    >
      <div>
        <div className="text-2xl text-white">
          <span>Meet the dPRIME </span>
          <span className="font-bold">Reservoir</span>
        </div>
        <div className="text-damlabellightgray text-sm">Teleport dPRIME from a blockchain to another</div>
      </div>
      <NavLink to="/teleport" className="ml-auto flex justify-center font-bold">
        <button className="flex items-center gap-2 rounded-full py-1 px-6 bg-dambackgroundgrayed bg-opacity-5 text-damyellow hover:bg-opacity-10">
          <span>Teleport dPRIME</span>
          <ArrowRightIcon className="h-5 w-5 text-damyellow"></ArrowRightIcon>
        </button>
      </NavLink>
    </div>
  )
}

export default DDPrime
