import { FC } from 'react'
import SwaperBalance from './SwaperBalance'

interface SwaperInputListProps {
  value?: string
  coins: Coin[]
  selectedCoin: Coin
  children?: any
  handleChange: (elem: string) => void
  handleListChange: (coin: Coin) => void
}

interface Coin {
  name: string
  icon: string
  balance: string
}

const SwaperInputList: FC<SwaperInputListProps> = ({ value = '0', coins, selectedCoin, handleChange, handleListChange, children }) => {
  const changeSelected = (ev: any) => {
    const selectedCoin = coins.find((coin) => coin.name === ev.target.value) || coins[0]
    handleListChange(selectedCoin)
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex text-gray-400 bg-damdarkgray border-solid border-[1px] border-damdarkgray outline-none focus:border-yellow-300 hover:border-yellow-300 rounded-2xl">
        <input
          value={value}
          onChange={(ev) => handleChange(ev.target.value)}
          type="text"
          className="bg-damdarkgray p-4 text-2xl border-damdarkgray outline-none border-none rounded-2xl"
        />
        <div className="flex mx-4 my-2 px-2 ml-auto bg-damgray rounded-3xl">
          <img className="py-2 pr-1" src={selectedCoin.icon} width={46} alt="selected coin" />
          <select className="bg-transparent outline-none" value={selectedCoin.name} onChange={changeSelected} name="coins" id="coins">
            {coins?.map((coin) => (
              <option key={coin.name} value={coin.name}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {children}
    </div>
  )
}

export default SwaperInputList
