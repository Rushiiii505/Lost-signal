import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Share, 
  BookOpen, 
  Copy, 
  Globe, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Lock
} from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { soundFX } from '../../../audio/soundFX';

export const SafariApp: React.FC = () => {
  const { currentLevel, discoverClue } = useGameStore();
  const { closeApp } = useOSStore();

  const [activeTab, setActiveTab] = useState<'home' | 'article'>('home');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [urlInput, setUrlInput] = useState('the-daily-tribune.com/investigations');

  // Case-specific browser search histories & articles
  const caseHistory = currentLevel === 3 ? [
    {
      title: "The St. Regis New York - Luxury Suites & Penthouse Rates",
      url: "stregis.marriott.com/suites/1402",
      time: "Yesterday, 8:12 PM",
      snippet: "Exclusive booking confirmed for Presidential Suite 1402 on 5th Avenue. Private check-in amenities included.",
    },
    {
      title: "Cartier Official - Love Bracelet 18K Rose Gold Value",
      url: "cartier.com/en-us/jewelry/bracelets/love",
      time: "Oct 12, 2:45 PM",
      snippet: "Created in New York in 1969, the LOVE bracelet is an icon of jewelry design: a close-fitting oval bracelet composed of two rigid arcs.",
    },
    {
      title: "Swiss Banking Confidentiality & Foreign Wire Regulations",
      url: "finma.ch/en/banking/private-accounts-2026",
      time: "Oct 10, 11:20 PM",
      snippet: "Guide to offshore asset allocation and non-disclosure trust agreements for private fund managers.",
    },
    {
      title: "Miami Beach Marina - Luxury Yacht Charters & Slip Reservations",
      url: "miamibeachmarina.com/slips/slip-42",
      time: "Sep 28, 1:15 PM",
      snippet: "Slip 42 reserved for 65ft Sunseeker yacht. Full crew and catering services confirmed.",
    },
  ] : [
    {
      title: "The Tribune: City Council Rezoning Scandal & Julian Vance Ties",
      url: "the-daily-tribune.com/investigations/harbor-rezoning",
      time: "Oct 14, 9:30 PM",
      snippet: "Leaked financial records link offshore dummy corporation Helios Holdings to key district voting blocks for Pier 42 maritime redevelopment.",
    },
    {
      title: "Harbor Authority Pier 42 Security Guidelines & Gate B Access",
      url: "portauthority.gov/security/pier42-regulations",
      time: "Oct 14, 8:15 PM",
      snippet: "Commercial access after 10:00 PM requires Level 2 clearance. Private contractor security patrol active on channel 9.",
    },
    {
      title: "North Harbor Public Storage - 4th Avenue 24/7 Locker Access",
      url: "northharborstorage.com/locations/4th-ave",
      time: "Oct 13, 4:20 PM",
      snippet: "Automated climate-controlled lockers. Unit #404 access requires standard master tumbler key.",
    },
    {
      title: "Sony Alpha 7 IV Firmware & GPS Geotagging User Manual",
      url: "sony.com/electronics/support/ilce-7m4",
      time: "Oct 11, 2:00 PM",
      snippet: "EXIF metadata includes embedded GPS coordinates, aperture, shutter speed, and raw uncompressed color matrix.",
    },
  ];

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Safari Bar */}
      <div className="px-3 pt-2 pb-2 bg-[#1C1C1E] border-b border-[#2C2C2E] flex items-center justify-between z-10">
        <button
          onClick={() => {
            soundFX.playTapSound();
            closeApp();
          }}
          className="text-[#007AFF] text-[15px] font-normal flex items-center gap-0.5 hover:opacity-80 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 -ml-1" />
          <span>Home</span>
        </button>

        {/* Safari URL Pill Bar */}
        <div className="flex-1 mx-2 flex items-center justify-center bg-[#2C2C2E] rounded-full px-3 py-1.5 border border-white/5 text-[12px] text-white">
          <Lock className="w-3 h-3 text-[#8E8E93] mr-1.5" />
          <span className="truncate max-w-[140px] font-sans font-medium text-gray-200">
            {selectedArticle ? selectedArticle.url : urlInput}
          </span>
          <RefreshCw className="w-3 h-3 text-[#8E8E93] ml-auto" />
        </div>

        <div className="w-6" />
      </div>

      {/* Safari Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        {!selectedArticle ? (
          <div className="space-y-4">
            {/* Bookmarks / Favorites Grid */}
            <div>
              <p className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-2 px-1">
                Favorites
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { name: 'The Tribune', icon: '📰', bg: 'bg-[#1C1C1E]' },
                  { name: 'Apple', icon: '', bg: 'bg-[#1C1C1E]' },
                  { name: 'Maps', icon: '🗺️', bg: 'bg-[#1C1C1E]' },
                  { name: 'Weather', icon: '🌤️', bg: 'bg-[#1C1C1E]' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 cursor-pointer">
                    <div className={`w-12 h-12 rounded-[16px] ${item.bg} border border-white/5 flex items-center justify-center text-xl shadow-md`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] text-gray-300 truncate max-w-[60px] font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading List & Search History */}
            <div>
              <p className="text-[12px] font-bold text-[#8E8E93] uppercase tracking-wider mb-2 px-1">
                Recent Searches & Pinned Articles
              </p>
              <div className="rounded-[20px] bg-[#1C1C1E] divide-y divide-[#2C2C2E] border border-white/5 overflow-hidden">
                {caseHistory.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileTap={{ backgroundColor: '#2C2C2E' }}
                    onClick={() => {
                      soundFX.playTapSound();
                      setSelectedArticle(item);
                    }}
                    className="p-3.5 cursor-pointer hover:bg-[#2C2C2E]/60 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#8E8E93] mb-1">
                      <span className="truncate max-w-[170px] text-[#007AFF] font-medium">{item.url}</span>
                      <span>{item.time}</span>
                    </div>
                    <h4 className="text-[13px] font-semibold text-white leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-normal">
                      {item.snippet}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Article Reader View */
          <div className="space-y-3 p-1">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-[#007AFF] text-xs font-semibold flex items-center gap-1 mb-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Searches</span>
            </button>

            <h2 className="text-[17px] font-bold text-white leading-tight">
              {selectedArticle.title}
            </h2>
            <p className="text-[11px] text-[#8E8E93]">
              Published on {selectedArticle.url} • {selectedArticle.time}
            </p>

            <div className="p-3.5 rounded-[18px] bg-[#1C1C1E] border border-white/10 text-[13px] text-gray-200 leading-relaxed space-y-2.5">
              <p>{selectedArticle.snippet}</p>
              <p className="text-gray-400 text-xs">
                Archived forensic cache. Verified authentic browser session token.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Safari Bar */}
      <div className="h-11 px-4 bg-[#1C1C1E] border-t border-[#2C2C2E] flex items-center justify-between text-[#007AFF]">
        <button 
          onClick={() => {
            if (selectedArticle) setSelectedArticle(null);
          }}
          className="p-1"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="p-1 opacity-40">
          <ChevronRight className="w-5 h-5" />
        </button>
        <button className="p-1">
          <Share className="w-5 h-5" />
        </button>
        <button className="p-1">
          <BookOpen className="w-5 h-5" />
        </button>
        <button className="p-1">
          <Copy className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
