import { FC, useState } from 'react'
import TermsAndConditionsPopup from '../wallet/TermsAndConditionsPopup'

// interface DDPrimeProps {}

const Earn: FC = () => {
  const [showTCsPopup, setShowTCsPopup] = useState(false)

  return (
    <div className="flex lg:px-96 px-12 py-24 gap-16">
      <button className="text-white bg-gray-600" onClick={() => setShowTCsPopup(true)}>
        Show TCs
      </button>
      <TermsAndConditionsPopup handleClose={() => setShowTCsPopup(false)} show={showTCsPopup}></TermsAndConditionsPopup>
    </div>
  )
}

export default Earn
