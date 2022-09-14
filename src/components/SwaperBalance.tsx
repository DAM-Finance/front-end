import { FC } from 'react'

interface SwaperBalanceProps {
  value: string
  coin?: string
}

const SwaperBalance: FC<SwaperBalanceProps> = ({ value, coin = '' }) => {
  return (
    <div className="flex ml-auto gap-2">
      <div className="text-gray-600 font-light">Balance</div>
      <div className="text-gray-400 ">
        {value} {coin}
      </div>
    </div>
  )
}

export default SwaperBalance
