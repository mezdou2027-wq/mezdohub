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
  ArrowRight
} from 'lucide-react';
import { trackLeadConversion } from '../services/analytics';

interface DvLotteryHubProps {
  onBack?: () => void;
  onOpenConsultation?: () => void;
}

export const DvLotteryHub: React.FC<DvLotteryHubProps> = ({ onBack }) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  // Application Assistance Form State
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    phone: '',
    city: 'طنجة',
    educationLevel: 'بكالوريا (Bac)',
    maritalStatus: 'أعزب (Célibataire)',
    hasPassport: 'نعم',
    packageType: 'free' // 'free' or 'vip'
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingImage(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImagePreview(src);

      const img = new Image();
      img.onload = () => {
        const sizeKb = Math.round(file.size / 1024);
        const width = img.width;
        const height = img.height;
        const isSquare = width === height || Math.abs(width - height) <= 10;
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationData.fullName || !applicationData.phone) return;

    try {
      const existing = JSON.parse(localStorage.getItem('mezdohub_crm_leads') || '[]');
      const newLead = {
        id: `dv-${Date.now()}`,
        name: applicationData.fullName,
        phone: applicationData.phone,
        city: applicationData.city,
        diploma: `قرعة أمريكا: ${applicationData.educationLevel} (${applicationData.maritalStatus})`,
        selectedPackage: applicationData.packageType === 'vip' ? 'dv-vip-100mad' : 'dv-free',
        company: 'القرعة الأمريكية DV-2027',
        role: `تسجيل ومراجعة الصورة البيومترية (جواز سفر: ${applicationData.hasPassport})`,
        date: new Date().toLocaleDateString('ar-MA') + ' ' + new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' }),
        status: 'new'
      };
      localStorage.setItem('mezdohub_crm_leads', JSON.stringify([newLead, ...existing]));
    } catch {}

    // Track GA4 High-Value Conversion
    trackLeadConversion('dv_lottery_registration', 'القرعة الأمريكية DV-2027', {
      education: applicationData.educationLevel,
      marital_status: applicationData.maritalStatus,
      has_passport: applicationData.hasPassport
    });

    setApplicationSubmitted(true);
  };

  return (
    <div className={`space-y-12 animate-fade-in max-w-4xl mx-auto ${isAr ? 'text-right' : 'text-left font-[\'Inter\',sans-serif]'}`}>
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. CLEAN HERO BANNER (Vision 3.0 Standard)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-8 sm:p-10 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-center space-y-4">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-[#2563EB] border border-[#E2E8F0] dark:border-slate-700 mx-auto">
          <span>القرعة الأمريكية الرسمية DV-2027</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] dark:text-white leading-tight">
          فحص صورة القرعة الأمريكية والتسجيل القانوني
        </h1>

        <p className="text-sm text-[#64748B] dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
          أكثر من 65% من المترشحين يتم استبعادهم تلقائياً قبل القرعة بسبب مواصفات الصورة وحجمها. افحص صورتك الآن مجاناً بأداة المطابقة البيومترية المعتمدة رسمياً.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#photo-checker"
            className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-xs cursor-pointer active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>فحص الصورة مجاناً</span>
          </a>

          <a
            href="#registration-service"
            className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 text-[#334155] dark:text-slate-200 border border-[#CBD5E1] dark:border-slate-700 font-semibold text-xs transition-colors"
          >
            <span>خدمة مراجعة وتجهيز الملف</span>
          </a>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. BIOMETRIC PHOTO CHECKER (Strict White Card #FFFFFF)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="photo-checker" className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-6 shadow-xs">
        
        <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase text-[#2563EB]">US Department of State Standards</span>
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#2563EB]" />
              <span>أداة فحص مطابقة الصورة البيومترية (600×600 بكسل)</span>
            </h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700 font-medium">
            معالجة آمنة في جهازك
          </span>
        </div>

        {/* Upload Zone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="p-8 rounded-2xl border-2 border-dashed border-[#CBD5E1] dark:border-slate-700 hover:border-[#2563EB] bg-[#F8FAFC] dark:bg-slate-850 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group transition-all"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/jpeg,image/png" 
              className="hidden" 
            />

            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Candidate preview" 
                  className="w-36 h-36 object-cover rounded-xl border border-[#CBD5E1] shadow-xs mx-auto" 
                />
                <span className="block text-xs text-[#2563EB] font-semibold mt-2">اضغط لتغيير الصورة ↻</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#2563EB] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F172A] dark:text-white">ارفع صورتك لفحص المقاسات</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">صيغة JPG أو PNG من الهاتف أو استوديو التصوير</p>
                </div>
              </>
            )}
          </div>

          {/* Analysis Results View */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">
              نتائج فحص المعايير الأمريكية الرسمية:
            </h4>

            {imageSpecs ? (
              <div className="space-y-2 text-xs">
                {/* 1. Dimensions check */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {imageSpecs.hasGoodResolution ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span>الأبعاد: {imageSpecs.width} × {imageSpecs.height} بكسل</span>
                  </div>
                  <span className={`font-semibold ${imageSpecs.hasGoodResolution ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {imageSpecs.hasGoodResolution ? 'مطابق (>= 600px)' : 'غير مطابق'}
                  </span>
                </div>

                {/* 2. Square Aspect Ratio */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {imageSpecs.isSquare ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span>تناسب الصورة (1:1)</span>
                  </div>
                  <span className={`font-semibold ${imageSpecs.isSquare ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {imageSpecs.isSquare ? 'مربعة تماماً' : 'ليست مربعة تماماً'}
                  </span>
                </div>

                {/* 3. File Size */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {imageSpecs.isSizeValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span>حجم الملف: {imageSpecs.sizeKb} KB</span>
                  </div>
                  <span className={`font-semibold ${imageSpecs.isSizeValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {imageSpecs.isSizeValid ? 'مطابق (< 240KB)' : 'كبير جداً'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                  تأكد أن تكون الخلفية بيضاء ناصعة وبدون نظارات مع عدم استخدام أي فلتر لتعديل ملامح الوجه.
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-center text-xs text-[#64748B] space-y-1">
                <Info className="w-5 h-5 text-[#64748B] mx-auto" />
                <p>ارفع صورتك الآن لعرض تقرير الفحص الفوري للأبعاد والحجم ونسبة التطابق.</p>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. REGISTRATION ASSISTANCE (Clean Minimal White Container)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="registration-service" className="p-8 sm:p-10 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-center space-y-6">
        
        <div className="space-y-1.5 max-w-xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
            خدمة تجهيز ومراجعة ملف القرعة الأمريكية
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 leading-relaxed">
            مراجعة الصورة بالميليمتر، تعبئة الاستمارة الرسمية بالإنجليزية، وتسليم رقم التأكيد الرسمي (Confirmation Number).
          </p>
        </div>

        {applicationSubmitted ? (
          <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-center space-y-2 max-w-md mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-sm text-[#0F172A] dark:text-white">تم استلام طلبك بنجاح!</h4>
            <p className="text-xs text-[#64748B]">
              سيقوم مستشار MezdoHub للتوجيه بالتواصل معك عبر الواتساب لمراجعة الصورة وتأكيد إدخال بياناتك الرسمية.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto space-y-3.5 text-xs text-right">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">الاسم الكامل (كما بالبطاقة) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Amine Benali"
                  value={applicationData.fullName}
                  onChange={e => setApplicationData({ ...applicationData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">رقم الهاتف / الواتساب *</label>
                <input
                  type="tel"
                  required
                  placeholder="06XXXXXXXX"
                  value={applicationData.phone}
                  onChange={e => setApplicationData({ ...applicationData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">المدينة</label>
                <input
                  type="text"
                  placeholder="طنجة، الرباط، كازا..."
                  value={applicationData.city}
                  onChange={e => setApplicationData({ ...applicationData, city: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">المستوى الدراسي</label>
                <select
                  value={applicationData.educationLevel}
                  onChange={e => setApplicationData({ ...applicationData, educationLevel: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                >
                  <option value="بكالوريا (Bac)">بكالوريا (Bac)</option>
                  <option value="دبلوم OFPPT">دبلوم OFPPT</option>
                  <option value="إجازة جامعية (Licence)">إجازة جامعية (Licence)</option>
                  <option value="ماستر / مهندس">ماستر / مهندس</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">الحالة العائلية</label>
                <select
                  value={applicationData.maritalStatus}
                  onChange={e => setApplicationData({ ...applicationData, maritalStatus: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                >
                  <option value="أعزب (Célibataire)">أعزب (Célibataire)</option>
                  <option value="متزوج (Marié)">متزوج (Marié)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm cursor-pointer active:scale-95 transition-all shadow-xs"
            >
              إرسال الملف وبدء المراجعة
            </button>

          </form>
        )}

      </section>

    </div>
  );
};
