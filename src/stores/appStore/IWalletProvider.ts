export interface IWalletProvider {
  provider: null
  connectedToChain: boolean
  chainId: null
  accounts: any[]
  connected: boolean
  connectWallet: () => Promise<boolean>
}
