import React, { useState } from 'react';
import { Trees, Droplet, CheckCircle2, ArrowLeft, Sparkles, Coins, Calculator, Check, X } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { OptionalBonusQuiz, BonusQuestion } from './OptionalBonusQuiz';
import { useLanguage } from '../context/LanguageContext';
import { getChapterContent } from '../data/localizedChapterContent';
import { shuffleArray, shuffleQuestion } from '../utils/shuffle';

const CHAPTER_4_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    id: 'c4_b1',
    source: 'משנה שקלים פ"א מ"א',
    question: 'באיזה תאריך בלוח העברי היו משמיעין ומכריזין על נתינת מחצית השקל בכל שנה?',
    options: [
      'באחד באדר (ראש חודש אדר)',
      'באחד בניסן',
      'באחד בתשרי',
      'בט"ו בשבט',
    ],
    correctOption: 0,
    explanation: 'באחד באדר משמיעין על השקלים ועל הכלאיים כדי שיכינו העם את מחצית השקל בזמן לראש חודש ניסן.',
  },
  {
    id: 'c4_b2',
    source: 'משנה מידות פ"ב מ"ה',
    question: 'מה הייתה מטרת לשכת העצים בעזרת הנשים במקדש?',
    options: [
      'שם היו הכהנים בעלי מומים בודקים את עצי המערכה מתולעים',
      'שם היו מאחסנים את בגדי הכהונה',
      'שם היו מכינים את לחם הפנים',
      'שם היו שומרים את כלי הזהב',
    ],
    correctOption: 0,
    explanation: 'כל עץ שנמצאה בו תולעת היה פסול למזבח, ולכן כהנים בעלי מומים היו יושבים בלשכת העצים ובודקים עץ עץ.',
  },
  {
    id: 'c4_b3',
    source: 'משנה שקלים פ"ו מ"א',
    question: 'כמה שופרות (קופות בצורת שופר למעות תרומה ונדבה) היו במקדש?',
    options: [
      '13 שופרות לקורבנות נדבה, עצים, לבונה וזהב',
      '7 שופרות בלבד',
      '3 שופרות',
      'שופר אחד בלבד',
    ],
    correctOption: 0,
    explanation: 'שלוש עשרה שופרות היו במקדש ועל כל אחד מהם היה כתוב ייעוד המעות (כגון קטורת, עצים, זהב לכפורת).',
  },
];

interface Chapter4TempleMountProps {
  onAddCoins?: (amount: number) => void;
  onAddStars: (amount: number) => void;
  onCompleteTask: (taskId: string) => void;
  onNextChapter: () => void;
  completedTasks: string[];
}

export const Chapter4TempleMount: React.FC<Chapter4TempleMountProps> = ({
  onAddCoins = (_amount: number) => {},
  onAddStars,
  onCompleteTask,
  onNextChapter,
  completedTasks,
}) => {
  const { language, t } = useLanguage();
  const chapterContent = getChapterContent(language);
  // Task 1: Half-Shekel Tax Math Challenge
  const [shekelFamilyCount, setShekelFamilyCount] = useState<number>(8); // 8 males
  const [selectedShekelAnswer, setSelectedShekelAnswer] = useState<number | null>(null);
  const [shekelSolved, setShekelSolved] = useState<boolean>(false);
  const [shekelOptions] = useState(() => shuffleArray([2, 4, 8, 16]));

  // Task 2: Chamber of Wood Inspection
  const [logs, setLogs] = useState<{ id: string; clean: boolean; checked: boolean }[]>([
    { id: 'log1', clean: true, checked: false },
    { id: 'log2', clean: false, checked: false },
    { id: 'log3', clean: true, checked: false },
    { id: 'log4', clean: true, checked: false },
  ]);

  // Task 3: Chamber of Oil Press mini-game & Menorah Quiz
  const [oilDrops, setOilDrops] = useState<number>(0);
  const [oilQuizAnswered, setOilQuizAnswered] = useState<boolean>(false);
  const [selectedOilOption, setSelectedOilOption] = useState<number | null>(null);
  const [oilQuestion] = useState(() => shuffleQuestion({
    question: '❓ מהו "שמן זית זך כתית למאור" לפי הלכות המקדש?',
    options: [
      'הטיפה הראשונה שיוצאת מהזית הכתוש במכתשת (ללא שחיקת ריחיים)',
      'שמן שנסחט בריחיים אבן כבדים בתוספת מים',
      'שמן זית שבישלו אותו באש גלויה',
    ],
    correctOption: 0,
  }));

  const handleAnswerShekelCalc = (chosenOption: number) => {
    setSelectedShekelAnswer(chosenOption);
    if (chosenOption === 4) {
      // 8 males * 0.5 Shekel = 4 Shekels!
      soundManager.playCoin();
      setShekelSolved(true);
      onAddStars(10);
      onCompleteTask('c4_shekel');
    } else {
      soundManager.playClick();
    }
  };

  const handleCheckLog = (id: string, isClean: boolean) => {
    soundManager.playClick();
    setLogs((prev) =>
      prev.map((l) => (l.id === id ? { ...l, checked: true } : l))
    );
    onAddStars(3);

    const nextLogs = logs.map((l) => (l.id === id ? { ...l, checked: true } : l));
    if (nextLogs.every((l) => l.checked)) {
      soundManager.playSuccess();
      onCompleteTask('c4_wood');
    }
  };

  const handlePressOlives = () => {
    if (oilDrops >= 5) return;
    soundManager.playClick();
    const nextDrops = oilDrops + 1;
    setOilDrops(nextDrops);
    onAddStars(4);

    if (nextDrops >= 5 && oilQuizAnswered) {
      soundManager.playSuccess();
      onCompleteTask('c4_oil');
    }
  };

  const handleAnswerOilQuiz = (optIdx: number) => {
    if (selectedOilOption === oilQuestion.correctOption) return;

    setSelectedOilOption(optIdx);
    setOilQuizAnswered(true);

    if (optIdx === oilQuestion.correctOption) {
      soundManager.playCoin();
      onAddStars(10);
      if (oilDrops >= 5) {
        soundManager.playSuccess();
        onCompleteTask('c4_oil');
      }
    } else {
      soundManager.playClick();
    }
  };

  const canProgress =
    completedTasks.includes('c4_shekel') &&
    completedTasks.includes('c4_wood') &&
    completedTasks.includes('c4_oil');

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-[#FFD700] p-4 sm:p-5 rounded-3xl border-4 border-[#8B4513] shadow-md text-[#8B4513]">
        <h2 className="text-xl sm:text-2xl font-black font-heading mb-1">
          {chapterContent.c4.title}
        </h2>
        <p className="text-xs sm:text-sm font-bold leading-relaxed">
          {chapterContent.c4.subTitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* TASK 1: HALF-SHEKEL MATH CHALLENGE */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 1
              </span>
              {completedTasks.includes('c4_shekel') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#8B4513]" /> חישוב מס מחצית השקל
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              משלחת מגיעה מהגליל ובה 8 גברים החייבים במחצית השקל לקורבנות הציבור:
            </p>

            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-3 rounded-2xl mb-3 text-center shadow-sm">
              <span className="text-3xl block mb-1">🪙</span>
              <p className="text-xs font-bold text-[#8B4513] mb-1">
                8 נפשות × מחצית השקל (0.5 שקל לאדם)
              </p>
              <p className="text-xs font-black text-[#5D4037]">
                כמה שקלי הקודש שלמים יש למסור לשולחני בלשכת השקלים?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {shekelOptions.map((num) => (
                <button
                  key={num}
                  disabled={shekelSolved}
                  onClick={() => handleAnswerShekelCalc(num)}
                  className={`py-2 px-3 rounded-2xl border-2 font-black text-xs transition-all flex items-center justify-center gap-1 ${
                    selectedShekelAnswer === num
                      ? num === 4
                        ? 'bg-emerald-600 text-white border-emerald-800'
                        : 'bg-rose-600 text-white border-rose-800'
                      : 'bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] border-[#8B4513] shadow-sm active:translate-y-0.5'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>{num} שקלים</span>
                </button>
              ))}
            </div>

            {shekelSolved && (
              <div className="p-2.5 bg-emerald-100 border-2 border-emerald-600 rounded-2xl text-xs font-bold text-emerald-900 text-center animate-bounce">
                🎉 חישוב מדויק! 8 חצאי שקלים = 4 שקלים שלמים לקורבנות הציבור.
              </div>
            )}
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            לשכת השקלים: {shekelSolved ? 'המס שולם כהלכה!' : 'פתור את החישוב'}
          </div>
        </div>

        {/* TASK 2: CHAMBER OF WOOD */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 2
              </span>
              {completedTasks.includes('c4_wood') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Trees className="w-5 h-5 text-[#8B4513]" /> לשכת העצים - בדיקת תולעים
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              בדוק את 4 גזעי העץ. לפי המשנה במסכת מידות: עץ שנמצאה בו תולעת פסול למזבח!
            </p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {logs.map((log, idx) => (
                <button
                  key={log.id}
                  disabled={log.checked}
                  onClick={() => handleCheckLog(log.id, log.clean)}
                  className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                    log.checked
                      ? log.clean
                        ? 'bg-emerald-100 border-emerald-600 text-emerald-900'
                        : 'bg-rose-100 border-rose-600 text-rose-900'
                      : 'bg-[#FDF6E3] hover:bg-[#FFD700] border-[#8B4513] shadow-sm active:translate-y-0.5'
                  }`}
                >
                  <span className="text-3xl">🪵</span>
                  <span className="text-xs font-bold text-[#8B4513]">גזע עץ #{idx + 1}</span>
                  {log.checked ? (
                    <span className="text-[10px] font-bold">
                      {log.clean ? '✓ נקי ושר' : '✗ פסול (תולעת)'}
                    </span>
                  ) : (
                    <span className="text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-xl font-bold">
                      בדוק עץ
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2.5 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            נבדקו: {logs.filter((l) => l.checked).length} / 4 גזעי עץ
          </div>
        </div>

        {/* TASK 3: CHAMBER OF OILS & MENORAH LAWS QUIZ */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 3
              </span>
              {completedTasks.includes('c4_oil') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-[#8B4513]" /> לשכת השמנים והלכות המנורה
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-2">
              כבוש 5 טיפות שמן זית בבית הבד וענה על שאלת הטהרה:
            </p>

            <button
              disabled={oilDrops >= 5}
              onClick={handlePressOlives}
              className={`w-full py-2 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 mb-3 shadow-md ${
                oilDrops >= 5
                  ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-600'
                  : 'bg-[#FFD700] hover:bg-yellow-300 text-[#8B4513] border-b-4 border-amber-800 active:translate-y-0.5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{oilDrops >= 5 ? 'הופק שמן זית זך!' : `סחוט זיתים בבית הבד (${oilDrops}/5)`}</span>
            </button>

            {/* Oil Quiz Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-2.5 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-[#8B4513] mb-1.5 leading-tight">
                {oilQuestion.question}
              </p>

              <div className="space-y-1">
                {oilQuestion.options.map((opt, optIdx) => {
                  const isSelected = selectedOilOption === optIdx;
                  const isOilCorrect = selectedOilOption === oilQuestion.correctOption;

                  return (
                    <button
                      key={optIdx}
                      disabled={isOilCorrect}
                      onClick={() => handleAnswerOilQuiz(optIdx)}
                      className={`w-full p-1.5 rounded-xl text-xs font-bold text-right transition-all border ${
                        isOilCorrect
                          ? isSelected
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-900 font-black'
                            : 'bg-white opacity-50 border-gray-300'
                          : isSelected
                          ? 'bg-rose-100 border-rose-600 text-rose-900 font-bold'
                          : 'bg-white border-[#D2B48C] hover:bg-[#FFD700] text-[#8B4513]'
                      }`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {oilQuizAnswered && (
                selectedOilOption === oilQuestion.correctOption ? (
                  <p className="text-[10px] text-emerald-800 font-bold mt-1.5 pt-1 border-t border-[#D2B48C]">
                    💡 לפי המשנה במסכת מנחות: 'זך' - כותש בראש הזית ואינו טוחן בריחיים, כדי שלא יהיה בו שמרים!
                  </p>
                ) : (
                  <div className="mt-1.5 text-xs font-bold text-rose-800 bg-rose-100 p-2 rounded-xl border border-rose-300 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-700" />
                    <span>תשובה שגויה! נסה שנית.</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            סטטוס: {oilDrops >= 5 && oilQuizAnswered ? 'הושלם בהצטיינות!' : 'סחוט 5 טיפות וענה על השאלה'}
          </div>
        </div>

      </div>

      {/* OPTIONAL BONUS HALAKHIC QUIZ */}
      <OptionalBonusQuiz
        chapterTitle={chapterContent.c4.title}
        questions={chapterContent.c4.bonusQuestions.length > 0 ? chapterContent.c4.bonusQuestions.map((q, idx) => ({ ...q, id: `c4_b${idx+1}`, correctOption: CHAPTER_4_BONUS_QUESTIONS[idx]?.correctOption ?? 0 })) : CHAPTER_4_BONUS_QUESTIONS}
        onAddCoins={onAddCoins}
        onAddStars={onAddStars}
      />

      {/* Chapter Navigation */}
      <div className="flex items-center justify-between bg-[#FFF9E5] border-4 border-[#D2B48C] p-4 rounded-3xl shadow-md text-[#8B4513]">
        <div>
          <span className="text-xs text-[#8B4513]/80 font-bold block">{t('progressInChapter', 'התקדמות בפרק ד\'')}</span>
          <span className="text-sm font-black text-[#8B4513]">
            {completedTasks.filter((task) => task.startsWith('c4_')).length} / 3 {t('tasksCompleted', 'משימות הושלמו')}
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
          <span>{t('nextChapterBtn', 'עלה לעזרת ישראל!')}</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
