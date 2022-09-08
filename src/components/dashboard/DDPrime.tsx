import { FC } from 'react'

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
        <button className="text-yellow-200">Start Earning</button>
      </div>
    </div>
  )
}

export default DDPrime
