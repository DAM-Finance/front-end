import { FC } from 'react'
import utils from '../constants/utils'
import { INetwork } from '../features/Network'

interface SelectNetworkProps {
  selectedNetwork: INetwork
  networks: INetwork[]
  handleChange: (net: INetwork) => void
}

const SelectNetwork: FC<SelectNetworkProps> = ({ selectedNetwork, networks, handleChange }) => {
  const prepareHandleChange = (ev: any) => {
    const net: INetwork = networks.find((net) => net.symbol === ev.target.value) || networks[0]
    handleChange(net)
  }
  return (
    <div className="relative flex justify-center rounded-2xl overflow-hidden" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)' }}>
      <img height={160} src={utils.getImageSrc(`${selectedNetwork.symbol}net.png`)} alt="" />
      <select
        className="absolute bottom-3 p-1 text-center bg-transparent rounded-3xl text-yellow-300 border-solid border-[1px] border-yellow-300 outline-none"
        style={{ background: 'linear-gradient(91.14deg, rgba(96, 54, 191, 0.4) 9.08%, rgba(255, 255, 255, 0) 96.11%, rgba(140, 77, 213, 0.4) 96.11%)' }}
        name="from"
        id="from"
        value={selectedNetwork.symbol}
        onChange={prepareHandleChange}
      >
        {networks.map((network) => (
          <option className="bg-damgray text-white" key={network.symbol} value={network.symbol}>
            {network.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectNetwork
