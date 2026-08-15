import React from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Volume2, 
  VolumeX, 
  Smartphone, 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  User,
  ShieldCheck,
  Moon,
  Info
} from 'lucide-react';
import { useOSStore } from '../../../store/useOSStore';
import { useGameStore } from '../../../store/useGameStore';
import { soundFX } from '../../../audio/soundFX';

export const SettingsApp: React.FC = () => {
  const { 
    isMuted, 
    toggleMute, 
    isDesktopView, 
    toggleViewMode, 
    nextWallpaper,
    toggleCaseBoard,
    closeApp
  } = useOSStore();

  const { currentLevel, discoveredClueIds, gameScore, resetGame } = useGameStore();

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
          Settings
        </h1>

        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {/* Apple ID Profile Card */}
        <div className="p-3.5 rounded-[20px] bg-[#1C1C1E] border border-white/5 flex items-center gap-3.5 shadow-lg">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#007AFF] to-cyan-400 flex items-center justify-center text-white text-xl font-bold">
            ML
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-white leading-snug">Maya Lin</h3>
            <p className="text-[12px] text-[#8E8E93]">Apple ID, iCloud+, Media & Purchases</p>
          </div>
        </div>

        {/* Grouped Inset List: Preferences */}
        <div>
          <span className="text-[12px] font-semibold text-[#8E8E93] uppercase px-3 mb-1.5 block">
            System & Forensics
          </span>

          <div className="rounded-[20px] bg-[#1C1C1E] divide-y divide-[#2C2C2E]/60 border border-white/5 overflow-hidden">
            {/* Audio Toggle */}
            <div 
              onClick={toggleMute}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#2C2C2E]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[8px] bg-[#FF9500] text-white flex items-center justify-center">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </div>
                <span className="text-[14px] font-medium text-white">Sounds & Haptics</span>
              </div>
              <span className="text-[13px] text-[#8E8E93]">{isMuted ? 'Muted' : 'Enabled'}</span>
            </div>

            {/* Display Mode */}
            <div 
              onClick={toggleViewMode}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#2C2C2E]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[8px] bg-[#007AFF] text-white flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-medium text-white">Chassis Display Frame</span>
              </div>
              <span className="text-[13px] text-[#8E8E93]">{isDesktopView ? 'Phone Frame' : 'Fullscreen'}</span>
            </div>

            {/* Wallpaper */}
            <div 
              onClick={nextWallpaper}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#2C2C2E]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[8px] bg-[#AF52DE] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-medium text-white">Wallpaper Skin</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
            </div>
          </div>
        </div>

        {/* Case Progression & Reset */}
        <div>
          <span className="text-[12px] font-semibold text-[#8E8E93] uppercase px-3 mb-1.5 block">
            Homicide Investigation
          </span>

          <div className="rounded-[20px] bg-[#1C1C1E] divide-y divide-[#2C2C2E]/60 border border-white/5 overflow-hidden">
            {/* Case Board */}
            <div 
              onClick={toggleCaseBoard}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#2C2C2E]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[8px] bg-[#FF3B30] text-white flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[14px] font-medium text-white block">Detective Case Board</span>
                  <span className="text-[11px] text-[#8E8E93]">Level {currentLevel} • {discoveredClueIds.length} Clues</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
            </div>

            {/* Reset */}
            <div 
              onClick={() => {
                if (confirm('Reset investigation and restart from Level 1?')) {
                  resetGame();
                }
              }}
              className="p-3.5 px-4 flex items-center justify-between cursor-pointer hover:bg-[#2C2C2E]/40 text-[#FF3B30] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[8px] bg-red-950 text-[#FF3B30] flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-medium">Reset Mystery Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
