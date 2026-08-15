import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Mic, 
  FileCheck, 
  Camera, 
  Sparkles, 
  ChevronRight, 
  Award,
  RotateCcw,
  Search,
  ExternalLink,
  MessageSquare,
  Layers
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { useGameStore } from '../../store/useGameStore';
import { getLevelData } from '../../data/levelLoader';
import { CaseClue } from '../../types/game';

export const CaseBoardOverlay: React.FC = () => {
  const { isCaseBoardOpen, toggleCaseBoard, openApp } = useOSStore();
  const { 
    currentLevel, 
    discoveredClueIds, 
    unlockedNoteIds,
    advanceToNextLevel, 
    submitAccusation, 
    isCaseSolved, 
    gameScore,
    resetGame,
    selectLevel
  } = useGameStore();

  const levelData = getLevelData(currentLevel);
  const [selectedClue, setSelectedClue] = useState<CaseClue | null>(null);

  // Accusation Form State
  const [suspect, setSuspect] = useState('');
  const [accusationError, setAccusationError] = useState('');
  const [scoreRank, setScoreRank] = useState<'S' | 'A' | 'B' | 'C'>('S');

  if (!isCaseBoardOpen) return null;

  const getSourceAppIcon = (app: string) => {
    switch (app) {
      case 'chat': return MessageSquare;
      case 'gallery': return Camera;
      case 'notes': return FileCheck;
      case 'banking': return DollarSign;
      case 'voicemail': return Mic;
      case 'rideshare': return MapPin;
      default: return ShieldAlert;
    }
  };

  const isLevel1Complete = unlockedNoteIds.includes('note_safehouse');
  const isLevel3NoteComplete = unlockedNoteIds.includes('note_alibis');

  const handleAccusationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspect) {
      setAccusationError('Please select the prime target or suspect.');
      return;
    }

    setAccusationError('');
    const result = submitAccusation(suspect);
    if (result.isCorrect) {
      setScoreRank(result.scoreRank);
    } else {
      setAccusationError('Investigation inconclusive: Insufficient evidence to substantiate this accusation. Re-examine the chats, banking charges, and voicemail threats!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="absolute inset-0 z-50 bg-[#090b11] text-gray-100 flex flex-col p-4 pt-10 pb-8 select-none overflow-y-auto custom-scrollbar font-sans"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              FORENSIC CASE BOARD
            </h2>
            <p className="text-[10px] font-mono text-cyan-400">
              LEVEL {currentLevel}: {levelData.levelTitle.toUpperCase()}
            </p>
          </div>
        </div>

        <button
          onClick={toggleCaseBoard}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Case Objective Card */}
      <div className="my-3 p-3.5 rounded-[20px] bg-gradient-to-r from-red-950/40 via-slate-900/60 to-black/60 border border-red-500/30">
        <p className="text-[11px] font-mono text-red-400 font-bold uppercase mb-1">
          Target: {levelData.victimName} • {levelData.deviceTimestamp}
        </p>
        <p className="text-xs text-gray-300 leading-relaxed">
          {levelData.objective}
        </p>
      </div>

      {/* Discovered Evidence Grid */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Evidence Clues ({discoveredClueIds.length} / {levelData.clues.length})
          </span>
          <span className="text-[10px] text-gray-400 font-mono">Tap clue to inspect</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {levelData.clues.map((clue) => {
            const isFound = discoveredClueIds.includes(clue.id);
            const Icon = getSourceAppIcon(clue.sourceApp);

            if (!isFound) {
              return (
                <div
                  key={clue.id}
                  className="p-3 rounded-[16px] bg-black/40 border border-dashed border-white/10 flex items-center gap-3 opacity-60"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-gray-600">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-500">Undiscovered Clue</p>
                    <p className="text-[10px] text-gray-600 uppercase">Search {clue.sourceApp}</p>
                  </div>
                </div>
              );
            }

            return (
              <motion.div
                key={clue.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedClue(clue)}
                className="p-3 rounded-[16px] border border-cyan-500/40 bg-slate-900/80 cursor-pointer hover:border-cyan-400 transition-all shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">
                      {clue.sourceApp}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                    EVIDENCE
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-0.5">{clue.title}</h4>
                <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                  {clue.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Level 1 Progression Gate */}
      {currentLevel === 1 && (
        <div className="mt-2 p-3.5 rounded-[20px] bg-cyan-950/30 border border-cyan-500/30 text-center">
          {isLevel1Complete ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>LEVEL 1 COMPLETE: SAFE HOUSE RECOVERED</span>
              </div>
              <button
                onClick={() => {
                  advanceToNextLevel();
                  toggleCaseBoard();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/50 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
              >
                <span>PROCEED TO LEVEL 2: "THE SHADOW BENEFACTOR"</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              💡 <span className="font-semibold text-cyan-300">Level 1 Objective:</span> Decipher the locked 'Safe House' note in Notes (Passcode: 2021TX9) to advance to Level 2.
            </p>
          )}
        </div>
      )}

      {/* Level 2 Accusation Form (Homicide Mastermind) */}
      {currentLevel === 2 && !isCaseSolved && (
        <div className="mt-3 p-4 rounded-[20px] bg-red-950/20 border border-red-500/40 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <h3 className="text-xs font-bold font-mono tracking-wider text-red-300 uppercase">
              Grand Jury Chamber: Indict Homicide Mastermind
            </h3>
          </div>

          {accusationError && (
            <div className="mb-3 p-2 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs">
              {accusationError}
            </div>
          )}

          <form onSubmit={handleAccusationSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-mono text-gray-300 mb-1">SELECT HOMICIDE MASTERMIND:</label>
              <select
                value={suspect}
                onChange={(e) => setSuspect(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-red-500 focus:outline-none"
              >
                <option value="">-- Select Mastermind --</option>
                <option value="julian_vance">Julian Vance (CEO, Vance Holdings)</option>
                <option value="councilor_moran">Councilor Moran (City District Representative)</option>
                <option value="mark_editor">Mark (Tribune Editor)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg border border-red-400/40 transition-all cursor-pointer"
            >
              Submit Grand Jury Indictment
            </button>
          </form>
        </div>
      )}

      {/* Level 3 Accusation Form (Infidelity & Blackmail Case) */}
      {currentLevel === 3 && !isCaseSolved && (
        <div className="mt-3 p-4 rounded-[20px] bg-red-950/20 border border-red-500/40 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <h3 className="text-xs font-bold font-mono tracking-wider text-red-300 uppercase">
              Private Investigation: Expose Affair & Blackmailer
            </h3>
          </div>

          {accusationError && (
            <div className="mb-3 p-2 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs">
              {accusationError}
            </div>
          )}

          <form onSubmit={handleAccusationSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-mono text-gray-300 mb-1">SELECT BLACKMAILER / SECRET LOVER:</label>
              <select
                value={suspect}
                onChange={(e) => setSuspect(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:border-red-500 focus:outline-none"
              >
                <option value="">-- Select Target --</option>
                <option value="coach_dave_secret">Coach Dave / Chloe V. (Secret Lover & Extortionist)</option>
                <option value="marcus_partner">Marcus (Managing Director)</option>
                <option value="evelyn_wife">Evelyn (Spouse)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold tracking-wider uppercase text-xs shadow-lg border border-red-400/40 transition-all cursor-pointer"
            >
              Expose Extortion & Hand Over Dossier
            </button>
          </form>
        </div>
      )}

      {/* Victory Debrief Modal */}
      {isCaseSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 p-4 rounded-[22px] bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-black border-2 border-emerald-500 shadow-glow-cyan text-center"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2 border border-emerald-400/40">
            <Award className="w-6 h-6" />
          </div>

          <h3 className="text-base font-extrabold text-white">
            CASE CLOSED — INVESTIGATION SOLVED
          </h3>
          <p className="text-xs text-emerald-300 font-mono mt-0.5">
            FORENSIC RATING: {scoreRank}-RANK DETECTIVE ({gameScore} PTS)
          </p>

          <div className="my-3 p-3 rounded-xl bg-black/60 text-left text-xs text-gray-300 space-y-1.5 border border-white/10">
            {currentLevel === 2 ? (
              <>
                <p><strong>Mastermind Indicted:</strong> Julian Vance (CEO, Vance Holdings)</p>
                <p><strong>Corrupt Official Exposed:</strong> Councilor Moran</p>
                <p><strong>Summary:</strong> Using Maya Lin's phone records, you exposed the $25,000 Helios offshore bribery pipeline and recovered the recorded confession ordering her assassination.</p>
              </>
            ) : currentLevel === 3 ? (
              <>
                <p><strong>Target Exposed:</strong> Chloe V. (under cover contact 'Coach Dave')</p>
                <p><strong>Evidence Recovered:</strong> $4,500 Cartier invoice, St. Regis Suite #1402 alibi, and $200,000 extortion voicemail.</p>
                <p><strong>Summary:</strong> Full forensic portfolio delivered to Evelyn Thorne's legal team. Embezzlement and secret yacht rendezvous completely exposed.</p>
              </>
            ) : (
              <p><strong>Summary:</strong> Level 1 safe house dossier decrypted. Pier 42 coordinates and unit locker key confirmed.</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetGame}
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Case
            </button>
            <button
              onClick={toggleCaseBoard}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Free Roam
            </button>
          </div>
        </motion.div>
      )}

      {/* Clue Details Modal */}
      {selectedClue && (
        <div 
          onClick={() => setSelectedClue(null)}
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-[24px] bg-slate-900 border border-cyan-500/40 p-5 text-left shadow-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                EVIDENCE DOSSIER // {selectedClue.sourceApp}
              </span>
              <button
                onClick={() => setSelectedClue(null)}
                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="text-sm font-bold text-white mb-1">{selectedClue.title}</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">{selectedClue.description}</p>

            <button
              onClick={() => {
                const app = selectedClue.sourceApp;
                if (app === 'chat') openApp('chat');
                else if (app === 'gallery') openApp('photos');
                else if (app === 'notes') openApp('notes');
                else if (app === 'banking') openApp('bank');
                else if (app === 'voicemail') openApp('phone');
                else if (app === 'rideshare') openApp('rides');
                setSelectedClue(null);
                toggleCaseBoard();
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Jump to Source App ({selectedClue.sourceApp})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
