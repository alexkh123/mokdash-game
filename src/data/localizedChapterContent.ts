import { SupportedLanguage } from '../context/LanguageContext';

export interface LocalizedTaskText {
  title: string;
  desc: string;
  details?: Record<string, any>;
}

export interface LocalizedBonusQuestion {
  source: string;
  question: string;
  options: string[];
  explanation: string;
}

export const LOCALIZED_CHAPTER_CONTENT: Record<SupportedLanguage, {
  c1: {
    title: string;
    subTitle: string;
    mikvehTitle: string;
    mikvehDesc: string;
    mikvehStep: string;
    firstFruitsTitle: string;
    firstFruitsDesc: string;
    basketFull: string;
    donkeyTitle: string;
    donkeyDesc: string;
    donkeyReady: string;
    bonusQuestions: LocalizedBonusQuestion[];
  };
  c2: {
    title: string;
    subTitle: string;
    waterTitle: string;
    waterDesc: string;
    waterSuccess: string;
    singingTitle: string;
    singingDesc: string;
    hospitalityTitle: string;
    hospitalityDesc: string;
    bonusQuestions: LocalizedBonusQuestion[];
  };
  c3: {
    title: string;
    subTitle: string;
    gateTitle: string;
    gateDesc: string;
    gateCorrect: string;
    greetingTitle: string;
    greetingDesc: string;
    greetingSuccess: string;
    maaserTitle: string;
    maaserDesc: string;
    maaserSuccess: string;
    bonusQuestions: LocalizedBonusQuestion[];
  };
  c4: {
    title: string;
    subTitle: string;
    shekelTitle: string;
    shekelDesc: string;
    shekelQuestion: string;
    woodTitle: string;
    woodDesc: string;
    oilTitle: string;
    oilDesc: string;
    oilQuizQuestion: string;
    oilOptions: string[];
    bonusQuestions: LocalizedBonusQuestion[];
  };
  c5: {
    title: string;
    subTitle: string;
    orchestraTitle: string;
    orchestraDesc: string;
    stairsQuestion: string;
    stairsOptions: string[];
    altarTitle: string;
    altarDesc: string;
    altarQuestion: string;
    altarOptions: string[];
    bonusQuestions: LocalizedBonusQuestion[];
  };
  c6: {
    title: string;
    subTitle: string;
    semichahTitle: string;
    semichahDesc: string;
    semichahHoldBtn: string;
    semichahQuestion: string;
    semichahOptions: string[];
    serviceTitle: string;
    serviceDesc: string;
    sequenceNames: Record<string, string>;
    resetBtn: string;
    simchahTitle: string;
    simchahDesc: string;
    simchahQuestion: string;
    simchahOptions: string[];
    celebrateBtn: string;
    bonusQuestions: LocalizedBonusQuestion[];
  };
}> = {
  he: {
    c1: {
      title: 'חיפה והגליל: ההכנות לעלייה לרגל',
      subTitle: 'טבילת טהרה, ליקוט ביכורים והעמסת הציוד',
      mikvehTitle: 'טבילה במקווה טהרה',
      mikvehDesc: 'לחץ על כפתור הטבילה 3 פעמים להטהרות מלאה',
      mikvehStep: 'טבול במקווה',
      firstFruitsTitle: 'קטיף וסריגת סל ביכורים',
      firstFruitsDesc: 'קטוף חיטה וגפנים לסל הביכורים',
      basketFull: 'סל הביכורים מלא ומעוטר!',
      donkeyTitle: 'העמסת חמור המסע',
      donkeyDesc: 'לחץ על החמור כדי להעמיס ציוד לדרך',
      donkeyReady: 'החמור מועמס ומוכן ליציאה!',
      bonusQuestions: [
        {
          source: 'משנה ביכורים פ"ג מ"א',
          question: 'כיצד מפרישין את הביכורים בשדה בעת הבשלתם?',
          options: [
            'רואה תאנה שביכרה - קושר עליה גמי ואומר: "הרי אלו ביכורים"',
            'קוטף את כל הפירות בבת אחת ושם בסל',
            'שורף את הפירות הראשונים לכבוד המזבח',
            'מוכר את הפירות הראשונים ונותן את המעות לעני',
          ],
          explanation: 'המשנה מפרשת: יורד אדם בתוך שדהו ורואה תאנה שביכרה, אשכול שביכר, קושר עליה גמי ואומר "הרי אלו ביכורים".',
        },
        {
          source: 'משנה ביכורים פ"ג מ"ג',
          question: 'איך היו מעטרים ומקשטים את השור שהלך בראש שיירת העולים לרגל?',
          options: [
            'קרניו מצופות זהב ועטרת זית בראשו',
            'מלבישים אותו בגדי ארגמן',
            'קשורים לקרניו פעמוני כסף',
            'אין מעטרים את השור כלל',
          ],
          explanation: 'השור שהלך לפניהם, קרניו מצופות זהב ועטרת של זית בראשו, כסמל לשבח הארץ ולשמחת המצווה.',
        },
      ],
    },
    c2: {
      title: 'הדרך לירושלים: מסע השיירה',
      subTitle: 'שאיבת מים מזככים, שירת שירי המעלות והכנסת אורחים',
      waterTitle: 'שאיבת מים זכים ממעיין בדרך',
      waterDesc: 'מלא את כד המים למסע בשיירה',
      waterSuccess: 'הכד מלא במים זכים!',
      singingTitle: 'שירת שירי המעלות בשיירה',
      singingDesc: 'לחץ להשמעת שיר המעלות בקול',
      hospitalityTitle: 'הכנסת אורחים ומזון לצעודים',
      hospitalityDesc: 'חלוק לחם ומים לעולים לרגל שצעדו בדרך',
      bonusQuestions: [
        {
          source: 'משנה ביכורים פ"ג מ"ב',
          question: 'איפה היו לנים העולים לרגל בדרך לירושלים, ומדוע?',
          options: [
            'ברחובה של עיר ולא בתוך הבתים, כדי שלא להיטמא באהל הטומאה',
            'בבתי מלון מפוארים בערים',
            'במערות בלבד',
            'בתוך בתיהם של אנשי העיר',
          ],
          explanation: 'העולים לרגל היו לנים ברחובה של עיר ולא נכנסו לבתים מחשש טומאת אוהל.',
        },
        {
          source: 'פסחים פ"ה מ"ז',
          question: 'מה פירוש "קריאת ההלל" במהלך הקרבת קורבן פסח ברגל?',
          options: [
            'הלויים היו קוראים את ההלל ומנגנים, והציבור עונים "הללויה"',
            'היו קוראים את ספר בראשית',
            'היו שרים שירי מלחמה',
            'היו שותקים ביראה',
          ],
          explanation: 'בזמן הקרבת הפסח היו הלויים קוראים את ההלל בשירה ובכלי שיר.',
        },
      ],
    },
    c3: {
      title: 'שערי ירושלים ופדיון מעשר שני',
      subTitle: 'בדיקת טהרה בשער, קבלת פנים נרגשת וחילוף מעות',
      gateTitle: 'בדיקת טהרה בכניסה לשער העיר',
      gateDesc: 'ענה נכונה לשומר השער כדי להיכנס לירושלים',
      gateCorrect: 'ברוך הבא לירושלים הקדושה!',
      greetingTitle: 'קבלת פנים על ידי אנשי ירושלים',
      greetingDesc: 'לחץ לברך ולהתברך על ידי תושבי העיר',
      greetingSuccess: 'תלינו בשלום ובשמחה בירושלים!',
      maaserTitle: 'חילוף מעות מעשר שני',
      maaserDesc: 'פדה את מעות המעשר לשם קניית מזון בירושלים',
      maaserSuccess: 'המעות נפדו בהצלחה!',
      bonusQuestions: [
        {
          source: 'משנה ביכורים פ"ג מ"ג',
          question: 'כיצד היו אנשי ירושלים ובעלי המלאכה מקבלים את פני העולים לרגל?',
          options: [
            'עומדים מפניהם ושואלים בשלומם: "אחינו אנשי המקום פלוני באתם לשלום!"',
            'דורשים מהם מס כניסה לעיר',
            'סוגרים את השערים לבדיקה ממושכת',
            'מתעלמים מהם וממשיכים בעבודתם',
          ],
          explanation: 'וכל בעלי אומניות שבירושלים עומדים לפניהם ושואלים בשלומם "אחינו אנשי מקום פלוני באתם לשלום".',
        },
      ],
    },
    c4: {
      title: 'הר הבית, לשכות העזרה ומס מחצית השקל',
      subTitle: 'חישוב מס המקדש, בדיקת עצי המערכה וכתישת זיתים',
      shekelTitle: 'חישוב מחצית השקל למשפחה',
      shekelDesc: 'כמה שקלים תשלם משפחה עם 8 גברים?',
      shekelQuestion: '8 גברים × 0.5 שקל = ?',
      woodTitle: 'בדיקת עצי המערכה בלשכת העצים',
      woodDesc: 'בדוק את הגזעים וודא שאין בהם תולעים',
      oilTitle: 'כתישת זיתים זכים בלשכת השמנים',
      oilDesc: 'כתוש זיתים לקבלת שמן זית זך למנורה',
      oilQuizQuestion: 'איזה שמן זית כשר להדלקת המנורה במקדש?',
      oilOptions: ['שמן זית זך מן הטיפה הראשונה', 'שמן כבוש מבושל', 'שמן מעורב בבשמים', 'כל שמן שמן'],
      bonusQuestions: [
        {
          source: 'משנה שקלים פ"א מ"א',
          question: 'באיזה תאריך בלוח העברי היו משמיעין על נתינת מחצית השקל?',
          options: ['באחד באדר', 'באחד בניסן', 'באחד בתשרי', 'בט"ו בשבט'],
          explanation: 'באחד באדר משמיעין על השקלים ועל הכלאיים.',
        },
      ],
    },
    c5: {
      title: 'העזרה הפנימית, שירת הלויים והמזבח',
      subTitle: 'נגינה בכלי הלויים, סידור עצי המערכה ואש התמיד',
      orchestraTitle: 'שירת ותזמורת הלויים על 15 המדרגות',
      orchestraDesc: 'נגן בנבל, כינור ומצילתיים ושיר מזמור',
      stairsQuestion: 'כמה מדרגות היו בין עזרת נשים לעזרת ישראל?',
      stairsOptions: ['15 מדרגות כנגד 15 שירי המעלות', '10 מדרגות', '7 מדרגות', '24 מדרגות'],
      altarTitle: 'סידור עצי המערכה על המזבח',
      altarDesc: 'הנח את הגזעים על המזבח להגדלת האש',
      altarQuestion: 'כמה מערכות אש היו על המזבח הגדול בכל יום?',
      altarOptions: ['3 מערכות אש', 'מערכת אחת בלבד', '5 מערכות', '12 מערכות'],
      bonusQuestions: [
        {
          source: 'משנה מידות פ"ג מ"ג',
          question: 'איפה עמד הכבש של המזבח?',
          options: ['בדרום המזבח, באורך 32 אמה וברוחב 16 אמה', ' בצפון המזבח', 'במזרח', 'במערב'],
          explanation: 'הכבש עמד בדרום המזבח ללא מדרגות כדי שלא יפסע הכהן פסיעה גסה.',
        },
      ],
    },
    c6: {
      title: 'סמיכת הידיים, סדר הקורבנות ושמחת החג',
      subTitle: 'סמיכת ידיים, סדר עבודת הכהנים וחגיגת שמחת בית השואבה',
      semichahTitle: 'מצוות סמיכת הידיים בשתי הידיים',
      semichahDesc: 'לחץ והחזק לסמיכת הידיים בכל הכוח',
      semichahHoldBtn: 'לחץ והחזק לסמיכה',
      semichahQuestion: 'כיצד מתקיימת מצוות סמיכה על הקורבן?',
      semichahOptions: ['בשתי הידיים ובכל כוחו בתוך העזרה', 'ביד אחת בלבד', 'בלחישה מחוץ לעזרה', 'על ידי מקל'],
      serviceTitle: 'סדר עבודת הקורבן בעזרה',
      serviceDesc: 'סדר את שלבי העבודה לפי הסדר הנכון',
      sequenceNames: {
        'שחיטה': 'שחיטה',
        'קבלה': 'קבלת הדם',
        'הולכה': 'הולכת הדם',
        'זריקה': 'זריקת הדם',
        'הקטרה': 'הקטרת אימורים',
      },
      resetBtn: 'אפס סדר',
      simchahTitle: 'שמחת החג ושמחת בית השואבה',
      simchahDesc: 'חגוג את שמחת בית השואבה בשירה ובריקודים',
      simchahQuestion: 'מה נאמר על שמחת בית השואבה במקדש?',
      simchahOptions: ['מי שלא ראה שמחת בית השואבה - לא ראה שמחה מימיו!', 'הייתה שמחה שקטה בלבד', 'התקיימה רק בלילה הראשון', 'נועדה לכהנים בלבד'],
      celebrateBtn: 'התחל בחגיגת השמחה! 🎉',
      bonusQuestions: [
        {
          source: 'משנה מנחות פ"ט מ"ח',
          question: 'באיזה כוח היו סומכים בשתי הידיים?',
          options: ['סמיכה בכל כוחו של בעל הקורבן בשתי ידיו', 'ברכות ביד אחת', 'מחוץ לעזרה', 'על ידי שליח בלבד'],
          explanation: 'מצוות סמיכה היא בשתי הידיים ובכל כוחו של בעל הקורבן.',
        },
      ],
    },
  },
  en: {
    c1: {
      title: 'Haifa & Galilee: Preparing for Pilgrimage',
      subTitle: 'Purification, harvesting First Fruits, loading gear',
      mikvehTitle: 'Ritual Purification Bath (Mikveh)',
      mikvehDesc: 'Tap the immerse button 3 times for full purification',
      mikvehStep: 'Immerse in Mikveh',
      firstFruitsTitle: 'Harvesting & Weaving First Fruits Basket',
      firstFruitsDesc: 'Harvest wheat and grapes into your decorated basket',
      basketFull: 'First Fruits basket is full & decorated!',
      donkeyTitle: 'Loading the Travel Donkey',
      donkeyDesc: 'Tap the donkey to load gear for the journey',
      donkeyReady: 'Donkey loaded & ready for the road!',
      bonusQuestions: [
        {
          source: 'Mishnah Bikkurim 3:1',
          question: 'How are First Fruits designated in the field as they ripen?',
          options: [
            'Sees a fig ripening - ties a reed around it and declares: "These are Bikkurim!"',
            'Picks all fruit at once into a basket',
            'Burns the first fruits on an altar',
            'Sells the first fruits and donates the proceeds',
          ],
          explanation: 'The Mishnah explains: One goes down to his field, sees a ripe fig or cluster, ties a reed around it, and declares "These are Bikkurim!".',
        },
      ],
    },
    c2: {
      title: 'The Road to Jerusalem: Journey of the Caravan',
      subTitle: 'Drawing spring water, singing Songs of Ascent, hosting guests',
      waterTitle: 'Drawing Pure Water from Roadside Spring',
      waterDesc: 'Fill the water jug for the caravan journey',
      waterSuccess: 'The jug is filled with pure water!',
      singingTitle: 'Singing Songs of Ascent in the Caravan',
      singingDesc: 'Tap to play the Song of Ascent aloud',
      hospitalityTitle: 'Welcoming & Feeding Fellow Pilgrims',
      hospitalityDesc: 'Distribute bread and water to weary walking pilgrims',
      bonusQuestions: [
        {
          source: 'Mishnah Bikkurim 3:2',
          question: 'Where did pilgrims lodge overnight on the way to Jerusalem?',
          options: [
            'In the city plaza outdoors, to avoid ritual tent-impurity',
            'In fancy city inns',
            'Only in caves',
            'Inside local homes',
          ],
          explanation: 'Pilgrims slept in open city plazas to avoid any potential ritual tent-impurity inside private homes.',
        },
      ],
    },
    c3: {
      title: 'Jerusalem Gates & Second Tithe Redemption',
      subTitle: 'Gate purity check, warm welcome, coin exchange',
      gateTitle: 'Purity Check at the City Gates',
      gateDesc: 'Answer the guard correctly to enter Holy Jerusalem',
      gateCorrect: 'Welcome to Holy Jerusalem!',
      greetingTitle: 'Warm Welcome by Jerusalem Citizens',
      greetingDesc: 'Tap to greet and be blessed by local city artisans',
      greetingSuccess: 'Lodged in peace and joy in Jerusalem!',
      maaserTitle: 'Exchanging Second Tithe Coins',
      maaserDesc: 'Redeem tithe coins to buy celebratory food in Jerusalem',
      maaserSuccess: 'Coins redeemed successfully!',
      bonusQuestions: [
        {
          source: 'Mishnah Bikkurim 3:3',
          question: 'How did Jerusalem craftsmen greet incoming pilgrims?',
          options: [
            'Stood before them and called out: "Brothers from such place, enter in peace!"',
            'Demanded an entry tax',
            'Closed the gates for lengthy inspection',
            'Ignored them and kept working',
          ],
          explanation: 'All Jerusalem craftsmen stood up and welcomed them warmly, calling them brothers.',
        },
      ],
    },
    c4: {
      title: 'Temple Mount, Chambers & Half-Shekel Tax',
      subTitle: 'Tax calculation, inspecting altar wood, olive pressing',
      shekelTitle: 'Calculating Half-Shekel Temple Tax',
      shekelDesc: 'How many Shekels will a family with 8 males pay?',
      shekelQuestion: '8 males × 0.5 Shekel = ?',
      woodTitle: 'Inspecting Altar Wood in the Wood Chamber',
      woodDesc: 'Examine logs to ensure no worm infestations',
      oilTitle: 'Pressing Pure Olives in the Oil Chamber',
      oilDesc: 'Press pure olive oil for the Menorah',
      oilQuizQuestion: 'Which olive oil is fit for the Temple Menorah?',
      oilOptions: ['Pure oil from the very first drop', 'Boiled crushed oil', 'Oil scented with perfumes', 'Any olive oil'],
      bonusQuestions: [
        {
          source: 'Mishnah Shekalim 1:1',
          question: 'On which date was the Half-Shekel tax announced every year?',
          options: ['1st of Adar', '1st of Nisan', '1st of Tishrei', '15th of Shevat'],
          explanation: 'On the 1st of Adar, announcements were made regarding the Half-Shekel tax.',
        },
      ],
    },
    c5: {
      title: 'Inner Courtyard, Levite Choir & Altar',
      subTitle: 'Playing Levite instruments, arranging altar fire logs',
      orchestraTitle: 'Levite Orchestra & Psalm on the 15 Steps',
      orchestraDesc: 'Play harp, lyre & cymbals while chanting psalms',
      stairsQuestion: 'How many steps led from Women’s Courtyard to Israel’s Courtyard?',
      stairsOptions: ['15 steps corresponding to 15 Songs of Ascent', '10 steps', '7 steps', '24 steps'],
      altarTitle: 'Arranging Altar Wood Stacks',
      altarDesc: 'Place logs on the altar to fuel the perpetual fire',
      altarQuestion: 'How many fire stacks burned daily on the main Altar?',
      altarOptions: ['3 fire stacks', 'Only 1 stack', '5 stacks', '12 stacks'],
      bonusQuestions: [
        {
          source: 'Mishnah Middot 3:3',
          question: 'Where was the main Altar Ramp located?',
          options: ['On the South side, 32 cubits long by 16 wide', 'On the North side', 'On the East', 'On the West'],
          explanation: 'The ramp was situated on the South side without steps to maintain modesty.',
        },
      ],
    },
    c6: {
      title: 'Laying of Hands, Sacrificial Order & Joy',
      subTitle: 'Semichah hold, priest service sequence, Simchat Beit HaShoevah',
      semichahTitle: 'Laying of Hands (Semichah) with Both Hands',
      semichahDesc: 'Press and hold to perform Semichah with full strength',
      semichahHoldBtn: 'Press & Hold for Semichah',
      semichahQuestion: 'How is Semichah performed on an offering?',
      semichahOptions: ['With both hands and full strength inside the Courtyard', 'With one hand gently', 'Outside the Courtyard', 'With a wooden staff'],
      serviceTitle: 'Sequence of Priestly Service in Courtyard',
      serviceDesc: 'Arrange the service steps in correct order',
      sequenceNames: {
        'שחיטה': 'Slaughtering (Shechitah)',
        'קבלה': 'Receiving Blood (Kabbalah)',
        'הולכה': 'Carrying Blood (Holachah)',
        'זריקה': 'Dashing Blood (Zrikah)',
        'הקטרה': 'Burning Parts (Haktarah)',
      },
      resetBtn: 'Reset Sequence',
      simchahTitle: 'Festival Joy & Simchat Beit HaShoevah',
      simchahDesc: 'Celebrate the Water Drawing festival with music and dancing',
      simchahQuestion: 'What is stated regarding Simchat Beit HaShoevah?',
      simchahOptions: ['One who has not seen Simchat Beit HaShoevah has never seen real joy!', 'It was a quiet event', 'Held only on night 1', 'Reserved for Priests only'],
      celebrateBtn: 'Start the Grand Celebration! 🎉',
      bonusQuestions: [
        {
          source: 'Mishnah Menachot 9:8',
          question: 'With what strength was Semichah performed?',
          options: ['With full physical force using both hands', 'Gently with one hand', 'Outside courtyard', 'Via messenger'],
          explanation: 'Semichah required leaning with full body strength inside the Courtyard.',
        },
      ],
    },
  },
  ru: {
    c1: {
      title: 'Хайфа и Галилея: Подготовка к паломничеству',
      subTitle: 'Омывание, сбор Первинок и погрузка снаряжения',
      mikvehTitle: 'Ритуальное омовение в Микве',
      mikvehDesc: 'Нажмите 3 раза для полного очищения',
      mikvehStep: 'Окунуться в Микву',
      firstFruitsTitle: 'Сбор и украшение Корзины Первинок',
      firstFruitsDesc: 'Соберите пшеницу и виноград в корзину',
      basketFull: 'Корзина Первинок заполнена и украшена!',
      donkeyTitle: 'Погрузка вьючного ослика',
      donkeyDesc: 'Нажмите на ослика, чтобы загрузить вещи',
      donkeyReady: 'Ослик загружен и готов к пути!',
      bonusQuestions: [
        {
          source: 'Мишна Бикурим 3:1',
          question: 'Как отмечают Первинки в поле при созревании?',
          options: ['Завязывают тростинку на созревшем плоде и объявляют Бикурим!', 'Срезают всё сразу', 'Сжигают на алтаре', 'Продают плоды'],
          explanation: 'Завязывают тростинку вокруг созревшего плода и объявляют Бикурим.',
        },
      ],
    },
    c2: {
      title: 'Дорога в Иерусалим: Караван',
      subTitle: 'Родниковая вода, Песни Восхождения и гостеприимство',
      waterTitle: 'Набор чистой родниковой воды',
      waterDesc: 'Наполните кувшин для каравана',
      waterSuccess: 'Кувшин полон чистой воды!',
      singingTitle: 'Пение Песен Восхождения',
      singingDesc: 'Нажмите, чтобы услышать Песнь Восхождения',
      hospitalityTitle: 'Угощение паломников',
      hospitalityDesc: 'Раздайте хлеб и воду идущим пешком',
      bonusQuestions: [
        {
          source: 'Мишна Бикурим 3:2',
          question: 'Где ночевали паломники по пути?',
          options: ['На городских площадях на открытом воздухе', 'В дорогих гостиницах', 'Только в пещерах', 'В домах'],
          explanation: 'Паломники ночевали на площадях, чтобы избежать ритуальной нечистоты.',
        },
      ],
    },
    c3: {
      title: 'Ворота Иерусалима и Выкуп Второй Десятины',
      subTitle: 'Проверка чистоты у ворот, встреча жителей, обмен монет',
      gateTitle: 'Проверка ритуальной чистоты у Ворот',
      gateDesc: 'Ответьте стражнику, чтобы войти в Иерусалим',
      gateCorrect: 'Добро пожаловать в Святой Иерусалим!',
      greetingTitle: 'Радушная встреча жителями',
      greetingDesc: 'Благословите ремесленников Иерусалима',
      greetingSuccess: 'Остановились в мире и радости!',
      maaserTitle: 'Обмен монет Второй Десятины',
      maaserDesc: 'Выкупите монеты для покупки еды в Иерусалиме',
      maaserSuccess: 'Монеты успешно выкуплены!',
      bonusQuestions: [],
    },
    c4: {
      title: 'Храмовая Гора и Налог Пол-Шекеля',
      subTitle: 'Подсчет налога, проверка дров, отжим елея',
      shekelTitle: 'Подсчет налога Пол-Шекеля',
      shekelDesc: 'Сколько шекелей заплатит семья из 8 мужчин?',
      shekelQuestion: '8 мужчин × 0.5 шекеля = ?',
      woodTitle: 'Проверка жертвенных дров',
      woodDesc: 'Осмотрите поленья на отсутствие червей',
      oilTitle: 'Отжим чистого елея для Меноры',
      oilDesc: 'Получите чистейшее оливковое масло',
      oilQuizQuestion: 'Какое масло подходит для Меноры?',
      oilOptions: ['Чистейшее масло первой капли', 'Вареное масло', 'Масло с духами', 'Любое масло'],
      bonusQuestions: [],
    },
    c5: {
      title: 'Внутренний Двор и Оркестр Левитов',
      subTitle: 'Игра на инструментах, укладка дров на Жертвенник',
      orchestraTitle: 'Оркестр Левитов на 15 ступенях',
      orchestraDesc: 'Играйте на арфе и цимбалах и пойте псалмы',
      stairsQuestion: 'Сколько ступеней вело во двор?',
      stairsOptions: ['15 ступеней по числу Песен Восхождения', '10 ступеней', '7 ступеней', '24 ступени'],
      altarTitle: 'Укладка дров на Жертвенник',
      altarDesc: 'Положите поленья в огонь Жертвенника',
      altarQuestion: 'Сколько костров горело на Жертвеннике?',
      altarOptions: ['3 костра', '1 костер', '5 костров', '12 костров'],
      bonusQuestions: [],
    },
    c6: {
      title: 'Возложение рук, Служение и Радость',
      subTitle: 'Семиха, порядок священнослужения и праздник',
      semichahTitle: 'Возложение рук (Семиха) двумя руками',
      semichahDesc: 'Нажмите и удерживайте для Возложения рук',
      semichahHoldBtn: 'Нажмите и удерживайте',
      semichahQuestion: 'Как совершается Семиха?',
      semichahOptions: ['Двумя руками со всей силой во дворе', 'Одной рукой', 'Вне двора', 'Палкой'],
      serviceTitle: 'Порядок священнослужения',
      serviceDesc: 'Расположите этапы в правильном порядке',
      sequenceNames: {
        'שחיטה': 'Заклание',
        'קבלה': 'Принятие крови',
        'הולכה': 'Кропление',
        'זריקה': 'Возкропление',
        'הקטרה': 'Воскурение',
      },
      resetBtn: 'Сбросить порядок',
      simchahTitle: 'Радость Праздника',
      simchahDesc: 'Празднуйте со сценой и танцами',
      simchahQuestion: 'Что сказано о Радости Водолития?',
      simchahOptions: ['Кто не видел этой радости, тот никогда не видел истинной радости!', 'Тихий праздник', 'Только 1 ночь', 'Только для священников'],
      celebrateBtn: 'Начать Праздник! 🎉',
      bonusQuestions: [],
    },
  },
  es: {
    c1: {
      title: 'Haifa y Galilea: Preparación para la Peregrinación',
      subTitle: 'Purificación, cosecha de Primicias y carga de equipaje',
      mikvehTitle: 'Baño de Purificación (Mikvé)',
      mikvehDesc: 'Toca el botón 3 veces para la purificación completa',
      mikvehStep: 'Sumergirse en el Mikvé',
      firstFruitsTitle: 'Cosecha de Primicias y Canasta',
      firstFruitsDesc: 'Cosecha trigo y uvas para tu canasta decorada',
      basketFull: '¡Canasta de Primicias completa y decorada!',
      donkeyTitle: 'Cargar el Asno de Viaje',
      donkeyDesc: 'Toca el asno para cargar el equipo de viaje',
      donkeyReady: '¡Asno cargado y listo para el camino!',
      bonusQuestions: [],
    },
    c2: {
      title: 'El Camino a Jerusalén: La Caravana',
      subTitle: 'Agua de manantial, Cánticos de Gradual y hospitalidad',
      waterTitle: 'Agua Pura de Manantial',
      waterDesc: 'Llena la jarra de agua para el viaje',
      waterSuccess: '¡Jarra llena de agua pura!',
      singingTitle: 'Cánticos de Gradual en la Caravana',
      singingDesc: 'Toca para escuchar el Cántico de Gradual',
      hospitalityTitle: 'Hospitalidad con Peregrinos',
      hospitalityDesc: 'Reparte pan y agua a los caminantes',
      bonusQuestions: [],
    },
    c3: {
      title: 'Puertas de Jerusalén y Redención del Diezmo',
      subTitle: 'Control de pureza, bienvenida cálida y cambio de monedas',
      gateTitle: 'Examen de Pureza en la Puerta',
      gateDesc: 'Responde correctamente al guardia para entrar',
      gateCorrect: '¡Bienvenido a la Santa Jerusalén!',
      greetingTitle: 'Bienvenida de los Ciudadanos',
      greetingDesc: 'Saluda a los artesanos de Jerusalén',
      greetingSuccess: '¡Alojados con paz y alegría!',
      maaserTitle: 'Cambio de Monedas del Segundo Diezmo',
      maaserDesc: 'Redime monedas para comprar comida festiva',
      maaserSuccess: '¡Monedas redimidas con éxito!',
      bonusQuestions: [],
    },
    c4: {
      title: 'Monte del Templo y Medio Siclo',
      subTitle: 'Cálculo del impuesto, inspección de leña y aceite',
      shekelTitle: 'Cálculo del Impuesto de Medio Siclo',
      shekelDesc: '¿Cuántos Siclos pagará una familia con 8 varones?',
      shekelQuestion: '8 varones × 0.5 Siclo = ?',
      woodTitle: 'Inspección de Leña en la Cámara',
      woodDesc: 'Examina los troncos para asegurarte de que no tengan gusanos',
      oilTitle: 'Prensado de Aceite para la Menorá',
      oilDesc: 'Prensa aceite puro de oliva',
      oilQuizQuestion: '¿Qué aceite es apto para la Menorá?',
      oilOptions: ['Aceite puro de la primera gota', 'Aceite hervido', 'Aceite con perfume', 'Cualquier aceite'],
      bonusQuestions: [],
    },
    c5: {
      title: 'Atrio Interior y Orquesta de Levitás',
      subTitle: 'Música sacra y acomodo de leña en el Altar',
      orchestraTitle: 'Orquesta de Levitás en los 15 Escalones',
      orchestraDesc: 'Toca arpa y címbalos entonando salmos',
      stairsQuestion: '¿Cuántos escalones había hacia el Atrio?',
      stairsOptions: ['15 escalones correspondientes a 15 Cánticos', '10 escalones', '7 escalones', '24 escalones'],
      altarTitle: 'Acomodo de Leña en el Altar',
      altarDesc: 'Coloca troncos en el fuego perpetuo del Altar',
      altarQuestion: '¿Cuántas piras de fuego ardían diariamente?',
      altarOptions: ['3 piras', '1 pira', '5 piras', '12 piras'],
      bonusQuestions: [],
    },
    c6: {
      title: 'Imposición de Manos y Alegría',
      subTitle: 'Semijá, orden sacerdotal y fiesta',
      semichahTitle: 'Imposición de Manos (Semijá)',
      semichahDesc: 'Mantiene presionado para hacer Semijá',
      semichahHoldBtn: 'Presiona y Mantén para Semijá',
      semichahQuestion: '¿Cómo se realiza la Semijá?',
      semichahOptions: ['Con ambas manos con toda la fuerza', 'Con una mano suavemente', 'Fuera del Atrio', 'Con una vara'],
      serviceTitle: 'Secuencia del Servicio Sacerdotal',
      serviceDesc: 'Ordena los pasos en la secuencia correcta',
      sequenceNames: {
        'שחיטה': 'Degüello',
        'קבלה': 'Recepción de Sangre',
        'הולכה': 'Llevada de Sangre',
        'זריקה': 'Aspersión de Sangre',
        'הקטרה': 'Quema de Porciones',
      },
      resetBtn: 'Reiniciar Orden',
      simchahTitle: 'Alegría de la Fiesta',
      simchahDesc: 'Celebra con música y danza',
      simchahQuestion: '¿Qué se dice sobre la Alegría del Templo?',
      simchahOptions: ['¡Quien no vio esta alegría nunca vio alegría en su vida!', 'Fue una fiesta silenciosa', 'Solo 1 noche', 'Solo para sacerdotes'],
      celebrateBtn: '¡Iniciar la Celebración! 🎉',
      bonusQuestions: [],
    },
  },
  pt: {
    c1: {
      title: 'Haifa e Galileia: Preparação para a Peregrinação',
      subTitle: 'Purificação, colheita de Primícias e carga',
      mikvehTitle: 'Banho de Purificação (Mikvé)',
      mikvehDesc: 'Toque 3 vezes para purificação completa',
      mikvehStep: 'Mergulhar no Mikvé',
      firstFruitsTitle: 'Colheita e Cesta de Primícias',
      firstFruitsDesc: 'Colha trigo e uvas para sua cesta',
      basketFull: 'Cesta de Primícias cheia e decorada!',
      donkeyTitle: 'Carregar o Jumento de Viagem',
      donkeyDesc: 'Toque no jumento para carregar a bagagem',
      donkeyReady: 'Jumento carregado e pronto para a estrada!',
      bonusQuestions: [],
    },
    c2: {
      title: 'O Caminho para Jerusalém: A Caravanas',
      subTitle: 'Água da fonte, Cânticos dos Degraus e hospitalidade',
      waterTitle: 'Água Pura da Fonte',
      waterDesc: 'Encha o jarro para a viagem',
      waterSuccess: 'Jarro cheio de água pura!',
      singingTitle: 'Cânticos dos Degraus',
      singingDesc: 'Toque para ouvir o Cântico dos Degraus',
      hospitalityTitle: 'Acolhimento aos Peregrinos',
      hospitalityDesc: 'Distribua pão e água aos caminhantes',
      bonusQuestions: [],
    },
    c3: {
      title: 'Portões de Jerusalém e Resgate do Dízimo',
      subTitle: 'Exame de pureza, recepção festiva e moedas',
      gateTitle: 'Exame de Pureza no Portão',
      gateDesc: 'Responda ao guarda para entrar',
      gateCorrect: 'Bem-vindo à Sagrada Jerusalém!',
      greetingTitle: 'Boas-vindas dos Cidadãos',
      greetingDesc: 'Saúde os artesãos de Jerusalém',
      greetingSuccess: 'Alojados em paz e alegria!',
      maaserTitle: 'Troca de Moedas do Segundo Dízimo',
      maaserDesc: 'Resgate moedas para comprar comida em Jerusalém',
      maaserSuccess: 'Moedas resgatadas com sucesso!',
      bonusQuestions: [],
    },
    c4: {
      title: 'Monte do Templo e Meio Shekel',
      subTitle: 'Cálculo da taxa, inspeção de lenha e azeite',
      shekelTitle: 'Cálculo do Imposto de Meio Shekel',
      shekelDesc: 'Quantos Shekels pagará uma família com 8 homens?',
      shekelQuestion: '8 homens × 0.5 Shekel = ?',
      woodTitle: 'Inspeção de Lenha na Câmara',
      woodDesc: 'Examine os troncos para ver se não têm vermes',
      oilTitle: 'Prensagem de Azeite para a Menorá',
      oilDesc: 'Prense azeite puro de oliva',
      oilQuizQuestion: 'Qual azeite é próprio para a Menorá?',
      oilOptions: ['Azeite puro da primeira gota', 'Azeite fervido', 'Azeite perfumado', 'Qualquer azeite'],
      bonusQuestions: [],
    },
    c5: {
      title: 'Átrio Interior e Orquestra dos Levitas',
      subTitle: 'Música sagrada e arranjo de lenha no Altar',
      orchestraTitle: 'Orquestra dos Levitas nos 15 Degraus',
      orchestraDesc: 'Toque harpa e címbalos cantando salmos',
      stairsQuestion: 'Quantos degraus levavam ao Átrio?',
      stairsOptions: ['15 degraus correspondentes a 15 Cânticos', '10 degraus', '7 degraus', '24 degraus'],
      altarTitle: 'Arranjo de Lenha no Altar',
      altarDesc: 'Coloque troncos no fogo do Altar',
      altarQuestion: 'Quantas piras de fogo queimavam diariamente?',
      altarOptions: ['3 piras', '1 pira', '5 piras', '12 piras'],
      bonusQuestions: [],
    },
    c6: {
      title: 'Imposição de Mãos e Alegria',
      subTitle: 'Semichá, ordem sacerdotal e celebração',
      semichahTitle: 'Imposição de Mãos (Semichá)',
      semichahDesc: 'Pressione e segure para fazer Semichá',
      semichahHoldBtn: 'Pressione e Segure para Semichá',
      semichahQuestion: 'Como se realiza a Semichá?',
      semichahOptions: ['Com ambas as mãos com toda força', 'Com uma mão suavemente', 'Fora do Átrio', 'Com um cajado'],
      serviceTitle: 'Sequência do Serviço Sacerdotal',
      serviceDesc: 'Ordene os passos na sequência correta',
      sequenceNames: {
        'שחיטה': 'Abate',
        'קבלה': 'Recepção do Sangue',
        'הולכה': 'Condução do Sangue',
        'זריקה': 'Aspersão do Sangue',
        'הקטרה': 'Queima das Porções',
      },
      resetBtn: 'Reiniciar Ordem',
      simchahTitle: 'Alegria da Festividade',
      simchahDesc: 'Celebre com música e dança',
      simchahQuestion: 'O que se diz sobre a Alegria do Templo?',
      simchahOptions: ['Quem não viu essa alegria nunca viu alegria em sua vida!', 'Foi uma festa silenciosa', 'Apenas 1 noite', 'Apenas para sacerdotes'],
      celebrateBtn: 'Iniciar a Grande Celebração! 🎉',
      bonusQuestions: [],
    },
  },
  fr: {
    c1: {
      title: 'Haïfa et la Galilée: Préparation au Pèlerinage',
      subTitle: 'Purification, récolte des Prémices et chargement',
      mikvehTitle: 'Bain de Purification (Mikvé)',
      mikvehDesc: 'Appuyez 3 fois pour une purification complète',
      mikvehStep: 'S\'immerger dans le Mikvé',
      firstFruitsTitle: 'Récolte des Prémices et Corbeille',
      firstFruitsDesc: 'Récoltez du blé et du raisin pour votre corbeille',
      basketFull: 'Corbeille de Prémices pleine et décorée!',
      donkeyTitle: 'Charger l\'Âne de Voyage',
      donkeyDesc: 'Appuyez sur l\'âne pour charger les bagages',
      donkeyReady: 'Âne chargé et prêt pour la route!',
      bonusQuestions: [],
    },
    c2: {
      title: 'La Route vers Jérusalem: La Caravane',
      subTitle: 'Eau de source, Cantiques des Degrés et hospitalité',
      waterTitle: 'Eau Pure de Source',
      waterDesc: 'Remplissez la cruche pour le voyage',
      waterSuccess: 'Cruche remplie d\'eau pure!',
      singingTitle: 'Cantiques des Degrés',
      singingDesc: 'Appuyez pour écouter le Cantique des Degrés',
      hospitalityTitle: 'Hospitalité envers les Pèlerins',
      hospitalityDesc: 'Distribuez du pain et de l\'eau aux marcheurs',
      bonusQuestions: [],
    },
    c3: {
      title: 'Portes de Jérusalem et Rachat de la Dîme',
      subTitle: 'Contrôle de pureté, accueil chaleureux et pièces',
      gateTitle: 'Examen de Pureté à la Porte',
      gateDesc: 'Répondez au garde pour entrer dans Jérusalem',
      gateCorrect: 'Bienvenue dans la Sainte Jérusalem!',
      greetingTitle: 'Accueil par les Citoyens',
      greetingDesc: 'Saluez les artisans de Jérusalem',
      greetingSuccess: 'Logés dans la paix et la joie!',
      maaserTitle: 'Échange de Pièces de la Seconde Dîme',
      maaserDesc: 'Rachetez vos pièces pour acheter de la nourriture',
      maaserSuccess: 'Pièces rachetées avec succès!',
      bonusQuestions: [],
    },
    c4: {
      title: 'Mont du Temple et Demi-Sicle',
      subTitle: 'Calcul de la taxe, inspection du bois et huile',
      shekelTitle: 'Calcul de la Taxe du Demi-Sicle',
      shekelDesc: 'Combien de Sicles paiera une famille de 8 hommes?',
      shekelQuestion: '8 hommes × 0.5 Sicle = ?',
      woodTitle: 'Inspection du Bois dans la Chambre',
      woodDesc: 'Examinez les bûches pour vérifier l\'absence de vers',
      oilTitle: 'Pressage de l\'Huile pour la Ménorah',
      oilDesc: 'Pressez de l\'huile d\'olive pure',
      oilQuizQuestion: 'Quelle huile convient pour la Ménorah?',
      oilOptions: ['Huile pure de la toute première goutte', 'Huile bouillie', 'Huile parfumée', 'Toute huile'],
      bonusQuestions: [],
    },
    c5: {
      title: 'Parvis Intérieur et Orchestre des Lévites',
      subTitle: 'Musique sacrée et disposition du bois sur l\'Autel',
      orchestraTitle: 'Orchestre des Lévites sur les 15 Marches',
      orchestraDesc: 'Jouez de la harpe et des cymbales en chantant',
      stairsQuestion: 'Combien de marches menaient au Parvis?',
      stairsOptions: ['15 marches correspondant aux 15 Cantiques', '10 marches', '7 marches', '24 marches'],
      altarTitle: 'Disposition du Bois sur l\'Autel',
      altarDesc: 'Placez des bûches sur le feu perpétuel',
      altarQuestion: 'Combien de bûchers brûlaient chaque jour?',
      altarOptions: ['3 bûchers', '1 seul bûcher', '5 bûchers', '12 bûchers'],
      bonusQuestions: [],
    },
    c6: {
      title: 'Imposition des Mains et Joie',
      subTitle: 'Sémikha, ordre sacerdotal et célébration',
      semichahTitle: 'Imposition des Mains (Sémikha)',
      semichahDesc: 'Maintenez appuyé pour effectuer la Sémikha',
      semichahHoldBtn: 'Maintenir appuyé pour Sémikha',
      semichahQuestion: 'Comment s\'effectue la Sémikha?',
      semichahOptions: ['Des deux mains de toute sa force dans le Parvis', 'D\'une seule main', 'Hors du Parvis', 'Avec un bâton'],
      serviceTitle: 'Séquence du Service Sacerdotal',
      serviceDesc: 'Ordonnez les étapes dans le bon ordre',
      sequenceNames: {
        'שחיטה': 'Abattage',
        'קבלה': 'Réception du Sang',
        'הולכה': 'Acheminement du Sang',
        'זריקה': 'Aspersion du Sang',
        'הקטרה': 'Incinération des Parts',
      },
      resetBtn: 'Réinitialiser L\'Ordre',
      simchahTitle: 'Joie de la Fête',
      simchahDesc: 'Célébrez avec musique et danse',
      simchahQuestion: 'Que dit-on de la Joie du Temple?',
      simchahOptions: ['Quiconque n\'a pas vu cette joie n\'a jamais vu de joie!', 'Fête silencieuse', '1 seule nuit', 'Reservé aux Prêtres'],
      celebrateBtn: 'Démarrer la Grande Célébration! 🎉',
      bonusQuestions: [],
    },
  },
};

export function getChapterContent(lang: SupportedLanguage) {
  return LOCALIZED_CHAPTER_CONTENT[lang] || LOCALIZED_CHAPTER_CONTENT['he'];
}
