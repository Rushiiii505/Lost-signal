export type AppId = 
  | 'chat'
  | 'photos'
  | 'notes'
  | 'phone'
  | 'bank'
  | 'rides'
  | 'files'
  | 'safari'
  | 'mail'
  | 'memos'
  | 'trading'
  | 'dating'
  | 'caseboard'
  | 'settings';

export interface AppDefinition {
  id: AppId;
  name: string;
  icon: string;
  badge?: number;
  gradient: string;
  iconColor: string;
  isLocked?: boolean;
}

export type DynamicIslandMode = 
  | 'idle'
  | 'audio_playing'
  | 'incoming_call'
  | 'active_call'
  | 'notification'
  | 'clue_found'
  | 'recording';

export interface DynamicIslandState {
  mode: DynamicIslandMode;
  title: string;
  subtitle?: string;
  iconName?: string;
  progress?: number;
  duration?: string;
  callerName?: string;
  callerNumber?: string;
  avatar?: string;
  payload?: any;
}

export interface OSNotification {
  id: string;
  appId: AppId;
  appName: string;
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
  actionPayload?: any;
}
