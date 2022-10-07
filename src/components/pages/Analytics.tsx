import { FC } from 'react'
import { useAppStore } from '../../stores/appStore/appStore'
import AuditBanner from '../analytics/AuditBanner'
import BorrowingSoon from '../dashboard/BorrowingSoon'
import DPrime from '../dashboard/DPrime'
import Portfolio from '../dashboard/Portfolio'

const Analytics: FC = () => {
  const portfolio = useAppStore((state) => state.portfolio)

  return (
    <div className="w-full h-full max-w-screen-2xl flex flex-col mx-auto p-24 text-white gap-4">
      <div className="text-5xl font-light pb-4">Analytics (Work In Progress)</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <Portfolio {...portfolio}></Portfolio>
        </div>
        <div className="grid grid-rows-2 flex-col gap-4">
          <DPrime {...portfolio}></DPrime>
          <BorrowingSoon></BorrowingSoon>
        </div>
      </div>
      <AuditBanner />
    </div>
  )
}

export default Analytics
