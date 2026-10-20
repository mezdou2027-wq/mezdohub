import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  ShieldCheck, 
  Info, 
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Phone,
  Sparkles,
  Download,
  Scissors,
  Check,
  RefreshCw,
  Home,
  FileText,
  User,
  Calendar,
  MapPin,
  Clock,
  Printer
} from 'lucide-react';
import { trackLeadConversion } from '../services/analytics';
import { getSiteConfig } from '../services/siteConfig';

interface DvLotteryHubProps {
  onBack?: () => void;
  onOpenConsultation?: () => void;
  onNavigateToTab?: (tab: string, subTab?: string, id?: string) => void;
}

export const DvLotteryHub: React.FC<DvLotteryHubProps> = ({ onBack, onNavigateToTab }) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Active view tabs: 'service' (Registration Service) or 'checker' (Photo Tool) or 'guide'
  const [activeSubView, setActiveSubView] = useState<'service' | 'checker' | 'official'>('service');

  // Photo State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [analyzingImage, setAnalyzingImage] = useState<boolean>(false);
  const [imageSpecs, setImageSpecs] = useState<{
    width: number;
    height: number;
    sizeKb: number;
    isSquare: boolean;
    hasGoodResolution: boolean;
    isSizeValid: boolean;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Registration Intake Form State
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    birthDay: '15',
    birthMonth: '06',
    birthYear: '1998',
    birthCity: 'الدار البيضاء',
    birthCountry: 'المغرب (Morocco)',
    maritalStatus: 'single', // 'single' | 'married' | 'divorced' | 'widowed'
    childrenCount: '0',
    educationLevel: 'بكالوريا (High School Diploma)',
    phone: '',
    email: '',
    notes: '',
    packageType: 'standard' // 'standard' | 'vip'
  });

  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    referenceId: string;
    submittedAt: string;
    fullName: string;
    phone: string;
    photoPreview?: string | null;
  } | null>(null);

  // Photo Upload & Auto Analysis
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingImage(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImagePreview(src);
      setCroppedImage(null);

      const img = new Image();
      img.onload = () => {
        const sizeKb = Math.round(file.size / 1024);
        const width = img.width;
        const height = img.height;
        const isSquare = width === height || Math.abs(width - height) <= 15;
        const hasGoodResolution = width >= 600 && height >= 600;
        const isSizeValid = sizeKb <= 240;

        setImageSpecs({
          width,
          height,
          sizeKb,
          isSquare,
          hasGoodResolution,
          isSizeValid
        });
        setAnalyzingImage(false);
      };
      img.src = src;
    };

    reader.readAsDataURL(file);
  };

  // Instant Auto-Cropping to 600x600 Square using Canvas
  const handleAutoCropTo600 = () => {
    if (!imagePreview) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Crop to center square
      const minDim = Math.min(img.width, img.height);
      const startX = (img.width - minDim) / 2;
      const startY = (img.height - minDim) / 2;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 600, 600);
      ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, 600, 600);

      const croppedUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCroppedImage(croppedUrl);
      setImageSpecs({
        width: 600,
        height: 600,
        sizeKb: Math.round((croppedUrl.length * 3) / 4 / 1024),
        isSquare: true,
        hasGoodResolution: true,
        isSizeValid: true
      });
    };
    img.src = imagePreview;
  };

  // Download Cropped 600x600 Photo
  const handleDownloadCropped = () => {
    const targetImg = croppedImage || imagePreview;
    if (!targetImg) return;
    const a = document.createElement('a');
    a.href = targetImg;
    a.download = `mezdohub-dv-photo-600x600.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationData.firstName || !applicationData.lastName || !applicationData.phone) return;

    const refId = `MZ-DV-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('ar-MA')} - ${now.toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })}`;
    const fullNameLatin = `${applicationData.lastName.trim().toUpperCase()} ${applicationData.firstName.trim()}`;

    const newLead = {
      id: refId,
      name: fullNameLatin,
      phone: applicationData.phone,
      city: applicationData.birthCity,
      diploma: `DV-Lottery: ${applicationData.educationLevel}`,
      selectedPackage: applicationData.packageType === 'vip' ? 'dv-vip' : 'dv-standard',
      company: 'القرعة الأمريكية DV-2026/2027',
      role: `تسجيل ومراجعة الملف (الحالة: ${applicationData.maritalStatus}، أطفال: ${applicationData.childrenCount})`,
      date: formattedDate,
      status: 'new',
      details: {
        firstName: applicationData.firstName,
        lastName: applicationData.lastName,
        gender: applicationData.gender,
        birthDate: `${applicationData.birthDay}/${applicationData.birthMonth}/${applicationData.birthYear}`,
        email: applicationData.email,
        hasPhoto: Boolean(croppedImage || imagePreview)
      }
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mezdohub_crm_leads') || '[]');
      localStorage.setItem('mezdohub_crm_leads', JSON.stringify([newLead, ...existing]));
    } catch {}

    // Track GA4 conversion
    trackLeadConversion('dv_lottery_registration', 'خدمة تسجيل القرعة الأمريكية', {
      education: applicationData.educationLevel,
      marital_status: applicationData.maritalStatus
    });

    setSubmittedReceipt({
      referenceId: refId,
      submittedAt: formattedDate,
      fullName: fullNameLatin,
      phone: applicationData.phone,
      photoPreview: croppedImage || imagePreview
    });

    setApplicationSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // WhatsApp click-to-chat
  const handleOpenWhatsAppChat = () => {
    if (!submittedReceipt) return;
    const config = getSiteConfig();
    const cleanNum = (config.whatsappNumber || '212600000000').replace(/[^0-9]/g, '');
    const waNumber = cleanNum.startsWith('0') ? '212' + cleanNum.slice(1) : cleanNum;

    const msg = `السلام عليكم فريق MezdoHub، قمت بإرسال طلبي لتسجيل القرعة الأمريكية DV-Lottery عبر الموقع.\nرقم الملف المرجعي: ${submittedReceipt.referenceId}\nالاسم: ${submittedReceipt.fullName}\nرقم الهاتف: ${submittedReceipt.phone}\nيرجى تأكيد استلام طلبي وتدقيق صورتي.`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className={`space-y-8 animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 ${isAr ? 'text-right' : 'text-left'}`}>
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. TOP NAVIGATION & TRUST BANNER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={() => onBack ? onBack() : onNavigateToTab?.('home')}
            className="hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'الرئيسية' : 'Accueil'}</span>
          </button>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            {isAr ? 'بوابة القرعة الأمريكية الرسمية DV-2026/2027' : 'Portail DV Lottery USA'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {isAr ? 'التسجيل مفتوح رسمياً الآن' : 'Inscriptions ouvertes'}
          </span>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. HERO SECTION & IMPORTANT NOTICE ON OFFICIAL SITE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-xs">
            🇺🇸 Official Diversity Visa Program
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-slate-200">
            {isAr ? 'تحديث رسمي 2026' : 'Mise à jour 2026'}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
            {isAr ? (
              <>
                القرعة الأمريكية الرسمية (Green Card) 🇺🇸🇲🇦<br />
                <span className="text-blue-400">فحص الصورة البيومترية وخدمة التسجيل المعتمد</span>
              </>
            ) : (
              <>
                Loterie Américaine DV Officielle <br />
                <span className="text-blue-400">Vérification Photo Biométrique & Enregistrement</span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
            {isAr ? (
              'نظراً للضغط العالمي والبطء الشديد الذي يواجهه المترشحون على السيرفر الحكومي الأمريكي، نقدم لك خدمة مرافقة وتدقيق تقني شاملة: مراجعة صورتك بالميليـمتر، تعبئة بياناتك بالإنجليزية الرسمية، وتسليمك وصلك ورقم التأكيد (Confirmation Number) فوراً لحمايتك من الأخطاء والإقصاء.'
            ) : (
              'Face aux lenteurs des serveurs officiels, nous assurons la vérification rigoureuse de votre photo 600x600 px, la saisie sans faute et la remise immédiate de votre numéro de confirmation officiel.'
            )}
          </p>
        </div>

        {/* 3 Quick Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setActiveSubView('service')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubView === 'service'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? '1. خدمة التسجيل ومراجعة الملف' : '1. Service Inscription'}</span>
          </button>

          <button
            onClick={() => setActiveSubView('checker')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubView === 'checker'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{isAr ? '2. فاحص وقاص الصورة (600×600 px)' : '2. Validateur Photo'}</span>
          </button>

          <button
            onClick={() => setActiveSubView('official')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubView === 'official'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>{isAr ? '3. الموقع الحكومي الرسمي والشروط' : '3. Site Officiel'}</span>
          </button>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VIEW 1: REGISTRATION SERVICE & INTAKE FORM
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubView === 'service' && (
        <section className="space-y-6">
          
          {submittedReceipt ? (
            /* Digital Receipt Card upon submission */
            <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 animate-fade-in text-center max-w-2xl mx-auto" id="dv-receipt-print">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                  {isAr ? 'وصل استلام طلب التسجيل المبدئي' : 'Reçu officiel d\'enregistrement'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  تم استلام ملفك بنجاح!
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  احتفظ برقم الملف المرجعي الخاص بك لتتبع حالة التسجيل واستلام رقم التأكيد الأمريكي (Confirmation Number).
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-right text-xs space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2.5">
                  <span className="text-slate-500 font-sans">{isAr ? 'رقم الملف المرجعي:' : 'N° Référence :'}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-sm tracking-wider">{submittedReceipt.referenceId}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2.5">
                  <span className="text-slate-500 font-sans">{isAr ? 'اسم المترشح:' : 'Nom du candidat :'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{submittedReceipt.fullName}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2.5">
                  <span className="text-slate-500 font-sans">{isAr ? 'رقم الواتساب / الهاتف:' : 'Téléphone / WhatsApp :'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{submittedReceipt.phone}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2.5">
                  <span className="text-slate-500 font-sans">{isAr ? 'تاريخ الإرسال:' : 'Date d\'envoi :'}</span>
                  <span className="text-slate-700 dark:text-slate-300">{submittedReceipt.submittedAt}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-sans">{isAr ? 'حالة الطلب:' : 'Statut :'}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold font-sans">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isAr ? 'قيد المراجعة وتدقيق الصورة' : 'En cours de traitement'}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleOpenWhatsAppChat}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isAr ? 'تأكيد الملف عبر الواتساب وتلقي رقم التأكيد' : 'Confirmer sur WhatsApp'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'طباعة الوصل / حفظ PDF' : 'Imprimer le reçu'}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setSubmittedReceipt(null);
                    setApplicationSubmitted(false);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold cursor-pointer"
                >
                  {isAr ? '← تسجيل شخص آخر (زوج، زوجة، أخ أو صديق)' : 'Enregistrer une autre personne'}
                </button>
              </div>
            </div>
          ) : (
            /* Registration Intake Form */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
              
              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isAr ? 'خدمة مرافقة وتدقيق وتسجيل آمن 100%' : 'Service officiel sécurisé'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {isAr ? 'استمارة طلب التسجيل والمراجعة التقنية' : 'Formulaire de demande d\'enregistrement'}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isAr ? (
                    'املأ بياناتك بدقة مطابقة للبطاقة الوطنية أو جواز السفر باللغة الفرنسية/الإنجليزية. سنقوم بمراجعة صورتك والتسجيل نيابة عنك وإرسال رقم التأكيد الرسمي (Confirmation Number) إليك مباشرة.'
                  ) : (
                    'Veuillez renseigner vos coordonnées en caractères latins conformément à vos pièces d\'identité.'
                  )}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* 1. Name & Identity */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>{isAr ? '1. معلومات الهوية (بحروف لاتينية):' : '1. Identité (en caractères latins)'}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {isAr ? 'الاسم العائلي (Last / Family Name) *' : 'Nom de famille *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: BENALI"
                        value={applicationData.lastName}
                        onChange={e => setApplicationData({ ...applicationData, lastName: e.target.value.toUpperCase() })}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs uppercase outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {isAr ? 'الاسم الشخصي (First / Given Name) *' : 'Prénom *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Amine"
                        value={applicationData.firstName}
                        onChange={e => setApplicationData({ ...applicationData, firstName: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {isAr ? 'الجنس (Gender) *' : 'Genre *'}
                      </label>
                      <select
                        value={applicationData.gender}
                        onChange={e => setApplicationData({ ...applicationData, gender: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600"
                      >
                        <option value="male">{isAr ? 'ذكر (Male)' : 'Homme (Male)'}</option>
                        <option value="female">{isAr ? 'أنثى (Female)' : 'Femme (Female)'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {isAr ? 'مدينة الازدياد (City of Birth) *' : 'Ville de naissance *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Tanger, Casablanca, Rabat..."
                        value={applicationData.birthCity}
                        onChange={e => setApplicationData({ ...applicationData, birthCity: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Birth Date & Family Status */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{isAr ? '2. تاريخ الازدياد والحالة العائلية:' : '2. Date de naissance & Situation'}</span>
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">{isAr ? 'اليوم' : 'Jour'}</label>
                      <select
                        value={applicationData.birthDay}
                        onChange={e => setApplicationData({ ...applicationData, birthDay: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-center font-mono"
                      >
                        {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">{isAr ? 'الشهر' : 'Mois'}</label>
                      <select
                        value={applicationData.birthMonth}
                        onChange={e => setApplicationData({ ...applicationData, birthMonth: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-center font-mono"
                      >
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">{isAr ? 'السنة' : 'Année'}</label>
                      <select
                        value={applicationData.birthYear}
                        onChange={e => setApplicationData({ ...applicationData, birthYear: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-center font-mono"
                      >
                        {Array.from({ length: 55 }, (_, i) => String(2008 - i)).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {isAr ? 'الحالة العائلية *' : 'Situation matrimoniale *'}
                      </label>
                      <select
                        value={applicationData.maritalStatus}
                        onChange={e => setApplicationData({ ...applicationData, maritalStatus: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                      >
                        <option value="single">{isAr ? 'عازب / غير متزوج (Single)' : 'Célibataire'}</option>
                        <option value="married">{isAr ? 'متزوج (Married)' : 'Marié(e)'}</option>
                        <option value="divorced">{isAr ? 'مطلق (Divorced)' : 'Divorcé(e)'}</option>
                        <option value="widowed">{isAr ? 'أرمل (Widowed)' : 'Veuf / Veuve'}</option>
                      </select>
                    </div>

                    {applicationData.maritalStatus === 'married' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          {isAr ? 'عدد الأطفال غير المتزوجين (أقل من 21 سنة)' : 'Nombre d\'enfants'}
                        </label>
                        <select
                          value={applicationData.childrenCount}
                          onChange={e => setApplicationData({ ...applicationData, childrenCount: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                        >
                          <option value="0">0 (بدون أطفال)</option>
                          <option value="1">1 طفل</option>
                          <option value="2">2 أطفال</option>
                          <option value="3">3 أطفال</option>
                          <option value="4+">4 أو أكثر</option>
                        </select>
                      </div>
                    )}

                    <div className={applicationData.maritalStatus === 'married' ? '' : 'sm:col-span-2'}>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {isAr ? 'المستوى الدراسي *' : 'Niveau d\'études *'}
                      </label>
                      <select
                        value={applicationData.educationLevel}
                        onChange={e => setApplicationData({ ...applicationData, educationLevel: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                      >
                        <option value="بكالوريا (High School Diploma)">بكالوريا (High School Diploma)</option>
                        <option value="دبلوم تقني متخصص (Vocational School)">دبلوم تقني متخصص (OFPPT / BTS / DUT)</option>
                        <option value="إجازة جامعية (University Degree)">إجازة جامعية (Licence / Bachelor)</option>
                        <option value="ماستر / مهندس دولة (Master / Engineer)">ماستر / مهندس دولة (Master / Ingénieur)</option>
                        <option value="دكتوراه (Doctorate)">دكتوراه (Doctorate / PhD)</option>
                        <option value="أخرى مع سنتين خبرة مهنية">أخرى (مع سنتين خبرة مهنية على الأقل)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Contact & Phone */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>{isAr ? '3. معلومات الاتصال (لتلقي رقم التأكيد الرسمي):' : '3. Coordonnées'}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {isAr ? 'رقم الهاتف والواتساب (WhatsApp) *' : 'Téléphone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="06XXXXXXXX / 07XXXXXXXX"
                        value={applicationData.phone}
                        onChange={e => setApplicationData({ ...applicationData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs outline-none focus:border-blue-600"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        {isAr ? 'ضروري لإرسال وصل التأكيد ورقم الـ Confirmation Number' : 'Pour l\'envoi du numéro de confirmation'}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {isAr ? 'البريد الإلكتروني (Email)' : 'Adresse Email'}
                      </label>
                      <input
                        type="email"
                        placeholder="exemple@gmail.com"
                        value={applicationData.email}
                        onChange={e => setApplicationData({ ...applicationData, email: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Photo Attachment */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-600" />
                      <span>{isAr ? '4. صورتك البيومترية (أو ارفعها الآن وسنقوم بضبطها):' : '4. Photo biométrique'}</span>
                    </h3>
                    {imagePreview && (
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        {isAr ? 'تم إرفاق الصورة' : 'Photo jointe'}
                      </span>
                    )}
                  </div>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 bg-slate-50 dark:bg-slate-850 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer group transition-all"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/jpeg,image/png"
                      className="hidden"
                    />

                    {imagePreview ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={croppedImage || imagePreview}
                          alt="Photo Preview"
                          className="w-20 h-20 rounded-xl object-cover border border-slate-300 shadow-sm"
                        />
                        <div className="text-right">
                          <span className="font-bold text-xs text-slate-900 dark:text-white block">
                            {isAr ? 'تم تحديد الصورة بنجاح' : 'Photo chargée'}
                          </span>
                          <span className="text-[11px] text-blue-600 block mt-0.5">
                            {isAr ? 'اضغط هنا لتغيير الصورة ↻' : 'Changer la photo'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-blue-600 flex items-center justify-center shadow-xs">
                          <Upload className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {isAr ? 'اضغط لرفع صورتك من الهاتف أو الحاسوب' : 'Cliquez pour charger votre photo'}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {isAr ? 'إذا لم تكن بالمقاس المناسب، سيقوم فريقنا بضبطها تقنياً 600x600 px' : 'Format JPG/PNG'}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Trust Guarantee Note */}
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                  <span className="font-bold block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    {isAr ? 'ميثاق النزاهة والشفافية التامة:' : 'Engagement de transparence :'}
                  </span>
                  <p className="leading-relaxed">
                    {isAr ? (
                      'التسجيل في القرعة يتم بإدخال بياناتك مباشرة في السيرفر الرسمي الأمريكي فور مراجعة الصورة. يتم تسليمك وصل التأكيد الرسمي متضمناً رقم الـ Confirmation Number الخاص بك فوراً لمتابعته بنفسك في شهر ماي.'
                    ) : (
                      'Votre numéro de confirmation officiel vous est remis dès validation.'
                    )}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/30 cursor-pointer active:scale-98 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{isAr ? 'إرسال الملف وتأكيد التسجيل الآن' : 'Envoyer mon dossier maintenant'}</span>
                </button>
              </form>

            </div>
          )}

        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VIEW 2: BIOMETRIC PHOTO CHECKER & AUTO-CROPPER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubView === 'checker' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Department of State Biometric Specifications
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="w-6 h-6 text-blue-600" />
              <span>{isAr ? 'فاحص الصورة البيومترية وقاص 600×600 بكسل' : 'Validateur Photo 600x600 px'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {isAr ? 'افحص صورتك هل تطابق شروط الخارجية الأمريكية، وقصها تلقائياً لتكون مربعة ومطابقة 100%.' : 'Vérifiez la conformité de votre photo selon les critères américains.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Upload & Preview Canvas */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 bg-slate-50 dark:bg-slate-850 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group transition-all"
            >
              {imagePreview ? (
                <div className="space-y-2">
                  <img
                    src={croppedImage || imagePreview}
                    alt="Preview"
                    className="w-44 h-44 rounded-2xl object-cover border-2 border-blue-500 shadow-md mx-auto"
                  />
                  <span className="block text-xs font-bold text-blue-600">
                    {isAr ? 'اضغط لتغيير الصورة ↻' : 'Changer l\'image'}
                  </span>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-blue-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {isAr ? 'ارفع صورتك لفحص المقاسات' : 'Charger une photo'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isAr ? 'صورة استوديو أو صورة بهاتفك بخلفية بيضاء' : 'Format JPG/PNG'}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Verification Checklist */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white">
                {isAr ? 'معايير الفحص الآلي الرسمي:' : 'Critères officiels :'}
              </h4>

              {imageSpecs ? (
                <div className="space-y-2">
                  {/* Dimension */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {imageSpecs.hasGoodResolution ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span>الأبعاد: {imageSpecs.width} × {imageSpecs.height} بكسل</span>
                    </div>
                    <span className={`font-bold ${imageSpecs.hasGoodResolution ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {imageSpecs.hasGoodResolution ? 'مطابق (>= 600px)' : 'غير كافية'}
                    </span>
                  </div>

                  {/* Aspect ratio */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {imageSpecs.isSquare ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                      <span>التناسب المربع (1:1 Aspect Ratio)</span>
                    </div>
                    <span className={`font-bold ${imageSpecs.isSquare ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {imageSpecs.isSquare ? 'مربعة تماماً' : 'تحتاج قص'}
                    </span>
                  </div>

                  {/* Size */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {imageSpecs.isSizeValid ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span>حجم الملف: {imageSpecs.sizeKb} KB (الحد الأقصى 240 KB)</span>
                    </div>
                    <span className={`font-bold ${imageSpecs.isSizeValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {imageSpecs.isSizeValid ? 'مطابق' : 'كبير جداً'}
                    </span>
                  </div>

                  {/* Crop Action */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={handleAutoCropTo600}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <Scissors className="w-4 h-4" />
                      <span>{isAr ? 'قص وضبط تلقائي لمقاس 600×600 px' : 'Recadrer à 600x600 px'}</span>
                    </button>

                    {(croppedImage || imagePreview) && (
                      <button
                        onClick={handleDownloadCropped}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>{isAr ? 'تحميل الصورة جاهزة' : 'Télécharger'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-400 space-y-1.5">
                  <p>• مقاس 600×600 بكسل على الأقل.</p>
                  <p>• خلفية بيضاء نقية تماماً دون أي ظلال.</p>
                  <p>• نزع النظارات الطبية أو الشمسية إجباري.</p>
                  <p>• تعابير وجه محايدة والنظر مباشرة إلى العدسة.</p>
                </div>
              )}

            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => setActiveSubView('service')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>{isAr ? 'استخدم هذه الصورة في التسجيل الآن ←' : 'Utiliser cette photo'}</span>
            </button>
          </div>

        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VIEW 3: OFFICIAL US GOVERNMENT INSTRUCTIONS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubView === 'official' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
              Official US State Department Portal
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {isAr ? 'الموقع الرسمي للقرعة الأمريكية وإرشادات التسجيل الذاتي' : 'Lien Officiel du Département d\'État'}
            </h2>
          </div>

          {/* Official Site Link Card */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">الموقع الحكومي الوحيد والآمن:</span>
              <span className="text-xs font-mono font-bold text-blue-600">dvprogram.state.gov</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              إذا كنت تتقن الإنجليزية ومستعداً لتعبئة الاستمارة بنفسك ولديك صورة مطابقة 100%، يمكنك التقديم مباشرة عبر الموقع الحكومي مجاناً:
            </p>

            <div className="pt-2">
              <a
                href="https://dvprogram.state.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>فتح الموقع الحكومي الرسمي (dvprogram.state.gov)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Troubleshooting Advice */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-2">
            <h4 className="font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>لماذا يواجه الكثيرون رسالة خطأ (403 أو الموقع لا يفتح)؟</span>
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-xs leading-relaxed">
              <li>السيرفر الحكومي يتعرض لملايين الطلبات متزامنة في الأيام الأولى.</li>
              <li>الحل: افتح الرابط في نافذة تصفح خاصة (Private / Incognito window) أو استخدم متصفحاً آخراً.</li>
              <li>تأكد من كتابة الرابط مع https: <code>https://dvprogram.state.gov/</code></li>
              <li>إذا كنت تخشى الوقوع في أي خطأ، يمكنك الاعتماد على <button onClick={() => setActiveSubView('service')} className="underline font-bold text-blue-700 dark:text-blue-300 cursor-pointer">خدمة MezdoHub لمراجعة وتدقيق ملفك</button>.</li>
            </ul>
          </div>

        </section>
      )}

    </div>
  );
};
