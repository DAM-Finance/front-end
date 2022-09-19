import { ethers } from 'ethers'
import Metamask from '../../wallet/metamask'
import { ISupportedNetwork } from './ISupportedNetwork'
import { IWalletProvider } from './IWalletProvider'

export interface IAppStore {
  supportedNetworks: ISupportedNetwork[]
  selectedNetwork: ISupportedNetwork | null
  walletProvider: IWalletProvider
  metamask: Metamask
  portfolio: any // TODO: remove when smart contracts are called
  setSelectedNetwork: (network: ISupportedNetwork) => void
  setPortfolio: (data: any) => void // TODO: remove when smart contracts are called
  setupWallet: () => void
  setWalletProvider: (wallet: Partial<IWalletProvider>) => void
  autoConnect: (metamaskProvider: ethers.providers.ExternalProvider) => void
  connectWallet: () => void
}
