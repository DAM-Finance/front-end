import { ethers } from 'ethers'
import { ISupportedNetwork } from './ISupportedNetworks'

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
      dPrime: '0xA693E53a134457A2Dc0669a77f20F114B4aaea8E',
      lzPipe: '0xe48dc47089bd1ED3BCB06a97741e9E9E1a619F13'.toLowerCase(),
      hyperlanePipe: '0x0B80E3704FC74f5621C875274203301168Ac7702'
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
    default: false
  },
  {
    name: 'Goerli',
    symbol: 'GTH',
    chainId: '0x5',
    id: 5,
    iconName: 'ethneticon.png',
    teleportBgImg: 'goerli-bg.png',
    addresses: {
      dPrime: '0x0c14d2bc2562b6aB953f21B24ddE8ad9e8cba2e1',
      lmcv: '0x12fA0d79BCD21114D5F34A2789D9b2B5b1d7b42D',
      dPrimeJoin: '0x3685328d43EC3F5F3efD3c61E05cDdD037aab949',
      usdcJoin: '0x7517b7900D845F18189e7e89707525E759a2eBb3', //DEC COLLAT JOIN
      lzPipe: '0x82a6A0E313765510e63fBcc0114af5C8054bDA9F'.toLowerCase(), // lzPipe
      hyperlanePipe: '0x74487683a4E248b21A09DAA3d78B2e26cedBe5E8',
      usdcPSM: '0xD264Daa2b0Ae259b7864e6532A30ebe6Ac93b3fd', // PSM
      lmcvProxy: '0x0CAfb9c3b7Aa97505276908A928bc9eA0c228324',

      usdc: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F', // '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',

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
    default: true
  }
]

export const supportedTokens = {
  dPrime: {
    name: 'Deuterium',
    symbol: 'd2O',
    units: 18,
    imgUrl: 'https://i.imgur.com/kck4tX2.jpeg',
    bytes: 0x0
  },
  usdc: {
    name: 'usdc',
    symbol: 'USDC',
    units: 6,
    imgUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    bytes: ethers.utils.formatBytes32String('PSM-USDC') // TODO: Change to PSM-USDC on production
  }
}
