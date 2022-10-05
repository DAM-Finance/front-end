import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'
import { supportedNetworks } from '../../constants/config'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

const SwitchNetworkSelector: FC = () => {
  const appStore = useAppStore()

  // const isSelectedNetworkSupported = useCallback(() => {
  //   return !!supportedNetworks.find((network) => network.chainId === appStore.walletProvider.chainId)
  // }, [appStore.walletProvider.chainId])

  let switchNeworkSelector = <></>

  if (appStore.walletProvider.connected) {
    switchNeworkSelector = (
      <button
        onClick={() => appStore.switchNetwork(supportedNetworks[0].chainId)}
        className="outline outline-1 px-4 py-2 rounded-full bg-transparent text-damyellow outline-damtext-damyellow hover:bg-damyellow hover:text-damgray"
      >
        Switch Network
      </button>
    )
  }

  if (appStore.walletProvider.connected && !!appStore.selectedNetwork) {
    switchNeworkSelector = (
      <div className="relative">
        <div className="flex px-2 py-1 gap-2 rounded-full border-solid border-[1px] border-damyellow">
          <img className="" width={29} height={29} src={utils.getImageSrc(appStore.selectedNetwork?.iconName as string)} alt="selected network" />
          <ChevronDownIcon width={14} className="text-damyellow"></ChevronDownIcon>
        </div>
        <select
          className="absolute w-full h-full top-0 bg-transparent text-transparent outline-none"
          name="from"
          id="from"
          value={appStore.selectedNetwork?.chainId}
          onChange={(evt) => appStore.switchNetwork(evt.target.value)}
        >
          {supportedNetworks.map((network) => (
            <option className="bg-damgray text-white" key={network.symbol} value={network.chainId}>
              {network.name}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return <> {switchNeworkSelector} </>
}

export default SwitchNetworkSelector
