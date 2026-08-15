import { create } from 'zustand';
import { getLevelData } from '../data/levelLoader';
import { soundFX } from '../audio/soundFX';
import confetti from 'canvas-confetti';

interface GameState {
  currentLevel: number;
  discoveredClueIds: string[];
  unlockedNoteIds: string[];
  unlockedPhotosTrash: boolean;
  isCaseSolved: boolean;
  gameScore: number;
  startTime: number;
  hintsRevealed: number;

  // Actions
  selectLevel: (levelNumber: number) => void;
  discoverClue: (clueId: string) => boolean;
  unlockNote: (noteId: string, inputCode: string) => { success: boolean; message: string };
  unlockPhotoTrash: (inputPin: string) => boolean;
  advanceToNextLevel: () => void;
  submitAccusation: (suspectId: string) => { isCorrect: boolean; scoreRank: 'S' | 'A' | 'B' | 'C' };
  revealHint: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentLevel: 1,
  discoveredClueIds: [],
  unlockedNoteIds: [],
  unlockedPhotosTrash: false,
  isCaseSolved: false,
  gameScore: 1000,
  startTime: Date.now(),
  hintsRevealed: 0,

  selectLevel: (levelNumber: number) => {
    soundFX.playTapSound();
    set({
      currentLevel: levelNumber,
      unlockedPhotosTrash: false,
      isCaseSolved: false,
    });
  },

  discoverClue: (clueId: string) => {
    const state = get();
    if (state.discoveredClueIds.includes(clueId)) {
      return false;
    }

    soundFX.playClueFound();
    const newDiscovered = [...state.discoveredClueIds, clueId];
    
    set({
      discoveredClueIds: newDiscovered,
      gameScore: state.gameScore + 150,
    });

    return true;
  },

  unlockNote: (noteId: string, inputCode: string) => {
    const state = get();
    const levelData = getLevelData(state.currentLevel);
    const note = levelData.notes.find(n => n.id === noteId);

    if (!note) return { success: false, message: 'Note not found' };

    const cleanInput = inputCode.trim().toUpperCase().replace(/\s+/g, '');
    const cleanPasscode = (note.passcode || '').toUpperCase().replace(/\s+/g, '');
    
    // Check against level-specific passcodes
    let isValid = cleanInput === cleanPasscode;
    if (state.currentLevel === 1) {
      isValid = isValid || cleanInput === '2021TX9' || cleanInput === '2021TX9882';
    } else if (state.currentLevel === 3) {
      isValid = isValid || cleanInput === '45001402';
    }

    if (isValid) {
      soundFX.playUnlockSound();
      const newUnlocked = [...state.unlockedNoteIds, noteId];
      
      let newClues = [...state.discoveredClueIds];
      if (note.clueId && !newClues.includes(note.clueId)) {
        newClues.push(note.clueId);
      }

      set({
        unlockedNoteIds: newUnlocked,
        discoveredClueIds: newClues,
        gameScore: state.gameScore + 300,
      });

      return { success: true, message: 'Vault Note Successfully Decrypted!' };
    } else {
      return { success: false, message: 'Invalid Passcode. Review hint and case records.' };
    }
  },

  unlockPhotoTrash: (inputPin: string) => {
    const state = get();
    const cleanPin = inputPin.trim().replace(/\D/g, '');
    const levelData = getLevelData(state.currentLevel);
    const expected = levelData.gallery.recentlyDeletedPasscode || '0915';

    if (cleanPin === expected || (state.currentLevel === 2 && cleanPin === '0915') || (state.currentLevel === 3 && cleanPin === '4500')) {
      soundFX.playUnlockSound();
      set({ unlockedPhotosTrash: true });
      if (state.currentLevel === 2) get().discoverClue('clue_vance_security_car');
      if (state.currentLevel === 3) get().discoverClue('clue_cartier_doc');
      return true;
    }
    return false;
  },

  advanceToNextLevel: () => {
    const state = get();
    const nextLevel = (state.currentLevel % 3) + 1;
    soundFX.playClueFound();
    
    set({
      currentLevel: nextLevel,
      unlockedPhotosTrash: false,
      isCaseSolved: false,
    });
  },

  submitAccusation: (suspectId: string) => {
    const state = get();
    const levelData = getLevelData(state.currentLevel);
    const expectedTarget = levelData.completionTrigger.targetId;

    const isCorrect = suspectId === expectedTarget || 
                      (state.currentLevel === 2 && suspectId === 'julian_vance') ||
                      (state.currentLevel === 3 && suspectId === 'coach_dave_secret');

    let scoreRank: 'S' | 'A' | 'B' | 'C' = 'C';
    if (isCorrect) {
      scoreRank = state.hintsRevealed === 0 ? 'S' : 'A';
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 }
      });
      soundFX.playClueFound();
      set({ isCaseSolved: true });
      if (state.currentLevel === 2) get().discoverClue('clue_vance_confession');
      if (state.currentLevel === 3) get().discoverClue('clue_blackmail_voicemail');
    }

    return { isCorrect, scoreRank };
  },

  revealHint: () => {
    set(state => ({
      hintsRevealed: state.hintsRevealed + 1,
      gameScore: Math.max(200, state.gameScore - 50),
    }));
  },

  resetGame: () => {
    set({
      currentLevel: 1,
      discoveredClueIds: [],
      unlockedNoteIds: [],
      unlockedPhotosTrash: false,
      isCaseSolved: false,
      gameScore: 1000,
      startTime: Date.now(),
      hintsRevealed: 0,
    });
  },
}));
