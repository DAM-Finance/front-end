import Navbar from './components/common/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'
// import { useImmer } from 'use-immer'

// import { useRef } from 'react'
import { IPortfolio } from './features/dashboard'
import { StateContext } from './components/common/State/State'
import { useEffect, useState } from 'react'
import { useAppStore } from './stores/appStore/appStore'

const App = () => {
  const [portfolio, setPortfolio] = useState<Partial<IPortfolio>>({})
  const appStore = useAppStore()

  useEffect(() => {
    appStore.setupWallet()
  }, [])

  return (
    <StateContext.Provider value={{ portfolio, setPortfolio }}>
      <div className="flex flex-col w-full h-screen bg-damdarkgray">
        <Navbar />
        <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
          <Routes />
        </div>
      </div>
    </StateContext.Provider>
  )
}

export default App
