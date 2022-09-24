import { ethers } from 'ethers'
import Metamask from '../../wallet/metamask'
import { IBalances } from './IBalances'
import { ISupportedNetwork } from './ISupportedNetwork'
import { IWalletProvider } from './IWalletProvider'

export interface IAppStore {
  supportedNetworks: ISupportedNetwork[]
  selectedNetwork: ISupportedNetwork | null
  walletProvider: IWalletProvider
  metamask: Metamask
  portfolio: any // TODO: remove when smart contracts are called
  balances: IBalances
  setSelectedNetwork: (network: ISupportedNetwork) => void
  setPortfolio: (data: any) => void // TODO: remove when smart contracts are called
  setupWallet: () => void
  setWalletProvider: (wallet: Partial<IWalletProvider>) => void
  autoConnect: (web3Provider: ethers.providers.Web3Provider) => void
  connectWallet: () => void
  switchNetwork: (chainId: string) => void
  attachContracts: (web3Provider: ethers.providers.Web3Provider) => void
  getDPrimeBalance: () => void
  getUSDCBalance: () => void
  stableSwap: (amount: string) => void
  approveUSDC: (amount: string) => any
  teleport: (dPrimeAmount: string, dstChainName: string) => void
}