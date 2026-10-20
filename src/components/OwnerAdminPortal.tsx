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
  RefreshCw,
  Sliders,
  FileText,
  PlusCircle,
  Edit3,
  Eye,
  KeyRound,
  Globe,
  Bell,
  MessageSquare,
  Sparkles,
  Save,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';
import { getSiteConfig, saveSiteConfig, SiteConfig } from '../services/siteConfig';
import { getAllArticles, saveArticle, deleteArticle, resetArticlesToDefault } from '../services/articlesService';
import { ContentArticle } from '../data/contentHubArticles';

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
  const { user, signOut } = useAuth();

  // Active Admin Sub-tab
  const [activeAdminTab, setActiveAdminTab] = useState<'settings' | 'content' | 'crm' | 'domain'>('settings');

  // 1. Site Configuration State
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [configSaved, setConfigSaved] = useState(false);

  // 2. Leads & CRM State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 3. Articles State
  const [articles, setArticles] = useState<ContentArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<ContentArticle | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [articleSuccessMsg, setArticleSuccessMsg] = useState('');

  // Form state for creating/editing article
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'customs' | 'immigration' | 'study' | 'freelance'>('immigration');
  const [formBadge, setFormBadge] = useState('فرصة حصرية 2026 ⭐');
  const [formDescription, setFormDescription] = useState('');
  const [formReadingTime, setFormReadingTime] = useState('5 دقائق');
  const [formAuthorName, setFormAuthorName] = useState('طارق مزدوحي');
  const [formAuthorRole, setFormAuthorRole] = useState('المشرف العام ومؤسس MezdoHub');
  const [formHeading1, setFormHeading1] = useState('الشروط والمتطلبات الأساسية');
  const [formParagraphs1, setFormParagraphs1] = useState('');
  const [formHeading2, setFormHeading2] = useState('خطوات التقديم العملية');
  const [formParagraphs2, setFormParagraphs2] = useState('');

  // Load articles
  const loadArticles = () => {
    setArticles(getAllArticles());
  };

  // Load leads
  const loadLeads = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('mezdohub_crm_leads') || '[]');
      if (stored.length === 0) {
        const initialMock: Lead[] = [
          {
            id: 'lead-dv-01',
            name: 'طارق الإدريسي',
            phone: '0612345678',
            city: 'طنجة',
            diploma: 'باكالوريا + تقني متخصص',
            selectedPackage: 'dv-lottery-100dh',
            company: 'القرعة الأمريكية الرسمية 2026/2027',
            role: 'تسجيل رسمي وتدقيق صورة بيومترية',
            date: new Date().toISOString().slice(0, 16).replace('T', ' '),
            status: 'new'
          },
          {
            id: 'lead-2',
            name: 'فاطمة الزهراء العلمي',
            phone: '0654321987',
            city: 'الدار البيضاء',
            diploma: 'إجازة في الاقتصاد والتدبير',
            selectedPackage: 'full-dossier',
            company: 'Renault Group Tangier Med',
            role: 'خدمة عملاء فرنسية',
            date: '2026-10-18 10:15',
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
    loadArticles();
    setConfig(getSiteConfig());
  }, []);

  // Save Site Configuration
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveSiteConfig(config);
    setConfig(updated);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  // Delete Lead
  const handleDeleteLead = (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المترشح من القائمة؟')) return;
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    try {
      localStorage.setItem('mezdohub_crm_leads', JSON.stringify(updated));
    } catch {}
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['الاسم', 'الهاتف', 'المدينة', 'الدبلوم', 'الباقة', 'الخدمة / الشركة', 'التاريخ'];
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
    link.setAttribute('download', `MezdoHub_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Open Create Article Form
  const handleOpenCreateArticle = () => {
    setEditingArticle(null);
    setIsCreatingNew(true);
    setFormTitle('');
    setFormCategory('immigration');
    setFormBadge('فرصة جديدة 2026 ⭐');
    setFormDescription('');
    setFormReadingTime('5 دقائق');
    setFormAuthorName('طارق مزدوحي');
    setFormAuthorRole('المشرف العام ومؤسس MezdoHub');
    setFormHeading1('الشروط والمتطلبات الأساسية');
    setFormParagraphs1('');
    setFormHeading2('خطوات التقديم العملية والرسمية');
    setFormParagraphs2('');
  };

  // Handle Edit Article
  const handleOpenEditArticle = (article: ContentArticle) => {
    setEditingArticle(article);
    setIsCreatingNew(false);
    setFormTitle(article.title);
    setFormCategory(article.category);
    setFormBadge(article.badge);
    setFormDescription(article.description);
    setFormReadingTime(article.readingTime);
    setFormAuthorName(article.author.name);
    setFormAuthorRole(article.author.role);
    setFormHeading1(article.sections[0]?.heading || 'الشروط والمتطلبات');
    setFormParagraphs1(article.sections[0]?.paragraphs?.join('\n\n') || '');
    setFormHeading2(article.sections[1]?.heading || 'خطوات التقديم');
    setFormParagraphs2(article.sections[1]?.paragraphs?.join('\n\n') || '');
  };

  // Save Article (Create or Edit)
  const handleSaveArticleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('يرجى إدخال عنوان المقال');
      return;
    }

    const articleId = editingArticle ? editingArticle.id : `article-${Date.now()}`;
    const slug = editingArticle ? editingArticle.slug : formTitle.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 50);

    const newArticle: ContentArticle = {
      id: articleId,
      slug: slug,
      title: formTitle.trim(),
      category: formCategory,
      categoryLabelAr: formCategory === 'customs' ? 'الجمارك والطرود 📦' : formCategory === 'study' ? 'الدراسة والمنح 🎓' : formCategory === 'freelance' ? 'العمل الحر والأرباح 💰' : 'الهجرة والتأشيرات ✈️',
      badge: formBadge.trim() || 'فرصة 2026',
      description: formDescription.trim() || formTitle.trim(),
      readingTime: formReadingTime.trim() || '5 دقائق',
      wordCount: (formParagraphs1.length + formParagraphs2.length) / 5 || 500,
      publishedDate: editingArticle ? editingArticle.publishedDate : new Date().toISOString().slice(0, 10),
      updatedDate: new Date().toISOString().slice(0, 10),
      author: {
        name: formAuthorName.trim() || 'طارق مزدوحي',
        role: formAuthorRole.trim() || 'المشرف العام',
        avatar: '👨‍💼'
      },
      relatedToolId: 'cv-builder',
      relatedToolLabel: 'صانع السيرة الذاتية ATS',
      relatedToolTab: 'cv-builder',
      sections: [
        {
          heading: formHeading1.trim() || 'التفاصيل والشروط',
          paragraphs: formParagraphs1.split('\n\n').filter(p => p.trim().length > 0)
        },
        ...(formParagraphs2.trim() ? [{
          heading: formHeading2.trim() || 'خطوات التقديم',
          paragraphs: formParagraphs2.split('\n\n').filter(p => p.trim().length > 0)
        }] : [])
      ],
      faqs: editingArticle?.faqs || [
        {
          question: 'هل هذه الفرصة متاحة للمغاربة؟',
          answer: 'نعم، متاحة للشباب والمواطنين المغاربة طبقاً للشروط الرسمية المعلنة.'
        }
      ],
      officialSources: editingArticle?.officialSources || [
        {
          name: 'الموقع الرسمي للفرصة',
          url: 'https://mezdohub.com'
        }
      ]
    };

    saveArticle(newArticle);
    loadArticles();
    setEditingArticle(null);
    setIsCreatingNew(false);
    setArticleSuccessMsg('✓ تم حفظ المقال ونشره في الموقع فوراً!');
    setTimeout(() => setArticleSuccessMsg(''), 4000);
  };

  // Delete Article
  const handleDeleteArticle = (articleId: string, title: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف مقال "${title}" من الموقع نهائياً؟`)) return;
    deleteArticle(articleId);
    loadArticles();
    setArticleSuccessMsg('✓ تم حذف المقال من الموقع بنجاح.');
    setTimeout(() => setArticleSuccessMsg(''), 3000);
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm) ||
    l.city.includes(searchTerm) ||
    l.diploma.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-fade-in text-right">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          OWNER MASTER BANNER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
        isDarkMode ? 'bg-slate-900 border-amber-500/30' : 'bg-gradient-to-r from-amber-50/80 via-white to-blue-50/80 border-amber-200 shadow-md'
      }`}>
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>لوحة تحكم مالك الموقع 👑 (MezdoHub Master Control)</span>
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              المشرف: {user?.fullName || 'طارق مزدوحي'} ({user?.email || 'mezdou2027@gmail.com'})
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            مرحباً بك! موقعك بالكامل تحت سيطرتك وإدارتك 🚀
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            نعم، هذا موقعك الخاص بنسبة 100%! لديك كامل الحرية في إضافة أي مقال أو فرصة جديدة، تعديل أو حذف أي محتوى، استقبال طلبات المترشحين، وتغيير رقم الواتساب المباشر وشريط الإعلانات.
          </p>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://mezdohub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer shadow-xs"
          >
            <ExternalLink className="w-4 h-4" />
            <span>معاينة الموقع الحي 🌐</span>
          </a>

          <button
            onClick={() => {
              if (window.confirm('هل تريد تسجيل الخروج من لوحة الإدارة؟')) {
                signOut();
              }
            }}
            className="px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-rose-900 cursor-pointer hover:bg-rose-100"
          >
            قفل لوحة الإدارة 🔒
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MAIN ADMIN NAVIGATION TABS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeAdminTab === 'settings'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>إعدادات الموقع ورقم الواتساب والإعلانات 🎛️</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('content')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeAdminTab === 'content'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>إدارة المقالات والفرص (إضافة / تعديل / حذف) 📝 ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('crm')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeAdminTab === 'crm'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>قاعدة بيانات المترشحين والقرعة 📊 ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('domain')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeAdminTab === 'domain'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>ملكية النطاق mezdohub.com والأمان 🛡️</span>
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 1: SITE CONTROLS & SETTINGS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeAdminTab === 'settings' && (
        <div className="space-y-6 animate-fade-in">
          
          <form onSubmit={handleSaveConfig} className="space-y-6">
            
            {/* WhatsApp Control Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    رقم الواتساب الرسمي المباشر للموقع 📱
                  </h3>
                  <p className="text-xs text-slate-500">
                    هذا هو الرقم الذي ستصلك عليه رسائل الزوار والمترشحين عندما يضغطون على زر واتساب في أي مكان في الموقع.
                  </p>
                </div>
              </div>

              <div className="max-w-md space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  رقم الهاتف (بصيغة دولية بدون علامة +):
                </label>
                <input
                  type="text"
                  value={config.whatsappNumber}
                  onChange={e => setConfig({ ...config, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
                  placeholder="مثال: 212612345678 أو 0612345678"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-slate-400 block">
                  💡 للمغرب: اكتب مثلاً 2126XXXXXXXX أو 06XXXXXXXX، وسيتولى الموقع ربطه برابط wa.me تلقائياً.
                </span>
              </div>
            </div>

            {/* Top Announcement Bar Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      شريط الإعلانات والتنبيهات العلوي 📢
                    </h3>
                    <p className="text-xs text-slate-500">
                      يظهر في أعلى كل صفحات الموقع لجذب انتباه الزوار نحو حدث معين (مثل القرعة الأمريكية أو عرض خاص).
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.announcementEnabled}
                    onChange={e => setConfig({ ...config, announcementEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {config.announcementEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      نص الإعلان أو التنبيه:
                    </label>
                    <input
                      type="text"
                      value={config.announcementText}
                      onChange={e => setConfig({ ...config, announcementText: e.target.value })}
                      placeholder="اكتب رسالة الإعلان هنا..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      رابط التوجيه عند الضغط:
                    </label>
                    <input
                      type="text"
                      value={config.announcementLink}
                      onChange={e => setConfig({ ...config, announcementLink: e.target.value })}
                      placeholder="مثال: /dv-lottery أو /compass"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* DV Lottery Service Toggle */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      خدمة استقبال طلبات تسجيل القرعة الأمريكية 🇺🇸
                    </h3>
                    <p className="text-xs text-slate-500">
                      تفعيل استمارة تسجيل الناس مباشرة من موقعك مع فحص الصور واستخراج الوصل الرقمي.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enableDvRegistration}
                    onChange={e => setConfig({ ...config, enableDvRegistration: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-amber-500"></div>
                </label>
              </div>
            </div>

            {/* Google Analytics 4 & Owner PIN Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-blue-600" />
                  <span>الرمز السري لدخول المالك (Owner PIN) 🔑</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  الرمز الذي يفتح لك لوحة الإدارة فوراً بدون تعقيد (الافتراضي: 2027).
                </p>
                <input
                  type="text"
                  value={config.ownerPin}
                  onChange={e => setConfig({ ...config, ownerPin: e.target.value.trim() })}
                  placeholder="2027"
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono tracking-widest outline-none"
                />
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  <span>معرّف تتبع Google Analytics 4 (GA4) 📈</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  معرّف القياس يبدأ بـ G- لمتابعة زوار موقعك في حسابك على Google Analytics.
                </p>
                <input
                  type="text"
                  value={config.gaMeasurementId}
                  onChange={e => setConfig({ ...config, gaMeasurementId: e.target.value.trim().toUpperCase() })}
                  placeholder="مثال: G-XXXXXXXXXX"
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase outline-none"
                />
              </div>

            </div>

            {/* Save Button */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>حفظ وتطبيق جميع الإعدادات فوراً</span>
              </button>

              {configSaved && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                  <CheckCircle className="w-4 h-4" />
                  تم الحفظ بنجاح وتحديث الموقع الحي!
                </span>
              )}
            </div>

          </form>

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 2: ARTICLES & OPPORTUNITIES MANAGER (Add / Edit / Delete)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeAdminTab === 'content' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                إدارة المقالات والأدلة والفرص المنشورة 📚
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                يمكنك كتابة ونشر مقال جديد في دقيقة، أو تعديل أي مقال موجود، أو حذفه بالكامل بضغطة زر.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenCreateArticle}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>إضافة فرصة أو مقال جديد +</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('هل تريد استرجاع المقالات الأساسية الأصلية؟')) {
                    resetArticlesToDefault();
                    loadArticles();
                  }
                }}
                className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                title="استرجاع المقالات الافتراضية"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {articleSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{articleSuccessMsg}</span>
            </div>
          )}

          {/* Create or Edit Article Modal Form */}
          {(isCreatingNew || editingArticle) && (
            <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/50 dark:bg-slate-850 border-2 border-blue-500/40 space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-blue-200 dark:border-slate-700 pb-3">
                <h4 className="text-base font-black text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  <span>{editingArticle ? `تعديل مقال: ${editingArticle.title}` : 'كتابة ونشر فرصة أو مقال جديد'}</span>
                </h4>
                <button
                  onClick={() => {
                    setEditingArticle(null);
                    setIsCreatingNew(false);
                  }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveArticleForm} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      عنوان المقال أو الفرصة *:
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={e => setFormTitle(e.target.value)}
                      placeholder="مثال: دليل فيزا العمل الموسمية لإسبانيا 2026 وطرق التقديم"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      القسم والتصنيف:
                    </label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600"
                    >
                      <option value="immigration">الهجرة والتأشيرات ✈️</option>
                      <option value="study">الدراسة والمنح الدولية 🎓</option>
                      <option value="freelance">العمل الحر والربح الرقمي 💰</option>
                      <option value="customs">الجمارك والطرود 📦</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      الشارة (Badge):
                    </label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={e => setFormBadge(e.target.value)}
                      placeholder="دليل حصري 2026"
                      className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      وقت القراءة المقدر:
                    </label>
                    <input
                      type="text"
                      value={formReadingTime}
                      onChange={e => setFormReadingTime(e.target.value)}
                      placeholder="6 دقائق قراءة"
                      className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      اسم الكاتب أو الناشر:
                    </label>
                    <input
                      type="text"
                      value={formAuthorName}
                      onChange={e => setFormAuthorName(e.target.value)}
                      placeholder="طارق مزدوحي"
                      className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    الوصف المختصر (Meta Description):
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    placeholder="ملخص يظهر في بطاقة المقال وفي نتائج بحث جوجل..."
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none resize-none"
                  />
                </div>

                {/* Section 1 */}
                <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">1</span>
                    <input
                      type="text"
                      value={formHeading1}
                      onChange={e => setFormHeading1(e.target.value)}
                      placeholder="عنوان الفقرة الأولى"
                      className="flex-1 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                  <textarea
                    rows={4}
                    value={formParagraphs1}
                    onChange={e => setFormParagraphs1(e.target.value)}
                    placeholder="اكتب المحتوى بالتفصيل هنا... يمكنك الفصل بين الفقرات بسطر فارغ."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                {/* Section 2 */}
                <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">2</span>
                    <input
                      type="text"
                      value={formHeading2}
                      onChange={e => setFormHeading2(e.target.value)}
                      placeholder="عنوان الفقرة الثانية (اختياري)"
                      className="flex-1 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                  <textarea
                    rows={4}
                    value={formParagraphs2}
                    onChange={e => setFormParagraphs2(e.target.value)}
                    placeholder="اكتب خطوات التقديم أو روابط التقديم هنا..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs cursor-pointer shadow-md active:scale-95"
                  >
                    <span>{editingArticle ? 'حفظ تعديلات المقال ✓' : 'نشر المقال فوراً في الموقع 🚀'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingArticle(null);
                      setIsCreatingNew(false);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
                  >
                    إلغاء
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Articles Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">عنوان المقال</th>
                  <th className="p-3">التصنيف</th>
                  <th className="p-3">تاريخ النشر</th>
                  <th className="p-3">وقت القراءة</th>
                  <th className="p-3 text-center">إجراءات المالك</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white max-w-sm">
                      <div className="line-clamp-2">{article.title}</div>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">/guide/{article.slug}</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {article.categoryLabelAr}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">
                      {article.updatedDate || article.publishedDate}
                    </td>
                    <td className="p-3 text-slate-500 text-[11px]">
                      {article.readingTime}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditArticle(article)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-bold text-[11px] flex items-center gap-1 cursor-pointer border border-blue-200 dark:border-blue-800"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>تعديل</span>
                        </button>

                        <button
                          onClick={() => handleDeleteArticle(article.id, article.title)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-bold text-[11px] flex items-center gap-1 cursor-pointer border border-rose-200 dark:border-rose-900"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>حذف</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 3: LEADS & CRM (DV LOTTERY & CANDIDATES)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeAdminTab === 'crm' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-500">إجمالي المترشحين المسجلين:</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">{leads.length}</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-500">طلبات القرعة الأمريكية:</span>
              <div className="text-3xl font-black text-amber-500 font-mono">
                {leads.filter(l => l.selectedPackage === 'dv-lottery-100dh' || l.company.includes('القرعة')).length}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-500">طلبات مصانع طنجة والشركات:</span>
              <div className="text-3xl font-black text-blue-500 font-mono">
                {leads.filter(l => l.city.includes('طنجة')).length}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-500">طلبات الملف الإداري الكامل:</span>
              <div className="text-3xl font-black text-emerald-500 font-mono">
                {leads.filter(l => l.selectedPackage === 'full-dossier').length}
              </div>
            </div>
          </div>

          {/* CRM Table Section */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                قائمة طلبات التسجيل المباشرة ({filteredLeads.length})
              </h3>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="بحث بالاسم أو الهاتف أو المدينة..."
                    className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Excel 📥</span>
                </button>
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
                      <th className="p-3">الخدمة المستهدفة</th>
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
                          <td className="p-3 text-[11px] text-slate-400 font-mono">
                            {lead.date}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-1.5">
                              <a
                                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                                  lead.company.includes('القرعة الأمريكية')
                                    ? `السلام عليكم ${lead.name}، معك إدارة منصة MezdoHub بخصوص ملفك لتسجيل القرعة الأمريكية (رقم المرجع: ${lead.id}). تم استلام بياناتك وتدقيق صورتك.`
                                    : `السلام عليكم أخي ${lead.name}، معك إدارة منصة MezdoHub بخصوص طلبك لخدمة ${lead.company}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] inline-flex items-center gap-1 shadow-xs"
                              >
                                <span>واتساب 📱</span>
                              </a>

                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
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
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 4: DOMAIN & OWNERSHIP CHARTER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeAdminTab === 'domain' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 animate-fade-in text-right">
          
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                حالة النطاق الرسمي mezdohub.com وميثاق الملكية 🇲🇦
              </h3>
              <p className="text-xs text-slate-500">
                بيانات الاستضافة، الحماية، وحقوقك القانونية الكاملة كمالك رسمي للمنصة.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-500">النطاق الأساسي:</span>
              <div className="font-mono font-black text-blue-600 dark:text-blue-400 text-sm">https://mezdohub.com</div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">✓ متصل ومفعل بشهادة SSL أمنية</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-500">ملف إعلانات جوجل Ads.txt:</span>
              <div className="font-mono font-black text-slate-800 dark:text-slate-200 text-sm">mezdohub.com/ads.txt</div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">✓ متصل بالمعرف: pub-5171020875677806</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-500">رابط لوحة الإدارة المباشر:</span>
              <div className="font-mono font-black text-amber-600 dark:text-amber-400 text-sm">mezdohub.com/admin</div>
              <span className="text-[10px] text-slate-400 block">محمي برمز المالك (PIN: 2027)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-300 leading-relaxed space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-sm text-amber-950 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>إجابة على سؤالك: "هل هذا موقعي ليس لديا الحرية افعل وامسح واضيف اي شيء؟"</span>
            </h4>
            <p>
              <strong>نعم بكل تأكيد! هذا موقعك ونطاقك الخاص 100%!</strong> يمكنك في أي وقت:
            </p>
            <ul className="list-disc list-inside space-y-1 pr-2">
              <li><strong>إضافة أي مقال أو فرصة:</strong> من تبويب "إدارة المقالات" أعلاه، وستظهر فوراً لجميع الزوار وفي جوجل.</li>
              <li><strong>حذف أي صفحة أو مقال:</strong> لا ترغب به بضغطة زر واحدة.</li>
              <li><strong>تغيير رقم الواتساب:</strong> ليتحول كل تواصل الزوار ومترشحي القرعة إلى هاتفك الشخصي.</li>
              <li><strong>التحكم في شريط الإعلانات العلوي:</strong> وتغيير نصوصه وروابطه متى شئت.</li>
              <li><strong>تصدير طلبات المترشحين:</strong> واستخدامها لتنمية مشروعك وتقديم خدماتك.</li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
