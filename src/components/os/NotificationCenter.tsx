import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronUp, 
  Trash2, 
  Wifi, 
  Signal, 
  Bluetooth, 
  Plane, 
  Flashlight, 
  Play, 
  Pause, 
  Sun,
  Camera,
  Calculator,
  Moon
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { useGameStore } from '../../store/useGameStore';
import { getLevelData } from '../../data/levelLoader';

export const NotificationCenter: React.FC = () => {
  const { 
    isNotificationCenterOpen, 
    toggleNotificationCenter, 
    notifications, 
    dismissNotification, 
    openApp,
    isMuted,
    toggleMute,
    nextWallpaper,
    activeAudioMemo,
    stopAudioMemo
  } = useOSStore();

  const { currentLevel } = useGameStore();
  const levelData = getLevelData(currentLevel);

  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [isWifiOn, setIsWifiOn] = useState(true);

  if (!isNotificationCenterOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="absolute inset-0 z-50 bg-black/60 backdrop-blur-2xl flex flex-col p-4 pt-10 pb-6 select-none overflow-y-auto custom-scrollbar font-sans"
      >
        {/* Top Dismiss Handle */}
        <div className="flex justify-center pb-2">
          <div 
            onClick={toggleNotificationCenter}
            className="w-10 h-1 rounded-full bg-white/30 cursor-pointer hover:bg-white/50 transition-colors"
          />
        </div>

        {/* 1:1 Apple iOS 18 Control Center Modules Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-2">
          {/* Module 1: 2x2 Network Connectivity Block */}
          <div className="p-3 rounded-[24px] bg-[#1C1C1E]/80 border border-white/10 grid grid-cols-2 gap-2 shadow-lg">
            <button 
              className="w-10 h-10 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white flex items-center justify-center transition-all"
            >
              <Plane className="w-4 h-4 -rotate-45 text-[#8E8E93]" />
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-[#34C759] text-white flex items-center justify-center shadow"
            >
              <Signal className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsWifiOn(!isWifiOn)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isWifiOn ? 'bg-[#007AFF] text-white shadow' : 'bg-[#2C2C2E] text-[#8E8E93]'
              }`}
            >
              <Wifi className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsBluetoothOn(!isBluetoothOn)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isBluetoothOn ? 'bg-[#007AFF] text-white shadow' : 'bg-[#2C2C2E] text-[#8E8E93]'
              }`}
            >
              <Bluetooth className="w-4 h-4" />
            </button>
          </div>

          {/* Module 2: Now Playing Media Player Block */}
          <div className="p-3.5 rounded-[24px] bg-[#1C1C1E]/80 border border-white/10 flex flex-col justify-between shadow-lg">
            <div>
              <p className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-wider">
                {activeAudioMemo ? 'Now Playing' : 'Music & Audio'}
              </p>
              <h4 className="text-[13px] font-bold text-white truncate mt-0.5">
                {activeAudioMemo?.title || 'Midnight Podcast'}
              </h4>
              <p className="text-[10px] text-[#8E8E93] truncate">
                {levelData.victimName}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] font-mono text-[#8E8E93]">
                {activeAudioMemo ? `${Math.round((activeAudioMemo.progress || 0) * 100)}%` : '0:00'}
              </span>
              <button
                onClick={() => {
                  if (activeAudioMemo) stopAudioMemo();
                }}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform"
              >
                {activeAudioMemo?.isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Sliders & Quick Controls Grid */}
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {/* Vertical Brightness Slider */}
          <div className="h-28 rounded-[20px] bg-[#2C2C2E] border border-white/5 relative overflow-hidden flex flex-col justify-end p-2 items-center">
            <div 
              className="absolute inset-x-0 bottom-0 bg-white/90 rounded-b-[20px] transition-all"
              style={{ height: `${brightness}%` }}
            />
            <Sun className="w-5 h-5 text-gray-700 relative z-10 mb-1" />
          </div>

          {/* Vertical Volume Slider */}
          <div className="h-28 rounded-[20px] bg-[#2C2C2E] border border-white/5 relative overflow-hidden flex flex-col justify-end p-2 items-center">
            <div 
              className="absolute inset-x-0 bottom-0 bg-white/90 rounded-b-[20px] transition-all"
              style={{ height: `${volume}%` }}
            />
            <Volume2 className="w-5 h-5 text-gray-700 relative z-10 mb-1" />
          </div>

          {/* 2x2 Circular Tiles on Right */}
          <div className="col-span-2 grid grid-cols-2 gap-2 h-28">
            {/* Flashlight */}
            <button
              onClick={() => setIsFlashlightOn(!isFlashlightOn)}
              className={`rounded-[20px] flex items-center justify-center transition-all ${
                isFlashlightOn ? 'bg-white text-black' : 'bg-[#1C1C1E] text-white border border-white/10'
              }`}
            >
              <Flashlight className="w-5 h-5" />
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className={`rounded-[20px] flex items-center justify-center transition-all ${
                isMuted ? 'bg-[#FF9500] text-white' : 'bg-[#1C1C1E] text-white border border-white/10'
              }`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Camera */}
            <button
              onClick={() => {
                toggleNotificationCenter();
                openApp('photos');
              }}
              className="rounded-[20px] bg-[#1C1C1E] text-white border border-white/10 flex items-center justify-center hover:bg-[#2C2C2E]"
            >
              <Camera className="w-5 h-5" />
            </button>

            {/* Wallpaper Theme */}
            <button
              onClick={nextWallpaper}
              className="rounded-[20px] bg-[#1C1C1E] text-white border border-white/10 flex items-center justify-center hover:bg-[#2C2C2E]"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </button>
          </div>
        </div>

        {/* Notifications Stack */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[12px] font-semibold text-[#8E8E93] tracking-wide">
              Notification Center
            </span>
          </div>

          <div className="space-y-2">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  toggleNotificationCenter();
                  openApp(notif.appId);
                }}
                className="p-3 rounded-[20px] bg-[#1C1C1E]/95 border border-white/10 hover:border-white/20 cursor-pointer flex items-start justify-between gap-3 shadow-md transition-all"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between text-[11px] text-[#8E8E93] mb-0.5">
                    <span className="font-semibold text-white">{notif.appName}</span>
                    <span className="font-sans text-[10px]">{notif.timestamp}</span>
                  </div>
                  <p className="text-[13px] font-semibold text-white">{notif.title}</p>
                  <p className="text-[12px] text-gray-300 line-clamp-2 mt-0.5">{notif.message}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissNotification(notif.id);
                  }}
                  className="text-gray-500 hover:text-white p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
