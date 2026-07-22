import React, { useState } from 'react';
import { ChapterId } from '../types';
import { CHAPTERS_META } from '../data/chaptersData';
import { Sparkles, Coins, HelpCircle, X, ChevronRight, BookOpen, Award, MessageCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PriestCompanionProps {
  currentChapter: ChapterId;
  coins: number;
  stars: number;
  completedTasksCount: number;
}

interface ChapterWisdom {
  greeting: string;
  advice: string;
  halakhaFact: string;
}

const CHAPTER_WISDOM_MAP: Record<ChapterId, ChapterWisdom> = {
  1: {
    greeting: 'ברוך הבא! אני עזריה הכהן, ואני אלווה אותך בדרכך אל בית המקדש!',
    advice: 'התחל בקצירת העומר, חישוב פדיון מעשר שני ואריזת התרמיל בבגדי חג לבנים!',
    halakhaFact: 'הידעת? מעשר שני הוא פרי מעשי ידיך שמעלים לאכול בשמחה בירושלים כדי להרבות תורה!',
  },
  2: {
    greeting: 'שלומי טוב ואני שמח לראותך צועד בשבילי יהודה!',
    advice: 'בדרך לירושלים, הצטרף לשירת השירים של העולים לרגל, קים הכנסת אורחים ותצפית על ירושלים!',
    halakhaFact: 'שיירות העולים לרגל היו צועדות בליווי חליל ותופים, וכל העיירות שבדרך היו יוצאות לקבלן בלחם ומים!',
  },
  3: {
    greeting: 'הנה הגענו לשווקיה המפוארים של ירושלים עיר הקודש!',
    advice: 'פדה את מטבעות המעשר שני בשוק, פרוק את הסחורה וטבול במקווה הטהרה!',
    halakhaFact: 'ברגל, כל שווקי ירושלים והתושבים בה נחשבים טהורים לגמרי כדי שכל העם יוכל לאכול יחד!',
  },
  4: {
    greeting: 'ברוכים הבאים לשערי הר הבית והלשכות!',
    advice: 'תרום את מחצית השקל בלשכת השקלים, וסייע בבדיקת עצי המערכה ושמן הזית הטהור!',
    halakhaFact: 'מחצית השקל שכולם תורמים בשווה קונה את קורבנות הציבור לכל השנה כולה!',
  },
  5: {
    greeting: 'נכנסנו אל העזרה הפנימית! שמע את שירת הלויים על מעלות המקדש!',
    advice: 'הקשב לנגינת חצוצרות הלויים, וסייע בהעלאת גזירי העצים למזבח העולה!',
    halakhaFact: 'המזבח עמד בלב העזרה, ואש תמידית יקדה בו יום ולילה ללא הפסקה!',
  },
  6: {
    greeting: 'אשריך! הגעת אל שיא המסע - שמחת בית השואבה ועבודת הקורבנות!',
    advice: 'בצע את מצוות הסמיכה בשתי ידיים, צפה בעבודת הכהנים והשתתף בשמחת החג!',
    halakhaFact: 'אמרו חז"ל: מי שלא ראה שמחת בית השואבה - לא ראה שמחה מימיו!',
  },
};

export const PriestCompanion: React.FC<PriestCompanionProps> = ({
  currentChapter,
  coins,
  stars,
  completedTasksCount,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'advice' | 'coins_info' | 'rank'>('advice');

  const currentChapterMeta = CHAPTERS_META.find((m) => m.id === currentChapter)!;
  const wisdom = CHAPTER_WISDOM_MAP[currentChapter];

  // Calculate Title / Rank based on Stars
  const getRankTitle = (s: number) => {
    if (s >= 150) return { title: 'חכם העזרה והמקדש 👑', badge: '🥇 דרגה זהב' };
    if (s >= 100) return { title: 'עולה לרגל מובהק 🌟', badge: '🥈 דרגה כסף' };
    if (s >= 50) return { title: 'שואב מים בששון 📜', badge: '🥉 דרגה ארד' };
    return { title: 'עולה לרגל מתחיל 🎒', badge: '🌱 לומד צעיר' };
  };

  const currentRank = getRankTitle(stars);

  const handleToggle = () => {
    soundManager.playClick();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Avatar Button */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={handleToggle}
          className="group relative bg-[#8B4513] hover:bg-[#5D4037] text-white p-2.5 sm:p-3 rounded-full border-4 border-[#FFD700] shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          title="עזריה הכהן - המדריך ההלכתי שלך"
        >
          {/* Priest Icon Avatar */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFF9E5] border-2 border-[#FFD700] flex items-center justify-center text-2xl sm:text-3xl shadow-inner relative overflow-hidden">
            👳‍♂️
          </div>

          <div className="text-right hidden md:block pl-1">
            <span className="text-xs font-black text-[#FFD700] block leading-none">עזריה הכהן</span>
            <span className="text-[10px] text-amber-200 font-bold block leading-tight mt-0.5">
              מלווה ומדריך מקדש
            </span>
          </div>

          {/* Pulse Notification Ring if closed */}
          {!isOpen && (
            <span className="absolute -top-1 -left-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
          )}
        </button>
      </div>

      {/* Modal Dialog for Priest Companion */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFDF5] border-4 border-[#8B4513] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[#5D4037]">
            
            {/* Header Banner */}
            <div className="bg-[#8B4513] text-white p-4 border-b-4 border-[#FFD700] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9E5] border-2 border-[#FFD700] flex items-center justify-center text-3xl shadow-md">
                  👳‍♂️
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#FFD700] font-heading flex items-center gap-1.5">
                    עזריה הכהן
                    <span className="text-xs bg-[#FFD700] text-[#8B4513] px-2 py-0.5 rounded-full font-bold">
                      מדריך המסע
                    </span>
                  </h2>
                  <p className="text-xs text-amber-100 font-medium">
                    📍 מלווה אותך ב{currentChapterMeta.title} ({currentChapterMeta.locationName})
                  </p>
                </div>
              </div>

              <button
                onClick={handleToggle}
                className="p-1.5 bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] rounded-xl border border-[#8B4513] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside Priest Dialog */}
            <div className="flex border-b-2 border-[#D2B48C] bg-[#FFF9E5] px-3 pt-2 gap-2 text-xs font-bold">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('advice');
                }}
                className={`pb-2 px-3 border-b-4 transition-all flex items-center gap-1 ${
                  activeTab === 'advice'
                    ? 'border-[#8B4513] text-[#8B4513] font-black'
                    : 'border-transparent text-[#8B4513]/60 hover:text-[#8B4513]'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-amber-600" />
                <span>עצות והנחיות</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('coins_info');
                }}
                className={`pb-2 px-3 border-b-4 transition-all flex items-center gap-1 ${
                  activeTab === 'coins_info'
                    ? 'border-[#8B4513] text-[#8B4513] font-black'
                    : 'border-transparent text-[#8B4513]/60 hover:text-[#8B4513]'
                }`}
              >
                <Coins className="w-4 h-4 text-amber-600" />
                <span>למה משמשים המטבעות?</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('rank');
                }}
                className={`pb-2 px-3 border-b-4 transition-all flex items-center gap-1 ${
                  activeTab === 'rank'
                    ? 'border-[#8B4513] text-[#8B4513] font-black'
                    : 'border-transparent text-[#8B4513]/60 hover:text-[#8B4513]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>דרגת הלמידה</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              
              {/* TAB 1: ADVICE & DIALOG */}
              {activeTab === 'advice' && (
                <div className="space-y-4">
                  {/* Greeting Box */}
                  <div className="bg-[#FDF6E3] p-4 rounded-2xl border-2 border-[#8B4513] relative">
                    <p className="text-sm font-black text-[#8B4513] mb-2 leading-relaxed">
                      💬 "{wisdom.greeting}"
                    </p>
                    <p className="text-xs text-[#5D4037] font-bold leading-relaxed">
                      🎯 <span className="underline">מה עושים עכשיו בפרק זה?</span> {wisdom.advice}
                    </p>
                  </div>

                  {/* Halakhic Fact Card */}
                  <div className="bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-300">
                    <div className="flex items-center gap-1.5 font-black text-xs text-[#8B4513] mb-1">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <span>דבר הלכה מעזריה הכהן:</span>
                    </div>
                    <p className="text-xs text-[#5D4037] font-medium leading-relaxed">
                      {wisdom.halakhaFact}
                    </p>
                  </div>

                  <div className="bg-[#FFF9E5] p-3 rounded-xl border border-[#D2B48C] text-center text-xs font-bold text-[#8B4513]">
                    🌟 ענית על שאלות בונוס? הרווחת עוד מטבעות וכוכבי חכמה!
                  </div>
                </div>
              )}

              {/* TAB 2: EXPLAINING COINS & STARS */}
              {activeTab === 'coins_info' && (
                <div className="space-y-3">
                  <div className="bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-400">
                    <div className="flex items-center gap-2 text-sm font-black text-[#8B4513] mb-1">
                      <Coins className="w-5 h-5 text-amber-600" />
                      <span>מטבעות מעשר שני וחצאי שקלים ({coins} מטבעות ברשותך)</span>
                    </div>
                    <p className="text-xs text-[#5D4037] font-bold leading-relaxed">
                      מטבעות המשחק מדמים את המעות ההלכתיות שעמם העולים לרגל פודים פירות מעשר שני ומשלמים בלשכות המקדש!
                    </p>
                    <ul className="text-xs text-[#5D4037] mt-2 space-y-1 list-disc list-inside font-medium">
                      <li>משמשים לקניית פירות ומזון בשווקי ירושלים.</li>
                      <li>תרומת מחצית השקל בלשכת השקלים.</li>
                      <li>קניית שמן זית זך, עצי מערכה ונסכים.</li>
                    </ul>
                  </div>

                  <div className="bg-amber-100/60 p-3.5 rounded-2xl border-2 border-amber-500">
                    <div className="flex items-center gap-2 text-sm font-black text-[#8B4513] mb-1">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>כוכבי חכמה ולימוד ({stars} כוכבים ברשותך)</span>
                    </div>
                    <p className="text-xs text-[#5D4037] font-bold leading-relaxed">
                      כוכבי החכמה אינם רק תחרות - הם מייצגים את עומק הידע והבנת ההלכה שרכשת בדרך!
                    </p>
                    <p className="text-xs text-[#5D4037] mt-1 font-medium">
                      ככל שתפתור יותר משימות ושאלות בונוס הלכתיות, כך תעלה בדרגות החכמה במקדש!
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: RANK & MASTERY */}
              {activeTab === 'rank' && (
                <div className="space-y-3 text-center">
                  <div className="bg-[#FDF6E3] p-4 rounded-2xl border-2 border-[#8B4513]">
                    <span className="text-xs text-[#8B4513] font-bold block mb-1">הדרגה ההלכתית שלך:</span>
                    <h3 className="text-xl font-black text-[#8B4513] font-heading mb-1">
                      {currentRank.title}
                    </h3>
                    <span className="inline-block bg-[#8B4513] text-[#FFD700] text-xs font-black px-3 py-1 rounded-full border border-[#FFD700]">
                      {currentRank.badge}
                    </span>

                    <div className="mt-4 pt-3 border-t border-[#D2B48C] text-xs font-bold text-[#5D4037] space-y-1">
                      <p>✨ סך כוכבי חכמה שנצברו: <span className="font-black text-[#8B4513]">{stars}</span></p>
                      <p>🪙 סך מטבעות שנצברו: <span className="font-black text-[#8B4513]">{coins}</span></p>
                      <p>📜 משימות שהושלמו במקדש: <span className="font-black text-[#8B4513]">{completedTasksCount}</span></p>
                    </div>
                  </div>

                  <p className="text-xs text-[#8B4513]/80 font-bold">
                    "כל העוסק בתורת עולה כאילו הקריב עולה" - המשך ללמוד ולפתור את שאלות הבונוס!
                  </p>
                </div>
              )}

            </div>

            {/* Footer Close */}
            <div className="p-3 bg-[#FFF9E5] border-t-2 border-[#D2B48C] text-center">
              <button
                onClick={handleToggle}
                className="bg-[#8B4513] hover:bg-[#5D4037] text-white font-bold text-xs px-6 py-2 rounded-xl shadow-md transition-all active:translate-y-0.5"
              >
                תודה עזריה! נמשיך במסע 🎒
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
