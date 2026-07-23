import { SupportedLanguage } from '../context/LanguageContext';

export interface CalcProblem {
  id: number;
  fruitName: string;
  emoji: string;
  baseValue: number;
  chomesh: number;
  correctTotal: number;
  options: number[];
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  icon: string;
  packed: boolean;
  halakhaRule: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface AnimalCandidateData {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  type: 'sheep' | 'goat';
  hasBlemish: boolean;
  blemishedPart?: 'ears' | 'eyes' | 'legs';
  blemishTitle?: string;
  blemishDesc?: string;
}

// ==================== CHAPTER 1 ====================
export function getChapter1Questions(lang: SupportedLanguage) {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';

  const calcProblems: CalcProblem[] = [
    {
      id: 1,
      fruitName: isRu ? 'Корзина сладкого инжира' : isEn ? 'Basket of Sweet Figs' : isEs ? 'Cesta de higos dulces' : isPt ? 'Cesto de figos doces' : isFr ? 'Panier de figues douces' : 'סל תאנים מתוקות',
      emoji: '🫐',
      baseValue: 40,
      chomesh: 10,
      correctTotal: 50,
      options: [40, 48, 50, 60],
      explanation: isRu
        ? 'Стоимость 40 монет. По закону, выкупающий Вторую Десятину добавляет пятую часть (+25%) = 40 + 10 = 50 серебряных монет!'
        : isEn
        ? 'Fruit value 40 coins. By Halakha, redeeming Second Ma\'aser adds a fifth (+25%) = 40 + 10 = 50 coins!'
        : isEs
        ? 'Valor 40 monedas. Según la Jalajá, al redimir el Segundo Maaser se añade un quinto (+25%) = 40 + 10 = 50 monedas.'
        : isPt
        ? 'Valor 40 moedas. Segundo a Halachá, adiciona-se um quinto (+25%) = 40 + 10 = 50 moedas.'
        : isFr
        ? 'Valeur 40 pièces. Selon la Halakha, le rachat ajoute un cinquième (+25%) = 40 + 10 = 50 pièces.'
        : 'ערך הפירות 40 מטבעות. לפי ההלכה, הפודה מעשר שני מוסיף חומש (+25% מתחילה) = 40 + 10 = 50 מטבעות!',
    },
    {
      id: 2,
      fruitName: isRu ? 'Ящик отборных гранатов' : isEn ? 'Crate of Choice Pomegranates' : isEs ? 'Caja de granadas selectas' : isPt ? 'Caixa de romãs selecionadas' : isFr ? 'Caisse de grenades de choix' : 'ארגז רימונים מובחר',
      emoji: '🍎',
      baseValue: 80,
      chomesh: 20,
      correctTotal: 100,
      options: [80, 90, 100, 120],
      explanation: isRu
        ? 'Стоимость 80 монет. Пятая часть равна 20 монетам, итого сумма выкупа составляет 100 монет!'
        : isEn
        ? 'Fruit value 80 coins. The fifth addition is 20 coins, total redemption = 100 silver coins!'
        : isEs
        ? 'Valor 80 monedas. El quinto adicional son 20 monedas, total = 100 monedas de plata.'
        : isPt
        ? 'Valor 80 moedas. O quinto adicional é 20 moedas, total = 100 moedas de prata.'
        : isFr
        ? 'Valeur 80 pièces. Le cinquième supplémentaire est de 20 pièces, total = 100 pièces.'
        : 'ערך הפירות 80 מטבעות. תוספת חומש היא 20 מטבעות, ולכן סך הפדיון במטבעות כסף הוא 100 מטבעות!',
    },
    {
      id: 3,
      fruitName: isRu ? 'Кувшин чистого оливкового масла' : isEn ? 'Jar of Pure Olive Oil' : isEs ? 'Jarra de aceite de oliva puro' : isPt ? 'Jarra de azeite puro' : isFr ? 'Jarre d\'huile d\'olive pure' : 'כד שמן זית זך',
      emoji: '🫒',
      baseValue: 20,
      chomesh: 5,
      correctTotal: 25,
      options: [20, 24, 25, 30],
      explanation: isRu
        ? 'Стоимость масла 20 монет. Добавка пятой части равна 5 монетам, итого 25 серебряных монет!'
        : isEn
        ? 'Oil value 20 coins. The fifth addition is 5 coins, total redemption = 25 silver coins!'
        : isEs
        ? 'Valor 20 monedas. El quinto adicional son 5 monedas, total = 25 monedas de plata.'
        : isPt
        ? 'Valor 20 moedas. O quinto adicional é 5 moedas, total = 25 moedas de prata.'
        : isFr
        ? 'Valeur 20 pièces. Le cinquième supplémentaire est de 5 pièces, total = 25 pièces.'
        : 'ערך השמן 20 מטבעות. תוספת חומש היא 5 מטבעות, סך הכל 25 מטבעות כסף!',
    },
  ];

  const sacrificeQuiz: QuizQuestion[] = [
    {
      id: 1,
      question: isRu
        ? 'Какое из праздничных жертвоприношений полностью сжигается на жертвеннике и совсем не съедается?'
        : isEn
        ? 'Which festival sacrifice is burnt completely on the Altar and not eaten at all?'
        : isEs
        ? '¿Qué sacrificio festivo se quema por completo en el Altar y no se come en absoluto?'
        : isPt
        ? 'Qual sacrifício festivo é queimado completamente no Altar e não é comido de forma alguma?'
        : isFr
        ? 'Lequel des sacrifices de la fête est entièrement brûlé sur l\'Autel et n\'est pas consommé?'
        : 'איזה קורבן מעולות החג נשרף כליל על גבי המזבח ואינו נאכל כלל?',
      options: isRu
        ? ['Олат Райя (Всесожжение Паломничества)', 'Шлеймей Хагига (Праздничные)', 'Шлеймей Симха (Радостные)', 'Маасер Бегема (Десятина скота)']
        : isEn
        ? ['Olat Re\'iyah (Pilgrimage Burnt Offering)', 'Shalmei Chagigah', 'Shalmei Simcha', 'Animal Tithe']
        : isEs
        ? ['Olat Reiyáh (Ofrenda Entera)', 'Shalmei Jagigáh', 'Shalmei Simjá', 'Diezmo del ganado']
        : isPt
        ? ['Olat Reiyáh (Holocausto)', 'Shalmei Chagigáh', 'Shalmei Simchá', 'Dízimo dos animais']
        : isFr
        ? ['Olat Re\'iyah (Holocauste)', 'Chalmei Chagigah', 'Chalmei Simcha', 'Dîme du bétail']
        : ['עולת ראייה', 'שלמי חגיגה', 'שלמי שמחה', 'מעשר בהמה'],
      correctOption: 0,
      explanation: isRu
        ? 'Олат Райя полностью возносится на жертвеннике во имя Всевышнего и не съедается владельцами.'
        : isEn
        ? 'Olat Re\'iyah is offered completely to G-d on the Altar and is not consumed by the offerer.'
        : isEs
        ? 'Olat Reiyáh se ofrece totalmente en el Altar y no la consumen los dueños.'
        : isPt
        ? 'Olat Reiyáh é oferecida completamente no Altar e não é consumida pelos donos.'
        : isFr
        ? 'Olat Re\'iyah est offerte entièrement sur l\'Autel et n\'est pas consommée.'
        : 'עולת ראייה מוקרבת כליל לה\' על גבי המזבח ואינה נאכלת לבעלים.',
    },
    {
      id: 2,
      question: isRu
        ? 'На какие деньги разрешено покупать животных для Радостных Жертвоприношений в Иерусалиме?'
        : isEn
        ? 'From which funds may animals for Joyful Offerings (Shalmei Simcha) be purchased in Jerusalem?'
        : isEs
        ? '¿Con qué dinero se permite comprar animales para las Ofrendas de Alegría en Jerusalén?'
        : isPt
        ? 'Com que dinheiro é permitido comprar animais para as Ofertas de Alegria em Jerusalém?'
        : isFr
        ? 'Avec quel argent est-il permis d\'acheter des animaux pour les Sacrifices de Joie à Jérusalem?'
        : 'מאיזה כסף מותר לקנות בהמות לשלמי שמחה בירושלים?',
      options: isRu
        ? ['Деньги выкупленной Второй Десятины', 'Деньги Полшекеля', 'Только деньги Эрехин', 'Любые несвященные деньги']
        : isEn
        ? ['Redeemed Second Ma\'aser money', 'Half-Shekel fund', 'Arakhin valuation fund', 'Any non-sacred money']
        : isEs
        ? ['Dinero del Segundo Maaser redimido', 'Fondos del Medio Shekel', 'Fondos de Arajín', 'Cualquier dinero profano']
        : isPt
        ? ['Dinheiro do Segundo Maaser resgatado', 'Fundos do Meio Shekel', 'Fundos de Arakhin', 'Qualquer dinheiro comum']
        : isFr
        ? ['Argent de la Seconde Dîme rachetée', 'Fonds du Demi-Shekel', 'Fonds d\'Arakhin', 'Tout argent profane']
        : ['כספי מעשר שני שנפדו', 'כספי מחצית השקל', 'כספי ערכין בלבד', 'כל כסף שאינו קודש'],
      correctOption: 0,
      explanation: isRu
        ? 'Разрешено и заповедано покупать животных для праздничных трапез на деньги Второй Десятины!'
        : isEn
        ? 'It is permitted and commendable to purchase animals for Joyful Offerings using redeemed Second Ma\'aser funds!'
        : isEs
        ? '¡Es una mitzvá comprar animales para la alegría festiva con dinero del Segundo Maaser!'
        : isPt
        ? 'É uma mitzvah comprar animais para a alegria festiva com dinheiro do Segundo Maaser!'
        : isFr
        ? 'C\'est une mitzvah d\'acheter des animaux pour la joie de la fête avec l\'argent de la Seconde Dîme!'
        : 'מותר ואף מצווה לקנות בהמות לשלמי שמחה מכספי מעשר שני שנפדו!',
    },
  ];

  const packedGear: PackingItem[] = [
    {
      id: 'water',
      name: isRu ? 'Фляга с холодной водой' : isEn ? 'Canteen of Cool Water' : isEs ? 'Cantimplora de agua fresca' : isPt ? 'Cantil de água fresca' : isFr ? 'Gourde d\'eau fraîche' : 'מימיית מים צוננים',
      icon: '🥤',
      packed: false,
      halakhaRule: isRu ? 'Обязанность беречь здоровье на пути в Иерусалим' : isEn ? 'Obligation to protect health on the road to Jerusalem' : isEs ? 'Obligación de cuidar la salud en el camino' : isPt ? 'Obrigação de cuidar da saúde no caminho' : isFr ? 'Obligation de préserver sa santé en chemin' : 'חובה לשתות ולשמור על הבריאות בדרך העולה לירושלים',
      question: isRu ? 'Почему важно взять флягу с холодной водой в паломничество?' : isEn ? 'Why is it essential to bring cool water for the pilgrimage?' : isEs ? '¿Por qué es importante llevar agua fresca en la peregrinación?' : isPt ? 'Por que é importante levar água fresca na peregrinação?' : isFr ? 'Pourquoi est-il important d\'emporter de l\'eau fraîche pour le pèlerinage?' : 'מדוע חשוב להצטייד במימיית מים צוננים למסע העלייה לרגל?',
      options: isRu
        ? ['Забота о здоровье на пути в Иерусалим — важная заповедь', 'Запрещено пить из родников по дороге', 'Только чтобы охлаждать животных']
        : isEn
        ? ['Maintaining health and wellness on the road is an important mitzvah', 'It is forbidden to drink from roadside springs', 'Only to cool down animals']
        : isEs
        ? ['Cuidar la salud en el camino a Jerusalén es una mitzvá importante', 'Está prohibido beber de manantiales en el camino', 'Solo para refrescar a los animales']
        : isPt
        ? ['Cuidar da saúde no caminho para Jerusalém é uma mitzvah importante', 'É proibido beber de fontes no caminho', 'Apenas para resfriar os animais']
        : isFr
        ? ['Préserver sa santé en route vers Jérusalem est une mitzvah importante', 'Il est interdit de boire aux sources en chemin', 'Uniquement pour rafraîchir les animaux']
        : [
            'כי שמירת הגוף והבריאות בדרך לירושלים היא מצווה חשובה',
            'כי אסור לשתות מים ממעיינות בדרך',
            'כדי לצנן את הבהמות בלבד',
          ],
      correctOption: 0,
      explanation: isRu
        ? 'Заповедь "Берегите души ваши" учит нас, что забота о здоровье в пути — часть служения Всевышнему!'
        : isEn
        ? 'The Torah commands us to guard our health — preserving body wellness on the pilgrimage is sacred!'
        : isEs
        ? 'La Torá nos ordena cuidar nuestras vidas: ¡cuidar la salud en el viaje es parte del servicio divino!'
        : isPt
        ? 'A Torá nos ordena cuidar de nossas vidas: cuidar da saúde na viagem é parte do serviço divino!'
        : isFr
        ? 'La Torah nous ordonne de préserver notre vie: prendre soin de sa santé fait partie du service divin!'
        : 'התורה ציוותה אותנו "ונשמרתם מאוד לנפשותיכם" - שמירת בריאות הגוף בעלייה לרגל היא חלק מעבודת השם!',
    },
    {
      id: 'garments',
      name: isRu ? 'Чистые белые праздничные одежды' : isEn ? 'Clean White Festival Garments' : isEs ? 'Ropas blancas festivas' : isPt ? 'Roupas brancas festivas' : isFr ? 'Vêtements blancs de fête' : 'בגדי חג לבנים וטהורים',
      icon: '👔',
      packed: false,
      halakhaRule: isRu ? 'Паломники должны носить чистые белые одежды в честь праздника' : isEn ? 'Pilgrims must wear clean white clothes in honor of the festival' : isEs ? 'Es obligatorio llevar ropas limpias y blancas' : isPt ? 'É obrigatório usar roupas limpas e brancas' : isFr ? 'Il faut porter des vêtements propres et blancs' : 'חובה לעלות לרגל בבגדים נקיים ולבנים לכבוד החג',
      question: isRu ? 'Почему паломники надевают чистые белые праздничные одежды?' : isEn ? 'Why do pilgrims wear clean white festival garments?' : isEs ? '¿Por qué los peregrinos visten ropas festivas blancas y limpias?' : isPt ? 'Por que os peregrinos usam roupas festivas brancas e limpas?' : isFr ? 'Pourquoi les pèlerins portent-ils des vêtements blancs propres?' : 'מדוע העולים לרגל לובשים בגדי חג לבנים ונקיים?',
      options: isRu
        ? ['Белые одежды выражают уважение к Храму, чистоту и радость праздника', 'Запрещено носить цветную одежду', 'Священники требовали этого от всех']
        : isEn
        ? ['White clothes express respect for the Temple, purity, and festival joy', 'Colored garments are strictly forbidden', 'The Priests required this from everyone']
        : isEs
        ? ['Las ropas blancas expresan respeto por el Templo, pureza y alegría', 'Está prohibido vestir colores', 'Los sacerdotes lo exigían a todos']
        : isPt
        ? ['Roupas brancas expressam respeito pelo Templo, pureza e alegria', 'É proibido usar cores', 'Os sacerdotes exigiam isso de todos']
        : isFr
        ? ['Les vêtements blancs expriment le respect du Temple, la pureté et la joie', 'Les vêtements colorés sont interdits', 'Les prêtres l\'exigeaient de tous']
        : [
            'כי בגדי חג לבנים מבטאים כבוד למקדש, טהרה ושמחת יום טוב',
            'כי אסור ללבוש בגדים צבעוניים כלל',
            'כי הכהנים דרשו זאת מכל אדם',
          ],
      correctOption: 0,
      explanation: isRu
        ? 'Сказано: "И выстирают одежды свои" — достойный образ в белых одеждах проявляет уважение к Храму.'
        : isEn
        ? 'Scripture states "And wash their garments" — honorable appearance in white expresses Temple reverence.'
        : isEs
        ? 'Se dice "Y lavarán sus vestidos": una apariencia pura rinde honor al Templo.'
        : isPt
        ? 'Diz-se "E lavarão suas vestes": uma aparência pura presta honra ao Templo.'
        : isFr
        ? 'Il est dit "Et ils laveront leurs vêtements": une tenue pure rend hommage au Temple.'
        : 'נאמר "וכבסו שמלותם" - הופעה נקייה ומכובדת בבגדי חג לבנים היא מצווה לכבוד המקדש והשכינה.',
    },
    {
      id: 'sandals',
      name: isRu ? 'Походные сандалии (для дороги)' : isEn ? 'Walking Sandals (for the trail)' : isEs ? 'Sandalias de marcha (para el camino)' : isPt ? 'Sandálias de caminhada (para a estrada)' : isFr ? 'Sandales de marche (pour la route)' : 'סנדלי הליכה (ליציאה מהר הבית)',
      icon: '🥾',
      packed: false,
      halakhaRule: isRu ? 'Запрещено входить на Храмовую Гору в кожаной обуви, но разрешено в дороге' : isEn ? 'Leather shoes are forbidden on Temple Mount, but allowed on the trail' : isEs ? 'Prohibido entrar con calzado de cuero al Monte del Templo' : isPt ? 'Proibido entrar com calçado de couro no Monte do Templo' : isFr ? 'Interdit d\'entrer sur le Mont du Temple en chaussures de cuir' : 'אסור להיכנס להר הבית במנעל עור, אך מותר ללכת בהם בדרך',
      question: isRu ? 'Каков закон относительно кожаной обуви на Храмовой Горе?' : isEn ? 'What is the law regarding leather footwear on the Temple Mount?' : isEs ? '¿Cuál es la ley sobre el calzado de cuero en el Monte del Templo?' : isPt ? 'Qual é a lei sobre o calçado de couro no Monte do Templo?' : isFr ? 'Quelle est la règle concernant les chaussures en cuir sur le Mont du Temple?' : 'מהי ההלכה לגבי נעילת מנעלי עור (סנדלים) בהר הבית?',
      options: isRu
        ? ['Разрешено ходить в них по дороге, но запрещено входить на Храмовую Гору из почтения к Храму', 'Обязательно входить на Храмовую Гору только в кожаных сандалиях', 'Запрещено носить обувь вообще, даже по дороге']
        : isEn
        ? ['Permitted on the travel road, but forbidden on Temple Mount out of reverence', 'Mandatory to enter Temple Mount wearing leather sandals', 'Forbidden to wear shoes anywhere on the pilgrimage']
        : isEs
        ? ['Permitido en el camino, pero prohibido en el Monte del Templo por veneración', 'Obligatorio entrar al Monte del Templo con calzado de cuero', 'Prohibido usar zapatos en todo el viaje']
        : isPt
        ? ['Permitido no caminho, mas proibido no Monte do Templo por veneração', 'Obrigatório entrar no Monte do Templo com calçado de couro', 'Proibido usar sapatos em toda a viagem']
        : isFr
        ? ['Permis sur la route, mais interdit sur le Mont du Temple par respect', 'Obligatoire d\'entrer sur le Mont du Temple en chaussures de cuir', 'Interdit de porter des chaussures tout au long du voyage']
        : [
            'מותר ללכת בהם בדרך, אך אסור להיכנס בהם להר הבית משום מורא מקדש',
            'חובה להיכנס להר הבית בסנדלי עור בלבד',
            'אסור לנעול נעליים בכלל אפילו בדרך לירושלים',
          ],
      correctOption: 0,
      explanation: isRu
        ? 'Сказано: "Сними обувь твою с ног твоих" — на Храмовую Гору входят босиком или в некожаной обуви!'
        : isEn
        ? 'It is said "Remove your shoes from your feet" — one enters Temple Mount barefoot or in non-leather footwear!'
        : isEs
        ? 'Se dice "Quítate el calzado": se entra al Monte del Templo descalzo o sin cuero.'
        : isPt
        ? 'Diz-se "Tire os sapatos": entra-se no Monte do Templo descalço ou sem couro.'
        : isFr
        ? 'Il est dit "Ote tes souliers": on entre sur le Mont du Temple pieds nus ou sans cuir.'
        : 'נאמר "של נעליך מעל רגליך" - להר הבית נכנסים יחפים או במנעל שאינו של עור משום כבוד המקדש!',
    },
    {
      id: 'purse',
      name: isRu ? 'Кошелек с монетами Второй Десятины' : isEn ? 'Purse of Second Ma\'aser Coins' : isEs ? 'Bolsa de monedas del Segundo Maaser' : isPt ? 'Bolsa de moedas do Segundo Maaser' : isFr ? 'Bourse de pièces de la Seconde Dîme' : 'צרור מטבעות מעשר שני',
      icon: '💰',
      packed: false,
      halakhaRule: isRu ? 'Выкуп Второй Десятины для покупки еды и радости в Иерусалиме' : isEn ? 'Redeeming Second Ma\'aser to buy food and feast in Jerusalem' : isEs ? 'Redención del Segundo Maaser para comprar comida y regocijarse' : isPt ? 'Resgate do Segundo Maaser para comprar comida e alegrar-se' : isFr ? 'Rachat de la Seconde Dîme pour acheter de la nourriture' : 'פדיון פירות מעשר שני לקניית מזון ושמחה בירושלים',
      question: isRu ? 'Как исполняется заповедь Второй Десятины в Иерусалиме?' : isEn ? 'How is the mitzvah of Second Ma\'aser fulfilled in Jerusalem?' : isEs ? '¿Cómo se cumple la mitzvá del Segundo Maaser en Jerusalén?' : isPt ? 'Como se cumpre a mitzvah do Segundo Maaser em Jerusalém?' : isFr ? 'Comment accomplit-on la mitzvah de la Seconde Dîme à Jérusalem?' : 'כיצד מקיימים את מצוות מעשר שני בירושלים?',
      options: isRu
        ? ['Покупают на монеты еду, плоды и праздничные жертвы для радостной трапезы', 'Отдают монеты стражнику у городских ворот', 'Сжигают монеты']
        : isEn
        ? ['Use coins to buy food, fruits, and peace offerings to feast joyfully in Jerusalem', 'Give the coins to the gate guard at the city walls', 'Burn the coins']
        : isEs
        ? ['Comprar comida, frutas y ofrendas para comer con alegría en Jerusalén', 'Entregar las monedas al guardián de la puerta', 'Quemar las monedas']
        : isPt
        ? ['Comprar comida, frutas e ofertas para comer com alegria em Jerusalém', 'Entregar as moedas ao guarda do portão', 'Queimar as moedas']
        : isFr
        ? ['Acheter de la nourriture, des fruits et des sacrifices pour banqueter dans la joie', 'Donner les pièces au garde de la porte', 'Brûler les pièces']
        : [
            'קונים במעות מזון, פירות ושלמי שמחה לאכול בשמחה בירושלים',
            'נותנים את המטבעות לשומר בשער העיר',
            'שורפים את המטבעות בבית הדשן',
          ],
      correctOption: 0,
      explanation: isRu
        ? 'Вторая Десятина предназначена для радостной и чистой трапезы в Иерусалиме для умножения Торы и радости!'
        : isEn
        ? 'Second Ma\'aser is meant to be eaten in pure joy in Jerusalem to increase Torah and happiness in the Holy City!'
        : isEs
        ? 'El Segundo Maaser es para comerlo en pureza y alegría en Jerusalén.'
        : isPt
        ? 'O Segundo Maaser é para ser comido em pureza e alegria em Jerusalém.'
        : isFr
        ? 'La Seconde Dîme est destinée à être consommée dans la joie et la pureté à Jérusalem.'
        : 'מעשר שני נועד להיאכל בשמחה ובטהרה בירושלים כדי להרבות שמחה ולימוד תורה בעיר הקודש!',
    },
  ];

  return { calcProblems, sacrificeQuiz, packedGear };
}

// ==================== CHAPTER 2 ====================
export function getChapter2Questions(lang: SupportedLanguage) {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';

  const demaiQuestion: QuizQuestion = {
    id: 1,
    question: isRu
      ? '❓ Задача по Галахе: Если останавливаешься в постоялом дворе у "Ам ха-Арец" (простолюдина), что нужно отделить из сомнения?'
      : isEn
      ? '❓ Halakha Challenge: When staying at a roadside inn hosted by "Am HaAretz", what tithe is required due to doubt?'
      : isEs
      ? '❓ Desafío de Jalajá: Al hospedarse en una posada de un "Am HaAretz", ¿qué diezmo se exige por duda?'
      : isPt
      ? '❓ Desafio de Halachá: Ao se hospedar numa estalagem de um "Am HaAretz", qual dízimo é exigido por dúvida?'
      : isFr
      ? '❓ Défi de Halakha: En séjournant dans une auberge tenue par un "Am HaAretz", quelle dîme est requise par doute?'
      : '❓ אתגר הלכה: כשמתארחים בפונדק דרכים אצל "עם הארץ", מה חייבים לעשר מספק?',
    options: isRu
      ? [
          'Не нужно отделять вообще, так как хозяин считается надежным',
          'Вторую Десятину и Трумат Маасер (закон Демаи)',
          'Только Большую Труму',
        ]
      : isEn
      ? [
          'No tithing required because the host is presumed reliable',
          'Second Ma\'aser and Ma\'aser Tithe only (Law of Demai)',
          'Great Terumah only',
        ]
      : isEs
      ? [
          'No requiere diezmar porque el anfitrión se presume digno de confianza',
          'Segundo Maaser y Terumat Maaser solamente (Ley de Demai)',
          'Solo Terumá Gedolá',
        ]
      : isPt
      ? [
          'Não é necessário dizimar porque o anfitrião é presumido confiável',
          'Segundo Maaser e Terumat Maaser apenas (Lei de Demai)',
          'Apenas Terumá Gedolá',
        ]
      : isFr
      ? [
          'Pas besoin de prélever car l\'hôte est présumé fiable',
          'Seconde Dîme et Prélèvement de Dîme seulement (Loi de Demai)',
          'Grande Teroumah uniquement',
        ]
      : [
          'אינו צריך לעשר כלל כי הארח בחזקת כשרות',
          'מעשר שני ותרומת מעשר בלבד (דין דמאי)',
          'חייב להפריש תרומה גדולה בלבד',
        ],
    correctOption: 1,
  };

  const overlookQuestion: QuizQuestion = {
    id: 2,
    question: isRu
      ? '❓ Кто из следующих освобожден от заповеди "Олат Райя" (Всесожжения Паломничества) по Торе?'
      : isEn
      ? '❓ Who among the following is exempt from the Torah commandment of "Olat Re\'iyah"?'
      : isEs
      ? '❓ ¿Quién de los siguientes está exento de la mitzvá de "Olat Reiyáh" según la Torá?'
      : isPt
      ? '❓ Quem dos seguintes está isento da mitzvah de "Olat Reiyáh" segundo a Torá?'
      : isFr
      ? '❓ Qui parmi les suivants est exempté de la mitzvah d\'"Olat Re\'iyah" selon la Torah?'
      : '❓ מי מהבאים פטור ממצוות "עולת ראייה" מן התורה?',
    options: isRu
      ? [
          'Глухонемой, недееспособный, несовершеннолетний и тот, кто не может поднимться пешком',
          'Только тот, у кого нет земли в Земле Израиля',
          'Только совершивший паломничество в прошлом году',
        ]
      : isEn
      ? [
          'Deaf-mute, mentally incapacitated, minor, and unable to walk up on foot',
          'Only one who owns no land in the Land of Israel',
          'Only one who made the pilgrimage last year',
        ]
      : isEs
      ? [
          'Sordomudo, incapaz, menor y quien no puede subir a pie',
          'Solo quien no posee tierras en la Tierra de Israel',
          'Solo quien hizo la peregrinación el año pasado',
        ]
      : isPt
      ? [
          'Surdo-mudo, incapaz, menor e quem não pode subir a pé',
          'Apenas quem não possui terras na Terra de Israel',
          'Apenas quem fez a peregrinação no ano passado',
        ]
      : isFr
      ? [
          'Sourd-muet, incapable, mineur et quiconque ne peut monter à pied',
          'Seulement celui qui ne possède pas de terre en Israël',
          'Seulement celui qui a fait le pèlerinage l\'an dernier',
        ]
      : [
          'חרש, שוטה, קטן, ומי שאינו יכול לעלות ברגליו',
          'מי שאין לו קרקע בארץ ישראל בלבד',
          'רק מי שעלה לרגל בשנה שעברה',
        ],
    correctOption: 0,
  };

  return { demaiQuestion, overlookQuestion };
}

// ==================== CHAPTER 3 ====================
export function getChapter3Questions(lang: SupportedLanguage) {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';

  const animals: AnimalCandidateData[] = [
    {
      id: 'animal_1',
      name: isRu ? 'Ягненок №1 — "Золотое руно"' : isEn ? 'Lamb #1 - "Golden Fleece"' : isEs ? 'Cordero #1 - "Vellocino de oro"' : isPt ? 'Cordeiro #1 - "Lã de Ouro"' : isFr ? 'Agneau #1 - "Toison d\'or"' : 'כבש א׳ - "צמר זהב"',
      subtitle: isRu ? 'Нежный ягненок с Голанских высот' : isEn ? 'Tender lamb from Golan Heights' : isEs ? 'Tierno cordero del Golán' : isPt ? 'Cordeiro do Golan' : isFr ? 'Tendre agneau du Golan' : 'שה רך מרמת הגולן',
      icon: '🐑',
      type: 'sheep',
      hasBlemish: true,
      blemishedPart: 'ears',
      blemishTitle: isRu ? 'Трещина в ухе (изъян уха)' : isEn ? 'Split Ear Blemish' : isEs ? 'Oreja hendida' : isPt ? 'Orelha rachada' : isFr ? 'Oreille fendue' : 'אוזן סדוקה (פגם באוזן)',
      blemishDesc: isRu
        ? 'При осмотре через лупу обнаружена трещина в мочке уха. По законам трактата Бехорот, дефект уха делает жертву непригодной!'
        : isEn
        ? 'Magnifying glass inspection reveals a slit in ear lobe. By tractate Bekhorot, ear blemish invalidates the sacrifice!'
        : isEs
        ? '¡La lupa revela una grieta en la oreja. Según Bejorot, invalida la ofrenda!'
        : isPt
        ? 'O exame revela uma fissura na orelha. Segundo Bechorot, invalida a oferta!'
        : isFr
        ? 'L\'examen à la loupe révèle une fente à l\'oreille. Selon Bekhorot, cela invalide l\'offrande!'
        : 'בבדיקת זכוכית המגדלת נמצא סדק עמוק בתנוך האוזן. לפי מסכת בכורות, מום באוזן פוסל קורבן!',
    },
    {
      id: 'animal_2',
      name: isRu ? 'Козленок №2 — "Горный козлик"' : isEn ? 'Goat #2 - "Mountain Kid"' : isEs ? 'Cabrito #2 - "De las montañas"' : isPt ? 'Cabrito #2 - "Das Montanhas"' : isFr ? 'Chevreau #2 - "Des montagnes"' : 'גדי ב׳ - "גדי ההרים"',
      subtitle: isRu ? 'Козленок из Иудейских гор' : isEn ? 'Goat from Judean Hills' : isEs ? 'Cabrito de las colinas de Judea' : isPt ? 'Cabrito dos montes de Judeia' : isFr ? 'Chevreau des collines de Judée' : 'גדי עיזים מהרי יהודה',
      icon: '🐐',
      type: 'goat',
      hasBlemish: true,
      blemishedPart: 'eyes',
      blemishTitle: isRu ? 'Помутнение глаза (бельмо)' : isEn ? 'Cataract / Eye Blemish' : isEs ? 'Nube en el ojo' : isPt ? 'Catarata no olho' : isFr ? 'Cataracte à l\'œil' : 'עין עכורה (דק בעין)',
      blemishDesc: isRu
        ? 'Осмотр через лупу выявил белую мутную пленку на зрачке. Бельмо на глазу является явным изъяном!'
        : isEn
        ? 'Magnifying glass inspection reveals a cloudy white film over the pupil — a disqualifying eye blemish!'
        : isEs
        ? '¡Capa blanca opaca en la pupila, un defecto visible que invalida la ofrenda!'
        : isPt
        ? 'Firme camada branca sobre a pupila, um defeito visível que invalida!'
        : isFr
        ? 'Voile blanc opaque sur la pupille, un défaut visible qui invalide!'
        : 'בבדיקת זכוכית המגדלת נמצא קרום לבן ועכור על האישון. דק בעין הינו מום גלוי הפוסל קורבן!',
    },
    {
      id: 'animal_3',
      name: isRu ? 'Ягненок №3 — "Совершенный ягненок"' : isEn ? 'Lamb #3 - "Unblemished Lamb"' : isEs ? 'Cordero #3 - "Sin defecto"' : isPt ? 'Cordeiro #3 - "Sem defeito"' : isFr ? 'Agneau #3 - "Sans défaut"' : 'כבש ג׳ - "שה תמים"',
      subtitle: isRu ? 'Годовалый самец без единого изъяна' : isEn ? 'One-year-old male goat/sheep with zero blemishes' : isEs ? 'Macho de un año totalmente puro' : isPt ? 'Macho de um ano totalmente puro' : isFr ? 'Mâle d\'un an totalement pur' : 'שה זכר בן שנתו שאין בו מום',
      icon: '🐑',
      type: 'sheep',
      hasBlemish: false,
    },
  ];

  const pairDefinitions = [
    { pairId: 1, icon: '🐑', name: isRu ? 'Совершенный ягненок' : isEn ? 'Unblemished Lamb' : isEs ? 'Cordero puro' : isPt ? 'Cordeiro puro' : isFr ? 'Agneau pur' : 'שה תמים' },
    { pairId: 2, icon: '🐐', name: isRu ? 'Горный козленок' : isEn ? 'Mountain Goat' : isEs ? 'Cabrito' : isPt ? 'Cabrito' : isFr ? 'Chevreau' : 'גדי עיזים' },
    { pairId: 3, icon: '🫖', name: isRu ? 'Кувшин оливкового масла' : isEn ? 'Jar of Olive Oil' : isEs ? 'Jarra de aceite' : isPt ? 'Jarra de azeite' : isFr ? 'Jarre d\'huile' : 'כד שמן זית' },
    { pairId: 4, icon: '🕊️', name: isRu ? 'Чистая горлица' : isEn ? 'Kosher Turtle-dove' : isEs ? 'Tórtola kosher' : isPt ? 'Rola kosher' : isFr ? 'Tourterelle pure' : 'תור כשר' },
  ];

  return { animals, pairDefinitions };
}

// ==================== CHAPTER 4 ====================
export function getChapter4Questions(lang: SupportedLanguage) {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';

  const oilQuestion: QuizQuestion = {
    id: 1,
    question: isRu
      ? '❓ Галахический вопрос: Какое оливковое масло пригодно для Меноры и храмовых жертвоприношений?'
      : isEn
      ? '❓ Halakha Question: Which olive oil is valid for the Menorah and Temple offerings?'
      : isEs
      ? '❓ Pregunta de Jalajá: ¿Qué aceite de oliva es apto para la Menorá y las ofrendas?'
      : isPt
      ? '❓ Pergunta de Halachá: Qual azeite de oliva é válido para a Menorá e ofertas?'
      : isFr
      ? '❓ Question de Halakha: Quelle huile d\'olive est valide pour la Menorah et les offrandes?'
      : '❓ שאלת הלכה: איזה שמן זית כשר וטהור להדלקת המנורה ולמנחות המקדש?',
    options: isRu
      ? [
          'Чистое масло первой выжимки из верхушек оливковых деревьев',
          'Любое оливковое масло из магазина',
          'Масло, выжатое с добавлением воды',
        ]
      : isEn
      ? [
          'Pure, first-press oil from the top branches of the olive tree',
          'Any store-bought olive oil',
          'Oil pressed with added water',
        ]
      : isEs
      ? [
          'Aceite puro de primera prensada de las ramas superiores',
          'Cualquier aceite de oliva comercial',
          'Aceite prensado con agua añadida',
        ]
      : isPt
      ? [
          'Azeite puro da primeira prensagem dos ramos superiores',
          'Qualquer azeite de oliva comercial',
          'Azeite prensado com água adicionada',
        ]
      : isFr
      ? [
          'Huile pure de première pression des branches supérieures',
          'Toute huile d\'olive du commerce',
          'Huile pressée avec de l\'eau ajoutée',
        ]
      : [
          'שמן זית זך כתית ראשון מראש הזית',
          'כל שמן זית שנמכר בשוק',
          'שמן שנסחט בתוספת מים',
        ],
    correctOption: 0,
    explanation: isRu
      ? 'Сказано в Торе: "Шемен зайт зах катит ла-маор" — только чистое масло первой выжимки без осадка!'
      : isEn
      ? 'The Torah states "Pure olive oil pressed for lighting" — only first-press pure oil without sediment!'
      : isEs
      ? 'La Torá dice "Aceite puro de oliva prensado para el alumbrado" — ¡solo primera prensada sin sedimentos!'
      : isPt
      ? 'A Torá diz "Azeite puro de oliva prensado para iluminação" — apenas primeira prensagem!'
      : isFr
      ? 'La Torah dit "Huile d\'olive pure pressée pour le luminaire" — uniquement première pression!'
      : 'נאמר בתורה "שמן זית זך כתית למאור" - רק טיפה ראשונה שיוצאת מהזית ללא שמרים כשרה למנורה!',
  };

  return { oilQuestion };
}

// ==================== CHAPTER 5 ====================
export function getChapter5Questions(lang: SupportedLanguage) {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';

  const stairsQuestion: QuizQuestion = {
    id: 1,
    question: isRu
      ? '❓ Сколько ступеней вели из Двора Женщин (Эзрат Нашим) во Двор Израиля (Эзрат Исраэль)?'
      : isEn
      ? '❓ How many steps led from the Women\'s Courtyard to the Israelite Courtyard?'
      : isEs
      ? '❓ ¿Cuántos escalones subían del Patio de las Mujeres al Patio de Israel?'
      : isPt
      ? '❓ Quantos degraus subiam do Pátio das Mulheres ao Pátio de Israel?'
      : isFr
      ? '❓ Combien d\'marches menaient du Parvis des Femmes au Parvis d\'Israël?'
      : '❓ כמה מעלות (מדרגות) היו עולות מעזרת נשים לעזרת ישראל?',
    options: isRu
      ? [
          '15 ступеней, соответствовавших 15 Псалмам Восхождения ("Шир ха-Маалот")',
          '12 ступеней по числу колен Израиля',
          '7 ступеней по числу дней недели',
        ]
      : isEn
      ? [
          '15 steps, corresponding to the 15 Psalms of Ascent ("Shir HaMa\'alot")',
          '12 steps for the Twelve Tribes',
          '7 steps for the days of the week',
        ]
      : isEs
      ? [
          '15 escalones, correspondientes a los 15 Cánticos de Gradual ("Shir HaMaalot")',
          '12 escalones por las doce tribus',
          '7 escalones por los días de la semana',
        ]
      : isPt
      ? [
          '15 degraus, correspondentes aos 15 Cânticos dos Degraus ("Shir HaMaalot")',
          '12 degraus pelas doze tribos',
          '7 degraus pelos dias da semana',
        ]
      : isFr
      ? [
          '15 marches, correspondant aux 15 Cantiques des Degrés ("Shir HaMa\'alot")',
          '12 marches pour les douze tribus',
          '7 marches pour les jours de la semaine',
        ]
      : [
          '15 מעלות כנגד 15 שיר המעלות שבספר תהילים',
          '12 מעלות כנגד שני עשר שבטי ישראל',
          '7 מעלות כנגד ימי השבוע',
        ],
    correctOption: 0,
    explanation: isRu
      ? 'На 15 полукруглых ступенях левиты стояли с арфами, цитрами и трубами во время праздников!'
      : isEn
      ? 'Levites stood with harps and trumpets on these 15 semicircular steps during the festivals!'
      : isEs
      ? '¡Los levitas se paraban con arpas y trompetas en estos 15 escalones semicirculares!'
      : isPt
      ? 'Os levitas ficavam com harpas e trombetas nesses 15 degraus semicirculares!'
      : isFr
      ? 'Les lévites se tenaient avec harpes et trompettes sur ces 15 marches semi-circulaires!'
      : 'על 15 המעלות העגולות הללו היו הלוויים עומדים בכינורות ובנבלים ושרים בשימחת בית השואבה!',
  };

  const altarQuestion: QuizQuestion = {
    id: 2,
    question: isRu
      ? '❓ Какова заповедь о постоянном огне на жертвеннике?'
      : isEn
      ? '❓ What is the commandment regarding the Altar fire?'
      : isEs
      ? '❓ ¿Cuál es el mandamiento sobre el fuego del Altar?'
      : isPt
      ? '❓ Qual é o mandamento sobre o fogo do Altar?'
      : isFr
      ? '❓ Quel est le commandement concernant le feu de l\'Autel?'
      : '❓ מהי המצווה לגבי אש המזבח?',
    options: isRu
      ? [
          'Огонь на жертвеннике должен гореть непрерывно и никогда не угасать',
          'Огонь зажигают только по субботам',
          'Огонь гасят каждую ночь',
        ]
      : isEn
      ? [
          'The fire on the Altar shall be kept burning continually; it shall not go out',
          'The fire is lit only on Shabbat',
          'The fire is extinguished every night',
        ]
      : isEs
      ? [
          'El fuego en el Altar arderá continuamente, no se apagará jamás',
          'El fuego se enciende solo en Shabat',
          'El fuego se apaga cada noche',
        ]
      : isPt
      ? [
          'O fogo no Altar arderá continuamente, não se apagará jamais',
          'O fogo é aceso apenas no Shabat',
          'O fogo é apagado todas as noites',
        ]
      : isFr
      ? [
          'Le feu sur l\'Autel brûlera continuellement, il ne s\'éteindra point',
          'Le feu n\'est allumé que le Shabbat',
          'Le feu est éteint chaque nuit',
        ]
      : [
          'אש תמיד תוקד על המזבח לא תכבה',
          'מדליקים אש בשבתות בלבד',
          'מכבים את האש בכל לילה',
        ],
    correctOption: 0,
    explanation: isRu
      ? 'Сказано в Торе: "Огонь непрерывный будет гореть на жертвеннике, не угаснет!"'
      : isEn
      ? 'The Torah commands: "A perpetual fire shall burn upon the Altar; it shall not go out!"'
      : isEs
      ? 'La Torá ordena: "¡Fuego continuo arderá sobre el Altar, no se apagará!"'
      : isPt
      ? 'A Torá ordena: "Fogo contínuo arderá sobre o Altar, não se apagará!"'
      : isFr
      ? 'La Torah ordonne: "Un feu perpétuel brûlera sur l\'Autel, il ne s\'éteindra pas!"'
      : 'נאמר בתורה "אש תמיד תוקד על המזבח לא תכבה" - חובה להוסיף עצים בבוקר ובערב!',
  };

  return { stairsQuestion, altarQuestion };
}

// ==================== CHAPTER 6 ====================
export function getChapter6Questions(lang: SupportedLanguage) {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const isFr = lang === 'fr';

  const semichahQuestion: QuizQuestion = {
    id: 1,
    question: isRu
      ? '❓ В чем заключается заповедь "Семиха" (возложение рук) при праздничном жертвоприношении?'
      : isEn
      ? '❓ What is the mitzvah of "Semichah" (laying hands) on a festival sacrifice?'
      : isEs
      ? '❓ ¿En qué consiste la mitzvá de "Semijá" (imposición de manos) en el sacrificio?'
      : isPt
      ? '❓ Em que consiste a mitzvah de "Semichá" (imposição de mãos) no sacrifício?'
      : isFr
      ? '❓ En quoi consiste la mitzvah de "Semikha" (imposition des mains) sur le sacrifice?'
      : '❓ כיצד מקיימים את מצוות "סמיכה" על הקורבן?',
    options: isRu
      ? [
          'Владелец жертвы опирается обеими руками на голову животного всем своим весом во дворе Храма',
          'Священник касаются животного палочкой',
          'Кладут руки на жертвенник',
        ]
      : isEn
      ? [
          'The owner presses both hands firmly on the animal\'s head with full strength inside the Courtyard',
          'The priest touches the animal with a staff',
          'Placing hands on the Altar',
        ]
      : isEs
      ? [
          'El dueño apoya ambas manos sobre la cabeza del animal con toda su fuerza en el Patio',
          'El sacerdote toca al animal con una vara',
          'Colocar las manos en el Altar',
        ]
      : isPt
      ? [
          'O dono apoia ambas as mãos sobre a cabeça do animal com toda a força no Pátio',
          'O sacerdote toca o animal com um bastão',
          'Colocar as mãos no Altar',
        ]
      : isFr
      ? [
          'Le propriétaire appuie ses deux mains sur la tête de l\'animal de toute sa force dans le Parvis',
          'Le prêtre touche l\'animal avec un bâton',
          'Placer les mains sur l\'Autel',
        ]
      : [
          'הבעלים סומך בשתי ידיו בכל כוחו על ראש הבהמה בעזרה',
          'הכהן נוגע בבהמה במקל',
          'מניחים את הידיים על גבי המזבח',
        ],
    correctOption: 0,
    explanation: isRu
      ? 'Семиха совершается чистым владельцем животного во дворе Храма обеими руками!'
      : isEn
      ? 'Semichah must be performed by a pure owner using both hands inside the Temple Courtyard!'
      : isEs
      ? '¡La Semijá la realiza el dueño puro con ambas manos dentro del Patio del Templo!'
      : isPt
      ? 'A Semichá é realizada pelo dono puro com ambas as mãos dentro do Pátio do Templo!'
      : isFr
      ? 'La Semikha est accomplie par le propriétaire pur avec les deux mains dans le Parvis!'
      : 'סמיכה נעשית בטהרה בעזרת המקדש בשתי ידיים על ראש הבהמה לפני השחיטה!',
  };

  const simchahQuestion: QuizQuestion = {
    id: 2,
    question: isRu
      ? '❓ Что говорили о радости Праздника Возливанія Воды ("Симхат Бейт ха-Шоева")?'
      : isEn
      ? '❓ What was said about the Joy of the Water Libation ("Simchat Beit HaShoeva")?'
      : isEs
      ? '❓ ¿Qué se decía sobre la alegría de la Libación de Agua ("Simjat Beit HaShoevá")?'
      : isPt
      ? '❓ O que se dizia sobre a alegria da Libação de Água ("Simchat Beit HaShoevá")?'
      : isFr
      ? '❓ Que disait-on de la joie de la Libation d\'Eau ("Simkhat Beit HaShoeva")?'
      : '❓ מה אמרו חכמים במשנה על שמחת בית השואבה בחג הסוכות?',
    options: isRu
      ? [
          '"Кто не видел радости Возливания Воды, тот никогда в жизни не видел настоящей радости!"',
          'Это было обычное будничное событие',
          'Праздновали только в молчании',
        ]
      : isEn
      ? [
          '"He who has not seen the Joy of the Water Libation has never seen true joy in his life!"',
          'It was a quiet ordinary event',
          'It was celebrated in complete silence',
        ]
      : isEs
      ? [
          '"¡Quien no vio la alegría de la Libación de Agua jamás vio alegría en su vida!"',
          'Era un evento ordinario silencioso',
          'Se celebraba en completo silencio',
        ]
      : isPt
      ? [
          '"Quem não viu a alegria da Libação de Água jamais viu alegria em sua vida!"',
          'Era um evento ordinário silencioso',
          'Era celebrado em completo silêncio',
        ]
      : isFr
      ? [
          '"Quiconque n\'a pas vu la joie de la Libation d\'Eau n\'a jamais vu de vraie joie de sa vie!"',
          'C\'était un événement ordinaire tranquille',
          'C\'était célébré dans un silence complet',
        ]
      : [
          '"מי שלא ראה שמחת בית השואבה - לא ראה שמחה מימיו!"',
          'זה היה אירוע שקט ככל הימים',
          'חגגו זאת בשתיקה בלבד',
        ],
    correctOption: 0,
    explanation: isRu
      ? 'Мудрецы, праведники и люди дела танцевали с горящими факелами и пели гимны всю ночь!'
      : isEn
      ? 'Sages, pious men, and leaders danced with flaming torches and sang praises all night!'
      : isEs
      ? '¡Los sabios y piadosos danzaban con antorchas encendidas y cantaban alabanzas toda la noche!'
      : isPt
      ? 'Os sábios e piedosos dançavam com tochas acesas e cantavam louvores a noite toda!'
      : isFr
      ? 'Les sages et les pieux dansaient avec des torches enflammées et chantaient toute la nuit!'
      : 'חסידים ואנשי מעשה היו מרקדים בפניהם באבוקות של אור ושרים תשבחות כל הלילה!',
  };

  return { semichahQuestion, simchahQuestion };
}
