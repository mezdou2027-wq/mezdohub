import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  Phone, 
  Download, 
  Search, 
  Trash2, 
  ExternalLink, 
  CheckCircle,
  Building,
  RefreshCw
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  diploma: string;
  selectedPackage: string;
  company: string;
  role: string;
  date: string;
  status: string;
}

export const OwnerAdminPortal: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Google Analytics Measurement ID State
  const [gaId, setGaId] = useState<string>(() => {
    try {
      return localStorage.getItem('mezdohub_ga_id') || '';
    } catch {
      return '';
    }
  });
  const [gaSaved, setGaSaved] = useState(false);

  const handleSaveGaId = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = gaId.trim().toUpperCase();
    try {
      localStorage.setItem('mezdohub_ga_id', cleanId);
      setGaSaved(true);
      setTimeout(() => setGaSaved(false), 3000);
      // Reload page to apply new tracking ID
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch {}
  };

  // Load leads from localStorage
  const loadLeads = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('mezdohub_crm_leads') || '[]');
      if (stored.length === 0) {
        // Initial mock leads for immediate preview
        const initialMock: Lead[] = [
          {
            id: 'lead-1',
            name: 'محمد أنوار',
            phone: '0654321987',
            city: 'طنجة',
            diploma: 'تقني متخصص كهروميكانيك',
            selectedPackage: 'full-dossier',
            company: 'Renault Group Tangier',
            role: 'تقني إنتاج وصيانة',
            date: '2026-10-03 12:30',
            status: 'new'
          },
          {
            id: 'lead-2',
            name: 'فاطمة الزهراء العلمي',
            phone: '0612345678',
            city: 'طنجة',
            diploma: 'إجازة في الأدب الفرنسي',
            selectedPackage: 'direct-hr',
            company: 'Teleperformance Tangier',
            role: 'خدمة عملاء فرنسية',
            date: '2026-10-03 10:15',
            status: 'contacted'
          }
        ];
        localStorage.setItem('mezdohub_crm_leads', JSON.stringify(initialMock));
        setLeads(initialMock);
      } else {
        setLeads(stored);
      }
    } catch {
      setLeads([]);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    try {
      localStorage.setItem('mezdohub_crm_leads', JSON.stringify(updated));
    } catch {}
  };

  const handleExportCSV = () => {
    const headers = ['الاسم', 'الهاتف', 'المدينة', 'الدبلوم', 'الباقة', 'الشركة المستهدفة', 'التاريخ'];
    const rows = leads.map(l => [
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.city}"`,
      `"${l.diploma}"`,
      `"${l.selectedPackage}"`,
      `"${l.company}"`,
      `"${l.date}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MezdoHub_Leads_CRM_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm) ||
    l.city.includes(searchTerm) ||
    l.diploma.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-fade-in text-right">
      
      {/* Top Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-rose-900/40' : 'bg-rose-50/50 border-rose-200'
      }`}>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>لوحة تحكم المشرف والمالك (Owner CRM Dashboard) 👑</span>
            </div>
            {user && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                جلسة نشطة: {user.fullName} ({user.email})
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            قاعدة بيانات المترشحين وطلبات التجهيز الذكي 📊
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            كل شاب يرسل استمارة تجهيز ملف الوظائف يظهر هنا فوراً مع هاتفه ودبلومه وزر واتساب مباشر.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadLeads}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer shadow-xs"
            title="تحديث البيانات"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>تصدير Excel / CSV 📥</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          GOOGLE ANALYTICS 4 & CONVERSIONS SETTINGS CARD
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-base font-bold text-[#0F172A] dark:text-white">
                إعداد وتفعيل تحويلات Google Analytics 4 (GA4) 📈
              </h2>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              أدخل معرّف القياس الخاص بحسابك (Measurement ID) لتبدأ برؤية كل التحويلات في حسابك مباشرة.
            </p>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold self-start sm:self-auto">
            {gaId ? `مفعل بالمعرف: ${gaId}` : 'في انتظار معرف حسابك'}
          </span>
        </div>

        <form onSubmit={handleSaveGaId} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="مثال: G-ABC1234567"
              value={gaId}
              onChange={e => setGaId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-[#0F172A] dark:text-white font-mono text-xs uppercase outline-none focus:border-[#2563EB]"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer active:scale-95 transition-all shrink-0"
          >
            {gaSaved ? '✓ تم الحفظ بنجاح!' : 'حفظ وتفعيل التتبع الآن'}
          </button>
        </form>

        {/* Step-by-Step Instructions */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-xs text-[#475569] dark:text-slate-300 space-y-2">
          <strong className="block text-[#0F172A] dark:text-white font-semibold">
            📌 خطوات استخراج المعرّف من Google Analytics في دقيقتين:
          </strong>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">
            <li>افتح موقع <strong>analytics.google.com</strong> وسجل دخول بإيميلك جيميل.</li>
            <li>اضغط في الأسفل على أيقونة الترس <strong>(المشرف / Admin ⚙️)</strong>.</li>
            <li>تحت عمود الموقع (Property)، اضغط على <strong>(موجزات البيانات / Data Streams)</strong> ثم اختر <strong>Web</strong>.</li>
            <li>ستظهر لك تفاصيل موقعك وفي الأعلى رمز يبدأ بـ <strong>G-XXXXXXXX</strong> يسمى <strong>معرّف القياس (Measurement ID)</strong>.</li>
            <li>انسخ الرمز وألصقه في الخانة أعلاه واضغط حفظ؛ وستبدأ البيانات بالوصول لحسابك فوراً!</li>
          </ol>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400">إجمالي المترشحين المسجلين:</span>
          <div className="text-3xl font-black text-white font-mono">{leads.length}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400">قائمة انتظار القرعة الأمريكية:</span>
          <div className="text-3xl font-black text-amber-400 font-mono">
            {leads.filter(l => l.selectedPackage === 'dv-lottery-100dh' || l.company.includes('القرعة')).length}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400">طلبات طنجة والمصانع:</span>
          <div className="text-3xl font-black text-blue-400 font-mono">
            {leads.filter(l => l.city.includes('طنجة')).length}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs font-bold text-slate-400">طلبات الملف الإداري الكامل:</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {leads.filter(l => l.selectedPackage === 'full-dossier').length}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="font-black text-base text-slate-900 dark:text-white">
            قائمة المترشحين الجدد ({filteredLeads.length})
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="بحث بالاسم أو الهاتف..."
              className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            لا توجد طلبات مسجلة بعد. عند إرسال أي مترشح لطلبه ستجده هنا مباشرة.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">المترشح</th>
                  <th className="p-3">الهاتف والواتساب</th>
                  <th className="p-3">المدينة والدبلوم</th>
                  <th className="p-3">الشركة والمنصب</th>
                  <th className="p-3">الباقة</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLeads.map(lead => {
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                  const waNumber = cleanPhone.startsWith('0') ? '212' + cleanPhone.slice(1) : cleanPhone;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        {lead.name}
                      </td>
                      <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {lead.phone}
                      </td>
                      <td className="p-3">
                        <span className="font-bold block text-slate-700 dark:text-slate-300">{lead.city}</span>
                        <span className="text-[11px] text-slate-400">{lead.diploma}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold block text-slate-800 dark:text-slate-200">{lead.company}</span>
                        <span className="text-[11px] text-slate-400">{lead.role}</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          lead.selectedPackage === 'full-dossier'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        }`}>
                          {lead.selectedPackage === 'full-dossier' ? 'الملف الكامل' : 'إيميلات HR'}
                        </span>
                      </td>
                      <td className="p-3 text-[11px] text-slate-400 font-mono">
                        {lead.date}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1.5">
                          <a
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                              lead.company.includes('القرعة الأمريكية')
                                ? `السلام عليكم ${lead.name}، معك إدارة منصة MezdoHub بخصوص ملفك لتسجيل القرعة الأمريكية (رقم المرجع: ${lead.id}). تم استلام بياناتك وتدقيق صورتك.`
                                : `السلام عليكم أخي ${lead.name}، معك إدارة منصة MezdoHub بخصوص طلبك لتجهيز ملف التوظيف لشركة ${lead.company}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] inline-flex items-center gap-1 shadow-xs"
                          >
                            <span>واتساب 📱</span>
                          </a>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
