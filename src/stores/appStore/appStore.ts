import { ethers } from 'ethers'
import produce from 'immer'
import create from 'zustand'
import { LayerZeroChainIds, moonbase_addresses, moonbase_testnet_id, rinkeby_testnet_addresses, rinkeby_testnet_id } from '../../constants/config'
import Metamask from './../../wallet/metamask'
import { IAppStore } from './IAppStore'
import { IBalances } from './IBalances'
import { IContractInstances } from './IContractInstances'
import { IGateway } from './IGateway'
import { ISupportedNetwork } from './ISupportedNetwork'
import { ITeleportFees } from './ITeleportFees'
import { initialWalletProvider, IWalletProvider } from './IWalletProvider'

import CollateralJoinDecAbi from '../../constants/abis/CollateralJoinDecimals.json'
import dPrimeAbi from '../../constants/abis/dPrime.json'
import dPrimeJoinAbi from '../../constants/abis/dPrimeJoin.json'
import ERC20Abi from '../../constants/abis/ERC20.json'
import LMCVAbi from '../../constants/abis/LMCV.json'
import LMCVProxyAbi from '../../constants/abis/LMCVProxy.json'
import PSMAbi from '../../constants/abis/PSM.json'
import utils from '../../constants/utils'
import { IGatewayEvent } from './IGatewayEvent'

export const supportedNetworks = [
  // { name: 'Moonbeam', symbol: 'GLMR', chainId: '0x504', id: 1284, iconName: 'moonbeamneticon.png' },
  // { name: 'Ethereum', symbol: 'ETH', chainId: '0x1', id: 1, iconName: 'ethneticon.png' },
  { name: 'Moonbase', symbol: 'MDEV', chainId: '0x507', id: 1287, iconName: 'moonbeamneticon.svg' },
  { name: 'Rinkeby', symbol: 'RETH', chainId: '0x4', id: 4, iconName: 'ethneticon.png' }
]

//BYTES
let USDCBytes = ethers.utils.formatBytes32String('PSM-USDC')
const connectedContracts = {} as IContractInstances
const initBalances = {} as IBalances
const initTeleportFees = {} as ITeleportFees

export const useAppStore = create<IAppStore>((set, get) => ({
  selectedNetwork: supportedNetworks[0],
  walletProvider: initialWalletProvider,
  gateway: null,
  portfolio: null,
  balances: initBalances,
  teleportFees: initTeleportFees,
  setSelectedNetwork: (network: ISupportedNetwork) =>
    set(
      produce((state: IAppStore) => {
        state.selectedNetwork = network
      })
    ),
  setPortfolio: (data: any) =>
    set(
      produce((state: IAppStore) => {
        state.portfolio = data
      })
    ),
  setGateway: (gateway: IGateway) =>
    set(
      produce((state: IAppStore) => {
        state.gateway = gateway
      })
    ),
  setWalletProvider: (wallet: Partial<IWalletProvider>) => {
    set(
      produce((state: IAppStore) => {
        Object.keys(wallet).forEach((key) => {
          state.walletProvider[key as keyof IWalletProvider] = wallet[key as keyof IWalletProvider] as never
        })
        state.walletProvider.connected = !!state.walletProvider.accounts?.length
        state.walletProvider.loading = false
      })
    )
  },
  // Might be extended to support new gateways
  chooseGateway: (): IGateway => {
    const gateway = new Metamask()
    return gateway
  },
  connectWallet: async () => {
    const accounts = await get().gateway?.connect(get().walletProvider.provider)
    get().setWalletProvider({ accounts })
    get().attachContracts()
    get().updateBalances()
  },
  gatewayEventHandler: (event: IGatewayEvent) => {
    switch (event.type) {
      case 'connect':
      case 'disconnect':
      case 'chainChanged':
      case 'accountsChanged':
        const newEvent: Partial<IGatewayEvent> = event
        delete newEvent.type
        get().setWalletProvider(newEvent)
    }
  },
  initWeb3: async () => {
    if (!get().gateway) {
      const gateway = get().chooseGateway()
      get().setGateway(gateway)
    }

    const provider = await get().gateway?.detectProvider()
    const chainId = await get().gateway?.getChainId(provider)
    const web3Provider = new ethers.providers.Web3Provider(provider, 'any')
    const accounts = await web3Provider.listAccounts()
    // const network = await get().walletProvider.web3Provider!.getNetwork()

    get().gateway?.subscribeEvents(provider, get().setWalletProvider)

    const walletData: Partial<IWalletProvider> = { provider, web3Provider, chainId }
    if (accounts) {
      walletData.accounts = accounts
    }

    get().setWalletProvider(walletData)
    get().attachContracts()
    get().updateBalances()
  },
  switchNetwork: async (chainId: string) => {
    const provider = get().walletProvider.provider
    await get().gateway?.switchNetwork(provider, chainId)
    get().attachContracts()
    get().updateBalances()
  },
  attachContracts: async () => {
    if (!get().walletProvider.accounts || !get().walletProvider.accounts.length) {
      return
    }
    const networkInfo = await get().walletProvider.web3Provider!.getNetwork()
    const signer = get().walletProvider?.web3Provider?.getSigner()

    if (networkInfo.chainId === rinkeby_testnet_id) {
      console.log('Rinkeby attach')
      connectedContracts.lmcv = new ethers.Contract(rinkeby_testnet_addresses.LMCV, LMCVAbi, signer)
      connectedContracts.lmcvProxy = new ethers.Contract(rinkeby_testnet_addresses.LMCVProxy, LMCVProxyAbi, signer)
      connectedContracts.dPrime = new ethers.Contract(rinkeby_testnet_addresses.dPrime, dPrimeAbi, signer)
      connectedContracts.dPrimeJoin = new ethers.Contract(rinkeby_testnet_addresses.dPrimeJoin, dPrimeJoinAbi, signer)
      connectedContracts.usdc = new ethers.Contract(rinkeby_testnet_addresses.USDC, ERC20Abi, signer)
      connectedContracts.usdcJoin = new ethers.Contract(rinkeby_testnet_addresses.USDCJoin, CollateralJoinDecAbi, signer)
      connectedContracts.usdcPSM = new ethers.Contract(rinkeby_testnet_addresses.USDCPSM, PSMAbi, signer)
    } else if (networkInfo.chainId === moonbase_testnet_id) {
      console.log('Moonbase attach')
      //Only dPrime deployed moonbase
      connectedContracts.dPrime = new ethers.Contract(moonbase_addresses.dPrime, dPrimeAbi, signer)
    } else {
      console.log('LMCV Not implemented yet')
    }

    get().estimateTeleportFees()
  },
  teleport: async (dPrimeAmount: string, dstChainName: string) => {
    let teleportFee
    const { accounts } = get().walletProvider

    //TODO: Make this much more elegant
    let dstChainId = '0'
    if (dstChainName === 'Moonbase') {
      dstChainId = LayerZeroChainIds.moonbase
    } else if (dstChainName === 'Rinkeby') {
      dstChainId = LayerZeroChainIds.rinkeby_testnet
    }

    console.log(dstChainName)
    console.log(dPrimeAmount)
    console.log(dstChainId)

    teleportFee = await connectedContracts.dPrime.estimateSendFee(
      dstChainId,
      accounts[0],
      utils.fwad(dPrimeAmount), //Convert from decimal number (type: string still) into 18 dec amount
      false,
      []
    )

    await connectedContracts.dPrime.sendFrom(
      accounts[0], //address _from,
      dstChainId, //uint16 _dstChainId,
      accounts[0], //bytes memory _toAddress,
      utils.fwad(dPrimeAmount), //uint _amount,
      accounts[0], //address payable _refundAddress,
      accounts[0], //address _zroPaymentAddress,
      [], //bytes memory _adapterParams
      { value: teleportFee.nativeFee }
    )
  },
  updateBalances: async () => {
    const networkInfo = await get().walletProvider.web3Provider!.getNetwork()
    get().getDPrimeBalance()
    if (networkInfo.chainId === rinkeby_testnet_id) {
      get().getUSDCBalance()
    } else {
      set(
        produce((state: IAppStore) => {
          state.balances.usdc = '0.0'
        })
      )
    }
  },
  getDPrimeBalance: async () => {
    let dPrimeBalance = await connectedContracts.dPrime.balanceOf(get().walletProvider.accounts[0])
    let formatedBalance = ethers.utils.formatUnits(dPrimeBalance, 18)
    set(
      produce((state: IAppStore) => {
        state.balances.dPrime = formatedBalance
        state.portfolio = {
          dPrime: formatedBalance
        }
      })
    )
  },
  getUSDCBalance: async () => {
    const address = get().walletProvider.accounts[0]
    let balance = await connectedContracts.usdc.balanceOf(address)
    let formatedBalance = ethers.utils.formatUnits(balance, 6)
    set(
      produce((state: IAppStore) => {
        state.balances.usdc = formatedBalance
      })
    )
  },
  stableSwap: async (amount: string) => {
    if (amount === '0') {
      return
    }
    let formattedAmount = utils.fusdc(amount).toString()
    let web3Provider = new ethers.providers.Web3Provider(await get().gateway?.detectProvider())
    const accounts = await web3Provider.listAccounts()

    console.log(connectedContracts.usdc.address)
    const allowance = await connectedContracts.usdc.allowance(accounts[0], rinkeby_testnet_addresses.USDCJoin)

    let txWait

    if (allowance < formattedAmount) {
      console.log('Allowance: ' + allowance)
      get()
        .approveUSDC(formattedAmount)
        .then((data: any) => {
          txWait = connectedContracts.usdcPSM.createDPrime(accounts[0], [USDCBytes], [formattedAmount])
        })
    } else {
      txWait = await connectedContracts.usdcPSM.createDPrime(accounts[0], [USDCBytes], [formattedAmount])
    }
    console.log('Amount: ' + formattedAmount)

    await txWait.wait()

    let networkInfo = await web3Provider.getNetwork()
    get().getDPrimeBalance()
    if (networkInfo.chainId === rinkeby_testnet_id) {
      get().getUSDCBalance()
    } else {
      set(
        produce((state: IAppStore) => {
          state.balances.usdc = '0.0'
        })
      )
    }
  },
  approveUSDC: async (amount: string) => {
    let res = await connectedContracts.usdc.approve(rinkeby_testnet_addresses.USDCJoin, amount)
    let txComplete = await res.wait()
    console.log(txComplete)
    return txComplete
  },
  estimateTeleportFees: async () => {
    let web3Provider = new ethers.providers.Web3Provider(await get().gateway?.detectProvider())
    let networkInfo = await web3Provider.getNetwork()

    const accounts = await web3Provider.listAccounts()

    //TODO: Make this much more elegant
    if (networkInfo.chainId === rinkeby_testnet_id) {
      let teleportFee = await connectedContracts.dPrime.estimateSendFee(
        LayerZeroChainIds.moonbase,
        accounts[0],
        utils.fwad('10'), //Convert from decimal number (type: string still) into 18 dec amount
        false,
        []
      )

      set(
        produce((state: IAppStore) => {
          state.teleportFees.moonbase = utils.pwad(teleportFee.nativeFee)
        })
      )
    } else if (networkInfo.chainId === moonbase_testnet_id) {
      let teleportFee = await connectedContracts.dPrime.estimateSendFee(
        LayerZeroChainIds.rinkeby_testnet,
        accounts[0],
        utils.fwad('10'), //Convert from decimal number (type: string still) into 18 dec amount
        false,
        []
      )

      set(
        produce((state: IAppStore) => {
          state.teleportFees.rinkeby = utils.pwad(teleportFee.nativeFee)
        })
      )
    }
  }
}))
