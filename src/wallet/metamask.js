import detectEthereumProvider from '@metamask/detect-provider'

class Metamask {
  async detectProvider() {
    const provider = await detectEthereumProvider()
    return this.isValidProvider(provider) ? provider : null
  }

  async addTokenToWallet(provider, tokenAddress, tokenSymbol, tokenDecimals, tokenImage) {
    return provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage
        }
      }
    })
  }

  async addNetworkToWallet(provider, addNetworkData) {
    debugger
    const { chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls } = addNetworkData
    return provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId,
          chainName,
          nativeCurrency: {
            name: nativeCurrency.name,
            symbol: nativeCurrency.symbol,
            decimals: nativeCurrency.decimals
          },
          rpcUrls,
          blockExplorerUrls
        }
      ]
    })
  }

  isValidProvider(provider) {
    return provider && provider === window.ethereum && provider.isMetaMask
  }

  async getChainId(provider) {
    if (!this.isValidProvider(provider)) return null

    const chainId = await provider.request({ method: 'eth_chainId' })
    return chainId
  }

  async switchNetwork(provider, chainId) {
    const res = await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    })
    return res
  }

  async connect(provider) {
    if (!this.isValidProvider(provider)) return []

    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    return accounts
  }

  subscribeEvents(provider, handler) {
    if (!this.isValidProvider(provider)) {
      console.error('Invalid provider', provider)
      return
    }

    provider.on('connect', () => handler({ type: 'connect', connectedToChain: provider.isConnected() }))
    provider.on('disconnect', () => handler({ type: 'disconnect', connectedToChain: provider.isConnected() }))
    provider.on('chainChanged', (chainId) => handler({ type: 'chainChanged', chainId }))
    provider.on('accountsChanged', (accounts) => handler({ type: 'accountsChanged', accounts }))
  }

  unsubscribeEvents(provider, handler) {
    if (!this.isValidProvider(provider)) return

    provider.removeListener('connect', () => handler({ connectedToChain: provider.isConnected() }))
    provider.removeListener('disconnect', () => handler({ connectedToChain: provider.isConnected() }))
    provider.removeListener('chainChanged', (chainId) => handler({ chainId }))
    provider.removeListener('accountsChanged', (accounts) => handler({ accounts }))
  }
}

export default Metamask
