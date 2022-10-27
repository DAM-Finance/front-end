import { supportedTokens } from '../../constants/config'
import { ISupportedNetwork, ISupportedNetworkAddresses } from '../../constants/ISupportedNetworks'
import { IBalances } from './IBalances'
import { IGateway } from './IGateway'
import { IGatewayEvent } from './IGatewayEvent'
import { IWalletProvider } from './IWalletProvider'

export interface IAppStore {
  selectedNetwork: ISupportedNetwork | null
  walletProvider: IWalletProvider

  showWaitingForConfirmation: boolean
  setShowWaitingForConfirmation: (isConnecting: boolean) => void

  isWrongNetworkPopupEnabled: boolean
  setIsWrongNetworkPopupEnabled: (isWrongNetwork: boolean) => void

  gateway: IGateway | null
  setGateway: (gateway: IGateway) => void

  analytics: any // TODO: SET THE PROPER TYPE (unknown for now)
  setAnalytics: (data: any) => void
  queryAnalytics: () => any

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
  refreshSelectedNetwork: () => void

  getTokenBalance: (token: keyof typeof supportedTokens) => void

  updateBalances: () => void
  swapStableToDPrime: (token: keyof typeof supportedTokens, tokenPsm: string | undefined, amount: string) => Promise<any>
  swapDPrimeToStable: (token: keyof typeof supportedTokens, tokenPsm: string | undefined, amount: string) => Promise<any>
  // stableSwap: (amount: string) => void
  approveToken: (token: keyof typeof supportedTokens, tokenJoin: keyof ISupportedNetworkAddresses, amount?: string) => void
  tokenRequiresApproval: (token: keyof typeof supportedTokens, tokenJoin: keyof ISupportedNetworkAddresses) => Promise<boolean>
  teleport: (dPrimeAmount: string, dstChainName: string) => Promise<any>
}
