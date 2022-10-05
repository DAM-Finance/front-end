export interface ISupportedNetwork {
  name: string
  symbol: string
  chainId: string
  id: number
  iconName: string
  addresses: {
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
    lzEndpoint?: string
  }
  layerZeroChainIds: string
}
