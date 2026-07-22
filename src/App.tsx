import { useState } from 'react';
import { ChapterId, InventoryItem, Badge, HalachaTerm } from './types';
import { CHAPTERS_META, INITIAL_INVENTORY } from './data/chaptersData';
import { HALACHA_TERMS } from './data/halachaCodex';
import { soundManager } from './utils/audio';

import { Header } from './components/Header';
import { VisualCanvas } from './components/VisualCanvas';
import { BackpackModal } from './components/BackpackModal';
import { CodexModal } from './components/CodexModal';
import { AchievementsModal } from './components/AchievementsModal';
import { DevToolsModal } from './components/DevToolsModal';
import { PriestCompanion } from './components/PriestCompanion';

import { Chapter1Home } from './components/Chapter1Home';
import { Chapter2Road } from './components/Chapter2Road';
import { Chapter3Jerusalem } from './components/Chapter3Jerusalem';
import { Chapter4TempleMount } from './components/Chapter4TempleMount';
import { Chapter5InnerCourtyard } from './components/Chapter5InnerCourtyard';
import { Chapter6SacrificeJoy } from './components/Chapter6SacrificeJoy';

const ALL_GAME_TASKS = [
  'c1_harvest', 'c1_scroll', 'c1_pack',
  'c2_song', 'c2_hospitality', 'c2_overlook',
  'c3_market', 'c3_inspection', 'c3_mikveh',
  'c4_shekel', 'c4_wood', 'c4_oil',
  'c5_orchestra', 'c5_altar_logs',
  'c6_semichah', 'c6_priest_service', 'c6_celebration',
];

const CHAPTER_TASKS_MAP: Record<ChapterId, string[]> = {
  1: ['c1_harvest', 'c1_scroll', 'c1_pack'],
  2: ['c2_song', 'c2_hospitality', 'c2_overlook'],
  3: ['c3_market', 'c3_inspection', 'c3_mikveh'],
  4: ['c4_shekel', 'c4_wood', 'c4_oil'],
  5: ['c5_orchestra', 'c5_altar_logs'],
  6: ['c6_semichah', 'c6_priest_service', 'c6_celebration'],
};

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>(1);
  const [coins, setCoins] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const [inventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [badges, setBadges] = useState<Badge[]>(
    CHAPTERS_META.map((meta) => meta.badgeAwarded)
  );
  const [codex, setCodex] = useState<HalachaTerm[]>(HALACHA_TERMS);

  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);

  // Modals state
  const [isBackpackOpen, setIsBackpackOpen] = useState<boolean>(false);
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState<boolean>(false);

  // Audio Toggle
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundManager.setEnabled(nextVal);
  };

  // Add Coins
  const handleAddCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  // Deduct Coins
  const handleDeductCoins = (amount: number) => {
    setCoins((prev) => Math.max(0, prev - amount));
  };

  // Add Stars
  const handleAddStars = (amount: number) => {
    setStars((prev) => prev + amount);
  };

  // Mark Task Complete & Unlock related Codex terms / Badges
  const handleCompleteTask = (taskId: string) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks((prev) => [...prev, taskId]);

      // Unlock relevant Halacha terms
      setCodex((prev) =>
        prev.map((term) => {
          if (taskId === 'c1_harvest' && term.id === 'maaser_sheni') return { ...term, unlocked: true };
          if (taskId === 'c1_scroll' && ['olat_reiyah', 'shalmei_chagigah', 'shalmei_simcha'].includes(term.id)) return { ...term, unlocked: true };
          if (taskId === 'c2_song' && term.id === 'tefilat_haderech') return { ...term, unlocked: true };
          if (taskId === 'c3_inspection' && term.id === 'bedikat_mum') return { ...term, unlocked: true };
          if (taskId === 'c3_mikveh' && term.id === 'tahara_mikveh') return { ...term, unlocked: true };
          if (taskId === 'c4_wood' && term.id === 'lishkat_heetzim') return { ...term, unlocked: true };
          if (taskId === 'c4_oil' && term.id === 'lishkat_hashemanim') return { ...term, unlocked: true };
          if (taskId === 'c5_orchestra' && term.id === 'shirat_haleviim') return { ...term, unlocked: true };
          if (taskId === 'c6_semichah' && term.id === 'semichah') return { ...term, unlocked: true };
          if (taskId === 'c6_priest_service' && term.id === 'avodat_hakohanim') return { ...term, unlocked: true };
          return term;
        })
      );

      // Check if all tasks of current chapter are completed -> Unlock chapter badge!
      const currentMeta = CHAPTERS_META.find((m) => m.id === currentChapter);
      if (currentMeta) {
        const chapterTaskIds = currentMeta.tasks.map((t) => t.id);
        const allDone = chapterTaskIds.every((id) => id === taskId || completedTasks.includes(id));
        if (allDone) {
          setBadges((prev) =>
            prev.map((b) => (b.unlockedChapter === currentChapter ? { ...b, unlocked: true } : b))
          );
        }
      }
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < 6) {
      const nextCh = (currentChapter + 1) as ChapterId;
      setCurrentChapter(nextCh);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dev Tools Handlers
  const handleCompleteCurrentChapter = () => {
    const currentTaskIds = CHAPTER_TASKS_MAP[currentChapter] || [];
    setCompletedTasks((prev) => Array.from(new Set([...prev, ...currentTaskIds])));
    setBadges((prev) =>
      prev.map((b) => (b.unlockedChapter === currentChapter ? { ...b, unlocked: true } : b))
    );
    if (currentChapter < 6) {
      const nextCh = (currentChapter + 1) as ChapterId;
      setCurrentChapter(nextCh);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsCelebrating(true);
    }
  };

  const handleCompleteAllGame = () => {
    setCompletedTasks(ALL_GAME_TASKS);
    setBadges((prev) => prev.map((b) => ({ ...b, unlocked: true })));
    setCodex((prev) => prev.map((t) => ({ ...t, unlocked: true })));
    setIsCelebrating(true);
  };

  const handleUnlockAllCodex = () => {
    setCodex((prev) => prev.map((t) => ({ ...t, unlocked: true })));
  };

  const handleUnlockAllBadges = () => {
    setBadges((prev) => prev.map((b) => ({ ...b, unlocked: true })));
  };

  const handleResetGame = () => {
    setCurrentChapter(1);
    setCoins(0);
    setStars(0);
    setCompletedTasks([]);
    setIsCelebrating(false);
    setBadges(CHAPTERS_META.map((meta) => meta.badgeAwarded));
    setCodex(HALACHA_TERMS);
  };

  const currentMeta = CHAPTERS_META.find((m) => m.id === currentChapter)!;

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-[#5D4037] flex flex-col font-sans selection:bg-[#FFD700] selection:text-[#8B4513] border-2 sm:border-8 border-[#8B4513]">
      
      {/* Sticky Top Header */}
      <Header
        currentChapter={currentChapter}
        stars={stars}
        coins={coins}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenBackpack={() => setIsBackpackOpen(true)}
        onOpenCodex={() => setIsCodexOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenDevTools={() => setIsDevToolsOpen(true)}
        onSelectChapter={(id) => setCurrentChapter(id)}
      />

      {/* Main Game Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-6">
        
        {/* Chapter Header Banner & Location Visual */}
        <div className="relative rounded-3xl border-4 border-[#8B4513] shadow-xl p-6 sm:p-8 min-h-[220px] flex flex-col justify-end overflow-hidden bg-[#FFF9E5]">
          
          {/* Animated Background Canvas Art */}
          <VisualCanvas chapterId={currentChapter} isCelebrating={isCelebrating} />

          {/* Foreground Overlay Content */}
          <div className="relative z-10 bg-[#FFF9E5]/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-4 border-[#8B4513] max-w-2xl shadow-md">
            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#8B4513] text-white font-black px-3 py-1 rounded-xl">
                  {currentMeta.title}
                </span>
                <span className="text-xs text-[#8B4513] font-bold">📍 {currentMeta.locationName}</span>
              </div>
              
              {/* Quick Dev Mode Skip Button */}
              <button
                onClick={() => handleCompleteCurrentChapter()}
                className="text-[11px] bg-[#8B4513] hover:bg-[#5D4037] text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shadow-sm transition-all"
                title="השלם משימות פרק זה ודלג לפרק הבא"
              >
                <span>🛠️ השלם ודלג פרק</span>
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#8B4513] font-heading mb-1">
              {currentMeta.subTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5D4037] font-medium leading-relaxed">
              {currentMeta.description}
            </p>
          </div>

        </div>

        {/* Master Pilgrim Completion Certificate Banner */}
        {isCelebrating && (
          <div className="bg-[#FFD700] p-6 rounded-3xl text-[#8B4513] text-center border-4 border-[#8B4513] shadow-2xl animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl font-black font-heading mb-2">
              🏆 אשריך! השלמת את המסע לבית המקדש! 🏆
            </h3>
            <p className="text-sm font-bold max-w-xl mx-auto leading-relaxed">
              למדת את מצוות פדיון מעשר שני, שרת את שירי המעלות בדרך, היטהרת במקווה, עזרת בלשכות המקדש, ניגנת עם הלוויים וחגגת בשמחת החג בירושלים!
            </p>
          </div>
        )}

        {/* Chapter Specific Interactive Content */}
        {currentChapter === 1 && (
          <Chapter1Home
            coins={coins}
            onAddCoins={handleAddCoins}
            onAddStars={handleAddStars}
            onSelectSacrifices={() => {}}
            onCompleteTask={handleCompleteTask}
            onNextChapter={handleNextChapter}
            completedTasks={completedTasks}
          />
        )}

        {currentChapter === 2 && (
          <Chapter2Road
            onAddCoins={handleAddCoins}
            onAddStars={handleAddStars}
            onCompleteTask={handleCompleteTask}
            onNextChapter={handleNextChapter}
            completedTasks={completedTasks}
          />
        )}

        {currentChapter === 3 && (
          <Chapter3Jerusalem
            coins={coins}
            onAddCoins={handleAddCoins}
            onDeductCoins={handleDeductCoins}
            onAddStars={handleAddStars}
            onCompleteTask={handleCompleteTask}
            onNextChapter={handleNextChapter}
            completedTasks={completedTasks}
          />
        )}

        {currentChapter === 4 && (
          <Chapter4TempleMount
            onAddCoins={handleAddCoins}
            onAddStars={handleAddStars}
            onCompleteTask={handleCompleteTask}
            onNextChapter={handleNextChapter}
            completedTasks={completedTasks}
          />
        )}

        {currentChapter === 5 && (
          <Chapter5InnerCourtyard
            onAddCoins={handleAddCoins}
            onAddStars={handleAddStars}
            onCompleteTask={handleCompleteTask}
            onNextChapter={handleNextChapter}
            completedTasks={completedTasks}
          />
        )}

        {currentChapter === 6 && (
          <Chapter6SacrificeJoy
            onAddCoins={handleAddCoins}
            onAddStars={handleAddStars}
            onCompleteTask={handleCompleteTask}
            onTriggerCelebration={() => setIsCelebrating(true)}
            completedTasks={completedTasks}
          />
        )}

      </main>

      {/* Modals */}
      <BackpackModal
        isOpen={isBackpackOpen}
        onClose={() => setIsBackpackOpen(false)}
        items={inventory}
        coins={coins}
      />

      <CodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        codex={codex}
      />

      <AchievementsModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        badges={badges}
        stars={stars}
      />

      <DevToolsModal
        isOpen={isDevToolsOpen}
        onClose={() => setIsDevToolsOpen(false)}
        currentChapter={currentChapter}
        onSelectChapter={(id) => setCurrentChapter(id)}
        onCompleteCurrentChapter={handleCompleteCurrentChapter}
        onCompleteAllGame={handleCompleteAllGame}
        onAddCoins={handleAddCoins}
        onAddStars={handleAddStars}
        onUnlockAllCodex={handleUnlockAllCodex}
        onUnlockAllBadges={handleUnlockAllBadges}
        onResetGame={handleResetGame}
      />

      {/* Priest Companion Floating Guide */}
      <PriestCompanion
        currentChapter={currentChapter}
        coins={coins}
        stars={stars}
        completedTasksCount={completedTasks.length}
      />

      {/* Footer */}
      <footer className="mt-auto border-t-4 border-[#8B4513] bg-[#8B4513] p-3 text-center text-xs font-bold text-white tracking-wide">
        המסע לבית המקדש © משחק לימודי חווייתי לעלייה לרגל ולמקדש
      </footer>

    </div>
  );
}
