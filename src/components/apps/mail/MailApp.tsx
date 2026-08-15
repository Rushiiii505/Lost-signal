import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  ChevronLeft, 
  Search, 
  Star, 
  Trash2, 
  Reply, 
  Archive, 
  Paperclip,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { soundFX } from '../../../audio/soundFX';

export const MailApp: React.FC = () => {
  const { currentLevel, discoverClue } = useGameStore();
  const { closeApp } = useOSStore();

  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Case-specific emails list
  const emails = currentLevel === 3 ? [
    {
      id: 'e301',
      sender: 'The St. Regis Luxury Reservations',
      email: 'reservations@stregis-ny.com',
      subject: 'Reservation Confirmation: Suite #1402 (Alias: David Vance)',
      date: 'Oct 14, 8:05 PM',
      preview: 'Thank you for choosing The St. Regis New York. Your booking for Suite #1402 is confirmed for Oct 16-19.',
      body: 'Dear Mr. Vance,\n\nYour reservation for the 5th Avenue Presidential Suite #1402 is confirmed. Special requests: Champagne upon arrival and private underground valet parking.\n\nTotal estimated stay: $5,600.00.\nCharged to card ending in 7741.',
      isUnread: true,
      hasAttachment: true,
    },
    {
      id: 'e302',
      sender: 'Evelyn Thorne',
      email: 'evelyn.thorne@gmail.com',
      subject: 'Weekend Hamptons trip with the girls',
      date: 'Oct 14, 3:20 PM',
      preview: 'Hey Liam! Leaving for the Hamptons at 5. Good luck with your Chicago finance summit this weekend!',
      body: 'Hey Liam,\n\nI packed everything and the girls are picking me up. Have a productive time at the Chicago conference! Don\'t forget to check in with Marcus about the fund audit.\n\nLove,\nEvelyn',
      isUnread: false,
      hasAttachment: false,
    },
    {
      id: 'e303',
      sender: 'Cartier Client Relations',
      email: 'concierge@cartier.com',
      subject: 'Your Cartier E-Receipt & Certificate of Authenticity',
      date: 'Oct 12, 3:45 PM',
      preview: 'Thank you for your purchase at our 5th Avenue Flagship boutique. Item: Love Bangle Rose Gold.',
      body: 'Dear Mr. Thorne,\n\nThank you for purchasing the Love Bracelet in 18K Rose Gold (Ref: B6035617) totaling $4,500.00 USD.\n\nYour warranty is registered with Cartier International.',
      isUnread: false,
      hasAttachment: true,
    },
    {
      id: 'e304',
      sender: 'Thorne Capital Internal Audit',
      email: 'compliance@thornecap.com',
      subject: 'Urgent: Discrepancy in Zurich Account #8991 Transfers',
      date: 'Oct 11, 9:15 AM',
      preview: 'Our automated compliance flags noted an unauthorized outflow of $420,000 to offshore escrow.',
      body: 'Liam,\n\nMarcus requested an immediate breakdown of the $420,000 wire initiated on Tuesday. Please provide counterparty documentation before the quarterly board review on Monday.',
      isUnread: false,
      hasAttachment: false,
    },
  ] : [
    {
      id: 'e101',
      sender: 'Mark (Tribune Editor-in-Chief)',
      email: 'm.keller@daily-tribune.com',
      subject: 'Vance Investigation: Story Deadline & Legal Review',
      date: 'Oct 14, 10:15 PM',
      preview: 'Maya, the legal team approved the harbor kickback article pending unit #404 document scans.',
      body: 'Maya,\n\nOur legal team reviewed your draft on Julian Vance\'s harbor rezoning bribes. The story is explosive, but we need the original hard-copy contracts from the safe house before going to print.\n\nBe extremely careful—Vance has private security contractors monitoring Tribune reporters.\n\n— Mark',
      isUnread: true,
      hasAttachment: false,
    },
    {
      id: 'e102',
      sender: 'North Harbor Public Storage',
      email: 'billing@northharborstorage.com',
      subject: 'Monthly Rental Invoice: Unit #404 (Auto-Paid)',
      date: 'Oct 1, 9:00 AM',
      preview: 'Receipt for Unit #404 on 4th Ave. Current status: Active & Secured.',
      body: 'Dear Maya Lin,\n\nYour monthly storage fee of $120.00 for Unit #404 (4th Ave North Harbor Facility) has been processed.\n\nFacility Access: 24/7 with Master Physical Key.',
      isUnread: false,
      hasAttachment: true,
    },
    {
      id: 'e103',
      sender: 'MetroPress Credentials Bureau',
      email: 'credentials@metropress.org',
      subject: '2026 Investigative Journalist Press Pass Renewal',
      date: 'Sep 25, 2:30 PM',
      preview: 'Your accredited media credentials have been renewed for the current fiscal year.',
      body: 'Official Press ID #8841-B issued to Maya Lin, Investigative Photojournalist, The Daily Tribune.',
      isUnread: false,
      hasAttachment: true,
    },
    {
      id: 'e104',
      sender: 'Spotify Music',
      email: 'no-reply@spotify.com',
      subject: 'Your Monthly Premium Subscription Receipt',
      date: 'Oct 10, 1:00 AM',
      preview: 'Thank you for your payment of $10.99 for Spotify Premium Family.',
      body: 'Your subscription renewed successfully for another month of ad-free listening.',
      isUnread: false,
      hasAttachment: false,
    },
  ];

  const filteredEmails = emails.filter(e => 
    e.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col overflow-hidden select-none font-sans">
      {/* If No Email Selected: Mailbox Inbox */}
      {!selectedEmail ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 pt-2 pb-1 flex items-center justify-between z-10">
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
              Inbox
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
                placeholder="Search Mail"
                className="w-full bg-transparent text-[14px] text-white placeholder-[#8E8E93] focus:outline-none"
              />
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#2C2C2E]/60 px-3">
            {filteredEmails.map((email) => (
              <motion.div
                key={email.id}
                whileTap={{ backgroundColor: '#1C1C1E' }}
                onClick={() => {
                  soundFX.playTapSound();
                  setSelectedEmail(email);
                }}
                className="py-3 px-2 flex flex-col cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {email.isUnread && (
                      <span className="w-2 h-2 rounded-full bg-[#007AFF] flex-shrink-0" />
                    )}
                    <h3 className={`text-[14px] truncate max-w-[180px] ${email.isUnread ? 'font-bold text-white' : 'font-medium text-gray-200'}`}>
                      {email.sender}
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#8E8E93]">
                    {email.date}
                  </span>
                </div>

                <h4 className={`text-[13px] truncate ${email.isUnread ? 'font-semibold text-white' : 'text-gray-300'}`}>
                  {email.subject}
                </h4>

                <p className="text-[12px] text-[#8E8E93] line-clamp-2 mt-0.5 leading-snug">
                  {email.preview}
                </p>

                {email.hasAttachment && (
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[#8E8E93] font-mono">
                    <Paperclip className="w-3 h-3" />
                    <span>Attachment</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Email Reader View */
        <div className="flex-1 flex flex-col overflow-hidden bg-[#000000]">
          {/* Header */}
          <div className="px-3 pt-2 pb-2 bg-[#1C1C1E] border-b border-[#2C2C2E] flex items-center justify-between">
            <button
              onClick={() => {
                soundFX.playTapSound();
                setSelectedEmail(null);
              }}
              className="text-[#007AFF] text-[15px] font-normal flex items-center gap-0.5 hover:opacity-80 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 -ml-1" />
              <span>Inbox</span>
            </button>

            <div className="flex items-center gap-3 text-[#007AFF]">
              <Archive className="w-4 h-4" />
              <Trash2 className="w-4 h-4 text-[#8E8E93]" />
              <Reply className="w-4 h-4" />
            </div>
          </div>

          {/* Email Content Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            <div className="border-b border-[#2C2C2E] pb-3">
              <h2 className="text-[16px] font-bold text-white leading-snug">
                {selectedEmail.subject}
              </h2>
              <div className="mt-2 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-white">{selectedEmail.sender}</p>
                  <p className="text-[#8E8E93] text-[11px] font-mono">{selectedEmail.email}</p>
                </div>
                <span className="text-[#8E8E93] text-[11px]">{selectedEmail.date}</span>
              </div>
            </div>

            <div className="text-[13px] text-gray-200 whitespace-pre-line leading-relaxed font-sans pt-1">
              {selectedEmail.body}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
