import { FC } from 'react'
import { IPortolio } from '../../features/dashboard'

// interface CushionProps {}

const Cushion: FC<Partial<IPortolio>> = (props) => {
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
      <button className="bg-damtranspgray rounded-none w-full mt-auto text-yellow-200 py-3">Repay Now</button>
    </div>
  )
}

export default Cushion
