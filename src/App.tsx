import Navbar from './navigation/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'

import { useRef } from 'react'

const App = () => {
  useRef()
  return (
    <div className="flex flex-col w-full h-screen bg-damdarkgray">
      <Navbar />
      <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
        <Routes />
      </div>
    </div>
  )
}

export default App
