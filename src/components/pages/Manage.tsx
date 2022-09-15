import { FC, useState } from 'react'
import utils from '../../constants/utils'
import AvailableInput from '../AvailableInput'
// import Progress from '../common/Progress/Progress'

// interface DDPrimeProps {}

const Manage: FC = () => {
  const borrowIcon = utils.getImageSrc('borrow-icon.svg')
  const [amount, setAmount] = useState('0')
  const [available] = useState('1030')

  return (
    <div className="flex p-4 w-full justify-center py-24 ">
      <div className="flex flex-col bg-damgray rounded-2xl max-w-7xl gap-6 p-6">
        <div className="text-gray-400">Total dPrime</div>
        <div className="grid grid-cols-6 gap-y-4 bg-damdarkgray p-4 rounded-2xl">
          <div className="flex flex-col col-span-3">
            <div className="text-sm text-gray-400 ">Current balance</div>
            <div className="text-white text-2xl">23324</div>
          </div>
          <div className="flex flex-col col-span-3">
            <div className="text-sm text-gray-400">Current debt</div>
            <div className="text-white text-2xl">15347</div>
          </div>
          <div className="flex flex-col col-span-3">
            <div className="text-sm text-gray-400">Cushion</div>
            <>
              <div className="text-3xl text-orange-300">21%</div>
              <div className="text-xs text-orange-300">High Risk of Liquidation</div>
            </>
          </div>
        </div>
        <AvailableInput amount={amount} available={available} handleChange={(value) => setAmount(value)}></AvailableInput>
        <button className="flex justify-center items-center gap-2 rounded-full py-4 px-6 bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold">
          <img src={borrowIcon} alt="Burrow icon" />
          <span>Borrow</span>
        </button>
      </div>
    </div>
  )
}

export default Manage
