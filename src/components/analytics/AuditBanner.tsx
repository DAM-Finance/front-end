import { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

import utils from '../../constants/utils'
import { NavLink } from 'react-router-dom'

// interface DDPrimeProps {}

const AuditBanner: FC = () => {
  return (
    <div
      className="flex items-center rounded-xl p-8 py-8 overflow-hidden gap-6"
      style={{
        background: `linear-gradient(124.57deg, #4B2BA5 -118.12%, #1F212C 57.01%)`,
        backgroundSize: 'cover'
      }}
    >
      <img src={utils.getImageSrc('contract-audit.png')} alt="audited contract" />
      <div className="font-light">
        <div>
          <span className="font-bold">DAM </span>
          <span>is fully backed and</span>
        </div>
        <div className="">audited by industry’s top firms.</div>
      </div>
      <div className="ml-auto flex flex-col justify-center font-bold gap-2">
        <NavLink to="/teleport">
          <button className="flex items-center gap-2 rounded-full py-3 px-6 bg-dambackgroundgrayed hover:bg-dambackgroundgrayedhover text-damyellow">
            <span>Security Audit</span>
            <ArrowRightIcon className="h-5 w-5 text-damyellow"></ArrowRightIcon>
          </button>
        </NavLink>
        <div className="text-xs font-light text-damlabelgray3">Review DAM’s Security Audit Report</div>
      </div>
    </div>
  )
}

export default AuditBanner
