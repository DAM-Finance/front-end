import React, { Component } from 'react'
import Metamask from '../../../wallet/metamask'
import { EthProviderContext, INITIAL_ETH_PROVIDER_CONTEXT } from './EthProviderContext'
import { ethers } from 'ethers'
// import { StateContext } from '../State/State'

class EthProvider extends Component {
  //   static stateContext = StateContext

  state = {
    ...INITIAL_ETH_PROVIDER_CONTEXT
  }

  metamask = new Metamask()

  async componentDidMount() {
    const provider = await this.metamask.detectProvider()
    const chainId = await this.metamask.getChainId(provider)

    this.metamask.subscribeEvents(provider, this.updateProviderData)
    this.setState({ provider, chainId, connectWallet: this.connectWallet })

    await this.autoConnect(provider)
  }

  async autoConnect(metamaskProvider) {
    const provider = new ethers.providers.Web3Provider(metamaskProvider)
    const accounts = await provider.listAccounts()

    if (accounts.length) this.connectWallet()
  }

  updateProviderData = (data) => {
    let newState = { ...this.state, ...data }
    newState.connected = newState.accounts && newState.accounts.length ? true : false

    this.setState(newState)
    // Improve demo with fake data that will get collected from the smart contract
    const fakeData = {
      dPrime: 15347,
      cushion: 21,
      portfolioValue: 23324
    }
    this.props.setPortfolio((state) => {
      return fakeData
    })
  }

  connectWallet = async () => {
    const accounts = await this.metamask.connect(this.state.provider)
    this.updateProviderData({ accounts })
    return accounts
  }

  componentWillUnmount() {
    this.metamask.unsubscribeEvents(this.state.provider, this.updateProviderData)
  }

  render() {
    return <EthProviderContext.Provider value={this.state}>{this.props.children}</EthProviderContext.Provider>
  }
}

export default EthProvider
