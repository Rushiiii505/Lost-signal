import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  ChevronLeft
} from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { getLevelData } from '../../../data/levelLoader';
import { BankTransaction } from '../../../types/game';
import { soundFX } from '../../../audio/soundFX';

export const BankApp: React.FC = () => {
  const { currentLevel, discoverClue } = useGameStore();
  const { closeApp } = useOSStore();
  const levelData = getLevelData(currentLevel);

  const [selectedTx, setSelectedTx] = useState<BankTransaction | null>(null);
  const transactions = levelData.banking.transactions;

  const handleInspectTx = (tx: BankTransaction) => {
    soundFX.playTapSound();
    setSelectedTx(tx);
    if (tx.clueId) {
      discoverClue(tx.clueId);
    }
  };

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-4 pt-2 pb-2 bg-[#000000] border-b border-[#1C1C1E] flex items-center justify-between">
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
          Apex Vault
        </h1>

        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {/* Apple Wallet Style Titanium Debit Card */}
        <div className="p-5 rounded-[24px] bg-gradient-to-tr from-[#1C1C1E] via-[#2C2C2E] to-[#3A3A3C] border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
            <span className="font-semibold text-white">{levelData.banking.accountHolder}</span>
            <CreditCard className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="text-[28px] font-bold font-sans text-white tracking-tight my-2">
            ${levelData.banking.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8E8E93] mt-4 font-mono">
            <span>{transactions[0]?.accountNumberMasked || '•••• 9012'}</span>
            <span>EXP 08/28</span>
          </div>
        </div>

        {/* Transactions List */}
        <div>
          <div className="flex items-center justify-between text-[12px] text-[#8E8E93] mb-2 px-1 font-semibold uppercase tracking-wider">
            <span>Latest Activity</span>
            <span>{transactions.length} Transactions</span>
          </div>

          <div className="rounded-[20px] bg-[#1C1C1E] divide-y divide-[#2C2C2E]/60 border border-white/5 overflow-hidden">
            {transactions.map((tx) => {
              const isCredit = tx.amount > 0;

              return (
                <motion.div
                  key={tx.id}
                  whileTap={{ backgroundColor: '#2C2C2E' }}
                  onClick={() => handleInspectTx(tx)}
                  className="p-3.5 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        isCredit
                          ? 'bg-[#34C759]/20 text-[#34C759]'
                          : 'bg-[#FF3B30]/20 text-[#FF3B30]'
                      }`}
                    >
                      {isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>

                    <div>
                      <h4 className="text-[14px] font-semibold text-white truncate max-w-[170px]">
                        {tx.merchant}
                      </h4>
                      <p className="text-[11px] text-[#8E8E93]">
                        {tx.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-[14px] font-semibold ${
                        isCredit ? 'text-[#34C759]' : 'text-white'
                      }`}
                    >
                      {isCredit ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-[24px] bg-[#1C1C1E] border border-white/10 p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="text-[11px] text-[#007AFF] uppercase font-bold">
                TRANSACTION RECEIPT
              </span>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-gray-400 hover:text-white text-xs"
              >
                Done
              </button>
            </div>

            <h3 className="text-[16px] font-bold text-white mb-1">{selectedTx.merchant}</h3>
            <div className="text-2xl font-black text-[#34C759] my-2">
              {selectedTx.amount > 0 ? '+' : ''}${Math.abs(selectedTx.amount).toFixed(2)} USD
            </div>

            <div className="space-y-1.5 text-xs text-gray-300 my-3">
              <p><strong>Date:</strong> {selectedTx.date}</p>
              <p><strong>Category:</strong> <span className="capitalize">{selectedTx.category}</span></p>
              <p><strong>Account:</strong> {selectedTx.accountNumberMasked}</p>
              {selectedTx.note && (
                <p className="p-2.5 rounded-[12px] bg-black/50 border border-white/10 text-gray-300 mt-2">
                  <strong>Notes:</strong> {selectedTx.note}
                </p>
              )}
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full py-2.5 rounded-[12px] bg-[#007AFF] text-white font-bold text-xs"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
