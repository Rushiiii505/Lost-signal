import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import { StatusBar } from './StatusBar';
import { DynamicIsland } from './DynamicIsland';
import { HomeIndicator } from './HomeIndicator';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const { isDesktopView, lockPhone, toggleMute } = useOSStore();

  return (
    <div className="relative flex items-center justify-center h-full w-full select-none">
      {/* Phone Frame Wrapper with exact viewport scaling */}
      <div
        className={`relative transition-all duration-300 ${
          isDesktopView
            ? 'w-[360px] h-[720px] max-h-[86vh] rounded-[48px] shadow-phone-case ring-1 ring-white/20 border-[6px] border-[#22252e]'
            : 'w-full h-full max-w-md rounded-none'
        } bg-[#000000] p-2.5 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden`}
        style={{
          boxShadow: isDesktopView 
            ? '0 0 0 2px #16181f, 0 20px 50px -10px rgba(0, 0, 0, 0.95), 0 0 35px -5px rgba(6, 182, 212, 0.15)' 
            : 'none',
        }}
      >
        {/* Hardware side buttons (Desktop frame mode) */}
        {isDesktopView && (
          <>
            {/* Left: Volume Buttons */}
            <div 
              className="absolute -left-[9px] top-20 w-[3px] h-8 bg-zinc-700 rounded-l cursor-pointer hover:bg-zinc-500 transition-colors" 
              onClick={toggleMute} 
              title="Mute / Volume" 
            />
            <div 
              className="absolute -left-[9px] top-32 w-[3px] h-10 bg-zinc-700 rounded-l cursor-pointer hover:bg-zinc-500 transition-colors" 
              onClick={toggleMute} 
              title="Volume Up" 
            />
            <div 
              className="absolute -left-[9px] top-46 w-[3px] h-10 bg-zinc-700 rounded-l cursor-pointer hover:bg-zinc-500 transition-colors" 
              onClick={toggleMute} 
              title="Volume Down" 
            />

            {/* Right: Power / Lock Button */}
            <div 
              className="absolute -right-[9px] top-28 w-[3px] h-14 bg-zinc-700 rounded-r cursor-pointer hover:bg-zinc-500 transition-colors" 
              onClick={lockPhone} 
              title="Lock Screen" 
            />
          </>
        )}

        {/* Screen Bezel & Display */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#000000] flex flex-col justify-between border border-white/10 shadow-inner">
          
          {/* Top TrueDepth Dynamic Island */}
          <DynamicIsland />

          {/* Top iOS Status Bar */}
          <StatusBar />

          {/* Inner Content Area */}
          <div className="relative flex-1 w-full overflow-hidden flex flex-col">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <HomeIndicator />

          {/* Subtle Screen Glare Overlay */}
          <div className="absolute inset-0 phone-glare pointer-events-none z-30 opacity-40" />
        </div>
      </div>
    </div>
  );
};
