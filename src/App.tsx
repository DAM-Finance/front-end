import Navbar from './components/common/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'
// import { useImmer } from 'use-immer'

// import { useRef } from 'react'
import { IPortfolio } from './features/dashboard'
import { StateContext } from './components/common/State/State'
import { useState } from 'react'
import EthProvider from './components/common/EthProvider/EthProvider'

const App = () => {
  const [portfolio, setPortfolio] = useState<Partial<IPortfolio>>({})

  return (
    <StateContext.Provider value={{ portfolio, setPortfolio }}>
      <EthProvider {...{ portfolio, setPortfolio }}>
        <div className="flex flex-col w-full h-screen bg-damdarkgray">
          <Navbar />
          <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
            <Routes />
          </div>
        </div>
      </EthProvider>
    </StateContext.Provider>
  )
}

export default App
