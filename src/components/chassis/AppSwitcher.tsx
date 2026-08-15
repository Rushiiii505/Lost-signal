import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Image, FileText, Phone, Landmark, MapPin, FolderArchive, ShieldAlert, X } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { AppId } from '../../types/os';

const appIcons: Record<AppId, { icon: any; title: string; color: string }> = {
  chat: { icon: MessageSquare, title: 'Messages', color: 'from-blue-600 to-cyan-600' },
  photos: { icon: Image, title: 'Photos & EXIF', color: 'from-amber-500 to-rose-500' },
  notes: { icon: FileText, title: 'Notes & Vaults', color: 'from-yellow-600 to-amber-700' },
  phone: { icon: Phone, title: 'Phone & Audio', color: 'from-emerald-600 to-teal-700' },
  bank: { icon: Landmark, title: 'Apex Vault FinTech', color: 'from-indigo-600 to-purple-800' },
  rides: { icon: MapPin, title: 'MetroPulse Rides', color: 'from-cyan-600 to-blue-800' },
  files: { icon: FolderArchive, title: 'Files & Dossiers', color: 'from-blue-700 to-indigo-900' },
  safari: { icon: MessageSquare, title: 'Safari', color: 'from-blue-500 to-cyan-500' },
  mail: { icon: MessageSquare, title: 'Mail', color: 'from-blue-600 to-indigo-600' },
  memos: { icon: Phone, title: 'Voice Memos', color: 'from-red-600 to-rose-700' },
  trading: { icon: Landmark, title: 'Stocks', color: 'from-emerald-600 to-teal-700' },
  dating: { icon: MessageSquare, title: 'Velvet VIP', color: 'from-purple-600 to-pink-600' },
  caseboard: { icon: ShieldAlert, title: 'Forensic Case Board', color: 'from-rose-600 to-red-800' },
  settings: { icon: ShieldAlert, title: 'Settings', color: 'from-gray-600 to-gray-800' },
};

export const AppSwitcher: React.FC = () => {
  const { isAppSwitcherOpen, toggleAppSwitcher, openApp, appStack } = useOSStore();

  if (!isAppSwitcherOpen) return null;

  const appsToShow: AppId[] = appStack.length > 0 
    ? appStack 
    : ['chat', 'photos', 'notes', 'phone', 'bank', 'rides', 'caseboard'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col p-6 pt-16 pb-12 select-none"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400">
          Running Applications
        </h2>
        <button
          onClick={toggleAppSwitcher}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* App Cards Horizontal Scroller */}
      <div className="flex-1 flex items-center gap-4 overflow-x-auto custom-scrollbar py-4 px-2">
        {appsToShow.map((appId) => {
          const appMeta = appIcons[appId] || { icon: MessageSquare, title: appId, color: 'from-gray-600 to-gray-800' };
          const Icon = appMeta.icon;

          return (
            <motion.div
              key={appId}
              whileHover={{ scale: 1.04, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openApp(appId)}
              className="flex-shrink-0 w-52 h-80 rounded-3xl bg-slate-900/90 border border-white/15 p-4 flex flex-col justify-between shadow-2xl cursor-pointer relative overflow-hidden group hover:border-cyan-500/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${appMeta.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-white/90 truncate">
                  {appMeta.title}
                </span>
              </div>

              {/* Card Preview Graphic */}
              <div className="flex-1 my-3 rounded-xl bg-black/40 border border-white/5 p-3 flex flex-col justify-center items-center text-center">
                <Icon className="w-12 h-12 text-white/20 group-hover:text-cyan-400/40 transition-colors" />
                <p className="text-[10px] text-gray-400 mt-2 font-mono">ACTIVE INSTANCE</p>
              </div>

              {/* Action */}
              <button className="w-full py-1.5 rounded-xl bg-white/10 group-hover:bg-cyan-500/20 text-white group-hover:text-cyan-300 text-xs font-medium transition-colors border border-white/10 group-hover:border-cyan-500/30">
                Switch to App
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
