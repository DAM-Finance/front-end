import { FC } from 'react'
import { useAppStore } from '../../stores/appStore/appStore'

const CollateralRatio: FC = () => {
  const appStore = useAppStore()

  return (
    <div className="flex flex-col bg-damgray rounded-xl p-6 gap-2">
      <div className="flex flex-col gap-2 relative text-damlabelgray">Collateral Ratio</div>
      <div className="text-3xl">{appStore.analytics?.collateralRatio}</div>
    </div>
  )
}

export default CollateralRatio
