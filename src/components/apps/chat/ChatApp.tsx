import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ChevronLeft, 
  Pin, 
  Plus,
  Mic,
  CheckCheck
} from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { getLevelData } from '../../../data/levelLoader';
import { Contact, Conversation } from '../../../types/game';
import { soundFX } from '../../../audio/soundFX';
import { createPhotoSVG } from '../../../utils/imageGenerator';

export const ChatApp: React.FC = () => {
  const { currentLevel, discoverClue } = useGameStore();
  const { closeApp, openApp } = useOSStore();
  const levelData = getLevelData(currentLevel);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = levelData.chats.filter(conv => {
    const contact = levelData.contacts.find(c => c.id === conv.contactId);
    const contactName = contact?.name || conv.contactId;
    return contactName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getContactForConversation = (conv: Conversation): Contact => {
    return levelData.contacts.find(c => c.id === conv.contactId) || {
      id: conv.contactId,
      name: conv.contactId,
      phone: '+1 (555) 000-0000',
    };
  };

  const handleOpenConversation = (conv: Conversation) => {
    soundFX.playTapSound();
    setSelectedConversation(conv);
    conv.messages.forEach(m => {
      if (m.clueId) {
        discoverClue(m.clueId);
      }
    });
  };

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col overflow-hidden select-none font-sans">
      {/* If No Conversation Selected: Show Messages List */}
      {!selectedConversation ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* iOS Messages Navigation Bar */}
          <div className="px-4 pt-2 pb-1 flex items-center justify-between">
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
              Messages
            </h1>

            <span className="text-[12px] text-[#007AFF] font-medium">Edit</span>
          </div>

          {/* iOS Search Bar */}
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

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#2C2C2E]/60 px-3">
            {conversations.map((conv) => {
              const contact = getContactForConversation(conv);
              const lastMsg = conv.messages[conv.messages.length - 1];

              return (
                <motion.div
                  key={conv.contactId}
                  whileTap={{ backgroundColor: '#1C1C1E' }}
                  onClick={() => handleOpenConversation(conv)}
                  className="py-3 px-2 flex items-center gap-3 cursor-pointer transition-colors"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#007AFF] to-cyan-500 flex items-center justify-center text-white font-bold text-base border border-white/10 shadow">
                      {contact.name.charAt(0)}
                    </div>
                    {conv.isPinned && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#007AFF] text-white flex items-center justify-center shadow">
                        <Pin className="w-2.5 h-2.5 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="text-[15px] font-semibold text-white truncate font-sans">
                        {contact.name}
                      </h3>
                      <span className="text-[12px] text-[#8E8E93] font-sans">
                        {lastMsg?.timestamp || '11:00 PM'}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#8E8E93] truncate leading-tight">
                      {lastMsg?.text || (lastMsg?.mediaType === 'image' ? '📷 Photo' : contact.relation || 'Contact')}
                    </p>
                  </div>

                  <ChevronLeft className="w-4 h-4 text-[#8E8E93] rotate-180 flex-shrink-0 opacity-40" />
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Conversation Thread View */
        <div className="flex-1 flex flex-col overflow-hidden bg-[#000000]">
          {/* Header */}
          {(() => {
            const contact = getContactForConversation(selectedConversation);

            return (
              <>
                <div className="px-3 pt-2 pb-2 bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-[#2C2C2E] flex items-center justify-between">
                  <button
                    onClick={() => {
                      soundFX.playTapSound();
                      setSelectedConversation(null);
                    }}
                    className="text-[#007AFF] text-[15px] font-normal flex items-center gap-0.5 hover:opacity-80 active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5 -ml-1" />
                    <span>Messages</span>
                  </button>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#007AFF] to-cyan-500 flex items-center justify-center text-white text-[11px] font-bold mb-0.5">
                      {contact.name.charAt(0)}
                    </div>
                    <h2 className="text-[12px] font-bold text-white truncate max-w-[150px]">
                      {contact.name}
                    </h2>
                  </div>

                  <div className="w-16" />
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
                  {selectedConversation.messages.map((msg) => {
                    const isUser = msg.senderId === 'user';

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-[18px] text-[14px] leading-snug relative shadow ${
                            isUser
                              ? 'bg-[#007AFF] text-white rounded-br-[4px]'
                              : 'bg-[#26252A] text-white rounded-bl-[4px] border border-white/5'
                          }`}
                        >
                          {msg.text && <p>{msg.text}</p>}

                          {/* Image Attachment */}
                          {msg.mediaType === 'image' && (
                            <div className="mt-2 rounded-[14px] overflow-hidden border border-white/10 bg-black/50">
                              <img
                                src={createPhotoSVG(msg.mediaUrl || 'locker_key', 'Photo')}
                                alt="Attachment"
                                className="w-full h-36 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => {
                                  if (msg.clueId) discoverClue(msg.clueId);
                                  openApp('photos');
                                }}
                              />
                            </div>
                          )}

                          {/* Timestamp & Read Receipt */}
                          <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-white/60 font-sans">
                            <span>{msg.timestamp}</span>
                            {isUser && <CheckCheck className="w-3 h-3 text-cyan-200" />}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* iMessage Input Bar */}
                <div className="p-2 px-3 bg-[#1C1C1E] border-t border-[#2C2C2E] flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-[#2C2C2E] flex items-center justify-center text-white/80">
                    <Plus className="w-5 h-5" />
                  </button>
                  <div className="flex-1 py-1.5 px-3 rounded-full bg-[#2C2C2E] border border-white/5 text-[13px] text-gray-400">
                    iMessage
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
