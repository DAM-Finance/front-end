import React, { FC, useContext } from 'react'
import Cushion from '../dashboard/Cushion'
import DDPrime from '../dashboard/DDPrime'
import DPrime from '../dashboard/DPrime'
import Portfolio from '../dashboard/Portfolio'
import { StateContext } from '../common/State/State'

const Home: FC = () => {
  const { portfolio } = useContext(StateContext)

  return (
    <div className="w-full h-full flex flex-col p-24  text-white gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <Portfolio {...portfolio}></Portfolio>
        </div>
        <div className="grid grid-rows-2 flex-col gap-4">
          <DPrime {...portfolio}></DPrime>
          <Cushion {...portfolio}></Cushion>
        </div>
      </div>
      <DDPrime />
    </div>
  )
}

export default Home
