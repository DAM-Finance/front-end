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
    layerZeroChainIds: '10126'
  },
  {
    name: 'Goerli',
    symbol: 'GTH',
    chainId: '0x5',
    id: 5,
    iconName: 'ethneticon.png',
    teleportBgImg: 'goerli-bg.png',
    addresses: {
      lmcv: '0xDd92aF2acb2Dd66Abe5C2023c7D446989DF0af53',
      lmcvProxy: '0x2FdA8c6783Aa36BeD645baD28a4cDC8769dCD252',
      dPrime: '0x78D7480aFcB1c2310917fDa95e96cA4E1C06CcfF',
      dPrimeJoin: '0x687007C510Cd174f815cdaDA4De51d66BA73544d',
      usdcPSM: '0xceE15Ca9fF2dA87080b34ca922AB8C195aD6D6EB',
      usdcJoin: '0xB1fbcD7415F9177F5EBD3d9700eD5F15B476a5Fe', //DEC COLLAT JOIN
      usdc: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F', // '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
      lzEndpoint: '0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23', // '0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA'

      weth: '', // '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      wethJoin: '', // '0x3685328d43EC3F5F3efD3c61E05cDdD037aab949',
      link: '', // '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      linkJoin: '' // '0xbb2EbebC17CAf0cD430965912632615aF9611273',
    },
    layerZeroChainIds: '10121'
  }
]

export const supportedTokens = {
  dPrime: {
    name: 'dPrime',
    units: 18
  },
  usdc: {
    name: 'usdc',
    units: 6
  }
}
