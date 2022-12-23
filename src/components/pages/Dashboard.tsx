import { FC } from 'react'
import { useAppStore } from '../../stores/appStore/appStore'
import BorrowingSoon from '../dashboard/BorrowingSoon'
import DDPrime from '../dashboard/DDPrime'
import DPrime from '../dashboard/DPrime'
import Portfolio from '../dashboard/Portfolio'

const Home: FC = () => {
  const portfolio = useAppStore((state) => state.portfolio)

  return (
    <div className="w-full h-full max-w-screen-2xl flex flex-col mx-auto px-4 lg:py-24 py-12 md:p-24 text-white gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-12 xl:col-span-2">
          <Portfolio {...portfolio}></Portfolio>
        </div>
        <div className="grid grid-rows-2 col-span-12 xl:col-span-1 flex-col gap-4">
          <DPrime {...portfolio}></DPrime>
          <BorrowingSoon></BorrowingSoon>
        </div>
      </div>
      <DDPrime />
    </div>
  )
}

export default Home
