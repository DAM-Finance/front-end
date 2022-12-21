import { IPendingTransaction } from './../../constants/IPendingTransaction'
import { ethers } from 'ethers'
import produce from 'immer'
import create from 'zustand'
import {
  // LayerZeroChainIds,
  // moonbase_addresses,
  // moonbase_testnet_id,
  // rinkeby_testnet_addresses,
  // rinkeby_testnet_id,
  supportedNetworks,
  supportedTokens
} from '../../constants/config'
import { ISupportedNetworkAddresses } from './../../constants/ISupportedNetworks'
import Metamask from './../../wallet/metamask'
import { IAppStore } from './IAppStore'
import { IBalances } from './IBalances'
import { IContractInstances } from './IContractInstances'
import { IGateway } from './IGateway'
import { initialWalletProvider, IWalletProvider } from './IWalletProvider'

import CollateralJoinDecAbi from '../../constants/abis/CollateralJoinDecimals.json'
import dPrimeAbi from '../../constants/abis/dPrime.json'
import dPrimeJoinAbi from '../../constants/abis/dPrimeJoin.json'
import dPrimeGuardianAbi from '../../constants/abis/dPrimeGuardian.json'
import usdcAbi from '../../constants/abis/usdc.json'
import LMCVAbi from '../../constants/abis/LMCV.json'
import LMCVProxyAbi from '../../constants/abis/LMCVProxy.json'
import LZPipeAbi from '../../constants/abis/LZPipe.json'
import hyperlanePipeAbi from '../../constants/abis/hyperlanePipe.json'
import PSMAbi from '../../constants/abis/PSM.json'
import { ISupportedNetwork } from '../../constants/ISupportedNetworks'
import { localStorageObjects } from '../../constants/persist'
import utils from '../../constants/utils'
import { IGatewayEvent } from './IGatewayEvent'

//BYTES
// let USDCBytes = ethers.utils.formatBytes32String('PSM-USDC')
const connectedContracts = {} as IContractInstances | any
const initBalances: IBalances = { dPrime: '0', usdc: '0' }
const maxApprove = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
const minApprove = 10000000000

// const initTeleportFees = {} as ITeleportFees

const abis = {
  usdcJoin: CollateralJoinDecAbi,
  dPrime: dPrimeAbi,
  dPrimeJoin: dPrimeJoinAbi,
  dPrimeGuardian: dPrimeGuardianAbi,
  usdc: usdcAbi,
  lmcv: LMCVAbi,
  lmcvProxy: LMCVProxyAbi,
  usdcPSM: PSMAbi,
  lzPipe: LZPipeAbi,
  hyperlanePipe: hyperlanePipeAbi
} as any

export const useAppStore = create<IAppStore>((set, get) => ({
  selectedNetwork: null,
  walletProvider: initialWalletProvider,
  gateway: null,
  portfolio: null,
  balances: initBalances,
  teleportFees: '0',
  analytics: null,
  showWaitingForConfirmation: false,
  isWrongNetworkPopupEnabled: true,
  pendingTransactions: localStorage.getItem(localStorageObjects.pendingTxs) ? JSON.parse(localStorage.getItem(localStorageObjects.pendingTxs)!) : [],
  historyTransactions: localStorage.getItem(localStorageObjects.historyTxs) ? JSON.parse(localStorage.getItem(localStorageObjects.historyTxs)!) : [],
  notifyTransaction: null,
  isPendingTransactionsVisible: false,
  isHistoryTransactionsVisible: false,

  setNotifyTransaction: (tx) => {
    set(
      produce((state: IAppStore) => {
        state.notifyTransaction = tx
      })
    )
  },
  setSelectedNetwork: (network: ISupportedNetwork) => {
    set(
      produce((state: IAppStore) => {
        state.selectedNetwork = network
      })
    )
  },
  setPortfolio: (data: any) => {
    set(
      produce((state: IAppStore) => {
        state.portfolio = data
      })
    )
  },
  setGateway: (gateway: IGateway) => {
    set(
      produce((state: IAppStore) => {
        state.gateway = gateway
      })
    )
  },
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
  setTeleportFees: (fees: string) => {
    set(
      produce((state: IAppStore) => {
        state.teleportFees = fees
      })
    )
  },
  setBalances: (token: keyof typeof supportedTokens, balance: string) => {
    set(
      produce((state: IAppStore) => {
        state.balances[token] = balance
      })
    )
  },
  setShowWaitingForConfirmation: (isConnecting: boolean) => {
    set(
      produce((state: IAppStore) => {
        state.showWaitingForConfirmation = isConnecting
      })
    )
  },
  setIsWrongNetworkPopupEnabled: (isWrongNetwork: boolean) => {
    set(
      produce((state: IAppStore) => {
        state.isWrongNetworkPopupEnabled = isWrongNetwork
      })
    )
  },
  setAnalytics: (data: any) => {
    set(
      produce((state: IAppStore) => {
        state.analytics = data
      })
    )
  },
  setPendingTransactions: (data) => {
    set(
      produce((state: IAppStore) => {
        state.pendingTransactions = data
      })
    )
    localStorage.setItem(localStorageObjects.pendingTxs, JSON.stringify(get().pendingTransactions))
  },
  setHistoryTransactions: (data) => {
    set(
      produce((state: IAppStore) => {
        state.historyTransactions = data
      })
    )
    localStorage.setItem(localStorageObjects.historyTxs, JSON.stringify(get().historyTransactions))
  },
  pushHistoryTransaction: (tx: IPendingTransaction) => {
    const txs = get().historyTransactions.slice()
    const alreadyPushed = txs.findIndex((foundTx) => foundTx.hash === tx.hash) > -1
    if (alreadyPushed) return
    txs.unshift(tx)
    get().setHistoryTransactions(txs.slice(0, 10))
  },
  tooglePendingTransactions: () => {
    set(
      produce((state: IAppStore) => {
        if (!state.isPendingTransactionsVisible) {
          state.isHistoryTransactionsVisible = false
        }
        state.isPendingTransactionsVisible = !state.isPendingTransactionsVisible
      })
    )
  },
  toogleHistoryTransactions: () => {
    set(
      produce((state: IAppStore) => {
        if (!state.isHistoryTransactionsVisible) {
          state.isPendingTransactionsVisible = false
        }
        state.isHistoryTransactionsVisible = !state.isHistoryTransactionsVisible
      })
    )
  },
  // Might be extended to support new gateways
  chooseGateway: (): IGateway => {
    const gateway = new Metamask()
    return gateway
  },
  ensureConnected: async () => {
    if (!get().walletProvider.connected) {
      await get().connectWallet()
    }
  },
  connectWallet: async () => {
    try {
      localStorage.setItem(localStorageObjects.disconnected, 'false')
      const accounts = await get().gateway?.connect(get().walletProvider.provider)
      get().setWalletProvider({ accounts })
      get().attachContracts()
      get().updateBalances()
    } catch (err: any) {
      if (err.code === -32002) {
        alert('Wallet request pending!')
      }
    }
  },
  disconnectWallet: async () => {
    try {
      localStorage.setItem(localStorageObjects.disconnected, 'true')
      get().setWalletProvider({ accounts: [] })
    } catch (err: any) {
      console.error(err)
    }
  },
  refreshSelectedNetwork: async () => {
    const network = await get().walletProvider!.web3Provider!.getNetwork() // update network?
    const selectedNetwork = supportedNetworks.find((supportedNetwork) => supportedNetwork.id === network.chainId)
    get().setSelectedNetwork(selectedNetwork!)
  },
  gatewayEventHandler: async (event: IGatewayEvent) => {
    const newEvent: Partial<IGatewayEvent> = event
    switch (event.type) {
      case 'chainChanged':
        await get().refreshSelectedNetwork()
        get().setIsWrongNetworkPopupEnabled(true)
        if (!get().selectedNetwork) {
          return
        }
        get().attachContracts()
        get().updateBalances()
        return
      case 'connect':
        delete newEvent.type
        get().setWalletProvider(newEvent)
        return
      case 'disconnect':
        delete newEvent.type
        get().setWalletProvider(newEvent)
        return
      case 'accountsChanged':
        delete newEvent.type
        get().setWalletProvider(newEvent)
        get().updateBalances()
    }
  },
  initWeb3: async () => {
    if (!get().gateway) {
      const gateway = get().chooseGateway()
      get().setGateway(gateway)
    }

    const provider = await get().gateway?.detectProvider()
    if (!provider) {
      get().setWalletProvider({})
      return
    }
    const chainId = await get().gateway?.getChainId(provider)
    const web3Provider = new ethers.providers.Web3Provider(provider, 'any')
    const accounts = await web3Provider.listAccounts()
    const network = await web3Provider.getNetwork()
    const signer = web3Provider.getSigner()
    get().gateway?.subscribeEvents(provider, get().gatewayEventHandler)

    const walletData: Partial<IWalletProvider> = { provider, web3Provider, chainId, network, signer }
    if (accounts) {
      walletData.accounts = accounts
    }

    get().setWalletProvider(walletData)
    await get().refreshSelectedNetwork()
    if (!get().selectedNetwork) {
      return
    }

    get().attachContracts()
    get().updateBalances()

    if (localStorage.getItem(localStorageObjects.disconnected) === 'true') {
      get().setWalletProvider({ accounts: [] })
    }
  },
  switchNetwork: async (chainId: string) => {
    try {
      const provider = get().walletProvider.provider
      const res = await get().gateway?.switchNetwork(provider, chainId)
      return res
    } catch (err: any) {
      if (err.code === 4902) {
        const network = supportedNetworks.find((network) => network.chainId === chainId)
        if (!network) {
          console.error(err)
        }
        const provider = get().walletProvider.provider
        await get().gateway?.addNetworkToWallet(provider, network!.addNetworkData)
      }
    }
  },
  addDPrimeToWallet: async () => {
    const provider = get().walletProvider.provider
    await get().gateway?.addTokenToWallet(
      provider,
      get().selectedNetwork?.addresses.dPrime,
      supportedTokens.dPrime.symbol,
      supportedTokens.dPrime.units,
      supportedTokens.dPrime.imgUrl
    )
    const dprimeAddedWallet = JSON.parse(localStorage.getItem(localStorageObjects.DPrimeAddedWallet) || '{}')
    dprimeAddedWallet[get().selectedNetwork!.addresses.dPrime] = true
    localStorage.setItem(localStorageObjects.DPrimeAddedWallet, JSON.stringify(dprimeAddedWallet))
    return dprimeAddedWallet
  },
  attachContracts: async () => {
    if (!get().walletProvider.accounts || !get().walletProvider.accounts.length) {
      return
    }
    const addresses = get().selectedNetwork?.addresses as any

    if (!addresses) {
      return
    }

    Object.keys(addresses).forEach((addressKey) => {
      if (!abis[addressKey]) {
        return
      }
      connectedContracts[addressKey] = new ethers.Contract(addresses[addressKey], abis[addressKey], get().walletProvider.signer!)
    })
    // console.log(connectedContracts)
    // get().estimateTeleportFees()
  },
  teleport: async (dPrimeAmount: string, dstChainName: string) => {
    await get().ensureConnected()
    const { accounts } = get().walletProvider

    let dstChainId = supportedNetworks.find((net) => net.name === dstChainName)?.layerZeroChainIds
    const teleportFee = await connectedContracts.lzPipe.estimateSendFee(dstChainId, accounts[0], utils.fwad(dPrimeAmount), false, [])
    const gasLimit = get().selectedNetwork?.suggestedGasLimit
    return connectedContracts.lzPipe.sendFrom(
      accounts[0], //address _from,
      dstChainId, //uint16 _dstChainId,
      accounts[0], //bytes memory _toAddress,
      utils.fwad(dPrimeAmount), //uint _amount,
      accounts[0], //address payable _refundAddress,
      accounts[0], //address _zroPaymentAddress,
      [], //bytes memory _adapterParams
      { value: teleportFee.nativeFee, gasLimit: gasLimit }
    )
  },
  updateBalances: async () => {
    await get().updateTokenBalance('dPrime')
    if (get().selectedNetwork?.capabilities.hasUsdc) {
      await get().updateTokenBalance('usdc')
    }
  },
  getTokenBalance: async (token: keyof typeof supportedTokens): Promise<string> => {
    const account = get().walletProvider.accounts[0]
    if (!account || !connectedContracts[token]) {
      throw new Error('Can not get balance')
    }
    const units = supportedTokens[token].units

    let balance = await connectedContracts[token].balanceOf(account)
    let formatedBalance = ethers.utils.formatUnits(balance, units)
    return formatedBalance
  },
  updateTokenBalance: async (token: keyof typeof supportedTokens) => {
    const account = get().walletProvider.accounts[0]
    if (!account || !connectedContracts[token]) {
      return
    }
    const units = supportedTokens[token].units

    let balance = await connectedContracts[token].balanceOf(account)
    let formatedBalance = ethers.utils.formatUnits(balance, units)
    get().setBalances(token, formatedBalance)
  },
  swapStableToDPrime: async (token: keyof typeof supportedTokens, tokenPsm: string | undefined, amount: string) => {
    await get().ensureConnected()

    if (amount === '0' || !get().selectedNetwork || !get().walletProvider.connected) {
      return
    }

    const decimals = supportedTokens[token].units
    const swapAmount = ethers.utils.parseUnits(amount, decimals).toString()
    const tokenBytes = supportedTokens[token].bytes
    const { accounts } = get().walletProvider
    const gasLimit = get().selectedNetwork?.suggestedGasLimit
    return connectedContracts[tokenPsm as any].createD2O(accounts[0], [tokenBytes], [swapAmount], { gasLimit: gasLimit })
  },
  swapDPrimeToStable: async (token: keyof typeof supportedTokens, tokenPsm: string | undefined, amount: string) => {
    await get().ensureConnected()

    if (amount === '0' || !get().selectedNetwork || !get().walletProvider.connected) {
      return
    }

    const decimals = supportedTokens[token].units
    const swapAmount = ethers.utils.parseUnits(amount, decimals).toString()
    const tokenBytes = supportedTokens[token].bytes
    const { accounts } = get().walletProvider
    const gasLimit = get().selectedNetwork?.suggestedGasLimit
    return connectedContracts[tokenPsm as any].getCollateral(accounts[0], [tokenBytes], [swapAmount], { gasLimit: gasLimit })
  },
  tokenRequiresApproval: async (token: keyof typeof supportedTokens, tokenJoin: keyof ISupportedNetworkAddresses) => {
    const { accounts } = get().walletProvider
    const joinContract = get().selectedNetwork?.addresses[tokenJoin]
    if (!connectedContracts[token]) {
      throw new Error('Contracts not set')
    }
    const allowance = await connectedContracts[token].allowance(accounts[0], joinContract)
    return allowance < minApprove
  },
  approveToken: async (token: keyof typeof supportedTokens, tokenJoin: keyof ISupportedNetworkAddresses, amount = maxApprove) => {
    const joinContract = get().selectedNetwork?.addresses[tokenJoin]
    return connectedContracts[token].approve(joinContract, amount)
  },
  estimateTeleportFees: async () => {
    const { accounts } = get().walletProvider

    const teleportFee = await connectedContracts.dPrime.estimateSendFee(
      get().selectedNetwork!.layerZeroChainIds,
      accounts[0],
      utils.fwad('10'), //Convert from decimal number (type: string still) into 18 dec amount
      false,
      []
    )
    get().setTeleportFees(utils.pwad(teleportFee.nativeFee))
  },
  queryAnalytics: async () => {
    const data = await Promise.resolve({
      collateralRatio: '155%',
      tvl: {
        Ethereum: 0.8,
        Moonbeam: 1.1,
        Rinkeby: 0.4
      },
      dPrime: {
        Ethereum: 0.6,
        Moonbeam: 0.5,
        Rinkeby: 0.3
      }
    })
    get().setAnalytics(data)
    return data
  }
}))
