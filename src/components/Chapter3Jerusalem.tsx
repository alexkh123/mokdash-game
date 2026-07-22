import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Waves, 
  CheckCircle2, 
  ArrowLeft, 
  Coins, 
  Sparkles, 
  RotateCcw, 
  Check, 
  X
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { OptionalBonusQuiz, BonusQuestion } from './OptionalBonusQuiz';
import { useLanguage } from '../context/LanguageContext';
import { getChapterContent } from '../data/localizedChapterContent';

const CHAPTER_3_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    id: 'c3_b1',
    source: 'משנה פסחים פ"ז מ"ג',
    question: 'האם מותר לבעלי הבתים בירושלים לגבות שכר דירה מהעולים לרגל בזמן החג?',
    options: [
      'אסור לקחת שכר דירה! עורות הקודשים ניתנים למארחים בתמורה לאכסניה',
      'מותר לגבות תשלום כפול מפני הביקוש',
      'מותר לגבות רק במטבעות זהב',
      'מותר לגבות רק ממי שאינו כהן',
    ],
    correctOption: 0,
    explanation: 'ירושלים לא נתחלקה לשבטים, ולפיכך לא היו משכירים בה בתים לעולים לרגל אלא המארחים קיבלו את עורות הקורבנות.',
  },
  {
    id: 'c3_b2',
    source: 'משנה שקלים פ"ח מ"א',
    question: 'מה דינם של בשר, כלים ומזונות שנמצאו בשווקי ירושלים בזמן הרגל מבחינת טהרה?',
    options: [
      'נחשבים טהורים מפני שכל עמי הארץ נאמנים על הטהרה בירושלים ברגל',
      'נחשבים טמאים מיד',
      'חייבים לשרפם בבית הדשן',
      'טהורים רק אם נמצאו ליד המקדש',
    ],
    correctOption: 0,
    explanation: 'בזמן הרגל עשו חכמים שכולם נאמנים על הטהרה בירושלים כדי שלא להכביד על העולים לרגל.',
  },
  {
    id: 'c3_b3',
    source: 'משנה מקוואות פ"א',
    question: 'מהו שיעור המים המינימלי הנדרש למקווה טהרה תקני בכמות סאים?',
    options: [
      '40 סאה מים שלא נשאו בכלי (כ-300 עד 500 ליטרים)',
      '10 סאה מים',
      '100 סאה מים',
      'אין שיעור, מספיק סאה אחת',
    ],
    correctOption: 0,
    explanation: 'שיעור המקווה מן התורה הוא ארבעים סאה, שהם שיעור כדי שיכסה גופו של אדם כולו בבת אחת.',
  },
];

interface Chapter3JerusalemProps {
  coins: number;
  onAddCoins?: (amount: number) => void;
  onDeductCoins: (amount: number) => void;
  onAddStars: (amount: number) => void;
  onCompleteTask: (taskId: string) => void;
  onNextChapter: () => void;
  completedTasks: string[];
}

// Memory Match Card Interface
interface MemoryCard {
  id: number;
  pairId: number;
  icon: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Animal for Spot-The-Blemish Challenge
interface AnimalCandidate {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  type: 'sheep' | 'goat';
  hasBlemish: boolean;
  blemishedPart?: 'ears' | 'eyes' | 'legs';
  blemishTitle?: string;
  blemishDesc?: string;
  inspectedParts: {
    ears: boolean;
    eyes: boolean;
    legs: boolean;
  };
  verdict?: 'blemished' | 'pure'; // User's decision
}

const INITIAL_ANIMALS: AnimalCandidate[] = [
  {
    id: 'animal_1',
    name: 'כבש א׳ - "צמר זהב"',
    subtitle: 'שה רך מרמת הגולן',
    icon: '🐑',
    type: 'sheep',
    hasBlemish: true,
    blemishedPart: 'ears',
    blemishTitle: 'אוזן סדוקה (פגם באוזן)',
    blemishDesc: 'בבדיקת זכוכית המגדלת נמצא סדק עמוק בתנוך האוזן. לפי מסכת בכורות, מום באוזן פוסל קורבן!',
    inspectedParts: { ears: false, eyes: false, legs: false },
  },
  {
    id: 'animal_2',
    name: 'גדי ב׳ - "גדי ההרים"',
    subtitle: 'גדי עיזים מהרי יהודה',
    icon: '🐐',
    type: 'goat',
    hasBlemish: true,
    blemishedPart: 'eyes',
    blemishTitle: 'עין עכורה (דק בעין)',
    blemishDesc: 'בבדיקת זכוכית המגדלת נמצא קרום לבן ועכור על האישון. דק בעין הינו מום גלוי הפוסל קורבן!',
    inspectedParts: { ears: false, eyes: false, legs: false },
  },
  {
    id: 'animal_3',
    name: 'כבש ג׳ - "שה תמים"',
    subtitle: 'שה זכר בן שנתו שאין בו מום',
    icon: '🐑',
    type: 'sheep',
    hasBlemish: false,
    inspectedParts: { ears: false, eyes: false, legs: false },
  },
];

// 4 pairs for memory matching game
const PAIR_DEFINITIONS = [
  { pairId: 1, icon: '🐑', name: 'שה תמים' },
  { pairId: 2, icon: '🐐', name: 'גדי עיזים' },
  { pairId: 3, icon: '🫖', name: 'כד שמן זית' },
  { pairId: 4, icon: '🕊️', name: 'תור כשר' },
];

export const Chapter3Jerusalem: React.FC<Chapter3JerusalemProps> = ({
  coins,
  onAddCoins = (_amount: number) => {},
  onDeductCoins,
  onAddStars,
  onCompleteTask,
  onNextChapter,
  completedTasks,
}) => {
  const { language, t } = useLanguage();
  const chapterContent = getChapterContent(language);
  // Market State
  const [marketTab, setMarketTab] = useState<'shop' | 'matching'>('shop');
  const [boughtSheep, setBoughtSheep] = useState<boolean>(false);
  const [boughtOil, setBoughtOil] = useState<boolean>(false);

  // Memory Game State
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // indexes
  const [isProcessingMatch, setIsProcessingMatch] = useState<boolean>(false);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);

  // Spot The Blemish Game State
  const [animals, setAnimals] = useState<AnimalCandidate[]>(INITIAL_ANIMALS);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>('animal_1');
  const [activeBlemishModal, setActiveBlemishModal] = useState<{
    title: string;
    desc: string;
    isBlemished: boolean;
  } | null>(null);

  // Mikveh State
  const [immersionsCount, setImmersionsCount] = useState<number>(0);

  // Initialize Memory Matching Cards
  const initializeCards = () => {
    const cardList: MemoryCard[] = [];
    let idCounter = 0;
    PAIR_DEFINITIONS.forEach((pair) => {
      cardList.push({
        id: idCounter++,
        pairId: pair.pairId,
        icon: pair.icon,
        name: pair.name,
        isFlipped: false,
        isMatched: false,
      });
      cardList.push({
        id: idCounter++,
        pairId: pair.pairId,
        icon: pair.icon,
        name: pair.name,
        isFlipped: false,
        isMatched: false,
      });
    });
    // Shuffle array
    for (let i = cardList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
    setCards(cardList);
    setFlippedCards([]);
    setMatchedPairsCount(0);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  // Handle Card Click in Memory Matching Game
  const handleCardClick = (index: number) => {
    if (isProcessingMatch) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    soundManager.playClick();

    // Flip card
    const nextCards = [...cards];
    nextCards[index].isFlipped = true;
    setCards(nextCards);

    const nextFlipped = [...flippedCards, index];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsProcessingMatch(true);
      const [idx1, idx2] = nextFlipped;
      const card1 = nextCards[idx1];
      const card2 = nextCards[idx2];

      if (card1.pairId === card2.pairId) {
        // MATCH!
        setTimeout(() => {
          soundManager.playCoin();
          const updatedCards = [...nextCards];
          updatedCards[idx1].isMatched = true;
          updatedCards[idx2].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          setIsProcessingMatch(false);

          const newMatched = matchedPairsCount + 1;
          setMatchedPairsCount(newMatched);
          onAddStars(5);

          if (onAddCoins) onAddCoins(5);

          if (newMatched === 4) {
            soundManager.playSuccess();
            if (onAddCoins) onAddCoins(15);
            // Grant sheep purchase automatically or unlock
            setBoughtSheep(true);
            if (boughtOil) {
              onCompleteTask('c3_market');
            }
          }
        }, 500);
      } else {
        // Mismatch
        setTimeout(() => {
          const updatedCards = [...nextCards];
          updatedCards[idx1].isFlipped = false;
          updatedCards[idx2].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
          setIsProcessingMatch(false);
        }, 900);
      }
    }
  };

  // Direct Market Buy
  const handleBuyItem = (type: 'sheep' | 'oil', cost: number) => {
    if (coins < cost) return;
    soundManager.playCoin();
    onDeductCoins(cost);
    onAddStars(5);

    if (type === 'sheep') setBoughtSheep(true);
    if (type === 'oil') setBoughtOil(true);

    if ((type === 'sheep' ? true : boughtSheep) && (type === 'oil' ? true : boughtOil)) {
      onCompleteTask('c3_market');
    }
  };

  // Spot The Blemish Inspection Action
  const handleInspectBodyPart = (part: 'ears' | 'eyes' | 'legs') => {
    soundManager.playClick();

    setAnimals((prev) =>
      prev.map((a) => {
        if (a.id === selectedAnimalId) {
          return {
            ...a,
            inspectedParts: {
              ...a.inspectedParts,
              [part]: true,
            },
          };
        }
        return a;
      })
    );

    const currentAnimal = animals.find((a) => a.id === selectedAnimalId);
    if (!currentAnimal) return;

    if (currentAnimal.hasBlemish && currentAnimal.blemishedPart === part) {
      // Blemish found!
      soundManager.playCoin();
      setActiveBlemishModal({
        title: currentAnimal.blemishTitle || 'נמצא מום!',
        desc: currentAnimal.blemishDesc || 'האיבר הנבדק אינו שלם ופוסל את הבהמה.',
        isBlemished: true,
      });
      onAddStars(5);
    } else {
      // Clean part
      soundManager.playClick();
      setActiveBlemishModal({
        title: 'איבר תמים ושלם ✨',
        desc: `בדיקת זכוכית המגדלת מראה כי ה${
          part === 'ears' ? 'אוזניים' : part === 'eyes' ? 'עיניים' : 'רגליים'
        } שלמות, נקיות וללא שום מום!`,
        isBlemished: false,
      });
      onAddStars(2);
    }
  };

  // Set Verdict on Animal (Reject or Accept)
  const handleSetVerdict = (verdict: 'blemished' | 'pure') => {
    soundManager.playClick();

    const updatedAnimals = animals.map((a) => {
      if (a.id === selectedAnimalId) {
        return { ...a, verdict };
      }
      return a;
    });

    setAnimals(updatedAnimals);

    // Check if player correctly identified all
    const allDecided = updatedAnimals.every((a) => a.verdict !== undefined);
    if (allDecided) {
      const allCorrect = updatedAnimals.every(
        (a) => (a.hasBlemish && a.verdict === 'blemished') || (!a.hasBlemish && a.verdict === 'pure')
      );

      if (allCorrect) {
        soundManager.playSuccess();
        onAddStars(20);
        if (onAddCoins) onAddCoins(10);
        onCompleteTask('c3_inspection');
      } else {
        // Feedback if mistake
        setActiveBlemishModal({
          title: 'שים לב - בדוק שנית!',
          desc: 'חלק מהקביעות אינן מדויקות. זכור: בהמה עם מום קטן ביותר (באוזן או בעין) פסולה להקרבה!',
          isBlemished: true,
        });
      }
    }
  };

  // Mikveh Immersion Action
  const handleImmerseInMikveh = () => {
    if (immersionsCount >= 3) return;
    soundManager.playSplash();
    const nextCount = immersionsCount + 1;
    setImmersionsCount(nextCount);
    onAddStars(5);

    if (nextCount === 3) {
      soundManager.playSuccess();
      onCompleteTask('c3_mikveh');
    }
  };

  const currentSelectedAnimal = animals.find((a) => a.id === selectedAnimalId)!;

  const canProgress =
    completedTasks.includes('c3_market') &&
    completedTasks.includes('c3_inspection') &&
    completedTasks.includes('c3_mikveh');

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-[#FFD700] p-4 sm:p-5 rounded-3xl border-4 border-[#8B4513] shadow-md text-[#8B4513]">
        <h2 className="text-xl sm:text-2xl font-black font-heading mb-1">
          {chapterContent.c3.title}
        </h2>
        <p className="text-xs sm:text-sm font-bold leading-relaxed">
          {chapterContent.c3.subTitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* TASK 1: MARKET & PAIR MATCHING MINI-GAME */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037] lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 1
              </span>
              {completedTasks.includes('c3_market') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8B4513]" /> שוק הקורבנות והתאמת צמדים
            </h3>

            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FDF6E3] border-2 border-[#8B4513] rounded-2xl mb-3">
              <button
                onClick={() => setMarketTab('shop')}
                className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
                  marketTab === 'shop'
                    ? 'bg-[#8B4513] text-white shadow'
                    : 'text-[#8B4513] hover:bg-[#FFF9E5]'
                }`}
              >
                🏪 חנות השוק
              </button>
              <button
                onClick={() => setMarketTab('matching')}
                className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
                  marketTab === 'matching'
                    ? 'bg-[#8B4513] text-white shadow'
                    : 'text-[#8B4513] hover:bg-[#FFF9E5]'
                }`}
              >
                🎮 התאמת צמדים
              </button>
            </div>

            {/* TAB 1: SHOP BUYING */}
            {marketTab === 'shop' && (
              <div className="space-y-2.5 mb-4 animate-fadeIn">
                <p className="text-xs text-[#5D4037] font-medium mb-2">
                  רכוש שה תמים וכד שמן זית זך בכספי מעשר שני:
                </p>

                <button
                  disabled={boughtSheep || coins < 20}
                  onClick={() => handleBuyItem('sheep', 20)}
                  className={`w-full p-3 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
                    boughtSheep
                      ? 'bg-amber-100/50 border-[#D2B48C] opacity-75'
                      : 'bg-[#FDF6E3] hover:bg-[#FFD700] border-[#8B4513] shadow-sm active:translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">🐑</span>
                    <div>
                      <span className="text-xs font-bold text-[#8B4513] block">שה רך ושלם (20 מטבעות)</span>
                      <span className="text-[10px] text-[#5D4037] font-medium">כשר להקרבת שלמים ועולה</span>
                    </div>
                  </div>
                  {boughtSheep ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] bg-[#8B4513] text-white px-2.5 py-1 rounded-xl font-bold flex items-center gap-1">
                      <Coins className="w-3 h-3 text-amber-300" /> קנה (20)
                    </span>
                  )}
                </button>

                <button
                  disabled={boughtOil || coins < 10}
                  onClick={() => handleBuyItem('oil', 10)}
                  className={`w-full p-3 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
                    boughtOil
                      ? 'bg-amber-100/50 border-[#D2B48C] opacity-75'
                      : 'bg-[#FDF6E3] hover:bg-[#FFD700] border-[#8B4513] shadow-sm active:translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">🫖</span>
                    <div>
                      <span className="text-xs font-bold text-[#8B4513] block">כד שמן זית זך (10 מטבעות)</span>
                      <span className="text-[10px] text-[#5D4037] font-medium">למנחות ולמנורת המקדש</span>
                    </div>
                  </div>
                  {boughtOil ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] bg-[#8B4513] text-white px-2.5 py-1 rounded-xl font-bold flex items-center gap-1">
                      <Coins className="w-3 h-3 text-amber-300" /> קנה (10)
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* TAB 2: PAIR MATCHING MINI-GAME */}
            {marketTab === 'matching' && (
              <div className="space-y-2 mb-4 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold text-[#8B4513]">
                  <span>התאם צמדי קורבנות תמימים:</span>
                  <button
                    onClick={initializeCards}
                    className="flex items-center gap-1 text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-lg hover:bg-[#5D4037]"
                  >
                    <RotateCcw className="w-3 h-3" /> מחדש
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 bg-[#FDF6E3] p-2 rounded-2xl border-2 border-[#8B4513]">
                  {cards.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(idx)}
                      disabled={card.isMatched}
                      className={`h-16 rounded-xl border-2 font-black text-xl flex flex-col items-center justify-center transition-all shadow-sm ${
                        card.isFlipped || card.isMatched
                          ? 'bg-[#FFD700] border-[#8B4513] scale-100 rotate-0'
                          : 'bg-[#FFF9E5] border-[#D2B48C] hover:border-[#8B4513] text-[#8B4513]'
                      }`}
                    >
                      {card.isFlipped || card.isMatched ? (
                        <>
                          <span>{card.icon}</span>
                          <span className="text-[8px] leading-none mt-0.5 text-[#8B4513] font-bold">
                            {card.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm opacity-50">📜</span>
                      )}
                    </button>
                  ))}
                </div>

                {matchedPairsCount === 4 && (
                  <div className="bg-emerald-100 border-2 border-emerald-600 p-2.5 rounded-2xl text-center text-xs font-bold text-emerald-900 animate-bounce">
                    🎉 ניצחון! התאמת את כל צמדי הקורבנות וזכית בפרס מטבעות!
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2.5 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            יתרת מעשר שני: {coins} מטבעות 💰
          </div>
        </div>

        {/* TASK 2: SPOT THE BLEMISH CHALLENGE */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037] lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 2
              </span>
              {completedTasks.includes('c3_inspection') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-[#8B4513]" /> אתגר "זיהוי וגילוי מומים"
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              בדוק בזכוכית מגדלת את 3 הבהמות בשוק. גלה מומים באוזניים ובעיניים, וזהה את ה"שה התמים"!
            </p>

            {/* Animal Selection Selector */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {animals.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAnimalId(a.id)}
                  className={`p-2 rounded-2xl border-2 text-center transition-all flex flex-col items-center ${
                    selectedAnimalId === a.id
                      ? 'bg-[#FFD700] border-[#8B4513] shadow-md scale-105'
                      : 'bg-[#FDF6E3] border-[#D2B48C] hover:bg-[#FFF9E5]'
                  }`}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-[10px] font-bold text-[#8B4513] truncate w-full">
                    {a.name.split('-')[0]}
                  </span>
                  {a.verdict && (
                    <span
                      className={`text-[9px] font-black mt-0.5 px-1.5 rounded-full ${
                        a.verdict === 'pure'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {a.verdict === 'pure' ? 'כשר' : 'פסול'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Animal Magnifier Box */}
            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] rounded-2xl p-3 text-center mb-3 relative flex flex-col items-center min-h-[160px]">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-bold text-[#8B4513]">
                  {currentSelectedAnimal.name}
                </span>
                <span className="text-[10px] text-[#5D4037]">
                  🔍 זכוכית מגדלת פעילה
                </span>
              </div>

              {/* Large Animal Graphic */}
              <div className="text-5xl my-2 animate-pulse relative">
                {currentSelectedAnimal.icon}
                <div className="absolute -top-2 -right-2 text-xl animate-spin">🔍</div>
              </div>

              <p className="text-[11px] text-[#5D4037] font-bold mb-3">
                לחץ על האיברים לבדיקה מדוקדקת:
              </p>

              {/* Inspection Hotspots */}
              <div className="grid grid-cols-3 gap-1.5 w-full">
                <button
                  onClick={() => handleInspectBodyPart('ears')}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border-2 transition-all flex items-center justify-center gap-1 ${
                    currentSelectedAnimal.inspectedParts.ears
                      ? 'bg-amber-200 border-[#8B4513] text-[#8B4513]'
                      : 'bg-[#FFF9E5] border-[#D2B48C] text-[#8B4513] hover:bg-[#FFD700]'
                  }`}
                >
                  <span>👂</span>
                  <span>אוזניים</span>
                  {currentSelectedAnimal.inspectedParts.ears && <span>✓</span>}
                </button>

                <button
                  onClick={() => handleInspectBodyPart('eyes')}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border-2 transition-all flex items-center justify-center gap-1 ${
                    currentSelectedAnimal.inspectedParts.eyes
                      ? 'bg-amber-200 border-[#8B4513] text-[#8B4513]'
                      : 'bg-[#FFF9E5] border-[#D2B48C] text-[#8B4513] hover:bg-[#FFD700]'
                  }`}
                >
                  <span>👁️</span>
                  <span>עיניים</span>
                  {currentSelectedAnimal.inspectedParts.eyes && <span>✓</span>}
                </button>

                <button
                  onClick={() => handleInspectBodyPart('legs')}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border-2 transition-all flex items-center justify-center gap-1 ${
                    currentSelectedAnimal.inspectedParts.legs
                      ? 'bg-amber-200 border-[#8B4513] text-[#8B4513]'
                      : 'bg-[#FFF9E5] border-[#D2B48C] text-[#8B4513] hover:bg-[#FFD700]'
                  }`}
                >
                  <span>🦵</span>
                  <span>רגליים</span>
                  {currentSelectedAnimal.inspectedParts.legs && <span>✓</span>}
                </button>
              </div>
            </div>

            {/* Verdict Decision Buttons for Active Animal */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => handleSetVerdict('blemished')}
                className={`py-2 px-3 rounded-2xl font-black text-xs flex items-center justify-center gap-1 border-2 transition-all ${
                  currentSelectedAnimal.verdict === 'blemished'
                    ? 'bg-rose-600 text-white border-rose-800'
                    : 'bg-rose-100 hover:bg-rose-200 text-rose-800 border-rose-300'
                }`}
              >
                <X className="w-4 h-4" />
                <span>פסול! (בעל מום)</span>
              </button>

              <button
                onClick={() => handleSetVerdict('pure')}
                className={`py-2 px-3 rounded-2xl font-black text-xs flex items-center justify-center gap-1 border-2 transition-all ${
                  currentSelectedAnimal.verdict === 'pure'
                    ? 'bg-emerald-600 text-white border-emerald-800'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-300'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>כשר! (שה תמים)</span>
              </button>
            </div>
          </div>

          <div className="text-xs bg-[#FDF6E3] p-2 rounded-xl border-2 border-[#D2B48C] text-[#8B4513] text-center font-bold">
            החלטות: {animals.filter((a) => a.verdict !== undefined).length} / 3 בהמות נבדקו
          </div>
        </div>

        {/* TASK 3: MIKVEH IMMERSION */}
        <div className="bg-[#FFF9E5] border-4 border-[#D2B48C] rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between text-[#5D4037] lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-3 border-b-2 border-[#D2B48C] pb-2">
              <span className="text-xs font-bold bg-[#8B4513] text-white px-3 py-1 rounded-xl">
                משימה 3
              </span>
              {completedTasks.includes('c3_mikveh') && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> הושלם!
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-[#8B4513] mb-1 flex items-center gap-2">
              <Waves className="w-5 h-5 text-[#8B4513]" /> טבילה במקווה המים
            </h3>

            <p className="text-xs text-[#5D4037] font-medium mb-3">
              רד במדרגות האבן ולחץ על כפתור הטבילה כדי להיטהר 3 פעמים במי מקווה חיים לפני העלייה להר הבית:
            </p>

            <div className="bg-[#FDF6E3] border-2 border-[#8B4513] rounded-2xl p-4 text-center mb-4 flex flex-col items-center relative overflow-hidden">
              <div className="text-5xl mb-2 animate-bounce">
                {immersionsCount === 0 ? '🚶‍♂️' : immersionsCount === 3 ? '✨🧘‍♂️✨' : '🌊'}
              </div>
              <span className="text-xs font-bold text-[#8B4513] relative z-10">
                {immersionsCount === 0
                  ? 'עומד בגרם המדרגות למקווה'
                  : immersionsCount === 3
                  ? 'טהור וזך בלב ובגוף לבגדי לבן!'
                  : `טבילה ${immersionsCount} מתוך 3 במים חיים`}
              </span>
              <div className="flex gap-1.5 mt-3">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-3 rounded-full border-2 transition-all ${
                      step <= immersionsCount
                        ? 'bg-sky-400 border-sky-700 shadow'
                        : 'bg-white border-[#D2B48C]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={immersionsCount >= 3}
            onClick={handleImmerseInMikveh}
            className={`w-full py-2.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
              immersionsCount >= 3
                ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-600'
                : 'bg-[#FFD700] hover:bg-yellow-300 text-[#8B4513] border-b-4 border-amber-800 active:translate-y-0.5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{immersionsCount >= 3 ? 'היטהרת בהצלחה למקדש!' : `טבול במים (${immersionsCount}/3)`}</span>
          </button>
        </div>

      </div>

      {/* Blemish Inspection Outcome Modal */}
      {activeBlemishModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFF9E5] border-4 border-[#8B4513] rounded-3xl max-w-md w-full p-5 text-center shadow-2xl relative">
            <div className="text-4xl mb-2">
              {activeBlemishModal.isBlemished ? '🚨' : '✨'}
            </div>
            <h4 className="text-xl font-black text-[#8B4513] font-heading mb-2">
              {activeBlemishModal.title}
            </h4>
            <p className="text-xs text-[#5D4037] font-bold leading-relaxed mb-5">
              {activeBlemishModal.desc}
            </p>
            <button
              onClick={() => setActiveBlemishModal(null)}
              className="w-full py-2.5 bg-[#8B4513] hover:bg-[#5D4037] text-white font-black text-xs rounded-2xl border-b-4 border-black"
            >
              הבנתי, המשך בדיקה!
            </button>
          </div>
        </div>
      )}

      {/* OPTIONAL BONUS HALAKHIC QUIZ */}
      <OptionalBonusQuiz
        chapterTitle={chapterContent.c3.title}
        questions={chapterContent.c3.bonusQuestions.length > 0 ? chapterContent.c3.bonusQuestions.map((q, idx) => ({ ...q, id: `c3_b${idx+1}`, correctOption: CHAPTER_3_BONUS_QUESTIONS[idx]?.correctOption ?? 0 })) : CHAPTER_3_BONUS_QUESTIONS}
        onAddCoins={onAddCoins}
        onAddStars={onAddStars}
      />

      {/* Chapter Progress & Navigation */}
      <div className="flex items-center justify-between bg-[#FFF9E5] border-4 border-[#D2B48C] p-4 rounded-3xl shadow-md text-[#8B4513]">
        <div>
          <span className="text-xs text-[#8B4513]/80 font-bold block">{t('progressInChapter', 'התקדמות בפרק ג\'')}</span>
          <span className="text-sm font-black text-[#8B4513]">
            {completedTasks.filter((task) => task.startsWith('c3_')).length} / 3 {t('tasksCompleted', 'משימות הושלמו')}
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
          <span>{t('nextChapterBtn', 'עלה להר הבית!')}</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
