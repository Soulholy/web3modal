"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useWeb3Modal, Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

const chains = [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function HomePage() {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <>
      <Web3Button />
    </>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>
        
        <h1 className={styles.title}>
          <WagmiConfig client={wagmiClient}>
            <HomePage />
          </WagmiConfig>

          <Web3Modal
            projectId="<YOUR_PROJECT_ID>"
            theme="dark"
            accentColor="default"
            ethereumClient={ethereumClient}
          />
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
