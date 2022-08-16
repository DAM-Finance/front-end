import detectEthereumProvider from "@metamask/detect-provider";

class Metamask {
    async detectProvider() {
        const provider = await detectEthereumProvider();
        return this.isValidProvider(provider) ? provider : null;
    }

    isValidProvider(provider) {
        return (provider && provider === window.ethereum && provider.isMetaMask);
    }

    async getChainId(provider) {
        if(!this.isValidProvider(provider)) return null;

        const chainId = await provider.request({ method: 'eth_chainId' });
        return chainId;
    }

    async connect(provider) {
        if(!this.isValidProvider(provider)) return [];

        try{
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            return accounts;
        }
        catch(err) {
            console.log("Could not connect to metamask!");
            return [];
        }
    }

    subscribeEvents(provider, handler) {
        if(!this.isValidProvider(provider)) return;

        provider.on('connect', () => handler({ connectedToChain: provider.isConnected()}));
        provider.on('disconnect', () => handler({ connectedToChain: provider.isConnected()}));
        provider.on('chainChanged', (chainId) => handler({ chainId }));
        provider.on('accountsChanged', (accounts) => handler({ accounts }));
    }

    unsubscribeEvents(provider, handler) {
        if(!this.isValidProvider(provider)) return;

        provider.removeListener('connect', () => handler({ connectedToChain: provider.isConnected()}));
        provider.removeListener('disconnect', () => handler({ connectedToChain: provider.isConnected()}));
        provider.removeListener('chainChanged', (chainId) => handler({ chainId }));
        provider.removeListener('accountsChanged', (accounts) => handler({ accounts }));
    }
}

export default Metamask;