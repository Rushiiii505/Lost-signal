import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone as PhoneIcon, 
  Voicemail, 
  Clock, 
  PhoneIncoming, 
  PhoneMissed, 
  Play, 
  Pause, 
  Radio, 
  ChevronLeft,
  Delete,
  Grid
} from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { getLevelData } from '../../../data/levelLoader';
import { VoicemailItem, Contact } from '../../../types/game';
import { soundFX } from '../../../audio/soundFX';

export const PhoneApp: React.FC = () => {
  const { currentLevel, discoverClue } = useGameStore();
  const { setActiveAudioMemo, stopAudioMemo, closeApp } = useOSStore();
  const levelData = getLevelData(currentLevel);

  const [activeTab, setActiveTab] = useState<'voicemail' | 'recents' | 'keypad'>('voicemail');
  
  // Dialpad state
  const [dialedNumber, setDialedNumber] = useState('');
  const [dialCallStatus, setDialCallStatus] = useState<string | null>(null);

  // Voicemail playback state
  const [playingVmId, setPlayingVmId] = useState<string | null>(null);
  const [vmProgress, setVmProgress] = useState(0);

  const voicemails = levelData.voicemails;

  const getContact = (callerId: string): Contact => {
    return levelData.contacts.find(c => c.id === callerId) || {
      id: callerId,
      name: callerId === 'julian_vance' ? 'Julian Vance' : 'Mark (Tribune Editor)',
      phone: callerId === 'julian_vance' ? '+1 (555) 099-0012' : '+1 (555) 019-2834',
    };
  };

  const handlePlayVoicemail = (vm: VoicemailItem) => {
    if (playingVmId === vm.id) {
      soundFX.stopAllAudio();
      stopAudioMemo();
      setPlayingVmId(null);
      return;
    }

    setPlayingVmId(vm.id);
    setVmProgress(0);

    const contact = getContact(vm.callerId);

    setActiveAudioMemo({
      id: vm.id,
      title: `Voicemail: ${contact.name}`,
      duration: `0:${vm.durationSeconds}`,
      progress: 0,
      isPlaying: true,
    });

    if (vm.clueId) {
      discoverClue(vm.clueId);
    }

    soundFX.playSimulatedVoiceMemo(
      vm.callerId === 'julian_vance' ? 'viper_voice' : 'editor_warning',
      vm.durationSeconds || 8,
      (progress) => {
        setVmProgress(progress);
      },
      () => {
        setPlayingVmId(null);
        setVmProgress(0);
        stopAudioMemo();
      }
    );
  };

  const handleDialKey = (key: string) => {
    soundFX.playDialTone(key);
    if (dialedNumber.length < 15) {
      setDialedNumber(prev => prev + key);
    }
  };

  const handleCallDialed = () => {
    soundFX.playTapSound();
    if (!dialedNumber) return;

    if (dialedNumber.includes('911') || dialedNumber.includes('099')) {
      setDialCallStatus('Connecting to encrypted channel...');
      setTimeout(() => {
        setDialCallStatus('Line disconnected. "No incoming calls permitted."');
        setTimeout(() => setDialCallStatus(null), 3000);
      }, 2000);
    } else {
      setDialCallStatus('Calling ' + dialedNumber + '...');
      setTimeout(() => {
        setDialCallStatus('Line busy. Disconnected.');
        setTimeout(() => setDialCallStatus(null), 2500);
      }, 2000);
    }
  };

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top iOS Header */}
      <div className="px-4 pt-2 pb-2 bg-[#000000] border-b border-[#1C1C1E] flex items-center justify-between">
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

        <h1 className="text-[17px] font-bold text-white tracking-tight capitalize">
          {activeTab}
        </h1>

        <div className="w-12" />
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        {/* Tab 1: Voicemail */}
        {activeTab === 'voicemail' && (
          <div className="space-y-3">
            {voicemails.map((vm) => {
              const isPlaying = playingVmId === vm.id;
              const contact = getContact(vm.callerId);

              return (
                <div
                  key={vm.id}
                  className={`p-4 rounded-[20px] border transition-all ${
                    isPlaying
                      ? 'bg-[#1C1C1E] border-emerald-500 shadow-lg'
                      : 'bg-[#1C1C1E] border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <h3 className="text-[14px] font-bold text-white flex items-center gap-1.5">
                        <span>{contact.name}</span>
                      </h3>
                      <p className="text-[11px] text-[#8E8E93]">{contact.phone}</p>
                    </div>

                    <span className="text-[11px] text-[#8E8E93]">
                      {vm.timestamp} (0:{vm.durationSeconds})
                    </span>
                  </div>

                  {/* Playback Controls & Waveform */}
                  <div className="my-3 flex items-center gap-3">
                    <button
                      onClick={() => handlePlayVoicemail(vm)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isPlaying
                          ? 'bg-[#34C759] text-white shadow-md'
                          : 'bg-[#2C2C2E] hover:bg-[#34C759] hover:text-white text-[#34C759]'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    {/* Animated Waveform Visualizer */}
                    <div className="flex-1 flex items-center gap-1 h-6 bg-black/50 p-2 rounded-[12px] border border-white/5 overflow-hidden">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const barHeight = isPlaying 
                          ? Math.sin(i * 0.5 + vmProgress * 20) * 40 + 50 
                          : ((i % 5) + 2) * 15;

                        return (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-all duration-75 ${
                              isPlaying ? 'bg-[#34C759]' : 'bg-gray-600'
                            }`}
                            style={{ height: `${barHeight}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Transcription Card */}
                  <div className="p-3 rounded-[14px] bg-black/40 border border-white/5 text-[12px] text-gray-200 leading-relaxed">
                    <p className="text-[10px] text-emerald-400 mb-1 font-semibold flex items-center gap-1">
                      <Radio className="w-3 h-3 animate-pulse" />
                      <span>TRANSCRIPT:</span>
                    </p>
                    <p>{vm.transcript}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Recents Call Log */}
        {activeTab === 'recents' && (
          <div className="divide-y divide-[#2C2C2E]/60">
            {levelData.contacts.map((contact, idx) => (
              <div
                key={contact.id + idx}
                className="py-3 px-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1C1C1E] flex items-center justify-center">
                    {idx === 0 ? (
                      <PhoneMissed className="w-3.5 h-3.5 text-[#FF3B30]" />
                    ) : (
                      <PhoneIncoming className="w-3.5 h-3.5 text-[#34C759]" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-[14px] font-medium ${idx === 0 ? 'text-[#FF3B30]' : 'text-white'}`}>
                      {contact.name}
                    </h4>
                    <p className="text-[11px] text-[#8E8E93]">{contact.phone}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#8E8E93]">
                    {idx === 0 ? '11:15 PM' : '10:45 PM'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Keypad */}
        {activeTab === 'keypad' && (
          <div className="h-full flex flex-col items-center justify-center p-2">
            <div className="h-12 flex items-center justify-center text-2xl font-light text-white tracking-widest mb-3">
              {dialedNumber || <span className="text-[#8E8E93] text-sm">Enter number</span>}
            </div>

            {dialCallStatus && (
              <p className="text-xs text-cyan-400 mb-2">{dialCallStatus}</p>
            )}

            {/* Circular Keypad Grid */}
            <div className="grid grid-cols-3 gap-3.5 max-w-[240px]">
              {[
                { k: '1', sub: '' }, { k: '2', sub: 'ABC' }, { k: '3', sub: 'DEF' },
                { k: '4', sub: 'GHI' }, { k: '5', sub: 'JKL' }, { k: '6', sub: 'MNO' },
                { k: '7', sub: 'PQRS' }, { k: '8', sub: 'TUV' }, { k: '9', sub: 'WXYZ' },
                { k: '*', sub: '' }, { k: '0', sub: '+' }, { k: '#', sub: '' },
              ].map((item) => (
                <button
                  key={item.k}
                  onClick={() => handleDialKey(item.k)}
                  className="w-16 h-16 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] active:bg-[#48484A] text-white flex flex-col items-center justify-center transition-all cursor-pointer"
                >
                  <span className="text-xl font-normal leading-none">{item.k}</span>
                  {item.sub && <span className="text-[9px] text-[#8E8E93] font-bold mt-0.5 tracking-wider">{item.sub}</span>}
                </button>
              ))}
            </div>

            {/* Green Call Button */}
            <div className="flex items-center gap-6 mt-4">
              <div className="w-12" />
              <button
                onClick={handleCallDialed}
                className="w-16 h-16 rounded-full bg-[#34C759] hover:bg-[#28CD41] active:scale-95 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
              >
                <PhoneIcon className="w-7 h-7 fill-white" />
              </button>
              {dialedNumber ? (
                <button
                  onClick={() => {
                    soundFX.playTapSound();
                    setDialedNumber(prev => prev.slice(0, -1));
                  }}
                  className="w-12 h-12 rounded-full text-gray-400 hover:text-white flex items-center justify-center"
                >
                  <Delete className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-12" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom iOS Phone Tab Bar */}
      <div className="bg-[#1C1C1E] border-t border-[#2C2C2E] px-4 py-1.5 flex items-center justify-around text-xs">
        <button
          onClick={() => {
            soundFX.playTapSound();
            setActiveTab('voicemail');
          }}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'voicemail' ? 'text-[#007AFF]' : 'text-[#8E8E93]'
          }`}
        >
          <Voicemail className="w-5 h-5" />
          <span className="text-[10px] font-medium">Voicemail</span>
        </button>

        <button
          onClick={() => {
            soundFX.playTapSound();
            setActiveTab('recents');
          }}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'recents' ? 'text-[#007AFF]' : 'text-[#8E8E93]'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-medium">Recents</span>
        </button>

        <button
          onClick={() => {
            soundFX.playTapSound();
            setActiveTab('keypad');
          }}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'keypad' ? 'text-[#007AFF]' : 'text-[#8E8E93]'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Keypad</span>
        </button>
      </div>
    </div>
  );
};
