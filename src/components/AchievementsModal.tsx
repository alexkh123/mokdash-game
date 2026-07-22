import React from 'react';
import { X, Award, Sparkles, Coins, Music, Droplet, Music2, CheckCircle2, Lock } from 'lucide-react';
import { Badge } from '../types';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  stars: number;
}

const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case 'Coins': return <Coins className="w-7 h-7 text-amber-400" />;
    case 'Music': return <Music className="w-7 h-7 text-sky-400" />;
    case 'Sparkles': return <Sparkles className="w-7 h-7 text-yellow-300" />;
    case 'Droplet': return <Droplet className="w-7 h-7 text-amber-300" />;
    case 'Music2': return <Music2 className="w-7 h-7 text-rose-400" />;
    case 'Award': return <Award className="w-7 h-7 text-amber-200 animate-pulse" />;
    default: return <Award className="w-7 h-7 text-amber-400" />;
  }
};

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose, badges, stars }) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FFF9E5] border-4 border-[#8B4513] rounded-3xl max-w-xl w-full shadow-2xl p-6 text-[#5D4037] relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#D2B48C] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FFD700] rounded-2xl border-2 border-[#8B4513] shadow-inner">
              <Award className="w-6 h-6 text-[#8B4513]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#8B4513] font-heading">עיטורי והישגי המסע</h2>
              <p className="text-xs text-[#8B4513]/80 font-bold">אותות כבוד על ביצוע מצוות העלייה לרגל</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-[#FF4444] hover:bg-red-600 rounded-xl text-white font-black border-2 border-[#8B4513] transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white border-2 border-[#D2B48C] rounded-2xl p-3 flex items-center gap-3 shadow-sm">
            <div className="p-2 bg-[#FFD700] rounded-xl border-2 border-[#8B4513]">
              <Award className="w-6 h-6 text-[#8B4513]" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B4513]/80 font-bold block">עיטורים שהושגו</span>
              <span className="text-lg font-black text-[#8B4513]">{unlockedCount} / {badges.length}</span>
            </div>
          </div>

          <div className="bg-white border-2 border-[#D2B48C] rounded-2xl p-3 flex items-center gap-3 shadow-sm">
            <div className="p-2 bg-[#FFD700] rounded-xl border-2 border-[#8B4513]">
              <Sparkles className="w-6 h-6 text-[#8B4513]" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B4513]/80 font-bold block">כוכבי חכמה</span>
              <span className="text-lg font-black text-[#8B4513]">{stars} כוכבים</span>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pl-1">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 relative ${
                badge.unlocked
                  ? 'bg-white border-[#8B4513] shadow-md'
                  : 'bg-gray-100 border-gray-300 opacity-50'
              }`}
            >
              <div className={`p-2.5 rounded-xl border-2 flex-shrink-0 ${
                badge.unlocked ? 'bg-[#FFD700] border-[#8B4513] shadow-sm' : 'bg-gray-200 border-gray-400'
              }`}>
                {badge.unlocked ? getBadgeIcon(badge.icon) : <Lock className="w-7 h-7 text-gray-500" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="font-bold text-sm text-[#8B4513] truncate">{badge.title}</h3>
                  {badge.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                </div>
                <p className="text-xs text-[#5D4037] font-medium leading-snug">{badge.description}</p>
                {badge.unlockedChapter && (
                  <span className="inline-block mt-2 text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-lg font-bold">
                    פרק {badge.unlockedChapter}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t-2 border-[#D2B48C] text-center">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#FF4444] hover:bg-red-600 text-white font-black text-lg rounded-2xl border-b-4 border-red-800 shadow-md transition-all active:translate-y-0.5"
          >
            סגור
          </button>
        </div>

      </div>
    </div>
  );
};
