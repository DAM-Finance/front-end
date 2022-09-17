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
}

const utils = new Utils()
export default utils
