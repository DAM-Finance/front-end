import { FC, useState } from 'react'
import utils from '../constants/utils'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

interface AvailableInputProps {
  amount?: string
  available: string
  gasPrice?: string
  children?: any
  handleChange: (elem: string) => void
  decimals?: number
}

const AvailableInput: FC<AvailableInputProps> = ({ amount = '0', available, gasPrice, handleChange, children, decimals = -1 }) => {
  const [showFees, setShowFees] = useState(false)
  const toogleShowFees = () => setShowFees(!showFees)
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex text-gray-400 bg-damgray border-solid border-[1px] border-damlightyellow outline-none rounded-2xl">
        <input
          value={amount}
          onChange={(ev) => handleChange(ev.target.value)}
          type="number"
          className="w-full bg-damgray p-4 text-2xl outline-none border-none rounded-2xl"
        />
        <button
          onClick={() => handleChange(available)}
          className="flex items-center gap-2 rounded-full px-4 my-4 mr-4 bg-yellow-400 bg-opacity-5 text-yellow-300 hover:bg-opacity-10"
        >
          <span>MAX</span>
        </button>
      </div>
      <div className="flex gap-2 ml-4">
        <div className="text-damlabelgray2 ">{utils.format(available, decimals)}</div>
        <div className="text-damlabelgray3 font-light text-sm">Available dPRIME</div>
        {gasPrice && (
          <div onClick={toogleShowFees} className="flex items-center gap-2 ml-auto mr-4 cursor-pointer text-damlabelgray2 hover:text-damNavGray">
            <img src={utils.getImageSrc('gaspump.svg')} alt="gas" />
            <div className="text-sm">{utils.format(gasPrice, decimals)}</div>
            {showFees ? <ChevronUpIcon width={16}></ChevronUpIcon> : <ChevronDownIcon width={16}></ChevronDownIcon>}
          </div>
        )}
      </div>
      {showFees && <div className="p-4 bg-damtranspdarkgray rounded-2xl">{children}</div>}
    </div>
  )
}

export default AvailableInput
