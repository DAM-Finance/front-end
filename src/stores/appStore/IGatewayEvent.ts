export type IGatewayEvent = IConnectGatewayEvent | IDisconnectGatewayEvent | IChainChangedGatewayEvent | IAccountsChangedGatewayEvent

export interface IConnectGatewayEvent {
  type: GatewayEventType
  connectedToChain?: boolean
}
export interface IDisconnectGatewayEvent {
  type: GatewayEventType
  connectedToChain?: boolean
}
export interface IChainChangedGatewayEvent {
  type: GatewayEventType
  chainId?: string
}
export interface IAccountsChangedGatewayEvent {
  type: GatewayEventType
  accounts?: string[]
}

type GatewayEventType = 'connect' | 'disconnect' | 'chainChanged' | 'accountsChanged'
