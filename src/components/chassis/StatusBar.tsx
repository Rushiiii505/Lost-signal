import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import { useGameStore } from '../../store/useGameStore';
import { getLevelData } from '../../data/levelLoader';
import { VolumeX } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { isMuted, toggleNotificationCenter } = useOSStore();
  const { currentLevel } = useGameStore();
  const levelData = getLevelData(currentLevel);

  const timeDisplay = levelData.deviceTimestamp.replace(' PM', '').replace(' AM', '');
  const batteryLevel = levelData.batteryPercentage || 89;

  return (
    <div 
      onClick={toggleNotificationCenter}
      className="h-10 w-full px-7 flex items-center justify-between text-xs font-semibold text-white select-none cursor-pointer hover:bg-white/5 transition-colors z-40"
    >
      {/* Left: iOS Time */}
      <div className="flex items-center gap-1.5 pl-1">
        <span className="font-semibold text-[14px] tracking-tight text-white font-sans">
          {timeDisplay}
        </span>
        {currentLevel > 1 && (
          <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-red-500/30 text-red-300 font-mono border border-red-500/40">
            LVL {currentLevel}
          </span>
        )}
      </div>

      {/* Right: iOS Cellular, Wi-Fi, Mute, Battery */}
      <div className="flex items-center gap-2 pr-1 text-white">
        {isMuted && (
          <VolumeX className="w-3.5 h-3.5 text-amber-400" />
        )}
        
        {/* Cellular 4-bar icon */}
        <div className="flex items-end gap-[1.5px] h-3">
          <div className="w-[3px] h-[4px] bg-white rounded-[0.5px]" />
          <div className="w-[3px] h-[6px] bg-white rounded-[0.5px]" />
          <div className="w-[3px] h-[8px] bg-white rounded-[0.5px]" />
          <div className="w-[3px] h-[10px] bg-white rounded-[0.5px]" />
        </div>

        {/* 5G Badge */}
        <span className="text-[11px] font-bold tracking-tight">5G</span>

        {/* Wi-Fi Icon SVG */}
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21L24 8.98C20.93 5.9 16.69 4 12 4ZM12 8.5C14.7 8.5 17.15 9.6 18.97 11.39L12 18.36L5.03 11.39C6.85 9.6 9.3 8.5 12 8.5Z" />
        </svg>

        {/* Authentic iOS Battery Pill */}
        <div className="flex items-center gap-1 pl-0.5">
          <span className="text-[11px] font-medium font-sans">{batteryLevel}%</span>
          <div className="relative w-6 h-[11px] rounded-[3.5px] border border-white/80 p-[1px] flex items-center">
            <div 
              className="h-full bg-emerald-400 rounded-[2px] transition-all"
              style={{ width: `${batteryLevel}%` }}
            />
            <div className="absolute -right-[3px] top-[2.5px] w-[2px] h-[4px] bg-white/80 rounded-r-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
