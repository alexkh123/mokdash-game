export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6;

export interface InventoryItem {
  id: string;
  name: string;
  category: 'gear' | 'food' | 'offering' | 'currency' | 'holy';
  icon: string;
  description: string;
  quantity: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedChapter?: ChapterId;
}

export interface HalachaTerm {
  id: string;
  term: string;
  hebrewTitle: string;
  shortDesc: string;
  fullDesc: string;
  sourceText?: string;
  category: 'מצוות העלייה' | 'קורבנות' | 'טהרה' | 'המקדש' | string;
  unlocked: boolean;
  icon: string;
}

export interface TaskState {
  id: string;
  title: string;
  completed: boolean;
  instruction: string;
}

export interface ChapterProgress {
  chapterId: ChapterId;
  completed: boolean;
  tasks: TaskState[];
}

export interface GameState {
  currentChapter: ChapterId;
  coins: number;
  stars: number;
  inventory: InventoryItem[];
  badges: Badge[];
  halachaCodex: HalachaTerm[];
  soundEnabled: boolean;
  selectedSacrifices: {
    olatReiyah: boolean;
    shalmeiChagigah: boolean;
    shalmeiSimcha: boolean;
  };
  hasSheep: boolean;
  sheepInspected: boolean;
  isPurified: boolean;
  woodInspectedCount: number;
  oilPressedAmount: number;
  instrumentsPlayed: string[];
  altarLogsCount: number;
  semichahDone: boolean;
  priestlyServiceDone: boolean;
  celebrationDone: boolean;
}
