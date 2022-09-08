import { FC } from 'react'
import utils from '../../constants/utils'

// interface PortfolioProps {}

const Portfolio: FC = () => {
  const portfolioImg = utils.getImageSrc('portfolio-placeholder.svg')
  const borrowIcon = utils.getImageSrc('borrow-icon.svg')

  return (
    <div className="flex bg-damgray rounded-xl px-8 py-16">
      <div className="flex flex-col flex-wrap gap-6">
        <div>
          <span className="text-2xl">Create purchasing power from your portfolio through </span>
          <span className="text-2xl font-bold">dPRIME</span>
        </div>
        <div className="text-gray-500">dPRIME is a cross-chain portfolio backed stablecoin for Dotsama</div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 rounded-full py-2 px-6 bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold">
            <img src={borrowIcon} alt="Burrow icon" />
            <span>Borrow</span>
          </button>
          <button className="rounded-full py-1 px-4 bg-gray-500 text-yellow-300 hover:bg-gray-400">Learn More</button>
        </div>
      </div>
      <img src={portfolioImg} alt="Portfolio" />
    </div>
  )
}

export default Portfolio
