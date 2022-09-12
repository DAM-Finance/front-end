import { FC } from 'react'
import utils from '../../../constants/utils'

// interface DDPrimeProps {}

const Progress: FC = () => {
  return (
    <>
      <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-dambackgroundgrayed">
        <div className="fixed bg-damgray flex flex-col items-center p-16 gap-4 rounded-xl text-white">
          <img width="128" src={utils.getImageSrc('progress.svg')} alt="progress animation" />
          <div className="font-light text-2xl">Waiting for your confirmation</div>
          <div className="text-sm">
            <span>Please confirm the transaction on </span>
            <span>your wallet.</span>
          </div>
          <button>
            <img className="absolute top-3 right-3" src={utils.getImageSrc('x2.svg')} alt="close" />
          </button>
        </div>
      </div>
    </>
  )
}

export default Progress
