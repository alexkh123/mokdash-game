import React, { useState } from 'react';
import { Sparkles, Coins, Backpack, BookOpen, Award, Volume2, VolumeX, Wrench, Globe } from 'lucide-react';
import { ChapterId } from '../types';
import { getLocalizedChapters } from '../data/chaptersData';
import { soundManager } from '../utils/audio';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

interface HeaderProps {
  currentChapter: ChapterId;
  maxUnlockedChapter?: ChapterId;
  stars: number;
  coins: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenBackpack: () => void;
  onOpenCodex: () => void;
  onOpenBadges: () => void;
  onOpenDevTools: () => void;
  onSelectChapter: (id: ChapterId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapter,
  maxUnlockedChapter = 1,
  stars,
  coins,
  soundEnabled,
  onToggleSound,
  onOpenBackpack,
  onOpenCodex,
  onOpenBadges,
  onOpenDevTools,
  onSelectChapter,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const localizedChapters = getLocalizedChapters(language);

  return (
    <header className="sticky top-0 z-40 bg-[#FFD700] backdrop-blur-md border-b-4 border-[#8B4513] shadow-md px-3 py-2 md:px-6 md:py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Title & Main Info */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#8B4513] shadow-inner flex items-center justify-center text-xl md:text-2xl">
              ⭐
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#8B4513] tracking-tighter font-heading">
                {t('appTitle', 'המסע לבית המקדש')}
              </h1>
              <p className="text-xs text-[#8B4513]/80 font-bold hidden sm:block">
                {t('appSubTitle', 'חוויית עולים לרגל בבית המקדש השני')}
              </p>
            </div>
          </div>

          {/* Quick Stats on Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border-2 border-[#8B4513] text-[#8B4513] text-xs font-bold shadow-sm">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>{coins}</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border-2 border-[#8B4513] text-[#8B4513] text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{stars}</span>
            </div>
          </div>
        </div>

        {/* Chapter Stepper */}
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto max-w-full py-1 no-scrollbar">
          {localizedChapters.map((meta) => {
            const isActive = meta.id === currentChapter;
            const isPassed = meta.id < currentChapter;
            const isUnlocked = meta.id <= maxUnlockedChapter;
            const canSelect = import.meta.env.DEV || isUnlocked;

            return (
              <button
                key={meta.id}
                disabled={!canSelect}
                onClick={() => {
                  if (!canSelect) return;
                  soundManager.playClick();
                  onSelectChapter(meta.id);
                }}
                className={`relative px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#8B4513] text-white shadow-md border-2 border-[#8B4513] scale-105'
                    : isPassed
                    ? 'bg-[#FFF9E5] text-[#8B4513] hover:bg-[#FFD700] border-2 border-[#D2B48C]'
                    : canSelect
                    ? 'bg-[#FDF6E3] text-[#8B4513]/80 hover:bg-[#FFF9E5] border-2 border-[#D2B48C]'
                    : 'bg-[#FDF6E3]/50 text-[#8B4513]/30 border-2 border-[#D2B48C]/30 cursor-not-allowed opacity-60'
                }`}
                title={canSelect ? meta.title : `${meta.title} (${t('lockedChapter', 'נעול')})`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isActive ? 'bg-[#FFD700] text-[#8B4513]' : isPassed ? 'bg-[#8B4513] text-white' : canSelect ? 'bg-[#D2B48C] text-[#8B4513]' : 'bg-gray-300 text-gray-500'
                }`}>
                  {canSelect ? meta.id : '🔒'}
                </span>
                <span className="hidden lg:inline">{meta.subTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls & Stats */}
        <div className="flex items-center gap-2">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                soundManager.playClick();
                setShowLangMenu(!showLangMenu);
              }}
              className="flex items-center gap-1 bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] px-2.5 py-1.5 rounded-xl text-xs font-bold border-2 border-[#8B4513] shadow-sm transition-all active:translate-y-0.5"
              title={t('selectLanguage', 'בחר שפה')}
            >
              <Globe className="w-4 h-4 text-[#8B4513]" />
              <span>{currentLangObj.flag}</span>
              <span className="hidden md:inline font-bold uppercase">{currentLangObj.code}</span>
            </button>

            {showLangMenu && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-[#FFFDF5] border-2 border-[#8B4513] rounded-2xl shadow-xl overflow-hidden py-1 w-36 animate-fadeIn">
                <div className="px-3 py-1 text-[10px] font-black text-[#8B4513]/70 uppercase border-b border-[#D2B48C]">
                  {t('selectLanguage', 'בחר שפה')}
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      soundManager.playClick();
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-3 py-1.5 text-right flex items-center justify-between text-xs font-bold transition-all ${
                      language === lang.code
                        ? 'bg-[#8B4513] text-white'
                        : 'text-[#5D4037] hover:bg-amber-100'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-sm">{lang.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stats Desktop */}
          <div className="hidden md:flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border-2 border-[#8B4513] shadow-sm">
            <div className="flex items-center gap-1.5 text-[#8B4513] font-bold text-sm" title={t('coins', 'מטבעות')}>
              <Coins className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>{coins}</span>
            </div>
            <div className="w-0.5 h-4 bg-[#8B4513]/30" />
            <div className="flex items-center gap-1.5 text-[#8B4513] font-bold text-sm" title={t('stars', 'כוכבי חכמה')}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{stars}</span>
            </div>
          </div>

          {/* Ledger / Codex Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCodex();
            }}
            className="flex items-center gap-1.5 bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-xs font-bold border-2 border-[#8B4513] shadow-sm transition-all active:translate-y-0.5"
            title={t('codex', 'ספר ההלכות')}
          >
            <BookOpen className="w-4 h-4 text-[#8B4513]" />
            <span className="hidden sm:inline">{t('codex', 'ספר ההלכות')}</span>
          </button>

          {/* Backpack Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBackpack();
            }}
            className="flex items-center gap-1.5 bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-xs font-bold border-2 border-[#8B4513] shadow-sm transition-all active:translate-y-0.5"
            title={t('backpack', 'תרמיל מסע')}
          >
            <Backpack className="w-4 h-4 text-[#8B4513]" />
            <span className="hidden sm:inline">{t('backpack', 'תרמיל')}</span>
          </button>

          {/* Badges Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-xs font-bold border-2 border-[#8B4513] shadow-sm transition-all active:translate-y-0.5"
            title={t('badges', 'אותות ועיטורים')}
          >
            <Award className="w-4 h-4 text-[#8B4513]" />
            <span className="hidden sm:inline">{t('badges', 'עיטורים')}</span>
          </button>

          {/* Dev Mode Button */}
          {import.meta.env.DEV && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenDevTools();
              }}
              className="flex items-center gap-1.5 bg-[#8B4513] hover:bg-[#5D4037] text-white px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-xs font-bold border-2 border-[#8B4513] shadow-sm transition-all active:translate-y-0.5"
              title="מצב פיתוח ודילוג בין שלבים"
            >
              <Wrench className="w-4 h-4 text-[#FFD700]" />
              <span className="hidden sm:inline">פיתוח</span>
            </button>
          )}

          {/* Audio Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="p-2 bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] rounded-xl border-2 border-[#8B4513] transition-all active:translate-y-0.5 shadow-sm"
            title={soundEnabled ? 'השתק צלילים' : 'הפעל צלילים'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-600" />}
          </button>

        </div>

      </div>
    </header>
  );
};

