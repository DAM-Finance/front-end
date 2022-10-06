import { FC } from 'react'
import utils from '../../constants/utils'

const BorrowingSoon: FC = () => {
  return (
    <div
      className="bg-damgray rounded-xl"
      style={{
        background: 'linear-gradient(124.57deg, rgba(75, 43, 165, 0.3) -118.12%, rgba(31,33,44, 0.3) 57.01%)'
        // backgroundImage: `url(${utils.getImageSrc('borrowing-soon.png')})`
      }}
    >
      <div
        className="flex w-full h-full flex-col justify-center pl-6 rounded-xl"
        style={{
          background: `url(${utils.getImageSrc('borrowing-soon.png')})`
        }}
      >
        <div className="text-lg">
          <span className="font-bold">Borrowing </span>
          <span>coming soon</span>
        </div>
        <div className="text-damlabelgray3 text-sm font-light">DAM token targeted for Q1 2023</div>
      </div>
    </div>
  )
}

export default BorrowingSoon
