import React, { useState } from 'react';
import { Coins, CheckCircle2, ArrowLeft, Scroll, Sparkles, Calculator, HelpCircle, Check, X } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { OptionalBonusQuiz, BonusQuestion } from './OptionalBonusQuiz';

const CHAPTER_1_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    id: 'c1_b1',
    source: 'משנה מעשר שני פ"ד',
    question: 'מה מברכים בשעת פדיון מעשר שני בבית לפני העלייה לירושלים?',
    options: [
      'אשר קדשנו במצוותיו וצונו על פדיון מעשר שני',
      'אשר קדשנו במצוותיו וצונו על אכילת מעשר',
      'אשר קדשנו במצוותיו וצונו להביא ביכורים',
      'אין מברכים ברכה כלל',
    ],
    correctOption: 0,
    explanation: 'לפי הנפסק בהלכה מברכים ברכת המצווה: "על פדיון מעשר שני".',
  },
  {
    id: 'c1_b2',
    source: 'משנה חגיגה פ"א מ"ב',
    question: 'מהו שיעור המינימום (בכסף) לחיוב עולת ראייה ושלמי חגיגה לפי בית הלל?',
    options: [
      'עולת ראייה - מעה כסף; שלמי חגיגה - שתי כסף',
      'עולת ראייה - שתי כסף; שלמי חגיגה - מעה כסף',
      'שניהם דינר זהב אחד',
      'אין שיעור קצוב מן התורה',
    ],
    correctOption: 0,
    explanation: 'בית הלל אומרים: "הראייה מעה כסף, והחגיגה שתי כסף".',
  },
  {
    id: 'c1_b3',
    source: 'רמב"ם הלכות מעשר שני פ"ד',
    question: 'כיצד הקלו חכמים על העולה לרגל לשאת את כספי פדיון מעשר שני ממרחק?',
    options: [
      'התירו לפדות את כספי הכסף על גבי דינר זהב כדי להקל על המשקל בדרך',
      'התירו לבטל את המעשר בשעת הדחק',
      'התירו להשאיר את הפירות בבית עד בשנה הבאה',
      'התירו להמיר את המעשר בבגדים',
    ],
    correctOption: 0,
    explanation: 'הפודה מעשר שני מותר לציין את המעות על גבי דינר זהב כדי שמשא הדרך יהיה קל, ובירושלים יפרוט אותו חזרה למטבעות כסף.',
  },
];

interface Chapter1HomeProps {
  coins: number;
  onAddCoins: (amount: number) => void;
  onAddStars: (amount: number) => void;
  onSelectSacrifices: (choices: { olatReiyah: boolean; shalmeiChagigah: boolean; shalmeiSimcha: boolean }) => void;
  onCompleteTask: (taskId: string) => void;
  onNextChapter: () => void;
  completedTasks: string[];
}

export const Chapter1Home: React.FC<Chapter1HomeProps> = ({
  coins,
  onAddCoins,
  onAddStars,
  onSelectSacrifices,
  onCompleteTask,
  onNextChapter,
  completedTasks,
}) => {
  // Task 1: Ma'aser Sheni Calculation Challenge
  const [currentCalcIndex, setCurrentCalcIndex] = useState<number>(0);
  const [calcSolvedCount, setCalcSolvedCount] = useState<number>(0);
  const [selectedCalcAnswer, setSelectedCalcAnswer] = useState<number | null>(null);
  const [calcFeedback, setCalcFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const CALC_PROBLEMS = [
    {
      id: 1,
      fruitName: 'סל תאנים מתוקות',
      emoji: '🫐',
      baseValue: 40,
      chomesh: 10,
      correctTotal: 50,
      options: [40, 48, 50, 60],
      explanation: 'ערך הפירות 40 מטבעות. לפי ההלכה, הפודה מעשר שני מוסיף חומש (+25% מתחילה / +1/5 בסך הכל) = 40 + 10 = 50 מטבעות!',
    },
    {
      id: 2,
      fruitName: 'ארגז רימונים מובחר',
      emoji: '🍎',
      baseValue: 80,
      chomesh: 20,
      correctTotal: 100,
      options: [80, 90, 100, 120],
      explanation: 'ערך הפירות 80 מטבעות. תוספת חומש היא 20 מטבעות, ולכן סך הפדיון במטבעות כסף הוא 100 מטבעות!',
    },
    {
      id: 3,
      fruitName: 'כד שמן זית זך',
      emoji: '🫒',
      baseValue: 20,
      chomesh: 5,
      correctTotal: 25,
      options: [20, 24, 25, 30],
      explanation: 'ערך השמן 20 מטבעות. תוספת חומש (רבע מהמקור) היא 5 מטבעות, סך הכל 25 מטבעות כסף!',
    },
  ];

  // Task 2: Sacrificial Laws Quiz
  const [quizAnswered, setQuizAnswered] = useState<{ [key: number]: number }>({});
  const [quizScore, setQuizScore] = useState<number>(0);

  const SACRIFICE_QUIZ = [
    {
      id: 1,
      question: 'איזה קורבן מעולות החג נשרף כליל על גבי המזבח ואינו נאכל כלל?',
      options: ['עולת ראייה', 'שלמי חגיגה', 'שלמי שמחה', 'מעשר בהמה'],
      correctOption: 0,
      explanation: 'עולת ראייה מוקרבת כליל לה\' על גבי המזבח ואינה נאכלת לבעלים.',
    },
    {
      id: 2,
      question: 'מאיזה כסף מותר לקנות בהמות לשלמי שמחה בירושלים?',
      options: ['כספי מעשר שני שנפדו', 'כספי מחצית השקל', 'כספי ערכין בלבד', 'כל כסף שאינו קודש'],
      correctOption: 0,
      explanation: 'מותר ואף מצווה לקנות בהמות לשלמי שמחה מכספי מעשר שני שנפדו!',
    },
  ];

  // Task 3: Packing Backpack & Halakhic Prerequisites
  interface PackingItem {
    id: string;
    name: string;
    icon: string;
    packed: boolean;
    halakhaRule: string;
    question: string;
    options: string[];
    correctOption: number;
    explanation: string;
  }

  const [packedGear, setPackedGear] = useState<PackingItem[]>([
    {
      id: 'water',
      name: 'מימיית מים צוננים',
      icon: '🥤',
      packed: false,
      halakhaRule: 'חובה לשתות ולשמור על הבריאות בדרך העולה לירושלים',
      question: 'מדוע חשוב להצטייד במימיית מים צוננים למסע העלייה לרגל?',
      options: [
        'כי שמירת הגוף והבריאות בדרך לירושלים היא מצווה חשובה',
        'כי אסור לשתות מים ממעיינות בדרך',
        'כדי לצנן את הבהמות בלבד',
      ],
      correctOption: 0,
      explanation: 'התורה ציוותה אותנו "ונשמרתם מאוד לנפשותיכם" - שמירת בריאות הגוף בעלייה לרגל היא חלק מעבודת השם!',
    },
    {
      id: 'garments',
      name: 'בגדי חג לבנים וטהורים',
      icon: '👔',
      packed: false,
      halakhaRule: 'חובה לעלות לרגל בבגדים נקיים ולבנים לכבוד החג',
      question: 'מדוע העולים לרגל לובשים בגדי חג לבנים ונקיים?',
      options: [
        'כי בגדי חג לבנים מבטאים כבוד למקדש, טהרה ושמחת יום טוב',
        'כי אסור ללבוש בגדים צבעוניים כלל',
        'כי הכהנים דרשו זאת מכל אדם',
      ],
      correctOption: 0,
      explanation: 'נאמר "וכבסו שמלותם" - הופעה נקייה ומכובדת בבגדי חג לבנים היא מצווה לכבוד המקדש והשכינה.',
    },
    {
      id: 'sandals',
      name: 'סנדלי הליכה (ליציאה מהר הבית)',
      icon: '🥾',
      packed: false,
      halakhaRule: 'אסור להיכנס להר הבית במנעל עור, אך מותר ללכת בהם בדרך',
      question: 'מהי ההלכה לגבי נעילת מנעלי עור (סנדלים) בהר הבית?',
      options: [
        'מותר ללכת בהם בדרך, אך אסור להיכנס בהם להר הבית משום מורא מקדש',
        'חובה להיכנס להר הבית בסנדלי עור בלבד',
        'אסור לנעול נעליים בכלל אפילו בדרך לירושלים',
      ],
      correctOption: 0,
      explanation: 'נאמר "של נעליך מעל רגליך" - להר הבית נכנסים יחפים או במנעל שאינו של עור משום כבוד המקדש!',
    },
    {
      id: 'purse',
      name: 'צרור מטבעות מעשר שני',
      icon: '💰',
      packed: false,
      halakhaRule: 'פדיון פירות מעשר שני לקניית מזון ושמחה בירושלים',
      question: 'כיצד מקיימים את מצוות מעשר שני בירושלים?',
      options: [
        'קונים במעות מזון, פירות ושלמי שמחה לאכול בשמחה בירושלים',
        'נותנים את המטבעות לשומר בשער העיר',
        'שורפים את המטבעות בבית הדשן',
      ],
      correctOption: 0,
      explanation: 'מעשר שני נועד להיאכל בשמחה ובטהרה בירושלים כדי להרבות שמחה ולימוד תורה בעיר הקודש!',
    },
  ]);

  const [activePackQuestionId, setActivePackQuestionId] = useState<string | null>(null);
  const [packFeedback, setPackFeedback] = useState<{ id: string; isCorrect: boolean; text: string } | null>(null);

  // Handle Ma'aser Calculation
  const handleAnswerCalc = (chosenOption: number) => {
    setSelectedCalcAnswer(chosenOption);
    const problem = CALC_PROBLEMS[currentCalcIndex];

    if (chosenOption === problem.correctTotal) {
      soundManager.playCoin();
      setCalcFeedback({ isCorrect: true, text: `נכון מאד! ${problem.explanation}` });
      onAddCoins(15);
      onAddStars(10);

      const nextSolved = calcSolvedCount + 1;
      setCalcSolvedCount(nextSolved);

      if (nextSolved >= CALC_PROBLEMS.length) {
        soundManager.playSuccess();
        onCompleteTask('c1_harvest');
      }
    } else {
      soundManager.playClick();
      setCalcFeedback({ isCorrect: false, text: `לא מדויק. ${problem.explanation}` });
    }
  };

  const handleNextCalcProblem = () => {
    setCalcFeedback(null);
    setSelectedCalcAnswer(null);
    if (currentCalcIndex < CALC_PROBLEMS.length - 1) {
      setCurrentCalcIndex(currentCalcIndex + 1);
    }
  };

  // Handle Quiz Option Answer
  const handleSelectQuizOption = (qId: number, optIdx: number) => {
    if (quizAnswered[qId] !== undefined) return;

    const quiz = SACRIFICE_QUIZ.find((q) => q.id === qId)!;
    const isCorrect = optIdx === quiz.correctOption;

    if (isCorrect) {
      soundManager.playCoin();
      onAddStars(10);
      setQuizScore((prev) => prev + 1);
    } else {
      soundManager.playClick();
    }

    const nextAnswered = { ...quizAnswered, [qId]: optIdx };
    setQuizAnswered(nextAnswered);

    if (Object.keys(nextAnswered).length === SACRIFICE_QUIZ.length) {
      soundManager.playSuccess();
      onSelectSacrifices({ olatReiyah: true, shalmeiChagigah: true, shalmeiSimcha: true });
      onCompleteTask('c1_scroll');
    }
  };

  // Handle Packing Question Answer
  const handleAnswerPackQuestion = (itemId: string, optionIdx: number) => {
    const item = packedGear.find((g) => g.id === itemId);
    if (!item || item.packed) return;

    const isCorrect = optionIdx === item.correctOption;

    if (isCorrect) {
      soundManager.playCoin();
      onAddCoins(10);
      onAddStars(10);

      const nextGear = packedGear.map((g) => (g.id === itemId ? { ...g, packed: true } : g));
      setPackedGear(nextGear);
      setPackFeedback({ id: itemId, isCorrect: true, text: `נכון מאד! ${item.explanation}` });
      setActivePackQuestionId(null);

      if (nextGear.every((g) => g.packed)) {
        soundManager.playSuccess();
        onCompleteTask('c1_pack');
      }
    } else {
      soundManager.playClick();
      setPackFeedback({ id: itemId, isCorrect: false, text: 'תשובה לא מדויקת. קרא את דין הטהרה ונסה שנית!' });
    }
  };

  const currentProblem = CALC_PROBLEMS[currentCalcIndex];
  const canProgress =
    completedTasks.includes('c1_harvest') &&
    completedTasks.includes('c1_scroll') &&
    completedTasks.includes('c1_pack');

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-[#FFD700] p-4 sm:p-5 rounded-3xl border-4 border-[#8B4513] shadow-md text-[#8B4513]">
        <h2 className="text-xl sm:text-2xl font-black font-heading mb-1">
          הכנות בחצר הבית - אתגרי הלכה וחישוב
        </h2>
        <p className="text-xs sm:text-sm font-bold leading-relaxed">
          חג העלייה לרגל בפתח! עלינו לחשב בדיוק את פדיון מעשר שני והחומש, לענות על שאלות בהלכות קורבנות, ולארוז את הציוד לפי דרכי הטהרה.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* TASK 1: MA'ASER SHENI MATH CALCULATION */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 1
              </span>
              {completedTasks.includes('c1_harvest') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#8B4513]" /> אתגר חישוב פדיון מעשר שני (+ חומש)
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              לפי המשנה (מעשר שני פ"ד): הפודה מעשר שני של עצמו מוסיף חומש! פתור את החישוב:
            </p>

            {/* Math Question Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-3 rounded-2xl mb-3 text-center shadow-sm">
              <div className="text-4xl mb-1">{currentProblem.emoji}</div>
              <span className="text-xs font-black text-[#8B4513] block mb-1">
                {currentProblem.fruitName} (שווי מקור: {currentProblem.baseValue} מטבעות)
              </span>
              <p className="text-xs font-bold text-[#5D4037]">
                מהו סך הכל מטבעות הכסף לפדיון הפירות כולל חומש (+25%)?
              </p>
            </div>

            {/* Option Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {currentProblem.options.map((opt) => (
                <button
                  key={opt}
                  disabled={calcFeedback !== null && calcFeedback.isCorrect}
                  onClick={() => handleAnswerCalc(opt)}
                  className={`py-2.5 px-3 rounded-2xl border-2 font-black text-xs transition-all flex items-center justify-center gap-1 ${
                    selectedCalcAnswer === opt
                      ? calcFeedback?.isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-800'
                        : 'bg-rose-600 text-white border-rose-800'
                      : 'bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] border-[#8B4513] shadow-sm active:translate-y-0.5'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>{opt} מטבעות</span>
                </button>
              ))}
            </div>

            {/* Feedback Message */}
            {calcFeedback && (
              <div
                className={`p-3 rounded-2xl border-2 text-xs font-bold leading-relaxed mb-3 ${
                  calcFeedback.isCorrect
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-900'
                    : 'bg-rose-100 border-rose-600 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-black mb-1">
                  {calcFeedback.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  <span>{calcFeedback.isCorrect ? 'חישוב מדויק!' : 'חישוב שגוי'}</span>
                </div>
                <p className="text-[11px]">{calcFeedback.text}</p>

                {calcFeedback.isCorrect && currentCalcIndex < CALC_PROBLEMS.length - 1 && (
                  <button
                    onClick={handleNextCalcProblem}
                    className="mt-2 text-xs bg-[#8B4513] text-white px-3 py-1 rounded-xl font-black hover:bg-[#5D4037]"
                  >
                    עבור לחישוב הבא ➔
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2.5 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            חישובים שנפתרו: {calcSolvedCount} / {CALC_PROBLEMS.length} פירות נפדו
          </div>
        </div>

        {/* TASK 2: SACRIFICE LAWS HALAKHIC QUIZ */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 2
              </span>
              {completedTasks.includes('c1_scroll') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Scroll className="w-5 h-5 text-[#8B4513]" /> חידון הלכות קורבנות החג
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              ענה על השאלות ההלכתיות כדי לחתום על מגילת קורבנות העלייה לרגל:
            </p>

            <div className="space-y-3 mb-4">
              {SACRIFICE_QUIZ.map((q) => {
                const isAnswered = quizAnswered[q.id] !== undefined;
                const selectedOpt = quizAnswered[q.id];

                return (
                  <div key={q.id} className="bg-[#FDF6E3] border-2 border-[#8B4513] p-3 rounded-2xl shadow-sm">
                    <p className="text-xs font-bold text-[#8B4513] mb-2 leading-tight">
                      {q.id}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 gap-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        const isCorrectOpt = optIdx === q.correctOption;

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`p-2 rounded-xl text-xs font-bold text-right transition-all border ${
                              isAnswered
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

                    {isAnswered && (
                      <p className="text-[10px] text-[#5D4037] font-bold mt-2 pt-1 border-t border-[#D2B48C]">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2.5 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            ציון בחידון ההלכה: {quizScore} / {SACRIFICE_QUIZ.length} תשובות נכונות
          </div>
        </div>

        {/* TASK 3: PACKING BACKPACK & HALAKHIC PREREQUISITES */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 3
              </span>
              {completedTasks.includes('c1_pack') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1">אריזת תרמיל המסע וטהרה</h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              ענה על השאלה ההלכתית עבור כל חפץ כדי לארוז אותו בתרמיל המסע:
            </p>

            <div className="space-y-3 mb-4">
              {packedGear.map((item) => {
                const isExpanded = activePackQuestionId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border-2 transition-all ${
                      item.packed
                        ? 'bg-emerald-50/70 border-emerald-500'
                        : isExpanded
                        ? 'bg-[#FFD700]/20 border-[#8B4513] shadow-md'
                        : 'bg-[#FDF6E3] hover:bg-[#FFD700]/30 border-[#D2B48C]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 flex-1">
                        <span className="text-2xl mt-0.5">{item.icon}</span>
                        <div>
                          <span className="text-xs font-bold text-[#8B4513] block">{item.name}</span>
                          <span className="text-[10px] text-[#5D4037] font-medium block leading-tight mt-0.5">
                            📜 {item.halakhaRule}
                          </span>
                        </div>
                      </div>

                      {item.packed ? (
                        <span className="text-xs text-emerald-700 font-black flex items-center gap-1 shrink-0 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> ארוז!
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setActivePackQuestionId(isExpanded ? null : item.id);
                          }}
                          className="text-[10px] bg-[#8B4513] hover:bg-[#5D4037] text-white px-2.5 py-1 rounded-xl font-bold shrink-0 transition-all active:translate-y-0.5"
                        >
                          {isExpanded ? 'סגור שאלה' : 'ענה וארוז ❓'}
                        </button>
                      )}
                    </div>

                    {/* Question Box when expanded and not packed */}
                    {!item.packed && (isExpanded || packedGear.filter(g => !g.packed)[0]?.id === item.id) && (
                      <div className="mt-3 pt-3 border-t-2 border-[#D2B48C] bg-white/80 p-3 rounded-xl">
                        <p className="text-xs font-black text-[#8B4513] mb-2 leading-snug">
                          ❓ {item.question}
                        </p>

                        <div className="space-y-1.5">
                          {item.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerPackQuestion(item.id, optIdx)}
                              className="w-full p-2 rounded-xl text-xs font-bold text-right bg-[#FDF6E3] hover:bg-[#FFD700] border border-[#8B4513] text-[#8B4513] transition-all leading-tight"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {packFeedback && packFeedback.id === item.id && (
                          <div
                            className={`mt-2 p-2 rounded-xl text-[11px] font-bold ${
                              packFeedback.isCorrect
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-400'
                                : 'bg-rose-100 text-rose-900 border border-rose-400'
                            }`}
                          >
                            {packFeedback.text}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Packed Success Explanation */}
                    {item.packed && (
                      <p className="text-[10px] text-emerald-800 font-bold mt-2 pt-1 border-t border-emerald-200">
                        💡 {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2.5 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            חפצים שנארזו: {packedGear.filter((g) => g.packed).length} / 4 חפצים
          </div>
        </div>

      </div>

      {/* OPTIONAL BONUS HALAKHIC QUIZ */}
      <OptionalBonusQuiz
        chapterTitle="פרק א' - הכנות בבית"
        questions={CHAPTER_1_BONUS_QUESTIONS}
        onAddCoins={onAddCoins}
        onAddStars={onAddStars}
      />

      {/* Chapter Progress & Navigation */}
      <div className="flex items-center justify-between bg-[#FFF9E5] border-4 border-[#D2B48C] p-4 rounded-3xl shadow-md text-[#8B4513]">
        <div>
          <span className="text-xs text-[#8B4513]/80 font-bold block">התקדמות בפרק א'</span>
          <span className="text-sm font-black text-[#8B4513]">
            {completedTasks.filter((t) => t.startsWith('c1_')).length} / 3 משימות הושלמו
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
          <span>צא לדרך לירושלים!</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
