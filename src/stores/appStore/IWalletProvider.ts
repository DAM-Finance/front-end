import { ethers } from 'ethers'

export interface IWalletProvider {
  provider: null
  web3Provider: ethers.providers.Web3Provider | null
  connectedToChain: boolean
  chainId: string
  accounts: any[]
  connected: boolean
  connectWallet: () => Promise<boolean>
}
