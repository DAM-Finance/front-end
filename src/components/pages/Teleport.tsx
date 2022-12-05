import { utils as ethersUtils } from 'ethers'
import { FC, useEffect, useState } from 'react'
import { supportedNetworks, supportedTokens } from '../../constants/config'
import { IPendingTransaction } from '../../constants/IPendingTransaction'
import { ISupportedNetwork } from '../../constants/ISupportedNetworks'
import utils from '../../constants/utils'
import { useAppStore } from '../../stores/appStore/appStore'
import AvailableInput from '../AvailableInput'
import Disclaimer from '../Disclaimer'
import SelectNetwork from '../SelectNetwork'
// interface DDPrimeProps {}

const Teleport: FC = () => {
  const appStore = useAppStore()
  const dPrimeBalance = appStore.balances.dPrime
  const [amount, setAmount] = useState('0')
  const [originNetwork, setOriginNetwork] = useState(supportedNetworks[0])
  const [destinationNetwork, setDestinationNetwork] = useState(supportedNetworks[1])
  const [availableDestinations, setAvailableDestinations] = useState(supportedNetworks)
  const [gasPrice, setGasPrice] = useState('')

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

  const teleportTo = async (dPrimeAmount: string, dstnetwork: ISupportedNetwork) => {
    try {
      const waitConfirmation: IPendingTransaction = {
        hash: 'hash',
        status: 'CONFIRMING',
        type: 'TELEPORT',
        startedAt: new Date()
      }
      appStore.setNotifyTransaction(waitConfirmation)
      const tx = await appStore.teleport(dPrimeAmount, dstnetwork.name)
      const pendingTransaction: IPendingTransaction = {
        hash: tx.hash,
        status: 'REQUESTING',
        source: tx,
        type: 'TELEPORT',
        from: {
          amount: dPrimeAmount,
          token: supportedTokens.dPrime.symbol,
          networkImg: appStore.selectedNetwork!.iconName,
          network: appStore.selectedNetwork!.name,
          chainId: appStore.selectedNetwork!.chainId
        },
        to: {
          amount: dPrimeAmount,
          token: supportedTokens.dPrime.symbol,
          networkImg: dstnetwork.iconName,
          network: dstnetwork.name,
          chainId: dstnetwork.chainId
        },
        startedAt: new Date()
      }
      appStore.setPendingTransactions([...appStore.pendingTransactions, pendingTransaction])
      appStore.setNotifyTransaction(pendingTransaction)

      await tx.wait()
      appStore.updateBalances()
    } catch (err) {
      console.error(err)
      const errorTx: IPendingTransaction = {
        hash: 'hash',
        status: 'FAILED',
        type: 'TELEPORT',
        startedAt: new Date()
      }
      appStore.setNotifyTransaction(errorTx)
    }
  }

  // const switchNetwork = async () => {
  //   await appStore.switchNetwork(destinationNetwork.chainId)
  //   setTxState('none')
  // }

  const isBelowZero = () => {
    return Number(amount) <= 0
  }

  const isAboveBalance = () => {
    return Number(amount) > Number(dPrimeBalance)
  }

  return (
    <div className="flex p-4 w-full justify-center py-24">
      <div className="flex flex-col max-w-7xl gap-6">
        <Disclaimer infoTxt={['Teleport d2O between Ethereum and Polkadot.']}></Disclaimer>
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
            <AvailableInput
              amount={amount}
              available={dPrimeBalance}
              gasPrice={gasPrice}
              handleChange={(value) => setAmount(value)}
              decimals={supportedTokens.dPrime.units}
            >
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
                onClick={() => teleportTo(amount, destinationNetwork)}
                className="flex items-center w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed gap-2 rounded-full py-4 px-6 text-black font-bold bg-gradient-to-r from-[#7742CD] to-[#F1DD79] hover:from-[#8458cc] hover:to-[#ebdd9c]"
                style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                disabled={isBelowZero() || isAboveBalance()}
              >
                <img src={utils.getImageSrc('teleport.svg')} alt="teleport" />
                {isAboveBalance() ? 'Insufficient balance' : 'Teleport'}
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
    </div>
  )
}

export default Teleport
