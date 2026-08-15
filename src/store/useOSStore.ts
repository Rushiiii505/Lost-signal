import { create } from 'zustand';
import { AppId, DynamicIslandState, OSNotification } from '../types/os';
import { soundFX } from '../audio/soundFX';

interface OSState {
  isLocked: boolean;
  isFaceScanning: boolean;
  activeApp: AppId | null;
  appStack: AppId[];
  isAppSwitcherOpen: boolean;
  dynamicIsland: DynamicIslandState;
  notifications: OSNotification[];
  isNotificationCenterOpen: boolean;
  isCaseBoardOpen: boolean;
  isMuted: boolean;
  wallpaperIndex: number;
  batteryLevel: number;
  systemTime: string;
  isDesktopView: boolean; // Phone frame vs Fullscreen mobile

  // Active audio playback tracking
  activeAudioMemo: {
    id: string;
    title: string;
    duration: string;
    progress: number;
    isPlaying: boolean;
  } | null;

  // Actions
  unlockPhone: () => void;
  lockPhone: () => void;
  openApp: (appId: AppId) => void;
  closeApp: () => void;
  toggleAppSwitcher: () => void;
  setDynamicIsland: (state: Partial<DynamicIslandState>) => void;
  clearDynamicIsland: () => void;
  addNotification: (notification: Omit<OSNotification, 'id'>) => void;
  dismissNotification: (id: string) => void;
  toggleCaseBoard: () => void;
  setCaseBoardOpen: (open: boolean) => void;
  toggleNotificationCenter: () => void;
  toggleMute: () => boolean;
  nextWallpaper: () => void;
  toggleViewMode: () => void;
  setActiveAudioMemo: (memo: OSState['activeAudioMemo']) => void;
  updateAudioProgress: (progress: number) => void;
  stopAudioMemo: () => void;
}

const wallpapers = [
  '/assets/wallpapers/ios18_blue.webp', // Official iOS 18 Titanium Sapphire Dark
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', // Fluid Titanium Ribbon
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80', // Midnight City Skyline
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80', // Deep Space Nebula
];

export const useOSStore = create<OSState>((set, get) => ({
  isLocked: true,
  isFaceScanning: false,
  activeApp: null,
  appStack: [],
  isAppSwitcherOpen: false,
  dynamicIsland: {
    mode: 'idle',
    title: '',
  },
  notifications: [
    {
      id: 'notif_1',
      appId: 'phone',
      appName: 'Phone',
      title: 'Missed Call (11:15 PM)',
      message: 'Mark (Editor) left a voicemail: "Do not go to Pier 42..."',
      timestamp: '11:15 PM',
      isRead: false,
    },
    {
      id: 'notif_2',
      appId: 'chat',
      appName: 'Messages',
      title: 'Viper (Encrypted)',
      message: 'Look for my car at the entrance. White sedan.',
      timestamp: '11:40 PM',
      isRead: false,
    }
  ],
  isNotificationCenterOpen: false,
  isCaseBoardOpen: false,
  isMuted: false,
  wallpaperIndex: 0,
  batteryLevel: 94,
  systemTime: '11:42 PM',
  isDesktopView: true,
  activeAudioMemo: null,

  unlockPhone: () => {
    set({ isFaceScanning: true });
    soundFX.playBiometricScan();

    setTimeout(() => {
      soundFX.playUnlockSound();
      set({ isLocked: false, isFaceScanning: false });
    }, 450);
  },

  lockPhone: () => {
    soundFX.playLockSound();
    soundFX.stopAllAudio();
    set({
      isLocked: true,
      activeApp: null,
      isAppSwitcherOpen: false,
      isNotificationCenterOpen: false,
      activeAudioMemo: null,
      dynamicIsland: { mode: 'idle', title: '' },
    });
  },

  openApp: (appId: AppId) => {
    soundFX.playTapSound();
    const currentApp = get().activeApp;
    const stack = get().appStack;
    const newStack = currentApp && currentApp !== appId ? [currentApp, ...stack.filter(a => a !== currentApp)].slice(0, 5) : stack;

    set({
      activeApp: appId,
      appStack: newStack,
      isAppSwitcherOpen: false,
      isNotificationCenterOpen: false,
    });
  },

  closeApp: () => {
    soundFX.playTapSound();
    set({ activeApp: null, isAppSwitcherOpen: false });
  },

  toggleAppSwitcher: () => {
    soundFX.playTapSound();
    set(state => ({ isAppSwitcherOpen: !state.isAppSwitcherOpen }));
  },

  setDynamicIsland: (islandState) => {
    set(state => ({
      dynamicIsland: { ...state.dynamicIsland, ...islandState },
    }));
  },

  clearDynamicIsland: () => {
    set({ dynamicIsland: { mode: 'idle', title: '' } });
  },

  addNotification: (notif) => {
    soundFX.playMessageReceived();
    const newId = `notif_${Date.now()}`;
    set(state => ({
      notifications: [{ ...notif, id: newId }, ...state.notifications],
      dynamicIsland: {
        mode: 'notification',
        title: notif.title,
        subtitle: notif.message,
        iconName: notif.appName,
      },
    }));

    // Auto clear island notification after 4 seconds
    setTimeout(() => {
      if (get().dynamicIsland.mode === 'notification') {
        get().clearDynamicIsland();
      }
    }, 4000);
  },

  dismissNotification: (id: string) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },

  toggleCaseBoard: () => {
    soundFX.playTapSound();
    set(state => ({ isCaseBoardOpen: !state.isCaseBoardOpen }));
  },

  setCaseBoardOpen: (open: boolean) => {
    set({ isCaseBoardOpen: open });
  },

  toggleNotificationCenter: () => {
    soundFX.playTapSound();
    set(state => ({ isNotificationCenterOpen: !state.isNotificationCenterOpen }));
  },

  toggleMute: () => {
    const isMuted = soundFX.toggleMute();
    set({ isMuted });
    return isMuted;
  },

  nextWallpaper: () => {
    soundFX.playTapSound();
    set(state => ({ wallpaperIndex: (state.wallpaperIndex + 1) % wallpapers.length }));
  },

  toggleViewMode: () => {
    soundFX.playTapSound();
    set(state => ({ isDesktopView: !state.isDesktopView }));
  },

  setActiveAudioMemo: (memo) => {
    set({ activeAudioMemo: memo });
    if (memo && memo.isPlaying) {
      get().setDynamicIsland({
        mode: 'audio_playing',
        title: memo.title,
        duration: memo.duration,
        progress: memo.progress,
      });
    } else {
      get().clearDynamicIsland();
    }
  },

  updateAudioProgress: (progress: number) => {
    const current = get().activeAudioMemo;
    if (current) {
      set({ activeAudioMemo: { ...current, progress } });
      if (get().dynamicIsland.mode === 'audio_playing') {
        get().setDynamicIsland({ progress });
      }
    }
  },

  stopAudioMemo: () => {
    soundFX.stopAllAudio();
    set({ activeAudioMemo: null });
    if (get().dynamicIsland.mode === 'audio_playing') {
      get().clearDynamicIsland();
    }
  },
}));

export const getWallpaperUrl = (index: number) => wallpapers[index % wallpapers.length];
