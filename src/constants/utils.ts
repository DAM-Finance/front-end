import { scanUrlMask, supportedNetworks } from './config'
import { ISupportedNetwork } from './ISupportedNetworks'
import * as ethers from 'ethers'

export class Utils {
  getImageSrc(img: string) {
    if (!img) {
      return ''
    }
    if (!img.startsWith('/')) {
      img = `/${img}`
    }
    return `${process.env.PUBLIC_URL}${img}`
  }

  round(value: number, decimals: number): number {
    return Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  }

  shortenWalletAddress = (wallet: string) => {
    return `${wallet.slice(0, 5)}...${wallet.slice(-4, wallet.length)}`
  }

  format = (value: string | number, decimals: number) => {
    const nValue = +value
    if (decimals < 0) {
      return value
    }
    return nValue.toFixed(decimals)
  }

  getTxLink(network: ISupportedNetwork, txHash: string) {
    return network?.scanUrl?.replace(scanUrlMask, txHash)
  }

  beautifyNumber(valueMixed: string | number): string {
    let value: String = typeof valueMixed === 'number' ? valueMixed.toString() : valueMixed
    if (!value) {
      return ''
    }
    const coercedValue = Number(value)
    let res = coercedValue.toLocaleString('en', { maximumFractionDigits: 18 })
    if (value.length && value.indexOf('.') === value.length - 1) {
      res += '.'
    }
    return res
  }

  unbeautifyNumber(value: string): string {
    console.log({ unbeautifyNumber1: value })
    if (value.length === 1) {
      value = value.replace(/\D/, '')
    }
    if (!value) {
      return ''
    }
    let val = parseFloat(value.replace(/,/g, '')).toString()
    if (value.length && value.indexOf('.') === value.length - 1) {
      val += '.'
    }
    console.log({ unbeautifyNumber: val })
    return val
  }

  // TODO:
  getLzTxLink() {
    // https://testnet.layerzeroscan.com/10121/address/0x82a6a0e313765510e63fbcc0114af5c8054bda9f/message/10126/address/0xe48dc47089bd1ed3bcb06a97741e9e9e1a619f13/nonce/57
  }

  getDefaultNetwork = (): ISupportedNetwork => {
    return supportedNetworks.find((network) => network.default) || supportedNetworks[0]
  }

  fwad(wad: string) {
    return ethers.utils.parseEther(wad)
  }
  fusdc(wad: string) {
    return ethers.utils.parseEther(wad).div('1000000000000')
  }
  pwad(wad: string) {
    return ethers.utils.formatUnits(wad, 18)
  }
}

const utils = new Utils()
export default utils
