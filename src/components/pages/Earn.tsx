import { FC, useState } from 'react'
import WaitingForConfirmationPopup from '../wallet/WaitingForConfirmationPopup'

// interface DDPrimeProps {}

const Earn: FC = () => {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div className="lg:px-96 px-12 py-24">
      <button className="text-white bg-gray-600" onClick={() => setShowPopup(true)}>
        Show POPUP
      </button>
      <WaitingForConfirmationPopup handleClose={() => setShowPopup(false)} show={showPopup}></WaitingForConfirmationPopup>
    </div>
  )
}

export default Earn
