import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderArchive, FileText, Lock, ShieldAlert, Eye, EyeOff, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { createPhotoSVG } from '../../../utils/imageGenerator';
import { soundFX } from '../../../audio/soundFX';

export const FilesApp: React.FC = () => {
  const { currentLevel, discoveredClueIds, discoverClue } = useGameStore();
  const [activeDossier, setActiveDossier] = useState<string | null>(null);
  const [showRedactions, setShowRedactions] = useState(false);

  return (
    <div className="relative flex-1 w-full h-full bg-[#08090e] text-gray-100 flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="glass-header px-5 pt-3 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center border border-blue-500/40">
            <FolderArchive className="w-4 h-4" />
          </div>
          <h1 className="text-base font-bold tracking-tight text-white">Files & Archives</h1>
        </div>

        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          ENCRYPTED VAULT
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {/* Dossier Item 1: Vance Kickback Ledger */}
        <div 
          onClick={() => {
            soundFX.playTapSound();
            setActiveDossier('vance_wire');
            discoverClue('clue_safehouse_unlocked');
          }}
          className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Vance_Corp_Wire_Audit.pdf</h3>
              <p className="text-[10px] font-mono text-gray-400">16.4 MB • Oct 24, 2026</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-500/40">
            CONFIDENTIAL
          </span>
        </div>

        {/* Dossier Item 2: Press Credential Archive */}
        <div 
          onClick={() => {
            soundFX.playTapSound();
            setActiveDossier('press_badge');
          }}
          className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Maya_Lin_Press_Credentials.pdf</h3>
              <p className="text-[10px] font-mono text-gray-400">14.2 MB • Oct 24, 2026</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/40">
            VERIFIED
          </span>
        </div>

        {/* Dossier Item 3: Harbor Radio Channel Logs */}
        <div 
          onClick={() => {
            soundFX.playTapSound();
            setActiveDossier('harbor_radio');
            if (currentLevel === 2) discoverClue('clue_foghorn_audio');
          }}
          className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Harbor_Patrol_Frequencies.log</h3>
              <p className="text-[10px] font-mono text-gray-400">4.1 KB • 1:20 AM</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40">
            CHANNEL 88
          </span>
        </div>
      </div>

      {/* Dossier Modal Preview */}
      {activeDossier && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-3xl bg-slate-900 border border-cyan-500/40 p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                DOCUMENT INSPECTOR
              </span>
              <button
                onClick={() => setActiveDossier(null)}
                className="text-gray-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>

            {activeDossier === 'vance_wire' && (
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Vance Corp Wire Audit</h3>
                <img
                  src={createPhotoSVG('safehouse_docs', 'Safehouse Audit')}
                  alt="Audit Doc"
                  className="w-full rounded-xl border border-white/15 mb-3"
                />
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  Reveals recurring $5,000 monthly disbursements to City Councilman Sterling, authorized by Chief of Security Darius Cruz.
                </p>
              </div>
            )}

            {activeDossier === 'press_badge' && (
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Press Badge Credential</h3>
                <img
                  src={createPhotoSVG('maya_id', 'Press ID')}
                  alt="Press ID"
                  className="w-full rounded-xl border border-white/15 mb-3"
                />
                <p className="text-xs text-gray-300">
                  Maya Lin, Investigative Journalist for The Daily Tribune Metro.
                </p>
              </div>
            )}

            {activeDossier === 'harbor_radio' && (
              <div className="p-3 rounded-2xl bg-black/60 border border-amber-500/40 text-xs font-mono text-amber-200 space-y-2 mb-3">
                <p><strong>FREQUENCY:</strong> 156.425 MHz (Channel 88)</p>
                <p><strong>BEACON:</strong> Pier 42 Lighthouse (82Hz acoustic horn)</p>
                <p><strong>TRANSCRIPT:</strong> "Patrol 4 responding to crane area... Unregistered vessel spotted."</p>
              </div>
            )}

            <button
              onClick={() => setActiveDossier(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
