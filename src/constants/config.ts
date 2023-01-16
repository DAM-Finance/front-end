import { ethers } from 'ethers'
import { ISupportedNetwork } from './ISupportedNetworks'
import { ISupportedTokensMap } from './ISupportedToken'

export const scanUrlMask = 'DAM__TX__ADDRESS'
export const scanOriginLzIdMask = 'DAM__ORIGIN__LZ__ID'
export const scanDestinationLzIdMask = 'DAM__DESTINATION__LZ__ID'
export const scanOriginLzPipeMask = 'DAM__ORIGIN__LZPIPE'
export const scanDestinationLzPipeMask = 'DAM__DESTINATION__LZPIPE'
export const scanNonceMask = 'DAM__NONCE'
export const isDev = true
export const supportedNetworks: ISupportedNetwork[] = [
  {
    name: 'Moonbase',
    symbol: 'MDEV',
    chainId: '0x507',
    id: 1287,
    iconName: 'moonbeamneticon.svg',
    teleportBgImg: 'moonbase-bg.png',
    addresses: {
      dPrime: '0x607F26BC84035088e3AD308e6d9439Da507190dB',
      dPrimeGuardian: '0x05533EA9B9F37daA890512d8a2DD5b853620819e',
      lzPipe: '0xfd7243e3837Aa0a1Fd0ECa7DB0e7154e502Af191'.toLowerCase(),
      hyperlanePipe: '0xbA3CE03A101980B624550E3554d6Eb9b9E87384c'
    },
    layerZeroChainIds: '10126',
    suggestedGasLimit: 500000,
    capabilities: {
      canSwap: false,
      canTeleport: true,
      hasUsdc: false
    },
    scanUrl: `https://moonbase.moonscan.io/tx/${scanUrlMask}`,
    scanLz: `https://testnet.layerzeroscan.com/${scanOriginLzIdMask}/address/${scanOriginLzPipeMask}/message/${scanDestinationLzIdMask}/address/${scanDestinationLzPipeMask}/nonce/${scanNonceMask}`,
    default: false,
    addNetworkData: {
      chainId: '0x507',
      chainName: 'Moonbase Alpha',
      nativeCurrency: {
        name: 'DEV',
        symbol: 'DEV',
        decimals: 18
      },
      rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
      blockExplorerUrls: ['https://moonbase.moonscan.io/']
    }
  },
  {
    name: 'Goerli',
    symbol: 'GTH',
    chainId: '0x5',
    id: 5,
    iconName: 'ethneticon.png',
    teleportBgImg: 'goerli-bg.png',
    addresses: {
      dPrime: '0x0E65cCEE050dB2d1065e43728F1B77C81cDED576',
      dPrimeJoin: '0x2b7D597ac75c8C83452a6666797C6dFBdB8783f4',
      dPrimeGuardian: '0x88E4B42e9eB353AE91F32025631df7fCC6BcCDC2',
      lmcv: '0xfa192656A5498378fA3885842c6C7E5E4f84aEa0',
      lmcvProxy: '0x7aBd240B4050b6F70aF6A23a682074E3CEC89568',
      lzPipe: '0xb7a9a624591e32a46324dc72aef5708d06f6d0ed'.toLowerCase(), // lzPipe
      hyperlanePipe: '0x2a4d2fE5A242Fe1eE8964A0Cf67151885e7B21f4',
      usdcPSM: '0x0b481250A15bb14607f4C1C73708B289fE8F3E92', // PSM

      usdc: '0x718Ef9aA56CF9AcD33975c89024F9D840332BFD3', // '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
      usdcJoin: '0x1C88Ac66f82738F4ad88731AaD2770F25e6f728d', //DEC COLLAT JOIN

      weth: '', // '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      wethJoin: '', // '0x3685328d43EC3F5F3efD3c61E05cDdD037aab949',
      link: '', // '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      linkJoin: '' // '0xbb2EbebC17CAf0cD430965912632615aF9611273',
    },
    layerZeroChainIds: '10121',
    suggestedGasLimit: 500000,
    capabilities: {
      canSwap: true,
      canTeleport: true,
      hasUsdc: true
    },
    scanUrl: `https://goerli.etherscan.io/tx/${scanUrlMask}`,
    scanLz: `https://testnet.layerzeroscan.com/${scanOriginLzIdMask}/address/${scanOriginLzPipeMask}/message/${scanDestinationLzIdMask}/address/${scanDestinationLzPipeMask}/nonce/${scanNonceMask}`,
    default: true,
    addNetworkData: {
      chainId: '0x5',
      chainName: 'Goerli',
      nativeCurrency: {
        name: 'Goerli ETH',
        symbol: 'gorETH',
        decimals: 18
      },
      rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
      blockExplorerUrls: ['https://goerli.etherscan.io']
    }
  }
]

export const supportedTokens: ISupportedTokensMap = {
  dPrime: {
    name: 'Deuterium',
    symbol: 'd2O',
    units: 18,
    imgUrl: 'dam-logo-rounded.png',
    bytes: '0x0'
  },
  usdc: {
    name: 'usdc',
    symbol: 'USDC',
    units: 6,
    imgUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    bytes: ethers.utils.formatBytes32String('PSM-USDC-DAM')
  }
}

export const burnFee = 0.75
