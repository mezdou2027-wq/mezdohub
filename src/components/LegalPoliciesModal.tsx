import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, AlertTriangle, ArrowRight, CheckCircle2, Scale } from 'lucide-react';

interface LegalPoliciesModalProps {
  initialTab?: 'privacy' | 'terms' | 'disclaimer' | 'cookies';
  onClose?: () => void;
}

export const LegalPoliciesModal: React.FC<LegalPoliciesModalProps> = ({ 
  initialTab = 'privacy',
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'disclaimer' | 'cookies'>(initialTab);

  return (
    <div className="space-y-8 animate-fade-in text-right">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <Scale className="w-4 h-4" />
            <span>الامتثال لمعايير Google AdSense والشفافية القانونية ⚖️</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            السياسات القانونية، الخصوصية، وإخلاء المسؤولية
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            وثائق رسمية لحماية بيانات المستخدمين وإيضاح طبيعة الخدمات الرقمية المقدمة على MezdoHub.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للمنصة</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'privacy', label: 'سياسة الخصوصية (Privacy Policy)', icon: Lock, badge: 'معايير AdSense & GDPR' },
          { id: 'terms', label: 'شروط الاستخدام (Terms of Service)', icon: FileText, badge: 'حقوق وواجبات المستخدم' },
          { id: 'disclaimer', label: 'إخلاء المسؤولية القانونية (Disclaimer)', icon: AlertTriangle, badge: 'عدم وساطة / استقلالية' },
          { id: 'cookies', label: 'ملفات تعريف الارتباط (Cookie Policy)', icon: ShieldCheck, badge: 'إعلانات Google المخصصة' },
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg shadow-blue-950/40'
                  : 'bg-[#0a1122] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span className="font-bold text-xs sm:text-sm">{item.label}</span>
              </div>
              <div className="text-[10px] text-slate-400">{item.badge}</div>
            </button>
          );
        })}
      </div>

      {/* CONTENT SECTIONS */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0a1122] border border-slate-800 space-y-8 leading-relaxed text-slate-300 text-xs sm:text-sm">
        
        {/* 1. Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" />
                <span>سياسة الخصوصية (Privacy Policy) - متوافقة 100% مع Google AdSense</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">آخر تحديث: 2026/2027</p>
            </div>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">1. مقدمة والتزام المنصة</h4>
              <p>
                نحن في منصة <strong>MezdoHub</strong> نولي خصوصية زوارنا أهمية قصوى. توضح هذه الوثيقة أنواع المعلومات الشخصية التي يتم استلامها وجمعها وكيفية استخدامها وحمايتها وفقاً لأعلى معايير الأمان الدولية ولوائح حماية البيانات العامة (GDPR).
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">2. ملفات السيرة الذاتية وأداة صانع الـ CV</h4>
              <p>
                جميع البيانات التي يدخلها المستخدم في أداة توليد السيرة الذاتية (CV ATS) أو محاكي الرواتب تُعالج محلياً في متصفح المستخدم (Client-Side). نحن لا نبيع، ولا نؤجر، ولا نشارك أي معلومات شخصية، أو أرقام هواتف، أو عناوين بريد إلكتروني مع أي طرف ثالث لأغراض تسويقية.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">3. ملفات السجل (Log Files)</h4>
              <p>
                مثل معظم خوادم المواقع الأخرى، يستخدم موقع MezdoHub ملفات السجل القياسية لتشخيص الأخطاء وضمان استقرار الخادم. تشمل هذه البيانات: عنوان بروتوكول الإنترنت (IP)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، طابع التاريخ والوقت، وصفحات الإحالة/الخروج. هذه البيانات غير مرتبطة بأي معلومات تحدد الهوية الشخصية للمستخدم.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">4. شبكة إعلانات Google AdSense وشريك الطرف الثالث</h4>
              <p>
                • تستخدم شركة Google، بصفتها مورداً لطرف ثالث، ملفات تعريف الارتباط (Cookies) لخدمة الإعلانات على موقعنا.<br />
                • يتيح استخدام Google لملف تعريف الارتباط <strong>DART</strong> عرض الإعلانات للمستخدمين بناءً على زيارتهم لموقعنا ومواقع أخرى على الإنترنت.<br />
                • يمكن للمستخدمين إلغاء الاشتراك في استخدام ملف تعريف الارتباط DART بزيارة سياسة الخصوصية الخاصة بإعلانات Google وشبكة المحتوى على الرابط الرسمي لشركة Google.
              </p>
            </section>
          </div>
        )}

        {/* 2. Terms of Service */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>شروط الاستخدام (Terms of Service)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">تحدد القواعد المنظمة لاستخدام أدوات ومحتوى المنصة</p>
            </div>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">1. قبول الشروط</h4>
              <p>
                باستخدامك لمنصة MezdoHub وتصفحك لمحتواها أو استخدام أي من حاسباتها وأدواتها المجانية، فإنك توافق التزاماً كاملاً بهذه الشروط. إذا كنت لا توافق على أي جزء منها، يُرجى التوقف عن استخدام المنصة.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">2. الاستخدام المجاني والمشروع</h4>
              <p>
                يُحظر استخدام المنصة في أي نشاط غير قانوني أو ينتهك القوانين والأنظمة المعمول بها بالمملكة المغربية أو القوانين الدولية. كما يُحظر محاولة تعطيل السيرفر، أو سحب المحتوى آلياً (Scraping) بشكل يضر بأداء الموقع.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">3. الملكية الفكرية</h4>
              <p>
                التصميمات، الخوارزميات، نصوص الحاسبات، والعلامة التجارية لمنصة MezdoHub هي حقوق ملكية فكرية محفوظة. بينما السير الذاتية والنماذج التي يولدها المستخدم هي ملكية كاملة وشخصية له وله مطلق الحرية في طباعتها واستخدامها في التقديم للوظائف.
              </p>
            </section>
          </div>
        )}

        {/* 3. Legal Disclaimer */}
        {activeTab === 'disclaimer' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>إخلاء المسؤولية القانونية (Legal & Regulatory Disclaimer)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">شرط جوهري يفرضه Google AdSense لحماية المستخدمين</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed space-y-1">
              <strong>تنبيه صريح للزوار: </strong>
              منصة MezdoHub هي منصة رقمية إرشادية مستقلة تماماً وتقدم أدوات تقنية وحاسبات توجيهية، وليست وكالة توظيف وسيطة، ولا تمثل أي جهة حكومية أو سفارة أجنبية أو مؤسسة بنكية.
            </div>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">1. استقلالية المنصة وعدم التدخل في التوظيف</h4>
              <p>
                جميع عروض العمل المنشورة (سواء لمصانع طنجة، أو مباريات الوظيفة العمومية، أو عقود الهجرة) هي معلومات مجمعة من مصادرها الرسمية والعلنية لمساعدة الباحثين عن عمل. نحن لا نتلقى أي عمولات، ولا نضمن توظيف أي شخص، فقرار القبول النهائي يرجع حصراً للمشغل ومسؤول التوظيف (HR) أو اللجان الرسمية للمباريات.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">2. دقة الحاسبات المالية والضريبية</h4>
              <p>
                حاسبات الراتب الصافي (Salaire Net)، واقتطاعات بايبال (PayPal Fees)، والضريبة على الدخل (IR) صُممت بناءً على قوانين المالية المغربية والعمولات المصرفية المعلنة، وهي لأغراض تقديرية واسترشادية بحتة، ولا تغني عن استشارة خبير محاسب أو الكشوفات الرسمية لمؤسساتك البنكية.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">3. التحذير الصارم من الاحتيال</h4>
              <p>
                تنبه منصة MezdoHub جميع متابعيها بعدم دفع أي أموال لأي شخص أو جهة تدعي بيع عقود عمل وهمية أو ضمان تأشيرات الهجرة. كل الخدمات الأساسية على منصتنا مجانية بالكامل.
              </p>
            </section>
          </div>
        )}

        {/* 4. Cookie Policy */}
        {activeTab === 'cookies' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>ملفات تعريف الارتباط (Cookie Policy)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">كيف نستخدم الكوكيز لتحسين تجربتك وعرض إعلانات ملائمة</p>
            </div>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">1. ما هي ملفات الكوكيز؟</h4>
              <p>
                ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك لتخزين تفضيلاتك (مثل اختيار الوضع الليلي/الفاتح، وحفظ مسودة السيرة الذاتية).
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-sm text-white">2. إدارة الكوكيز وإلغاؤها</h4>
              <p>
                يمكنك في أي وقت تعطيل أو مسح ملفات تعريف الارتباط من خلال إعدادات متصفحك (Chrome، Firefox، Safari)، ولكن ذلك قد يؤثر على حفظ اختياراتك السابقة في بعض أدوات المنصة.
              </p>
            </section>
          </div>
        )}

      </div>

    </div>
  );
};
