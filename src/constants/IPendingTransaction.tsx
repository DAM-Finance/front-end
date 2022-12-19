import { ContractTransaction } from 'ethers'
import { Message } from '@layerzerolabs/scan-client'

export interface IPendingTransaction {
  hash: string
  type: 'APPROVE' | 'SWAP' | 'TELEPORT'
  status: 'CONFIRMING' | 'REQUESTING' | 'INFLIGHT' | 'DELIVERED' | 'FAILED'
  source?: ContractTransaction
  lzData?: Message
  lzScan?: string
  link?: string
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
