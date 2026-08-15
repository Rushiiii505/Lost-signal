import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  ChevronLeft, 
  Search, 
  DollarSign, 
  Briefcase,
  Layers,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { useOSStore } from '../../../store/useOSStore';
import { soundFX } from '../../../audio/soundFX';

export const StocksApp: React.FC = () => {
  const { closeApp } = useOSStore();
  const [selectedTicker, setSelectedTicker] = useState('THRN');

  const stocks = [
    { ticker: 'THRN', name: 'Thorne Capital LP', price: '$420,000', change: '+12.4%', isUp: true, note: 'Offshore Escrow Account #8991 linked to Zurich Trust' },
    { ticker: 'SPY', name: 'S&P 500 Index Fund', price: '$586.20', change: '+0.85%', isUp: true, note: 'Core Institutional Holding' },
    { ticker: 'NVDA', name: 'NVIDIA Corp', price: '$134.90', change: '-1.20%', isUp: false, note: 'Semi-conductor Growth Allocation' },
    { ticker: 'ZURICH', name: 'Banque Privée Escrow', price: '$200,000', change: 'PENDING', isUp: true, note: 'Pending Extortion Transfer (Beneficiary: Chloe V.)' },
    { ticker: 'BTC', name: 'Bitcoin Cold Vault', price: '$68,450', change: '+3.10%', isUp: true, note: 'Hardware Key backed by Swiss Safe Box' },
  ];

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-4 pt-2 pb-2 bg-[#000000] border-b border-[#1C1C1E] flex items-center justify-between z-10">
        <button
          onClick={() => {
            soundFX.playTapSound();
            closeApp();
          }}
          className="text-[#007AFF] text-[15px] font-normal flex items-center gap-0.5 hover:opacity-80 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 -ml-1.5" />
          <span>Home</span>
        </button>

        <h1 className="text-[17px] font-bold text-white tracking-tight">
          Stocks
        </h1>

        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
        {/* Main Portfolio Summary Card */}
        <div className="p-4 rounded-[24px] bg-[#1C1C1E] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between text-xs text-[#8E8E93] mb-1">
            <span className="font-semibold text-white">Thorne Capital Portfolio</span>
            <span className="font-mono text-[#34C759] flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +$54,200 (Today)
            </span>
          </div>

          <div className="text-[28px] font-bold text-white font-mono tracking-tight my-1">
            $2,842,500.00
          </div>

          {/* Interactive Simulated Line Chart */}
          <div className="h-28 w-full mt-3 rounded-[16px] bg-black/40 border border-white/5 relative flex items-end p-2 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              <path
                d="M 0,60 Q 60,70 100,40 T 200,30 T 300,10"
                fill="none"
                stroke="#34C759"
                strokeWidth="3"
              />
              <path
                d="M 0,60 Q 60,70 100,40 T 200,30 T 300,10 L 300,80 L 0,80 Z"
                fill="url(#greenGrad)"
                opacity="0.2"
              />
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34C759" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Watchlist Tickers List */}
        <div>
          <p className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-2 px-1">
            Watchlist & Managed Escrow
          </p>

          <div className="rounded-[20px] bg-[#1C1C1E] divide-y divide-[#2C2C2E]/60 border border-white/5 overflow-hidden">
            {stocks.map((stock) => (
              <motion.div
                key={stock.ticker}
                whileTap={{ backgroundColor: '#2C2C2E' }}
                onClick={() => setSelectedTicker(stock.ticker)}
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#2C2C2E]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-[14px]">{stock.ticker}</span>
                    <span className="text-[10px] text-[#8E8E93] font-mono">{stock.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{stock.note}</p>
                </div>

                <div className="text-right">
                  <span className="text-[13px] font-bold text-white font-mono block">{stock.price}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${stock.isUp ? 'bg-[#34C759] text-black' : 'bg-[#FF3B30] text-white'}`}>
                    {stock.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
