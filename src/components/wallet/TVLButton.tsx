import { FC } from 'react'
import utils from '../../constants/utils'

const TVLButton: FC = () => {
  return (
    <div className="flex items-center px-4 py-2 gap-2 rounded-full bg-dambackgroundgrayed text-white">
      <div>$2000M TVL</div>
      <img className="pb-1" src={utils.getImageSrc('link-external.svg')} alt="wallet" />
    </div>
  )
}

export default TVLButton
