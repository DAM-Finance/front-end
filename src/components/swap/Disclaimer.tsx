import { FC } from 'react'
import utils from '../../constants/utils'

// interface DDPrimeProps {}

const Disclaimer: FC = () => {
  const xUrl = utils.getImageSrc('x.svg')
  return (
    <div className="flex flex-row bg-damnavygreen rounded-2xl p-6">
      <div>
        <div className="text-white ">Swap directly dor dPrime at a 1:1 rate, rather than borrowing dPrime.</div>
        <button className="text-damyellow opacity-70">Learn More</button>
      </div>
      <img src={xUrl} className="ml-auto mb-auto" alt="close" />
    </div>
  )
}

export default Disclaimer
