import { FC } from 'react'

interface SwaperBalanceProps {
  balance: string
  coinName?: string
  rightAligned?: boolean
  decimals?: number
}

const SwaperBalance: FC<SwaperBalanceProps> = ({ balance, coinName: coin = '', rightAligned = false, decimals = -1 }) => {
  const format = (value: string) => {
    const nValue = +value
    if (decimals === -1) {
      return value
    }
    return nValue.toFixed(decimals)
  }
  return (
    <div className="flex ml-4 gap-2 text-sm">
      <div className={`text-gray-600 font-light ${rightAligned ? 'ml-auto' : ''}`}>Balance</div>
      <div className="text-gray-400 ">
        {format(balance)} {coin}
      </div>
    </div>
  )
}

export default SwaperBalance
