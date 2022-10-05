import { ethers } from 'ethers'

export interface IWalletProvider {
  provider: null
  web3Provider: ethers.providers.Web3Provider | null
  network: ethers.providers.Network | null
  signer: ethers.providers.JsonRpcSigner | null
  connectedToChain: boolean
  chainId: string
  accounts: any[]
  connected: boolean
  loading: boolean
}

export const initialWalletProvider: IWalletProvider = {
  provider: null,
  web3Provider: null,
  network: null,
  signer: null,
  connectedToChain: false,
  chainId: '',
  accounts: [],
  connected: false,
  loading: true
}
