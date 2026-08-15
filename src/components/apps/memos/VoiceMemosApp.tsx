import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Play, 
  Pause, 
  ChevronLeft, 
  Search, 
  Radio, 
  Clock, 
  MoreHorizontal,
  Folder
} from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { soundFX } from '../../../audio/soundFX';

export const VoiceMemosApp: React.FC = () => {
  const { currentLevel, discoverClue } = useGameStore();
  const { closeApp, setActiveAudioMemo, stopAudioMemo } = useOSStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const memos = currentLevel === 3 ? [
    {
      id: 'memo_301',
      title: 'St. Regis Concierge Note',
      date: 'Oct 14, 2026',
      duration: '0:22',
      durationSecs: 22,
      location: 'New York, NY',
      transcript: 'Reminder: The St. Regis Suite 1402 key will be placed under the name David Vance at 6:00 PM. Valet parking on 55th St.',
    },
    {
      id: 'memo_302',
      title: 'Fund Allocation Audit',
      date: 'Oct 11, 2026',
      duration: '0:45',
      durationSecs: 45,
      location: 'Midtown Office',
      transcript: 'Marcus is auditing the Zurich wire. I need to make sure the offshore invoice covers the $420,000 before the end of the fiscal quarter.',
    },
  ] : [
    {
      id: 'memo_101',
      title: 'Vance Whistleblower Interview #2',
      date: 'Oct 14, 2026',
      duration: '0:34',
      durationSecs: 34,
      location: 'North Harbor Pier 42',
      transcript: 'Viper confirmed the contracts are stashed in storage locker #404 on 4th Ave. He says Vance bribed Councilor Moran with $25k monthly wires to approve the rezoning.',
    },
    {
      id: 'memo_102',
      title: 'Pier 42 Ambient Audio Log',
      date: 'Oct 14, 2026',
      duration: '0:18',
      durationSecs: 18,
      location: 'Harbor Gate B',
      transcript: '[Acoustic analysis: 82Hz lighthouse foghorn rhythm echoing every 12 seconds in the harbor background].',
    },
    {
      id: 'memo_103',
      title: 'Press Conference Audio Grab',
      date: 'Oct 12, 2026',
      duration: '0:28',
      durationSecs: 28,
      location: 'City Hall Press Room',
      transcript: 'Julian Vance speaking: "Vance Holdings is investing over $80 million in maritime infrastructure. Any allegations of kickbacks are completely unfounded."',
    },
  ];

  const filteredMemos = memos.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.transcript.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTogglePlay = (memo: typeof memos[0]) => {
    if (playingId === memo.id) {
      soundFX.stopAllAudio();
      stopAudioMemo();
      setPlayingId(null);
      return;
    }

    soundFX.playTapSound();
    setPlayingId(memo.id);
    setPlaybackProgress(0);

    setActiveAudioMemo({
      id: memo.id,
      title: memo.title,
      duration: memo.duration,
      progress: 0,
      isPlaying: true,
    });

    soundFX.playSimulatedVoiceMemo(
      memo.id === 'memo_101' ? 'editor_warning' : 'viper_voice',
      memo.durationSecs || 15,
      (progress) => {
        setPlaybackProgress(progress);
      },
      () => {
        setPlayingId(null);
        setPlaybackProgress(0);
        stopAudioMemo();
      }
    );
  };

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col overflow-hidden select-none font-sans">
      {/* iOS Header */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between border-b border-[#1C1C1E] z-10">
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
          Voice Memos
        </h1>

        <span className="text-[12px] text-[#007AFF] font-medium">Edit</span>
      </div>

      {/* Search */}
      <div className="px-4 py-1.5">
        <div className="relative flex items-center bg-[#1C1C1E] rounded-[10px] px-2.5 py-1.5 border border-white/5">
          <Search className="w-4 h-4 text-[#8E8E93] mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Recordings"
            className="w-full bg-transparent text-[14px] text-white placeholder-[#8E8E93] focus:outline-none"
          />
        </div>
      </div>

      {/* Memos List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
        {filteredMemos.map((memo) => {
          const isPlaying = playingId === memo.id;

          return (
            <motion.div
              key={memo.id}
              whileTap={{ scale: 0.98 }}
              className={`p-3.5 rounded-[20px] border transition-all ${
                isPlaying 
                  ? 'bg-[#1C1C1E] border-[#FF3B30] shadow-lg' 
                  : 'bg-[#1C1C1E] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="text-[14px] font-bold text-white leading-snug">
                    {memo.title}
                  </h3>
                  <p className="text-[11px] text-[#8E8E93]">{memo.date} • {memo.location}</p>
                </div>
                <span className="text-[12px] font-mono text-[#8E8E93]">{memo.duration}</span>
              </div>

              {/* Player Controls & Animated Waveform */}
              <div className="my-2 flex items-center gap-3">
                <button
                  onClick={() => handleTogglePlay(memo)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isPlaying 
                      ? 'bg-[#FF3B30] text-white shadow-md' 
                      : 'bg-[#2C2C2E] hover:bg-[#FF3B30] text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                {/* Animated Waveform Visualizer */}
                <div className="flex-1 flex items-center gap-1 h-6 bg-black/50 p-2 rounded-[12px] border border-white/5 overflow-hidden">
                  {Array.from({ length: 22 }).map((_, i) => {
                    const barHeight = isPlaying 
                      ? Math.sin(i * 0.6 + playbackProgress * 25) * 45 + 50 
                      : ((i % 4) + 2) * 18;

                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-75 ${
                          isPlaying ? 'bg-[#FF3B30]' : 'bg-gray-600'
                        }`}
                        style={{ height: `${barHeight}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Transcript */}
              <div className="p-2.5 rounded-[12px] bg-black/40 border border-white/5 text-[11px] text-gray-300 leading-relaxed font-sans mt-2">
                <span className="text-[#FF3B30] font-semibold text-[10px] block mb-0.5">TRANSCRIPT:</span>
                {memo.transcript}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Apple Record Bar */}
      <div className="h-16 px-6 bg-[#1C1C1E] border-t border-[#2C2C2E] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-white p-1 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-[#FF3B30]" />
        </div>
      </div>
    </div>
  );
};
