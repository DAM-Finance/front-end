import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className="p-28 col w-full">
      <div className="flex w-full grid-cols-1 md:grid-cols-2">
        <div className="row-span-3">A</div>
        <div className="flex flex-col grid-rows-4">
          <div>B</div>
          <div>C</div>
        </div>
      </div>
      <div className="">D</div>
    </div>
  )
}

export default Home
