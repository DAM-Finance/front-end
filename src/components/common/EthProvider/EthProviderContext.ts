import React from 'react';

export const INITIAL_ETH_PROVIDER_CONTEXT = {
    provider: null,
    connectedToChain: false,
    chainId: null,
    accounts: [],
    connected: false,
    connectWallet: async () => false
};

export const EthProviderContext = React.createContext(INITIAL_ETH_PROVIDER_CONTEXT);
