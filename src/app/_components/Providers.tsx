"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode, useState } from "react";
import rainbowkitConfig from "../../rainbowkitConfig";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { useIsMounted } from "@/hooks/syncExternalStore";
export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <WagmiProvider config={rainbowkitConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
