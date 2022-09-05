import Navbar from './navigation/Navbar/Navbar'
import Routes from './components/common/Routes/Routes'

import './App.css'

const App = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-damdarkgray">
      <Navbar />
      <div style={{ width: 'calc(100vh - 80px)' }}>
        <Routes />
      </div>
    </div>
  )
}

export default App
