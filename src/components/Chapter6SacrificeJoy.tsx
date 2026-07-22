import React, { useState } from 'react';
import { Hand, Flame, Award, CheckCircle2, Sparkles, HeartHandshake, Check, X } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { OptionalBonusQuiz, BonusQuestion } from './OptionalBonusQuiz';
import { useLanguage } from '../context/LanguageContext';
import { getChapterContent } from '../data/localizedChapterContent';

const CHAPTER_6_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    id: 'c6_b1',
    source: 'משנה מנחות פ"ט מ"ח',
    question: 'באיזה כוח היו סומכים בשתי הידיים על ראש הקורבן ובאיזה מקום בעזרה?',
    options: [
      'סמיכה בכל כוחו של בעל הקורבן בשתי ידיו בעזרה במקום השחיטה',
      'סמיכה ביד אחת בלבד ברכות',
      'סמיכה מחוץ לשערי העזרה',
      'סמיכה באמצעות מקל בלבד',
    ],
    correctOption: 0,
    explanation: 'מצוות סמיכה היא בשתי הידיים ובכל כוחו של בעל הקורבן בתוך העזרה במקום הראוי לשחיטה.',
  },
  {
    id: 'c6_b2',
    source: 'משנה חגיגה פ"א מ"ו',
    question: 'אם אדם לא הקריב את קורבנות החג ביום הראשון של סוכות או פסח, עד מתי הוא יכול להשלים?',
    options: [
      'בכל שבעת ימי החג ובסוכות כולל יום שמיני עצרת ("מצוות תשלומים")',
      'ביום הראשון בלבד ואם לא הקריב הפסיד',
      'רק ביום האחרון של החג',
      'בכל ימות השנה בלא הגבלה',
    ],
    correctOption: 0,
    explanation: 'מי שלא חג ביום טוב הראשון של חג - חוגג את כל החג כולו ויום טוב האחרון של חג.',
  },
  {
    id: 'c6_b3',
    source: 'משנה סוטה פ"ז מ"ח',
    question: 'מהי מצוות "הקהל" המתקיימת במוצאי שנת השמיטה בחג הסוכות במקדש?',
    options: [
      'קריאת התורה על ידי המלך במקדש בפני כל העם: אנשים, נשים וטף',
      'ספירת כל בני ישראל בעזרה',
      'איסוף כל פירות המעשר לבית האוצר',
      'שחיטת קורבן פסח שני',
    ],
    correctOption: 0,
    explanation: 'במוצאי שנת השמיטה בחג הסוכות מקהילים את כל העם (אנשים, נשים וטף) והמלך קורא בספר דברים בעזרת הנשים.',
  },
];

interface Chapter6SacrificeJoyProps {
  onAddCoins?: (amount: number) => void;
  onAddStars: (amount: number) => void;
  onCompleteTask: (taskId: string) => void;
  onTriggerCelebration: () => void;
  completedTasks: string[];
}

export const Chapter6SacrificeJoy: React.FC<Chapter6SacrificeJoyProps> = ({
  onAddCoins = (_amount: number) => {},
  onAddStars,
  onCompleteTask,
  onTriggerCelebration,
  completedTasks,
}) => {
  const { language, t } = useLanguage();
  const chapterContent = getChapterContent(language);
  // Task 1: Semichah Hold Progress & Halakhic Quiz
  const [semichahProgress, setSemichahProgress] = useState<number>(0);
  const [semichahQuizAnswered, setSemichahQuizAnswered] = useState<boolean>(false);
  const [selectedSemichahOption, setSelectedSemichahOption] = useState<number | null>(null);

  // Task 2: Sacrificial Service Step Sequence
  const [priestSequence, setPriestSequence] = useState<string[]>([]);
  const CORRECT_SEQUENCE = ['שחיטה', 'קבלה', 'הולכה', 'זריקה', 'הקטרה'];
  const SEQUENCE_OPTIONS = ['זריקה', 'שחיטה', 'הקטרה', 'קבלה', 'הולכה'];

  // Task 3: Simchat HeChag Quiz
  const [simchahQuizAnswered, setSimchahQuizAnswered] = useState<boolean>(false);
  const [selectedSimchahOption, setSelectedSimchahOption] = useState<number | null>(null);
  const [celebrationStarted, setCelebrationStarted] = useState<boolean>(false);

  const handleHoldSemichah = () => {
    soundManager.playClick();
    const interval = setInterval(() => {
      setSemichahProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          soundManager.playSuccess();
          if (semichahQuizAnswered) {
            onCompleteTask('c6_semichah');
          }
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleAnswerSemichahQuiz = (optIdx: number) => {
    setSelectedSemichahOption(optIdx);
    setSemichahQuizAnswered(true);

    if (optIdx === 0) {
      soundManager.playCoin();
      onAddStars(10);
      if (semichahProgress >= 100) {
        soundManager.playSuccess();
        onCompleteTask('c6_semichah');
      }
    } else {
      soundManager.playClick();
    }
  };

  const handleAddStepToSequence = (stepName: string) => {
    if (priestSequence.includes(stepName)) return;
    soundManager.playClick();

    const nextSeq = [...priestSequence, stepName];
    setPriestSequence(nextSeq);

    if (nextSeq.length === CORRECT_SEQUENCE.length) {
      const isCorrect = nextSeq.every((val, index) => val === CORRECT_SEQUENCE[index]);
      if (isCorrect) {
        soundManager.playSuccess();
        onAddStars(15);
        onCompleteTask('c6_priest_service');
      } else {
        soundManager.playClick();
      }
    }
  };

  const handleResetSequence = () => {
    soundManager.playClick();
    setPriestSequence([]);
  };

  const handleAnswerSimchahQuiz = (optIdx: number) => {
    setSelectedSimchahOption(optIdx);
    setSimchahQuizAnswered(true);

    if (optIdx === 0) {
      soundManager.playCoin();
      onAddStars(10);
    } else {
      soundManager.playClick();
    }
  };

  const handleStartCelebration = () => {
    soundManager.playTrumpetFanfare();
    setCelebrationStarted(true);
    onTriggerCelebration();
    onAddStars(20);
    onCompleteTask('c6_celebration');
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-[#FFD700] p-4 sm:p-5 rounded-3xl border-4 border-[#8B4513] shadow-md text-[#8B4513]">
        <h2 className="text-xl sm:text-2xl font-black font-heading mb-1">
          {chapterContent.c6.title}
        </h2>
        <p className="text-xs sm:text-sm font-bold leading-relaxed">
          {chapterContent.c6.subTitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* TASK 1: SEMICHAH LAWS & QUIZ */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 1
              </span>
              {completedTasks.includes('c6_semichah') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Hand className="w-5 h-5 text-[#8B4513]" /> מצוות סמיכה והלכותיה
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-2">
              סמוך ידיך על ראש הבהמה וענה על שאלת המשנה במנחות:
            </p>

            <button
              disabled={semichahProgress >= 100}
              onClick={handleHoldSemichah}
              className={`w-full py-2 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 mb-3 shadow-md ${
                semichahProgress >= 100
                  ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-600'
                  : 'bg-[#FFD700] hover:bg-yellow-300 text-[#8B4513] border-b-4 border-amber-800 active:translate-y-0.5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{semichahProgress >= 100 ? 'סמיכה נשלמה!' : `סמוך ידיך בכל כוחך (${semichahProgress}%)`}</span>
            </button>

            {/* Semichah Quiz Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-2.5 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-[#8B4513] mb-1.5 leading-tight">
                ❓ כיצד מתקיימת מצוות סמיכה על הקורבן כהלכתה?
              </p>

              <div className="space-y-1">
                {[
                  'בשתי הידיים בכל כוחו על ראש הבהמה בעזרה',
                  'ביד אחת בלבד וללא הנחת משקל',
                  'על גבי גב הבהמה ולא על הראש',
                ].map((opt, optIdx) => {
                  const isSelected = selectedSemichahOption === optIdx;
                  const isCorrectOpt = optIdx === 0;

                  return (
                    <button
                      key={optIdx}
                      disabled={semichahQuizAnswered}
                      onClick={() => handleAnswerSemichahQuiz(optIdx)}
                      className={`w-full p-1.5 rounded-xl text-xs font-bold text-right transition-all border ${
                        semichahQuizAnswered
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

              {semichahQuizAnswered && (
                <p className="text-[10px] text-[#5D4037] font-bold mt-1.5 pt-1 border-t border-[#D2B48C]">
                  💡 לפי המשנה במסכת מנחות: "מניח שתי ידיו בין שתי קרניו... וסומך בכל כוחו"!
                </p>
              )}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            סטטוס: {semichahProgress >= 100 && semichahQuizAnswered ? 'הושלם בהצטיינות!' : 'סמוך ידיים וענה על השאלה'}
          </div>
        </div>

        {/* TASK 2: SACRIFICIAL SERVICE ORDER CHALLENGE */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 2
              </span>
              {completedTasks.includes('c6_priest_service') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#8B4513]" /> סדר עבודת הקורבן (זבחים)
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-2">
              סדר את 5 שלבי העבודה בסדר ההלכתי המדויק לפי המשנה:
            </p>

            {/* Selected Sequence View */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-2.5 rounded-2xl mb-3 text-center">
              <span className="text-[11px] font-bold text-[#8B4513] block mb-1">הסדר שנבחר:</span>
              <div className="flex flex-wrap justify-center gap-1 min-h-[32px]">
                {priestSequence.length === 0 ? (
                  <span className="text-xs text-gray-400 font-bold">לחץ על השלבים למטה לפי הסדר</span>
                ) : (
                  priestSequence.map((step, idx) => (
                    <span key={idx} className="text-xs bg-[#FFD700] text-[#8B4513] px-2 py-0.5 rounded-xl font-black border border-[#8B4513]">
                      {idx + 1}. {step}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Option Buttons */}
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {SEQUENCE_OPTIONS.map((step) => {
                const isSelected = priestSequence.includes(step);
                return (
                  <button
                    key={step}
                    disabled={isSelected || completedTasks.includes('c6_priest_service')}
                    onClick={() => handleAddStepToSequence(step)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-amber-100 text-amber-800 border-amber-400 opacity-50'
                        : 'bg-white border-[#8B4513] hover:bg-[#FFD700] text-[#8B4513]'
                    }`}
                  >
                    + {step}
                  </button>
                );
              })}
            </div>

            {priestSequence.length > 0 && !completedTasks.includes('c6_priest_service') && (
              <button
                onClick={handleResetSequence}
                className="w-full py-1.5 bg-rose-100 text-rose-900 border border-rose-400 rounded-xl text-xs font-bold"
              >
                נקה ובחר מחדש
              </button>
            )}
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            סדר העבודה: {completedTasks.includes('c6_priest_service') ? 'שחיטה ➔ קבלה ➔ הולכה ➔ זריקה ➔ הקטרה ✓' : 'סדר את 5 השלבים כהלכה'}
          </div>
        </div>

        {/* TASK 3: HOLIDAY CELEBRATION & TRIVIA */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 3
              </span>
              {completedTasks.includes('c6_celebration') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-red-600" /> שמחת החג וניסוך המים
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-2">
              "מי שלא ראה שמחת בית השואבה - לא ראה שמחה מימיו"!
            </p>

            {/* Simchah Quiz Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-2.5 rounded-2xl shadow-sm mb-3">
              <p className="text-xs font-bold text-[#8B4513] mb-1.5 leading-tight">
                ❓ באיזה אירוע מיוחד במקדש היו החסידים ואנשי מעשה מרקדים בלפידי אש?
              </p>

              <div className="space-y-1">
                {[
                  'שמחת בית השואבה בחג הסוכות',
                  'שמחת הביכורים בחג השבועות',
                  'שמחת הקרבת הפסח בחג המצות',
                ].map((opt, optIdx) => {
                  const isSelected = selectedSimchahOption === optIdx;
                  const isCorrectOpt = optIdx === 0;

                  return (
                    <button
                      key={optIdx}
                      disabled={simchahQuizAnswered}
                      onClick={() => handleAnswerSimchahQuiz(optIdx)}
                      className={`w-full p-1.5 rounded-xl text-xs font-bold text-right transition-all border ${
                        simchahQuizAnswered
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
            </div>
          </div>

          <button
            disabled={celebrationStarted || !simchahQuizAnswered}
            onClick={handleStartCelebration}
            className={`w-full py-2.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
              celebrationStarted
                ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-600'
                : simchahQuizAnswered
                ? 'bg-[#FF4444] hover:bg-red-600 text-white border-b-4 border-red-800 active:translate-y-0.5 animate-bounce'
                : 'bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{celebrationStarted ? 'החגיגה בעיצומה!' : 'פתח בשמחת החג בירושלים! (+20 כוכבים)'}</span>
          </button>
        </div>

      </div>

      {/* OPTIONAL BONUS HALAKHIC QUIZ */}
      <OptionalBonusQuiz
        chapterTitle={chapterContent.c6.title}
        questions={chapterContent.c6.bonusQuestions.length > 0 ? chapterContent.c6.bonusQuestions.map((q, idx) => ({ ...q, id: `c6_b${idx+1}`, correctOption: CHAPTER_6_BONUS_QUESTIONS[idx]?.correctOption ?? 0 })) : CHAPTER_6_BONUS_QUESTIONS}
        onAddCoins={onAddCoins}
        onAddStars={onAddStars}
      />

    </div>
  );
};
