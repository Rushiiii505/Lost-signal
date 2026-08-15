import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, MessageSquare, AlertCircle, Phone, Square, Sparkles } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const DynamicIsland: React.FC = () => {
  const { dynamicIsland, activeAudioMemo, stopAudioMemo, openApp } = useOSStore();

  const isExpanded = dynamicIsland.mode !== 'idle';

  return (
    <div className="absolute top-2 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className={`pointer-events-auto bg-black text-white rounded-full shadow-2xl flex items-center justify-between overflow-hidden border border-white/10 ${
          dynamicIsland.mode === 'audio_playing'
            ? 'h-9 px-3.5 min-w-[210px]'
            : dynamicIsland.mode === 'notification'
            ? 'h-11 px-4 min-w-[260px]'
            : dynamicIsland.mode === 'clue_found'
            ? 'h-10 px-4 min-w-[240px] border-cyan-500/50 shadow-glow-cyan'
            : 'h-6 w-24 px-2'
        }`}
      >
        <AnimatePresence mode="wait">
          {dynamicIsland.mode === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex items-center justify-between px-1"
            >
              {/* Camera sensor dot & Face-ID IR dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-900/40"></div>
            </motion.div>
          )}

          {dynamicIsland.mode === 'audio_playing' && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-3 h-3 animate-pulse" />
                </div>
                <div className="truncate text-left">
                  <p className="text-[11px] font-medium text-amber-300 truncate max-w-[90px]">
                    {dynamicIsland.title || 'Voice Memo'}
                  </p>
                  <p className="text-[9px] text-gray-400 font-mono">
                    {Math.round((dynamicIsland.progress || 0) * 100)}%
                  </p>
                </div>
              </div>

              {/* Animated mini frequency equalizer */}
              <div className="flex items-end gap-0.5 h-3.5">
                {[40, 90, 60, 100, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['20%', `${h}%`, '30%'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5 + i * 0.1,
                      ease: 'easeInOut',
                    }}
                    className="w-0.5 bg-amber-400 rounded-full"
                  />
                ))}
              </div>

              {/* Stop button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stopAudioMemo();
                }}
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                title="Stop Audio"
              >
                <Square className="w-2.5 h-2.5 fill-current" />
              </button>
            </motion.div>
          )}

          {dynamicIsland.mode === 'notification' && (
            <motion.div
              key="notification"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              onClick={() => openApp('chat')}
              className="w-full flex items-center gap-2.5 text-left cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 truncate">
                <p className="text-[11px] font-semibold text-white truncate">
                  {dynamicIsland.title}
                </p>
                <p className="text-[9px] text-gray-400 truncate">
                  {dynamicIsland.subtitle}
                </p>
              </div>
            </motion.div>
          )}

          {dynamicIsland.mode === 'clue_found' && (
            <motion.div
              key="clue"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => openApp('caseboard')}
              className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <p className="text-[11px] font-bold text-cyan-300 truncate">EVIDENCE LOGGED</p>
                  <p className="text-[9px] text-gray-300 truncate">{dynamicIsland.title}</p>
                </div>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">VIEW</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
