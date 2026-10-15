import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Calculator,
  FileSpreadsheet,
  FileText,
  Copy,
  Check,
  Building,
  Coins,
  Percent,
  Download,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface FreelanceFinanceHubProps {
  onBack?: () => void;
  initialTab?: 'paypal' | 'auto-entrepreneur' | 'invoice-maker' | 'wise' | 'income-ideas';
}

export const FreelanceFinanceHub: React.FC<FreelanceFinanceHubProps> = ({ onBack, initialTab = 'paypal' }) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOOL 1: PAYPAL TO MOROCCAN BANKS CALCULATOR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [ppAmount, setPpAmount] = useState<number>(150);
  const [selectedBank, setSelectedBank] = useState<'cih' | 'attijari' | 'bmce'>('cih');
  const usdToMadRate = 9.90;

  // PayPal Standard Merchant Fee: 4.4% + $0.30
  const ppPercentage = 0.044;
  const ppFixed = 0.30;
  const ppFee = ppAmount * ppPercentage + ppFixed;
  const ppNetUsd = Math.max(0, ppAmount - ppFee);

  // Moroccan Bank FX Spread & Withdrawal:
  // Transfer to Visa Card (CIH Code30 / Attijari): PayPal charges $5 or 1% or FX rate margin ~ 2.5%
  const bankMargin = selectedBank === 'cih' ? 0.024 : 0.028;
  const effectiveRate = usdToMadRate * (1 - bankMargin);
  const madPayout = ppNetUsd * effectiveRate;
  const hiddenSpreadMad = (ppNetUsd * usdToMadRate) - madPayout;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOOL 2: AUTO-ENTREPRENEUR MOROCCO TAX SIMULATOR 2026
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [caAmount, setCaAmount] = useState<number>(45000); // Chiffre d'Affaires Trimestriel
  const [activityType, setActivityType] = useState<'services' | 'commerce'>('services');

  // Moroccan Auto-Entrepreneur Law 2026:
  // Services & Professions Libérales: 2% of CA (Turnover capped at 200,000 DH/year)
  // Commercial, Industrial & Craft activities: 1% of CA (Turnover capped at 500,000 DH/year)
  // CNSS AMO: Approx 99 to 110 DH / month = 300 DH / quarter
  const taxRate = activityType === 'services' ? 0.02 : 0.01;
  const annualCap = activityType === 'services' ? 200000 : 500000;
  const quarterlyCap = annualCap / 4;
  
  const taxPayable = caAmount * taxRate;
  const cnssQuarterly = 300; // AMO cotisations
  const totalDue = taxPayable + cnssQuarterly;
  const netEarnings = Math.max(0, caAmount - totalDue);
  const isOverCap = caAmount > quarterlyCap;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOOL 3: MOROCCAN LEGAL INVOICE GENERATOR (FACTURE AUTO-ENTREPRENEUR)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `FACT-2026-001`,
    invoiceDate: new Date().toISOString().split('T')[0],
    providerName: 'يونس الإدريسي',
    iceProvider: '003124567000089',
    autoEntId: 'AE-894523-TNG',
    clientName: 'Société Atlas Digital SARL',
    clientIce: '002987654000012',
    description: 'Développement d\'une application web & intégration API de paiement',
    amountMad: 8500
  });
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  const generateInvoiceText = () => {
    return `=====================================================
                  FACTURE / فاتورة قانونية
=====================================================
Numéro de Facture : ${invoiceData.invoiceNumber}
Date d'émission   : ${invoiceData.invoiceDate}

ÉMETTEUR (Auto-Entrepreneur) :
Nom & Prénom      : ${invoiceData.providerName}
Identifiant AE    : ${invoiceData.autoEntId}
Numéro I.C.E      : ${invoiceData.iceProvider}
Régime fiscal     : Auto-Entrepreneur (Exonéré de TVA - Art. 89-I du CGI Maroc)

CLIENT :
Raison Sociale    : ${invoiceData.clientName}
Numéro I.C.E      : ${invoiceData.clientIce}

DÉSIGNATION DES PRESTATIONS :
-----------------------------------------------------
1. ${invoiceData.description}
-----------------------------------------------------
Montant Total Brut (Hors Taxe) : ${invoiceData.amountMad.toLocaleString()} MAD
Taux de T.V.A                  : 0.00 % (Exonération Légale)
-----------------------------------------------------
MONTANT NET À PAYER (TTC)      : ${invoiceData.amountMad.toLocaleString()} DIRHAMS
-----------------------------------------------------
Arrêté la présente facture à la somme de :
${invoiceData.amountMad.toLocaleString()} Dirhams Marocains.

Mode de Paiement : Virement Bancaire (CIH / Attijariwafa)
Cachet & Signature de l'Auto-Entrepreneur :
${invoiceData.providerName}
=====================================================`;
  };

  const handleCopyInvoice = () => {
    navigator.clipboard.writeText(generateInvoiceText());
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2500);
  };

  // Tool 4: Wise Calculation
  const [wiseAmount, setWiseAmount] = useState<number>(300);
  const wiseFee = wiseAmount * 0.0065 + 1.2;
  const wiseNet = Math.max(0, wiseAmount - wiseFee);
  const wiseMadPayout = wiseNet * usdToMadRate;

  return (
    <div className={`space-y-10 animate-fade-in ${isAr ? 'text-right' : 'text-left font-[\'Inter\',sans-serif]'}`}>
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. CLEAN TOP BANNER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-8 sm:p-10 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-[#2563EB] border border-[#E2E8F0] dark:border-slate-700">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{isAr ? 'منظومة العمل الحر والمالية الرقمية بالمغرب 2026' : 'Freelance & Finance Maroc'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] dark:text-white leading-tight">
            {isAr ? 'حاسبات العمل الحر، بنوك المغرب، والمقاول الذاتي' : 'Calculateurs Freelance, Devises & Auto-Entrepreneur'}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 font-normal leading-relaxed">
            {isAr 
              ? 'احسب بدقة صافي ما سيصلك من بايبال إلى حسابك (CIH / التجاري)، احسب ضرائب المقاول الذاتي 2026، وولّد فواتيرك القانونية المتوافقة مع الـ ICE في ثوانٍ.'
              : 'Simulateurs de conversion PayPal vers banques marocaines, calcul des impôts auto-entrepreneur 2026 et modèle de facture conforme ICE.'}
          </p>
        </div>

        {/* SUB-TABS NAVIGATION (Tools Selector) */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E2E8F0] dark:border-slate-800">
          {[
            { id: 'paypal', label: isAr ? 'حاسبة بايبال (PayPal ➔ بنوك المغرب)' : 'PayPal vers Banques MA', icon: DollarSign },
            { id: 'auto-entrepreneur', label: isAr ? 'محاكي المقاول الذاتي (ضرائب 2026)' : 'Impôts Auto-Entrepreneur', icon: Calculator },
            { id: 'invoice-maker', label: isAr ? 'مولد الفواتير القانونية (Facture ICE)' : 'Générateur de Factures', icon: FileSpreadsheet },
            { id: 'wise', label: isAr ? 'حاسبة وايز (Wise ➔ MAD)' : 'Calculateur Wise', icon: Coins },
            { id: 'income-ideas', label: isAr ? 'أفكار دخل بالدولار' : 'Idées de revenus', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 1: PAYPAL TO MOROCCAN BANKS CALCULATOR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'paypal' && (
        <div className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-6 shadow-xs max-w-3xl mx-auto">
          
          <div className="border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#2563EB]" />
              <span>حاسبة التحويل من بايبال إلى الحسابات البنكية المغربية</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              المعادلة الرسمية الدقيقة (4.4% + 0.30$) مع احتساب هوامش الصرف لبطاقات CIH Code30 و التجاري وفا بنك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] dark:text-slate-200 mb-1.5">
                  المبلغ المرسل من العميل بالدولار ($ USD):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="10000"
                    value={ppAmount}
                    onChange={e => setPpAmount(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-850 text-lg font-bold font-mono text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                  />
                  <span className="absolute left-3 top-3 font-bold text-[#64748B]">$ USD</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] dark:text-slate-200 mb-1.5">
                  البنك المغربي المستقبل للتحويل:
                </label>
                <select
                  value={selectedBank}
                  onChange={e => setSelectedBank(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white font-semibold outline-none"
                >
                  <option value="cih">CIH Bank (بطاقة Code 30 / E-Shopping) - الأسرع</option>
                  <option value="attijari">Attijariwafa Bank (حساب الشباب / L'banka)</option>
                  <option value="bmce">Bank of Africa (BMCE)</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                ⚠️ ينصح دائماً بطلب تحويل المبلغ من بايبال بالدولار وتركه للبنك المغربي ليقوم بالصرف لتفادي عمولة بايبال الإضافية (3.5% Currency Conversion Fee).
              </div>
            </div>

            {/* Calculations Outcome */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-700 space-y-4">
              <span className="text-[11px] font-bold uppercase text-[#2563EB]">الصافي الحقيقي بالدرهم المغربي</span>
              
              <div className="text-3xl font-black text-[#2563EB]">
                {madPayout.toFixed(2)} <span className="text-sm font-bold text-slate-500">درهم MAD</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E2E8F0] dark:border-slate-700 text-xs">
                <div className="flex justify-between text-[#475569] dark:text-slate-300">
                  <span>اقتطاع بايبال التجاري:</span>
                  <span className="font-mono text-rose-500 font-semibold">-{ppFee.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between text-[#475569] dark:text-slate-300">
                  <span>الرصيد الصافي بالدولار:</span>
                  <span className="font-mono font-bold text-[#0F172A] dark:text-white">{ppNetUsd.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>فارق الصرف التقديري:</span>
                  <span className="font-mono text-slate-400">~{hiddenSpreadMad.toFixed(1)} DH</span>
                </div>
                <div className="flex justify-between text-[#475569] dark:text-slate-300 font-bold pt-1 border-t border-dashed border-slate-300 dark:border-slate-700">
                  <span>مدة وصول الحوالة:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">2 إلى 3 أيام عمل</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 2: AUTO-ENTREPRENEUR TAX SIMULATOR 2026
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'auto-entrepreneur' && (
        <section className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-8 shadow-xs max-w-3xl mx-auto">
          
          <div className="border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#2563EB]" />
              <span>محاكي الضرائب والضمان الاجتماعي للمقاول الذاتي بالمغرب 2026</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              مضبوط وفق التعديلات الضريبية لقانون المالية المغربي ونسب الإقرار الفصلي (Déclaration Trimestrielle).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] dark:text-slate-200 mb-1.5">
                  رقم المعاملات المحقق خلال 3 أشهر (Chiffre d'affaires trimestriel):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    max="500000"
                    value={caAmount}
                    onChange={e => setCaAmount(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-850 text-lg font-bold font-mono text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                  />
                  <span className="absolute left-3 top-3 font-bold text-[#64748B]">MAD</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] dark:text-slate-200 mb-1.5">
                  طبيعة النشاط المهني:
                </label>
                <select
                  value={activityType}
                  onChange={e => setActivityType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white font-semibold outline-none"
                >
                  <option value="services">تقديم الخدمات / المهن الرقمية والفريلانس (الضريبة 2%)</option>
                  <option value="commerce">الأنشطة التجارية والصناعية والحرفية (الضريبة 1%)</option>
                </select>
              </div>

              {isOverCap && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-[11px] text-rose-700 dark:text-rose-300 leading-relaxed flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>تنبيه: المبلغ يتجاوز السقف الفصلي الموصى به ({quarterlyCap.toLocaleString()} درهم) لمواصلة الاستفادة من الإعفاءات الميسرة.</span>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[11px] text-[#475569] dark:text-slate-300 leading-relaxed">
                📌 السقف السنوي القانوني: <strong>200,000 درهم</strong> للخدمات و <strong>500,000 درهم</strong> للتجارة والصناعة.
              </div>
            </div>

            {/* Tax Outcomes */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-700 space-y-4">
              <span className="text-[11px] font-bold uppercase text-[#2563EB]">إجمالي ما تدفعه للدولة كل 3 أشهر</span>
              
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400">
                {totalDue.toLocaleString()} <span className="text-sm font-bold text-slate-500">درهم مستحقة</span>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E2E8F0] dark:border-slate-700 text-xs">
                <div className="flex justify-between text-[#475569] dark:text-slate-300">
                  <span>الضريبة على الدخل ({activityType === 'services' ? '2%' : '1%'}):</span>
                  <span className="font-mono font-bold">{taxPayable.toLocaleString()} MAD</span>
                </div>
                <div className="flex justify-between text-[#475569] dark:text-slate-300">
                  <span>التغطية الصحية الإجبارية (AMO CNSS):</span>
                  <span className="font-mono font-bold">~{cnssQuarterly} MAD (فصلياً)</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold pt-2 border-t border-slate-300 dark:border-slate-700">
                  <span>صافي أرباحك الحقيقية في جيبك:</span>
                  <span className="font-mono text-base">{netEarnings.toLocaleString()} MAD</span>
                </div>
              </div>
            </div>

          </div>

        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 3: LEGAL MOROCCAN INVOICE GENERATOR (FACTURE ICE)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'invoice-maker' && (
        <section className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-8 shadow-xs max-w-3xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#2563EB]" />
                <span>مولد الفواتير القانونية للمقاول الذاتي (Facture Conforme ICE)</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                فاتورة مطابقة للقانون التجاري المغربي برقم الـ ICE وإعفاء الـ TVA القانوني.
              </p>
            </div>

            <button
              onClick={handleCopyInvoice}
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
            >
              {copiedInvoice ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedInvoice ? 'تم نسخ الفاتورة!' : 'نسخ نص الفاتورة'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-xs">
            
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">اسم المقاول الذاتي *</label>
                <input
                  type="text"
                  value={invoiceData.providerName}
                  onChange={e => setInvoiceData({ ...invoiceData, providerName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">رقم ICE الخاص بك *</label>
                  <input
                    type="text"
                    value={invoiceData.iceProvider}
                    onChange={e => setInvoiceData({ ...invoiceData, iceProvider: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">رقم المقاول (N° AE) *</label>
                  <input
                    type="text"
                    value={invoiceData.autoEntId}
                    onChange={e => setInvoiceData({ ...invoiceData, autoEntId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">اسم العميل أو الشركة المستفيدة *</label>
                <input
                  type="text"
                  value={invoiceData.clientName}
                  onChange={e => setInvoiceData({ ...invoiceData, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">وصف الخدمة المقدمة *</label>
                <textarea
                  rows={2}
                  value={invoiceData.description}
                  onChange={e => setInvoiceData({ ...invoiceData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">المبلغ الإجمالي الصافي (MAD) *</label>
                <input
                  type="number"
                  step="100"
                  value={invoiceData.amountMad}
                  onChange={e => setInvoiceData({ ...invoiceData, amountMad: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white font-bold outline-none"
                />
              </div>
            </div>

            {/* Invoice Document Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0F172A] dark:text-white">معاينة الفاتورة القانونية الرسمية:</span>
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-700 font-mono text-[11px] text-[#334155] dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto">
                {generateInvoiceText()}
              </div>
            </div>

          </div>

        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 4: WISE CALCULATOR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'wise' && (
        <div className="p-7 sm:p-9 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-6 shadow-xs max-w-2xl mx-auto">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">
              محاكي التحويل المباشر عبر Wise
            </h3>
            <p className="text-xs text-[#64748B]">
              تعتمد Wise سعر الصرف الحقيقي في السوق (Mid-market rate) مع عمولة منخفضة وشفافة دون هوامش خفية.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-[#0F172A] dark:text-slate-300">
                المبلغ بالدولار ($ USD)
              </label>
              <input
                type="number"
                min="10"
                value={wiseAmount}
                onChange={e => setWiseAmount(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-850 text-lg font-bold font-mono text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#64748B]">
                <span>رسوم Wise الشفافة:</span>
                <span className="font-mono text-slate-500 font-semibold">-{wiseFee.toFixed(2)} $</span>
              </div>
              <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-[#0F172A] dark:text-white text-sm">المبلغ بالدرهم في حسابك:</span>
                <span className="font-mono font-black text-xl text-[#2563EB]">{wiseMadPayout.toFixed(2)} درهم</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 5: INCOME IDEAS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'income-ideas' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: 'تصاميم السوشيال ميديا للمتاجر',
              skill: 'Canva & Photoshop',
              earning: '15$ - 30$ لكل باقة بوستات',
              desc: 'تقديم تصاميم إعلانية وقوالب جاهزة للمتاجر الإلكترونية في الخليج والمغرب.'
            },
            {
              title: 'تفريغ وترجمة المقاطع الصوتية',
              skill: 'اللغات + أدوات الذكاء الاصطناعي',
              earning: '20$ - 50$ لكل ساعة تسجيل',
              desc: 'تحويل المحاضرات والبودكاست لنصوص مكتوبة وترجمتها بين العربية والفرنسية والإنجليزية.'
            },
            {
              title: 'بناء وتخصيص متاجر YouCan و Shopify',
              skill: 'إعداد منصات التجارة الإلكترونية',
              earning: '50$ - 150$ لكل متجر متكامل',
              desc: 'مساعدة التجار المبتدئين في ربط المنتجات والدفع وتنسيق شكل المتجر.'
            }
          ].map((idea, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-3 shadow-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#2563EB] flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <h4 className="font-bold text-sm text-[#0F172A] dark:text-white">{idea.title}</h4>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">{idea.desc}</p>
              <div className="pt-2 border-t border-[#F1F5F9] dark:border-slate-800 flex justify-between text-xs">
                <span className="text-[#64748B]">{idea.skill}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{idea.earning}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
