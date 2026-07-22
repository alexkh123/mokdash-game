import { HalachaTerm } from '../types';
import { SupportedLanguage } from '../context/LanguageContext';

export const HALACHA_TERMS: HalachaTerm[] = [
  {
    id: 'maaser_sheni',
    term: 'מעשר שני',
    hebrewTitle: 'פדיון מעשר שני',
    shortDesc: 'פדיון פירות השנה השנייה והרביעית במטבעות כסף כדי לאכול ולשמוח בירושלים.',
    fullDesc: 'בזמן בית המקדש, החקלאים הפרישו חלק מפירותיהם בשם "מעשר שני". כדי לא לסחוב משאות כבדים של פירות בדרך הארוכה, התורה איפשרה לפדות את הפירות במטבעות כסף ("חילול מעשר שני"), ואת המטבעות האלו להעלות לירושלים ולקנות בהם מזון, יין ושלמים למשתה החג!',
    sourceText: 'דברים יד, כג: "וְאָכַלְתָּ לִפְנֵי ה\' אֱלֹהֶיךָ בַּמָּקוֹם אֲשֶׁר יִבְחַר... מַעְשַׂר דְּגָנְךָ תִּירֹשְׁךָ וְיִצְהָרֶךָ"',
    category: 'מצוות העלייה',
    unlocked: true,
    icon: 'Coins'
  },
  {
    id: 'olat_reiyah',
    term: 'עולת ראייה',
    hebrewTitle: 'קורבן עולת ראייה',
    shortDesc: 'קורבן עולה שכל זכר מצווה להביא כשהוא נראה בבית המקדש בחג.',
    fullDesc: 'מצוות עשייה לעלות לרגל ולראות את פני ה\' בבית המקדש. קורבן העולה עולה כולו כליל למזבח, ומבטא את התמסרות האדם והכרת הטובה לה\'.',
    sourceText: 'שמות כג, טו: "וְלֹא יֵרָאוּ פָנַי רֵיקָם"',
    category: 'קורבנות',
    unlocked: true,
    icon: 'Flame'
  },
  {
    id: 'shalmei_chagigah',
    term: 'שלמי חגיגה',
    hebrewTitle: 'קורבן שלמי חגיגה',
    shortDesc: 'קורבן שלמים המובא ביום הראשון של החג לשמחת החוגגים.',
    fullDesc: 'שלמי חגיגה הם קורבן מיוחד שמקריבים בחג. חלק מהקורבן עולה על המזבח, חלק נתרם לכהנים, והחלק העיקרי נאכל על ידי הבעלים ומשפחתם בסעודת חג משמחת בירושלים!',
    sourceText: 'חגיגה א, א: "הַכֹּל חַיָּבִין בִּרְאִיָּה חוּץ מֵחֵרֵשׁ, שׁוֹטֶה וְקָטָן..."',
    category: 'קורבנות',
    unlocked: true,
    icon: 'Utensils'
  },
  {
    id: 'shalmei_simcha',
    term: 'שלמי שמחה',
    hebrewTitle: 'קורבן שלמי שמחה',
    shortDesc: 'קורבן שנועד להרבות בבשר לשמחת החג ולשיתוף העניים והענייות.',
    fullDesc: 'מצווה מפורשת בתורה לשמוח בחג ("וְשָׂמַחְתָּ בְּחַגֶּךָ"). מקריבים שלמי שמחה ומארחים בסעודה עניים, יתומים, אלמנות ולויים שאין להם חלק ונחלה.',
    sourceText: 'דברים טז, יד: "וְשָׂמַחְתָּ בְּחַגֶּךָ אַתָּה וּבִנְךָ וּבִתֶּךָ וְעַבְדְּךָ וַאֲמָתֶךָ והלוי והגר..."',
    category: 'קורבנות',
    unlocked: true,
    icon: 'HeartHandshake'
  },
  {
    id: 'tefilat_haderech',
    term: 'תפילת הדרך ושירי מעלות',
    hebrewTitle: 'תפילה ושירה בדרך',
    shortDesc: 'מזמורי התהילים והתפילות שהיו שרים העולים לרגל בדרכם לירושלים.',
    fullDesc: 'כשהשיירות צעדו במעלה הרי יהודה, העולים לרגל שרו יחד 15 מזמורי "שיר המעלות" (תהילים קכ-קלד) בליווי חלילים, תופים ושופרות. השירה איחדה את כל הלבבות בשמחה!',
    sourceText: 'תהילים קכב, א: "שָׂמַחְתִּי בְּאֹמְרִים לִי בֵּית ה\' נֵלֵךְ"',
    category: 'מצוות העלייה',
    unlocked: false,
    icon: 'Music'
  },
  {
    id: 'tahara_mikveh',
    term: 'טהרה במקווה',
    hebrewTitle: 'טבילה במי מקווה טהורים',
    shortDesc: 'היטהרות מלאה במים חיים לפני הכניסה להר הבית ולמקדש.',
    fullDesc: 'אדם שנכנס למקדש או נוגע בקודשים חייב להיות טהור. לפני העלייה להר הבית, יורדים אל המקווה החצוב בסלע ומודדים שטבילה שלמה תכסה את כל הגוף במים חיים שנאספו באופן טבעי.',
    sourceText: 'מיוחס לטהרת הקודש: "וטבלת והטהרת במימים חיים"',
    category: 'טהרה',
    unlocked: false,
    icon: 'Waves'
  },
  {
    id: 'bedikat_mum',
    term: 'בדיקת מום',
    hebrewTitle: 'בדיקה קפדנית ללא מום',
    shortDesc: 'איסור להקריב בעל חיים שיש בו מום (פגם גופני).',
    fullDesc: 'הקורבן המובא לה\' חייב להיות תמים ושלם מכל פגם – ללא פציעה, עיוורון, צליעה או שבר. הכהנים והבעלים בודקים היטב את האוזניים, הפיות, העיניים והרגליים של הבהמה.',
    sourceText: 'ויקרא כב, כא: "תָּמִים יִהְיֶה לְרָצוֹן כָּל מוּם לֹא יִהְיֶה בּוֹ"',
    category: 'קורבנות',
    unlocked: false,
    icon: 'Search'
  },
  {
    id: 'lishkat_heetzim',
    term: 'לשכת העצים',
    hebrewTitle: 'לשכת העצים בבית המקדש',
    shortDesc: 'הלשכה בה בדקו את העצים המיועדים למערכה שעל המזבח.',
    fullDesc: 'בלשכת העצים שבעזרת נשים ישבו כהנים זקנים ובדקו כל בול עץ. עץ שנמצאה בו תולעת היה פסול למזבח, מפני שרק עצים נקיים ויבשים כשרים לאש המערכה.',
    sourceText: 'משנה מידות ב, ה: "לִשְׁכַּת הָעֵצִים... שָׁם הָיוּ הַכֹּהֲנִים בָּעֲלֵי מוּמִין מַתְלִיעִין בָּעֵצִים"',
    category: 'המקדש',
    unlocked: false,
    icon: 'Trees'
  },
  {
    id: 'lishkat_hashemanim',
    term: 'לשכת השמנים',
    hebrewTitle: 'לשכת השמנים והסלתות',
    shortDesc: 'אחסון והפקת שמן זית זך וסולת נקייה למנורה ולמנחות.',
    fullDesc: 'בלשכת השמנים שזרו וכבשו זיתים משובחים מזיתי תקוע לקבלת "שמן זית זך כתית למאור". השמן שימש להדלקת המנורה הטהורה ולבלילת המנחות.',
    sourceText: 'שמות כז, כ: "וְיִקְחוּ אֵלֶיךָ שֶׁמֶן זַיִת זָךְ כָּתִית לַמָּאוֹר"',
    category: 'המקדש',
    unlocked: false,
    icon: 'Droplet'
  },
  {
    id: 'shirat_haleviim',
    term: 'שירת הלוויים',
    hebrewTitle: 'דוכן הלוויים ושירת הקודש',
    shortDesc: 'שירת הלוויים ונגינתם על חמש עשרה המדרגות בעזרת ישראל.',
    fullDesc: 'בזמן הקרבת הקורבנות וניסוך היין, הלוויים עמדו על הדוכן וניגנו בנבלים, כינורות, מצלתיים ושופרות ושרו את שיר של יום תחת כיפת השמיים.',
    sourceText: 'משנה ערכין ב, ו: "אין פוחתין משניים עשר לויים עומדין על הדוכן..."',
    category: 'המקדש',
    unlocked: false,
    icon: 'Sparkles'
  },
  {
    id: 'semichah',
    term: 'סמיכה',
    hebrewTitle: 'מצוות סמיכה על ראש הקורבן',
    shortDesc: 'הנחת שתי הידיים בכוח על ראש הבהמה לפני השחיטה.',
    fullDesc: 'העולה לרגל מניח את שתי ידיו בכל כוחו על ראש הקורבן בעזרת ישראל, ומתוודה או מביע תפילה והודיה לה\'. הסמיכה מחברת בין נשמת המביא לבין הקורבן.',
    sourceText: 'ויקרא א, ד: "וְסָמַךְ יָדוֹ עַל רֹאשׁ הָעֹלָה וְנِرְצָה לוֹ לְכַפֵּר עָלָיו"',
    category: 'קורבנות',
    unlocked: false,
    icon: 'Hand'
  },
  {
    id: 'avodat_hakohanim',
    term: 'זריקת הדם והקטרה',
    hebrewTitle: 'עבודת הכהנים במזבח',
    shortDesc: 'זריקת הדם על יסוד המזבח והקטרת האימורים באש הקודש.',
    fullDesc: 'הכהנים יחפי רגליים ולבושים בבגדי כהונה צחורים מקבלים את הדם במזרקי זהב, מוליכים אותו אל המזבח ומזליפים על הקרנות, ואז מעלים את החלבים והאימורים באש המערכה.',
    sourceText: 'ויקרא א, ה: "וְהִקְרִיבוּ בְנֵי אַהֲרֹן הַכֹּהֲנִים אֶת הַדָּם וְזָרְקוּ אֶת הַדָּם עַל הַמִּזְבֵּחַ סָבִיב"',
    category: 'קורבנות',
    unlocked: false,
    icon: 'Flame'
  }
];

export function getLocalizedHalachaTerms(lang: SupportedLanguage): HalachaTerm[] {
  if (lang === 'he') return HALACHA_TERMS;

  const locMap: Record<SupportedLanguage, Record<string, Partial<HalachaTerm>>> = {
    he: {},
    en: {
      maaser_sheni: { term: 'Ma\'aser Sheni', hebrewTitle: 'Second Tithe Redemption', shortDesc: 'Redeeming year 2 & 4 tithes with silver coins to spend in Jerusalem.', category: 'Pilgrimage Laws' },
      olat_reiyah: { term: 'Olat Re\'iyah', hebrewTitle: 'Burnt Offering of Appearance', shortDesc: 'Burnt offering brought by every male pilgrim appearing at the Temple.', category: 'Sacrifices' },
      shalmei_chagigah: { term: 'Shalmei Chagigah', hebrewTitle: 'Festival Peace Offerings', shortDesc: 'Peace offering sacrificed on the first festival day for celebration.', category: 'Sacrifices' },
      shalmei_simcha: { term: 'Shalmei Simcha', hebrewTitle: 'Joyous Peace Offerings', shortDesc: 'Sacrifices designated to share festive meat with the needy and Levites.', category: 'Sacrifices' },
      tefilat_haderech: { term: 'Pilgrim Songs', hebrewTitle: 'Songs of Ascents & Way Prayers', shortDesc: 'Psalms 120-134 sung by pilgrims ascending to Jerusalem.', category: 'Pilgrimage Laws' },
      tahara_mikveh: { term: 'Mikveh Purity', hebrewTitle: 'Ritual Immersion', shortDesc: 'Complete body immersion in living waters before entering Temple Mount.', category: 'Purity' },
      bedikat_mum: { term: 'Defect Inspection', hebrewTitle: 'Unblemished Animal Check', shortDesc: 'Strict requirement that sacrifices must be free of physical defects.', category: 'Sacrifices' },
      lishkat_heetzim: { term: 'Wood Chamber', hebrewTitle: 'Chamber of Altar Firewood', shortDesc: 'Chamber where priests inspected wood logs for altar fires.', category: 'The Temple' },
      lishkat_hashemanim: { term: 'Oil Chamber', hebrewTitle: 'Chamber of Oils & Flour', shortDesc: 'Storage and pressing of pure olive oil for the Menorah.', category: 'The Temple' },
      shirat_haleviim: { term: 'Levite Song', hebrewTitle: 'Levitical Choir & Orchestra', shortDesc: 'Psalms sung by Levites standing on the 15 steps during sacrifices.', category: 'The Temple' },
      semichah: { term: 'Semikha', hebrewTitle: 'Laying of Hands', shortDesc: 'Pressing both hands on the sacrifice head before ritual slaughter.', category: 'Sacrifices' },
      avodat_hakohanim: { term: 'Priestly Service', hebrewTitle: 'Blood Sprinkling & Incense', shortDesc: 'Barefoot priests carrying blood in gold basins to the Altar.', category: 'Sacrifices' }
    },
    ru: {
      maaser_sheni: { term: 'Маасер Шени', hebrewTitle: 'Выкуп Второй десятины', shortDesc: 'Выкуп плодов серебряными монетами для трапезы в Иерусалиме.', category: 'Законы Паломничества' },
      olat_reiyah: { term: 'Олат Реия', hebrewTitle: 'Жертва всесожжения явления', shortDesc: 'Жертва всесожжения, приносимая каждым мужчиной в Храме.', category: 'Жертвоприношения' },
      shalmei_chagigah: { term: 'Шламей Хагига', hebrewTitle: 'Праздничная мирная жертва', shortDesc: 'Мирная жертва в первый день праздника для веселья.', category: 'Жертвоприношения' },
      shalmei_simcha: { term: 'Шламей Симха', hebrewTitle: 'Жертва праздничной радости', shortDesc: 'Жертва для угощения бедных, сирот и левитов.', category: 'Жертвоприношения' },
      tefilat_haderech: { term: 'Песни Восхождения', hebrewTitle: 'Молитва и песнопения в пути', shortDesc: 'Псалмы 120-134, исполняемые паломниками по дороге в Иерусалим.', category: 'Законы Паломничества' },
      tahara_mikveh: { term: 'Очищение в Микве', hebrewTitle: 'Ритуальное омовение', shortDesc: 'Полное погружение в живую воду перед входом на Храмовую Гору.', category: 'Очищение' },
      bedikat_mum: { term: 'Проверка на пороки', hebrewTitle: 'Осмотр жертвенного животного', shortDesc: 'Строгий запрет на принесение животного с изъянами.', category: 'Жертвоприношения' },
      lishkat_heetzim: { term: 'Палата Дров', hebrewTitle: 'Храмовая палата дров', shortDesc: 'Палата, где священники проверяли дрова для жертвенника.', category: 'Храм' },
      lishkat_hashemanim: { term: 'Палата Масел', hebrewTitle: 'Палата елея и муки', shortDesc: 'Хранение чистейшего оливкового масла для Меноры.', category: 'Храм' },
      shirat_haleviim: { term: 'Песнь Левитов', hebrewTitle: 'Хор и оркестр левитов', shortDesc: 'Песнопения левитов на 15 ступенях во время службы.', category: 'Храм' },
      semichah: { term: 'Семиха', hebrewTitle: 'Возложение рук', shortDesc: 'Возложение рук на голову жертвенного животного перед закланием.', category: 'Жертвоприношения' },
      avodat_hakohanim: { term: 'Служение Священников', hebrewTitle: 'Кропление кровью и воскурение', shortDesc: 'Священники окропляют жертвенник кровью из золотых чаш.', category: 'Жертвоприношения' }
    },
    es: {
      maaser_sheni: { term: 'Ma\'aser Shení', hebrewTitle: 'Rescate del Segundo Diezmo', shortDesc: 'Rescate de frutos con monedas de plata para festejar en Jerusalén.', category: 'Leyes de Peregrinación' },
      olat_reiyah: { term: 'Olat Reiyá', hebrewTitle: 'Holocausto de Presentación', shortDesc: 'Holocausto ofrecido por todo varón al presentarse en el Templo.', category: 'Sacrificios' },
      shalmei_chagigah: { term: 'Shalmei Chagigá', hebrewTitle: 'Ofrenda de Paz Festiva', shortDesc: 'Ofrenda de paz ofrecida el primer día para la alegría festiva.', category: 'Sacrificios' },
      shalmei_simcha: { term: 'Shalmei Simjá', hebrewTitle: 'Ofrenda de Alegría', shortDesc: 'Ofrendas para compartir carne festiva con necesitados y Levitas.', category: 'Sacrificios' },
      tefilat_haderech: { term: 'Cánticos Graduales', hebrewTitle: 'Cánticos de Subida', shortDesc: 'Salmos 120-134 cantados por peregrinos camino a Jerusalén.', category: 'Leyes de Peregrinación' },
      tahara_mikveh: { term: 'Purificación en Mikvé', hebrewTitle: 'Inmersión Ritual', shortDesc: 'Inmersión completa en agua viva antes de entrar al Monte del Templo.', category: 'Pureza' },
      bedikat_mum: { term: 'Inspección de Defectos', hebrewTitle: 'Revisión del Animal', shortDesc: 'Prohibición de ofrecer animales con defectos físicos.', category: 'Sacrificios' },
      lishkat_heetzim: { term: 'Cámara de la Leña', hebrewTitle: 'Almacén de Madera del Altar', shortDesc: 'Recinto donde sacerdotes inspeccionaban leña para el Altar.', category: 'El Templo' },
      lishkat_hashemanim: { term: 'Cámara de los Aceites', hebrewTitle: 'Depósito de Aceite y Harina', shortDesc: 'Prensado de aceite puro de oliva para la Menorá.', category: 'El Templo' },
      shirat_haleviim: { term: 'Canto Levita', hebrewTitle: 'Coro y Orquesta Levita', shortDesc: 'Salmos entonados por Levitas en las 15 gradas del Templo.', category: 'El Templo' },
      semichah: { term: 'Semijá', hebrewTitle: 'Imposición de Manos', shortDesc: 'Presionar ambas manos sobre la cabeza del sacrificio.', category: 'Sacrificios' },
      avodat_hakohanim: { term: 'Servicio Sacerdotal', hebrewTitle: 'Aspersión de Sangre', shortDesc: 'Sacerdotes descalzos con recipientes de oro aspergando el Altar.', category: 'Sacrificios' }
    },
    pt: {
      maaser_sheni: { term: 'Ma\'aser Sheni', hebrewTitle: 'Resgate do Segundo Dízimo', shortDesc: 'Resgate de frutos com moedas de prata para celebração em Jerusalém.', category: 'Leis de Peregrinação' },
      olat_reiyah: { term: 'Olat Re\'iyah', hebrewTitle: 'Holocausto de Apresentação', shortDesc: 'Holocausto oferecido por todo homem ao apresentar-se no Templo.', category: 'Sacrifícios' },
      shalmei_chagigah: { term: 'Shalmei Chagigah', hebrewTitle: 'Oferta de Paz Festiva', shortDesc: 'Sacrifício de paz no primeiro dia da festa para celebração.', category: 'Sacrifícios' },
      shalmei_simcha: { term: 'Shalmei Simcha', hebrewTitle: 'Oferta de Alegria', shortDesc: 'Sacrifícios para compartilhar carne festiva com necessitados e Levitas.', category: 'Sacrifícios' },
      tefilat_haderech: { term: 'Cânticos dos Degraus', hebrewTitle: 'Orações da Caminhada', shortDesc: 'Salmos 120-134 cantados por peregrinos rumo a Jerusalém.', category: 'Leis de Peregrinação' },
      tahara_mikveh: { term: 'Purificação na Mikve', hebrewTitle: 'Imersão Ritual', shortDesc: 'Imersão completa em águas vivas antes de entrar no Monte do Templo.', category: 'Pureza' },
      bedikat_mum: { term: 'Inspeção de Defeitos', hebrewTitle: 'Exame do Animal', shortDesc: 'Exigência de que os sacrifícios estejam livres de defeitos.', category: 'Sacrifícios' },
      lishkat_heetzim: { term: 'Câmara da Lenha', hebrewTitle: 'Depósito de Madeira do Altar', shortDesc: 'Recinto onde sacerdotes inspecionavam lenha para o Altar.', category: 'O Templo' },
      lishkat_hashemanim: { term: 'Câmara dos Azeitarios', hebrewTitle: 'Depósito de Azeite Puro', shortDesc: 'Prensagem de azeite de oliva puro para a Menorá.', category: 'O Templo' },
      shirat_haleviim: { term: 'Cântico Levita', hebrewTitle: 'Coro e Orquestra Levita', shortDesc: 'Salmos cantados por Levitas nos 15 degraus do Templo.', category: 'O Templo' },
      semichah: { term: 'Semikhah', hebrewTitle: 'Imposição de Mãos', shortDesc: 'Pressionar ambas as mãos sobre a cabeça do animal sacrifical.', category: 'Sacrifícios' },
      avodat_hakohanim: { term: 'Serviço Sacerdotal', hebrewTitle: 'Aspersão de Sangue', shortDesc: 'Sacerdotes descalços levando sangue em bacias de ouro ao Altar.', category: 'Sacrifícios' }
    },
    fr: {
      maaser_sheni: { term: 'Ma\'asser Chéni', hebrewTitle: 'Rachat de la Seconde Dîme', shortDesc: 'Rachat des fruits avec des pièces d\'argent pour banquet à Jérusalem.', category: 'Lois du Pèlerinage' },
      olat_reiyah: { term: 'Olat Re\'iya', hebrewTitle: 'Holocauste de Présentation', shortDesc: 'Holocauste offert par chaque homme se présentant au Temple.', category: 'Sacrifices' },
      shalmei_chagigah: { term: 'Chalmei Chagiga', hebrewTitle: 'Sacrifice de Paix Festif', shortDesc: 'Sacrifice de paix offert le premier jour de fête.', category: 'Sacrifices' },
      shalmei_simcha: { term: 'Chalmei Sim\'ha', hebrewTitle: 'Sacrifice de la Joie', shortDesc: 'Sacrifices destinés à partager la viande festive avec les démunis.', category: 'Sacrifices' },
      tefilat_haderech: { term: 'Cantiques des Degrés', hebrewTitle: 'Chants et Prières de Route', shortDesc: 'Psaumes 120-134 chantés par les pèlerins vers Jérusalem.', category: 'Lois du Pèlerinage' },
      tahara_mikveh: { term: 'Purification au Mikvé', hebrewTitle: 'Immersion Rituelle', shortDesc: 'Immersion totale dans l\'eau vive avant d\'entrer au Mont du Temple.', category: 'Pureté' },
      bedikat_mum: { term: 'Inspection des Défauts', hebrewTitle: 'Examen de l\'Animal', shortDesc: 'Interdiction stricte d\'offrir un animal présentant un défaut.', category: 'Sacrifices' },
      lishkat_heetzim: { term: 'Salle du Bois', hebrewTitle: 'Dépôt du Bois de l\'Autel', shortDesc: 'Salle où les prêtres inspectaient les bûches pour l\'Autel.', category: 'Le Temple' },
      lishkat_hashemanim: { term: 'Salle des Huiles', hebrewTitle: 'Réserves d\'Huile et Farine', shortDesc: 'Pressage de l\'huile d\'olive pure pour la Ménora.', category: 'Le Temple' },
      shirat_haleviim: { term: 'Chant Lévitique', hebrewTitle: 'Chœur et Orchestre Lévitique', shortDesc: 'Psaumes chantés par les Lévites sur les 15 marches du Temple.', category: 'Le Temple' },
      semichah: { term: 'Semikha', hebrewTitle: 'Imposition des Mains', shortDesc: 'Appuyer les deux mains sur la tête du sacrifice avant l\'abattage.', category: 'Sacrifices' },
      avodat_hakohanim: { term: 'Service Sacerdotal', hebrewTitle: 'Aspersion du Sang', shortDesc: 'Prêtres pieds nus apportant le sang dans des récipients en or.', category: 'Sacrifices' }
    }
  };

  return HALACHA_TERMS.map((item) => {
    const override = locMap[lang]?.[item.id];
    if (!override) return item;
    return {
      ...item,
      term: override.term || item.term,
      hebrewTitle: override.hebrewTitle || item.hebrewTitle,
      shortDesc: override.shortDesc || item.shortDesc,
      category: override.category || item.category,
    };
  });
}

