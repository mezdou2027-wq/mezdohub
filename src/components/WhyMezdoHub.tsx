import React from 'react';
import { 
  ShieldCheck, 
  Ban, 
  CheckCircle2, 
  Building2, 
  ExternalLink, 
  Scale, 
  Lock, 
  HelpCircle, 
  AlertTriangle,
  Award,
  Compass,
  ArrowLeft,
  Users,
  Check
} from 'lucide-react';

interface WhyMezdoHubProps {
  onSelectTab: (tab: string) => void;
  onOpenAiAssistant?: () => void;
}

export const WhyMezdoHub: React.FC<WhyMezdoHubProps> = ({ onSelectTab, onOpenAiAssistant }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in font-['Cairo',sans-serif] text-right">
      
      {/* Hero Badge & Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>ميثاق النزاهة والمصداقية القصوى · الشفافية الكاملة 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
          لماذا يمكنك الوثوق التام بمنصة <span className="text-blue-600">MezdoHub</span>؟
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          في عالم مليء بالوعود الزائفة وعقود العمل الوهمية، أسسنا MezdoHub لنكون المنصة الأولى في المغرب التي تعتمد الصدق المطلق وتوجهك مباشرة للبوابات الحكومية الرسمية دون وسطاء ولا عمولات خفية.
        </p>
      </div>

      {/* 5 Core Truth Principles (The Honest Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Principle 1 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-blue-500 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold">
            <Ban className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            1. لسنا مكتب هجرة ولا نبيع التأشيرات
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            نحن منصة تكنولوجية وإعلامية توعوية تقدم إرشادات وأدوات رقمية. لا نطلب منك تسليم جواز سفرك، ولا ندعي قدرتنا على "إخراج التأشيرة" كما يفعل السماسرة.
          </p>
        </div>

        {/* Principle 2 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-blue-500 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            2. لا نضمن القبول لأي شخص
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            القرار الوحيد لقبول التأشيرة أو منحة الدراسة أو عقد العمل يرجع حصراً للجهات الحكومية الرسمية وسفارات الدول (IRCC الكندية، السفارة الألمانية، القنصلية الفرنسية). أي جهة تعدك بنسبة 100% هي جهة مضللة.
          </p>
        </div>

        {/* Principle 3 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-blue-500 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            3. 100% مصادر حكومية رسمية
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            كل معلومة، شرط، أو رابط تراه في MezdoHub يوجهك مباشرة إلى الموقع الرسمي للدولة المعنية (.gov.ca / .de / .fr / .gov.au). نضمن خلو المحتوى من أي إشاعات أو مدونات غير موثقة.
          </p>
        </div>

        {/* Principle 4 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-blue-500 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            4. صفر عمولة من المتقدمين والباحثين
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            استخدام المنظمة والأدلة والذكاء الاصطناعي مجاني تماماً. لا نتقاضى أي مقابل أو اقتطاع مالي من الشباب أو الباحثين عن عمل، وهدفنا دمقرطة الوصول إلى الفرص الدولية.
          </p>
        </div>

        {/* Principle 5 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-blue-500 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            5. حماية الخصوصية ومكافحة الاحتيال
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            بياناتك لا تباع لأي طرف ثالث، ولدينا نظام إرشادي يحذرك دائماً من الحسابات البنكية المشبوهة أو المطالبة بالدفع المسبق مقابل عقود عمل في أوروبا.
          </p>
        </div>

        {/* Principle 6 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs hover:border-blue-500 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            6. أدوات رقمية تمكينية حقيقية
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            نساعدك على كتابة سيرتك الذاتية وفق معايير ATS الكندية والأوروبية، وحساب نقاط بطاقة الفرصة بنفسك، لتتقدم بملف قوي بشكل مستقل واحترافي.
          </p>
        </div>

      </div>

      {/* Comparison Table: MezdoHub vs Fake Intermediaries */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs overflow-hidden">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            مقارنة واضحة: منصة MezdoHub مقابل السماسرة والمكاتب غير المعتمدة
          </h2>
          <p className="text-xs text-slate-500">
            اطلع على الفرق لتفادي خسارة أموالك أو الحصول على رفض رسمي قد يحرمك من السفر.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="p-3 font-bold text-slate-900 dark:text-white">المعيار</th>
                <th className="p-3 font-bold text-blue-600 dark:text-blue-400">منصة MezdoHub الرسمية</th>
                <th className="p-3 font-bold text-rose-600">المكاتب غير المعتمدة والسماسرة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">تكلفة الاستخدام والخدمة</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>مجانية 100% للشباب والباحثين</span>
                </td>
                <td className="p-3 text-rose-600 font-medium">مبالغ ضخمة (من 20,000 إلى 80,000 درهم)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">الروابط ومصدر التقديم</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>مواقع الحكومات والوزارات الرسمية فقط</span>
                </td>
                <td className="p-3 text-rose-600 font-medium">روابط مشبوهة أو استمارات خاصة غير حكومية</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">ضمان النتائج</td>
                <td className="p-3 text-slate-700 dark:text-slate-300 font-bold">
                  صراحة تامة: القبول بيد الحكومة والسفارة فقط
                </td>
                <td className="p-3 text-rose-600 font-medium">وعود وهمية بالقبول 100% دون سند قانوني</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">ملكية الملف والحساب</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>أنت تدير حسابك وكلمات مرورك بنفسك</span>
                </td>
                <td className="p-3 text-rose-600 font-medium">يحتفظون بالملف لمنعك من معرفة الحقيقة</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Government Directories Links */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-lg text-white">دليل التحقق من البوابات الحكومية الرسمية</h3>
            <p className="text-xs text-slate-300">
              قبل تقديم أي وثيقة، تأكد دائماً أنك على النطاق الحكومي الرسمي المعتمد:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-between"
          >
            <span>🇨🇦 كندا: IRCC (.canada.ca)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href="https://www.make-it-in-germany.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-between"
          >
            <span>🇩🇪 ألمانيا: Make it in Germany</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href="https://immi.homeaffairs.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-between"
          >
            <span>🇦🇺 أستراليا: Home Affairs (.gov.au)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <a
            href="https://france-visas.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-between"
          >
            <span>🇫🇷 فرنسا: France-Visas (.gouv.fr)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          جاهز لبدء رحلتك بطريقة آمنة وقانونية وموثوقة؟
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onSelectTab('ai-assistant')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>تشخيص مؤهلاتك بالمساعد الذكي مجاناً</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTab('pillar-seo')}
            className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            <span>قراءة أدلة الهجرة الرسمية 2026</span>
          </button>
        </div>
      </div>

    </div>
  );
};
