import { FC } from 'react'
import Cushion from '../dashboard/Cushion'
import DDPrime from '../dashboard/DDPrime'
import DPrime from '../dashboard/DPrime'
import Portfolio from '../dashboard/Portfolio'

const Home: FC = () => {
  return (
    <div className="w-full h-full flex flex-col p-28  text-white gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <Portfolio></Portfolio>
        </div>
        <div className="grid grid-rows-2 flex-col gap-4">
          <DPrime></DPrime>
          <Cushion></Cushion>
        </div>
      </div>
      <DDPrime />
    </div>
  )
}

export default Home
