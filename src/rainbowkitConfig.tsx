"use client"
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, zksync, mainnet } from "viem/chains";

export default getDefaultConfig({
    appName: 'TSender',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    chains: [mainnet, zksync, anvil],
    ssr: false
})