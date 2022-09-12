import { FC } from 'react'
import utils from '../constants/utils'

// interface DDPrimeProps {}

const Swaper: FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 bg-damgray rounded-2xl p-4">
      <input
        type="text"
        className="w-full bg-damdarkgray p-4 text-2xl text-gray-400  border-solid focus:text-white  border-[1px] border-damdarkgray focus:border-yellow-300 hover:border-yellow-300 outline-none rounded-2xl"
      />
      <button className="w-fit p-4 bg-damdarkgray rounded-full">
        <img src={utils.getImageSrc('invertswap.svg')} alt="invert swap" />
      </button>
      <input
        type="text"
        className="w-full bg-damdarkgray p-4 text-2xl text-gray-400  border-solid focus:text-white  border-[1px] border-damdarkgray focus:border-yellow-300 hover:border-yellow-300 outline-none rounded-2xl"
      />
      <button className="flex items-center w-full justify-center gap-2 rounded-full py-3 px-6  bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold">
        <span>Swap</span>
      </button>
    </div>
  )
}

export default Swaper
