import { ContractTransaction } from 'ethers'
import { Message } from '@layerzerolabs/scan-client'

export interface IPendingTransaction {
  hash: string
  type: 'SWAP' | 'TELEPORT'
  status: 'REQUESTING' | 'INFLIGHT' | 'DELIVERED' | 'FAILED'
  source: ContractTransaction
  lzData?: Message
  from?: {
    amount: string
    token: string
    network: string
  }
  to?: {
    amount: string
    token: string
    network: string
  }
  startedAt: Date
}
