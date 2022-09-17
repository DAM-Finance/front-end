import create from 'zustand'
import produce from 'immer'
import { ISupportedNetwork } from './ISupportedNetwork'
import { IAppStore } from './IAppStore'
import utils from '../../constants/utils'

const supportedNetworks = [{ name: 'Ethereum', symbol: 'ETH', id: 1, iconName: 'ethneticon.png' }]

export const useAppStore = create<IAppStore>((set) => ({
  supportedNetworks,
  selectedNetwork: supportedNetworks[0],
  setSelectedNetwork: (network: ISupportedNetwork) =>
    set(
      produce((state) => {
        state.selectedNetwork = network
      })
    )
}))
