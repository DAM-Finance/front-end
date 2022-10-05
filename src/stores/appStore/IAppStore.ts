import { ethers } from 'ethers'
import { ISupportedNetwork } from '../../constants/ISupportedNetworks'
import Metamask from '../../wallet/metamask'
import { IBalances } from './IBalances'
import { IGateway } from './IGateway'
import { IGatewayEvent } from './IGatewayEvent'
import { ITeleportFees } from './ITeleportFees'
import { IWalletProvider } from './IWalletProvider'

export interface IAppStore {
  selectedNetwork: ISupportedNetwork | null
  walletProvider: IWalletProvider

  gateway: IGateway | null
  setGateway: (gateway: IGateway) => void

  portfolio: any // TODO: remove when smart contracts are called
  balances: IBalances
  teleportFees: ITeleportFees

  chooseGateway: () => IGateway
  gatewayEventHandler: (event: IGatewayEvent) => void
  setSelectedNetwork: (network: ISupportedNetwork) => void
  setPortfolio: (data: any) => void // TODO: remove when smart contracts are called
  initWeb3: () => void
  setWalletProvider: (wallet: Partial<IWalletProvider>) => void
  connectWallet: () => void
  switchNetwork: (chainId: string) => void
  attachContracts: () => void
  refreshNetwork: () => void
  getDPrimeBalance: () => void
  getUSDCBalance: () => void
  updateBalances: () => void
  stableSwap: (amount: string) => void
  approveUSDC: (amount: string) => any
  teleport: (dPrimeAmount: string, dstChainName: string) => void
  estimateTeleportFees: () => void
}
