// components/Web3Gatekeeper.tsx
"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const DynamicProviders = dynamic(
  () => import("./Providers").then((mod) => mod.Providers),
  {
    ssr: false,
    loading: () => null, //
  }
);

export default function Web3Gatekeeper({ children }: { children: ReactNode }) {
  return <DynamicProviders>{children}</DynamicProviders>;
}
