import { FC, useCallback, useState, useEffect } from 'react'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

const TotalValueLocked: FC = () => {
  const appStore = useAppStore()
  const [selectedNetwork] = useState('')
  const [networks, setNetworks] = useState<any>([])

  useEffect(() => {
    if (!appStore.analytics) {
      setNetworks([])
      return
    }

    setNetworks(Object.keys(appStore.analytics.dPrime))
  }, [appStore.analytics])

  const getDPrimeTotal = useCallback((): number => {
    if (!networks || !networks.length) {
      return 0
    }

    if (selectedNetwork) {
      return appStore.analytics.dPrime[selectedNetwork]
    }

    const total = (Object.values(appStore.analytics.dPrime) as number[]).reduce((cur, total) => total + cur, 0)

    return utils.round(total, 2)
  }, [selectedNetwork, networks, appStore.analytics])
  getDPrimeTotal()

  return (
    <div className="bg-damgray h-full rounded-xl">
      <div className="flex flex-col bg-damtranspgray h-full rounded-xl px-8 py-16">
        <div className="flex flex-col gap-2 relative text-damlabelgray">Total Value Locked</div>
        <div></div>
      </div>
    </div>
  )
}

export default TotalValueLocked
