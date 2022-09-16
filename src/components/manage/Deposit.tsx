import { FC, useState } from 'react'
import utils from '../../constants/utils'
import AvailableInput from '../AvailableInput'

// interface BorrowProps {
// }

const Deposit: FC = () => {
  const borrowIcon = utils.getImageSrc('borrow-icon.svg')
  const [amount, setAmount] = useState('0')
  const [available] = useState('1030')

  return (
    <>
      <div className="flex flex-col bg-damgray rounded-2xl max-w-7xl gap-6 p-6 h-96">
        <div className="text-gray-400">TODO: Deposit</div>
      </div>
    </>
  )
}

export default Deposit
