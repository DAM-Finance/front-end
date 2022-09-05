import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className="w-full h-full flex flex-col p-28  text-white gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-300">A</div>
        <div className="flex flex-col gap-4">
          <div className="bg-orange-300">B</div>
          <div className="bg-blue-300">C</div>
        </div>
      </div>
      <div className="bg-blue-400">D</div>
    </div>
  )
}

export default Home
