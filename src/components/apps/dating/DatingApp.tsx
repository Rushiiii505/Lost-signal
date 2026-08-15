import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  MessageCircle, 
  User, 
  ChevronLeft, 
  Lock, 
  MapPin, 
  Flame,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { useOSStore } from '../../../store/useOSStore';
import { soundFX } from '../../../audio/soundFX';

export const DatingApp: React.FC = () => {
  const { closeApp, openApp } = useOSStore();
  const [activeTab, setActiveTab] = useState<'chats' | 'vip'>('chats');

  return (
    <div className="relative flex-1 w-full h-full bg-[#0d0914] text-gray-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Header */}
      <div className="px-4 pt-2 pb-2 bg-[#170e24] border-b border-purple-900/40 flex items-center justify-between z-10">
        <button
          onClick={() => {
            soundFX.playTapSound();
            closeApp();
          }}
          className="text-purple-400 text-[15px] font-normal flex items-center gap-0.5 hover:opacity-80 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 -ml-1.5" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h1 className="text-[17px] font-bold text-white tracking-tight">
            Velvet VIP
          </h1>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 border border-purple-500/40">
          BLACK TIER
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
        {/* VIP Member Header Card */}
        <div className="p-4 rounded-[24px] bg-gradient-to-tr from-purple-950 via-[#1e102f] to-[#12071f] border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                LT
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Liam Thorne</h3>
                <p className="text-[11px] text-purple-300">Verified High Net Worth • Manhattan</p>
              </div>
            </div>
            <Flame className="w-5 h-5 text-pink-400 animate-pulse" />
          </div>

          <div className="p-2.5 rounded-[14px] bg-black/40 border border-purple-500/20 text-xs text-purple-200">
            <p><strong>Current Active Booking:</strong> The St. Regis Penthouse Suite #1402 (Alias: David Vance).</p>
          </div>
        </div>

        {/* Private Encrypted Direct Messages */}
        <div>
          <p className="text-[12px] font-bold text-purple-300 uppercase tracking-wider mb-2 px-1">
            Private VIP Messages
          </p>

          <div className="rounded-[20px] bg-[#160d24] border border-purple-900/40 overflow-hidden divide-y divide-purple-900/30">
            {/* Chloe V. Thread */}
            <motion.div
              whileTap={{ backgroundColor: '#23123b' }}
              onClick={() => openApp('chat')}
              className="p-3.5 flex items-start justify-between cursor-pointer hover:bg-purple-950/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow">
                  CV
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-bold text-white">Chloe V. (VIP Lounge)</h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-pink-900/80 text-pink-300 border border-pink-500/40">VIP MATCH</span>
                  </div>
                  <p className="text-[12px] text-purple-200 line-clamp-2 mt-0.5">
                    "I saw Evelyn's Instagram. Have the $200k ready by Friday or I send the Miami yacht photos to her divorce lawyer."
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-purple-400 font-mono">8:30 PM</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
