"use client"

import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode, useEffect, useState } from "react";
import rainbowkitConfig from "../rainbowkitConfig";
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi"
export function Providers(props: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div>
            <WagmiProvider config={rainbowkitConfig}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider >
                        {mounted ? props.children : null}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </div>
    )
}
