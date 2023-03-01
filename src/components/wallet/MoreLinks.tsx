import { FC, useState } from 'react'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'

interface ILink {
  label: string
  url?: string
  action?: () => void
}

interface ILinks {
  home: ILink
  docs: ILink
  github: ILink
  audit: ILink
  discord: ILink
  twitter: ILink
  logout: ILink
}

const MoreLinks: FC = () => {
  const [showMenu, setShowMenu] = useState(false)
  const appStore = useAppStore()

  const links: ILinks = {
    home: { label: 'Home', url: 'https://dam.finance/' },
    docs: { label: 'Docs', url: 'https://docs.dam.finance' },
    github: { label: 'GitHub', url: 'https://github.com/DAM-Finance' },
    audit: {label: 'Audit', url: 'https://github.com/HalbornSecurity/PublicReports/tree/master/Solidity%20Smart%20Contract%20Audits/DAMfinance%20Audits' },
    discord: { label: 'Discord', url: 'https://discord.gg/xGB4pyU4Jp' },
    twitter: { label: 'Twitter', url: 'https://twitter.com/DAM_Finance' },
    logout: {
      label: 'Disconnect',
      action: () => {
        appStore.disconnectWallet()
        setShowMenu(false)
      }
    }
  }

  // const appStore = useAppStore()
  const selectOption = (elem: ILink) => {
    if (!!elem.url) {
      window.open(elem.url)
    }
    if (!!elem.action) {
      elem.action()
    }
  }

  return (
    <div className="relative">
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="px-2 py-2 flex justify-center items-center rounded-full bg-transparent cursor-pointer hover:bg-gray-700"
      >
        <img width="20px" src={utils.getImageSrc('dots.png')} alt="dots" />
      </div>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="fixed top-0 bottom-0 right-0 left-0 z-10"></div>
          <div
            // onChange={(evt) => selectOption(evt.currentTarget.value)}
            className="absolute top-10 flex flex-col gap-0 z-50 bg-damgray text-transparent outline-none cursor-pointer"
          >
            {Object.values(links).map((link: ILink) => (
              <div onClick={() => selectOption(link)} className="bg-damgray text-white py-1 px-2 hover:bg-gray-700" key={link.label}>
                {link.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MoreLinks
