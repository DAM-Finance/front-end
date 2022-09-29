import { ethers } from 'ethers'
import Metamask from '../../wallet/metamask'
import { IBalances } from './IBalances'
import { IGateway } from './IGateway'
import { ISupportedNetwork } from './ISupportedNetwork'
import { ITeleportFees } from './ITeleportFees'
import { IWalletProvider } from './IWalletProvider'

export interface IAppStore {
  supportedNetworks: ISupportedNetwork[]
  selectedNetwork: ISupportedNetwork | null
  walletProvider: IWalletProvider

  gateway: IGateway | null
  setGateway: (gateway: IGateway) => void

  portfolio: any // TODO: remove when smart contracts are called
  balances: IBalances
  teleportFees: ITeleportFees

  chooseGateway: () => IGateway
  setSelectedNetwork: (network: ISupportedNetwork) => void
  setPortfolio: (data: any) => void // TODO: remove when smart contracts are called
  initWeb3: () => void
  setWalletProvider: (wallet: Partial<IWalletProvider>) => void
  connectWallet: () => void
  switchNetwork: (chainId: string) => void
  attachContracts: () => void
  getDPrimeBalance: () => void
  getUSDCBalance: () => void
  stableSwap: (amount: string) => void
  approveUSDC: (amount: string) => any
  teleport: (dPrimeAmount: string, dstChainName: string) => void
  estimateTeleportFees: () => void
}
