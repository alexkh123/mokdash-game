import React, { useState } from 'react';
import { HelpCircle, Sparkles, Check, X, Award, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';

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
  const [answeredState, setAnsweredState] = useState<{ [qId: string]: number }>({});
  const [bonusCoinsEarned, setBonusCoinsEarned] = useState<number>(0);
  const [bonusStarsEarned, setBonusStarsEarned] = useState<number>(0);

  const handleAnswerQuestion = (qId: string, optionIdx: number) => {
    if (answeredState[qId] !== undefined) return;

    const question = questions.find((q) => q.id === qId);
    if (!question) return;

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
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#FFD700] border-2 border-[#8B4513] flex items-center justify-center text-[#8B4513] shadow-sm">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#8B4513] font-heading">
                אתגרי רשות הלכתיים - בונוס!
              </h3>
              <span className="bg-[#8B4513] text-[#FFD700] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#FFD700]">
                רשות! לא חובה למעבר
              </span>
            </div>
            <p className="text-xs text-[#5D4037] font-medium">
              שאלות מתוך ספרי ההלכה (משנה ורמב"ם) - תשובות נכונות מעניקות בונוס מטבעות וכוכבים!
            </p>
          </div>
        </div>

        {/* Bonus Counter */}
        <div className="bg-[#FDF6E3] border-2 border-[#8B4513] px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-black text-[#8B4513]">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>בונוס שנצבר: +{bonusCoinsEarned} מטבעות | +{bonusStarsEarned} כוכבים</span>
        </div>
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {questions.map((q, idx) => {
          const isAnswered = answeredState[q.id] !== undefined;
          const selectedOption = answeredState[q.id];
          const isCorrect = isAnswered && selectedOption === q.correctOption;

          return (
            <div
              key={q.id}
              className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/80 border-emerald-600'
                    : 'bg-rose-50/80 border-rose-600'
                  : 'bg-[#FDF6E3] border-[#D2B48C] hover:border-[#8B4513]'
              }`}
            >
              <div>
                {/* Source & Question Number */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] bg-[#8B4513] text-white font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#FFD700]" />
                    {q.source}
                  </span>
                  <span className="text-[10px] text-[#8B4513] font-black">
                    שאלה {idx + 1} מתוך {questions.length}
                  </span>
                </div>

                <p className="text-xs font-bold text-[#8B4513] mb-3 leading-snug">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-1.5 mb-3">
                  {q.options.map((opt, optIdx) => {
                    const isOptSelected = selectedOption === optIdx;
                    const isCorrectOpt = optIdx === q.correctOption;

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerQuestion(q.id, optIdx)}
                        className={`w-full p-2 rounded-xl text-xs font-bold text-right transition-all border leading-tight ${
                          isAnswered
                            ? isCorrectOpt
                              ? 'bg-emerald-600 text-white border-emerald-800 font-black'
                              : isOptSelected
                              ? 'bg-rose-600 text-white border-rose-800'
                              : 'bg-white/60 text-gray-400 border-gray-200'
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
                  className={`mt-2 p-2 rounded-xl text-[11px] font-bold border ${
                    isCorrect
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                      : 'bg-rose-100 text-rose-900 border-rose-400'
                  }`}
                >
                  <div className="flex items-center gap-1 font-black mb-0.5">
                    {isCorrect ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>נכון! קיבלת +10 מטבעות ו-+10 כוכבים!</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3.5 h-3.5 text-rose-700" />
                        <span>לא מדויק</span>
                      </>
                    )}
                  </div>
                  <p className="text-[10px] leading-tight opacity-90">💡 {q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-center text-[11px] font-bold text-[#8B4513]/70">
        ענית על {answeredCount} מתוך {questions.length} שאלות הבונוס בפרק זה
      </div>
    </div>
  );
};
