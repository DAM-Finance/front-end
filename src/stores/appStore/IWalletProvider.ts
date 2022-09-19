export interface IWalletProvider {
  provider: null
  connectedToChain: boolean
  chainId: string
  accounts: any[]
  connected: boolean
  connectWallet: () => Promise<boolean>
}
