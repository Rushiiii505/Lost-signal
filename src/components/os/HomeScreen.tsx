import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Search,
  Phone,
  Landmark,
  MapPin,
  FolderArchive,
  Compass,
  Mail,
  CloudSun,
  TrendingUp,
  Sparkles,
  Mic
} from 'lucide-react';
import { useOSStore, getWallpaperUrl } from '../../store/useOSStore';
import { useGameStore } from '../../store/useGameStore';
import { AppId } from '../../types/os';
import { getLevelData } from '../../data/levelLoader';

interface IOSAppIcon {
  id: AppId;
  name: string;
  badge?: number;
  bgStyle: string;
  renderIcon: () => React.ReactNode;
}

export const HomeScreen: React.FC = () => {
  const { openApp, wallpaperIndex } = useOSStore();
  const { currentLevel } = useGameStore();
  const levelData = getLevelData(currentLevel);

  // Case-specific app grid
  const case1And2Apps: IOSAppIcon[] = [
    {
      id: 'chat',
      name: 'Messages',
      badge: 2,
      bgStyle: 'bg-gradient-to-b from-[#34C759] to-[#28CD41]',
      renderIcon: () => (
        <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
        </svg>
      ),
    },
    {
      id: 'mail',
      name: 'Mail',
      badge: 4,
      bgStyle: 'bg-gradient-to-b from-[#007AFF] to-[#0055B3]',
      renderIcon: () => <Mail className="w-7 h-7 text-white" />,
    },
    {
      id: 'photos',
      name: 'Photos',
      bgStyle: 'bg-white',
      renderIcon: () => (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 absolute -top-1" />
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 absolute -left-1" />
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 absolute -right-1" />
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 absolute -bottom-1" />
        </div>
      ),
    },
    {
      id: 'notes',
      name: 'Notes',
      badge: 1,
      bgStyle: 'bg-[#FFF9E6]',
      renderIcon: () => (
        <div className="w-8 h-8 rounded-[6px] bg-[#FFF9E6] border border-amber-300 flex flex-col overflow-hidden">
          <div className="h-2.5 bg-[#FFCC00] w-full" />
          <div className="flex-1 p-1 space-y-1">
            <div className="h-[2px] bg-amber-400/60 rounded w-full" />
            <div className="h-[2px] bg-amber-400/60 rounded w-3/4" />
            <div className="h-[2px] bg-amber-400/60 rounded w-1/2" />
          </div>
        </div>
      ),
    },
    {
      id: 'memos',
      name: 'Voice Memos',
      badge: 2,
      bgStyle: 'bg-gradient-to-b from-[#1C1C1E] to-[#2C2C2E]',
      renderIcon: () => (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Mic className="w-6 h-6 text-[#FF3B30]" />
        </div>
      ),
    },
    {
      id: 'bank',
      name: 'Apex Vault',
      bgStyle: 'bg-gradient-to-b from-[#1C1C1E] to-[#2C2C2E]',
      renderIcon: () => (
        <div className="relative flex items-center justify-center">
          <Landmark className="w-7 h-7 text-indigo-400 drop-shadow" />
        </div>
      ),
    },
    {
      id: 'rides',
      name: 'MetroPulse',
      bgStyle: 'bg-gradient-to-b from-[#0A84FF] to-[#0066CC]',
      renderIcon: () => (
        <div className="relative flex items-center justify-center">
          <MapPin className="w-7 h-7 text-white drop-shadow" />
        </div>
      ),
    },
    {
      id: 'safari',
      name: 'Safari',
      bgStyle: 'bg-white',
      renderIcon: () => <Compass className="w-8 h-8 text-[#007AFF]" />,
    },
  ];

  const case3Apps: IOSAppIcon[] = [
    {
      id: 'chat',
      name: 'Messages',
      badge: 3,
      bgStyle: 'bg-gradient-to-b from-[#34C759] to-[#28CD41]',
      renderIcon: () => (
        <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
        </svg>
      ),
    },
    {
      id: 'trading',
      name: 'Stocks',
      bgStyle: 'bg-gradient-to-b from-[#000000] to-[#1C1C1E]',
      renderIcon: () => <TrendingUp className="w-7 h-7 text-[#34C759]" />,
    },
    {
      id: 'photos',
      name: 'Photos',
      bgStyle: 'bg-white',
      renderIcon: () => (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 absolute -top-1" />
          <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 absolute -left-1" />
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 absolute -right-1" />
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500 absolute -bottom-1" />
        </div>
      ),
    },
    {
      id: 'notes',
      name: 'Notes',
      badge: 1,
      bgStyle: 'bg-[#FFF9E6]',
      renderIcon: () => (
        <div className="w-8 h-8 rounded-[6px] bg-[#FFF9E6] border border-amber-300 flex flex-col overflow-hidden">
          <div className="h-2.5 bg-[#FFCC00] w-full" />
          <div className="flex-1 p-1 space-y-1">
            <div className="h-[2px] bg-amber-400/60 rounded w-full" />
            <div className="h-[2px] bg-amber-400/60 rounded w-3/4" />
          </div>
        </div>
      ),
    },
    {
      id: 'dating',
      name: 'Velvet VIP',
      badge: 1,
      bgStyle: 'bg-gradient-to-b from-[#4C1D95] to-[#2E1065]',
      renderIcon: () => <Sparkles className="w-7 h-7 text-pink-400" />,
    },
    {
      id: 'bank',
      name: 'Apex Vault',
      bgStyle: 'bg-gradient-to-b from-[#1C1C1E] to-[#2C2C2E]',
      renderIcon: () => <Landmark className="w-7 h-7 text-indigo-400" />,
    },
    {
      id: 'mail',
      name: 'Mail',
      badge: 2,
      bgStyle: 'bg-gradient-to-b from-[#007AFF] to-[#0055B3]',
      renderIcon: () => <Mail className="w-7 h-7 text-white" />,
    },
    {
      id: 'safari',
      name: 'Safari',
      bgStyle: 'bg-white',
      renderIcon: () => <Compass className="w-8 h-8 text-[#007AFF]" />,
    },
  ];

  const mainGridApps = currentLevel === 3 ? case3Apps : case1And2Apps;

  const dockApps: IOSAppIcon[] = [
    {
      id: 'phone',
      name: 'Phone',
      badge: 1,
      bgStyle: 'bg-gradient-to-b from-[#34C759] to-[#28CD41]',
      renderIcon: () => <Phone className="w-6 h-6 text-white fill-white" />,
    },
    {
      id: 'safari',
      name: 'Safari',
      bgStyle: 'bg-white',
      renderIcon: () => <Compass className="w-6 h-6 text-[#007AFF]" />,
    },
    {
      id: 'chat',
      name: 'Messages',
      bgStyle: 'bg-gradient-to-b from-[#34C759] to-[#28CD41]',
      renderIcon: () => (
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      name: 'Settings',
      bgStyle: 'bg-gradient-to-b from-[#8E8E93] to-[#636366]',
      renderIcon: () => <Settings className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div 
      className="relative flex-1 w-full h-full flex flex-col justify-between p-5 pt-2 pb-4 select-none bg-cover bg-center overflow-hidden font-sans"
      style={{
        backgroundImage: `radial-gradient(circle at top, rgba(15, 23, 42, 0.2) 0%, rgba(9, 10, 15, 0.7) 100%), url('${getWallpaperUrl(wallpaperIndex)}')`,
      }}
    >
      {/* Authentic iOS Weather & Calendar Double Widget */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        {/* Weather Widget */}
        <div className="p-3 rounded-[22px] bg-black/40 backdrop-blur-2xl border border-white/10 text-left flex flex-col justify-between h-28 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold text-white/80">New York</p>
              <p className="text-2xl font-light text-white tracking-tight">56°</p>
            </div>
            <CloudSun className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <p className="text-[10px] text-white/90 font-medium">Mostly Cloudy</p>
            <p className="text-[9px] text-[#8E8E93]">H:62° L:48°</p>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="p-3 rounded-[22px] bg-black/40 backdrop-blur-2xl border border-white/10 text-left flex flex-col justify-between h-28 shadow-lg">
          <div>
            <p className="text-[11px] font-bold text-[#FF3B30] uppercase tracking-wider">
              Wednesday
            </p>
            <p className="text-2xl font-semibold text-white tracking-tight">14</p>
          </div>
          <div>
            <p className="text-[11px] text-white font-medium truncate">
              {currentLevel === 3 ? 'Private Dinner @ Midtown' : 'Tribune Legal Review'}
            </p>
            <p className="text-[9px] text-[#8E8E93]">
              {currentLevel === 3 ? '8:00 PM • St. Regis' : '10:00 PM • Newsroom'}
            </p>
          </div>
        </div>
      </div>

      {/* Main 4-column iOS Apps Grid */}
      <div className="grid grid-cols-4 gap-y-4 gap-x-2 my-auto py-1">
        {mainGridApps.map((app, index) => (
          <motion.div
            key={app.id + index}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => openApp(app.id)}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="relative">
              <div className={`w-[58px] h-[58px] rounded-[16px] ${app.bgStyle} shadow-lg shadow-black/40 flex items-center justify-center transition-all border border-white/10`}>
                {app.renderIcon()}
              </div>

              {app.badge && app.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 bg-[#FF3B30] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  {app.badge}
                </span>
              )}
            </div>

            <span className="text-[11px] font-medium text-white text-center tracking-tight truncate max-w-[65px] drop-shadow-md font-sans">
              {app.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Search Pill */}
      <div className="flex justify-center mb-2">
        <div className="px-3 py-1 rounded-full bg-black/35 backdrop-blur-xl border border-white/10 flex items-center gap-1.5 text-white/80 text-[11px]">
          <Search className="w-3 h-3 text-white/60" />
          <span className="font-medium">Search</span>
        </div>
      </div>

      {/* Bottom Frosted Glass Dock */}
      <div className="bg-white/20 backdrop-blur-2xl rounded-[32px] p-2 px-3 flex items-center justify-around shadow-2xl border border-white/20 mx-1">
        {dockApps.map((app, index) => (
          <motion.div
            key={`dock_${app.id}_${index}`}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openApp(app.id)}
            className="relative cursor-pointer"
          >
            <div className={`w-[52px] h-[52px] rounded-[14px] ${app.bgStyle} shadow-md flex items-center justify-center border border-white/15`}>
              {app.renderIcon()}
            </div>

            {app.badge && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {app.badge}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
