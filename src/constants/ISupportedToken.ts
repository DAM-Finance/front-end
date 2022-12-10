export interface ISupportedTokensMap {
  dPrime: ISupportedToken
  usdc: ISupportedToken
}

export interface ISupportedToken {
  name: string
  symbol: string
  units: number
  imgUrl: string
  bytes: string
}
