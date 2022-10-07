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
import Metamask from './../../wallet/metamask'
import { IAppStore } from './IAppStore'
import { IBalances } from './IBalances'
import { IContractInstances } from './IContractInstances'
import { IGateway } from './IGateway'
import { initialWalletProvider, IWalletProvider } from './IWalletProvider'

import CollateralJoinDecAbi from '../../constants/abis/CollateralJoinDecimals.json'
import dPrimeAbi from '../../constants/abis/dPrime.json'
import dPrimeJoinAbi from '../../constants/abis/dPrimeJoin.json'
import ERC20Abi from '../../constants/abis/ERC20.json'
import LMCVAbi from '../../constants/abis/LMCV.json'
import LMCVProxyAbi from '../../constants/abis/LMCVProxy.json'
import PSMAbi from '../../constants/abis/PSM.json'
import { ISupportedNetwork } from '../../constants/ISupportedNetworks'
import utils from '../../constants/utils'
import { IGatewayEvent } from './IGatewayEvent'

//BYTES
let USDCBytes = ethers.utils.formatBytes32String('PSM-USDC')
const connectedContracts = {} as IContractInstances | any
const initBalances = {} as IBalances
// const initTeleportFees = {} as ITeleportFees

const abis = {
  usdcJoin: CollateralJoinDecAbi,
  dPrime: dPrimeAbi,
  dPrimeJoin: dPrimeJoinAbi,
  usdc: ERC20Abi,
  lmcv: LMCVAbi,
  lmcvProxy: LMCVProxyAbi,
  usdcPSM: PSMAbi
} as any

export const useAppStore = create<IAppStore>((set, get) => ({
  selectedNetwork: supportedNetworks[0],
  walletProvider: initialWalletProvider,
  gateway: null,
  portfolio: null,
  balances: initBalances,
  teleportFees: '0',
  showConnectingWalletPopup: false,
  isWrongNetworkPopupEnabled: true,
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
  setShowConnectingWalletPopup: (isConnecting: boolean) => {
    set(
      produce((state: IAppStore) => {
        state.showConnectingWalletPopup = isConnecting
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
    get().setShowConnectingWalletPopup(true)
    const accounts = await get().gateway?.connect(get().walletProvider.provider)
    get().setWalletProvider({ accounts })
    get().attachContracts()
    get().updateBalances()
  },
  refreshNetwork: async () => {
    const network = await get().walletProvider!.web3Provider!.getNetwork() // update network?
    const selectedNetwork = supportedNetworks.find((supportedNetwork) => supportedNetwork.id === network.chainId)
    get().setSelectedNetwork(selectedNetwork!)
  },
  gatewayEventHandler: async (event: IGatewayEvent) => {
    // TODO: refactor (dry)
    const newEvent: Partial<IGatewayEvent> = event
    switch (event.type) {
      case 'chainChanged':
        await get().refreshNetwork()
        get().setIsWrongNetworkPopupEnabled(true)
        if (!get().selectedNetwork) {
          return
        }
        get().attachContracts()
        get().updateBalances()
        return
      case 'connect':
        get().setShowConnectingWalletPopup(false)
        delete newEvent.type
        get().setWalletProvider(newEvent)
        return
      case 'disconnect':
        delete newEvent.type
        get().setWalletProvider(newEvent)
        return
      case 'accountsChanged':
        get().setShowConnectingWalletPopup(false)
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
    const network = await web3Provider.getNetwork()
    const signer = web3Provider.getSigner()
    get().gateway?.subscribeEvents(provider, get().gatewayEventHandler)

    const walletData: Partial<IWalletProvider> = { provider, web3Provider, chainId, network, signer }
    if (accounts) {
      walletData.accounts = accounts
    }

    get().setWalletProvider(walletData)
    await get().refreshNetwork()
    if (!get().selectedNetwork) {
      return
    }

    get().attachContracts()
    // get().updateBalances()
  },
  switchNetwork: async (chainId: string) => {
    const provider = get().walletProvider.provider
    await get().gateway?.switchNetwork(provider, chainId)
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

    get().estimateTeleportFees()
  },
  teleport: async (dPrimeAmount: string, dstChainName: string) => {
    await get().ensureConnected()
    const { accounts } = get().walletProvider

    let dstChainId = supportedNetworks.find((net) => net.name === dstChainName)?.layerZeroChainIds
    const teleportFee = await connectedContracts.dPrime.estimateSendFee(
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
    await get().getTokenBalance('dPrime')
    if (get().selectedNetwork?.name === 'Rinkeby') {
      get().getTokenBalance('usdc')
    } else {
      get().setBalances('usdc', '0.0')
    }
  },
  getTokenBalance: async (token: keyof typeof supportedTokens) => {
    const account = get().walletProvider.accounts[0]
    const units = supportedTokens[token].units

    let balance = await connectedContracts[token].balanceOf(account)
    let formatedBalance = ethers.utils.formatUnits(balance, units)
    get().setBalances(token, formatedBalance)
  },
  stableSwap: async (amount: string) => {
    await get().ensureConnected()

    if (amount === '0' || !get().selectedNetwork) {
      return
    }

    let formattedAmount = utils.fusdc(amount).toString()
    const { accounts } = get().walletProvider

    const allowance = await connectedContracts.usdc.allowance(accounts[0], get().selectedNetwork?.addresses.usdcJoin)
    let txWait
    if (allowance < formattedAmount) {
      get()
        .approveUSDC(formattedAmount)
        .then((data: any) => {
          txWait = connectedContracts.usdcPSM.createDPrime(accounts[0], [USDCBytes], [formattedAmount])
        })
    } else {
      txWait = await connectedContracts.usdcPSM.createDPrime(accounts[0], [USDCBytes], [formattedAmount])
    }
    await txWait.wait()

    get().updateBalances()
  },
  // Remove and replace by generic approveToken
  approveUSDC: async (amount: string) => {
    let res = await connectedContracts.usdc.approve(get().selectedNetwork?.addresses?.usdcJoin, amount)
    let txComplete = await res.wait()
    return txComplete
  },
  approveToken: async (amount: string, token: keyof typeof supportedTokens, tokenJoin: string) => {
    const joinContract = (get().selectedNetwork?.addresses as any)[tokenJoin]
    let res = await connectedContracts[token].approve(joinContract, amount)
    let txComplete = await res.wait()
    return txComplete
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
  }
}))
