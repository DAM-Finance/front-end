import { ethers } from 'ethers'
import produce from 'immer'
import create from 'zustand'
import Metamask from './../../wallet/metamask'
import { IAppStore } from './IAppStore'
import { ISupportedNetwork } from './ISupportedNetwork'
import { IWalletProvider } from './IWalletProvider'

export const supportedNetworks = [
  // { name: 'Moonbeam', symbol: 'GLMR', chainId: '0x504', id: 1284, iconName: 'moonbeamneticon.png' },
  // { name: 'Ethereum', symbol: 'ETH', chainId: '0x1', id: 1, iconName: 'ethneticon.png' },
  { name: 'Moonbase', symbol: 'MDEV', chainId: '0x507', id: 1287, iconName: 'moonbeamneticon.png' },
  { name: 'Rinkeby', symbol: 'RETH', chainId: '0x4', id: 4, iconName: 'ethneticon.png' }
]

const initialWalletProvider = {
  metamask: null,
  provider: null,
  web3Provider: null,
  connectedToChain: false,
  chainId: '',
  accounts: [],
  connected: false,
  connectWallet: async () => false
} as IWalletProvider

export const useAppStore = create<IAppStore>((set, get) => ({
  supportedNetworks,
  selectedNetwork: supportedNetworks[0],
  walletProvider: initialWalletProvider,
  metamask: new Metamask(),
  portfolio: null,
  setSelectedNetwork: (network: ISupportedNetwork) =>
    set(
      produce((state: IAppStore) => {
        state.selectedNetwork = network
      })
    ),
  setPortfolio: (data: any) =>
    set(
      produce((state: IAppStore) => {
        state.portfolio = data
      })
    ),
  setWalletProvider: (wallet: Partial<IWalletProvider>) =>
    set(
      produce((state: IAppStore) => {
        Object.keys(wallet).forEach((key) => {
          state.walletProvider[key as keyof IWalletProvider] = wallet[key as keyof IWalletProvider] as never
        })
        state.walletProvider.connected = !!state.walletProvider.accounts?.length
        if (state.walletProvider.connected) {
          state.portfolio = {
            dPrime: 15347,
            cushion: 21,
            portfolioValue: 23324
          }
        } else {
          state.portfolio = null
        }
      })
    ),

  // Move to a Wallet service?
  connectWallet: async () => {
    const accounts = await get().metamask.connect(get().walletProvider.provider)
    get().setWalletProvider({ accounts } as any)
  },
  setupWallet: async () => {
    const provider = await get().metamask.detectProvider()
    const chainId = await get().metamask.getChainId(provider)
    const web3Provider = new ethers.providers.Web3Provider(provider)

    get().metamask.subscribeEvents(provider, (data: any) => {
      get().setWalletProvider(data)
    })

    const walletData = { provider, web3Provider, chainId, connectWallet: get().connectWallet }
    get().setWalletProvider(walletData as any)
    get().autoConnect(web3Provider)
  },
  autoConnect: async (web3Provider: ethers.providers.Web3Provider) => {
    const accounts = await web3Provider.listAccounts()

    if (!accounts.length) {
      return
    }

    get().connectWallet()
  },
  switchNetwork: async (chainId: string) => {
    const metamask = get().metamask
    const provider = get().walletProvider.provider

    await metamask.switchNetwork(provider, chainId)
  }
}))
