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

  shortenWalletAddress = (wallet: string) => {
    return `${wallet.slice(0, 5)}...${wallet.slice(-4, wallet.length)}`
  }
}

const utils = new Utils()
export default utils
