import React from 'react';
import { motion } from 'framer-motion';
import { Car, Star, ChevronLeft } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { getLevelData } from '../../../data/levelLoader';
import { soundFX } from '../../../audio/soundFX';

export const RidesApp: React.FC = () => {
  const { currentLevel, discoverClue } = useGameStore();
  const { closeApp } = useOSStore();
  const levelData = getLevelData(currentLevel);

  const ride = levelData.rideHistory[0];

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
          MetroPulse
        </h1>

        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {/* Apple Maps Style Dark Route View */}
        <div className="relative h-60 w-full rounded-[24px] bg-[#1C1C1E] border border-white/10 overflow-hidden shadow-2xl p-3 flex flex-col justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(#2C2C2E_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 350 240">
            <path d="M 0,200 Q 120,180 200,120 T 350,80" fill="none" stroke="#007AFF" strokeWidth="2" opacity="0.3" />
            <path
              d="M 60,170 C 120,170 160,130 270,90"
              fill="none"
              stroke="#007AFF"
              strokeWidth="5"
              strokeDasharray="6 4"
              className="animate-pulse"
            />
          </svg>

          {/* Pickup Pin */}
          <div className="absolute left-8 bottom-12 flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#007AFF] border-2 border-black animate-ping" />
            <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center font-bold text-[10px] shadow-md">
              A
            </div>
            <span className="text-[9px] font-semibold text-cyan-200 bg-black/80 px-1.5 py-0.5 rounded border border-cyan-500/30 mt-0.5 whitespace-nowrap">
              {ride?.pickup || 'Pickup'}
            </span>
          </div>

          {/* Dropoff Pin */}
          <div className="absolute right-10 top-10 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#FF3B30] text-white flex items-center justify-center font-bold text-[10px] shadow-md">
              B
            </div>
            <span className="text-[9px] font-semibold text-red-200 bg-black/80 px-1.5 py-0.5 rounded border border-red-500/30 mt-0.5 whitespace-nowrap">
              {ride?.dropoff || 'Dropoff'}
            </span>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] font-medium text-white bg-black/70 px-3 py-1.5 rounded-[12px] border border-white/10">
            <span>TRIP: {ride?.timestamp || '11:28 PM'}</span>
            <span className="text-[#34C759] font-bold">$24.50</span>
          </div>
        </div>

        {/* Driver & Vehicle Dossier Card */}
        {ride ? (
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              soundFX.playTapSound();
              if (ride.clueId) discoverClue(ride.clueId);
            }}
            className="p-4 rounded-[24px] bg-[#1C1C1E] border border-white/10 shadow-xl cursor-pointer hover:border-[#007AFF] transition-all"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2C2C2E]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">{ride.driverName}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>4.98 Rating</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-[#34C759] bg-[#34C759]/10 px-2 py-0.5 rounded-full font-medium">
                Completed
              </span>
            </div>

            {/* Vehicle & Plate Highlight */}
            <div className="p-3.5 rounded-[16px] bg-black/50 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#8E8E93] uppercase font-bold">VEHICLE</p>
                <p className="text-[13px] font-medium text-gray-200 mt-0.5">{ride.vehicleModel}</p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-[#8E8E93] font-bold uppercase">LICENSE PLATE</p>
                <p className="text-[15px] font-bold font-mono text-white bg-[#2C2C2E] px-2.5 py-0.5 rounded border border-white/10 mt-0.5 tracking-wider">
                  {ride.licensePlate}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="p-6 rounded-[24px] bg-[#1C1C1E] text-center text-gray-400 text-xs">
            No active dispatch records for this timeframe.
          </div>
        )}
      </div>
    </div>
  );
};
