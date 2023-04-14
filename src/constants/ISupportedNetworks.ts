export interface ISupportedNetwork {
  name: string
  symbol: string
  chainId: string
  id: number
  iconName: string
  teleportBgImg: string
  addresses: ISupportedNetworkAddresses
  layerZeroChainIds: string
  hyperlaneChainId: string
  suggestedGasLimit: number
  capabilities: {
    canSwap: boolean
    canTeleport: boolean
    hasUsdc: boolean
  }
  scanUrl: string
  scanLz: string
  default: boolean
  addNetworkData?: IAddNetworkData
}

export interface ISupportedNetworkAddresses {
  dPrime: string
  dPrimeJoin?: string
  dPrimeGuardian?: string
  lmcv?: string
  lmcvProxy?: string
  usdcJoin?: string //DEC COLLAT JOIN
  usdcPSM?: string
  usdc?: string
  weth?: string
  wethJoin?: string
  link?: string
  linkJoin?: string
  lzPipe?: string
  hyperlanePipe?: string
  hypProxyAdmin?: string
  hypIGPProxy?: string
  hypIGPImpl?: string
  hypISM?: string
  hypGasOracle?: string
}

export interface IAddNetworkData {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}
