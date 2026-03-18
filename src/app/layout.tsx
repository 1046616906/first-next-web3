
import "./globals.css";
import Web3Gatekeeper from './_components/Web3Gatekeeper';
import Header from '@/components/Header';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Web3Gatekeeper>
          <Header />
          {children}
        </Web3Gatekeeper>
      </body>
    </html>
  );
}
