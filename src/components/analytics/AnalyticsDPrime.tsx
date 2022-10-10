import { FC, useState, useEffect, useCallback } from 'react'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

const AnalyticsDPrime: FC = () => {
  const appStore = useAppStore()
  const [selectedNetwork, setSelectedNetwork] = useState('')
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

  return (
    <div className="flex flex-col bg-damgray rounded-xl p-6 gap-2">
      <div className="flex flex-col gap-2 relative text-damlabelgray">Collateral Ratio</div>
      <div>
        <select className="text-black" value={selectedNetwork} onChange={(evt) => setSelectedNetwork(evt.target.value)} name="networks" id="networks">
          <option value="">All networks</option>
          {networks.map((network: any) => (
            <option key={network} value={network}>
              {network}{' '}
            </option>
          ))}
        </select>
        <div className="text-3xl">${getDPrimeTotal()}bn</div>
      </div>
    </div>
  )
}

export default AnalyticsDPrime
