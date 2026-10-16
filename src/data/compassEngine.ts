export type CompassType = 'immigration' | 'study' | 'jobs' | 'shift' | 'side-hustle';

export interface CompassQuestionOption {
  id: string;
  labelAr: string;
  labelFr: string;
  subLabelAr?: string;
  icon?: string;
  points?: Record<string, number>;
}

export interface CompassQuestion {
  id: string;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  options: CompassQuestionOption[];
}

export interface PathwayRoadmapStep {
  step: number;
  titleAr: string;
  titleFr: string;
  duration: string;
  actionAr: string;
  actionFr: string;
}

export interface RecommendationPathway {
  id: string;
  rank: number;
  titleAr: string;
  titleFr: string;
  destinationOrTrack: string;
  flagEmoji: string;
  matchScore: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  costMAD: string;
  timeToComplete: string;
  whyThisPathAr: string;
  whyThisPathFr: string;
  roadmap: PathwayRoadmapStep[];
  prerequisitesAr: string[];
  prerequisitesFr: string[];
  proTipAr: string;
  proTipFr: string;
  guideRoute?: { tab: string; subTab?: string; id?: string };
}

export interface CompassResult {
  compassType: CompassType;
  primarySummaryAr: string;
  primarySummaryFr: string;
  pathways: RecommendationPathway[];
  calculatedAt: string;
}

// 1. IMMIGRATION COMPASS QUESTIONS
export const IMMIGRATION_QUESTIONS: CompassQuestion[] = [
  {
    id: 'age',
    titleAr: 'ما هو عمرك الحالي؟',
    titleFr: 'Quel est votre âge actuel ?',
    descriptionAr: 'العمر عامل حاسم في برامج النقاط وتأشيرات البحث عن عمل.',
    descriptionFr: 'L\'âge détermine vos points pour les visas de recherche d\'emploi.',
    options: [
      { id: 'under25', labelAr: 'أقل من 25 سنة', labelFr: 'Moins de 25 ans', subLabelAr: 'أفضلية للدراسة والتكوين المهني' },
      { id: '25to32', labelAr: 'من 25 إلى 32 سنة', labelFr: 'De 25 à 32 ans', subLabelAr: 'السن الذهبي لبرامج النقاط والهجرة' },
      { id: '33to40', labelAr: 'من 33 إلى 40 سنة', labelFr: 'De 33 à 40 ans', subLabelAr: 'مطلوب خبرة مهنية قوية' },
      { id: 'above40', labelAr: 'أكثر من 40 سنة', labelFr: 'Plus de 40 ans', subLabelAr: 'مسارات المستثمرين وعقود العمل المباشرة' }
    ]
  },
  {
    id: 'degree',
    titleAr: 'ما هو أعلى مؤهل علمي لديك؟',
    titleFr: 'Quel est votre plus haut niveau de diplôme ?',
    descriptionAr: 'معادلة الشهادة تختلف من دولة لأخرى.',
    descriptionFr: 'L\'équivalence de diplôme varie selon le pays cible.',
    options: [
      { id: 'bac_only', labelAr: 'باكالوريا فقط / بدون شهادة عليا', labelFr: 'Baccalauréat uniquement', subLabelAr: 'مسار التكوين المهني Ausbilding أو الحرف' },
      { id: 'technician', labelAr: 'دبلوم تقني متخصص (OFPPT / BTS / DUT)', labelFr: 'TS / BTS / DUT (Bac+2)', subLabelAr: 'مطلوب جداً في ألمانيا وفرنسا والخليج' },
      { id: 'licence', labelAr: 'إجازة / ليسانس (Bac+3)', labelFr: 'Licence universitaire (Bac+3)', subLabelAr: 'مؤهل لبطاقة الفرصة وبرامج ماستر أوروبا' },
      { id: 'master_eng', labelAr: 'ماستر / مهندس دولة (Bac+5 فأكثر)', labelFr: 'Master / Diplôme d\'Ingénieur (Bac+5+)', subLabelAr: 'أعلى النقاط في كندا وفرنسا وتأشيرة المواهب' }
    ]
  },
  {
    id: 'languages',
    titleAr: 'ما هي اللغات الأجنبية التي تتقنها حالياً؟',
    titleFr: 'Quelles langues maîtrisez-vous ?',
    descriptionAr: 'اللغة هي مفتاح قبول الملف وسرعة الحصول على التأشيرة.',
    descriptionFr: 'La langue est la clé d\'obtention rapide du visa.',
    options: [
      { id: 'french_b2', labelAr: 'الفرنسية ممتازة (B2 / C1) + الإنجليزية متوسطة', labelFr: 'Français B2/C1 + Anglais moyen', subLabelAr: 'مثالي لفرنسا، كيبك (كندا)، بلجيكا' },
      { id: 'english_fluent', labelAr: 'الإنجليزية طليقة (IELTS 6.5+) + الفرنسية مقبولة', labelFr: 'Anglais fluide (IELTS 6.5+)', subLabelAr: 'مثالي لألمانيا، كندا الفيدرالية، إيرلندا، الخليج' },
      { id: 'german_start', labelAr: 'أدرس الألمانية (A2/B1) أو مستعد لتعلمها', labelFr: 'Allemand A2/B1 ou prêt à apprendre', subLabelAr: 'مسار بطاقة الفرصة Chancenkarte وألمانيا' },
      { id: 'arabic_basic', labelAr: 'العربية فقط مع أساسيات باللغات الأخرى', labelFr: 'Arabe + bases uniquement', subLabelAr: 'الأولوية لتطوير اللغة أو عقود الخليج' }
    ]
  },
  {
    id: 'experience',
    titleAr: 'كم سنة خبرة عملية مثبتة لديك؟',
    titleFr: 'Combien d\'années d\'expérience professionnelle ?',
    descriptionAr: 'الخبرة المسجلة بـ CNSS أو عقود رسمية.',
    descriptionFr: 'Expérience justifiée par CNSS ou contrats.',
    options: [
      { id: 'fresh', labelAr: 'خريج جديد (أقل من سنة خبرة)', labelFr: 'Moins d\'1 an (Débutant)', subLabelAr: 'مسار التدريب، الدراسة أو التكوين' },
      { id: '1to3years', labelAr: 'من سنة إلى 3 سنوات', labelFr: '1 à 3 ans', subLabelAr: 'كافية لمعظم تأشيرات العمل الماهرة' },
      { id: '3to5years', labelAr: 'من 3 إلى 5 سنوات', labelFr: '3 à 5 ans', subLabelAr: 'نقاط ممتازة في جميع أنظمة الهجرة' },
      { id: 'more5years', labelAr: 'أكثر من 5 سنوات خبرة قوية', labelFr: 'Plus de 5 ans (Senior)', subLabelAr: 'أولوية قصوى وعقود إدارة وتخصص' }
    ]
  },
  {
    id: 'field',
    titleAr: 'ما هو مجال تخصصك أو عملك؟',
    titleFr: 'Quel est votre domaine d\'activité ?',
    descriptionAr: 'المهن ذات النقص تحظى بأولوية وتأشيرات سريعة.',
    descriptionFr: 'Les métiers en tension bénéficient d\'un traitement prioritaire.',
    options: [
      { id: 'it_tech', labelAr: 'تكنولوجيا المعلومات والبرمجة والشبكات', labelFr: 'Informatique & Technologies', subLabelAr: 'أعلى طلب عالمي مع تسهيل شروط الدبلوم' },
      { id: 'health_care', labelAr: 'الطب والتمريض والعلوم الصحية', labelFr: 'Santé, Soins & Paramédical', subLabelAr: 'ألمانيا وفرنسا والخليج تفتح أبوابها فوراً' },
      { id: 'engineering_industry', labelAr: 'الهندسة الميكانيكية، الكهربائية واللوجستيك', labelFr: 'Ingénierie & Industrie', subLabelAr: 'طلب مرتفع في فرنسا وألمانيا والمغرب' },
      { id: 'business_admin', labelAr: 'الإدارة، المالية، التسويق وخدمة العملاء', labelFr: 'Gestion, Marketing & Ventes', subLabelAr: 'منافسة تحتاج تميزاً لغوياً وخبرة' },
      { id: 'crafts_trades', labelAr: 'الحرف اليدوية (كهرباء، سباكة، لحام، طبخ)', labelFr: 'Métiers manuels & Artisanat', subLabelAr: 'رواتب ضخمة في أوروبا وكندا' }
    ]
  },
  {
    id: 'budget',
    titleAr: 'ما هي القدرة المالية المتاحة لبدء الإجراءات؟',
    titleFr: 'Quel est votre budget de départ disponible ?',
    descriptionAr: 'تشمل تكلفة الامتحانات، الترجمة، رسوم الفيزا، وتأمين السفر.',
    descriptionFr: 'Frais de tests, traductions, visa et caution.',
    options: [
      { id: 'low_budget', labelAr: 'ميزانية محدودة (أقل من 20,000 درهم)', labelFr: 'Moins de 20 000 MAD', subLabelAr: 'مسارات عقود العمل المباشرة والعمل الحر' },
      { id: 'mid_budget', labelAr: 'ميزانية متوسطة (20,000 إلى 60,000 درهم)', labelFr: '20 000 à 60 000 MAD', subLabelAr: 'كافية لفرنسا، إسبانيا، إجراءات كندا' },
      { id: 'high_budget', labelAr: 'ميزانية جيدة (أكثر من 80,000 درهم / حساب مغلق)', labelFr: 'Plus de 80 000 MAD', subLabelAr: 'تفتح خيار الحساب البنكي المغلق لألمانيا والدراسة' }
    ]
  }
];

// 2. STUDY ABROAD QUESTIONS
export const STUDY_QUESTIONS: CompassQuestion[] = [
  {
    id: 'study_level',
    titleAr: 'ما هو مستواك الدراسي الحالي المستهدف؟',
    titleFr: 'Quel niveau d\'études visez-vous ?',
    descriptionAr: 'المرحلة القادمة التي تريد متابعتها في الخارج.',
    descriptionFr: 'Le cycle d\'études que vous souhaitez intégrer.',
    options: [
      { id: 'target_bachelor', labelAr: 'الإجازة أو السنة الأولى جامعية (Licence 1)', labelFr: 'Licence 1 / Bachelor', subLabelAr: 'بعد الباكالوريا مباشرة' },
      { id: 'target_master', labelAr: 'سلك الماستر (Master 1 / Master 2)', labelFr: 'Master 1 / Master 2', subLabelAr: 'أكبر فرصة للحصول على منح وتسهيلات' },
      { id: 'target_phd', labelAr: 'الدكتوراه والبحث العلمي (Doctorat / PhD)', labelFr: 'Doctorat / Recherche', subLabelAr: 'تمويل 100% وراتب شهري مضمون غالباً' },
      { id: 'target_vocational', labelAr: 'تكوين مهني تطبيقي بالخارج (Ausbildung)', labelFr: 'Formation pro rémunérée', subLabelAr: 'دراسة مجانية + راتب شهري فوري' }
    ]
  },
  {
    id: 'grade_mention',
    titleAr: 'ما هو معدلك أو ميزتك الدراسية الأخيرة؟',
    titleFr: 'Quelle est votre mention académique ?',
    descriptionAr: 'المعدل يحدد أهليتك للمنح التنافسية المجانية.',
    descriptionFr: 'Détermine votre éligibilité aux bourses d\'excellence.',
    options: [
      { id: 'tres_bien', labelAr: 'حسن جداً (16/20 فأكثر)', labelFr: 'Très Bien (16/20+)', subLabelAr: 'أهلية للمنح العالمية الكبرى (Eiffel, DAAD, Turkiye)' },
      { id: 'bien', labelAr: 'حسن (من 14 إلى 15.99)', labelFr: 'Bien (14 à 15.99)', subLabelAr: 'فرص ممتازة في الجامعات الحكومية الأوروبية' },
      { id: 'assez_bien', labelAr: 'مستحسن (من 12 إلى 13.99)', labelFr: 'Assez Bien (12 à 13.99)', subLabelAr: 'قبول سهل في كليات إسبانيا ورومانيا وتكوين ألمانيا' },
      { id: 'passable', labelAr: 'مقبول (10 إلى 11.99)', labelFr: 'Passable (10 à 11.99)', subLabelAr: 'التركيز على المعاهد التطبيقية والجامعات الخاصة' }
    ]
  },
  {
    id: 'language_readiness',
    titleAr: 'ما هي اللغة التي تفضل الدراسة بها؟',
    titleFr: 'Dans quelle langue souhaitez-vous étudier ?',
    descriptionAr: 'لغة التدريس تحدد خيارات الدول والرسوم.',
    descriptionFr: 'La langue d\'enseignement oriente le choix du pays.',
    options: [
      { id: 'lang_french', labelAr: 'الفرنسية (مستوى TCF/DELF B2+)', labelFr: 'Français (TCF B2+)', subLabelAr: 'فرنسا (Campus France)، بلجيكا، سويسرا' },
      { id: 'lang_english', labelAr: 'الإنجليزية (مستعد لـ IELTS / TOEFL)', labelFr: 'Anglais (IELTS / TOEFL)', subLabelAr: 'ألمانيا، ماليزيا، تركيا، المجر، إيطاليا' },
      { id: 'lang_german', labelAr: 'الألمانية (B1/B2) أو التكوين المهني', labelFr: 'Allemand (B1/B2)', subLabelAr: 'دراسة مجانية بالكامل في ألمانيا والنمسا' }
    ]
  },
  {
    id: 'budget_study',
    titleAr: 'ما هي ميزانيتك السنوية للدراسة والمعيشة؟',
    titleFr: 'Votre budget annuel prévisionnel ?',
    descriptionAr: 'هل تبحث عن منحة ممولة بالكامل أم لديك دعم عائلي؟',
    descriptionFr: 'Bourse complète ou prise en charge personnelle ?',
    options: [
      { id: 'zero_scholarship', labelAr: 'صفر درهم (أحتاج منحة ممولة 100% مع سكن)', labelFr: '0 MAD (Bourse 100% requise)', subLabelAr: 'منح المجر، تركيا، الصين، إراسموس' },
      { id: 'modest_budget', labelAr: 'تكاليف معيشة فقط (30,000 إلى 60,000 درهم/سنة)', labelFr: '30 000 à 60 000 MAD/an', subLabelAr: 'جامعات إيطاليا وفرنسا مع عمل جزئي' },
      { id: 'comfort_budget', labelAr: 'ميزانية كاملة ومستقرة (أكثر من 90,000 درهم)', labelFr: '90 000 MAD+ / an', subLabelAr: 'حساب مغلق لألمانيا، إسبانيا، كندا' }
    ]
  }
];

// 3. JOB & CAREER COMPASS QUESTIONS
export const JOB_QUESTIONS: CompassQuestion[] = [
  {
    id: 'job_timeline',
    titleAr: 'ما هو هدفك الزمني للحصول على العمل؟',
    titleFr: 'Quel est votre objectif de délai ?',
    descriptionAr: 'الوقت المتاح لديك حتى تحقيق أول راتب.',
    descriptionFr: 'Délai maximal pour décrocher votre premier salaire.',
    options: [
      { id: 'urgent_1month', labelAr: 'عاجل جداً (خلال 30 إلى 60 يوماً)', labelFr: 'Urgent (1 à 2 mois)', subLabelAr: 'مراكز النداء، المبيعات الميدانية، الدعم التقني' },
      { id: 'plan_6months', labelAr: 'خطة منظمة خلال 6 أشهر', labelFr: 'Objectif 6 mois structuré', subLabelAr: 'تطوير مهارة تقنية، وظيفة قطاع خاص، عقود عمل' },
      { id: 'strategic_1year', labelAr: 'بناء مسار نوعي خلال سنة', labelFr: 'Transition en 1 an', subLabelAr: 'وظيفة دولية عن بعد أو شركة متعددة الجنسيات' }
    ]
  },
  {
    id: 'core_skill',
    titleAr: 'ما هي أقوى مهارة تمتلكها حالياً؟',
    titleFr: 'Votre compétence la plus solide ?',
    descriptionAr: 'نقطة الانطلاق لبناء خطة التوظيف.',
    descriptionFr: 'Le point d\'appui de votre plan de recrutement.',
    options: [
      { id: 'languages_comm', labelAr: 'طلاقة لغوية وتواصل ممتاز (فرنسية/إنجليزية)', labelFr: 'Langues & Communication', subLabelAr: 'رواتب 6,000 إلى 12,000 درهم فوراً بالمغرب' },
      { id: 'tech_software', labelAr: 'برمجة، تحليل بيانات، أو تصميم وتعديل فيديو', labelFr: 'Informatique & Création', subLabelAr: 'طلب مرتفع محلياً ومع شركات أوروبا والخليج' },
      { id: 'management_ops', labelAr: 'تنظيم، محاسبة، لوجستيك، إدارة مشاريع', labelFr: 'Organisation, Gestion & RH', subLabelAr: 'مطلوب في الشركات الصناعية وميناء طنجة والدار البيضاء' },
      { id: 'sales_negotiation', labelAr: 'الإقناع، البيع، خدمة العملاء والتجارة', labelFr: 'Vente, Négociation & Commerce', subLabelAr: 'عمولات شهرية ضخمة وفرص ترقية سريعة' }
    ]
  },
  {
    id: 'location_pref',
    titleAr: 'أين تفضل أن تعمل؟',
    titleFr: 'Où souhaitez-vous travailler ?',
    descriptionAr: 'نمط العمل يحدد الشركات المستهدفة وسرعة الرد.',
    descriptionFr: 'Votre préférence géographique de travail.',
    options: [
      { id: 'loc_morocco', labelAr: 'بالمغرب (الدار البيضاء، الرباط، طنجة، مراكش...)', labelFr: 'Au Maroc (Grandes villes)', subLabelAr: 'وظائف CDI واستقرار قانوني فوري' },
      { id: 'loc_remote', labelAr: 'عن بعد من منزلي بالمغرب مع شركات دولية', labelFr: 'Télétravail international', subLabelAr: 'راتب بالعملة الصعبة مع تكلفة معيشة محلية' },
      { id: 'loc_gulf_europe', labelAr: 'عقد عمل مباشر بالخارج (الخليج أو أوروبا)', labelFr: 'Contrat direct à l\'étranger', subLabelAr: 'فيزا عمل مع تغطية السكن وتذاكر الطيران' }
    ]
  }
];

// 4. CAREER SHIFT COMPASS QUESTIONS
export const SHIFT_QUESTIONS: CompassQuestion[] = [
  {
    id: 'current_situation',
    titleAr: 'ما هو وضعك المهني الحالي؟',
    titleFr: 'Quelle est votre situation actuelle ?',
    descriptionAr: 'نقطة البداية لتحديد المسار البديل الأكثر واقعية.',
    descriptionFr: 'Votre point de départ actuel.',
    options: [
      { id: 'call_center', labelAr: 'أعمل بمركز اتصال (Centre d\'appels) وأريد الخروج', labelFr: 'En centre d\'appels (Burnout)', subLabelAr: 'لديك لغة قوية وتحتاج فقط مهارة تخصصية' },
      { id: 'dead_end_job', labelAr: 'موظف براتب متدنٍ وبدون أفق ترقية', labelFr: 'Salarié bloqué à bas salaire', subLabelAr: 'خطة لمضاعفة الدخل 2x خلال 18 شهراً' },
      { id: 'unemployed_grad', labelAr: 'خريج معطل أو صاحب تخصص بدون سوق شغل', labelFr: 'Diplômé sans débouché direct', subLabelAr: 'إعادة توجيه فورية نحو مهن النقص' },
      { id: 'independent_struggling', labelAr: 'أمارس عملاً حراً غير مستقر وأريد نظاماً ثابتاً', labelFr: 'Indépendant en quête de stabilité', subLabelAr: 'هيكلة المهارات والتحول إلى B2B' }
    ]
  },
  {
    id: 'target_goal',
    titleAr: 'ما هو هدفك الأساسي من التحول المهني؟',
    titleFr: 'Votre objectif prioritaire de reconversion ?',
    descriptionAr: 'المحفز الذي يجعلك تستثمر وقتك.',
    descriptionFr: 'Le levier principal de votre motivation.',
    options: [
      { id: 'double_income', labelAr: 'مضاعفة دخلي الشهري (الوصول لـ 15,000 درهم+)', labelFr: 'Doubler mes revenus (15k+ MAD)', subLabelAr: 'المهن الرقمية والتقنية وإدارة الحسابات الكبرى' },
      { id: 'peace_and_remote', labelAr: 'راحة البال وحرية العمل عن بعد من أي مكان', labelFr: 'Télétravail & Qualité de vie', subLabelAr: 'الخدمات المستقلة والبرمجة والتصميم' },
      { id: 'prep_for_migration', labelAr: 'اكتساب مهنة تفتح لي باب الهجرة فوراً', labelFr: 'Métier tremplin pour émigrer', subLabelAr: 'المجال الصحي، البرمجة، والتقنيات الصناعية' }
    ]
  },
  {
    id: 'weekly_hours',
    titleAr: 'كم ساعة يمكنك تخصيصها أسبوعياً للتعلم والتدريب؟',
    titleFr: 'Heures d\'apprentissage par semaine ?',
    descriptionAr: 'الالتزام الأسبوعي يحدد سرعة وصولك للهدف.',
    descriptionFr: 'Le temps dédié à votre requalification.',
    options: [
      { id: 'hours_5to10', labelAr: '5 إلى 10 ساعات أسبوعياً (مساءً وعطلة نهاية الأسبوع)', labelFr: '5 à 10h/semaine (Lent & sûr)', subLabelAr: 'مسار مريح خلال 18 إلى 24 شهراً' },
      { id: 'hours_15to20', labelAr: '15 إلى 20 ساعة أسبوعياً (تركيز قوي)', labelFr: '15 à 20h/semaine (Accéléré)', subLabelAr: 'تحول كامل خلال 9 إلى 12 شهراً' },
      { id: 'fulltime_study', labelAr: 'متفرغ بالكامل (30 ساعة+ أسبوعياً)', labelFr: 'Temps plein (Bootcamp)', subLabelAr: 'تحول جذري سريع خلال 4 إلى 6 أشهر' }
    ]
  }
];

// 5. SIDE HUSTLE COMPASS QUESTIONS
export const SIDEHUSTLE_QUESTIONS: CompassQuestion[] = [
  {
    id: 'starting_capital',
    titleAr: 'ما هو رأس المال الذي تستطيع المخاطرة به؟',
    titleFr: 'Quel capital de départ pouvez-vous investir ?',
    descriptionAr: 'هناك مجالات مربحة جداً تبدأ برأس مال صفر درهم.',
    descriptionFr: 'Certaines activités rentables débutent à 0 MAD.',
    options: [
      { id: 'zero_capital', labelAr: '0 درهم (أبيع وقتي ومهارتي فقط)', labelFr: '0 MAD (Vente de compétences)', subLabelAr: 'العمل الحر، الترجمة، المساعدة الافتراضية' },
      { id: 'small_capital', labelAr: 'من 1,000 إلى 5,000 درهم', labelFr: '1 000 à 5 000 MAD', subLabelAr: 'شراء أدوات رقمية، إعلانات مصغرة، خدمات محلية' },
      { id: 'medium_capital', labelAr: 'أكثر من 10,000 درهم', labelFr: 'Plus de 10 000 MAD', subLabelAr: 'تجارة إلكترونية محلية COD أو إطلاق براند' }
    ]
  },
  {
    id: 'natural_strength',
    titleAr: 'ما هو أسلوب العمل الأقرب لطبيعتك الشخصية؟',
    titleFr: 'Quel style de travail vous correspond ?',
    descriptionAr: 'العمل الذي يناسب شخصيتك هو الوحيد الذي ستستمر فيه.',
    descriptionFr: 'Le modèle aligné avec votre personnalité.',
    options: [
      { id: 'solo_deep_work', labelAr: 'العمل الفردي أمام الحاسوب (كتابة، تصميم، برمجة)', labelFr: 'Travail solo sur ordinateur', subLabelAr: 'Freelancing، إنشاء محتوى، منتجات رقمية' },
      { id: 'people_social', labelAr: 'التواصل، إدارة العلاقات، والبيع المباشر', labelFr: 'Relationnel, Vente & Réseau', subLabelAr: 'وساطة صفقات، تسويق بالعمولة، استشارات' },
      { id: 'operations_physical', labelAr: 'المنتجات الملموسة والشحن والتجارة على أرض الواقع', labelFr: 'Commerce physique & Logistique', subLabelAr: 'التجارة الإلكترونية بالمغرب، بيع المنتجات' }
    ]
  },
  {
    id: 'available_time',
    titleAr: 'كم ساعة متوفرة لديك في الأسبوع للدخل الإضافي؟',
    titleFr: 'Combien d\'heures par semaine disponibles ?',
    descriptionAr: 'لضمان عدم الإرهاق والحفاظ على عملك الحالي.',
    descriptionFr: 'Pour éviter le burnout avec votre emploi principal.',
    options: [
      { id: 'micro_5h', labelAr: '5 إلى 7 ساعات (ساعة واحدة يومياً)', labelFr: '5 à 7h (1h/jour)', subLabelAr: 'مهمات مصغرة، خدمات ترجمة وصوت وكتابة' },
      { id: 'moderate_15h', labelAr: '10 إلى 15 ساعة (ساعتان يومياً + السبت)', labelFr: '10 à 15h/semaine', subLabelAr: 'بناء متجر، عملاء شهريون، إدارة صفحات' },
      { id: 'heavy_20h', labelAr: '20 ساعة فأكثر (مشروع كامل موازي)', labelFr: '20h+ (Projet quasi plein temps)', subLabelAr: 'مشروع قادر على أن يحل محل وظيفتك خلال عام' }
    ]
  }
];

// EVALUATOR LOGIC TO COMPUTE TAILORED PATHWAYS
export function evaluateCompassResults(type: CompassType, answers: Record<string, string>): CompassResult {
  const pathways: RecommendationPathway[] = [];
  const now = new Date().toISOString();

  if (type === 'immigration') {
    const isTech = answers.field === 'it_tech';
    const isHealth = answers.field === 'health_care';
    const hasEnglish = answers.languages === 'english_fluent';
    const hasGerman = answers.languages === 'german_start';
    const hasFrench = answers.languages === 'french_b2';
    const isMasterOrEng = answers.degree === 'master_eng';
    const hasBudget = answers.budget === 'high_budget';
    const hasExp = answers.experience === '3to5years' || answers.experience === 'more5years';

    // Pathway 1: Germany (Opportunity Card / Skilled Worker)
    let germanyScore = 75;
    if (hasGerman) germanyScore += 18;
    if (hasEnglish) germanyScore += 10;
    if (isTech || isHealth) germanyScore += 12;
    if (hasExp) germanyScore += 8;
    if (hasBudget) germanyScore += 7;
    germanyScore = Math.min(germanyScore, 98);

    pathways.push({
      id: 'germany-path',
      rank: 1,
      titleAr: 'ألمانيا: بطاقة الفرصة (Chancenkarte) وعقود العمل المباشرة',
      titleFr: 'Allemagne : Carte des Opportunités (Chancenkarte) & Emploi',
      destinationOrTrack: 'ألمانيا 🇩🇪',
      flagEmoji: '🇩🇪',
      matchScore: germanyScore,
      difficulty: hasGerman ? 'moderate' : 'challenging',
      costMAD: hasBudget ? '35,000 - 130,000 درهم (مع الحساب المغلق)' : '25,000 - 45,000 درهم (مع عقد عمل/ضامن)',
      timeToComplete: hasGerman ? '4 إلى 7 أشهر' : '7 إلى 12 شهراً',
      whyThisPathAr: `ألمانيا تعاني من عجز ديمغرافي وتبحث عن 400,000 كفاءة سنوياً. تخصصك وحالتك يمنحانك نقاطاً ممتازة بموجب قانون الهجرة الجديد لعام 2024-2026. بطاقة الفرصة تتيح لك دخول ألمانيا لمدة عام كامل للبحث عن عمل مع إمكانية العمل الجزئي فوراً.`,
      whyThisPathFr: `L'Allemagne recherche activement des talents qualifiés. La Chancenkarte vous permet d'entrer en Allemagne pendant 1 an pour trouver un emploi tout en travaillant à temps partiel légalement.`,
      roadmap: [
        { step: 1, titleAr: 'معادلة الدبلوم واللغة', titleFr: 'Équivalence & Langue', duration: 'الشهر 1-3', actionAr: 'التحقق من اعتماد شهادتك عبر Anabin وإتمام مستوى B1 ألماني أو B2 إنجليزي.', actionFr: 'Vérification Anabin et certification linguistique B1/B2.' },
        { step: 2, titleAr: 'حساب النقاط وجمع الملف', titleFr: 'Calcul des points', duration: 'الشهر 4', actionAr: 'تجميع 6 نقاط على الأقل (السن + الدبلوم + اللغة + الخبرة).', actionFr: 'Cumuler 6 points requis pour la Chancenkarte.' },
        { step: 3, titleAr: 'موعد السفارة الألمانية بالرباط', titleFr: 'Rendez-vous Consulat', duration: 'الشهر 5-6', actionAr: 'حجز موعد Visa عبر TLScontact الرباط وتقديم الضمان المالي أو كشف الحساب.', actionFr: 'Dépôt du dossier visa auprès de TLScontact Rabat.' },
        { step: 4, titleAr: 'السفر وبدء العمل', titleFr: 'Arrivée & Emploi', duration: 'الشهر 7+', actionAr: 'الوصول لألمانيا، التسجيل بالبلدية (Anmeldung)، وتوقيع عقد العمل الرسمي.', actionFr: 'Installation, enregistrement municipal et signature du contrat.' }
      ],
      prerequisitesAr: ['شهادة جامعية أو دبلوم معترف به في أنظمة Anabin / ZAB', 'شهادة لغة معتمدة (Goethe B1 أو IELTS 6.0)', 'ضمان مالي (حساب مغلق أو عقد عمل أو ضامن بألمانيا)'],
      prerequisitesFr: ['Diplôme reconnu par Anabin/ZAB', 'Certificat linguistique officiel', 'Garantie financière'],
      proTipAr: 'إذا لم تكن تمتلك رصيد الحساب المغلق، يمكنك التقديم على شركات ألمانية عن بعد عبر لينكدإن للحصول على عقد عمل مباشر، فالسفارة تعفيك من الحساب المغلق تماماً عند توفر العقد!',
      proTipFr: 'Un contrat de travail direct exonère de l\'obligation de compte bloqué.',
      guideRoute: { tab: 'pillar-seo', subTab: 'germany-opportunity-card' }
    });

    // Pathway 2: France (Talent Passport / CDI)
    let franceScore = 70;
    if (hasFrench) franceScore += 22;
    if (isMasterOrEng) franceScore += 10;
    if (isTech) franceScore += 10;
    franceScore = Math.min(franceScore, 96);

    pathways.push({
      id: 'france-path',
      rank: 2,
      titleAr: 'فرنسا: تأشيرة المواهب (Passeport Talent) وعقود CDI المباشرة',
      titleFr: 'France : Passeport Talent & Contrats CDI Directs',
      destinationOrTrack: 'فرنسا 🇫🇷',
      flagEmoji: '🇫🇷',
      matchScore: franceScore,
      difficulty: 'moderate',
      costMAD: '15,000 - 30,000 درهم (رسوم الترجمة وتأشيرة VFS Global)',
      timeToComplete: '3 إلى 6 أشهر',
      whyThisPathAr: `إتقانك للغة الفرنسية وخبرتك تؤهلك للتقديم المباشر على الشركات الفرنسية عبر منصات مثل Welcome to the Jungle و APEC. فرنسا توفر "Passeport Talent" برخصة إقامة لأربع سنوات دون الحاجة لترخيص مكتب العمل إذا كان الراتب يفوق السقف المحدد.`,
      whyThisPathFr: `Votre maîtrise du français vous positionne idéalement pour les recrutements directs en France sous statut Passeport Talent (carte de séjour de 4 ans).`,
      roadmap: [
        { step: 1, titleAr: 'تجهيز السيرة الذاتية الفرنسية', titleFr: 'CV & Profil APEC', duration: 'الأسبوع 1-4', actionAr: 'تكييف السيرة الذاتية وفق معايير السوق الفرنسي ومواءمة المسمى الوظيفي.', actionFr: 'Optimisation du CV aux standards français.' },
        { step: 2, titleAr: 'المقابلات عن بعد وتوقيع Promesse d\'embauche', titleFr: 'Entretiens & Offre', duration: 'الشهر 2-3', actionAr: 'إجراء المقابلات عبر Teams وتوقيع الوعد بالتوظيف الرسمي.', actionFr: 'Entretiens visio et signature de la promesse d\'embauche.' },
        { step: 3, titleAr: 'استخراج رخصة العمل ANEF والتأشيرة', titleFr: 'Autorisation de travail', duration: 'الشهر 4-5', actionAr: 'قيام المشغل بطلب رخصة العمل الإلكترونية وإيداع ملف التأشيرة عبر France-Visas.', actionFr: 'Dépôt du visa de travail salarié long séjour.' },
        { step: 4, titleAr: 'الوصول لفرنسا واستلام بطاقة الإقامة', titleFr: 'Titre de séjour', duration: 'الشهر 6+', actionAr: 'المصادقة على الفيزا لدى OFII واستلام بطاقة الإقامة.', actionFr: 'Validation OFII et intégration.' }
      ],
      prerequisitesAr: ['عقد عمل فرنسي براتب لا يقل عن الحد الأدنى القانوني (SMIC أو سقف المواهب)', 'شهادة لغة فرنسية B2 أو مسار جامعي فرنكوفوني مثبت', 'شهادات الخبرة مصادق عليها'],
      prerequisitesFr: ['Contrat CDI conforme', 'Justificatifs de compétences et d\'expérience', 'Passeport valide'],
      proTipAr: 'الشركات في مدن مثل ليون، نانت، وتولوز توظف أسرع بكثير من باريس بسبب قلة التنافس وتوفر السكن بأسعار منطقية.',
      proTipFr: 'Ciblez les métropoles régionales (Lyon, Nantes, Toulouse) où les recrutements sont plus rapides qu\'à Paris.',
      guideRoute: { tab: 'content-hub', id: 'france-talent-passport-work-visas-2026' }
    });

    // Pathway 3: Remote International Work from Morocco (The Smart Choice)
    let remoteMoroccoScore = 80;
    if (isTech) remoteMoroccoScore += 18;
    if (hasEnglish || hasFrench) remoteMoroccoScore += 10;
    remoteMoroccoScore = Math.min(remoteMoroccoScore, 95);

    pathways.push({
      id: 'morocco-remote-path',
      rank: 3,
      titleAr: 'العمل الحر الدولي من المغرب (تكسب باليورو وتعيش وسط أهلك)',
      titleFr: 'Freelance & Télétravail International depuis le Maroc',
      destinationOrTrack: 'المغرب 🇲🇦 مع دخل دولي 💶',
      flagEmoji: '🇲🇦',
      matchScore: remoteMoroccoScore,
      difficulty: 'easy',
      costMAD: '500 - 3,000 درهم (بطاقة مقاول ذاتي وحساب بنكي مخصص)',
      timeToComplete: '1 إلى 3 أشهر',
      whyThisPathAr: `الهجرة ليست الحل الوحيد! كسب 1,500 إلى 3,000 يورو شهرياً وأنت تعيش في المغرب يمنحك قوة شرائية تفوق موظفاً في باريس يدفع 1,200 يورو للإيجار. قانون المقاول الذاتي المغربي والتصدير الرقمي يمنحانك إعفاءات ضريبية وتسهيلات لتحويل العملة.`,
      whyThisPathFr: `Travailler depuis le Maroc pour des clients internationaux en devises offre un pouvoir d'achat supérieur à un salarié expatrié à Paris payant 1200€ de loyer.`,
      roadmap: [
        { step: 1, titleAr: 'استخراج صفة مقاول ذاتي وحساب بنكي بالعملة', titleFr: 'Statut Auto-Entrepreneur', duration: 'الأسبوع 1-2', actionAr: 'التسجيل في السجل الوطني للمقاول الذاتي وفتح حساب بنكي لتحويل الأتعاب.', actionFr: 'Inscription RNAE et ouverture de compte devises.' },
        { step: 2, titleAr: 'بناء معرض أعمال وخدمة مخصصة', titleFr: 'Portfolio & Offre', duration: 'الأسبوع 3-5', actionAr: 'تحديد خدمة واحدة مطلوبة وتجهيز نماذج سابقة تبرز قيمتك.', actionFr: 'Création d\'un portfolio orienté résultats.' },
        { step: 3, titleAr: 'الاستحواذ على أول 3 عملاء أوروبيين', titleFr: 'Acquisition Clients', duration: 'الأسبوع 6-10', actionAr: 'المراسلة المباشرة على لينكدإن والتقديم في منصات التوظيف عن بعد.', actionFr: 'Prospection ciblée sur LinkedIn et plateformes remote.' },
        { step: 4, titleAr: 'تثبيت عقودRetainer شهرية مستقرة', titleFr: 'Revenus Récurrents', duration: 'الشهر 3+', actionAr: 'تحويل العملاء إلى عقود دعم شهري ثابت بقيمة 20,000 إلى 40,000 درهم.', actionFr: 'Mise en place de contrats mensuels récurrents.' }
      ],
      prerequisitesAr: ['مهارة رقمية قابلة للبيع عن بعد (برمجة، تسويق، تصميم، ترجمة، دعم)', 'حاسوب واتصال إنترنت فايبر سريع', 'لغة تواصل مهنية للتعامل مع العملاء الأجانب'],
      prerequisitesFr: ['Compétence numérique monétisable', 'Connexion internet fibre', 'Anglais ou français professionnel'],
      proTipAr: 'بإمكانك استخراج فيزا شنغن سياحية أو فيزا رجال أعمال بعد 6 أشهر من نشاط المقاول الذاتي بكل سهولة وبكشوفات حساب بنكية قوية!',
      proTipFr: 'Un compte bancaire d\'auto-entrepreneur actif facilite grandement l\'obtention future de visas Schengen.',
      guideRoute: { tab: 'pillar-seo', subTab: 'remote-work-morocco' }
    });

    return {
      compassType: 'immigration',
      primarySummaryAr: `بناءً على ملفك الشخصي: ألمانيا عبر بطاقة الفرصة وفرنسا عبر عقود العمل المباشرة والعمل الحر الدولي تمثل المسارات الأعلى ملاءمة لخبرتك ولغتك دون استنزاف مالي غير محسوب.`,
      primarySummaryFr: `Selon votre profil : l'Allemagne (Chancenkarte), la France (Passeport Talent) et le Freelance international depuis le Maroc sont vos 3 voies royales les plus réalistes.`,
      pathways,
      calculatedAt: now
    };
  }

  if (type === 'study') {
    const isGoodGrade = answers.grade_mention === 'tres_bien' || answers.grade_mention === 'bien';
    const isGerman = answers.language_readiness === 'lang_german';
    const isEnglish = answers.language_readiness === 'lang_english';
    const isMaster = answers.study_level === 'target_master';
    const isZeroBudget = answers.budget_study === 'zero_scholarship';

    pathways.push({
      id: 'scholarship-turkey-hungary',
      rank: 1,
      titleAr: 'المنح الحكومية الممولة 100% (المجر Stipendium Hungaricum وتركيا Turkiye Burslari)',
      titleFr: 'Bourses Gouvernementales 100% (Hongrie & Turquie)',
      destinationOrTrack: 'المجر 🇭🇺 / تركيا 🇹🇷',
      flagEmoji: '🌍',
      matchScore: isGoodGrade ? 94 : 80,
      difficulty: 'moderate',
      costMAD: '0 درهم تكاليف دراسة (تغطية 100% + راتب شهري وسكن مجاني وتأمين)',
      timeToComplete: 'التقديم يبدأ بين نوفمبر وفبراير سنوياً',
      whyThisPathAr: `إذا كانت ميزانيتك محدودة، فهذه المنح توفر مقعداً باللغة الإنجليزية، إعفاءً كاملاً من الرسوم، سكناً جامعياً، وراتباً شهرياً. شهادات الجامعات المجرية معترف بها أوروبياً وعالمياً، والتقديم مجاني ومتاح للمغاربة كل سنة.`,
      whyThisPathFr: `Bourses gouvernementales complètes : scolarité 100% gratuite en anglais, logement universitaire, assurance et allocation mensuelle.`,
      roadmap: [
        { step: 1, titleAr: 'تجهيز وثائق التفوق الأكاديمي والترجمة', titleFr: 'Documents & Relevés', duration: 'شهر أكتوبر-نوفمبر', actionAr: 'ترجمة كشوف النقاط للإنجليزية واستخراج رسائل توصية من أساتذتك.', actionFr: 'Traduction des relevés en anglais et lettres de recommandation.' },
        { step: 2, titleAr: 'صياغة رسالة تحفيز قوية (Motivation Letter)', titleFr: 'Lettre de Motivation', duration: 'شهر ديسمبر', actionAr: 'كتابة خطاب دافع يربط بين تخصصك وخطة تطوير بلدك بعد التخرج.', actionFr: 'Rédaction d\'une lettre de motivation percutante.' },
        { step: 3, titleAr: 'إيداع الملف الإلكتروني والمقابلة الشفوية', titleFr: 'Dépôt & Entretien', duration: 'شهر يناير-مارس', actionAr: 'التقديم عبر بوابات المنح الرسمية واجتياز مقابلة الفيديو عبر الإنترنت.', actionFr: 'Candidature en ligne et entretien vidéo.' },
        { step: 4, titleAr: 'استلام خطاب القبول والفيزا المجانية', titleFr: 'Visa Étudiant', duration: 'شهر يونيو-أغسطس', actionAr: 'حجز تذكرة الطيران واستلام تأشيرة شنغن/تركيا الدراسية.', actionFr: 'Délivrance du visa d\'études pris en charge.' }
      ],
      prerequisitesAr: ['معدل عام لا يقل عن 12/20 (يفضل 14+ للمنحة)', 'شهادة إتقان اللغة الإنجليزية (IELTS أو شهادة كفاءة جامعية)', 'رسالتا توصية أكاديميتان مختومتان'],
      prerequisitesFr: ['Moyenne minimale 12-14/20', 'Niveau d\'anglais attesté', 'Deux lettres de recommandation'],
      proTipAr: 'لا تؤجل التقديم لآخر يوم؛ البوابات الرسمية تشهد ضغطاً كبيراً قبل موعد الإغلاق، وجهز شهادات الأنشطة الموازية والعمل التطوعي لرفع نسبة قبولك بنسبة 35%!',
      proTipFr: 'Les activités associatives et le bénévolat augmentent de 35% vos chances d\'attribution.',
      guideRoute: { tab: 'pillar-seo', subTab: 'european-scholarships' }
    });

    pathways.push({
      id: 'germany-ausbildung-study',
      rank: 2,
      titleAr: 'ألمانيا: التكوين المهني المأجور (Ausbildung) أو الجامعات المجانية',
      titleFr: 'Allemagne : Formation rémunérée (Ausbildung) ou Université',
      destinationOrTrack: 'ألمانيا 🇩🇪',
      flagEmoji: '🇩🇪',
      matchScore: isGerman ? 96 : 84,
      difficulty: isGerman ? 'easy' : 'moderate',
      costMAD: 'دراسة مجانية + راتب شهري من 950 إلى 1,400 يورو للمتدرب',
      timeToComplete: '5 إلى 9 أشهر',
      whyThisPathAr: `التكوين المهني الألماني (Ausbildung) يتيح لك الدراسة في مدرسة مهنية يومين، والعمل لدى شركة 3 أيام مع راتب شهري يكفيك للسكن والمعيشة دون الحاجة لحساب مغلق معقد! بعد 3 سنوات تحصل على دبلوم ألماني وعقد عمل دائم.`,
      whyThisPathFr: `L'Ausbildung combine formation théorique et travail rémunéré (950€ à 1400€/mois) sans exiger de compte bloqué financier.`,
      roadmap: [
        { step: 1, titleAr: 'تعلم اللغة الألمانية إلى مستوى B1/B2', titleFr: 'Allemand B1/B2', duration: 'الشهور 1-6', actionAr: 'الحصول على شهادة معهد جوته (Goethe-Zertifikat B1 أو B2).', actionFr: 'Obtention de la certification Goethe B1/B2.' },
        { step: 2, titleAr: 'مراسلة الشركات والمستشفيات الألمانية', titleFr: 'Candidatures Entreprises', duration: 'الشهور 6-7', actionAr: 'إرسال السيرة الذاتية (Lebenslauf) ورسالة التحفيز لمراكز التكوين.', actionFr: 'Envoi des candidatures de formation en Allemagne.' },
        { step: 3, titleAr: 'اجتياز المقابلة وتوقيع عقد التكوين', titleFr: 'Signature du Contrat', duration: 'الشهر 8', actionAr: 'توقيع عقد Ausbildung الرسمي المعتمد من الغرفة المهنية (IHK أو HWK).', actionFr: 'Signature du contrat certifié IHK/HWK.' },
        { step: 4, titleAr: 'فيزا التكوين المهني والسفر', titleFr: 'Visa & Départ', duration: 'الشهر 9+', actionAr: 'الحصول على فيزا الفئة 16a من السفارة وبدء الدراسة بألمانيا.', actionFr: 'Obtention du visa et début des cours.' }
      ],
      prerequisitesAr: ['شهادة الباكالوريا فما فوق', 'شهادة اللغة الألمانية B1 على الأقل (B2 للتمريض)', 'سيرة ذاتية وفق النسق الألماني Tabellarischer Lebenslauf'],
      prerequisitesFr: ['Baccalauréat minimum', 'Certificat B1/B2 Goethe', 'CV allemand'],
      proTipAr: 'قطاعات التمريض والفندقة واللوجستيك وتكنولوجيا الشبكات تقبل المتدربين المغاربة بأعلى نسب قبول خلال العام الحالي.',
      proTipFr: 'Les filières soins infirmiers, hôtellerie et IT offrent les plus forts taux d\'acceptation.',
      guideRoute: { tab: 'pillar-seo', subTab: 'germany-opportunity-card' }
    });

    pathways.push({
      id: 'france-campus-france',
      rank: 3,
      titleAr: 'فرنسا: الجامعات الحكومية عبر مسطرة Campus France',
      titleFr: 'France : Universités Publiques via Campus France',
      destinationOrTrack: 'فرنسا 🇫🇷',
      flagEmoji: '🇫🇷',
      matchScore: 82,
      difficulty: 'moderate',
      costMAD: 'رسوم جامعية مدعومة (170€ إلى 243€ سنوياً للجامعات المعفية)',
      timeToComplete: 'يبدأ التسجيل في أكتوبر ويستمر إلى يناير',
      whyThisPathAr: `فرنسا تظل الوجهة الأقرب لغوياً وثقافياً للمغاربة. دراسة الماستر في فرنسا تفتح إمكانية العمل لـ 20 ساعة أسبوعياً، والحصول على تأشيرة البحث عن عمل (APS / Recherche d'emploi) بعد التخرج لمدة عام كامل.`,
      whyThisPathFr: `Procédure Campus France classique pour intégrer une université publique avec droit au travail étudiant (964 heures/an).`,
      roadmap: [
        { step: 1, titleAr: 'اجتياز اختبار اللغة TCF أو DELF', titleFr: 'Test Linguistique TCF', duration: 'شهر أكتوبر', actionAr: 'الحصول على مستوى B2 كحد أدنى ويفضل C1 في الاختبار الشفوي.', actionFr: 'Passage du test TCF avec mention B2/C1.' },
        { step: 2, titleAr: 'اختيار 7 برامج جامعية عبر Études en France', titleFr: 'Choix des Vœux', duration: 'شهر نوفمبر-ديسمبر', actionAr: 'ترتيب الرغبات الجامعية بعناية والمصادقة على الملف.', actionFr: 'Sélection des formations et validation du dossier.' },
        { step: 3, titleAr: 'المقابلة الشخصية في المعهد الفرنسي (Institut Français)', titleFr: 'Entretien Campus France', duration: 'شهر يناير-فبراير', actionAr: 'الدفاع عن مشروعك الدراسي والمهني أمام المستشار التعليمي.', actionFr: 'Entretien d\'évaluation pédagogique.' },
        { step: 4, titleAr: 'تأشيرة الطالب VFS Global', titleFr: 'Visa Long Séjour VFS', duration: 'شهر يونيو-يوليو', actionAr: 'تقديم كشف حساب بنكي (7,500 درهم شهرياً) أو التكفل العائلي (Prise en charge).', actionFr: 'Dépôt visa étudiant et recherche du logement.' }
      ],
      prerequisitesAr: ['شهادة TCF-DAP أو TCF Tout Public بمستوى B2 على الأقل', 'كشوف النقاط الجامعية مصادق عليها', 'ضمان مالي أو كفيل رسمي (Garant)'],
      prerequisitesFr: ['TCF Tout Public B2 minimum', 'Relevés académiques certifiés', 'Garant financier'],
      proTipAr: 'اختر جامعات في مدن ذات تكلفة معيشة معقولة (مثل ليل، روان، كليرمون فيران) بدلاً من باريس لتفادي مشكلة أزمة السكن الخانقة.',
      proTipFr: 'Privilégiez les villes à coût abordable (Lille, Rouen, Clermont) pour sécuriser un logement CROUS facilement.'
    });

    return {
      compassType: 'study',
      primarySummaryAr: `بناءً على مؤهلاتك: المنح الحكومية الممولة 100% والتكوين المهني الألماني المأجور وجامعات فرنسا العامة توفر لك دراسة دولية معترف بها مع حماية ميزانيتك.`,
      primarySummaryFr: `Selon votre profil : Bourses complètes (Hongrie/Turquie), Ausbildung allemand rémunéré et Universités françaises sont vos meilleures options.`,
      pathways,
      calculatedAt: now
    };
  }

  if (type === 'jobs') {
    const isUrgent = answers.job_timeline === 'urgent_1month';
    const isRemote = answers.location_pref === 'loc_remote';

    pathways.push({
      id: 'high-value-customer-support-sales',
      rank: 1,
      titleAr: 'مراكز الأعمال والمبيعات الدولية B2B بالمغرب (راتب 7,000 إلى 14,000 درهم)',
      titleFr: 'Hubs B2B & Service Client International au Maroc',
      destinationOrTrack: 'المغرب (الدار البيضاء، الرباط، فاس، طنجة) 🇲🇦',
      flagEmoji: '💼',
      matchScore: isUrgent ? 97 : 88,
      difficulty: 'easy',
      costMAD: '0 درهم (توظيف فوري مع تدريب مأجور وتأمين CNSS/CNOPS)',
      timeToComplete: '15 إلى 30 يوماً فقط',
      whyThisPathAr: `إذا كنت تحتاج دخلاً سريعاً محترماً، فالشركات متعددة الجنسيات بالمغرب (Webhelp, Majorel, Intelcia, Concentrix) توظف مئات الكفاءات أسبوعياً. المشاريع التقنية والمبيعات B2B تقدم رواتب تتجاوز 10,000 درهم مع عمولات شهرية مجزية.`,
      whyThisPathFr: `Recrutement quasi immédiat avec CDI, mutuelle privée et salaire de 7 000 à 14 000 MAD dans les grands hubs B2B.`,
      roadmap: [
        { step: 1, titleAr: 'صياغة سيرة ذاتية فرنسية/إنجليزية متوافقة مع ATS', titleFr: 'CV ATS Optimisé', duration: 'اليوم 1-3', actionAr: 'استخدم صانع السيرة الذاتية بـ MezdoHub وركز على مهارات التواصل وحل المشكلات.', actionFr: 'Génération d\'un CV percutant avec le générateur MezdoHub.' },
        { step: 2, titleAr: 'التقديم المباشر في المنصات المعتمدة', titleFr: 'Candidatures Directes', duration: 'الأسبوع 1', actionAr: 'التقديم في مواقع التوظيف المباشرة ومراسلة مدراء الموارد البشرية على LinkedIn.', actionFr: 'Candidatures simultanées sur les portails carrières.' },
        { step: 3, titleAr: 'اجتياز المقابلة الهاتفية والاختبار اللغوي', titleFr: 'Tests & Entretiens', duration: 'الأسبوع 2', actionAr: 'التدرب على الإجابة بثقة على أسئلة Situational Questions باللغة المستهدفة.', actionFr: 'Préparation des simulations téléphoniques.' },
        { step: 4, titleAr: 'توقيع العقد وبدء التدريب المدفوع', titleFr: 'Signature CDI', duration: 'الأسبوع 3-4', actionAr: 'توقيع العقد، استلام حاسوب العمل، وبدء التدريب الرسمي مدفوع الأجر.', actionFr: 'Intégration et formation rémunérée.' }
      ],
      prerequisitesAr: ['إتقان الفرنسية أو الإنجليزية (شفوياً وكتابياً)', 'مهارات جيدة في استخدام الحاسوب وتعدد المهام', 'جاهزية للعمل بنظام الورديات أو عن بعد'],
      prerequisitesFr: ['Excellente élocution en français ou anglais', 'Aisance informatique', 'Disponibilité immédiate'],
      proTipAr: 'قدم دائماً على المشاريع التخصصية (Projects B2B / High-Tech Support)؛ فراتبها أعلى بـ 40% من الحملات التجارية العادية وبيئة العمل فيها أكثر راحة واستقراراً.',
      proTipFr: 'Visez les comptes B2B techniques pour obtenir +40% de salaire par rapport aux flux entrants standards.',
      guideRoute: { tab: 'local-jobs' }
    });

    pathways.push({
      id: 'international-remote-contract',
      rank: 2,
      titleAr: 'وظائف تقنية ورقمية عن بعد مع شركات فرنسية وخليجية وأمريكية',
      titleFr: 'Emplois Télétravail International (Europe & Golfe)',
      destinationOrTrack: 'عن بعد من المغرب 💻 (راتب 12,000 إلى 30,000 درهم)',
      flagEmoji: '🌐',
      matchScore: isRemote ? 95 : 82,
      difficulty: 'moderate',
      costMAD: '0 درهم (فقط حاسوبك وشبكة الإنترنت)',
      timeToComplete: '2 إلى 4 أشهر',
      whyThisPathAr: `الشركات في أوروبا ودول الخليج توظف مطوري برمجيات، مصممي UI/UX، محللي بيانات، ومسوقين رقميين من المغرب بنظام المقاول المستقل (Contractor). الدخل يصل إلى 1,500 - 3,000 دولار شهرياً ويُصرف لحسابك البنكي المغربي مباشرة.`,
      whyThisPathFr: `Contrats de télétravail international en tant que contractor indépendant avec rémunération en devises (1500$ à 3000$/mois).`,
      roadmap: [
        { step: 1, titleAr: 'تحديد تخصصك الرقمي ومعرض أعمال عملي', titleFr: 'Portfolio & Preuves', duration: 'الشهر 1', actionAr: 'بناء 3 مشاريع حقيقية متقنة تبرز حلولاً تجارية للشركات.', actionFr: 'Réalisation de 3 cas pratiques concrets.' },
        { step: 2, titleAr: 'تحسين بروفايل LinkedIn باللغة الإنجليزية', titleFr: 'Optimisation LinkedIn', duration: 'الشهر 2', actionAr: 'تعديل العنوان الوظيفي وتفعيل ميزة Open to Work للوظائف عن بعد الدولية.', actionFr: 'Profil LinkedIn orienté télétravail international.' },
        { step: 3, titleAr: 'التقديم اليومي في منصات Remote الموثوقة', titleFr: 'Candidatures Ciblées', duration: 'الشهر 3', actionAr: 'التقديم في We Work Remotely, Wellfound, Remotive, ومجموعات التوظيف بالخليج.', actionFr: 'Prospection active sur les portails remote vérifiés.' },
        { step: 4, titleAr: 'توقيع عقد المقاولة والعمل بالعملة الصعبة', titleFr: 'Contrat Contractor', duration: 'الشهر 4', actionAr: 'توقيع عقد Contractor واستلام الأتعاب عبر تحويل بنكي Swift أو Wise.', actionFr: 'Finalisation du contrat et premier virement devises.' }
      ],
      prerequisitesAr: ['مهارة رقمية قابلة للقياس (برمجة، تسويق، إدارة محتوى، تصميم)', 'معرض أعمال (Portfolio / GitHub) يتحدث عن نتائجه', 'حاسوب محترم وسرعة إنترنت جيدة'],
      prerequisitesFr: ['Compétence numérique éprouvée', 'Portfolio en ligne', 'Anglais ou français fluide'],
      proTipAr: 'لا ترسل نفس السيرة الذاتية للجميع؛ خصص أول فقرة في رسالتك لتشرح لصاحب العمل كيف ستوفر عليه وقتاً أو تزيد مبيعاته فور انضمامك.',
      proTipFr: 'Personnalisez chaque candidature en montrant directement la valeur ajoutée apportée à l\'entreprise.'
    });

    return {
      compassType: 'jobs',
      primarySummaryAr: `خطتك التوظيفية واضحة: إذا كنت بحاجة لراتب سريع، فمراكز الأعمال الدولية بالمغرب تضمن لك عملاً في 30 يوماً؛ وإذا أردت مضاعفة الدخل، فوظائف العمل عن بعد مع شركات أوروبا والخليج هي هدفك.`,
      primarySummaryFr: `Votre stratégie : Les hubs internationaux au Maroc pour un salaire garanti sous 30 jours, ou le télétravail international pour viser 15k+ MAD.`,
      pathways,
      calculatedAt: now
    };
  }

  if (type === 'shift') {
    pathways.push({
      id: 'data-analytics-qa-transition',
      rank: 1,
      titleAr: 'التحول إلى تحليل البيانات وضمان الجودة (Data & QA Testing)',
      titleFr: 'Reconversion : Data Analytics & QA Software Testing',
      destinationOrTrack: 'مجال تقني حديث ومطلوب 📊',
      flagEmoji: '📈',
      matchScore: 92,
      difficulty: 'moderate',
      costMAD: '0 إلى 1,500 درهم (دورات مجانية أو شهادات Google Coursera)',
      timeToComplete: '6 إلى 9 أشهر من التعلم الموجه',
      whyThisPathAr: `إذا كنت تعمل في وظيفة روتينية كمركز الاتصال، فأفضل وأسرع انتقال تقني ليس هندسة البرمجيات المعقدة، بل فحص البرمجيات (QA Testing) وتحليل البيانات بـ Excel و SQL و Power BI. مهاراتك في التواصل بالفرنسية ميزة تفضيلية نادرة تبحث عنها شركات التكنولوجيا.`,
      whyThisPathFr: `Le pont idéal pour quitter les centres d'appels : le QA Testing et la Data Analytics valorisent vos compétences linguistiques tout en triplant votre valeur sur le marché.`,
      roadmap: [
        { step: 1, titleAr: 'شهادة Google Data Analytics أو ISTQB Foundation', titleFr: 'Certification Fondamentale', duration: 'الشهور 1-3', actionAr: 'إكمال دورة جوجل الاحترافية عبر منحة Coursera أو دراسة منهج ISTQB لفحص البرمجيات.', actionFr: 'Suivi de la certification Google Data ou préparation ISTQB.' },
        { step: 2, titleAr: 'إتقان الأدوات العملية (SQL, Power BI, JIRA)', titleFr: 'Outils Pratiques', duration: 'الشهور 4-5', actionAr: 'تطبيق عملي على قواعد بيانات حقيقية وبناء داشبورد تفاعلية احترافية.', actionFr: 'Pratique concrète sur SQL et tableaux de bord Power BI.' },
        { step: 3, titleAr: 'نشر 3 دراسات حالة على LinkedIn و GitHub', titleFr: 'Projets Démonstrateurs', duration: 'الشهر 6-7', actionAr: 'عرض نماذج تحليلك للبيانات وحلول المشاكل لتراها أعين مدراء التوظيف.', actionFr: 'Publication d\'études de cas réelles sur LinkedIn.' },
        { step: 4, titleAr: 'الترشح لوظائف Junior Data / QA براتب يبدأ من 9,000 درهم', titleFr: 'Premier Poste Tech', duration: 'الشهر 8-9', actionAr: 'استهداف الشركات التقنية بالمغرب وعن بعد مع فرنسا وكندا.', actionFr: 'Candidatures ciblées vers les ESN et startups.' }
      ],
      prerequisitesAr: ['استعداد لتخصيص 10 إلى 15 ساعة تعلم أسبوعياً', 'فهم منطقي سليم وحب لحل المشاكل الرقمية', 'لغة فرنسية أو إنجليزية محترمة'],
      prerequisitesFr: ['10-15h de travail par semaine', 'Esprit logique et rigoureux', 'Français ou anglais professionnel'],
      proTipAr: 'ادمج خبرتك السابقة في السيرة الذاتية! لا تقل "أنا مبتدئ"، بل قل: "محترف تواصل يتمتع بخبرة سنتين في خدمة العملاء تخصص في تحليل بيانات ورضا المستخدمين".',
      proTipFr: 'Valorisez votre passé : présentez-vous comme un analyste data doté d\'une réelle intelligence relationnelle et métier.',
      guideRoute: { tab: 'side-hustles' }
    });

    return {
      compassType: 'shift',
      primarySummaryAr: `تحولك المهني يجب أن يبنى على استثمار مهاراتك الحالية دون البدء من الصفر: مسار البيانات وضمان الجودة (QA) هو أسرع جسر واقعي يضاعف دخلك خلال أقل من عام.`,
      primarySummaryFr: `Votre transition réussie : Capitalisez sur vos atouts linguistiques pour basculer vers la Data ou le QA Testing en 6 à 9 mois.`,
      pathways,
      calculatedAt: now
    };
  }

  // Side Hustle
  pathways.push({
    id: 'b2b-digital-services',
    rank: 1,
    titleAr: 'تقديم خدمات رقمية B2B للشركات المحلية والدولية (Micro-Agency)',
    titleFr: 'Services Numériques B2B pour Entreprises & PME',
    destinationOrTrack: 'دخل إضافي من 3,000 إلى 15,000 درهم شهرياً 💡',
    flagEmoji: '💵',
    matchScore: 94,
    difficulty: 'easy',
    costMAD: '0 إلى 500 درهم فقط',
    timeToComplete: 'أول زبون خلال 30 إلى 45 يوماً',
    whyThisPathAr: `أسرع طريقة لكسب دخل إضافي بدون رأس مال هي حل مشكلة واضحة لتاجر أو طبيب أو مقاول: إنشاء صفحات Google Business Profile، تحسين وجودهم على خرائط جوجل، صناعة ريلز قصيرة لمنتجاتهم، أو الرد على استفسارات واتساب بيزنس. يحتاجونك ومستعدون للدفع شهرياً.`,
    whyThisPathFr: `Offrez des micro-services concrets aux commerces et PME locales (Google Maps, Reels produits, gestion WhatsApp Business) contre des forfaits mensuels récurrents.`,
    roadmap: [
      { step: 1, titleAr: 'اختيار خدمة واحدة واضحة النتيجة', titleFr: 'Offre Unique', duration: 'الأسبوع 1', actionAr: 'مثال: "أرفع تصنيف محلك في خرائط جوجل لجلب 30 زبوناً إضافياً شهرياً".', actionFr: 'Définition d\'une offre claire et mesurable.' },
      { step: 2, titleAr: 'تقديم الخدمة مجاناً لأول عميل مقابل شهادة وفيديو', titleFr: 'Preuve Sociale', duration: 'الأسبوع 2', actionAr: 'خدمة صاحب محل تعرفه مجاناً للحصول على إثبات نجاح موثق.', actionFr: 'Cas client gratuit pour obtenir une recommandation.' },
      { step: 3, titleAr: 'التواصل المباشر مع 20 نشاطاً تجارياً مشابهاً', titleFr: 'Démarchage Ciblé', duration: 'الأسبوع 3-4', actionAr: 'إرسال فيديو قصير مخصص يوضح لصاحب العمل أين يخسر زبائن حالياً.', actionFr: 'Audit vidéo personnalisé envoyé à 20 commerces ciblés.' },
      { step: 4, titleAr: 'تثبيت 4 عملاء بدفع شهري (Retainer)', titleFr: 'Abonnements Mensuels', duration: 'الشهر 2+', actionAr: '4 عملاء يدفع كل منهم 1,500 درهم شهرياً = 6,000 درهم دخل إضافي مستقر.', actionFr: '4 clients à 1 500 MAD/mois = 6 000 MAD de revenus passifs récurrents.' }
    ],
    prerequisitesAr: ['هاتف ذكي وحاسوب', 'مهارة في التواصل المباشر وتقديم الاقتراحات للعملاء', 'التزام بـ 7 إلى 10 ساعات أسبوعياً'],
    prerequisitesFr: ['Smartphone et PC', 'Sens de la communication', '7 à 10h disponibles par semaine'],
    proTipAr: 'ركز على الأطباء، عيادات الأسنان، ومحلات الديكور وتأجير السيارات؛ فهم يملكون ميزانيات جاهزة ويبحثون فقط عمن يريحهم من عناء التسويق الرقمي.',
    proTipFr: 'Ciblez les professions libérales et commerces à fort panier moyen (cliniques, location de voitures, artisans haut de gamme).'
  });

  return {
    compassType: 'side-hustle',
    primarySummaryAr: `مشروعك الإضافي الذكي يجب أن يعتمد على بيع خدمة واضحة للشركات تدر عليك ربحاً شهرياً متكرراً دون مخاطرة مالية.`,
    primarySummaryFr: `Votre side hustle rentable : Résolvez un problème digital pour les commerces locaux avec un modèle d'abonnement mensuel sécurisé.`,
    pathways,
    calculatedAt: now
  };
}
