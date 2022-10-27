import { FC, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import utils from '../../constants/utils'

interface SwaperBalanceWithFeesProps {
  available: string
  gasPrice?: string
  children?: any
  decimals?: number
}

const SwaperBalanceWithFees: FC<SwaperBalanceWithFeesProps> = ({ available, gasPrice, children, decimals = -1 }) => {
  const [showFees, setShowFees] = useState(false)
  const toogleShowFees = () => setShowFees(!showFees)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 ml-4 text-sm">
        <div className="text-damlabelgray3 font-light">Balance</div>
        <div className="text-damlabelgray2 mr-auto">{utils.format(available, decimals)}</div>
        {gasPrice && (
          <div onClick={toogleShowFees} className="flex items-center gap-2 mr-4 cursor-pointer text-damlabelgray2 hover:text-damNavGray">
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

export default SwaperBalanceWithFees
