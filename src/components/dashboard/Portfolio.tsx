import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import utils from '../../constants/utils'
import { IPortfolio } from '../../features/dashboard'

// interface PortfolioProps {}

const Portfolio: FC<Partial<IPortfolio>> = (portfolio) => {
  const portfolioImg = utils.getImageSrc('portfolio-placeholder.png')
  const assetsUrl = utils.getImageSrc('assets.svg')

  let portfolioPage = (
    <div className="flex gap-2">
      <div className="flex flex-col justify-center flex-wrap gap-6">
        <div>
          <span className="text-2xl">Take your stablecoin liquidity anywhere through </span>
          <span className="text-2xl font-bold">DAM</span>
        </div>
        <div className="text-gray-500">d2o is a native, omnichain stablecoin with utility in Polkadot</div>
        <div className="flex gap-4">
          <NavLink to="/swap">
            <button className="flex font-bold items-center gap-2 rounded-full py-2 px-6 bg-damyellow text-damgray hover:bg-yellow-200">
              <span>Get d2o</span>
            </button>
          </NavLink>
          <a href="https://docs.dam.finance" rel="noreferrer">
            <button className="rounded-full py-1 px-6 bg-dambackgroundgrayed hover:bg-dambackgroundgrayedhover text-damyellow">Learn More</button>
          </a>
        </div>
      </div>
      <img className="hidden md:block" src={portfolioImg} alt="Portfolio" />
    </div>
  )

  if (portfolio.hasOwnProperty('portfolioValue')) {
    portfolioPage = (
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-gray-400 pl-4">Collateral Value</div>
          <div className="flex bg-damgray rounded-xl px-4 py-6">
            <div className="text-4xl">$ {portfolio?.portfolioValue?.toLocaleString()}</div>
            <NavLink className="ml-auto" to="manage/borrow">
              <button className="flex items-center gap-2  rounded-full py-2 px-6 bg-damyellow text-damgray hover:bg-yellow-200 font-bold">
                <span>Borrow d2o</span>
              </button>
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-gray-400 pl-4">Your assets</div>
          <div className="flex items-center gap-4 bg-damgray rounded-xl px-4 py-6">
            <img src={assetsUrl} alt="assets" />
            <div className="text-gray-600">GLMR, EWT, ACALA and 12 others</div>
          </div>
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
