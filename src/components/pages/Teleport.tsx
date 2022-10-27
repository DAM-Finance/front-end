import { utils as ethersUtils } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { supportedNetworks } from '../../constants/config'
// import { LayerZeroChainIds } from '../../constants/config'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'
import AvailableInput from '../AvailableInput'
import Disclaimer from '../Disclaimer'
import SelectNetwork from '../SelectNetwork'
import TransactionCompletedPopup from '../wallet/TransactionCompletedPopup'
import TransactionInProgressPopup from '../wallet/TransactionInProgressPopup'
import WaitingForConfirmationPopup from '../wallet/WaitingForConfirmationPopup'
import TransactionFailedPopup from '../wallet/TransactionFailedPopup'
import { ITxState } from '../../constants/ITxState'

// interface DDPrimeProps {}

const Teleport: FC = () => {
  const appStore = useAppStore()
  const dPrimeBalance = appStore.balances.dPrime

  const [amount, setAmount] = useState('0')
  const [originNetwork, setOriginNetwork] = useState(supportedNetworks[0])
  const [destinationNetwork, setDestinationNetwork] = useState(supportedNetworks[1])
  const [gasPrice, setGasPrice] = useState('')
  const [txState, setTxState] = useState<ITxState>()

  useEffect(() => {
    const getGasPrice = async () => {
      const web3Provider = appStore.walletProvider?.web3Provider
      if (!web3Provider) {
        return
      }

      const gasPrice = await web3Provider.getGasPrice()
      const priceInGwei = ethersUtils.formatUnits(gasPrice, 'gwei')
      setGasPrice(priceInGwei.toString())
    }
    getGasPrice()
  }, [appStore.walletProvider?.web3Provider])

  const teleportTo = async (dPrimeAmount: string, dstChainName: string) => {
    try {
      setTxState('waiting')
      const tx = await appStore.teleport(dPrimeAmount, dstChainName)
      setTxState('inprogress')
      await tx.wait()
      appStore.updateBalances()
      setTxState('completed')
    } catch (err) {
      console.error(err)
      setTxState('failed')
    }
  }

  return (
    <div className="flex p-4 w-full justify-center py-24">
      <div className="flex flex-col max-w-7xl gap-6">
        <Disclaimer infoTxt="Teleport dPrime from one blockchain to another" actionTxt="Learn More"></Disclaimer>
        <div
          className="flex flex-col gap-8 rounded-2xl p-6 text-gray-500"
          style={{ background: 'linear-gradient(124.57deg, #4B2BA5 -118.12%, #1F212C 57.01%)' }}
        >
          <div className="flex flex-col gap-2">
            <div>1. Select Network</div>
            <div className="flex gap-4">
              <SelectNetwork networks={supportedNetworks} selectedNetwork={originNetwork} handleChange={(network) => setOriginNetwork(network)}></SelectNetwork>
              <img src={utils.getImageSrc('right-arrow.svg')} alt="" />
              <SelectNetwork
                networks={supportedNetworks}
                selectedNetwork={destinationNetwork}
                handleChange={(network) => setDestinationNetwork(network)}
              ></SelectNetwork>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>2. Select the amount of dPRIME to teleport</div>
            <AvailableInput amount={amount} available={dPrimeBalance} gasPrice={gasPrice} handleChange={(value) => setAmount(value)} decimals={2}>
              <div className="flex flex-col gap-1 text-sm text-damlabelgray2">
                {/* <div className="flex">
                  <div>Expected Output</div>
                  <div className="ml-auto">{amount} dPRIME</div>
                </div> */}
                <div className="flex">
                  <div>Teleport Fee</div>
                  <div className="ml-auto">{appStore.teleportFees}</div>
                </div>
                <div className="flex">
                  <div>Gas fee</div>
                  <div className="ml-auto">$0</div>
                </div>
              </div>
            </AvailableInput>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => teleportTo(amount, destinationNetwork.name)}
              className="flex items-center w-full justify-center gap-2 rounded-full py-4 px-6 text-black font-bold"
              style={{ background: 'linear-gradient(90deg, #7742CD 5.88%, #F1DD79 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
              disabled={false}
            >
              <img src={utils.getImageSrc('teleport.svg')} alt="teleport" />
              Teleport
            </button>
            <div className="flex justify-center items-center gap-2">
              <img src={utils.getImageSrc('warning.svg')} alt="" />
              <div className="text-damlightyellow text-sm font-light">Make sure you have enough gas on the destination chain.</div>
            </div>
          </div>
        </div>
      </div>
      <WaitingForConfirmationPopup handleClose={() => setTxState('none')} show={txState === 'waiting'}></WaitingForConfirmationPopup>
      <TransactionInProgressPopup handleClose={() => setTxState('none')} show={txState === 'inprogress'}></TransactionInProgressPopup>
      <TransactionCompletedPopup handleClose={() => setTxState('none')} show={txState === 'completed'}></TransactionCompletedPopup>
      <TransactionFailedPopup handleClose={() => setTxState('none')} show={txState === 'failed'}></TransactionFailedPopup>
    </div>
  )
}

export default Teleport
