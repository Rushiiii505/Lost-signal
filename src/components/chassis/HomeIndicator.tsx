import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { ChevronLeft, Circle, Square, Home } from 'lucide-react';
import { soundFX } from '../../audio/soundFX';

export const HomeIndicator: React.FC = () => {
  const { activeApp, closeApp, toggleAppSwitcher } = useOSStore();

  return (
    <div className="w-full h-8 flex items-center justify-center relative select-none z-50 bg-black/40 backdrop-blur-md border-t border-white/5">
      {/* If an app is open, show both the back button and the iOS home pill */}
      <div className="w-full px-6 flex items-center justify-between">
        {/* Left Back to Home shortcut button */}
        {activeApp ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playTapSound();
              closeApp();
            }}
            className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 active:scale-95 transition-all px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10"
            title="Return to Home Screen"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
        ) : (
          <div className="w-12" />
        )}

        {/* Center iOS Pill Indicator (Click to return Home or toggle App Switcher) */}
        <motion.button
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            soundFX.playTapSound();
            if (activeApp) {
              closeApp();
            } else {
              toggleAppSwitcher();
            }
          }}
          className="w-32 h-1.5 bg-white/70 hover:bg-white active:bg-white rounded-full transition-all cursor-pointer shadow-sm"
          title="Home Indicator — Tap to return Home"
        />

        {/* Right Multitasking / Switcher button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playTapSound();
            toggleAppSwitcher();
          }}
          className="text-[11px] font-semibold text-gray-400 hover:text-white active:scale-95 transition-all px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10"
          title="App Switcher"
        >
          <span>Apps</span>
        </button>
      </div>
    </div>
  );
};
