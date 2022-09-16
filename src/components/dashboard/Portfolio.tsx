import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import utils from '../../constants/utils'
import { IPortfolio } from '../../features/dashboard'

// interface PortfolioProps {}

const Portfolio: FC<Partial<IPortfolio>> = (portfolio) => {
  const portfolioImg = utils.getImageSrc('portfolio-placeholder.svg')
  const borrowIcon = utils.getImageSrc('borrow-icon.svg')
  const assetsUrl = utils.getImageSrc('assets.svg')

  let portfolioPage = (
    <>
      <div className="flex flex-col justify-center flex-wrap gap-6">
        <div>
          <span className="text-2xl">Create purchasing power from your portfolio through </span>
          <span className="text-2xl font-bold">dPRIME</span>
        </div>
        <div className="text-gray-500">dPRIME is a cross-chain portfolio backed stablecoin for Dotsama</div>
        <div className="flex gap-4">
          <NavLink to="/swap">
            <button className="flex font-bold items-center gap-2 rounded-full py-2 px-6 bg-yellow-300 text-damgray hover:bg-yellow-200">
              <span>Swap for dPRIME</span>
            </button>
          </NavLink>
          <button className="rounded-full py-1 px-6 bg-damyellowgradient text-damyellow">Learn More</button>
        </div>
      </div>
      <img src={portfolioImg} alt="Portfolio" />
    </>
  )

  if (portfolio.hasOwnProperty('portfolioValue')) {
    portfolioPage = (
      <div className="flex flex-col w-full gap-2">
        <div className="text-gray-400 pl-4">Portfolio Value</div>
        <div className="flex bg-damgray rounded-xl px-4 py-6">
          <div className="text-2xl">$ {portfolio?.portfolioValue?.toLocaleString()}</div>
          <NavLink className="ml-auto" to="manage/borrow">
            <button className="flex items-center gap-2  rounded-full py-2 px-6 bg-yellow-300 text-damgray hover:bg-yellow-200 font-bold">
              <img src={borrowIcon} alt="Burrow icon" />
              <span>Borrow</span>
            </button>
          </NavLink>
        </div>
        <div className="text-gray-400 pl-4">Your assets</div>
        <div className="flex items-center gap-4 bg-damgray rounded-xl px-4 py-6">
          <img src={assetsUrl} alt="assets" />
          <div className="text-gray-600">GLMR, EWT, ACALA and 12 others</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-damgray h-full rounded-xl">
      <div className="flex bg-damtranspgray h-full rounded-xl px-8 py-16">{portfolioPage}</div>
    </div>
  )
}

export default Portfolio
