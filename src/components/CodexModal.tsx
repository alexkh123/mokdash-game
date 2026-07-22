import React, { useState } from 'react';
import { X, BookOpen, Lock, Sparkles, CheckCircle2, Coins, Flame, Utensils, HeartHandshake, Music, Waves, Search, Trees, Droplet, Hand } from 'lucide-react';
import { HalachaTerm } from '../types';

interface CodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  codex: HalachaTerm[];
}

const getTermIcon = (iconName: string) => {
  switch (iconName) {
    case 'Coins': return <Coins className="w-5 h-5 text-amber-400" />;
    case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
    case 'Utensils': return <Utensils className="w-5 h-5 text-emerald-400" />;
    case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-400" />;
    case 'Music': return <Music className="w-5 h-5 text-sky-400" />;
    case 'Waves': return <Waves className="w-5 h-5 text-cyan-300" />;
    case 'Search': return <Search className="w-5 h-5 text-yellow-300" />;
    case 'Trees': return <Trees className="w-5 h-5 text-emerald-300" />;
    case 'Droplet': return <Droplet className="w-5 h-5 text-amber-300" />;
    case 'Hand': return <Hand className="w-5 h-5 text-amber-200" />;
    default: return <Sparkles className="w-5 h-5 text-yellow-400" />;
  }
};

export const CodexModal: React.FC<CodexModalProps> = ({ isOpen, onClose, codex }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [selectedTerm, setSelectedTerm] = useState<HalachaTerm | null>(null);

  if (!isOpen) return null;

  const categories = ['הכל', 'מצוות העלייה', 'קורבנות', 'טהרה', 'המקדש'];

  const filteredCodex = codex.filter((item) => {
    if (selectedCategory === 'הכל') return true;
    return item.category === selectedCategory;
  });

  const activeTerm = selectedTerm || filteredCodex.find(t => t.unlocked) || codex[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-[#FFF9E5] border-4 border-[#8B4513] rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#5D4037]">
        
        {/* Header */}
        <div className="bg-[#FFD700] border-b-4 border-[#8B4513] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-2xl border-2 border-[#8B4513] shadow-inner">
              <BookOpen className="w-6 h-6 text-[#8B4513]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#8B4513] font-heading">ספר ההלכות (קודקס)</h2>
              <p className="text-xs text-[#8B4513]/80 font-bold">אנציקלופדיית בית המקדש ומצוות העלייה לרגל</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-[#FF4444] hover:bg-red-600 rounded-xl text-white font-black border-2 border-[#8B4513] transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="bg-[#FDF6E3] border-b-2 border-[#D2B48C] p-2.5 px-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#8B4513] text-white shadow-md'
                  : 'bg-white text-[#8B4513] hover:bg-[#FFD700] border-2 border-[#D2B48C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Area: Split View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Terms List */}
          <div className="md:col-span-5 border-b md:border-b-0 md:border-l-2 border-[#D2B48C] overflow-y-auto p-3 space-y-2 max-h-56 md:max-h-none bg-[#FDF6E3]">
            {filteredCodex.map((item) => {
              const isSelected = activeTerm?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTerm(item)}
                  className={`w-full text-right p-3 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#FFD700] border-[#8B4513] shadow-md text-[#8B4513]'
                      : item.unlocked
                      ? 'bg-white hover:bg-[#FFF9E5] border-[#D2B48C]'
                      : 'bg-gray-100 border-gray-300 opacity-50'
                  }`}
                >
                  <div className={`p-2 rounded-xl border-2 flex-shrink-0 ${
                    item.unlocked ? 'bg-[#FDF6E3] border-[#8B4513]' : 'bg-gray-200 border-gray-400'
                  }`}>
                    {item.unlocked ? getTermIcon(item.icon) : <Lock className="w-5 h-5 text-gray-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-sm text-[#8B4513] truncate">{item.term}</span>
                      {item.unlocked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <span className="text-[10px] bg-gray-300 text-gray-700 px-1.5 py-0.5 rounded font-bold">נעול</span>
                      )}
                    </div>
                    <p className="text-xs text-[#5D4037] font-medium truncate">{item.hebrewTitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details View */}
          <div className="md:col-span-7 p-5 overflow-y-auto flex flex-col justify-between bg-[#FFF9E5]">
            {activeTerm ? (
              <div className="space-y-4">
                
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-[#8B4513] text-white px-3 py-1 rounded-xl font-bold shadow-sm">
                    קטגוריה: {activeTerm.category}
                  </span>
                  {activeTerm.unlocked ? (
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl border-2 border-emerald-500 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      מושג נלמד במשחק
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-xl border-2 border-gray-400 flex items-center gap-1 font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      ייפתח במהלך הפרקים
                    </span>
                  )}
                </div>

                {/* Concept Title */}
                <div>
                  <h3 className="text-2xl font-black text-[#8B4513] font-heading mb-1">
                    {activeTerm.term}
                  </h3>
                  <p className="text-sm font-bold text-[#8B4513]/80">{activeTerm.hebrewTitle}</p>
                </div>

                {/* Description */}
                <div className="bg-white border-2 border-[#D2B48C] rounded-2xl p-4 text-sm leading-snug text-[#5D4037] shadow-sm font-medium">
                  {activeTerm.fullDesc}
                </div>

                {/* Source Text / Verse */}
                {activeTerm.sourceText && (
                  <div className="bg-[#FFD700]/30 border-r-4 border-[#8B4513] rounded-xl p-3 text-xs text-[#8B4513] font-serif-hebrew italic leading-relaxed font-bold">
                    {activeTerm.sourceText}
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-12 text-[#8B4513]/60 font-bold">
                בחר מושג מהרשימה לצפייה בפרטים
              </div>
            )}

            <div className="mt-6 pt-3 border-t-2 border-[#D2B48C] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#FF4444] hover:bg-red-600 text-white font-black rounded-2xl border-b-4 border-red-800 shadow-md transition-all active:translate-y-0.5 text-sm"
              >
                סגור ספר
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
