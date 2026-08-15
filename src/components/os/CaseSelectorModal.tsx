import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, ChevronRight, X, Sparkles, User, FileText, Lock } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { useOSStore } from '../../store/useOSStore';
import { getAllLevels } from '../../data/levelLoader';

interface CaseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseSelectorModal: React.FC<CaseSelectorModalProps> = ({ isOpen, onClose }) => {
  const { currentLevel, selectLevel, discoveredClueIds, isCaseSolved } = useGameStore();
  const { closeApp } = useOSStore();
  const allLevels = getAllLevels();

  if (!isOpen) return null;

  const caseCategories = [
    { num: 1, tag: 'HOMICIDE // PART 1', difficulty: 'Normal', icon: '🕵️‍♂️' },
    { num: 2, tag: 'HOMICIDE // PART 2', difficulty: 'Hard', icon: '🏛️' },
    { num: 3, tag: 'INFIDELITY & BLACKMAIL', difficulty: 'Expert', icon: '💔' },
  ];

  return (
    <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none font-sans">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-md rounded-[28px] bg-[#1C1C1E] border border-white/15 p-5 shadow-2xl text-left flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2C2C2E]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[10px] bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-white tracking-tight">
                Case Files & Mystery Select
              </h2>
              <p className="text-[11px] text-[#8E8E93]">
                Select active phone forensic investigation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#2C2C2E] flex items-center justify-center text-[#8E8E93] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cases List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-3 space-y-3">
          {allLevels.map((lvl, index) => {
            const meta = caseCategories[index] || { num: lvl.levelNumber, tag: 'MYSTERY', difficulty: 'Normal', icon: '📁' };
            const isSelected = currentLevel === lvl.levelNumber;

            return (
              <motion.div
                key={lvl.levelNumber}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  selectLevel(lvl.levelNumber);
                  closeApp();
                  onClose();
                }}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-[#007AFF] shadow-lg shadow-[#007AFF]/20 ring-1 ring-[#007AFF]'
                    : 'bg-[#2C2C2E]/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{meta.icon}</span>
                    <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-full border border-red-500/30">
                      {meta.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-[#8E8E93] bg-black/40 px-2 py-0.5 rounded-full">
                    {meta.difficulty}
                  </span>
                </div>

                <h3 className="text-[15px] font-bold text-white mt-1">
                  Level {lvl.levelNumber}: {lvl.levelTitle}
                </h3>
                <p className="text-[12px] text-gray-300 line-clamp-2 mt-1 leading-snug">
                  {lvl.objective}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[11px] text-[#8E8E93]">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Target: {lvl.victimName}</span>
                  </div>

                  {isSelected ? (
                    <span className="text-[#007AFF] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE
                    </span>
                  ) : (
                    <span className="text-gray-400 flex items-center gap-0.5">
                      Select <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
