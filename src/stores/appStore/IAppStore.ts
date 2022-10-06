import { supportedTokens } from '../../constants/config'
import { ISupportedNetwork } from '../../constants/ISupportedNetworks'
import { IBalances } from './IBalances'
import { IGateway } from './IGateway'
import { IGatewayEvent } from './IGatewayEvent'
import { IWalletProvider } from './IWalletProvider'

export interface IAppStore {
  selectedNetwork: ISupportedNetwork | null
  walletProvider: IWalletProvider

  showConnectingWalletPopup: boolean
  setShowConnectingWalletPopup: (isConnecting: boolean) => void

  gateway: IGateway | null
  setGateway: (gateway: IGateway) => void

  portfolio: any // TODO: remove when smart contracts are called

  balances: IBalances
  setBalances: (token: keyof typeof supportedTokens, balance: string) => void

  teleportFees: string
  setTeleportFees: (fees: string) => void

  chooseGateway: () => IGateway
  gatewayEventHandler: (event: IGatewayEvent) => void
  setSelectedNetwork: (network: ISupportedNetwork) => void
  setPortfolio: (data: any) => void // TODO: remove when smart contracts are called
  initWeb3: () => void
  setWalletProvider: (wallet: Partial<IWalletProvider>) => void

  ensureConnected: () => void
  connectWallet: () => void
  switchNetwork: (chainId: string) => void
  attachContracts: () => void
  refreshNetwork: () => void

  getTokenBalance: (token: keyof typeof supportedTokens) => void

  updateBalances: () => void
  stableSwap: (amount: string) => void
  approveUSDC: (amount: string) => any
  teleport: (dPrimeAmount: string, dstChainName: string) => void
  estimateTeleportFees: () => void
}
