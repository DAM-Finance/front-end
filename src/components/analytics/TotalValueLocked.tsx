import { FC, useCallback, useState } from 'react'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

const TotalValueLocked: FC = () => {
  const appStore = useAppStore()
  const [selectedNetwork, setSelectedNetwork] = useState('')

  const getNetworks = useCallback(() => {
    return !appStore.analytics ? [] : Object.keys(appStore.analytics.tvl)
  }, [appStore.analytics])

  const getTvl = useCallback((): number => {
    const networks = getNetworks()
    if (!networks || !networks.length) {
      return 0
    }

    if (selectedNetwork) {
      return appStore.analytics.tvl[selectedNetwork]
    }

    const total = (Object.values(appStore.analytics.tvl) as number[]).reduce((cur, total) => total + cur, 0)

    return utils.round(total, 2)
  }, [getNetworks, appStore.analytics, selectedNetwork])

  return (
    <div className="bg-damgray h-full rounded-xl">
      <div className="flex flex-col bg-damtranspgray h-full rounded-xl px-8 py-16">
        <div className="flex flex-col gap-2 relative text-damlabelgray">Total Value Locked</div>
        <div>
          <select className="text-black" value={selectedNetwork} onChange={(evt) => setSelectedNetwork(evt.target.value)} name="networks" id="networks">
            <option value="">All networks</option>
            {getNetworks().map((network: any) => (
              <option key={network} value={network}>
                {network}{' '}
              </option>
            ))}
          </select>
          <div className="text-3xl">${getTvl()}bn</div>
        </div>
      </div>
    </div>
  )
}

export default TotalValueLocked
