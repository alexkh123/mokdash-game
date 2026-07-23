import React, { useState, useMemo } from 'react';
import { Coins, CheckCircle2, ArrowLeft, Scroll, Sparkles, Calculator, HelpCircle, Check, X } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { OptionalBonusQuiz, BonusQuestion } from './OptionalBonusQuiz';
import { useLanguage } from '../context/LanguageContext';
import { getChapterContent } from '../data/localizedChapterContent';
import { getChapter1Questions } from '../data/localizedQuestions';
import { shuffleQuestion } from '../utils/shuffle';

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
  const { language, t } = useLanguage();
  const chapterContent = getChapterContent(language);
  const localizedQ = useMemo(() => getChapter1Questions(language), [language]);

  // Task 1: Ma'aser Sheni Calculation Challenge
  const [currentCalcIndex, setCurrentCalcIndex] = useState<number>(0);
  const [calcSolvedCount, setCalcSolvedCount] = useState<number>(0);
  const [selectedCalcAnswer, setSelectedCalcAnswer] = useState<number | null>(null);
  const [calcFeedback, setCalcFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const CALC_PROBLEMS = localizedQ.calcProblems;

  // Task 2: Sacrificial Laws Quiz
  const [quizAnswered, setQuizAnswered] = useState<{ [key: number]: number }>({});
  const [quizScore, setQuizScore] = useState<number>(0);

  const SACRIFICE_QUIZ = useMemo(() => {
    return localizedQ.sacrificeQuiz.map((q) => shuffleQuestion(q));
  }, [localizedQ.sacrificeQuiz]);

  // Task 3: Packing Backpack & Halakhic Prerequisites
  const [packedGearState, setPackedGearState] = useState<{ [id: string]: boolean }>({});
  const packedGear = useMemo(() => {
    return localizedQ.packedGear.map((g) => ({
      ...g,
      packed: packedGearState[g.id] ?? false,
    }));
  }, [localizedQ.packedGear, packedGearState]);

  const [activePackQuestionId, setActivePackQuestionId] = useState<string | null>(null);
  const [packFeedback, setPackFeedback] = useState<{ id: string; isCorrect: boolean; text: string } | null>(null);

  // Handle Ma'aser Calculation
  const handleAnswerCalc = (chosenOption: number) => {
    setSelectedCalcAnswer(chosenOption);
    const problem = CALC_PROBLEMS[currentCalcIndex];

    if (chosenOption === problem.correctTotal) {
      soundManager.playCoin();
      setCalcFeedback({ isCorrect: true, text: `${t('calcCorrect', 'חישוב מדויק!')} ${problem.explanation}` });
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
      setCalcFeedback({ isCorrect: false, text: t('calcIncorrect', 'תשובה שגויה! נסה שוב.') });
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
    const quiz = SACRIFICE_QUIZ.find((q) => q.id === qId)!;
    if (quizAnswered[qId] === quiz.correctOption) return;

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

    // Check if all answered correctly
    const allCorrect = SACRIFICE_QUIZ.every((q) => nextAnswered[q.id] === q.correctOption);
    if (allCorrect) {
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

      setPackedGearState((prev) => ({ ...prev, [itemId]: true }));
      setPackFeedback({ id: itemId, isCorrect: true, text: `${t('correct', 'נכון מאד!')} ${item.explanation}` });
      setActivePackQuestionId(null);

      const nextGear = packedGear.map((g) => (g.id === itemId ? { ...g, packed: true } : g));
      if (nextGear.every((g) => g.packed)) {
        soundManager.playSuccess();
        onCompleteTask('c1_pack');
      }
    } else {
      soundManager.playClick();
      setPackFeedback({ id: itemId, isCorrect: false, text: t('packIncorrect', 'תשובה לא מדויקת. קרא את דין הטהרה ונסה שנית!') });
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
      <div className="bg-[#FFD700] p-5 sm:p-6 rounded-3xl border-4 border-[#8B4513] shadow-[0_6px_0_#8B4513] text-[#8B4513]">
        <h2 className="text-2xl sm:text-3xl font-black font-heading mb-1.5">
          {chapterContent.c1.title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-bold leading-relaxed">
          {chapterContent.c1.subTitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TASK 1: MA'ASER SHENI MATH CALCULATION */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_#D2B48C] flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#D2B48C] pb-3">
              <span className="text-sm font-black bg-[#8B4513] text-white px-3.5 py-1 rounded-2xl shadow-sm">
                {t('mission', 'משימה')} 1
              </span>
              {completedTasks.includes('c1_harvest') && (
                <span className="text-sm text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-2xl border border-emerald-400">
                  <CheckCircle2 className="w-5 h-5" /> {t('taskCompleted', 'הושלם!')}
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-[#8B4513] mb-2 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#8B4513]" /> {t('c1MathTitle', 'אתגר חישוב פדיון מעשר שני (+ חומש)')}
            </h3>

            <p className="text-sm sm:text-base text-[#5D4037] font-semibold mb-4 leading-relaxed">
              {t('c1MathDesc', 'לפי המשנה (מעשר שני פ"ד): הפודה מעשר שני של עצמו מוסיף חומש! פתור את החישוב:')}
            </p>

            {/* Math Question Box */}
            <div className="bg-[#FDF6E3] border-3 border-[#8B4513] p-4 rounded-3xl mb-4 text-center shadow-md">
              <div className="text-5xl mb-2">{currentProblem.emoji}</div>
              <span className="text-sm sm:text-base font-black text-[#8B4513] block mb-1">
                {currentProblem.fruitName} ({currentProblem.baseValue} {t('coins', 'מטבעות')})
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-[#5D4037]">
                {t('c1MathPrompt', 'מהו סך הכל מטבעות הכסף לפדיון הפירות כולל חומש (+25%)?')}
              </p>
            </div>

            {/* Option Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {currentProblem.options.map((opt) => (
                <button
                  key={opt}
                  disabled={calcFeedback !== null && calcFeedback.isCorrect}
                  onClick={() => handleAnswerCalc(opt)}
                  className={`py-3 px-3 rounded-2xl border-3 font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-1.5 ${
                    selectedCalcAnswer === opt
                      ? calcFeedback?.isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-800 shadow-[0_3px_0_#065F46]'
                        : 'bg-rose-600 text-white border-rose-800 shadow-[0_3px_0_#9F1239]'
                      : 'bg-[#FFF9E5] hover:bg-[#FFD700] text-[#8B4513] border-[#8B4513] shadow-[0_3px_0_#8B4513] active:translate-y-0.5 active:shadow-none'
                  }`}
                >
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span>{opt} {t('coins', 'מטבעות')}</span>
                </button>
              ))}
            </div>

            {/* Feedback Message */}
            {calcFeedback && (
              <div
                className={`p-4 rounded-2xl border-3 text-sm font-bold leading-relaxed mb-4 ${
                  calcFeedback.isCorrect
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-900'
                    : 'bg-rose-100 border-rose-600 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-base mb-1">
                  {calcFeedback.isCorrect ? <Check className="w-5 h-5 text-emerald-700" /> : <X className="w-5 h-5 text-rose-700" />}
                  <span>{calcFeedback.isCorrect ? t('calcCorrect', 'חישוב מדויק!') : t('calcIncorrect', 'חישוב שגוי')}</span>
                </div>
                <p className="text-xs sm:text-sm">{calcFeedback.text}</p>

                {calcFeedback.isCorrect && currentCalcIndex < CALC_PROBLEMS.length - 1 && (
                  <button
                    onClick={handleNextCalcProblem}
                    className="mt-3 text-xs sm:text-sm bg-[#8B4513] text-white px-4 py-2 rounded-2xl font-black hover:bg-[#5D4037] shadow-[0_3px_0_#5D2E0A] transition-all"
                  >
                    {t('nextCalcProblem', 'עבור לחישוב הבא ➔')}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="text-xs sm:text-sm bg-[#FDF6E3] p-3 rounded-2xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-extrabold">
            {t('solvedCalcs', 'חישובים שנפתרו')}: {calcSolvedCount} / {CALC_PROBLEMS.length}
          </div>
        </div>

        {/* TASK 2: SACRIFICE LAWS HALAKHIC QUIZ */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_#D2B48C] flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#D2B48C] pb-3">
              <span className="text-sm font-black bg-[#8B4513] text-white px-3.5 py-1 rounded-2xl shadow-sm">
                {t('mission', 'משימה')} 2
              </span>
              {completedTasks.includes('c1_scroll') && (
                <span className="text-sm text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-2xl border border-emerald-400">
                  <CheckCircle2 className="w-5 h-5" /> {t('taskCompleted', 'הושלם!')}
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-[#8B4513] mb-2 flex items-center gap-2">
              <Scroll className="w-6 h-6 text-[#8B4513]" /> {t('c1QuizTitle', 'חידון הלכות קורבנות החג')}
            </h3>

            <p className="text-sm sm:text-base text-[#5D4037] font-semibold mb-4 leading-relaxed">
              {t('c1QuizDesc', 'ענה על השאלות ההלכתיות כדי לחתום על מגילת קורבנות העלייה לרגל:')}
            </p>

            <div className="space-y-4 mb-4">
              {SACRIFICE_QUIZ.map((q) => {
                const isAnswered = quizAnswered[q.id] !== undefined;
                const selectedOpt = quizAnswered[q.id];
                const isCorrect = isAnswered && selectedOpt === q.correctOption;

                return (
                  <div key={q.id} className="bg-[#FDF6E3] border-3 border-[#8B4513] p-4 rounded-3xl shadow-sm">
                    <p className="text-sm sm:text-base font-extrabold text-[#8B4513] mb-2.5 leading-snug">
                      {q.id}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;

                        return (
                          <button
                            key={optIdx}
                            disabled={isCorrect}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`p-3 rounded-2xl text-xs sm:text-sm font-extrabold text-right transition-all border-2 ${
                              isCorrect
                                ? isSelected
                                  ? 'bg-emerald-100 border-emerald-600 text-emerald-900 font-black shadow-sm'
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

                    {isAnswered && (
                      isCorrect ? (
                        <p className="text-xs text-emerald-800 font-bold mt-2 pt-2 border-t border-[#D2B48C]">
                          💡 {q.explanation}
                        </p>
                      ) : (
                        <div className="mt-2 text-xs font-bold text-rose-800 bg-rose-100 p-2 rounded-xl border border-rose-300 flex items-center gap-1.5">
                          <X className="w-4 h-4 text-rose-700" />
                          <span>{t('incorrect', 'תשובה שגויה! נסה שנית.')}</span>
                        </div>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2.5 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            {t('quizScoreLabel', 'ציון בחידון ההלכה')}: {quizScore} / {SACRIFICE_QUIZ.length} {t('correctAnswers', 'תשובות נכונות')}
          </div>
        </div>

        {/* TASK 3: PACKING BACKPACK & HALAKHIC PREREQUISITES */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_#D2B48C] flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#D2B48C] pb-3">
              <span className="text-sm font-black bg-[#8B4513] text-white px-3.5 py-1 rounded-2xl shadow-sm">
                {t('mission', 'משימה')} 3
              </span>
              {completedTasks.includes('c1_pack') && (
                <span className="text-sm text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-2xl border border-emerald-400">
                  <CheckCircle2 className="w-5 h-5" /> {t('taskCompleted', 'הושלם!')}
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-[#8B4513] mb-2">{t('c1PackTitle', 'אריזת תרמיל המסע וטהרה')}</h3>

            <p className="text-sm sm:text-base text-[#5D4037] font-semibold mb-4 leading-relaxed">
              {t('c1PackDesc', 'ענה על השאלה ההלכתית עבור כל חפץ כדי לארוז אותו בתרמיל המסע:')}
            </p>

            <div className="space-y-4 mb-4">
              {packedGear.map((item) => {
                const isExpanded = activePackQuestionId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-3xl border-3 transition-all ${
                      item.packed
                        ? 'bg-emerald-50/90 border-emerald-500 shadow-sm'
                        : isExpanded
                        ? 'bg-[#FFD700]/30 border-[#8B4513] shadow-md'
                        : 'bg-[#FDF6E3] hover:bg-[#FFD700]/30 border-[#D2B48C]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-3xl mt-0.5">{item.icon}</span>
                        <div>
                          <span className="text-sm sm:text-base font-extrabold text-[#8B4513] block">{item.name}</span>
                          <span className="text-xs sm:text-sm text-[#5D4037] font-semibold block leading-snug mt-1">
                            📜 {item.halakhaRule}
                          </span>
                        </div>
                      </div>

                      {item.packed ? (
                        <span className="text-xs sm:text-sm text-emerald-700 font-black flex items-center gap-1 shrink-0 bg-emerald-100 px-3 py-1 rounded-2xl border border-emerald-400">
                          <CheckCircle2 className="w-5 h-5" /> {t('packedTag', 'ארוז!')}
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setActivePackQuestionId(isExpanded ? null : item.id);
                          }}
                          className="text-xs sm:text-sm bg-[#8B4513] hover:bg-[#5D4037] text-white px-3 py-1.5 rounded-2xl font-black shrink-0 transition-all shadow-[0_3px_0_#5D2E0A] active:translate-y-0.5 active:shadow-none"
                        >
                          {isExpanded ? t('closeQuestion', 'סגור שאלה') : t('answerAndPack', 'ענה וארוז ❓')}
                        </button>
                      )}
                    </div>

                    {/* Question Box when expanded and not packed */}
                    {!item.packed && (isExpanded || packedGear.filter(g => !g.packed)[0]?.id === item.id) && (
                      <div className="mt-3 pt-3 border-t-2 border-[#D2B48C] bg-white/90 p-4 rounded-2xl">
                        <p className="text-sm font-black text-[#8B4513] mb-3 leading-snug">
                          ❓ {item.question}
                        </p>

                        <div className="space-y-2">
                          {item.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerPackQuestion(item.id, optIdx)}
                              className="w-full p-3 rounded-2xl text-xs sm:text-sm font-extrabold text-right bg-[#FDF6E3] hover:bg-[#FFD700] border-2 border-[#8B4513] text-[#8B4513] transition-all leading-relaxed shadow-sm"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {packFeedback && packFeedback.id === item.id && (
                          <div
                            className={`mt-3 p-3 rounded-2xl text-xs sm:text-sm font-bold ${
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
                      <p className="text-xs sm:text-sm text-emerald-800 font-bold mt-2 pt-1 border-t border-emerald-200">
                        💡 {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs sm:text-sm bg-[#FDF6E3] p-3 rounded-2xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-extrabold">
            {t('itemsPacked', 'חפצים שנארזו')}: {packedGear.filter((g) => g.packed).length} / 4
          </div>
        </div>

      </div>

      {/* OPTIONAL BONUS HALAKHIC QUIZ */}
      <OptionalBonusQuiz
        chapterTitle={chapterContent.c1.title}
        questions={chapterContent.c1.bonusQuestions.length > 0 ? chapterContent.c1.bonusQuestions.map((q, idx) => ({ ...q, id: `c1_b${idx+1}`, correctOption: CHAPTER_1_BONUS_QUESTIONS[idx]?.correctOption ?? 0 })) : CHAPTER_1_BONUS_QUESTIONS}
        onAddCoins={onAddCoins}
        onAddStars={onAddStars}
      />

      {/* Chapter Progress & Navigation */}
      <div className="flex items-center justify-between bg-[#FFF9E5] border-4 border-[#D2B48C] p-5 sm:p-6 rounded-3xl shadow-[0_6px_0_#D2B48C] text-[#8B4513]">
        <div>
          <span className="text-xs sm:text-sm text-[#8B4513]/80 font-bold block">{t('progressInChapter', 'התקדמות בפרק א\'')}</span>
          <span className="text-base sm:text-lg font-black text-[#8B4513]">
            {completedTasks.filter((task) => task.startsWith('c1_')).length} / 3 {t('tasksCompleted', 'משימות הושלמו')}
          </span>
        </div>

        <button
          disabled={!canProgress}
          onClick={() => {
            soundManager.playSuccess();
            onNextChapter();
          }}
          className={`px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow.lg transition-all ${
            canProgress
              ? 'bg-[#FF4444] hover:bg-red-600 text-white border-b-4 border-red-800 active:translate-y-0.5 animate-bounce shadow-[0_4px_0_#991B1B]'
              : 'bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed'
          }`}
        >
          <span>{t('nextChapterBtn', 'צא לדרך לירושלים!')}</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
