import React, { useState, useEffect } from 'react';
import { Music, CheckCircle2, ArrowLeft, Heart, Compass, Sparkles, HelpCircle, Check, X } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { OptionalBonusQuiz, BonusQuestion } from './OptionalBonusQuiz';
import { useLanguage } from '../context/LanguageContext';
import { getChapterContent } from '../data/localizedChapterContent';
import { shuffleQuestion } from '../utils/shuffle';

const CHAPTER_2_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    id: 'c2_b1',
    source: 'משנה מעשר שני פ"ד מ"א',
    question: 'מה הדין אם עולה לרגל מצא בדרך לירושלים מעות (מטבעות) פזורות בזמן החג?',
    options: [
      'המעות שנמצאו בדרך לירושלים בחזקת מעשר שני הן בזמן הרגל',
      'המעות שייכות למוצאן כחולין גמורים',
      'חייב להקדישן לבדק הבית',
      'אסור לנגוע בהן כלל',
    ],
    correctOption: 0,
    explanation: 'חכמים גזרו שבזמן הרגל מעות שנמצאו בדרך לירושלים בחזקת מעשר שני הן, מפני שרוב הנוסעים נושאים מעשר שני.',
  },
  {
    id: 'c2_b2',
    source: 'ספר שמות ל"ד / מכילתא',
    question: 'מהי ההבטחה האלוהית בתורה לגבי שמירת הנכסים בזמן שכל העם עולה לרגל?',
    options: [
      '"ולא יחמוד איש את ארצך בעלותך לראות את פני ה\'"',
      '"וכיפר בעד ביתו ובעד כל קהל ישראל"',
      '"ופנית בבוקר והלכת לאוהליך"',
      '"כי ירחיב ה\' את גבולך"',
    ],
    correctOption: 0,
    explanation: 'התורה מבטיחה נס שבעת העלייה לרגל האויבים והשכנים לא יחמדו ולא יתקפו את נכסי העולים לרגל.',
  },
  {
    id: 'c2_b3',
    source: 'משנה פסחים פ"ד מ"ח',
    question: 'כיצד היו אנשי יריחו מקבלים ומכבדים את שיירות העולים לרגל שעברו בעירם?',
    options: [
      'היו מגישים להם מים וקציעות (תאנים מיובשות) בחינם',
      'היו גובים ממנם מס דרכים',
      'היו מלווים אותם בתוף ומחול עד שער ירושלים',
      'היו סוגרים את שערי העיר',
    ],
    correctOption: 0,
    explanation: 'אנשי יריחו היו ידועים בהכנסת אורחים מופלאה לעולים לרגל והגישו להם מים ומזון לדרך.',
  },
];

interface Chapter2RoadProps {
  onAddCoins?: (amount: number) => void;
  onAddStars: (amount: number) => void;
  onCompleteTask: (taskId: string) => void;
  onNextChapter: () => void;
  completedTasks: string[];
}

export const Chapter2Road: React.FC<Chapter2RoadProps> = ({
  onAddCoins = (_amount: number) => {},
  onAddStars,
  onCompleteTask,
  onNextChapter,
  completedTasks,
}) => {
  const { language, t } = useLanguage();
  const chapterContent = getChapterContent(language);
  // Rhythm Song Game State
  const [songProgress, setSongProgress] = useState<number>(0);
  const [activeBeat, setActiveBeat] = useState<number>(1);
  const [songVerse, setSongVerse] = useState<string>('שִׁיר הַמַּעֲלוֹת לְדָוִד – שָׂמַחְתִּי בְּאֹמְרִים לִי בֵּית ה\' נֵלֵךְ!');
  const [isPlayingSongAudio, setIsPlayingSongAudio] = useState<boolean>(false);

  // Hospitality & Demai Tithing Quiz State
  const [sharedWater, setSharedWater] = useState<boolean>(false);
  const [demaiQuizAnswered, setDemaiQuizAnswered] = useState<boolean>(false);
  const [selectedDemaiOption, setSelectedDemaiOption] = useState<number | null>(null);
  const [demaiQuestion] = useState(() => shuffleQuestion({
    question: "❓ אתגר הלכה: כשמתארחים בפונדק דרכים אצל 'עם הארץ', מה חייבים לעשר מספק?",
    options: [
      'אינו צריך לעשר כלל כי הארח בחזקת כשרות',
      'מעשר שני ותרומת מעשר בלבד (דין דמאי)',
      'חייב להפריש תרומה גדולה בלבד',
    ],
    correctOption: 1,
  }));

  // Pilgrimage Halakhot Overlook Trivia State
  const [overlookQuizAnswered, setOverlookQuizAnswered] = useState<boolean>(false);
  const [selectedOverlookOption, setSelectedOverlookOption] = useState<number | null>(null);
  const [overlookQuestion] = useState(() => shuffleQuestion({
    question: '❓ מי מהבאים פטור ממצוות "עולת ראייה" מן התורה?',
    options: [
      'חרש, שוטה, קטן, ומי שאינו יכול לעלות ברגליו',
      'מי שאין לו קרקע בארץ ישראל בלבד',
      'רק מי שעלה לרגל בשנה שעברה',
    ],
    correctOption: 0,
  }));

  // Rhythm beat ticker
  useEffect(() => {
    if (songProgress >= 10) return;
    const interval = setInterval(() => {
      setActiveBeat((prev) => (prev % 4) + 1);
    }, 900);
    return () => clearInterval(interval);
  }, [songProgress]);

  const handlePlayFullSong = () => {
    setIsPlayingSongAudio(true);
    onAddStars(10);
    soundManager.playSongOfAscents((verseText, progressPercent) => {
      setSongVerse(verseText);
      const prog = Math.round(progressPercent / 10);
      setSongProgress((prev) => Math.max(prev, prog));
      if (progressPercent >= 75) {
        setIsPlayingSongAudio(false);
        soundManager.playSuccess();
        onCompleteTask('c2_song');
      }
    });
  };

  const handleTapBeat = (beatNumber: number) => {
    if (beatNumber === activeBeat) {
      soundManager.playHarpNote(440 + beatNumber * 100);
      const nextProgress = songProgress + 2;
      setSongProgress(nextProgress);
      onAddStars(3);

      let currentText = songVerse;
      if (nextProgress === 4) {
        currentText = 'עֹמְדוֹת הָיוּ רַגְלֵינוּ בִּשְׁעָרַיִךְ יְרוּשָׁלָםִ!';
        setSongVerse(currentText);
      } else if (nextProgress === 8) {
        currentText = 'יְרוּשָׁלַםִ הַבְּנוּיָה כְּעִיר שֶׁחֻבְּרָה לָהּ יַחְדָּו!';
        setSongVerse(currentText);
      }

      // Speak Hebrew verse aloud on beat click
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentText);
        utterance.lang = 'he-IL';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }

      if (nextProgress >= 10) {
        soundManager.playSuccess();
        onCompleteTask('c2_song');
      }
    } else {
      soundManager.playClick();
    }
  };

  const handleShareWater = () => {
    soundManager.playSuccess();
    setSharedWater(true);
    onAddStars(5);
    if (demaiQuizAnswered) {
      onCompleteTask('c2_hospitality');
    }
  };

  const handleAnswerDemaiQuiz = (optIdx: number) => {
    setSelectedDemaiOption(optIdx);
    setDemaiQuizAnswered(true);

    if (optIdx === demaiQuestion.correctOption) {
      // Correct: Demai (מעשר שני ותרומת מעשר מספק)
      soundManager.playCoin();
      onAddStars(10);
      if (sharedWater) {
        onCompleteTask('c2_hospitality');
      }
    } else {
      soundManager.playClick();
    }
  };

  const handleAnswerOverlookQuiz = (optIdx: number) => {
    setSelectedOverlookOption(optIdx);
    setOverlookQuizAnswered(true);

    if (optIdx === overlookQuestion.correctOption) {
      // Correct: חרש, שוטה, קטן וסומא
      soundManager.playTrumpetFanfare();
      onAddStars(15);
      onCompleteTask('c2_overlook');
    } else {
      soundManager.playClick();
    }
  };

  const canProgress =
    completedTasks.includes('c2_song') &&
    completedTasks.includes('c2_hospitality') &&
    completedTasks.includes('c2_overlook');

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-[#FFD700] p-4 sm:p-5 rounded-3xl border-4 border-[#8B4513] shadow-md text-[#8B4513]">
        <h2 className="text-xl sm:text-2xl font-black font-heading mb-1">
          {chapterContent.c2.title}
        </h2>
        <p className="text-xs sm:text-sm font-bold leading-relaxed">
          {chapterContent.c2.subTitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* TASK 1: RHYTHM SONG GAME */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 1
              </span>
              {completedTasks.includes('c2_song') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Music className="w-5 h-5 text-[#8B4513]" /> שירת שירי המעלות
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              לחץ על התוף המוזהב כשהוא מהבהב בקצב כדי לשיר עם השיירה העולה לירושלים:
            </p>

            {/* Song Verse Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-3 rounded-2xl mb-3 text-center shadow-sm">
              <p className="text-xs sm:text-sm font-serif-hebrew font-bold text-[#8B4513] leading-relaxed animate-pulse">
                "{songVerse}"
              </p>
            </div>

            {/* Play Audio Song Button */}
            <button
              onClick={handlePlayFullSong}
              disabled={isPlayingSongAudio}
              className={`w-full mb-4 py-2 px-3 rounded-xl font-black text-xs border-2 shadow-sm transition-all flex items-center justify-center gap-2 ${
                isPlayingSongAudio
                  ? 'bg-amber-300 text-[#8B4513] border-[#8B4513] animate-pulse'
                  : 'bg-[#8B4513] hover:bg-[#5D4037] text-white border-[#FFD700] active:translate-y-0.5'
              }`}
            >
              <span>{isPlayingSongAudio ? '🔊 מנגן ושר את השיר בקול...' : '🔊 השמע את השיר בנגינה ושירה בפועל 🎵'}</span>
            </button>

            {/* Rhythm Buttons 1-4 */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[1, 2, 3, 4].map((b) => {
                const isActive = activeBeat === b;
                return (
                  <button
                    key={b}
                    onClick={() => handleTapBeat(b)}
                    className={`py-3 rounded-2xl font-black text-sm border-2 transition-all flex flex-col items-center gap-1 ${
                      isActive
                        ? 'bg-[#FFD700] text-[#8B4513] border-[#8B4513] shadow-md scale-105 active:translate-y-0.5 animate-pulse'
                        : 'bg-[#FDF6E3] text-[#8B4513] border-[#D2B48C] hover:bg-[#FFF9E5]'
                    }`}
                  >
                    <span>🥁</span>
                    <span className="text-xs">{b}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#8B4513] font-bold">
              <span>התקדמות השיר</span>
              <span>{Math.min(100, songProgress * 10)}%</span>
            </div>
            <div className="w-full bg-[#FDF6E3] h-3 rounded-full overflow-hidden border-2 border-[#8B4513]">
              <div
                className="bg-[#FFD700] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, songProgress * 10)}%` }}
              />
            </div>
          </div>
        </div>

        {/* TASK 2: HOSPITALITY & DEMAI TITHING QUIZ */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 2
              </span>
              {completedTasks.includes('c2_hospitality') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" /> הכנסת אורחים והלכות דמאי
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              שתף מים עם הנוסעים וענה על שאלה בהלכות פירות פונדק ("דמאי"):
            </p>

            <button
              disabled={sharedWater}
              onClick={handleShareWater}
              className={`w-full p-2.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between mb-3 ${
                sharedWater
                  ? 'bg-amber-100/50 border-[#D2B48C] opacity-75'
                  : 'bg-[#FDF6E3] hover:bg-[#FFD700] border-[#8B4513] shadow-sm active:translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🥤</span>
                <div>
                  <span className="text-xs font-bold text-[#8B4513] block">השקה מים קרים לעולים לרגל</span>
                  <span className="text-[10px] text-[#5D4037]">מצוות הכנסת אורחים במעלה ההר</span>
                </div>
              </div>
              {sharedWater ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-xl font-bold">שתף מים</span>}
            </button>

            {/* Demai Quiz Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-3 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-[#8B4513] mb-2 leading-tight">
                {demaiQuestion.question}
              </p>

              <div className="space-y-1.5">
                {demaiQuestion.options.map((opt, optIdx) => {
                  const isSelected = selectedDemaiOption === optIdx;
                  const isCorrectOpt = optIdx === demaiQuestion.correctOption;

                  return (
                    <button
                      key={optIdx}
                      disabled={demaiQuizAnswered}
                      onClick={() => handleAnswerDemaiQuiz(optIdx)}
                      className={`w-full p-2 rounded-xl text-xs font-bold text-right transition-all border ${
                        demaiQuizAnswered
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

              {demaiQuizAnswered && (
                <p className="text-[10px] text-[#5D4037] font-bold mt-2 pt-1 border-t border-[#D2B48C]">
                  💡 לפי המשנה במסכת דמאי: עמי הארץ נחשדו שלא להפריש מעשר שני ותרומת מעשר, ולכן האוכל אצלם מעשר דמאי!
                </p>
              )}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2.5 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            סטטוס: {sharedWater && demaiQuizAnswered ? 'הושלם בהצטיינות!' : 'השקה מים וענה על שאלת דמאי'}
          </div>
        </div>

        {/* TASK 3: JERUSALEM LOOKOUT & PILGRIMAGE TRIVIA */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037]">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 3
              </span>
              {completedTasks.includes('c2_overlook') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#8B4513]" /> תצפית הר הצופים והלכות הראייה
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              מול חומות ירושלים, ענה על שאלת המשנה במסכת חגיגה (פ"א מ"א):
            </p>

            {/* Overlook Quiz Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] p-3 rounded-2xl shadow-sm mb-3">
              <p className="text-xs font-bold text-[#8B4513] mb-2 leading-tight">
                {overlookQuestion.question}
              </p>

              <div className="space-y-1.5">
                {overlookQuestion.options.map((opt, optIdx) => {
                  const isSelected = selectedOverlookOption === optIdx;
                  const isCorrectOpt = optIdx === overlookQuestion.correctOption;

                  return (
                    <button
                      key={optIdx}
                      disabled={overlookQuizAnswered}
                      onClick={() => handleAnswerOverlookQuiz(optIdx)}
                      className={`w-full p-2 rounded-xl text-xs font-bold text-right transition-all border ${
                        overlookQuizAnswered
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

              {overlookQuizAnswered && (
                <p className="text-[10px] text-[#5D4037] font-bold mt-2 pt-1 border-t border-[#D2B48C]">
                  💡 "הכל חייבין בראייה, חוץ מחרש שוטה וקטן... ומי שאינו יכול לעלות ברגליו"!
                </p>
              )}
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2.5 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            ברכת המקום: {overlookQuizAnswered ? 'שנאמרה בהצטיינות! ✨' : 'ענה על שאלת הראייה'}
          </div>
        </div>

      </div>

      {/* OPTIONAL BONUS HALAKHIC QUIZ */}
      <OptionalBonusQuiz
        chapterTitle={chapterContent.c2.title}
        questions={chapterContent.c2.bonusQuestions.length > 0 ? chapterContent.c2.bonusQuestions.map((q, idx) => ({ ...q, id: `c2_b${idx+1}`, correctOption: CHAPTER_2_BONUS_QUESTIONS[idx]?.correctOption ?? 0 })) : CHAPTER_2_BONUS_QUESTIONS}
        onAddCoins={onAddCoins}
        onAddStars={onAddStars}
      />

      {/* Chapter Progress & Navigation */}
      <div className="flex items-center justify-between bg-[#FFF9E5] border-4 border-[#D2B48C] p-4 rounded-3xl shadow-md text-[#8B4513]">
        <div>
          <span className="text-xs text-[#8B4513]/80 font-bold block">{t('progressInChapter', 'התקדמות בפרק ב\'')}</span>
          <span className="text-sm font-black text-[#8B4513]">
            {completedTasks.filter((task) => task.startsWith('c2_')).length} / 3 {t('tasksCompleted', 'משימות הושלמו')}
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
          <span>{t('nextChapterBtn', 'היכנס לירושלים!')}</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
