import { ISupportedNetwork } from './ISupportedNetworks'

// export const rpcUrl ="https://rpc.api.moonbase.moonbeam.network";
export const rpcUrl = 'http://127.0.0.1:8545'

//chain ids
export const bnb_testnet_id = 97
export const rinkeby_testnet_id = 4
export const moonbase_testnet_id = 1287

export const supportedNetworks: ISupportedNetwork[] = [
  {
    name: 'Moonbase',
    symbol: 'MDEV',
    chainId: '0x507',
    id: 1287,
    iconName: 'moonbeamneticon.svg',
    addresses: {
      dPrime: '0x95D8E71E2E31fB3B99aD398745856AEAbE2cf3ac'
      // "lzEndpoint"    : "0xb23b28012ee92E8dE39DEb57Af31722223034747",
    },
    layerZeroChainIds: '10026'
  },
  {
    name: 'Rinkeby',
    symbol: 'RETH',
    chainId: '0x4',
    id: 4,
    iconName: 'ethneticon.png',
    addresses: {
      dPrime: '0x75396167802c8719A85571c37240c3E16B2007c2',
      dPrimeJoin: '0xbB5F842c2EFB6CfED9dE45b49f4f34E987b52C63',
      lmcv: '0x6CD5fA2262bCD92b0644289A04B9fa6a8342CB37',
      lmcvProxy: '0xE26182845FCC2732771B4A7b1eCC947B5f724965',
      usdcJoin: '0xf209894986d921b2868821E728eFa57145Fed3f7', //DEC COLLAT JOIN
      usdcPSM: '0xa2CEa9B8F6Af2d2e20B4dDB66De67cCB98EA5E3c',
      usdc: '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926',
      weth: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      wethJoin: '0x3685328d43EC3F5F3efD3c61E05cDdD037aab949',
      link: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      linkJoin: '0xbb2EbebC17CAf0cD430965912632615aF9611273',
      lzEndpoint: '0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA'
    },
    layerZeroChainIds: '10001'
  }
  // {
  //   name: 'BSC Testnet',
  //   symbol: 'BNB',
  //   chainId: '0x61',
  //   id: 97,
  //   iconName: 'ethneticon.png',
  //   addresses: {
  //     dPrime: '0xf209894986d921b2868821E728eFa57145Fed3f7',
  //     lzEndpoint: '0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1'
  //   },
  //   layerZeroChainIds: '10002'
  // }
  // { name: 'Moonbeam', symbol: 'GLMR', chainId: '0x504', id: 1284, iconName: 'moonbeamneticon.png' },
  // { name: 'Ethereum', symbol: 'ETH', chainId: '0x1', id: 1, iconName: 'ethneticon.png' },
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
