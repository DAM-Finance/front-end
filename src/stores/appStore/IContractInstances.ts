import { ethers } from 'ethers'

export interface IContractInstances {
    lmcv:           ethers.Contract,
    lmcvProxy:      ethers.Contract,
    dPrime:         ethers.Contract,
    dPrimeJoin:     ethers.Contract,
    usdc:           ethers.Contract,
    usdcJoin:       ethers.Contract,
    usdcPSM:        ethers.Contract
}
