import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider,darkTheme,ConnectButton, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  filecoinCalibration
  
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import  {alchemyProvider} from 'wagmi/providers/alchemy'
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
 
    filecoinCalibration
    
  ],
  [publicProvider()],

);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'cc16b3e2dee8e0efd1bb60d903941c25',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
// @ts-ignore 
function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={lightTheme()}>
      <div className="absolute top-4 right-4">
                    <ConnectButton />
                </div>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;