import React from 'react';
import { Sparkles, Coins, Backpack, BookOpen, Award, Volume2, VolumeX, Wrench } from 'lucide-react';
import { ChapterId } from '../types';
import { CHAPTERS_META } from '../data/chaptersData';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  currentChapter: ChapterId;
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
                המסע לבית המקדש
              </h1>
              <p className="text-xs text-[#8B4513]/80 font-bold hidden sm:block">
                חוויית עולים לרגל בבית המקדש השני
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
          {CHAPTERS_META.map((meta) => {
            const isActive = meta.id === currentChapter;
            const isPassed = meta.id < currentChapter;
            return (
              <button
                key={meta.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectChapter(meta.id);
                }}
                className={`relative px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#8B4513] text-white shadow-md border-2 border-[#8B4513] scale-105'
                    : isPassed
                    ? 'bg-[#FFF9E5] text-[#8B4513] hover:bg-[#FFD700] border-2 border-[#D2B48C]'
                    : 'bg-[#FDF6E3] text-[#8B4513]/50 hover:bg-[#FFF9E5] border-2 border-[#D2B48C]/50'
                }`}
                title={meta.title}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isActive ? 'bg-[#FFD700] text-[#8B4513]' : isPassed ? 'bg-[#8B4513] text-white' : 'bg-[#D2B48C] text-[#8B4513]'
                }`}>
                  {meta.id}
                </span>
                <span className="hidden lg:inline">{meta.subTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls & Stats */}
        <div className="flex items-center gap-2">
          
          {/* Stats Desktop */}
          <div className="hidden md:flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border-2 border-[#8B4513] shadow-sm">
            <div className="flex items-center gap-1.5 text-[#8B4513] font-bold text-sm" title="מטבעות מעשר שני">
              <Coins className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>{coins}</span>
            </div>
            <div className="w-0.5 h-4 bg-[#8B4513]/30" />
            <div className="flex items-center gap-1.5 text-[#8B4513] font-bold text-sm" title="כוכבי חכמה">
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
            title="ספר ההלכות"
          >
            <BookOpen className="w-4 h-4 text-[#8B4513]" />
            <span className="hidden sm:inline">ספר ההלכות</span>
          </button>

          {/* Backpack Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBackpack();
            }}
            className="flex items-center gap-1.5 bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-xs font-bold border-2 border-[#8B4513] shadow-sm transition-all active:translate-y-0.5"
            title="תרמיל מסע"
          >
            <Backpack className="w-4 h-4 text-[#8B4513]" />
            <span className="hidden sm:inline">תרמיל</span>
          </button>

          {/* Badges Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-xs font-bold border-2 border-[#8B4513] shadow-sm transition-all active:translate-y-0.5"
            title="אותות ועיטורים"
          >
            <Award className="w-4 h-4 text-[#8B4513]" />
            <span className="hidden sm:inline">עיטורים</span>
          </button>

          {/* Dev Mode Button */}
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
