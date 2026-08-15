import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Lock, 
  ChevronLeft, 
  Search, 
  KeyRound
} from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { getLevelData } from '../../../data/levelLoader';
import { NoteItem } from '../../../types/game';
import { soundFX } from '../../../audio/soundFX';

export const NotesApp: React.FC = () => {
  const { currentLevel, unlockedNoteIds, unlockNote, discoverClue } = useGameStore();
  const { closeApp } = useOSStore();
  const levelData = getLevelData(currentLevel);

  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Passcode modal
  const [passcodeModalNote, setPasscodeModalNote] = useState<NoteItem | null>(null);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const notes = levelData.notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenNote = (note: NoteItem) => {
    soundFX.playTapSound();
    const isUnlocked = !note.isLocked || unlockedNoteIds.includes(note.id);

    if (isUnlocked) {
      setSelectedNote(note);
      if (note.clueId) {
        discoverClue(note.clueId);
      }
    } else {
      setPasscodeModalNote(note);
      setPasscodeInput('');
      setPasscodeError('');
    }
  };

  const handleDecryptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeModalNote) return;

    const result = unlockNote(passcodeModalNote.id, passcodeInput);
    if (result.success) {
      const updatedNote = { ...passcodeModalNote, isLocked: false };
      setSelectedNote(updatedNote);
      setPasscodeModalNote(null);
    } else {
      setPasscodeError(result.message);
    }
  };

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col overflow-hidden select-none font-sans">
      {/* If No Note Selected: Show Notes List */}
      {!selectedNote ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* iOS Notes Navigation Bar */}
          <div className="px-4 pt-2 pb-1 flex items-center justify-between">
            <button
              onClick={() => {
                soundFX.playTapSound();
                closeApp();
              }}
              className="text-[#E5A00D] text-[15px] font-normal flex items-center gap-0.5 hover:opacity-80 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 -ml-1.5" />
              <span>Home</span>
            </button>

            <h1 className="text-[17px] font-bold text-white tracking-tight">
              Notes
            </h1>

            <span className="text-[12px] font-medium text-[#E5A00D]">
              {notes.length} Notes
            </span>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-1.5">
            <div className="relative flex items-center bg-[#1C1C1E] rounded-[10px] px-2.5 py-1.5 border border-white/5">
              <Search className="w-4 h-4 text-[#8E8E93] mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-[14px] text-white placeholder-[#8E8E93] focus:outline-none"
              />
            </div>
          </div>

          {/* Grouped Inset Notes List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
            {notes.map((note) => {
              const isUnlocked = !note.isLocked || unlockedNoteIds.includes(note.id);

              return (
                <motion.div
                  key={note.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenNote(note)}
                  className={`p-3.5 rounded-[18px] border cursor-pointer transition-all ${
                    !isUnlocked
                      ? 'bg-[#1C1C1E] border-white/10 hover:border-amber-400/50 shadow-md'
                      : 'bg-[#1C1C1E] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[14px] font-bold text-white truncate max-w-[210px] flex items-center gap-1.5">
                      {!isUnlocked ? (
                        <Lock className="w-3.5 h-3.5 text-[#E5A00D] flex-shrink-0" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-[#E5A00D] flex-shrink-0" />
                      )}
                      <span>{note.title}</span>
                    </h3>
                    <span className="text-[11px] text-[#8E8E93] font-sans">
                      {note.lastEdited}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#8E8E93] line-clamp-2 leading-relaxed">
                    {!isUnlocked ? 'Locked Note' : note.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Note Reading View */
        <div className="flex-1 flex flex-col overflow-hidden bg-[#000000]">
          {/* Header */}
          <div className="px-4 py-2 bg-[#1C1C1E] border-b border-[#2C2C2E] flex items-center justify-between">
            <button
              onClick={() => {
                soundFX.playTapSound();
                setSelectedNote(null);
              }}
              className="text-[#E5A00D] text-[15px] font-normal flex items-center gap-0.5 hover:opacity-80 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 -ml-1.5" />
              <span>Notes</span>
            </button>

            <span className="text-[11px] text-[#8E8E93] font-sans">
              {selectedNote.lastEdited}
            </span>
          </div>

          {/* Note Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
            <h2 className="text-[18px] font-extrabold text-white">
              {selectedNote.title}
            </h2>

            <div className="text-[14px] text-gray-200 whitespace-pre-line leading-relaxed font-sans">
              {selectedNote.content}
            </div>
          </div>
        </div>
      )}

      {/* Password Decryption Modal */}
      {passcodeModalNote && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xs rounded-[24px] bg-[#1C1C1E] border border-white/10 p-5 text-center shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 text-white mx-auto flex items-center justify-center mb-2">
              <Lock className="w-5 h-5" />
            </div>

            <h3 className="text-[15px] font-bold text-white tracking-tight">
              {passcodeModalNote.title}
            </h3>
            <p className="text-[12px] text-[#8E8E93] mt-1 mb-3">
              This note is password protected.
            </p>

            {passcodeError && (
              <p className="text-xs text-red-400 font-medium mb-2">{passcodeError}</p>
            )}

            <form onSubmit={handleDecryptionSubmit} className="space-y-3">
              <input
                type="text"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/20 text-white text-center text-xs tracking-wider uppercase focus:border-[#E5A00D] focus:outline-none"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPasscodeModalNote(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#E5A00D] hover:bg-amber-400 text-black font-bold text-xs shadow-lg cursor-pointer"
                >
                  Unlock
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
