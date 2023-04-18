import { ethers } from 'ethers'
import { ISupportedNetwork } from './ISupportedNetworks'
import { ISupportedTokensMap } from './ISupportedToken'
import { ChainMetadata } from '@hyperlane-xyz/sdk'

export const scanUrlMask = 'DAM__TX__ADDRESS'
export const scanOriginLzIdMask = 'DAM__ORIGIN__LZ__ID'
export const scanDestinationLzIdMask = 'DAM__DESTINATION__LZ__ID'
export const scanOriginLzPipeMask = 'DAM__ORIGIN__LZPIPE'
export const scanDestinationLzPipeMask = 'DAM__DESTINATION__LZPIPE'
export const scanNonceMask = 'DAM__NONCE'
export const isDev = false
export const supportedNetworks: ISupportedNetwork[] = [
  {
    name: 'Moonbeam',
    symbol: 'GLMR',
    chainId: '0x504',
    id: 1284,
    iconName: 'moonbeamneticon.svg',
    teleportBgImg: 'moonbase-bg.png',
    addresses: {
      dPrime: '0xc806B0600cbAfA0B197562a9F7e3B9856866E9bF', // d2o
      dPrimeGuardian: '0x05533EA9B9F37daA890512d8a2DD5b853620819e',
      lzPipe: '0xDd92aF2acb2Dd66Abe5C2023c7D446989DF0af53'.toLowerCase(), // LayerZeroPipe
      hyperlanePipe: '0xbA3CE03A101980B624550E3554d6Eb9b9E87384c'
    },
    layerZeroChainIds: '126',
    hyperlaneChainId: '1284',
    suggestedGasLimit: 400000,
    capabilities: {
      canSwap: false,
      canTeleport: true,
      hasUsdc: false
    },
    scanUrl: `https://moonscan.io/tx/${scanUrlMask}`,
    scanLz: `https://layerzeroscan.com/${scanOriginLzIdMask}/address/${scanOriginLzPipeMask}/message/${scanDestinationLzIdMask}/address/${scanDestinationLzPipeMask}/nonce/${scanNonceMask}`,
    default: false,
    addNetworkData: {
      chainId: '0x504',
      chainName: 'Moonbeam',
      nativeCurrency: {
        name: 'GLMR',
        symbol: 'GLMR',
        decimals: 18
      },
      rpcUrls: ['https://rpc.api.moonbeam.network'],
      blockExplorerUrls: ['https://moonscan.io/']
    }
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    chainId: '0x1',
    id: 1,
    iconName: 'ethneticon.png',
    teleportBgImg: 'goerli-bg.png',
    addresses: {
      dPrime: '0x2FdA8c6783Aa36BeD645baD28a4cDC8769dCD252', // d2O
      dPrimeJoin: '0x687007C510Cd174f815cdaDA4De51d66BA73544d', // d2O Join
      dPrimeGuardian: '0x88E4B42e9eB353AE91F32025631df7fCC6BcCDC2',
      lmcv: '0xc806B0600cbAfA0B197562a9F7e3B9856866E9bF',
      lmcvProxy: '0xDd92aF2acb2Dd66Abe5C2023c7D446989DF0af53',
      lzPipe: '0x78D7480aFcB1c2310917fDa95e96cA4E1C06CcfF'.toLowerCase(), // lzPipe / LayerZeroPipe
      usdcPSM: '0x68A8A1C3e103d9b8e568B061357ec2eAe87Bf396', // PSM

      usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
      usdcJoin: '0xB1fbcD7415F9177F5EBD3d9700eD5F15B476a5Fe', //DEC COLLAT JOIN contract

      hyperlanePipe: '0x20Df9e3cE5390C13747119cA353a932131CD1363',
      hypIGPImpl: '0x5c808421b8D6c048888a95C01724F996a436fD4D',
      hypISM: '0x7CD5f5ab54f30F9a69Aed10c123683FDeD5d179e',
      hypGasOracle: '0xB25040907bD1Ca26b9492A90b314C48741887Ddb',

      weth: '', // '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      wethJoin: '', // '0x3685328d43EC3F5F3efD3c61E05cDdD037aab949',
      link: '', // '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      linkJoin: '' // '0xbb2EbebC17CAf0cD430965912632615aF9611273',
    },
    layerZeroChainIds: '101',
    hyperlaneChainId: '1',
    suggestedGasLimit: 400000,
    capabilities: {
      canSwap: true,
      canTeleport: true,
      hasUsdc: true
    },
    scanUrl: `https://etherscan.io/tx/${scanUrlMask}`,
    scanLz: `https://layerzeroscan.com/${scanOriginLzIdMask}/address/${scanOriginLzPipeMask}/message/${scanDestinationLzIdMask}/address/${scanDestinationLzPipeMask}/nonce/${scanNonceMask}`,
    default: true,
    addNetworkData: {
      chainId: '0x1',
      chainName: 'Ethereum',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://mainnet.infura.io/v3/'],
      blockExplorerUrls: ['https://etherscan.io']
    }
  },
  {
    name: 'Astar',
    symbol: 'ASTR',
    chainId: '0x250',
    id: 592,
    iconName: 'astar_icon.png', //TODO
    teleportBgImg: 'the_astar.png', //TODO
    addresses: {
      dPrime: '0xc806B0600cbAfA0B197562a9F7e3B9856866E9bF', // d2o
      dPrimeGuardian: '0xDd92aF2acb2Dd66Abe5C2023c7D446989DF0af53',
      lzPipe: '',
      hyperlanePipe: '0x8Dd69AF27489EE88CB1be4dF760FA36d6fA45AB4',
      hypProxyAdmin: '0x2FdA8c6783Aa36BeD645baD28a4cDC8769dCD252',
      hypIGPProxy: '0x687007C510Cd174f815cdaDA4De51d66BA73544d',
      hypIGPImpl: '0xb70b00a68e032ebFf1775Db1491550967F7E092C',
      hypISM: '0xB1fbcD7415F9177F5EBD3d9700eD5F15B476a5Fe',
      hypGasOracle: '0xcA1d6a964dfe209e8fB33614b0EFFdA9723232D7',

    },
    layerZeroChainIds: '',
    hyperlaneChainId: '417374',
    suggestedGasLimit: 400000,
    capabilities: {
      canSwap: false,
      canTeleport: true,
      hasUsdc: false
    },
    scanUrl: `https://blockscout.com/astar/tx/${scanUrlMask}`,
    scanLz: '',
    default: false,
    addNetworkData: {
      chainId: '0x250',
      chainName: 'Astar',
      nativeCurrency: {
        name: 'Astar',
        symbol: 'ASTR',
        decimals: 18
      },
      rpcUrls: ['https://astar.public.blastapi.io'],
      blockExplorerUrls: ['https://blockscout.com']
    }
  }
]

export const supportedTokens: ISupportedTokensMap = {
  dPrime: {
    name: 'Deuterium',
    symbol: 'd2o',
    units: 18,
    imgUrl: 'Twitter_d2o_rounded.png',
    bytes: '0x0'
  },
  usdc: {
    name: 'usdc',
    symbol: 'USDC',
    units: 6,
    imgUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    bytes: ethers.utils.formatBytes32String('PSM-USDC')
  }
}

export const estimateForBurnFee: number = 0.7444444
export const burnFee: number = 0.75002

export const astarHyperlaneMetadata: ChainMetadata = {
  chainId: 592,
  /** Hyperlane domain, only required if differs from id above */
  domainId: 417374,
  name: "astar",
  displayName: "Astar",
  displayNameShort: "ASTR",
  /** Default currency/token used by chain */
  nativeToken: {
      name: "Astar",
      symbol: "ASTR",
      decimals: 18,
  },
  /** Collection of RPC endpoints */
  publicRpcUrls: [{
    http: "https://astar.public.blastapi.io",
  }],
  blockExplorers: [{
    name: "Blockscout",
    url: "https://blockscout.com/astar",
  }],
  blocks: {
      /** Number of blocks to wait before considering a transaction confirmed */
      confirmations: 1,
      /** Number of blocks before a transaction has a near-zero chance of reverting */
      reorgPeriod: 1,
      /** Rough estimate of time per block in seconds */
      estimateBlockTime: 12,
  },
  /** The CoinGecko API sometimes expects IDs that do not match ChainNames */
  gasCurrencyCoinGeckoId: "astar",
  /** Is chain a testnet or a mainnet */
  isTestnet: false
}