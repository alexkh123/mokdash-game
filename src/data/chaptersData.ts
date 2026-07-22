import { ChapterId, Badge, InventoryItem } from '../types';

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
    title: 'פרק א\': הכנות בבית',
    subTitle: 'חצר הבית ביהודה',
    locationName: 'כפר ביהודה',
    description: 'החג מתקרב! עלינו לאסוף את פירות המעשר, לפדותם במטבעות כסף, לבחור את הקורבנות ולצרוך תרמיל מסע שמח.',
    tasks: [
      { id: 'c1_harvest', label: 'פדיון מעשר שני', instruction: 'גרור את התאנים והרימונים אל מטבעות הכסף כדי לפדות את המעשר!' },
      { id: 'c1_scroll', label: 'מגילת הקורבנות', instruction: 'פתחי את המגילה ובחרי את הקורבנות הדרושים לחג (עולה, שלמי חגיגה ושמחה).' },
      { id: 'c1_pack', label: 'אריזת התרמיל', instruction: 'גרור את הציוד החיוני (מימיה, בגדי חג, ארנק, סנדלים) אל תרמיל המסע!' }
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
    subTitle: 'חצרות המקדש והבלניות',
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

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'water', name: 'מימיה מעור', category: 'gear', icon: 'CupSoda', description: 'מימיית עור מלאה מים קרים למסע', quantity: 1 },
  { id: 'garments', name: 'בגדי חג לבנים', category: 'gear', icon: 'Shirt', description: 'בגדי כותנה צחורים ומכבסים לכבוד החג', quantity: 1 },
  { id: 'sandals', name: 'סנדלי מסע', category: 'gear', icon: 'Footprints', description: 'סנדלים עמידים להליכה בהרי יהודה', quantity: 1 },
  { id: 'staff', name: 'מקל הליכה', category: 'gear', icon: 'Wand2', description: 'מקל עץ אלון חזק לתמיכה בדרך', quantity: 1 }
];
