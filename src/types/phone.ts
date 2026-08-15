export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
  phone: string;
  isPinned?: boolean;
  unreadCount?: number;
}

export interface Message {
  id: string;
  senderId: string; // 'maya' or contact.id
  text?: string;
  timestamp: string; // e.g. "11:18 PM"
  isVoiceMemo?: boolean;
  voiceMemoDuration?: string; // e.g. "0:42"
  voiceMemoTranscript?: string;
  voiceMemoAudioType?: 'editor_warning' | 'viper_voice' | 'patrol_radio' | 'general';
  imageAttachment?: {
    id: string;
    url: string;
    caption?: string;
    exifPhotoId?: string; // links to Photo in Gallery
  };
  isRead?: boolean;
  isDeleted?: boolean;
}

export interface ChatThread {
  contactId: string;
  lastMessageTimestamp: string;
  messages: Message[];
  deletedMessages?: Message[];
}

export interface ExifData {
  camera: string;
  lens?: string;
  iso: number;
  aperture: string;
  shutterSpeed: string;
  focalLength: string;
  timestamp: string;
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  fileSize: string;
  dimensions: string;
  fileFormat: string;
  clueSummary?: string;
  clueId?: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  album: 'all' | 'camera' | 'evidence' | 'surveillance' | 'deleted';
  timestamp: string;
  dateStr: string;
  isFavorite?: boolean;
  isDeleted?: boolean;
  exif: ExifData;
}

export interface NoteItem {
  id: string;
  folder: 'journal' | 'safehouse' | 'passwords' | 'drafts';
  title: string;
  body: string;
  updatedAt: string;
  createdAt: string;
  isLocked: boolean;
  pinHash?: string;
  passcode?: string; // e.g., "0412VP789X" or "0412789"
  hint?: string;
  unlockedContent?: {
    title: string;
    body: string;
    attachments?: Array<{
      type: 'image' | 'doc' | 'pdf';
      title: string;
      url: string;
      previewText?: string;
    }>;
  };
  clueId?: string;
}

export interface BankTransaction {
  id: string;
  merchant: string;
  category: 'transfer' | 'transport' | 'food' | 'tech' | 'services' | 'cash';
  amount: number;
  type: 'debit' | 'credit';
  timestamp: string;
  date: string;
  accountEnding: string;
  notes?: string;
  isFlagged?: boolean;
  clueId?: string;
}

export interface RideRecord {
  id: string;
  service: 'MetroPulse Black' | 'MetroPulse Standard' | 'Wayfarer Lux';
  driverName: string;
  driverRating: number;
  vehicleMake: string;
  licensePlate: string;
  pickupTime: string;
  dropoffTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  fare: string;
  status: 'completed' | 'cancelled';
  routeCoordinates: Array<{ lat: number; lng: number; label?: string }>;
  clueId?: string;
}

export interface VoicemailItem {
  id: string;
  callerId: string;
  callerName: string;
  callerNumber: string;
  timestamp: string;
  duration: string;
  audioDurationSecs: number;
  audioType: 'editor_warning' | 'viper_voice' | 'patrol_radio' | 'foghorn_dock';
  transcript: string;
  isUnread?: boolean;
  isDeleted?: boolean;
  backgroundNoiseDetail?: string;
  clueId?: string;
}

export interface CallLogItem {
  id: string;
  callerName: string;
  callerNumber: string;
  type: 'missed' | 'incoming' | 'outgoing';
  timestamp: string;
  duration?: string;
}
