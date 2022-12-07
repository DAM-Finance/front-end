import { FC } from 'react'
import { ISupportedNetworkAddresses } from '../../constants/ISupportedNetworks'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'
import { IBalances } from '../../stores/appStore/IBalances'

interface SwaperInputListProps {
  value?: string
  coins: Coin[]
  selectedCoin: Coin
  children?: any
  disabled?: boolean
  handleChange: (elem: string) => void
  handleListChange: (coin: Coin) => void
}

export interface Coin {
  name: string
  balancesMapper: keyof IBalances
  tokenJoin: keyof ISupportedNetworkAddresses
  icon: string
  balance: string
  decimals: 6
}

const SwaperInputList: FC<SwaperInputListProps> = ({ value = '0', coins, selectedCoin, handleChange, handleListChange, children, disabled = false }) => {
  const appStore = useAppStore()
  const changeSelected = (ev: any) => {
    const selectedCoin = coins.find((coin) => coin.name === ev.target.value) || coins[0]
    handleListChange(selectedCoin)
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <div
        className={`w-full flex text-gray-400 bg-damdarkgray border-solid border-[1px] border-damdarkgray outline-none focus:border-yellow-300 hover:border-yellow-300 rounded-2xl ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        <input
          value={utils.beautifyNumber(value)}
          onChange={(ev) => handleChange(utils.unbeautifyNumber(ev.target.value, selectedCoin.decimals))}
          type="string"
          disabled={disabled}
          className="bg-damdarkgray p-4 text-2xl borsder-damdarkgray outline-none border-none rounded-2xl"
        />
        <button
          onClick={() => handleChange(utils.unbeautifyNumber(appStore.balances[selectedCoin.balancesMapper], selectedCoin.decimals))}
          className="flex items-center gap-2 rounded-full px-4 my-4 mr-4 bg-yellow-400 bg-opacity-5 text-yellow-300 hover:bg-opacity-10 ml-auto"
        >
          <span>MAX</span>
        </button>
        <div className="flex mr-4 my-2 px-2 bg-damgray rounded-3xl" style={{ minWidth: '120px' }}>
          <img className="py-2 pr-1" src={selectedCoin.icon} style={{ maxHeight: '48px' }} alt="selected coin" />
          <select className="bg-transparent outline-none" value={selectedCoin.name} onChange={changeSelected} disabled={disabled} name="coins" id="coins">
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
