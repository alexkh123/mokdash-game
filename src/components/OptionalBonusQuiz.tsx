import React, { useState, useMemo } from 'react';
import { HelpCircle, Sparkles, Check, X, Award, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { shuffleQuestion } from '../utils/shuffle';

export interface BonusQuestion {
  id: string;
  source: string; // e.g., 'משנה מעשר שני', 'רמב"ם הלכות חגיגה'
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

interface OptionalBonusQuizProps {
  chapterTitle: string;
  questions: BonusQuestion[];
  onAddCoins: (amount: number) => void;
  onAddStars: (amount: number) => void;
}

export const OptionalBonusQuiz: React.FC<OptionalBonusQuizProps> = ({
  chapterTitle,
  questions,
  onAddCoins,
  onAddStars,
}) => {
  const { t } = useLanguage();
  const [answeredState, setAnsweredState] = useState<{ [qId: string]: number }>({});
  const [bonusCoinsEarned, setBonusCoinsEarned] = useState<number>(0);
  const [bonusStarsEarned, setBonusStarsEarned] = useState<number>(0);

  const shuffledQuestions = useMemo(() => {
    return questions.map((q) => shuffleQuestion(q));
  }, [questions]);

  const handleAnswerQuestion = (qId: string, optionIdx: number) => {
    const question = shuffledQuestions.find((q) => q.id === qId);
    if (!question) return;

    // Don't allow changing if already answered correctly
    if (answeredState[qId] === question.correctOption) return;

    const isCorrect = optionIdx === question.correctOption;

    if (isCorrect) {
      soundManager.playCoin();
      onAddCoins(10);
      onAddStars(10);
      setBonusCoinsEarned((prev) => prev + 10);
      setBonusStarsEarned((prev) => prev + 10);
    } else {
      soundManager.playClick();
    }

    setAnsweredState((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const answeredCount = Object.keys(answeredState).length;

  return (
    <div className="bg-[#FFFDF5] border-4 border-[#8B4513] rounded-3xl p-4 sm:p-5 shadow-lg text-[#5D4037] relative overflow-hidden">
      {/* Decorative Badge */}
      <div className="absolute -left-10 -top-10 bg-[#FFD700] text-[#8B4513] w-28 h-28 rounded-full border-4 border-[#8B4513] opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b-2 border-[#D2B48C] pb-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFD700] border-2 border-[#8B4513] flex items-center justify-center text-[#8B4513] shadow-sm shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-[#8B4513] font-heading">
                {t('bonusQuizTitle', 'אתגרי רשות הלכתיים - בונוס!')}
              </h3>
              <span className="bg-[#8B4513] text-[#FFD700] text-xs font-black px-2.5 py-0.5 rounded-full border border-[#FFD700]">
                {t('optionalTag', 'רשות! לא חובה למעבר')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5D4037] font-bold">
              {t('bonusQuizDesc', 'שאלות מתוך ספרי ההלכה - תשובות נכונות מעניקות בונוס מטבעות וכוכבים!')}
            </p>
          </div>
        </div>

        {/* Bonus Counter */}
        <div className="bg-[#FDF6E3] border-2 border-[#8B4513] px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-black text-[#8B4513] shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>{t('earnedBonus', 'בונוס שנצבר')}: +{bonusCoinsEarned} {t('coins', 'מטבעות')} | +{bonusStarsEarned} {t('starsCount', 'כוכבים')}</span>
        </div>
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shuffledQuestions.map((q, idx) => {
          const isAnswered = answeredState[q.id] !== undefined;
          const selectedOption = answeredState[q.id];
          const isCorrect = isAnswered && selectedOption === q.correctOption;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-3xl border-3 flex flex-col justify-between transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/90 border-emerald-600 shadow-sm'
                    : 'bg-rose-50/90 border-rose-600 shadow-sm'
                  : 'bg-[#FDF6E3] border-[#D2B48C] hover:border-[#8B4513]'
              }`}
            >
              <div>
                {/* Source & Question Number */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-[#8B4513] text-white font-extrabold px-2.5 py-0.5 rounded-xl flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#FFD700]" />
                    {q.source}
                  </span>
                  <span className="text-xs text-[#8B4513] font-black">
                    {t('question', 'שאלה')} {idx + 1} {t('outOf', 'מתוך')} {questions.length}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-extrabold text-[#8B4513] mb-3 leading-snug">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2 mb-3">
                  {q.options.map((opt, optIdx) => {
                    const isOptSelected = selectedOption === optIdx;

                    return (
                      <button
                        key={optIdx}
                        disabled={isCorrect}
                        onClick={() => handleAnswerQuestion(q.id, optIdx)}
                        className={`w-full p-2.5 rounded-2xl text-xs sm:text-sm font-extrabold text-right transition-all border-2 leading-snug ${
                          isCorrect
                            ? isOptSelected
                              ? 'bg-emerald-600 text-white border-emerald-800 font-black shadow-sm'
                              : 'bg-white/60 text-gray-400 border-gray-200'
                            : isOptSelected
                            ? 'bg-rose-600 text-white border-rose-800 font-bold'
                            : 'bg-white border-[#D2B48C] hover:bg-[#FFD700] hover:border-[#8B4513] text-[#8B4513]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback & Explanation */}
              {isAnswered && (
                <div
                  className={`mt-2 p-3 rounded-2xl text-xs sm:text-sm font-bold border-2 ${
                    isCorrect
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                      : 'bg-rose-100 text-rose-900 border-rose-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-black mb-1">
                    {isCorrect ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>{t('correctBonusMsg', 'נכון! קיבלת +10 מטבעות ו-+10 כוכבים!')}</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-rose-700" />
                        <span>{t('incorrect', 'תשובה שגויה! נסה שוב.')}</span>
                      </>
                    )}
                  </div>
                  {isCorrect && (
                    <p className="text-xs leading-relaxed opacity-90">💡 {q.explanation}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-center text-[11px] font-bold text-[#8B4513]/70">
        {t('answeredBonusCount', 'ענית על')} {answeredCount} {t('outOf', 'מתוך')} {questions.length} {t('bonusQuestionsCount', 'שאלות הבונוס בפרק זה')}
      </div>
    </div>
  );
};

