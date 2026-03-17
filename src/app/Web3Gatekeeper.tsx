// components/Web3Gatekeeper.tsx
"use client" // 👈 这一行是关键，它确立了客户端边界

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// 在这里定义 dynamic 导入，此时它位于客户端组件中，ssr: false 就能正常工作了
const DynamicProviders = dynamic(
  () => import('./Providers').then((mod) => mod.Providers),
  { 
    ssr: false, 
    loading: () => null // 或者写个简单的 Loading
  }
);

export default function Web3Gatekeeper({ children }: { children: ReactNode }) {
  return <DynamicProviders>{children}</DynamicProviders>;
}