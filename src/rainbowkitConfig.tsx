"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, zksync, mainnet } from "viem/chains";
import { http } from "wagmi";

export default getDefaultConfig({
  appName: "TSender",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [mainnet, zksync, anvil],
  transports: {
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL || "https://cloudflare-eth.com"
    ),
    [zksync.id]: http("https://mainnet.era.zksync.io"),
    [anvil.id]: http("http://127.0.0.1:8545"),
  },
  ssr: false,
});
