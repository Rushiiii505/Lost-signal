import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Smartphone, 
  Clock, 
  Battery, 
  Radio, 
  Sparkles,
  Compass,
  ArrowRight,
  KeyRound
} from 'lucide-react';
import { getAllLevels } from '../../data/levelLoader';
import { soundFX } from '../../audio/soundFX';

interface CaseSelectionScreenProps {
  onSelectCase: (levelNumber: number) => void;
}

export const CaseSelectionScreen: React.FC<CaseSelectionScreenProps> = ({ onSelectCase }) => {
  const allLevels = getAllLevels();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'homicide' | 'conspiracy' | 'infidelity'>('all');

  const caseMetas = [
    {
      levelNumber: 1,
      category: 'homicide',
      badge: 'CASE 01 // HOMICIDE',
      badgeColor: 'text-red-400 bg-red-950/80 border-red-500/30',
      difficulty: 'NORMAL',
      difficultyColor: 'text-emerald-400',
      headline: 'The Midnight Drop',
      subtitle: 'Victim: Maya Lin (Investigative Photojournalist)',
      synopsis: 'Maya was ambushed near Pier 42 after retrieving evidence on city kickbacks. Inspect her iMessage chats, extract GPS EXIF coordinates from locker key photos, and decipher her encrypted Safe House note.',
      accentGradient: 'from-red-600/20 via-slate-900/80 to-black',
      borderColor: 'hover:border-red-500/60 shadow-red-950/40',
      specs: ['Sony Alpha 7 IV EXIF', '4th Ave Unit #404', 'Cab Plate TX9-882'],
      icon: '🕵️‍♂️',
    },
    {
      levelNumber: 2,
      category: 'conspiracy',
      badge: 'CASE 02 // CONSPIRACY',
      badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-500/30',
      difficulty: 'HARD',
      difficultyColor: 'text-amber-400',
      headline: 'The Shadow Benefactor',
      subtitle: 'Conspiracy Target: Julian Vance (CEO, Vance Holdings)',
      synopsis: 'Billionaire Julian Vance is buying district zoning votes. Inspect recurring $25,000 Helios offshore wire transfers, crack the Recently Deleted photo vault using banking deposit dates, and recover the recorded assassination order.',
      accentGradient: 'from-amber-600/20 via-slate-900/80 to-black',
      borderColor: 'hover:border-amber-500/60 shadow-amber-950/40',
      specs: ['Helios Wire Slips', 'Gate B CCTV Feed', 'Threat Voicemail'],
      icon: '🏛️',
    },
    {
      levelNumber: 3,
      category: 'infidelity',
      badge: 'CASE 03 // INFIDELITY',
      badgeColor: 'text-purple-400 bg-purple-950/80 border-purple-500/30',
      difficulty: 'EXPERT',
      difficultyColor: 'text-purple-400',
      headline: 'Infidelity & Blackmail',
      subtitle: 'Target: Liam Thorne (Hedge Fund VP)',
      synopsis: 'Hired by spouse Evelyn Thorne to inspect Liam\'s smartphone. Expose his secret burner chat with "Coach Dave" (Chloe V.), $4,500 Cartier diamond bangle invoice, St. Regis Suite #1402 alibi, and $200,000 extortion scheme.',
      accentGradient: 'from-purple-600/20 via-slate-900/80 to-black',
      borderColor: 'hover:border-purple-500/60 shadow-purple-950/40',
      specs: ['Velvet VIP Burner', 'St. Regis Suite #1402', 'Cartier $4.5k Bangle'],
      icon: '💔',
    },
  ];

  const filteredCases = caseMetas.filter(c => {
    if (selectedFilter === 'all') return true;
    return c.category === selectedFilter;
  });

  return (
    <div className="w-full min-h-screen bg-[#000000] text-gray-100 flex flex-col font-sans select-none overflow-y-auto">
      {/* Sticky Apple-Style Blurred Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-2xl border-b border-white/10 px-6 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-widest text-[13px]">
              LOST SIGNAL
            </span>
            <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
              // Found-Phone Forensic Mystery
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-[#8E8E93]">
          <span className="text-white font-medium">Cases</span>
          <button
            onClick={() => onSelectCase(1)}
            className="px-3.5 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0066CC] text-white font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Launch Case 1
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full max-w-6xl mx-auto pt-12 pb-8 px-6 flex flex-col items-center text-center">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-r from-cyan-600/15 via-blue-600/15 to-purple-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 mb-4 backdrop-blur-xl">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>FORENSIC SIMULATION ENGINE • iOS 18 HYBRID ARCHITECTURE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
          Found Phone Forensics. <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Inspect. Decrypt. Indict.
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-lg text-[#8E8E93] max-w-2xl leading-relaxed">
          Gain direct forensic access to the unlocked smartphones of murder victims, corporate conspirators, and unfaithful spouses. Cross-examine authentic mobile apps, extract raw EXIF coordinates, and decipher hidden vaults.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6 p-1 rounded-full bg-[#1C1C1E] border border-white/10 text-xs">
          {[
            { id: 'all', label: 'All Cases (3)' },
            { id: 'homicide', label: 'Homicide Mystery' },
            { id: 'conspiracy', label: 'Corporate Conspiracy' },
            { id: 'infidelity', label: 'Infidelity & Extortion' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playTapSound();
                setSelectedFilter(tab.id as any);
              }}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-white text-black shadow-md'
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Case Showcase Grid (Apple Product Bento Cards) */}
      <section className="w-full max-w-6xl mx-auto px-6 py-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => {
            const levelData = allLevels.find(l => l.levelNumber === caseItem.levelNumber);

            return (
              <div
                key={caseItem.levelNumber}
                onClick={() => {
                  soundFX.playTapSound();
                  onSelectCase(caseItem.levelNumber);
                }}
                className={`group relative rounded-[32px] bg-[#121214] border border-white/10 hover:border-white/25 p-6 flex flex-col justify-between shadow-2xl transition-all cursor-pointer overflow-hidden ${caseItem.borderColor}`}
              >
                {/* Ambient Top Glow */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${caseItem.accentGradient} opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`} />

                {/* Top Row: Case Tag & Difficulty */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${caseItem.badgeColor}`}>
                      {caseItem.badge}
                    </span>

                    <span className={`text-[10px] font-mono font-bold ${caseItem.difficultyColor}`}>
                      {caseItem.difficulty}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 my-2">
                    <div className="text-2xl p-2.5 rounded-[18px] bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                      {caseItem.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                        {caseItem.headline}
                      </h3>
                      <p className="text-[11px] text-[#8E8E93] mt-0.5 font-medium">
                        {caseItem.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-[12px] text-gray-300 leading-relaxed my-3 font-sans">
                    {caseItem.synopsis}
                  </p>

                  {/* Key Evidence Specs Tags */}
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {caseItem.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] font-mono text-gray-400 bg-black/50 border border-white/10 px-2 py-0.5 rounded-md"
                      >
                        • {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Device Meta & CTA */}
                <div className="relative z-10 mt-5 pt-3 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#8E8E93] mb-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#007AFF]" />
                      <span>{levelData?.deviceTimestamp || '11:42 PM'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Battery className="w-3 h-3 text-[#34C759]" />
                      <span>{levelData?.batteryPercentage || 89}% Battery</span>
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded-full bg-white group-hover:bg-[#007AFF] text-black group-hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xl transition-all cursor-pointer">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>INSPECT SMARTPHONE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Apple-Style Feature Grid / Tech Specs */}
      <section className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-white/10">
        <div className="text-center mb-8">
          <p className="text-xs font-mono font-bold text-[#007AFF] uppercase tracking-widest mb-1">
            Forensic Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Engineered for Realistic Detective Work.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-[24px] bg-[#121214] border border-white/10 text-left">
            <div className="w-9 h-9 rounded-xl bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center mb-3">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">True EXIF Geotagging</h4>
            <p className="text-[11px] text-[#8E8E93] leading-relaxed">
              Every photo in the camera roll contains raw lens parameters, timestamps, shutter speeds, and interactive GPS coordinates plotted on simulated Apple Maps.
            </p>
          </div>

          <div className="p-5 rounded-[24px] bg-[#121214] border border-white/10 text-left">
            <div className="w-9 h-9 rounded-xl bg-[#34C759]/20 text-[#34C759] flex items-center justify-center mb-3">
              <Radio className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Procedural Audio Engine</h4>
            <p className="text-[11px] text-[#8E8E93] leading-relaxed">
              Zero-dependency Web Audio synthesizer produces authentic DTMF dialer tones, camera shutter acoustics, and real-time voice memo waveform analysis.
            </p>
          </div>

          <div className="p-5 rounded-[24px] bg-[#121214] border border-white/10 text-left">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
              <KeyRound className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Two-Factor Cipher Vaults</h4>
            <p className="text-[11px] text-[#8E8E93] leading-relaxed">
              Crack encrypted Apple Notes and Recently Deleted albums by cross-referencing cab plate prefixes, banking statements, and wire deposit dates.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#050507] py-6 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8E93] gap-3">
          <p>© 2026 LOST SIGNAL. All rights reserved. Interactive Detective Simulation.</p>
          <div className="flex items-center gap-5">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Forensic Protocols</span>
            <span className="hover:text-white cursor-pointer">Case Archives</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
