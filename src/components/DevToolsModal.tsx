import React from 'react';
import { ChapterId } from '../types';
import { CHAPTERS_META } from '../data/chaptersData';
import { soundManager } from '../utils/audio';
import { Wrench, CheckCircle, Sparkles, Coins, FastForward, Award, BookOpen, RefreshCw, X, Play } from 'lucide-react';

interface DevToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  onCompleteCurrentChapter: () => void;
  onCompleteAllGame: () => void;
  onAddCoins: (amount: number) => void;
  onAddStars: (amount: number) => void;
  onUnlockAllCodex: () => void;
  onUnlockAllBadges: () => void;
  onResetGame: () => void;
}

export const DevToolsModal: React.FC<DevToolsModalProps> = ({
  isOpen,
  onClose,
  currentChapter,
  onSelectChapter,
  onCompleteCurrentChapter,
  onCompleteAllGame,
  onAddCoins,
  onAddStars,
  onUnlockAllCodex,
  onUnlockAllBadges,
  onResetGame,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#FFF9E5] border-4 border-[#8B4513] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-[#5D4037]">
        
        {/* Modal Header */}
        <div className="bg-[#FFD700] p-4 border-b-4 border-[#8B4513] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#8B4513] rounded-xl flex items-center justify-center text-white">
              <Wrench className="w-5 h-5 text-[#FFD700]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#8B4513] font-heading">
                סרגלי פיתוח ובדיקת המשחק (Dev Mode)
              </h3>
              <p className="text-xs text-[#8B4513]/80 font-bold">
                מעבר חופשי בין שלבים, דילוג על משימות ובדיקת רכיבים
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#8B4513] text-white flex items-center justify-center font-bold hover:bg-[#5D4037] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          
          {/* SECTION 1: CHAPTER JUMP BUTTONS */}
          <div>
            <h4 className="text-sm font-black text-[#8B4513] mb-2 flex items-center gap-1.5 border-b-2 border-[#D2B48C] pb-1">
              <FastForward className="w-4 h-4 text-amber-700" /> דילוג ומעבר ישיר בין הפרקים
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CHAPTERS_META.map((meta) => {
                const isCurrent = meta.id === currentChapter;
                return (
                  <button
                    key={meta.id}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectChapter(meta.id);
                    }}
                    className={`p-3 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#8B4513] text-white border-[#8B4513] font-black shadow-md scale-[1.02]'
                        : 'bg-[#FDF6E3] hover:bg-[#FFD700] text-[#8B4513] border-[#D2B48C]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        isCurrent ? 'bg-[#FFD700] text-[#8B4513]' : 'bg-[#8B4513] text-white'
                      }`}>
                        {meta.id}
                      </span>
                      <div>
                        <span className="text-xs font-bold block leading-tight">{meta.title}</span>
                        <span className={`text-[10px] block ${isCurrent ? 'text-amber-200' : 'text-[#8B4513]/70'}`}>
                          📍 {meta.locationName}
                        </span>
                      </div>
                    </div>

                    <Play className={`w-4 h-4 ${isCurrent ? 'text-[#FFD700]' : 'text-[#8B4513]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: TASK COMPLETION ACTIONS */}
          <div>
            <h4 className="text-sm font-black text-[#8B4513] mb-2 flex items-center gap-1.5 border-b-2 border-[#D2B48C] pb-1">
              <CheckCircle className="w-4 h-4 text-emerald-700" /> דילוג על משימות ופתיחת שלבים
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  onCompleteCurrentChapter();
                }}
                className="p-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl border-2 border-emerald-900 font-black text-xs transition-all flex items-center gap-2 shadow-sm active:translate-y-0.5"
              >
                <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                <span>השלם משימות פרק {currentChapter} ופתח את הבא</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playTrumpetFanfare();
                  onCompleteAllGame();
                }}
                className="p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl border-2 border-amber-900 font-black text-xs transition-all flex items-center gap-2 shadow-sm active:translate-y-0.5"
              >
                <Award className="w-4 h-4 text-[#FFD700]" />
                <span>השלם את כל 6 הפרקים (חגיגת ניצחון)</span>
              </button>
            </div>
          </div>

          {/* SECTION 3: RESOURCE MODIFIERS & CODEX/BADGES */}
          <div>
            <h4 className="text-sm font-black text-[#8B4513] mb-2 flex items-center gap-1.5 border-b-2 border-[#D2B48C] pb-1">
              <Sparkles className="w-4 h-4 text-amber-500" /> משאבים וספר ההלכות
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onAddCoins(100);
                }}
                className="p-2.5 bg-[#FDF6E3] hover:bg-[#FFD700] text-[#8B4513] border-2 border-[#8B4513] rounded-2xl font-bold text-xs transition-all flex flex-col items-center gap-1 text-center"
              >
                <Coins className="w-4 h-4 text-amber-600" />
                <span>+100 מטבעות</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playCoin();
                  onAddStars(100);
                }}
                className="p-2.5 bg-[#FDF6E3] hover:bg-[#FFD700] text-[#8B4513] border-2 border-[#8B4513] rounded-2xl font-bold text-xs transition-all flex flex-col items-center gap-1 text-center"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>+100 כוכבים</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playSuccess();
                  onUnlockAllCodex();
                }}
                className="p-2.5 bg-[#FDF6E3] hover:bg-[#FFD700] text-[#8B4513] border-2 border-[#8B4513] rounded-2xl font-bold text-xs transition-all flex flex-col items-center gap-1 text-center"
              >
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>פתח ספר הלכות</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playSuccess();
                  onUnlockAllBadges();
                }}
                className="p-2.5 bg-[#FDF6E3] hover:bg-[#FFD700] text-[#8B4513] border-2 border-[#8B4513] rounded-2xl font-bold text-xs transition-all flex flex-col items-center gap-1 text-center"
              >
                <Award className="w-4 h-4 text-amber-600" />
                <span>פתח כל העיטורים</span>
              </button>
            </div>
          </div>

          {/* RESET GAME */}
          <div className="pt-2 border-t-2 border-[#D2B48C]">
            <button
              onClick={() => {
                soundManager.playClick();
                onResetGame();
              }}
              className="w-full py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-900 border-2 border-rose-400 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-rose-700" />
              <span>אפס את כל התקדמות המשחק</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FDF6E3] p-3 border-t-2 border-[#D2B48C] text-center">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2 bg-[#8B4513] text-white rounded-xl font-black text-xs hover:bg-[#5D4037] transition-all"
          >
            סגור חלון פיתוח
          </button>
        </div>

      </div>
    </div>
  );
};
