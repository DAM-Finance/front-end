import { ethers } from 'ethers'
import { ISupportedNetwork } from './ISupportedNetworks'
import { ISupportedTokensMap } from './ISupportedToken'

export const scanUrlMask = 'DAM__TX__ADDRESS'
export const scanOriginLzIdMask = 'DAM__ORIGIN__LZ__ID'
export const scanDestinationLzIdMask = 'DAM__DESTINATION__LZ__ID'
export const scanOriginLzPipeMask = 'DAM__ORIGIN__LZPIPE'
export const scanDestinationLzPipeMask = 'DAM__DESTINATION__LZPIPE'
export const scanNonceMask = 'DAM__NONCE'
export const isDev = false
export const supportedNetworks: ISupportedNetwork[] = [
  {
    name: 'Fuji',
    symbol: 'AVAX',
    chainId: '0xa869',
    id: 43113,
    iconName: 'moonbeamneticon.svg',
    teleportBgImg: 'moonbase-bg.png',
    addresses: {
      dPrime: '0xcD6f577169c95411299ED5CfB6F6D0A7b07E4B9c', // d2o
      dPrimeGuardian: '0x56c98a952B4eb9A8Ae02aAa595de0D44dE18e1e5',
      lzPipe: '0x4e6AE3f1Aa290ecb392Daec7ADb1b3826Ffe677e'.toLowerCase(), // LayerZeroPipe
      hyperlanePipe: ''
    },
    layerZeroChainIds: '10106',
    suggestedGasLimit: 400000,
    capabilities: {
      canSwap: false,
      canTeleport: true,
      hasUsdc: false
    },
    scanUrl: `https://testnet.snowtrace.io/tx/${scanUrlMask}`,
    scanLz: `https://layerzeroscan.com/${scanOriginLzIdMask}/address/${scanOriginLzPipeMask}/message/${scanDestinationLzIdMask}/address/${scanDestinationLzPipeMask}/nonce/${scanNonceMask}`,
    default: false,
    addNetworkData: {
      chainId: '0xa869',
      chainName: 'Fuji',
      nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
      },
      rpcUrls: ['https://endpoints.omniatech.io/v1/avax/fuji/public'],
      blockExplorerUrls: ['https://testnet.snowtrace.io/']
    }
  },
  {
    name: 'Sepolia',
    symbol: 'ETH',
    chainId: '0xAA36A7',
    id: 11155111,
    iconName: 'ethneticon.png',
    teleportBgImg: 'goerli-bg.png',
    addresses: {
      dPrime: '0xFE0b8fc2247515374F4D261ae5DcAE95eb3D93d0', // d2O
      dPrimeJoin: '0x2be88c9324B67Cb2e84B4d78740FD7DbAEB9755E', // d2O Join
      dPrimeGuardian: '0xcD6f577169c95411299ED5CfB6F6D0A7b07E4B9c',
      lmcv: '0x2deF13E0DBF40190660c8682A6E03f19F481F5A2',
      lmcvProxy: '0x5921eC92D08B67e92FbdA21Cd0Ea062859e9078d',
      lzPipe: '0x56c98a952B4eb9A8Ae02aAa595de0D44dE18e1e5'.toLowerCase(), // lzPipe / LayerZeroPipe
      hyperlanePipe: '',
      usdcPSM: '0xDC93a8cA7486e97a1ae969266898777526221bA4', // PSM

      usdc: '0x4e7Ff8F3Dadd7cC40cA019c987ab252d80da7E34', // '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
      usdcJoin: '0x935C486825FE0C433259Ad9D9b4Bb3D46ADbb239', //DEC COLLAT JOIN contract

      weth: '', // '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      wethJoin: '', // '0x3685328d43EC3F5F3efD3c61E05cDdD037aab949',
      link: '', // '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      linkJoin: '' // '0xbb2EbebC17CAf0cD430965912632615aF9611273',
    },
    layerZeroChainIds: '10161',
    suggestedGasLimit: 400000,
    capabilities: {
      canSwap: true,
      canTeleport: true,
      hasUsdc: true
    },
    scanUrl: `https://sepolia.etherscan.io/tx/${scanUrlMask}`,
    scanLz: `https://layerzeroscan.com/${scanOriginLzIdMask}/address/${scanOriginLzPipeMask}/message/${scanDestinationLzIdMask}/address/${scanDestinationLzPipeMask}/nonce/${scanNonceMask}`,
    default: true,
    addNetworkData: {
      chainId: '0xAA36A7',
      chainName: 'Sepolia',
      nativeCurrency: {
        name: 'SepoliaETH',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://rpc.sepolia.org/'],
      blockExplorerUrls: ['https://sepolia.etherscan.io']
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
    name: 'Test usdc',
    symbol: 'USDC',
    units: 6,
    imgUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    bytes: ethers.utils.formatBytes32String('PSM-USDC')
  }
}

export const estimateForBurnFee: number = 0.7444444
export const burnFee: number = 0.75002
