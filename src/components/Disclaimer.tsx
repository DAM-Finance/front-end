import { FC, useState } from 'react'
import utils from '../constants/utils'

interface DisclaimerProps {
  infoTxt: string
  actionTxt?: string
  canClose?: boolean
  handleClose?: () => void
}

const Disclaimer: FC<DisclaimerProps> = ({ infoTxt = '', actionTxt = '', canClose = true, handleClose }: DisclaimerProps) => {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const onClose = () => {
    setShowDisclaimer(false)
    handleClose && handleClose()
  }
  return (
    <>
      {showDisclaimer && (
        <div className="flex flex-row gap-4 bg-damnavygreen rounded-2xl px-6 py-4">
          <div>
            <div className="text-white ">{infoTxt}</div>
            {actionTxt && <button className="text-damyellow opacity-50">Learn More</button>}
          </div>
          {canClose && <img onClick={onClose} src={utils.getImageSrc('x.svg')} width={20} className="ml-auto mb-auto cursor-pointer pl-md" alt="close" />}
        </div>
      )}
    </>
  )
}

export default Disclaimer
