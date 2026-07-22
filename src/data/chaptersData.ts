import { ChapterId, Badge, InventoryItem } from '../types';
import { SupportedLanguage } from '../context/LanguageContext';

export interface ChapterMeta {
  id: ChapterId;
  title: string;
  subTitle: string;
  locationName: string;
  description: string;
  tasks: {
    id: string;
    label: string;
    instruction: string;
  }[];
  badgeAwarded: Badge;
}

export const CHAPTERS_META: ChapterMeta[] = [
  {
    id: 1,
    title: 'פרק א\': הכנות בחיפה',
    subTitle: 'חצר הבית בחיפה',
    locationName: 'חיפה - חוף הכרמל',
    description: 'מחיפה של מרגלות הכרמל אנו מתחילים את המסע והעלייה לרגל לירושלים! עלינו לחשב את פדיון מעשר שני והחומש, לענות על הלכות קורבנות ולצרוך תרמיל מסע בטהרה.',
    tasks: [
      { id: 'c1_harvest', label: 'פדיון מעשר שני', instruction: 'פתור את חישובי פדיון מעשר שני והחומש!' },
      { id: 'c1_scroll', label: 'חידון הקורבנות', instruction: 'ענה על שאלות ההלכה למגילת הקורבנות!' },
      { id: 'c1_pack', label: 'אריזת התרמיל', instruction: 'ענה על הלכות הטהרה וארוז את הציוד לדרך!' }
    ],
    badgeAwarded: {
      id: 'badge_maaser',
      title: 'מומחה מעשרות',
      description: 'פדית בהצלחה את פירות המעשר השני והכנת את תרמיל המסע!',
      icon: 'Coins',
      unlocked: false,
      unlockedChapter: 1
    }
  },
  {
    id: 2,
    title: 'פרק ב\': המסע לירושלים',
    subTitle: 'בשבילי ההר והמדבר',
    locationName: 'דרך עולי הרגל',
    description: 'יוצאים לדרך ברגל! בדרך נשיר את שירי המעלות, נעזור לנוסעים מתקשים, ונעמוד ביראת קודש בתצפית הר הצופים.',
    tasks: [
      { id: 'c2_song', label: 'שירי מעלות', instruction: 'לחץ בקצב הלהבות והצלילים כדי לשיר "שיר המעלות" עם שיירת עולי הרגל!' },
      { id: 'c2_hospitality', label: 'הכנסת אורחים', instruction: 'עזור למשפחה התקועה בדרך – גרור מים ולחם מהתרמיל להחזיר להם כוח!' },
      { id: 'c2_overlook', label: 'תצפית הר הצופים', instruction: 'הגעת לפסגת הר הצופים! לחץ כדי לברך ולצפות בבית המקדש ממרחק.' }
    ],
    badgeAwarded: {
      id: 'badge_road',
      title: 'נעים זמירות הדרך',
      description: 'שרת את שירי המעלות ועזרת לעולי הרגל בדרך לירושלים!',
      icon: 'Music',
      unlocked: false,
      unlockedChapter: 2
    }
  },
  {
    id: 3,
    title: 'פרק ג\': ירושלים וטהרה',
    subTitle: 'שוק ירושלים והמקווה',
    locationName: 'ירושלים העתיקה',
    description: 'הגענו לעיר הקודש! נקנה שה תמים בכספי המעשר, נבדוק שאין בו מום, וניתהר במים הטהורים של המקווה.',
    tasks: [
      { id: 'c3_market', label: 'קניית הקורבן', instruction: 'השתמש במטבעות המעשר לקנות שה צעיר ושמן זית בשוק ירושלים!' },
      { id: 'c3_inspection', label: 'בדיקת מום', instruction: 'השתמש בזכוכית המגדלת כדי לבדוק את האוזניים והרגליים של השה ולשלוט שאין מום!' },
      { id: 'c3_mikveh', label: 'טבילה במקווה', instruction: 'רד במדרגות האבן אל המקווה ולחץ 3 פעמים לטבילה מלאה במי טהרה!' }
    ],
    badgeAwarded: {
      id: 'badge_pure',
      title: 'טהור וזך',
      description: 'קנית שה תמים ללא מום והיטהרת במקווה הטהרה!',
      icon: 'Sparkles',
      unlocked: false,
      unlockedChapter: 3
    }
  },
  {
    id: 4,
    title: 'פרק ד\': הר הבית והלשכות',
    subTitle: 'חצרות המקדש והלשכות',
    locationName: 'הר הבית - עזרת נשים',
    description: 'נכנסים בשערי הר הבית המפוארים! נעזור בלשכת העצים לבדוק גזעים נקיים, ובלשכת השמנים נכבוש זיתים זכים.',
    tasks: [
      { id: 'c4_wood', label: 'לשכת העצים', instruction: 'בדוק את גזעי העץ והפרד עצים נקיים ללא תולעים עבור אש המזבח!' },
      { id: 'c4_oil', label: 'לשכת השמנים', instruction: 'לחץ על בית הבד בקצב הנכון כדי לסחוט שמן זית זך וכתית למנורה!' }
    ],
    badgeAwarded: {
      id: 'badge_service',
      title: 'נאמן הלשכות',
      description: 'בדרת עצים טהורים וסחטת שמן זית זך בבית המקדש!',
      icon: 'Droplet',
      unlocked: false,
      unlockedChapter: 4
    }
  },
  {
    id: 5,
    title: 'פרק ה\': עזרת ישראל ושירת הלוויים',
    subTitle: 'שער ניקנור והמזבח הגדול',
    locationName: 'עזרת ישראל והדוכן',
    description: 'עולים במדרגות שער ניקנור! הלוויים מנגנים על הדוכן, ועלינו לסדר את עצי המערכה על המזבח הגדול.',
    tasks: [
      { id: 'c5_orchestra', label: 'תזמורת הלוויים', instruction: 'נגן יחד עם הלוויים! לחץ על הנבל, הכינור והמצלתיים לפי קצב השיר.' },
      { id: 'c5_altar_logs', label: 'מערכת העצים', instruction: 'גרור את גזעי העץ הטהורים ובנה את אש המערכה הגדולה על המזבח!' }
    ],
    badgeAwarded: {
      id: 'badge_levite',
      title: 'מנצח הלוויים',
      description: 'ניגנת עם הלוויים על המדרגות ובנית את אש המערכה!',
      icon: 'Music2',
      unlocked: false,
      unlockedChapter: 5
    }
  },
  {
    id: 6,
    title: 'פרק ו\': הקרבת הקורבן ושמחת החג',
    subTitle: 'המזבח, עבודת הכהנים והשמחה',
    locationName: 'פנימיות המקדש וירושלים',
    description: 'רגע השיא! נסמוך את הידיים על ראש הקורבן, נצפה בעבודת הכהנים הזריזה ונחגוג בשמחת חג אדירה בכל ירושלים!',
    tasks: [
      { id: 'c6_semichah', label: 'מצוות סמיכה', instruction: 'לחץ והחזק את הידיים על ראש השה בכוונה שבלב ובוידוי.' },
      { id: 'c6_priest_service', label: 'עבודת הכהנים', instruction: 'צפה בעבודת הכהנים הנרגשת: זריקת הדם על המזבח והקטרת האימורים!' },
      { id: 'c6_celebration', label: 'שמחת החג הגדולה', instruction: 'לחץ כדי להתחיל את חגיגת שמחת החג, הזיקוקין והמשתה בירושלים!' }
    ],
    badgeAwarded: {
      id: 'badge_master',
      title: 'מאסטר עולה לרגל',
      description: 'השלמת את המסע כולו מעשיית המעשר בבית ועד שמחת החג בבית המקדש!',
      icon: 'Award',
      unlocked: false,
      unlockedChapter: 6
    }
  }
];

export function getLocalizedChapters(lang: SupportedLanguage): ChapterMeta[] {
  if (lang === 'he') return CHAPTERS_META;

  const dict: Record<SupportedLanguage, Record<number, Partial<ChapterMeta>>> = {
    he: {},
    en: {
      1: {
        title: 'Ch. 1: Preparations in Haifa',
        subTitle: 'Courtyard in Haifa',
        locationName: 'Haifa - Mt. Carmel Coast',
        description: 'Starting the pilgrimage to Jerusalem from Haifa at the foot of Mt. Carmel! Calculate Ma\'aser Sheni redemption and fifth-part tax, answer sacrificial laws, and pack for the journey.',
      },
      2: {
        title: 'Ch. 2: Journey to Jerusalem',
        subTitle: 'Mountain & Desert Trails',
        locationName: 'Pilgrim Highway',
        description: 'Journeying on foot to Jerusalem! Sing Songs of Ascents, extend hospitality to weary travelers, and gaze upon the Holy Temple from Mount Scopus.',
      },
      3: {
        title: 'Ch. 3: Jerusalem & Purity',
        subTitle: 'Market & Mikveh',
        locationName: 'Ancient Jerusalem',
        description: 'Arrived in Jerusalem! Purchase an unblemished lamb with Ma\'aser coins, inspect it for defects, and immerse in the pure Mikveh waters.',
      },
      4: {
        title: 'Ch. 4: Temple Mount & Chambers',
        subTitle: 'Courtyards & Chambers',
        locationName: 'Temple Mount Courtyard',
        description: 'Entering the magnificent gates of the Temple Mount! Inspect firewood logs in the Wood Chamber and press olive oil in the Oil Chamber.',
      },
      5: {
        title: 'Ch. 5: Israel\'s Courtyard & Levites',
        subTitle: 'Nicanor Gate & Altar',
        locationName: 'Israelite Courtyard',
        description: 'Ascending the Nicanor Gate steps! Play instruments with Levites on the platform and arrange pure altar wood on the Great Altar.',
      },
      6: {
        title: 'Ch. 6: Sacrifice & Festival Joy',
        subTitle: 'Priestly Service & Joy',
        locationName: 'Inner Temple & Jerusalem',
        description: 'The pinnacle moment! Perform Semikha hand laying, witness the swift Priestly service, and celebrate Simchat Beit Hashoeva joy across Jerusalem!',
      }
    },
    ru: {
      1: {
        title: 'Гл. 1: Приготовления в Хайфе',
        subTitle: 'Двор в Хайфе',
        locationName: 'Хайфа - Побережье Кармеля',
        description: 'Начинаем паломничество в Иерусалим прямо из Хайфы у подножия горы Кармель! Рассчитайте выкуп Второй десятины, ответьте на вопросы по жертвенным законам и соберите снаряжение.',
      },
      2: {
        title: 'Гл. 2: Путь в Иерусалим',
        subTitle: 'Горные тропы',
        locationName: 'Дорога Паломников',
        description: 'Отправляемся пешком! Исполняйте Песни восхождения, помогайте путникам и созерцайте Храм с горы Скопус.',
      },
      3: {
        title: 'Гл. 3: Иерусалим и Очищение',
        subTitle: 'Рынок и Миква',
        locationName: 'Древний Иерусалим',
        description: 'Мы прибыли в Святой город! Купите ягненка без порока на монеты десятины, проверьте его и омойтесь в микве.',
      },
      4: {
        title: 'Гл. 4: Храмовая Гора и Палаты',
        subTitle: 'Дворы и Хранилища',
        locationName: 'Двор Храмовой Горы',
        description: 'Входим через величественные врата Храмовой Горы! Проверяйте дрова для алтаря и отжимайте оливковое масло.',
      },
      5: {
        title: 'Гл. 5: Двор Израиля и Левиты',
        subTitle: 'Ворота Никанора и Альтарь',
        locationName: 'Двор Израильтян',
        description: 'Поднимаемся по ступеням Никанора! Играйте с левитами на инструментах и складывайте костер на жертвеннике.',
      },
      6: {
        title: 'Гл. 6: Жертвоприношение и Радость',
        subTitle: 'Служение Священников',
        locationName: 'Внутренний Храм',
        description: 'Кульминация! Возложите руки на голову жертвы, наблюдайте за службой священников и празднуйте великую радость!',
      }
    },
    es: {
      1: {
        title: 'Cap. 1: Preparativos en Haifa',
        subTitle: 'Patio en Haifa',
        locationName: 'Haifa - Costa del Carmelo',
        description: '¡Comenzando la peregrinación a Jerusalén desde Haifa al pie del Monte Carmelo! Calcula el rescate del Segundo Diezmo, responde sobre las leyes de sacrificios y prepara la mochila.',
      },
      2: {
        title: 'Cap. 2: Viaje a Jerusalén',
        subTitle: 'Senderos de Montaña',
        locationName: 'Camino del Peregrino',
        description: '¡A pie a Jerusalén! Canta Cánticos Graduales, brinda hospitalidad y contempla el Santo Templo desde el Monte Scopus.',
      },
      3: {
        title: 'Cap. 3: Jerusalén y Pureza',
        subTitle: 'Mercado y Mikvé',
        locationName: 'Antigua Jerusalén',
        description: '¡Llegamos a la Ciudad Santa! Compra un cordero perfecto con las monedas del diezmo, inspecciónalo y purifícate en la Mikvé.',
      },
      4: {
        title: 'Cap. 4: Monte del Templo',
        subTitle: 'Patios y Cámaras',
        locationName: 'Patio del Monte del Templo',
        description: '¡Entrando por las puertas del Monte del Templo! Revisa la leña en la Cámara de la Madera y prensa aceite de oliva.',
      },
      5: {
        title: 'Cap. 5: Patio de Israel',
        subTitle: 'Puerta de Nicanor',
        locationName: 'Patio de Israel',
        description: 'Subiendo los escalones de Nicanor. ¡Toca instrumentos con los Levitas y organiza la leña en el Gran Altar!',
      },
      6: {
        title: 'Cap. 6: Sacrificio y Alegría',
        subTitle: 'Servicio Sacerdotal',
        locationName: 'Interior del Templo',
        description: '¡El momento cumbre! Realiza la imposición de manos Semijá, contempla el servicio sacerdotal y ¡celebra con gran alegría!',
      }
    },
    pt: {
      1: {
        title: 'Cap. 1: Preparativos em Haifa',
        subTitle: 'Pátio em Haifa',
        locationName: 'Haifa - Costa do Carmelo',
        description: 'Iniciando a peregrinação para Jerusalém a partir de Haifa ao pé do Monte Carmelo! Calcule o resgate do Segundo Dízimo, responda sobre as leis de sacrifícios e arrume a mochila.',
      },
      2: {
        title: 'Cap. 2: Jornada para Jerusalém',
        subTitle: 'Trilhas da Montanha',
        locationName: 'Caminho do Peregrino',
        description: 'A pé para Jerusalém! Cante Cânticos dos Degraus, ajude os viajantes e contemple o Templo do Monte Scopus.',
      },
      3: {
        title: 'Cap. 3: Jerusalém e Pureza',
        subTitle: 'Mercado e Mikve',
        locationName: 'Jerusalém Antiga',
        description: 'Chegamos à Cidade Santa! Compre um cordeiro perfeito com moedas do dízimo, inspecione-o e purifique-se na Mikve.',
      },
      4: {
        title: 'Cap. 4: Monte do Templo',
        subTitle: 'Pátios e Câmaras',
        locationName: 'Pátio do Monte do Templo',
        description: 'Entrando pelos portões do Monte do Templo! Inspecione a lenha e esprema azeite de oliva puro.',
      },
      5: {
        title: 'Cap. 5: Pátio de Israel',
        subTitle: 'Portão de Nicanor',
        locationName: 'Pátio de Israel',
        description: 'Subindo os degraus de Nicanor. Toque instrumentos com os Levitas e arrume a lenha no Grande Altar!',
      },
      6: {
        title: 'Cap. 6: Sacrifício e Alegria',
        subTitle: 'Serviço Sacerdotal',
        locationName: 'Interior do Templo',
        description: 'O momento supremo! Faça a imposição de mãos Semikhah, assista ao serviço dos sacerdotes e celebre com júbilo!',
      }
    },
    fr: {
      1: {
        title: 'Ch. 1: Préparatifs à Haïfa',
        subTitle: 'Cour à Haïfa',
        locationName: 'Haïfa - Côte du Carmel',
        description: 'Commencement du pèlerinage vers Jérusalem depuis Haïfa au pied du Mont Carmel ! Calculez le rachat du Second Dîme, répondez aux lois des sacrifices et préparez votre sac.',
      },
      2: {
        title: 'Ch. 2: Voyage vers Jérusalem',
        subTitle: 'Sentiers de Montagne',
        locationName: 'Route des Pèlerins',
        description: 'En route à pied! Chantez les Cantiques des Degrés, aidez les pèlerins et contemplez le Temple depuis le Mont Scopus.',
      },
      3: {
        title: 'Ch. 3: Jérusalem et Pureté',
        subTitle: 'Marché et Mikvé',
        locationName: 'Jérusalem Antique',
        description: 'Arrivés dans la Ville Sainte! Achetez un agneau sans défaut, inspectez-le et purifiez-vous dans le Mikvé.',
      },
      4: {
        title: 'Ch. 4: Mont du Temple',
        subTitle: 'Parvis et Salles',
        locationName: 'Parvis du Mont du Temple',
        description: 'Pénétrez par les portes du Mont du Temple! Inspectez le bois dans la Salle du Bois et pressez l\'huile d\'olive purifiée.',
      },
      5: {
        title: 'Ch. 5: Parvis d\'Israël',
        subTitle: 'Porte de Nicanor',
        locationName: 'Parvis des Israélites',
        description: 'Montez les marches de Nicanor! Jouez de la musique avec les Lévites et disposez le bois pur sur le Grand Autel.',
      },
      6: {
        title: 'Ch. 6: Sacrifice et Joie',
        subTitle: 'Service Sacerdotal',
        locationName: 'Intérieur du Temple',
        description: 'Le moment culminant! Accomplissez l\'imposition des mains Semikha, observez le service sacerdotal et célébrez dans la joie!',
      }
    }
  };

  return CHAPTERS_META.map((ch) => {
    const override = dict[lang]?.[ch.id];
    if (!override) return ch;
    return {
      ...ch,
      title: override.title || ch.title,
      subTitle: override.subTitle || ch.subTitle,
      locationName: override.locationName || ch.locationName,
      description: override.description || ch.description,
    };
  });
}

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'water', name: 'מימיה מעור', category: 'gear', icon: 'CupSoda', description: 'מימיית עור מלאה מים קרים למסע', quantity: 1 },
  { id: 'garments', name: 'בגדי חג לבנים', category: 'gear', icon: 'Shirt', description: 'בגדי כותנה צחורים ומכבסים לכבוד החג', quantity: 1 },
  { id: 'sandals', name: 'סנדלי מסע', category: 'gear', icon: 'Footprints', description: 'סנדלים עמידים להליכה בהרי יהודה', quantity: 1 },
  { id: 'staff', name: 'מקל הליכה', category: 'gear', icon: 'Wand2', description: 'מקל עץ אלון חזק לתמיכה בדרך', quantity: 1 }
];

export function getLocalizedInventory(lang: SupportedLanguage): InventoryItem[] {
  if (lang === 'he') return INITIAL_INVENTORY;

  const names: Record<SupportedLanguage, Record<string, { name: string; desc: string }>> = {
    he: {},
    en: {
      water: { name: 'Leather Canteen', desc: 'Leather canteen filled with cold water for the journey' },
      garments: { name: 'White Festive Garments', desc: 'Pure white washed cotton garments for the holiday' },
      sandals: { name: 'Travel Sandals', desc: 'Durable leather sandals for hiking the Judaean hills' },
      staff: { name: 'Walking Staff', desc: 'Sturdy oak wooden staff for support along the way' },
    },
    ru: {
      water: { name: 'Кожаная фляגה', desc: 'Кожаная фляга, наполненная прохладной водой' },
      garments: { name: 'Праздничные белые одежды', desc: 'Чистые белые хлопковые одежды к празднику' },
      sandals: { name: 'Путевые сандалии', desc: 'Прочные сандалии для горных дорог Иудеи' },
      staff: { name: 'Походный посох', desc: 'Крепкий дубовый посох для опоры в пути' },
    },
    es: {
      water: { name: 'Cantimplora de Cuero', desc: 'Cantimplora de cuero llena de agua fresca para el viaje' },
      garments: { name: 'Ropas Blancas de Festín', desc: 'Ropas de algodón blanco y puro para la festividad' },
      sandals: { name: 'Sandalias de Viaje', desc: 'Sandalias duraderas para caminar por las colinas de Judea' },
      staff: { name: 'Bastón de Caminar', desc: 'Fuerte bastón de roble para apoyarse en el camino' },
    },
    pt: {
      water: { name: 'Cantil de Couro', desc: 'Cantil de couro cheio de água fresca para a jornada' },
      garments: { name: 'Roupas Brancas Festivas', desc: 'Roupas de algodão puro e limpo em honra à festa' },
      sandals: { name: 'Sandálias de Viagem', desc: 'Sandálias resistentes para caminhar pelas colinas de Judá' },
      staff: { name: 'Cajado de Caminhada', desc: 'Forte cajado de carvalho para apoio no caminho' },
    },
    fr: {
      water: { name: 'Gourde en Cuir', desc: 'Gourde en cuir remplie d\'eau fraîche pour le trajet' },
      garments: { name: 'Habits Blancs de Fête', desc: 'Vêtements en coton pur et blanc pour la célébration' },
      sandals: { name: 'Sandales de Marche', desc: 'Sandales en cuir solides pour parcourir les collines' },
      staff: { name: 'Bâton de Pèlerin', desc: 'Bâton en chêne solide pour s\'appuyer pendant la route' },
    }
  };

  return INITIAL_INVENTORY.map((item) => {
    const loc = names[lang]?.[item.id];
    if (!loc) return item;
    return {
      ...item,
      name: loc.name,
      description: loc.desc,
    };
  });
}

