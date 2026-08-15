import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ScanFace, Flashlight, Camera, ShieldAlert, ChevronUp } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { useGameStore } from '../../store/useGameStore';

export const LockScreen: React.FC = () => {
  const { unlockPhone, isFaceScanning, notifications } = useOSStore();
  const { currentLevel } = useGameStore();

  const timeDisplay = currentLevel === 1 ? '11:42' : '1:15';
  const dateDisplay = currentLevel === 1 ? 'Saturday, October 24' : 'Sunday, October 25';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-40 flex flex-col justify-between p-6 pt-12 pb-6 select-none bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(15, 23, 42, 0.45) 0%, rgba(9, 10, 15, 0.85) 100%), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80')`,
      }}
    >
      {/* Top Lock Icon & iOS Clock Header */}
      <div className="flex flex-col items-center pt-2">
        <div className="flex items-center gap-1 text-white/90 mb-1">
          {isFaceScanning ? (
            <ScanFace className="w-5 h-5 text-cyan-400 animate-spin" />
          ) : (
            <Lock className="w-4 h-4 text-white/80" />
          )}
        </div>

        {/* Date */}
        <p className="text-[15px] font-medium text-white/90 tracking-tight font-sans drop-shadow">
          {dateDisplay}
        </p>

        {/* Big iOS 18 Bold Clock */}
        <h1 className="text-[82px] font-bold tracking-tight text-white font-sans leading-none my-1 drop-shadow-md">
          {timeDisplay}
        </h1>
      </div>

      {/* Center Stack of Authentic iOS Glass Notifications */}
      <div className="flex-1 flex flex-col justify-center my-auto space-y-2.5 max-w-sm mx-auto w-full">
        {notifications.slice(0, 2).map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={unlockPhone}
            className="p-3.5 rounded-[22px] bg-black/40 backdrop-blur-2xl border border-white/15 shadow-2xl cursor-pointer hover:bg-black/50 transition-all text-left"
          >
            <div className="flex items-center justify-between text-xs text-white/80 mb-1">
              <div className="flex items-center gap-2">
                {/* App icon mini badge */}
                <div className={`w-5 h-5 rounded-[6px] flex items-center justify-center text-white text-[10px] font-bold ${
                  notif.appId === 'chat' ? 'bg-[#34C759]' : notif.appId === 'phone' ? 'bg-[#34C759]' : 'bg-[#007AFF]'
                }`}>
                  {notif.appId === 'chat' ? '💬' : notif.appId === 'phone' ? '📞' : '📱'}
                </div>
                <span className="font-bold uppercase tracking-wider text-[11px] text-white">
                  {notif.appName}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-sans">{notif.timestamp}</span>
            </div>

            <p className="text-[13px] font-semibold text-white mt-0.5">{notif.title}</p>
            <p className="text-[12px] text-gray-300 leading-snug line-clamp-2 mt-0.5">{notif.message}</p>
          </motion.div>
        ))}

        {/* Evidence Status Pill */}
        <div className="py-2 px-3.5 rounded-full bg-red-950/60 backdrop-blur-xl border border-red-500/30 flex items-center justify-center gap-2 shadow-lg">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span className="text-[11px] font-medium text-red-200">
            HOMICIDE EVIDENCE // TAP TO UNLOCK
          </span>
        </div>
      </div>

      {/* Bottom Controls: Flashlight, Unlock Button, Camera */}
      <div className="flex flex-col items-center gap-4">
        {/* Main Unlock Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={unlockPhone}
          disabled={isFaceScanning}
          className="w-full py-3 px-6 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all"
        >
          <ScanFace className="w-4 h-4 text-cyan-300" />
          <span>{isFaceScanning ? 'Scanning Face...' : 'Tap or Swipe to Unlock'}</span>
        </motion.button>

        {/* Bottom Quick Tools */}
        <div className="w-full flex items-center justify-between px-3">
          <button 
            onClick={unlockPhone}
            className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 active:scale-90 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
            title="Flashlight"
          >
            <Flashlight className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center text-gray-400 text-[10px] font-sans">
            <ChevronUp className="w-4 h-4 animate-bounce text-white/60" />
            <span>SWIPE UP TO OPEN</span>
          </div>

          <button 
            onClick={unlockPhone}
            className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 active:scale-90 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
            title="Camera"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
