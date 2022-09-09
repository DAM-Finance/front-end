import { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

// interface DDPrimeProps {}

const DDPrime: FC = () => {
  return (
    <div className="bg-damgray flex rounded-xl p-8 py-8">
      <div>
        <div className="text-lg text-gray-300">
          <span>Meet </span>
          <span className="font-bold">ddPRIME</span>
        </div>
        <div className="text-gray-400 text-sm">Put your LP tokens to work</div>
      </div>
      <div className="ml-auto flex justify-center">
        <button className="flex items-center gap-2 rounded-full py-1 px-6 bg-yellow-400 bg-opacity-5 text-yellow-300 hover:bg-opacity-10">
          <span>Start Earning</span>
          <ArrowRightIcon className="h-5 w-5 text-yellow-300"></ArrowRightIcon>
        </button>
      </div>
    </div>
  )
}

export default DDPrime
