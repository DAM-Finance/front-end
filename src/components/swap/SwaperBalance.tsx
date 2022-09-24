import { FC } from 'react'

interface SwaperBalanceProps {
  balance: string
  coinName?: string
}

const SwaperBalance: FC<SwaperBalanceProps> = ({ balance, coinName: coin = '' }) => {
  return (
    <div className="flex ml-4 gap-2 text-sm">
      <div className="text-gray-600 font-light">Balance</div>
      <div className="text-gray-400 ">
        {balance} {coin}
      </div>
    </div>
  )
}

export default SwaperBalance
