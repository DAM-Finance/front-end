import { ethers } from 'ethers'
import { ISupportedNetwork } from './ISupportedNetworks'

export const supportedNetworks: ISupportedNetwork[] = [
  {
    name: 'Moonbase',
    symbol: 'MDEV',
    chainId: '0x507',
    id: 1287,
    iconName: 'moonbeamneticon.svg',
    teleportBgImg: 'moonbase-bg.png',
    addresses: {
      dPrime: '0x95D8E71E2E31fB3B99aD398745856AEAbE2cf3ac',
      lzEndpoint: '0xb23b28012ee92E8dE39DEb57Af31722223034747'
    },
    layerZeroChainIds: '10126',
    suggestedGasLimit: 500000
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
      lzEndpoint: '0x82a6A0E313765510e63fBcc0114af5C8054bDA9F', // lzPipe
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
    suggestedGasLimit: 500000
  }
]

export const supportedTokens = {
  dPrime: {
    name: 'dPrime',
    units: 18,
    bytes: 0x0
  },
  usdc: {
    name: 'usdc',
    units: 6,
    bytes: ethers.utils.formatBytes32String('PSM-USDC') // TODO: Change to PSM-USDC on production
  }
}
