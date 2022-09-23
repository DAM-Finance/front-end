import { ethers } from 'ethers'
import produce from 'immer'
import create from 'zustand'
import { LayerZeroChainIds, moonbase_addresses, moonbase_testnet_id, rinkeby_testnet_addresses, rinkeby_testnet_id } from '../../constants/config'
import Metamask from './../../wallet/metamask'
import { IAppStore } from './IAppStore'
import { ISupportedNetwork } from './ISupportedNetwork'
import { IWalletProvider } from './IWalletProvider'

import dPrimeAbi from '../../constants/abis/dPrime.json'
import LMCVAbi from '../../constants/abis/LMCV.json'
import LMCVProxyAbi from '../../constants/abis/LMCVProxy.json'
import CollateralJoinAbi from '../../constants/abis/CollateralJoin.json'
import CollateralJoinDec from '../../constants/abis/CollateralJoinDecimals.json'
import PSMAbi from '../../constants/abis/PSM.json'

export const supportedNetworks = [
  // { name: 'Moonbeam', symbol: 'GLMR', chainId: '0x504', id: 1284, iconName: 'moonbeamneticon.png' },
  // { name: 'Ethereum', symbol: 'ETH', chainId: '0x1', id: 1, iconName: 'ethneticon.png' },
  { name: 'Moonbase', symbol: 'MDEV', chainId: '0x507', id: 1287, iconName: 'moonbeamneticon.png' },
  { name: 'Rinkeby', symbol: 'RETH', chainId: '0x4', id: 4, iconName: 'ethneticon.png' }
]

function fwad(wad: string) { return ethers.utils.parseEther(wad) }

const initialWalletProvider = {
  metamask: null,
  provider: null,
  web3Provider: null,
  connectedToChain: false,
  chainId: '',
  accounts: [],
  connected: false,
  connectWallet: async () => false
} as IWalletProvider

let dPrimeContract;



export const useAppStore = create<IAppStore>((set, get) => ({
  supportedNetworks,
  selectedNetwork: supportedNetworks[0],
  walletProvider: initialWalletProvider,
  metamask: new Metamask(),
  portfolio: null,
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
  setWalletProvider: (wallet: Partial<IWalletProvider>) =>
    set(
      produce((state: IAppStore) => {
        Object.keys(wallet).forEach((key) => {
          state.walletProvider[key as keyof IWalletProvider] = wallet[key as keyof IWalletProvider] as never
        })
        state.walletProvider.connected = !!state.walletProvider.accounts?.length
        if (state.walletProvider.connected) {
          state.portfolio = {
            dPrime: 15347,
            cushion: 21,
            portfolioValue: 23324
          }
        } else {
          state.portfolio = null
        }
      })
    ),

  // Move to a Wallet service?
  connectWallet: async () => {
    const accounts = await get().metamask.connect(get().walletProvider.provider)
    get().setWalletProvider({ accounts } as any)
  },
  setupWallet: async () => {
    const provider = await get().metamask.detectProvider()
    const chainId = await get().metamask.getChainId(provider)
    const web3Provider = new ethers.providers.Web3Provider(provider)

    


    get().metamask.subscribeEvents(provider, (data: any) => {
      get().setWalletProvider(data)
    })

    const walletData = { provider, web3Provider, chainId, connectWallet: get().connectWallet }
    get().setWalletProvider(walletData as any)
    get().autoConnect(web3Provider)
    get().attachDPrime(web3Provider)
  },
  autoConnect: async (web3Provider: ethers.providers.Web3Provider) => {
    const accounts = await web3Provider.listAccounts()

    if (!accounts.length) {
      return
    }
    get().connectWallet()
  },
  switchNetwork: async (chainId: string) => {
    const metamask = get().metamask
    const provider = get().walletProvider.provider

    await metamask.switchNetwork(provider, chainId)
  },
  attachDPrime: async (web3Provider: ethers.providers.Web3Provider) => {

    let networkInfo = await web3Provider.getNetwork();
    let balance;
    let teleportFee;

    const accounts = await web3Provider.listAccounts()

    if(networkInfo.chainId == rinkeby_testnet_id){
      console.log("Connected dPrime to Rinkeby");
      dPrimeContract = new ethers.Contract(rinkeby_testnet_addresses.dPrime, dPrimeAbi, web3Provider);
      balance = await dPrimeContract.balanceOf(accounts[0]);

      teleportFee = await dPrimeContract.estimateSendFee(
        LayerZeroChainIds.rinkeby_testnet,
        accounts[0],
        fwad("10"),
        false,
        []
      );

    }else if(networkInfo.chainId == moonbase_testnet_id){
      console.log("Connected dPrime to MOONBASE");
      dPrimeContract = new ethers.Contract(moonbase_addresses.dPrime, dPrimeAbi, web3Provider);
      balance = await dPrimeContract.balanceOf(accounts[0]);
      
      teleportFee = await dPrimeContract.estimateSendFee(
        LayerZeroChainIds.rinkeby_testnet,
        accounts[0],
        fwad("10"),
        false,
        []
      );

    }else {
      console.log("No ChainId");
    }

    console.log(balance.div("1000000000000000000").toString());
    console.log(teleportFee.nativeFee.toString());

  }
}))
