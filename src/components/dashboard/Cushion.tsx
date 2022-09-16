import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { IPortfolio } from '../../features/dashboard'

const Cushion: FC<Partial<IPortfolio>> = (props) => {
  const isDisabled = !props.hasOwnProperty('cushion')

  return (
    <div className="flex flex-col bg-damgray rounded-xl overflow-hidden" style={{ opacity: isDisabled ? '0.2' : '1' }}>
      <div className="flex flex-col p-6 gap-2 pb-16">
        <div className="text-damlabelgray">Cushion</div>
        {isDisabled ? (
          <div className="text-3xl">N/A</div>
        ) : (
          <>
            <div className="text-3xl text-orange-300">{props.cushion}%</div>
            <div className="text-xs text-orange-300">High Risk of Liquidation</div>
          </>
        )}
      </div>
      <NavLink className="mt-auto" to="/manage/repay">
        <button className="bg-damtranspgray rounded-none w-full text-damyellow font-light py-3">Repay Now</button>
      </NavLink>
    </div>
  )
}

export default Cushion
