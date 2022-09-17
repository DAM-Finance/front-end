import { ISupportedNetwork } from './ISupportedNetwork'

export interface IAppStore {
  supportedNetworks: ISupportedNetwork[]
  selectedNetwork: ISupportedNetwork | null
  setSelectedNetwork: (network: ISupportedNetwork) => void
}
