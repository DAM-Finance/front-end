import { FC } from 'react'
import utils from '../../constants/utils'

interface SwaperBalanceProps {
  balance: string
  rightAligned?: boolean
  decimals?: number
}

const SwaperBalance: FC<SwaperBalanceProps> = ({ balance, rightAligned = false, decimals = -1 }) => {
  return (
    <div className="flex ml-4 gap-2 text-sm">
      <div className={`text-gray-600 font-light ${rightAligned ? 'ml-auto' : ''}`}>Balance</div>
      <div className="text-gray-400 pr-4">{utils.format(balance, decimals)}</div>
    </div>
  )
}

export default SwaperBalance
