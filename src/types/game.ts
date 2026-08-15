export interface Contact {
  id: string;
  name: string;
  avatarUrl?: string;
  phone: string;
  relation?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string; // "user" or Contact id
  timestamp: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio';
  audioDurationSeconds?: number;
  clueId?: string; // Triggers clue discovery when viewed
}

export interface Conversation {
  contactId: string;
  isPinned?: boolean;
  messages: ChatMessage[];
}

export interface PhotoAsset {
  id: string;
  thumbnailUrl: string;
  fullUrl: string;
  caption?: string;
  exif: {
    dateTime: string;
    camera: string;
    locationName?: string;
    coordinates?: string;
    iso?: string;
  };
  clueId?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  lastEdited: string;
  content: string;
  isLocked: boolean;
  passcode?: string;
  passcodeHint?: string;
  clueId?: string;
}

export interface BankTransaction {
  id: string;
  date: string;
  merchant: string;
  category: 'transfer' | 'food' | 'transport' | 'shopping' | 'deposit';
  amount: number; // Negative for debit, positive for credit
  accountNumberMasked: string;
  note?: string;
  clueId?: string;
}

export interface VoicemailItem {
  id: string;
  callerId: string;
  timestamp: string;
  durationSeconds: number;
  audioUrl: string;
  transcript: string;
  clueId?: string;
}

export interface RideHistoryItem {
  id: string;
  timestamp: string;
  pickup: string;
  dropoff: string;
  driverName: string;
  licensePlate: string;
  vehicleModel: string;
  clueId?: string;
}

export interface CaseClue {
  id: string;
  title: string;
  sourceApp: 'chat' | 'gallery' | 'notes' | 'banking' | 'voicemail' | 'rideshare';
  description: string;
  discoveredAt?: string;
}

export interface LevelData {
  levelNumber: number;
  levelTitle: string;
  victimName: string;
  deviceTimestamp: string;
  batteryPercentage: number;
  objective: string;
  contacts: Contact[];
  chats: Conversation[];
  gallery: {
    albums: { id: string; name: string; photoIds: string[] }[];
    photos: PhotoAsset[];
    recentlyDeletedLocked: boolean;
    recentlyDeletedPasscode?: string;
  };
  notes: NoteItem[];
  banking: {
    accountHolder: string;
    currentBalance: number;
    transactions: BankTransaction[];
  };
  voicemails: VoicemailItem[];
  rideHistory: RideHistoryItem[];
  clues: CaseClue[];
  completionTrigger: {
    type: 'unlock_note' | 'accuse_suspect';
    targetId: string;
  };
}
