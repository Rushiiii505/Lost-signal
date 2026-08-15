import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Info, 
  MapPin, 
  Camera, 
  Lock, 
  X, 
  ChevronLeft, 
  Share,
  Heart,
  MoreHorizontal
} from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';
import { useOSStore } from '../../../store/useOSStore';
import { getLevelData } from '../../../data/levelLoader';
import { PhotoAsset } from '../../../types/game';
import { createPhotoSVG } from '../../../utils/imageGenerator';
import { soundFX } from '../../../audio/soundFX';

export const PhotosApp: React.FC = () => {
  const { currentLevel, discoverClue, unlockedPhotosTrash, unlockPhotoTrash } = useGameStore();
  const { closeApp } = useOSStore();
  const levelData = getLevelData(currentLevel);

  const [activeTab, setActiveTab] = useState<'all' | 'deleted'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoAsset | null>(null);
  const [showExifModal, setShowExifModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const allPhotos = levelData.gallery.photos;
  const deletedAlbum = levelData.gallery.albums.find(a => a.id === 'deleted');
  const deletedPhotoIds = deletedAlbum ? deletedAlbum.photoIds : [];

  const activePhotos = activeTab === 'deleted' 
    ? allPhotos.filter(p => deletedPhotoIds.includes(p.id)) 
    : allPhotos.filter(p => !deletedPhotoIds.includes(p.id));

  const handlePinSubmit = (digit: string) => {
    soundFX.playTapSound();
    if (pinInput.length < 4) {
      const nextPin = pinInput + digit;
      setPinInput(nextPin);

      if (nextPin.length === 4) {
        const success = unlockPhotoTrash(nextPin);
        if (!success) {
          setPinError(true);
          setTimeout(() => {
            setPinInput('');
            setPinError(false);
          }, 600);
        }
      }
    }
  };

  const handlePinBackspace = () => {
    soundFX.playTapSound();
    setPinInput(prev => prev.slice(0, -1));
  };

  const handleInspectPhoto = (photo: PhotoAsset) => {
    soundFX.playCameraShutter();
    setSelectedPhoto(photo);
    setShowExifModal(false);
    if (photo.clueId) {
      discoverClue(photo.clueId);
    }
  };

  return (
    <div className="relative flex-1 w-full h-full bg-[#000000] text-gray-100 flex flex-col overflow-hidden select-none font-sans">
      {/* Top iOS Photos Header */}
      <div className="px-4 pt-2 pb-2 bg-[#000000] border-b border-[#1C1C1E] flex items-center justify-between z-10">
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
          Photos
        </h1>

        {/* Segmented Picker */}
        <div className="flex items-center gap-1 bg-[#1C1C1E] p-0.5 rounded-[10px] border border-white/5 text-xs">
          <button
            onClick={() => {
              soundFX.playTapSound();
              setActiveTab('all');
            }}
            className={`px-2.5 py-1 rounded-[8px] font-medium transition-all ${
              activeTab === 'all' ? 'bg-[#3A3A3C] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Library
          </button>
          <button
            onClick={() => {
              soundFX.playTapSound();
              setActiveTab('deleted');
            }}
            className={`px-2.5 py-1 rounded-[8px] font-medium flex items-center gap-1 transition-all ${
              activeTab === 'deleted' ? 'bg-[#2C2C2E] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trash2 className="w-3 h-3 text-[#8E8E93]" />
            <span>Trash</span>
          </button>
        </div>
      </div>

      {/* Photos Grid or Locked Trash */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-1.5">
        {activeTab === 'deleted' && levelData.gallery.recentlyDeletedLocked && !unlockedPhotosTrash ? (
          /* Locked Trash PIN Keypad */
          <div className="h-full flex flex-col items-center justify-center p-4">
            <motion.div
              animate={pinError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xs p-5 rounded-[24px] bg-[#1C1C1E] border border-white/10 text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 text-white mx-auto flex items-center justify-center mb-2">
                <Lock className="w-5 h-5" />
              </div>

              <h3 className="text-[15px] font-bold text-white tracking-tight">
                Recently Deleted
              </h3>
              <p className="text-[12px] text-[#8E8E93] mt-1 mb-4">
                Enter Passcode
              </p>

              {/* PIN Dots */}
              <div className="flex justify-center gap-3 mb-6">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full border transition-all ${
                      pinInput.length > idx
                        ? 'bg-white border-white scale-110'
                        : 'border-[#8E8E93] bg-transparent'
                    }`}
                  />
                ))}
              </div>

              {/* Keypad Grid (0-9) */}
              <div className="grid grid-cols-3 gap-2.5 max-w-[200px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((k, i) => {
                  if (k === '') return <div key={i} />;
                  return (
                    <button
                      key={i}
                      onClick={() => (k === '⌫' ? handlePinBackspace() : handlePinSubmit(k))}
                      className="w-12 h-12 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] active:scale-95 text-white font-mono text-base font-semibold flex items-center justify-center border border-white/5 transition-all cursor-pointer"
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        ) : (
          /* Photos 2-column Grid */
          <div>
            <div className="flex items-center justify-between text-xs text-[#8E8E93] mb-2 px-2 font-sans">
              <span>{activePhotos.length} Photos</span>
              {activeTab === 'deleted' && (
                <span className="text-[#8E8E93] font-medium">Items deleted in last 30 days</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {activePhotos.map((photo) => {
                const imgData = createPhotoSVG(photo.fullUrl, photo.caption);

                return (
                  <motion.div
                    key={photo.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleInspectPhoto(photo)}
                    className="group relative rounded-[12px] overflow-hidden bg-[#1C1C1E] aspect-square cursor-pointer shadow-md border border-white/5"
                  >
                    <img
                      src={imgData}
                      alt={photo.caption || photo.id}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Gradient Tag */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-2 opacity-90 group-hover:opacity-100 transition-opacity">
                      <p className="text-[12px] font-semibold text-white truncate drop-shadow">
                        {photo.caption || 'Photo'}
                      </p>
                      <p className="text-[10px] text-gray-300 font-sans">
                        {photo.exif.dateTime}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 1:1 Apple iOS 18 Fullscreen Photo Viewer — Contained Inside Phone Screen */}
      {selectedPhoto && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-[#000000] flex flex-col justify-between select-none font-sans"
          >
            {/* Top iOS Photo Bar */}
            <div className="px-3 pt-2 pb-2 flex items-center justify-between text-white z-20 bg-black/40 backdrop-blur-md">
              <button
                onClick={() => {
                  soundFX.playTapSound();
                  setSelectedPhoto(null);
                  setShowExifModal(false);
                }}
                className="text-[#007AFF] text-[15px] font-normal flex items-center gap-0.5 hover:opacity-80 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 -ml-1" />
                <span>Library</span>
              </button>

              <div className="text-center">
                <p className="text-[12px] font-bold text-white truncate max-w-[150px]">
                  {selectedPhoto.caption || 'Photo'}
                </p>
                <p className="text-[10px] text-[#8E8E93] font-sans">
                  {selectedPhoto.exif.dateTime}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-1.5 rounded-full hover:bg-white/10 ${isFavorited ? 'text-red-500' : 'text-white'}`}
                >
                  <Heart className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
                <button className="p-1.5 rounded-full hover:bg-white/10 text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Photo Canvas */}
            <div 
              onClick={() => setShowExifModal(!showExifModal)}
              className="flex-1 flex items-center justify-center p-2 relative cursor-pointer"
            >
              <img
                src={createPhotoSVG(selectedPhoto.fullUrl, selectedPhoto.caption)}
                alt={selectedPhoto.caption || 'Photo'}
                className="max-h-[56vh] max-w-full rounded-[14px] object-contain shadow-2xl"
              />
            </div>

            {/* Bottom iOS Photo Action Toolbar */}
            <div className="h-12 px-6 bg-[#000000] border-t border-[#1C1C1E] flex items-center justify-between text-white z-20">
              <button className="text-[#007AFF] hover:text-white p-2">
                <Share className="w-5 h-5" />
              </button>

              <button 
                onClick={() => {
                  soundFX.playTapSound();
                  setShowExifModal(!showExifModal);
                  if (selectedPhoto.clueId) discoverClue(selectedPhoto.clueId);
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${
                  showExifModal 
                    ? 'bg-[#007AFF] text-white border-[#007AFF]' 
                    : 'bg-[#1C1C1E] text-[#007AFF] border-white/20 hover:bg-[#2C2C2E]'
                }`}
              >
                <Info className="w-4 h-4" />
                <span className="text-[12px] font-semibold">Info</span>
              </button>

              <button className="text-gray-400 hover:text-red-400 p-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Authentic iOS 18 EXIF Info Sheet Drawer */}
            {showExifModal && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                className="absolute inset-x-0 bottom-12 max-h-[70%] rounded-t-[28px] bg-[#1C1C1E] border-t border-white/15 p-4 text-left flex flex-col overflow-y-auto custom-scrollbar shadow-2xl z-30"
              >
                {/* Grab handle */}
                <div className="w-10 h-1 rounded-full bg-[#3A3A3C] mx-auto mb-3" />

                {/* Top Info Header */}
                <div className="flex items-start justify-between pb-2 border-b border-[#2C2C2E] mb-3">
                  <div>
                    <h3 className="text-[14px] font-bold text-white">
                      {selectedPhoto.caption || 'Captured Photo'}
                    </h3>
                    <p className="text-[11px] text-[#8E8E93] mt-0.5">
                      {selectedPhoto.exif.dateTime}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowExifModal(false)}
                    className="w-6 h-6 rounded-full bg-[#2C2C2E] flex items-center justify-center text-[#8E8E93] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Apple Camera Specs Box */}
                <div className="p-3.5 rounded-[18px] bg-[#2C2C2E] border border-white/5 space-y-1 text-xs mb-3 shadow-inner">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#007AFF]" />
                    <span className="font-bold text-white">{selectedPhoto.exif.camera}</span>
                  </div>
                  <div className="text-[11px] text-[#8E8E93] font-mono pl-6">
                    24mm • 0 ev • f/2.8 • 1/125s • ISO {selectedPhoto.exif.iso || '800'}
                  </div>
                  <div className="text-[11px] text-[#8E8E93] font-mono pl-6">
                    14.2 MB • 7008 × 4672 • RAW • JPEG
                  </div>
                </div>

                {/* Apple Location & Map Box */}
                {selectedPhoto.exif.locationName && (
                  <div className="p-3.5 rounded-[18px] bg-[#2C2C2E] border border-white/5 mb-2 shadow-inner">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#FF3B30]" />
                        <span className="font-bold text-white text-[12px]">
                          {selectedPhoto.exif.locationName}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#007AFF] bg-[#007AFF]/15 px-2 py-0.5 rounded-full font-bold">
                        MAPS
                      </span>
                    </div>

                    {selectedPhoto.exif.coordinates && (
                      <p className="text-[11px] font-mono text-[#8E8E93] mb-2 pl-5">
                        GPS: {selectedPhoto.exif.coordinates}
                      </p>
                    )}

                    {/* Simulated Apple Maps Tile */}
                    <div className="h-24 w-full rounded-[14px] bg-[#121214] border border-white/10 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(#2C2C2E_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-[#007AFF]/25 animate-ping" />
                      </div>
                      <div className="relative flex flex-col items-center">
                        <MapPin className="w-5 h-5 text-[#FF3B30] drop-shadow-md animate-bounce" />
                        <span className="text-[8px] font-bold font-mono text-white bg-black/80 px-2 py-0.5 rounded-full border border-white/10 mt-0.5">
                          PIN LOCATION
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
