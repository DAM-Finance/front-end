import { FC } from 'react'
import { ISupportedToken } from '../../constants/ISupportedToken'
import utils from '../../constants/utils'
interface SwaperInputProps {
  value?: string
  coin: ISupportedToken
  children?: any
  disabled?: boolean
  decimals: number
  handleChange: (elem: string) => void
}

const SwaperInput: FC<SwaperInputProps> = ({ value = 0, coin, handleChange, children = <></>, disabled = false, decimals }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div
        className={`w-full flex text-gray-400 bg-damdarkgray border-solid border-[1px] border-damdarkgray outline-none focus:border-yellow-300 hover:border-yellow-300 rounded-2xl
                      ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <input
          value={utils.beautifyNumber(value)}
          onChange={(ev) => handleChange(utils.unbeautifyNumber(ev.target.value, decimals))}
          type="string"
          disabled={disabled}
          className="w-full bg-damdarkgray p-4 text-2xl border-damdarkgray outline-none border-none rounded-2xl"
        />
        <div className="flex justify-around mx-4 my-2 px-2 ml-auto bg-damgray rounded-3xl" style={{ minWidth: '120px' }}>
          <img className="py-2 pr-1" src={coin.imgUrl} style={{ maxHeight: '48px', maxWidth: '48px' }} alt="selected coin" />
          <div className="flex items-center pr-4 text-md">{coin.symbol}</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default SwaperInput
