import { ethers } from 'ethers'
import produce from 'immer'
import create from 'zustand'
import Metamask from './../../wallet/metamask'
import { IAppStore } from './IAppStore'
import { ISupportedNetwork } from './ISupportedNetwork'
import { IWalletProvider } from './IWalletProvider'

const supportedNetworks = [{ name: 'Ethereum', symbol: 'ETH', id: 1, iconName: 'ethneticon.png' }]
const initialWalletProvider = {
  metamask: null,
  provider: null,
  connectedToChain: false,
  chainId: null,
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
  connectWallet: async () => {
    const accounts = await get().metamask.connect(get().walletProvider.provider)
    get().setWalletProvider({ accounts } as any)
  },
  setupWallet: async () => {
    const provider = await get().metamask.detectProvider()
    const chainId = await get().metamask.getChainId(provider)

    get().metamask.subscribeEvents(provider, (data: any) => {
      get().setWalletProvider(data)
    })

    const walletData = { provider, chainId, connectWallet: get().connectWallet }
    get().setWalletProvider(walletData as any)
    get().autoConnect(provider)
  },
  autoConnect: async (metamaskProvider: ethers.providers.ExternalProvider) => {
    const provider = new ethers.providers.Web3Provider(metamaskProvider)
    const accounts = await provider.listAccounts()

    if (!accounts.length) {
      return
    }

    get().connectWallet()
  }
}))
