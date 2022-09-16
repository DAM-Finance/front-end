import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { IPortfolio } from '../../features/dashboard'

// interface CushionProps {}

const Cushion: FC<Partial<IPortfolio>> = (props) => {
  return (
    <div className="flex flex-col bg-damgray rounded-xl overflow-hidden">
      <div className="p-6 gap-1">
        <div className="text-gray-500">Cushion</div>
        {props.hasOwnProperty('cushion') ? (
          <>
            <div className="text-3xl text-orange-300">21%</div>
            <div className="text-xs text-orange-300">High Risk of Liquidation</div>
          </>
        ) : (
          <div className="text-3xl text-gray-500">N/A</div>
        )}
      </div>
      <NavLink className="mt-auto" to="/manage/repay">
        <button className="bg-damtranspgray rounded-none w-full text-yellow-200 py-3">Repay Now</button>
      </NavLink>
    </div>
  )
}

export default Cushion
