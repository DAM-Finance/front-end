import { FC, useState } from 'react'
import utils from '../../constants/utils'
import Checkbox from '../Checkbox'
import TermsAndConditionsText from './TermsAndConditionsText'

interface TermsAndConditionsPopupProps {
  show: boolean
  handleDecline: () => void
  handleAgree: () => void
}

const TermsAndConditionsPopup: FC<TermsAndConditionsPopupProps> = ({ show, handleDecline, handleAgree }) => {
  const [agreeTC, setAgreeTC] = useState(false)
  const [agreePP, setAgreePP] = useState(false)

  return (
    <>
      {show && (
        <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-damtranspdarkgray">
          <div className="fixed bg-damgray flex flex-col items-center max-w-4xl p-16 gap-8 rounded-xl text-white">
            <div className="flex gap-4 w-full">
              <img src={utils.getImageSrc('termsconditions.svg')} alt="terms" />
              <div className="flex flex-col gap-2">
                <div className="text-4xl text-damlabelgray font-light">Terms and Conditions</div>
                <div className="text-xs text-damlabelgray3">Updated 09/04/22</div>
              </div>
            </div>
            <div className="overflow-y-scroll damscroll w-full max-h-64 text-sm my-4">
              <TermsAndConditionsText></TermsAndConditionsText>
            </div>
            <div className="flex flex-col w-full gap-3">
              <Checkbox selected={agreeTC} handleClick={() => setAgreeTC(!agreeTC)}>
                <span className="text-damlabelgray">I agree with the </span>
                <span className="font-bold text-damlabelgray">Terms and Conditions</span>
              </Checkbox>
              <Checkbox selected={agreePP} handleClick={() => setAgreePP(!agreePP)}>
                <span className="text-damlabelgray">I agree with the </span>
                <span className="font-bold text-damlabelgray">Privacy Policy</span>
              </Checkbox>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleDecline}
                className="flex items-center gap-2 rounded-full px-4 bg-damyellow bg-opacity-5 text-yellow-300 hover:bg-opacity-10"
              >
                <span>Decline</span>
              </button>
              <button
                onClick={handleAgree}
                disabled={!agreeTC || !agreePP}
                className="flex items-center w-fit gap-2 rounded-full py-2 px-6 bg-damyellow text-damgray hover:bg-yellow-200 font-bold disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <span>Agree</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TermsAndConditionsPopup
