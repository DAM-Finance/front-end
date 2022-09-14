import { FC } from 'react'

interface AvailableInputProps {
  amount?: string
  available: string
  handleChange: (elem: string) => void
}

const AvailableInput: FC<AvailableInputProps> = ({ amount = '0', available, handleChange }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex text-gray-400 bg-damdarkgray border-solid border-[1px] border-damdarkgray outline-none focus:border-yellow-300 hover:border-yellow-300 rounded-2xl">
        <input
          value={amount}
          onChange={(ev) => handleChange(ev.target.value)}
          type="text"
          className="w-full bg-damdarkgray p-4 text-2xl border-damdarkgray outline-none border-none rounded-2xl"
        />
        <button
          onClick={() => handleChange(available)}
          className="flex items-center gap-2 rounded-full px-4 my-4 mr-4 bg-yellow-400 bg-opacity-5 text-yellow-300 hover:bg-opacity-10"
        >
          <span>MAX</span>
        </button>
      </div>
      <div className="flex gap-2 ml-4">
        <div className="text-gray-400 ">{available}</div>
        <div className="text-gray-600 font-light">Available dPRIME</div>
      </div>
    </div>
  )
}

export default AvailableInput
