import { FC } from 'react'
import utils from '../constants/utils'

interface DisclaimerProps {
  infoTxt: string
  actionTxt?: string
  canClose?: boolean
}

const Disclaimer: FC<DisclaimerProps> = ({ infoTxt = '', actionTxt = '', canClose = true }: DisclaimerProps) => {
  return (
    <div className="flex flex-row gap-4 bg-damnavygreen rounded-2xl p-6">
      <div>
        <div className="text-white ">{infoTxt}</div>
        {actionTxt && <button className="text-damyellow opacity-50">Learn More</button>}
      </div>
      {canClose && <img src={utils.getImageSrc('x.svg')} className="ml-auto mb-auto pl-md" alt="close" />}
    </div>
  )
}

export default Disclaimer
