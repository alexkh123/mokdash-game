import React, { useState } from 'react';
import { ChapterId } from '../types';
import { CHAPTERS_META } from '../data/chaptersData';
import { Sparkles, Coins, HelpCircle, X, ChevronRight, BookOpen, Award, MessageCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';

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

const WISDOM_MULTILINGUAL: Record<SupportedLanguage, Record<ChapterId, ChapterWisdom>> = {
  he: {
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
  },
  en: {
    1: {
      greeting: 'Welcome! I am Azariah the Priest, and I will accompany you to the Holy Temple!',
      advice: 'Begin with tithing Second Ma\'aser, calculating redeem coins, and packing white festival garments!',
      halakhaFact: 'Did you know? Second Ma\'aser is redeemed into coins and brought to Jerusalem to feast in joy!',
    },
    2: {
      greeting: 'Greetings! I am glad to see you walking along the trails of Judea!',
      advice: 'Sing Psalms of Ascent with fellow pilgrims, welcome weary travelers, and overlook Jerusalem!',
      halakhaFact: 'Pilgrim caravans traveled with flutes and drums, greeted warmly with bread and water by towns!',
    },
    3: {
      greeting: 'We have arrived at the grand markets of Holy Jerusalem!',
      advice: 'Spend Ma\'aser coins in the market, inspect unblemished lambs, and immerse in the Mikveh!',
      halakhaFact: 'During festivals, all Jerusalem markets and inhabitants are considered pure for unity!',
    },
    4: {
      greeting: 'Welcome through the magnificent gates of the Temple Mount!',
      advice: 'Donate the Half-Shekel at the Shekel Chamber and inspect altar wood & pure olive oil!',
      halakhaFact: 'The Half-Shekel contributed equally by everyone purchases all public sacrifices all year!',
    },
    5: {
      greeting: 'We enter the Inner Courtyard! Listen to the Levite song on the fifteen steps!',
      advice: 'Listen to Levite trumpets and assist carrying wood logs up to the Altar!',
      halakhaFact: 'The Altar stood at the center of the courtyard with a perpetual sacred flame burning day & night!',
    },
    6: {
      greeting: 'Blessed are you! You reached the pinnacle - Simchat Beit Hashoeva festival joy!',
      advice: 'Perform the Semikha laying of hands, observe the priests, and rejoice in the festival!',
      halakhaFact: 'Our sages said: Whoever has not witnessed Simchat Beit Hashoeva has never seen true joy!',
    },
  },
  ru: {
    1: {
      greeting: 'Добро пожаловать! Я священник Азария, и я буду сопровождать вас в Святой Храм!',
      advice: 'Начните с выкупа Второй Десятины, расчета монет и укладки белых праздничных одежд!',
      halakhaFact: 'Знаете ли вы? Вторая десятина выкупается монетами и приносится в Иерусалим для праздничной трапезы!',
    },
    2: {
      greeting: 'Приветствую! Я рад видеть вас на тропах Иудеи!',
      advice: 'Пойте Песни Восхождения, проявляйте гостеприимство и любуйтесь Иерусалимом с высоты!',
      halakhaFact: 'Караваны паломников шли под звуки флейт и барабанов, встречаемые хлебом и водой!',
    },
    3: {
      greeting: 'Мы прибыли на величественные рынки Святого Иерусалима!',
      advice: 'Используйте монеты на рынке, проверьте жертвенного ягненка и окунитесь в микву!',
      halakhaFact: 'Во время праздников все рынки Иерусалима и жители считаются чистыми ради единства!',
    },
    4: {
      greeting: 'Добро пожаловать к вратам Храмовой Горы и палатам!',
      advice: 'Пожертвуйте Полшекеля в палату и проверьте дрова и чистое оливковое масло!',
      halakhaFact: 'Полшекеля, равные для всех, покупают общественные жертвоприношения на весь год!',
    },
    5: {
      greeting: 'Мы вступаем во Внутренний Двор! Послушайте пение левитов!',
      advice: 'Внимайте трубам левитов и помогайте нести дрова к Жертвеннику!',
      halakhaFact: 'Жертвенник стоял в центре двора с вечным священным огнем, горевшим день и ночь!',
    },
    6: {
      greeting: 'Благословенны вы! Вы достигли вершины - Радости Возлияния Воды!',
      advice: 'Совершите обряд Семиха (возложение рук), наблюдайте за священниками и радуйтесь!',
      halakhaFact: 'Мудрецы говорили: Кто не видел Радости Возлияния Воды, тот никогда не видел истинной радости!',
    },
  },
  es: {
    1: {
      greeting: '¡Bienvenido! Soy Azarías el Sacerdote y te acompañaré al Santo Templo.',
      advice: '¡Comienza con el diezmo del Segundo Maaser, calcula monedas y empaca vestidos blancos!',
      halakhaFact: '¿Sabías que? El Segundo Maaser se redime con monedas y se lleva a Jerusalén para festejar.',
    },
    2: {
      greeting: '¡Saludos! ¡Me alegra verte caminar por los senderos de Judea!',
      advice: 'Canta Cánticos Graduales, ofrece hospitalidad a los viajeros y contempla Jerusalén.',
      halakhaFact: 'Las caravanas viajaban acompañadas de flautas y tambores, recibidas con pan y agua.',
    },
    3: {
      greeting: '¡Hemos llegado a los grandes mercados de la Santa Jerusalén!',
      advice: 'Gasta monedas en el mercado, inspecciona el cordero sin defecto y purifícate en la Mikve.',
      halakhaFact: 'Durante las festividades, todos los mercados de Jerusalén se consideran puros.',
    },
    4: {
      greeting: '¡Bienvenidos a las majestuosas puertas del Monte del Templo!',
      advice: 'Dona el Medio Shekel en la cámara y revisa la leña del altar y el aceite de oliva puro.',
      halakhaFact: 'El Medio Shekel donado por igual compra los sacrificios públicos de todo el año.',
    },
    5: {
      greeting: '¡Entramos al Patio Interior! ¡Escucha el canto levita en los quince escalones!',
      advice: 'Escucha las trompetas levitas y ayuda a llevar leña al Gran Altar.',
      halakhaFact: 'El Altar estaba en el centro con un fuego perpetuo ardiendo día y noche.',
    },
    6: {
      greeting: '¡Bendito seas! Has llegado a la cima: la alegría de Simjat Beit Hashoeva.',
      advice: 'Realiza la imposición de manos Semijá, observa a los sacerdotes y alégrate.',
      halakhaFact: 'Dijeron nuestros sabios: ¡Quien no vio Simjat Beit Hashoeva nunca vio la verdadera alegría!',
    },
  },
  pt: {
    1: {
      greeting: 'Bem-vindo! Sou Azarias o Sacerdote, e vou acompanhá-lo ao Santo Templo!',
      advice: 'Comece com o dízimo do Segundo Maasser, calcule moedas e embale roupas brancas!',
      halakhaFact: 'Você sabia? O Segundo Maasser é resgatado em moedas e trazido a Jerusalém para festejar!',
    },
    2: {
      greeting: 'Saudações! Fico feliz em vê-lo caminhando pelas trilhas da Judeia!',
      advice: 'Cante os Cânticos dos Degraus, acolha viajantes e contemple Jerusalém do alto!',
      halakhaFact: 'Caravanas viajavam com flautas e tambores, acolhidas com pão e água pelas vilas!',
    },
    3: {
      greeting: 'Chegamos aos grandes mercados da Sagrada Jerusalém!',
      advice: 'Gaste moedas de Maasser no mercado, inspecione o cordeiro e banhe-se na Mikvê!',
      halakhaFact: 'Durante as festas, todos os mercados de Jerusalém são considerados puros!',
    },
    4: {
      greeting: 'Bem-vindos aos portões do Monte do Templo e às câmaras!',
      advice: 'Doe o Meio Shekel e verifique a lenha do altar e o azeite puro!',
      halakhaFact: 'O Meio Shekel doado por todos compra os sacrifícios públicos de todo o ano!',
    },
    5: {
      greeting: 'Entramos no Pátio Interior! Ouça o canto levita nos degraus!',
      advice: 'Escute as trombetas levitas e ajude a carregar lenha para o Altar!',
      halakhaFact: 'O Altar ficava no centro do pátio com um fogo eterno queimando dia e noite!',
    },
    6: {
      greeting: 'Abençoado seja! Você atingiu o ápice - a alegria de Simchat Beit Hashoeva!',
      advice: 'Realize a imposição de mãos Semichá, observe os sacerdotes e alegre-se!',
      halakhaFact: 'Nossos sábios disseram: Quem nunca viu Simchat Beit Hashoeva nunca viu a verdadeira alegria!',
    },
  },
  fr: {
    1: {
      greeting: 'Bienvenue! Je suis Azaria le Prêtre, et je vous accompagnerai au Saint Temple!',
      advice: 'Commencez par prélever le Second Maasser, calculer les pièces et emballer vos vêtements blancs!',
      halakhaFact: 'Le saviez-vous? Le Second Maasser est racheté en pièces et apporté à Jérusalem pour festoyer!',
    },
    2: {
      greeting: 'Salutations! Je suis heureux de vous voir marcher sur les sentiers de Judée!',
      advice: 'Chantez les Cantiques des Degrés, accueillez les voyageurs et contemplez Jérusalem!',
      halakhaFact: 'Les caravanes voyageaient au son des flûtes et tambours, accueillies avec du pain et de l\'eau!',
    },
    3: {
      greeting: 'Nous sommes arrivés aux grands marchés de la Sainte Jérusalem!',
      advice: 'Dépensez les pièces de Maasser, inspectez l\'agneau sans défaut et immergez-vous au Mikvé!',
      halakhaFact: 'Pendant les fêtes, tous les marchés de Jérusalem sont considérés comme purifiés!',
    },
    4: {
      greeting: 'Bienvenue aux portes du Mont du Temple et aux chambres!',
      advice: 'Faites don du Demi-Shekel et vérifiez le bois de l\'autel et l\'huile d\'olive pure!',
      halakhaFact: 'Le Demi-Shekel donné par tous achète les sacrifices publics de toute l\'année!',
    },
    5: {
      greeting: 'Nous entrons dans la Cour Intérieure! Écoutez le chant lévitique sur les quinze marches!',
      advice: 'Écoutez les trompettes lévitiques et aidez à porter le bois vers le Grand Autel!',
      halakhaFact: 'L\'Autel se dressait au centre de la cour avec un feu perpétuel brûlant jour et nuit!',
    },
    6: {
      greeting: "Soyez béni! Vous avez atteint le sommet - la joie de Sim'hat Beit Hashoéva!",
      advice: "Accomplissez l'imposition des mains Semikha, observez les prêtres et réjouissez-vous!",
      halakhaFact: "Nos sages ont dit: Quiconque n'a pas vu Sim'hat Beit Hashoéva n'a jamais vu la vraie joie!",
    },
  },
};

export const PriestCompanion: React.FC<PriestCompanionProps> = ({
  currentChapter,
  coins,
  stars,
  completedTasksCount,
}) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'advice' | 'coins_info' | 'rank'>('advice');

  const currentChapterMeta = CHAPTERS_META.find((m) => m.id === currentChapter)!;
  const wisdom = WISDOM_MULTILINGUAL[language]?.[currentChapter] || WISDOM_MULTILINGUAL['he'][currentChapter];

  // Calculate Title / Rank based on Stars
  const getRankTitle = (s: number) => {
    if (s >= 150) return { title: `${t('learningRank', 'חכם העזרה והמקדש')} 👑`, badge: '🥇 Gold Rank' };
    if (s >= 100) return { title: `${t('learningRank', 'עולה לרגל מובהק')} 🌟`, badge: '🥈 Silver Rank' };
    if (s >= 50) return { title: `${t('learningRank', 'שואב מים בששון')} 📜`, badge: '🥉 Bronze Rank' };
    return { title: `${t('learningRank', 'עולה לרגל מתחיל')} 🎒`, badge: '🌱 Beginner' };
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
          title={t('priestTitle', 'עזריה הכהן')}
        >
          {/* Priest Icon Avatar */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFF9E5] border-2 border-[#FFD700] flex items-center justify-center text-2xl sm:text-3xl shadow-inner relative overflow-hidden">
            👳‍♂️
          </div>

          <div className="text-right hidden md:block pl-1">
            <span className="text-xs font-black text-[#FFD700] block leading-none">
              {t('priestTitle', 'עזריה הכהן')}
            </span>
            <span className="text-[10px] text-amber-200 font-bold block leading-tight mt-0.5">
              {t('priestRole', 'מלווה ומדריך מקדש')}
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
                    {t('priestTitle', 'עזריה הכהן')}
                    <span className="text-xs bg-[#FFD700] text-[#8B4513] px-2 py-0.5 rounded-full font-bold">
                      {t('priestCompanion', 'מדריך המסע')}
                    </span>
                  </h2>
                  <p className="text-xs text-amber-100 font-medium">
                    📍 {currentChapterMeta.title} ({currentChapterMeta.locationName})
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
                <span>{t('adviceAndGuide', 'עצות והנחיות')}</span>
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
                <span>{t('whyCoins', 'למה משמשים המטבעות?')}</span>
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
                <span>{t('learningRank', 'דרגת הלמידה')}</span>
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
                      🎯 <span className="underline">Mission:</span> {wisdom.advice}
                    </p>
                  </div>

                  {/* Halakhic Fact Card */}
                  <div className="bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-300">
                    <div className="flex items-center gap-1.5 font-black text-xs text-[#8B4513] mb-1">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <span>{t('halakhaFact', 'דבר הלכה מעזריה הכהן')}:</span>
                    </div>
                    <p className="text-xs text-[#5D4037] font-medium leading-relaxed">
                      {wisdom.halakhaFact}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: EXPLAINING COINS & STARS */}
              {activeTab === 'coins_info' && (
                <div className="space-y-3">
                  <div className="bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-400">
                    <div className="flex items-center gap-2 text-sm font-black text-[#8B4513] mb-1">
                      <Coins className="w-5 h-5 text-amber-600" />
                      <span>{t('coins', 'מטבעות')} ({coins})</span>
                    </div>
                    <p className="text-xs text-[#5D4037] font-bold leading-relaxed">
                      {t('whyCoins', 'מטבעות המשחק מדמים את המעות ההלכתיות')}
                    </p>
                  </div>

                  <div className="bg-amber-100/60 p-3.5 rounded-2xl border-2 border-amber-500">
                    <div className="flex items-center gap-2 text-sm font-black text-[#8B4513] mb-1">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>{t('stars', 'כוכבי חכמה')} ({stars})</span>
                    </div>
                    <p className="text-xs text-[#5D4037] font-bold leading-relaxed">
                      {t('learningRank', 'כוכבי החכמה אינם רק תחרות - הם מייצגים את עומק הידע והבנת ההלכה שרכשת!')}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: RANK & MASTERY */}
              {activeTab === 'rank' && (
                <div className="space-y-3 text-center">
                  <div className="bg-[#FDF6E3] p-4 rounded-2xl border-2 border-[#8B4513]">
                    <span className="text-xs text-[#8B4513] font-bold block mb-1">{t('learningRank', 'דרגת הלמידה')}:</span>
                    <h3 className="text-xl font-black text-[#8B4513] font-heading mb-1">
                      {currentRank.title}
                    </h3>
                    <span className="inline-block bg-[#8B4513] text-[#FFD700] text-xs font-black px-3 py-1 rounded-full border border-[#FFD700]">
                      {currentRank.badge}
                    </span>

                    <div className="mt-4 pt-3 border-t border-[#D2B48C] text-xs font-bold text-[#5D4037] space-y-1">
                      <p>✨ {t('stars', 'כוכבים')}: <span className="font-black text-[#8B4513]">{stars}</span></p>
                      <p>🪙 {t('coins', 'מטבעות')}: <span className="font-black text-[#8B4513]">{coins}</span></p>
                      <p>📜 Tasks Completed: <span className="font-black text-[#8B4513]">{completedTasksCount}</span></p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Close */}
            <div className="p-3 bg-[#FFF9E5] border-t-2 border-[#D2B48C] text-center">
              <button
                onClick={handleToggle}
                className="bg-[#8B4513] hover:bg-[#5D4037] text-white font-bold text-xs px-6 py-2 rounded-xl shadow-md transition-all active:translate-y-0.5"
              >
                {t('continueJourney', 'תודה עזריה! נמשיך במסע')} 🎒
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

