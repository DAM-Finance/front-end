import { FC } from 'react'

const DownloadWalletButton: FC = () => {
  return (
    <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
      <button className="outline outline-1 px-4 py-2 rounded-full bg-transparent text-damyellow outline-damtext-damyellow hover:bg-damyellow hover:text-damgray">
        Download Metamask
      </button>
    </a>
  )
}

export default DownloadWalletButton
