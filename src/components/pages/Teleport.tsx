import { utils as ethersUtils } from 'ethers'
import { FC, useEffect, useMemo, useState } from 'react'
import {
  scanDestinationLzIdMask,
  scanDestinationLzPipeMask,
  scanNonceMask,
  scanOriginLzIdMask,
  scanOriginLzPipeMask,
  supportedNetworks,
  supportedTokens
} from '../../constants/config'
// import { LayerZeroChainIds } from '../../constants/config'
import { createClient } from '@layerzerolabs/scan-client'
import { IPendingTransaction } from '../../constants/IPendingTransaction'
import { ITxState } from '../../constants/ITxState'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'
import AvailableInput from '../AvailableInput'
import Disclaimer from '../Disclaimer'
import SelectNetwork from '../SelectNetwork'
import TransactionCompletedPopup from '../wallet/TransactionCompletedPopup'
import TransactionFailedPopup from '../wallet/TransactionFailedPopup'
import TransactionInProgressPopup from '../wallet/TransactionInProgressPopup'
import WaitingForConfirmationPopup from '../wallet/WaitingForConfirmationPopup'
const client = createClient('testnet')
// interface DDPrimeProps {}

const Teleport: FC = () => {
  const appStore = useAppStore()
  const dPrimeBalance = appStore.balances.dPrime
  const [amount, setAmount] = useState('0')
  const [originNetwork, setOriginNetwork] = useState(supportedNetworks[0])
  const [destinationNetwork, setDestinationNetwork] = useState(supportedNetworks[1])
  const [availableDestinations, setAvailableDestinations] = useState(supportedNetworks)
  const [gasPrice, setGasPrice] = useState('')
  const [txState, setTxState] = useState<ITxState>()
  const [txLink, setTxLink] = useState('')

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

  useEffect(() => {
    if (appStore.selectedNetwork) {
      setOriginNetwork(appStore.selectedNetwork)
      setAvailableDestinations(supportedNetworks.filter((network) => network.chainId !== appStore.selectedNetwork!.chainId))
    }
  }, [appStore.selectedNetwork])

  useEffect(() => {
    setDestinationNetwork(availableDestinations[0])
  }, [availableDestinations])

  const teleportTo = async (dPrimeAmount: string, dstChainName: string) => {
    try {
      setTxState('waiting')
      const tx = await appStore.teleport(dPrimeAmount, dstChainName)
      console.log('LZ:', tx)
      const lzResult = await client.getMessagesBySrcTxHash(tx.hash)
      console.log(lzResult)
      const pendingTransaction: IPendingTransaction = {
        hash: tx.hash,
        status: 'REQUESTING',
        source: tx,
        type: 'TELEPORT',
        from: {
          amount: dPrimeAmount,
          token: supportedTokens.dPrime.name,
          network: appStore.selectedNetwork!.name
        },
        to: {
          amount: dPrimeAmount,
          token: supportedTokens.dPrime.name,
          network: dstChainName
        },
        startedAt: new Date()
      }
      appStore.setPendingTransactions([...appStore.pendingTransactions, pendingTransaction])

      // https://testnet.layerzeroscan.com/10121/address/0x82a6a0e313765510e63fbcc0114af5c8054bda9f/message/10126/address/0xe48dc47089bd1ed3bcb06a97741e9e9e1a619f13/nonce/57
      //TODO: test and move to utils
      const dstChainId = supportedNetworks.find((net) => net.name === dstChainName)

      let url = appStore.selectedNetwork!.scanLz

      url = url.replace(scanOriginLzIdMask, appStore.selectedNetwork!.layerZeroChainIds)
      url = url.replace(scanOriginLzPipeMask, appStore.selectedNetwork!.addresses.lzPipe!)

      url = url.replace(scanDestinationLzIdMask, dstChainId!.layerZeroChainIds)
      url = url.replace(scanDestinationLzPipeMask, dstChainId!.addresses.lzPipe!)

      url = url.replace(scanNonceMask, tx.nonce)
      const link = url
      // const link = utils.getTxLink(appStore.selectedNetwork!, tx.hash!)
      setTxLink(link)
      setTxState('inprogress')
      await tx.wait()
      setTxLink('')
      appStore.updateBalances()
      setTxState('completed')
    } catch (err) {
      console.error(err)
      setTxState('failed')
    }
  }

  const switchNetwork = async () => {
    await appStore.switchNetwork(destinationNetwork.chainId)
    setTxState('none')
  }

  const isTeleportBtnDisabled = useMemo(() => {
    return Number(amount) <= 0
  }, [amount])

  return (
    <div className="flex p-4 w-full justify-center py-24">
      <div className="flex flex-col max-w-7xl gap-6">
        <Disclaimer infoTxt={['Teleport dPrime from one blockchain to another']}></Disclaimer>
        <div
          className="flex flex-col gap-8 rounded-2xl p-6 text-gray-500"
          style={{ background: 'linear-gradient(124.57deg, #4B2BA5 -118.12%, #1F212C 57.01%)' }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 justify-between">
              <SelectNetwork
                networks={supportedNetworks}
                selectedNetwork={originNetwork}
                handleChange={(network) => appStore.switchNetwork(network.chainId)}
              ></SelectNetwork>
              <img src={utils.getImageSrc('right-arrow.svg')} alt="" />
              <SelectNetwork
                networks={availableDestinations}
                selectedNetwork={destinationNetwork}
                handleChange={(network) => setDestinationNetwork(network)}
              ></SelectNetwork>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <AvailableInput amount={amount} available={dPrimeBalance} gasPrice={gasPrice} handleChange={(value) => setAmount(value)} decimals={2}>
              <div className="flex flex-col gap-1 text-sm text-damlabelgray2">
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
          {appStore.walletProvider?.connected ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => teleportTo(amount, destinationNetwork.name)}
                className="flex items-center w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed gap-2 rounded-full py-4 px-6 text-black font-bold bg-gradient-to-r from-[#7742CD] to-[#F1DD79] hover:from-[#8458cc] hover:to-[#ebdd9c]"
                style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                disabled={isTeleportBtnDisabled}
              >
                <img src={utils.getImageSrc('teleport.svg')} alt="teleport" />
                Teleport
              </button>
              <div className="flex justify-center items-center gap-2">
                <img src={utils.getImageSrc('warning.svg')} alt="" />
                <div className="text-damlightyellow text-sm font-light">Make sure you have enough gas on the destination chain.</div>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={appStore.connectWallet}
                className="flex items-center w-full justify-center rounded-full py-4 px-6 text-black font-bold bg-gradient-to-r from-[#7742CD] to-[#F1DD79] hover:from-[#8458cc] hover:to-[#ebdd9c]"
                style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                Connect
              </button>
            </div>
          )}
        </div>
      </div>

      <WaitingForConfirmationPopup handleClose={() => setTxState('none')} show={txState === 'waiting'} addTokenOption={false}>
        <div className="text-[14px] text-damlabelgray">
          <span>Teleporting dPRIME takes on </span>
          <span className="text-damyellow font-bold">average 15 min.</span>
        </div>
      </WaitingForConfirmationPopup>

      <TransactionInProgressPopup
        handleClose={() => setTxState('none')}
        show={txState === 'inprogress'}
        message="Teleport in progress!"
        imgName="teleport-progress.svg"
        txLink={txLink}
        txLinkMsg={true}
      ></TransactionInProgressPopup>

      <TransactionCompletedPopup
        handleClose={() => setTxState('none')}
        show={txState === 'completed'}
        imgName="teleport-completed.svg"
        message="Teleport successful!"
        txLink={txLink}
      >
        <div className="flex flex-col gap-6">
          <div className="text-md text-damlabelgray">
            <span>Switch network to use your dPRIME.</span>
          </div>
          <button
            onClick={switchNetwork}
            className="flex items-center justify-center gap-2 rounded-full py-3 px-6 mx-auto bg-damyellow text-damgray hover:bg-yellow-200 font-bold"
          >
            <span>Switch Network</span>
          </button>
        </div>
      </TransactionCompletedPopup>

      <TransactionFailedPopup
        handleClose={() => setTxState('none')}
        imgName="teleport-failed.svg"
        show={txState === 'failed'}
        txLink={txLink}
      ></TransactionFailedPopup>
    </div>
  )
}

export default Teleport
