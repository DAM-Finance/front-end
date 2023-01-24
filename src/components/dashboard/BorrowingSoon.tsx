import { FC } from 'react'
import utils from '../../constants/utils'

import { NavLink } from 'react-router-dom'

const BorrowingSoon: FC = () => {
  return (
    <div
      className="bg-damgray rounded-xl"
      style={{
        background: 'linear-gradient(124.57deg, rgba(75, 43, 165, 0.3) -118.12%, rgba(31,33,44, 0.3) 57.01%)'
        // backgroundImage: `url(${utils.getImageSrc('borrowing-soon.png')})`
      }}
    >
      <div
        className="flex w-full h-full flex-col justify-center pl-6 rounded-xl"
        style={{
          background: `url(${utils.getImageSrc('borrowing-soon.png')})`
        }}
      >
        <div className="text-lg">
          <span>Earn yield on your </span>
          <span className="font-bold">d2o </span>
        </div>
        <div className="text-damlabelgray3 text-m font-light">
          <span>Provide native liquidity with USDT on </span>
          <a href="https://curve.fi/#/moonbeam/pools/factory-v2-18/deposit" rel="noreferrer">
            <button className="font-bold"> Moonbeam</button>
          </a>
          </div>
      </div>
    </div>
  )
}

export default BorrowingSoon
