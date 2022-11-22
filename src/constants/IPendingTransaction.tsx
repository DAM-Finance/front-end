import { ContractTransaction } from 'ethers'
import { Message } from '@layerzerolabs/scan-client'

export interface IPendingTransaction {
  hash: string
  type: 'SWAP' | 'TELEPORT'
  status: 'CONFIRMING' | 'REQUESTING' | 'INFLIGHT' | 'DELIVERED' | 'FAILED'
  source?: ContractTransaction
  lzData?: Message
  lzScan?: string
  from?: {
    amount: string
    token: string
    networkImg: string
    network: string
    chainId: string
  }
  to?: {
    amount: string
    token: string
    networkImg: string
    network: string
    chainId: string
  }
  startedAt: Date
}
