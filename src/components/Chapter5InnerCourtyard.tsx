import React, { useState } from 'react';
import { Music2, CheckCircle2, ArrowLeft, Sparkles, Flame, Check, X } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { OptionalBonusQuiz, BonusQuestion } from './OptionalBonusQuiz';

const CHAPTER_5_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    id: 'c5_b1',
    source: 'משנה מידות פ"ג מ"ג',
    question: 'מה הייתה צורת הכבש שעל ידו עלו הכהנים לראש המזבח ובאיזה צד של המזבח הוא עמד?',
    options: [
      'כבש משופע בדרום המזבח, באורך 32 אמה וברוחב 16 אמה (ללא מדרגות)',
      'גרם מדרגות צר בצפון המזבח',
      'כבש מעגלי מסביב למזבח',
      'סולם זהב במזרח',
    ],
    correctOption: 0,
    explanation: 'הכבש עמד בדרום המזבח ללא מדרגות כדי שלא יפסע הכהן פסיעה גסה ("לא תעלה במדרגות על מזבחי").',
  },
  {
    id: 'c5_b2',
    source: 'משנה זבחים פ"ה',
    question: 'באיזה מקום בעזרה הייתה שחיטת קודשי קודשים (עולה, חטאת ואשם)?',
    options: [
      'בצפון המזבח - "שחיטתן בצפון וקבלת דמן בכלי שרת בצפון"',
      'בדרום המזבח',
      'בתוך ההיכל',
      'מחוץ לעזרה',
    ],
    correctOption: 0,
    explanation: 'התורה קבעה שקודשי קודשים נשחטים בצפון המזבח ("על ירך המזבח צפונה").',
  },
  {
    id: 'c5_b3',
    source: 'משנה מידות פ"ג מ"ד',
    question: 'לאן זרמו ניסוך המים ונסכי היין שנשפכו על ספלי המזבח?',
    options: [
      'לתוך שני נקבים קטנים ("שיתין") היורדים אל המחילות העמוקות מתחת לאדמה',
      'לתוך קערת זהב שנשמרה בלשכה',
      'לתוך נחל קדרון ישירות מעל החומה',
      'נשרפו כולם באש המזבח',
    ],
    correctOption: 0,
    explanation: 'בקרן דרומית מערבית היו שני ספלים נקובים שבהם ירדו הנסכים לשיתין העמוקים מתחת למזבח.',
  },
];

interface Chapter5InnerCourtyardProps {
  onAddCoins?: (amount: number) => void;
  onAddStars: (amount: number) => void;
  onCompleteTask: (taskId: string) => void;
  onNextChapter: () => void;
  completedTasks: string[];
}

export const Chapter5InnerCourtyard: React.FC<Chapter5InnerCourtyardProps> = ({
  onAddCoins = (_amount: number) => {},
  onAddStars,
  onCompleteTask,
  onNextChapter,
  completedTasks,
}) => {
  // Task 1: Levite Instruments State & Quiz
  const [playedHarp, setPlayedHarp] = useState<boolean>(false);
  const [playedLyre, setPlayedLyre] = useState<boolean>(false);
  const [playedCymbals, setPlayedCymbals] = useState<boolean>(false);
  const [stairsQuizAnswered, setStairsQuizAnswered] = useState<boolean>(false);
  const [selectedStairsOption, setSelectedStairsOption] = useState<number | null>(null);

  // Task 2: Altar Wood Assembly & Ma'aracha Quiz
  const [logsPlaced, setLogsPlaced] = useState<number>(0);
  const [altarQuizAnswered, setAltarQuizAnswered] = useState<boolean>(false);
  const [selectedAltarOption, setSelectedAltarOption] = useState<number | null>(null);

  const handlePlayInstrument = (type: 'harp' | 'lyre' | 'cymbals') => {
    if (type === 'harp') {
      soundManager.playHarpNote(523.25);
      setPlayedHarp(true);
    } else if (type === 'lyre') {
      soundManager.playHarpNote(659.25);
      setPlayedLyre(true);
    } else if (type === 'cymbals') {
      soundManager.playCymbal();
      setPlayedCymbals(true);
    }
    onAddStars(5);

    // Speak Levite psalm aloud
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const psalmText = 'הַלְלוּאֵל בְּקָדְשׁוֹ הַלְלוּהוּ בִּרְקִיעַ עֻזּוֹ! הַלְלוּהוּ בְּתֵקַע שׁוֹפָר הַלְלוּהוּ בְּנֵבֶל וְכִנּוֹר!';
      const utterance = new SpeechSynthesisUtterance(psalmText);
      utterance.lang = 'he-IL';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    const nextHarp = type === 'harp' ? true : playedHarp;
    const nextLyre = type === 'lyre' ? true : playedLyre;
    const nextCymbals = type === 'cymbals' ? true : playedCymbals;

    if (nextHarp && nextLyre && nextCymbals && stairsQuizAnswered) {
      soundManager.playSuccess();
      onCompleteTask('c5_orchestra');
    }
  };

  const handleAnswerStairsQuiz = (optIdx: number) => {
    setSelectedStairsOption(optIdx);
    setStairsQuizAnswered(true);

    if (optIdx === 0) {
      soundManager.playCoin();
      onAddStars(10);
      if (playedHarp && playedLyre && playedCymbals) {
        soundManager.playSuccess();
        onCompleteTask('c5_orchestra');
      }
    } else {
      soundManager.playClick();
    }
  };

  const handlePlaceLogOnAltar = () => {
    if (logsPlaced >= 4) return;
    soundManager.playFire();
    const nextCount = logsPlaced + 1;
    setLogsPlaced(nextCount);
    onAddStars(4);

    if (nextCount >= 4 && altarQuizAnswered) {
      soundManager.playSuccess();
      onCompleteTask('c5_altar_logs');
    }
  };

  const handleAnswerAltarQuiz = (optIdx: number) => {
    setSelectedAltarOption(optIdx);
    setAltarQuizAnswered(true);

    if (optIdx === 1) {
      soundManager.playCoin();
      onAddStars(10);
      if (logsPlaced >= 4) {
        soundManager.playSuccess();
        onCompleteTask('c5_altar_logs');
      }
    } else {
      soundManager.playClick();
    }
  };

  const canProgress = completedTasks.includes('c5_orchestra') && completedTasks.includes('c5_altar_logs');

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-[#FFD700] p-4 sm:p-5 rounded-3xl border-4 border-[#8B4513] shadow-md text-[#8B4513]">
        <h2 className="text-xl sm:text-2xl font-black font-heading mb-1">
          עזרת ישראל, דוכן הלוויים והמזבח הגדול
        </h2>
        <p className="text-xs sm:text-sm font-bold leading-relaxed">
          עולים במדרגות שער ניקנור! הלוויים מנגנים ומשוררים על 15 המדרגות, ועל גבי המזבח הגדול מסדרים את אש המערכה לפי דיני התורה.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* TASK 1: LEVITE ORCHESTRA & STAIRS QUIZ */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 1
              </span>
              {completedTasks.includes('c5_orchestra') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-[#8B4513]" /> תזמורת הלוויים ושער ניקנור
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              נגן בשלושת הכלים וענה על שאלת המשנה במסכת מידות:
            </p>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                disabled={playedHarp}
                onClick={() => handlePlayInstrument('harp')}
                className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 text-center ${
                  playedHarp
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-900'
                    : 'bg-[#FDF6E3] hover:bg-[#FFD700] border-[#8B4513] shadow-sm active:translate-y-0.5'
                }`}
              >
                <span className="text-2xl">🪕</span>
                <span className="text-xs font-bold text-[#8B4513]">נבל</span>
                {playedHarp ? <span className="text-[10px] text-emerald-700 font-bold">✓ נוגן</span> : <span className="text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-xl font-bold">נגן</span>}
              </button>

              <button
                disabled={playedLyre}
                onClick={() => handlePlayInstrument('lyre')}
                className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 text-center ${
                  playedLyre
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-900'
                    : 'bg-[#FDF6E3] hover:bg-[#FFD700] border-[#8B4513] shadow-sm active:translate-y-0.5'
                }`}
              >
                <span className="text-2xl">🎻</span>
                <span className="text-xs font-bold text-[#8B4513]">כינור</span>
                {playedLyre ? <span className="text-[10px] text-emerald-700 font-bold">✓ נוגן</span> : <span className="text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-xl font-bold">נגן</span>}
              </button>

              <button
                disabled={playedCymbals}
                onClick={() => handlePlayInstrument('cymbals')}
                className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 text-center ${
                  playedCymbals
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-900'
                    : 'bg-[#FDF6E3] hover:bg-[#FFD700] border-[#8B4513] shadow-sm active:translate-y-0.5'
                }`}
              >
                <span className="text-2xl">🥁</span>
                <span className="text-xs font-bold text-[#8B4513]">מצלתיים</span>
                {playedCymbals ? <span className="text-[10px] text-emerald-700 font-bold">✓ נוגן</span> : <span className="text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-xl font-bold">נגן</span>}
              </button>
            </div>

            {/* Stairs Quiz Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-2.5 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-[#8B4513] mb-1.5 leading-tight">
                ❓ כמה מדרגות היו עולות מעזרת נשים לעזרת ישראל, וכנגד מה הן?
              </p>

              <div className="space-y-1">
                {[
                  '15 מדרגות - כנגד 15 שירי המעלות שבספר תהילים',
                  '10 מדרגות - כנגד עשרת הדיברות',
                  '12 מדרגות - כנגד שני עשר שבטי ישראל',
                ].map((opt, optIdx) => {
                  const isSelected = selectedStairsOption === optIdx;
                  const isCorrectOpt = optIdx === 0;

                  return (
                    <button
                      key={optIdx}
                      disabled={stairsQuizAnswered}
                      onClick={() => handleAnswerStairsQuiz(optIdx)}
                      className={`w-full p-1.5 rounded-xl text-xs font-bold text-right transition-all border ${
                        stairsQuizAnswered
                          ? isCorrectOpt
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-900 font-black'
                            : isSelected
                            ? 'bg-rose-100 border-rose-600 text-rose-900'
                            : 'bg-white opacity-50 border-gray-300'
                          : 'bg-white border-[#D2B48C] hover:bg-[#FFD700] text-[#8B4513]'
                      }`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {stairsQuizAnswered && (
                <p className="text-[10px] text-[#5D4037] font-bold mt-1.5 pt-1 border-t border-[#D2B48C]">
                  💡 "חמש עשרה מעלות עולות מתוכה לתוך עזרת ישראל, כנגד חמש עשרה שיר המעלות שבתהילים, שעליהן הלוויים אומרים בשיר"!
                </p>
              )}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            סטטוס: {playedHarp && playedLyre && playedCymbals && stairsQuizAnswered ? 'הושלם בהצטיינות!' : 'נגן בכל הכלים וענה על השאלה'}
          </div>
        </div>

        {/* TASK 2: ALTAR WOOD & MA'ARACHA QUIZ */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 2
              </span>
              {completedTasks.includes('c5_altar_logs') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#8B4513]" /> אש המזבח והלכות המערכה
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-2">
              הנח 4 גזעי עץ וענה על שאלת המשנה במסכת יומא:
            </p>

            <button
              disabled={logsPlaced >= 4}
              onClick={handlePlaceLogOnAltar}
              className={`w-full py-2 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 mb-3 shadow-md ${
                logsPlaced >= 4
                  ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-600'
                  : 'bg-[#FFD700] hover:bg-yellow-300 text-[#8B4513] border-b-4 border-amber-800 active:translate-y-0.5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{logsPlaced >= 4 ? 'אש המערכה ערוכה ודולקת!' : `הנח גזע עץ על המזבח (${logsPlaced}/4)`}</span>
            </button>

            {/* Altar Quiz Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-2.5 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-[#8B4513] mb-1.5 leading-tight">
                ❓ כמה מערכות אש היו מסדרים על גבי המזבח הגדול בכל יום?
              </p>

              <div className="space-y-1">
                {[
                  'מערכה אחת בלבד לכל הקורבנות',
                  'שלוש מערכות אש: מערכה גדולה, מערכה לקטורת, ומערכה לקיום האש',
                  'שבע מערכות אש כנגד שבעת ימי השבוע',
                ].map((opt, optIdx) => {
                  const isSelected = selectedAltarOption === optIdx;
                  const isCorrectOpt = optIdx === 1;

                  return (
                    <button
                      key={optIdx}
                      disabled={altarQuizAnswered}
                      onClick={() => handleAnswerAltarQuiz(optIdx)}
                      className={`w-full p-1.5 rounded-xl text-xs font-bold text-right transition-all border ${
                        altarQuizAnswered
                          ? isCorrectOpt
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-900 font-black'
                            : isSelected
                            ? 'bg-rose-100 border-rose-600 text-rose-900'
                            : 'bg-white opacity-50 border-gray-300'
                          : 'bg-white border-[#D2B48C] hover:bg-[#FFD700] text-[#8B4513]'
                      }`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {altarQuizAnswered && (
                <p className="text-[10px] text-[#5D4037] font-bold mt-1.5 pt-1 border-t border-[#D2B48C]">
                  💡 לפי המשנה במסכת יומא פ"ד: "בשלוש מערכות היה המזבח נעשה בו ביום - מערכה גדולה, מערכה שנייה של קטורת, ומערכה שלישית של קיום האש"!
                </p>
              )}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            סטטוס: {logsPlaced >= 4 && altarQuizAnswered ? 'הושלם בהצטיינות!' : 'סידר גזעים וענה על השאלה'}
          </div>
        </div>

      </div>

      {/* OPTIONAL BONUS HALAKHIC QUIZ */}
      <OptionalBonusQuiz
        chapterTitle="פרק ה' - העזרה הפנימית והמזבח"
        questions={CHAPTER_5_BONUS_QUESTIONS}
        onAddCoins={onAddCoins}
        onAddStars={onAddStars}
      />

      {/* Chapter Navigation */}
      <div className="flex items-center justify-between bg-[#FFF9E5] border-4 border-[#D2B48C] p-4 rounded-3xl shadow-md text-[#8B4513]">
        <div>
          <span className="text-xs text-[#8B4513]/80 font-bold block">התקדמות בפרק ה'</span>
          <span className="text-sm font-black text-[#8B4513]">
            {completedTasks.filter((t) => t.startsWith('c5_')).length} / 2 משימות הושלמו
          </span>
        </div>

        <button
          disabled={!canProgress}
          onClick={() => {
            soundManager.playSuccess();
            onNextChapter();
          }}
          className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-all ${
            canProgress
              ? 'bg-[#FF4444] hover:bg-red-600 text-white border-b-4 border-red-800 active:translate-y-0.5 animate-bounce'
              : 'bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed'
          }`}
        >
          <span>עבור להקשר והשמחה!</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
