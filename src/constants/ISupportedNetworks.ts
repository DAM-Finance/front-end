export interface ISupportedNetwork {
  name: string
  symbol: string
  chainId: string
  id: number
  iconName: string
  teleportBgImg: string
  addresses: ISupportedNetworkAddresses
  layerZeroChainIds: string
  suggestedGasLimit: number
  capabilities: {
    canSwap: boolean
    canTeleport: boolean
  }
}

export interface ISupportedNetworkAddresses {
  dPrime: string
  dPrimeJoin?: string
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
}
