
"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left side - GitHub icon and project name */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            next-web3
          </h1>
        </div>

        {/* Right side - Connect Button */}
        <ConnectButton showBalance={false} />
      </div>
    </header>
  );
}