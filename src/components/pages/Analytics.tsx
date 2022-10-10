import { FC, useEffect } from 'react'
import { useAppStore } from '../../stores/appStore/appStore'
import AnalyticsDPrime from '../analytics/AnalyticsDPrime'
import AuditBanner from '../analytics/AuditBanner'
import CollateralRatio from '../analytics/CollateralRatio'
import TotalValueLocked from '../analytics/TotalValueLocked'

const Analytics: FC = () => {
  const appStore = useAppStore()

  useEffect(() => {
    appStore.queryAnalytics() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full max-w-screen-2xl flex flex-col mx-auto p-24 text-white gap-4">
      <div className="text-5xl font-light pb-4">Analytics (Mocked data)</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <TotalValueLocked></TotalValueLocked>
        </div>
        <div className="grid grid-rows-2 flex-col gap-4">
          <AnalyticsDPrime></AnalyticsDPrime>
          <CollateralRatio></CollateralRatio>
        </div>
      </div>
      <AuditBanner />
    </div>
  )
}

export default Analytics
