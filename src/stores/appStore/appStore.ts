import { ethers } from 'ethers'
import produce from 'immer'
import create from 'zustand'
import { LayerZeroChainIds, moonbase_addresses, moonbase_testnet_id, rinkeby_testnet_addresses, rinkeby_testnet_id } from '../../constants/config'
import Metamask from './../../wallet/metamask'
import { IAppStore } from './IAppStore'
import { ISupportedNetwork } from './ISupportedNetwork'
import { IWalletProvider } from './IWalletProvider'
import { IContractInstances } from './IContractInstances'

import dPrimeAbi from '../../constants/abis/dPrime.json'
import dPrimeJoinAbi from '../../constants/abis/dPrimeJoin.json'
import LMCVAbi from '../../constants/abis/LMCV.json'
import LMCVProxyAbi from '../../constants/abis/LMCVProxy.json'
import CollateralJoinAbi from '../../constants/abis/CollateralJoin.json'
import CollateralJoinDecAbi from '../../constants/abis/CollateralJoinDecimals.json'
import PSMAbi from '../../constants/abis/PSM.json'
import ERC20Abi from '../../constants/abis/ERC20.json'
import { IBalances } from './IBalances'


export const supportedNetworks = [
  // { name: 'Moonbeam', symbol: 'GLMR', chainId: '0x504', id: 1284, iconName: 'moonbeamneticon.png' },
  // { name: 'Ethereum', symbol: 'ETH', chainId: '0x1', id: 1, iconName: 'ethneticon.png' },
  { name: 'Moonbase', symbol: 'MDEV', chainId: '0x507', id: 1287, iconName: 'moonbeamneticon.png' },
  { name: 'Rinkeby', symbol: 'RETH', chainId: '0x4', id: 4, iconName: 'ethneticon.png' }
]

function fwad(wad: string) { return ethers.utils.parseEther(wad) }
function fusdc(wad: string) { return ethers.utils.parseEther(wad).div("1000000000000")}
function pwad(wad: string) {return ethers.utils.formatUnits(wad, 18)}
//BYTES
let USDCBytes = ethers.utils.formatBytes32String("PSM-USDC");

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


const connectedContracts = {} as IContractInstances
const initBalances = {} as IBalances

export const useAppStore = create<IAppStore>((set, get) => ({
  supportedNetworks,
  selectedNetwork: supportedNetworks[0],
  walletProvider: initialWalletProvider,
  metamask: new Metamask(),
  portfolio: null,
  balances: initBalances,
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

    initialWalletProvider.web3Provider = web3Provider;
    initialWalletProvider.accounts = await web3Provider.listAccounts();

    get().metamask.subscribeEvents(provider, (data: any) => {
      get().setWalletProvider(data)
    })

    const walletData = { provider, web3Provider, chainId, connectWallet: get().connectWallet }
    get().setWalletProvider(walletData as any)
    get().autoConnect(web3Provider)
    get().attachContracts(web3Provider)
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
    get().attachContracts(new ethers.providers.Web3Provider(await get().metamask.detectProvider()));
  },
  attachContracts: async (web3Provider: ethers.providers.Web3Provider) => {
    const accounts = await web3Provider.listAccounts()
    const networkInfo = await web3Provider.getNetwork();

    const signer = web3Provider.getSigner();

    if(networkInfo.chainId == rinkeby_testnet_id){
      console.log("Rinkeby attach")
      
      connectedContracts.lmcv       = new ethers.Contract(rinkeby_testnet_addresses.LMCV, LMCVAbi, signer);
      connectedContracts.lmcvProxy  = new ethers.Contract(rinkeby_testnet_addresses.LMCVProxy, LMCVProxyAbi, signer);
      connectedContracts.dPrime     = new ethers.Contract(rinkeby_testnet_addresses.dPrime, dPrimeAbi, signer);
      connectedContracts.dPrimeJoin = new ethers.Contract(rinkeby_testnet_addresses.dPrimeJoin, dPrimeJoinAbi, signer);
      connectedContracts.usdc       = new ethers.Contract(rinkeby_testnet_addresses.USDC, ERC20Abi, signer);
      connectedContracts.usdcJoin   = new ethers.Contract(rinkeby_testnet_addresses.USDCJoin, CollateralJoinDecAbi, signer);
      connectedContracts.usdcPSM    = new ethers.Contract(rinkeby_testnet_addresses.USDCPSM, PSMAbi, signer);
      
    }else if(networkInfo.chainId == moonbase_testnet_id){
      console.log("Moonbase attach")

      //Only dPrime deployed moonbase
      connectedContracts.dPrime     = new ethers.Contract(moonbase_addresses.dPrime, dPrimeAbi, signer);

    }else {
      console.log("LMCV Not implemented yet");
    }

    get().getDPrimeBalance()
    if(networkInfo.chainId == rinkeby_testnet_id) {
      get().getUSDCBalance()
    }
  },
  teleport: async (dPrimeAmount: string, dstChainName: string) => {

    let web3Provider = new ethers.providers.Web3Provider(await get().metamask.detectProvider())
    let networkInfo = await web3Provider.getNetwork();
    let teleportFee;

    const accounts = await web3Provider.listAccounts()

    //TODO: Make this much more elegant
    let dstChainId = "0";
    if(dstChainName == "Moonbase"){
      dstChainId = LayerZeroChainIds.moonbase;
    }else if(dstChainName == "Rinkeby"){
      dstChainId = LayerZeroChainIds.rinkeby_testnet;
    }

    console.log(dstChainName)
    console.log(dPrimeAmount)
    console.log(dstChainId)

    teleportFee = await connectedContracts.dPrime.estimateSendFee(
      dstChainId,
      accounts[0],
      fwad(dPrimeAmount), //Convert from decimal number (type: string still) into 18 dec amount
      false,
      []
    );

    await connectedContracts.dPrime.sendFrom(
      accounts[0],                      //address _from, 
      dstChainId,                       //uint16 _dstChainId,
      accounts[0],                      //bytes memory _toAddress,
      fwad(dPrimeAmount),               //uint _amount, 
      accounts[0],                      //address payable _refundAddress, 
      accounts[0],                      //address _zroPaymentAddress, 
      [],                               //bytes memory _adapterParams
      {value: teleportFee.nativeFee}
    );
  },
  getDPrimeBalance: async () => {
    let web3Provider = new ethers.providers.Web3Provider(await get().metamask.detectProvider(), 'any')
    const accounts = await web3Provider.listAccounts()
    let balance = await connectedContracts.dPrime.balanceOf(accounts[0])
    let formatedBalance = ethers.utils.formatUnits(balance, 18)
    set(
      produce((state: IAppStore) => {
        state.balances.dPrime = formatedBalance
      })
    )
  },
  getUSDCBalance: async () => {
    let web3Provider = new ethers.providers.Web3Provider(await get().metamask.detectProvider(), 'any')
    const accounts = await web3Provider.listAccounts()
    let balance  = await connectedContracts.usdc.balanceOf(accounts[0])
    let formatedBalance = ethers.utils.formatUnits(balance, 6)
    set(
      produce((state: IAppStore) => {
        state.balances.usdc = formatedBalance
      })
    )
  },
  stableSwap: async (amount: string) => {
    if(amount == "0"){
      return
    }
    let formattedAmount = fusdc(amount).toString();
    let web3Provider = new ethers.providers.Web3Provider(await get().metamask.detectProvider())
    const accounts = await web3Provider.listAccounts()

    console.log(connectedContracts.usdc.address);
    const allowance = await connectedContracts.usdc.allowance(accounts[0], rinkeby_testnet_addresses.USDCJoin)

    if(allowance < formattedAmount){
      console.log("Allowance: " + allowance)
      get().approveUSDC(formattedAmount).then((data: any) =>{
        connectedContracts.usdcPSM.createDPrime(accounts[0], [USDCBytes], [formattedAmount])
      });
    }else{
      await connectedContracts.usdcPSM.createDPrime(accounts[0], [USDCBytes], [formattedAmount])
    }
    console.log("Amount: " + formattedAmount);

   

  },
  approveUSDC: async (amount: string) => {
    let web3Provider = new ethers.providers.Web3Provider(await get().metamask.detectProvider())
    const accounts = await web3Provider.listAccounts()

    let res = await connectedContracts.usdc.approve(rinkeby_testnet_addresses.USDCJoin, amount);
    let txComplete = await res.wait()
    console.log(txComplete)
    return txComplete
  }

}))
