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
