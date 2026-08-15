import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PhoneFrame } from './components/chassis/PhoneFrame';
import { LockScreen } from './components/chassis/LockScreen';
import { HomeScreen } from './components/os/HomeScreen';
import { NotificationCenter } from './components/os/NotificationCenter';
import { CaseBoardOverlay } from './components/os/CaseBoardOverlay';
import { CaseSelectionScreen } from './components/os/CaseSelectionScreen';
import { AppSwitcher } from './components/chassis/AppSwitcher';

// Apps
import { ChatApp } from './components/apps/chat/ChatApp';
import { PhotosApp } from './components/apps/photos/PhotosApp';
import { NotesApp } from './components/apps/notes/NotesApp';
import { PhoneApp } from './components/apps/phone/PhoneApp';
import { BankApp } from './components/apps/bank/BankApp';
import { RidesApp } from './components/apps/rides/RidesApp';
import { FilesApp } from './components/apps/files/FilesApp';
import { SafariApp } from './components/apps/safari/SafariApp';
import { MailApp } from './components/apps/mail/MailApp';
import { VoiceMemosApp } from './components/apps/memos/VoiceMemosApp';
import { StocksApp } from './components/apps/trading/StocksApp';
import { DatingApp } from './components/apps/dating/DatingApp';
import { SettingsApp } from './components/apps/settings/SettingsApp';

// Stores
import { useOSStore } from './store/useOSStore';
import { useGameStore } from './store/useGameStore';
import { getLevelData } from './data/levelLoader';

// UI icons
import { 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  ArrowLeft
} from 'lucide-react';

export function App() {
  const { 
    isLocked, 
    activeApp, 
    isMuted, 
    toggleMute, 
    isDesktopView, 
    toggleViewMode, 
    toggleCaseBoard, 
    isCaseBoardOpen
  } = useOSStore();

  const { 
    currentLevel, 
    selectLevel, 
    discoveredClueIds, 
    gameScore
  } = useGameStore();

  // Landing Page is FIRST screen
  const [inPhoneMode, setInPhoneMode] = useState(false);
  const levelData = getLevelData(currentLevel);

  // Keyboard shortcut support (Escape for Home / Close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCaseBoardOpen) {
          toggleCaseBoard();
        } else if (activeApp) {
          useOSStore.getState().closeApp();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeApp, isCaseBoardOpen, toggleCaseBoard]);

  const handleSelectCaseFromPortal = (levelNumber: number) => {
    selectLevel(levelNumber);
    setInPhoneMode(true);
  };

  // If in portal view mode, show full-page scrolling Apple Landing Page
  if (!inPhoneMode) {
    return <CaseSelectionScreen onSelectCase={handleSelectCaseFromPortal} />;
  }

  return (
    <main className="relative h-screen w-screen bg-[#06070a] text-gray-100 flex flex-col items-center justify-between overflow-hidden font-sans select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Top Desktop HUD Bar */}
      {isDesktopView && (
        <header className="w-full h-11 px-6 flex items-center justify-between z-30 bg-black/75 backdrop-blur-2xl border-b border-white/10 select-none flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setInPhoneMode(false)}
              className="px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/15 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              title="Return to Case Files Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>CASES</span>
            </button>

            <div className="flex items-center gap-2">
              <h1 className="text-xs font-black tracking-widest text-white">
                LOST SIGNAL
              </h1>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/40">
                CASE {currentLevel}: {levelData.levelTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-[11px] font-mono">
              <span className="text-gray-400">TARGET:</span>
              <span className="text-white font-bold">{levelData.victimName}</span>
            </div>

            <button
              onClick={toggleCaseBoard}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-[11px] font-bold font-mono tracking-wider flex items-center gap-1.5 shadow-md border border-red-400/40 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>CASE BOARD</span>
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            </button>

            <button
              onClick={toggleViewMode}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-white transition-colors cursor-pointer"
              title="Toggle View Mode"
            >
              <Smartphone className="w-3.5 h-3.5 text-gray-300" />
            </button>
          </div>
        </header>
      )}

      {/* Main Smartphone Display Container */}
      <div className="flex-1 w-full flex items-center justify-center p-2 overflow-hidden">
        <PhoneFrame>
          <AnimatePresence mode="wait">
            {isLocked ? (
              <LockScreen key="lockscreen" />
            ) : activeApp === 'chat' ? (
              <ChatApp key="chat" />
            ) : activeApp === 'photos' ? (
              <PhotosApp key="photos" />
            ) : activeApp === 'notes' ? (
              <NotesApp key="notes" />
            ) : activeApp === 'phone' ? (
              <PhoneApp key="phone" />
            ) : activeApp === 'bank' ? (
              <BankApp key="bank" />
            ) : activeApp === 'rides' ? (
              <RidesApp key="rides" />
            ) : activeApp === 'safari' ? (
              <SafariApp key="safari" />
            ) : activeApp === 'mail' ? (
              <MailApp key="mail" />
            ) : activeApp === 'memos' ? (
              <VoiceMemosApp key="memos" />
            ) : activeApp === 'trading' ? (
              <StocksApp key="trading" />
            ) : activeApp === 'dating' ? (
              <DatingApp key="dating" />
            ) : activeApp === 'files' ? (
              <FilesApp key="files" />
            ) : activeApp === 'settings' ? (
              <SettingsApp key="settings" />
            ) : (
              <HomeScreen key="homescreen" />
            )}
          </AnimatePresence>

          {/* System Overlay Panels */}
          <NotificationCenter />
          <CaseBoardOverlay />
          <AppSwitcher />
        </PhoneFrame>
      </div>

      {/* Subtle Footer info */}
      {isDesktopView && (
        <footer className="w-full h-6 px-6 flex items-center justify-between text-[10px] text-gray-500 font-mono select-none pointer-events-none flex-shrink-0">
          <span>FORENSIC TERMINAL // TARGET: {levelData.victimName.toUpperCase()}</span>
          <span>PRESS ESCAPE FOR HOME SCREEN</span>
        </footer>
      )}
    </main>
  );
}

export default App;
