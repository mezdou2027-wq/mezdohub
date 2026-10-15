import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Bell, 
  FolderCheck, 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Briefcase, 
  Compass, 
  Settings, 
  User, 
  Mail, 
  FileText,
  Filter,
  Save,
  Check,
  Send,
  Zap,
  Globe,
  Share2
} from 'lucide-react';
import { 
  SavedItem, 
  UserAlertPreference, 
  TrackedApplication, 
  StoredAiDiagnostic,
  getSavedBookmarks, 
  deleteBookmark, 
  getUserAlertPreferences, 
  saveUserAlertPreferences, 
  getTrackedApplications, 
  saveTrackedApplications, 
  addTrackedApplication,
  getAiDiagnosticsHistory 
} from '../services/userPreferences';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface UserDashboardProps {
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
  onOpenAiAssistant?: () => void;
  onOpenNewsletterModal?: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ 
  onSelectTab, 
  onOpenAiAssistant,
  onOpenNewsletterModal
}) => {
  const { user } = useAuth();
  const { lang } = useTheme();
  const isAr = lang === 'ar';

  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'alerts' | 'tracker' | 'diagnostics'>('bookmarks');
  
  // State
  const [bookmarks, setBookmarks] = useState<SavedItem[]>([]);
  const [filterBookmarkType, setFilterBookmarkType] = useState<string>('all');
  const [alerts, setAlerts] = useState<UserAlertPreference>(getUserAlertPreferences());
  const [trackedApps, setTrackedApps] = useState<TrackedApplication[]>([]);
  const [diagnostics, setDiagnostics] = useState<StoredAiDiagnostic[]>([]);
  
  // Add application modal state
  const [isAddAppOpen, setIsAddAppOpen] = useState(false);
  const [newAppTitle, setNewAppTitle] = useState('');
  const [newAppCountry, setNewAppCountry] = useState('كندا');
  const [newAppCategory, setNewAppCategory] = useState<'immigration' | 'university' | 'job' | 'visa' | 'concours'>('immigration');
  const [newAppPortal, setNewAppPortal] = useState('');
  const [newAppDeadline, setNewAppDeadline] = useState('');
  const [newAppNotes, setNewAppNotes] = useState('');

  // Save alerts toast
  const [alertSaveStatus, setAlertSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBookmarks(getSavedBookmarks());
    setAlerts(getUserAlertPreferences());
    setTrackedApps(getTrackedApplications());
    setDiagnostics(getAiDiagnosticsHistory());
  };

  const handleDeleteBookmark = (id: string) => {
    deleteBookmark(id);
    setBookmarks(getSavedBookmarks());
  };

  const handleSaveAlerts = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserAlertPreferences(alerts);
    setAlertSaveStatus('تم حفظ تفضيلات التنبيهات بنجاح! ستصلك إشعارات مخصصة عند توفر فرص جديدة.');
    setTimeout(() => setAlertSaveStatus(null), 4000);
  };

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppTitle.trim()) return;

    const flagMap: Record<string, string> = {
      'كندا': '🇨🇦',
      'ألمانيا': '🇩🇪',
      'فرنسا': '🇫🇷',
      'أستراليا': '🇦🇺',
      'إسبانيا': '🇪🇸',
      'المغرب': '🇲🇦',
      'أوروبا': '🇪🇺'
    };

    addTrackedApplication({
      title: newAppTitle.trim(),
      category: newAppCategory,
      country: newAppCountry,
      flag: flagMap[newAppCountry] || '🌐',
      officialPortal: newAppPortal.trim() || 'البوابة الرسمية',
      status: 'planning',
      deadline: newAppDeadline || undefined,
      notes: newAppNotes.trim() || undefined
    });

    setTrackedApps(getTrackedApplications());
    setIsAddAppOpen(false);
    setNewAppTitle('');
    setNewAppPortal('');
    setNewAppDeadline('');
    setNewAppNotes('');
  };

  const handleUpdateAppStatus = (id: string, newStatus: TrackedApplication['status']) => {
    const updated = trackedApps.map(app => 
      app.id === id ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app
    );
    saveTrackedApplications(updated);
    setTrackedApps(updated);
  };

  const handleDeleteApp = (id: string) => {
    const updated = trackedApps.filter(app => app.id !== id);
    saveTrackedApplications(updated);
    setTrackedApps(updated);
  };

  const filteredBookmarks = bookmarks.filter(b => {
    if (filterBookmarkType === 'all') return true;
    return b.type === filterBookmarkType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-['Cairo',sans-serif] text-right">
      
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-blue-800/40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>مساحتك الرقمية الخاصة الدائمة · فضاء المرشح 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              أهلاً بك، {user?.fullName || 'عزيزي الباحث عن الفرص'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
              هنا تجد جميع الفرص المحفوظة، ملفات متابعة طلباتك، سجل التشخيص الذكي للهجرة، ونظام التنبيهات الذكي الذي يُخطرك فور ظهور فرص تطابق ملفك.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('ai-assistant')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>تشخيص ذكي جديد 🤖</span>
            </button>
            <button
              onClick={() => onSelectTab('pillar-seo')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-xs border border-white/20 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>تصفح الأدلة المرجعية</span>
            </button>
          </div>
        </div>

        {/* Quick Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-slate-300">الفرص المحفوظة</div>
            <div className="text-xl font-black text-white mt-1">{bookmarks.length} عنصر</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-slate-300">الطلبات قيد المتابعة</div>
            <div className="text-xl font-black text-white mt-1">{trackedApps.length} طلب</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-slate-300">تشخيصات الذكاء الاصطناعي</div>
            <div className="text-xl font-black text-white mt-1">{diagnostics.length} تقرير</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-slate-300">حالة التنبيهات المخصصة</div>
            <div className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{alerts.enabled ? 'مفعلة ونشطة' : 'متوقفة مؤقتاً'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'bookmarks', label: 'المفضلة والمحتوى المحفوظ', icon: Bookmark, count: bookmarks.length },
          { id: 'tracker', label: 'متابعة ملفات وطلبات الهجرة', icon: FolderCheck, count: trackedApps.length },
          { id: 'alerts', label: 'نظام التنبيهات الذكي', icon: Bell, badge: 'تحديثات حية' },
          { id: 'diagnostics', label: 'سجل المساعد الذكي AI', icon: Sparkles, count: diagnostics.length }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SAVED BOOKMARKS */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                عناصرك المفضلة ({filteredBookmarks.length})
              </h2>
              <p className="text-xs text-slate-500">
                كلما حفظت فرصاً وخطوات جديدة، سهلت مراجعتها وإدارتها قبل مواعيد انتهاء التسجيل.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'job', label: 'عقود العمل' },
                { id: 'university', label: 'الجامعات والمنح' },
                { id: 'pillar', label: 'أدلة الهجرة' },
                { id: 'side-hustle', label: 'الدخل الرقمي' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterBookmarkType(f.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                    filterBookmarkType === f.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                <Bookmark className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">لم تقم بحفظ أي عناصر بعد</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  تصفح أدلة الهجرة وقاعدة بيانات الوظائف الدولية والمنح، واضغط على زر "حفظ للمفضلة" في أي بطاقة لتبقى معك هنا دائماً.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={() => onSelectTab('study-abroad')}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
                >
                  استكشف المنح والجامعات
                </button>
                <button
                  onClick={() => onSelectTab('global-jobs')}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  تصفح عقود العمل الرسمية
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBookmarks.map(item => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between space-y-4 group relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {item.type === 'job' ? '💼 عقد عمل' : item.type === 'university' ? '🎓 جامعة / منحة' : item.type === 'pillar' ? '🏛️ دليل هجرة' : item.type === 'video' ? '🎬 فيديو 30 ثانية' : '🚀 دخل رقمي'}
                      </span>
                      <button
                        onClick={() => handleDeleteBookmark(item.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="إزالة من المفضلة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl shrink-0 mt-0.5">{item.flag || '📌'}</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        {item.country && (
                          <span className="text-xs text-slate-500 mt-1 block">
                            الدولة: {item.country}
                          </span>
                        )}
                      </div>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        {item.notes}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">
                      حفظت: {new Date(item.savedAt).toLocaleDateString('ar-MA')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (item.type === 'job') onSelectTab('global-jobs');
                          else if (item.type === 'university') onSelectTab('study-abroad', 'universities');
                          else if (item.type === 'scholarship') onSelectTab('study-abroad', 'scholarships');
                          else if (item.type === 'pillar') onSelectTab('pillar-seo', item.id);
                          else if (item.type === 'video') onSelectTab('shorts', item.id);
                          else onSelectTab('side-hustles');
                        }}
                        className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                      >
                        عرض في المنصة
                      </button>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 inline-flex items-center gap-1"
                          title="فتح الرابط الرسمي"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: APPLICATION TRACKER */}
      {activeSubTab === 'tracker' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                متابعة مسار ملفاتك وطلباتك الرسمية ({trackedApps.length})
              </h2>
              <p className="text-xs text-slate-500">
                نظّم خطواتك خطوة بخطوة من التجهيز وحتى الحصول على التأشيرة أو القبول.
              </p>
            </div>

            <button
              onClick={() => setIsAddAppOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة ملف جديد للمتابعة</span>
            </button>
          </div>

          <div className="space-y-3">
            {trackedApps.map(app => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{app.flag}</span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {app.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-blue-500" />
                      <span>{app.country} · {app.officialPortal}</span>
                    </span>
                    {app.deadline && (
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>آخر أجل: {app.deadline}</span>
                      </span>
                    )}
                  </div>

                  {app.notes && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      📝 {app.notes}
                    </p>
                  )}
                </div>

                {/* Status Switcher & Actions */}
                <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col text-right">
                    <label className="text-[10px] text-slate-400 font-bold mb-1">حالة الملف:</label>
                    <select
                      value={app.status}
                      onChange={e => handleUpdateAppStatus(app.id, e.target.value as any)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white cursor-pointer outline-none focus:border-blue-600"
                    >
                      <option value="planning">📋 في مرحلة التخطيط والبحث</option>
                      <option value="preparing_docs">📁 تجهيز الوثائق والترجمة</option>
                      <option value="submitted">🚀 تم إرسال الطلب رسمياً</option>
                      <option value="interview">🎙️ مرحلة المقابلة / الفحص</option>
                      <option value="accepted">🎉 تم القبول / صدور التأشيرة</option>
                      <option value="closed">🔒 ملف مؤجل أو مغلق</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 pt-4">
                    {app.officialUrl && (
                      <a
                        href={app.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                        title="البوابة الرسمية"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="حذف الملف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal to add application */}
          {isAddAppOpen && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl text-right">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  إضافة ملف أو مسار رسمي جديد للمتابعة
                </h3>
                
                <form onSubmit={handleAddApp} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">اسم المسار أو المنحة أو الوظيفة:</label>
                    <input
                      type="text"
                      required
                      value={newAppTitle}
                      onChange={e => setNewAppTitle(e.target.value)}
                      placeholder="مثال: Express Entry كندا أو منحة DAAD ألمانيا"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">البلد المستهدف:</label>
                      <select
                        value={newAppCountry}
                        onChange={e => setNewAppCountry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                      >
                        <option value="كندا">🇨🇦 كندا</option>
                        <option value="ألمانيا">🇩🇪 ألمانيا</option>
                        <option value="فرنسا">🇫🇷 فرنسا</option>
                        <option value="أستراليا">🇦🇺 أستراليا</option>
                        <option value="إسبانيا">🇪🇸 إسبانيا</option>
                        <option value="المغرب">🇲🇦 المغرب</option>
                        <option value="أوروبا">🇪🇺 دولة أوروبية أخرى</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">نوع المسار:</label>
                      <select
                        value={newAppCategory}
                        onChange={e => setNewAppCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                      >
                        <option value="immigration">🏛️ هجرة وإقامة دائمة</option>
                        <option value="university">🎓 دراسة أو منحة جامعية</option>
                        <option value="job">💼 عقد عمل دولي</option>
                        <option value="visa">✈️ تأشيرة سياحة أو استكشاف</option>
                        <option value="concours">🇲🇦 مباراة توظيف بالمغرب</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">البوابة الرسمية أو الجهة:</label>
                      <input
                        type="text"
                        value={newAppPortal}
                        onChange={e => setNewAppPortal(e.target.value)}
                        placeholder="مثال: IRCC Canada"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">تاريخ الأجل النهائي (إن وجد):</label>
                      <input
                        type="date"
                        value={newAppDeadline}
                        onChange={e => setNewAppDeadline(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">ملاحظات ووثائق ناقصة:</label>
                    <textarea
                      rows={2}
                      value={newAppNotes}
                      onChange={e => setNewAppNotes(e.target.value)}
                      placeholder="وثائق تنتظر الترجمة، اختبار اللغة..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddAppOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-150 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 cursor-pointer"
                    >
                      حفظ الملف ومتابعته
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SMART NOTIFICATION ALERTS ENGINE */}
      {activeSubTab === 'alerts' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  محرك التنبيهات الذكي التكيفي (Smart Profile Matcher)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  حدد معايير ملفك (العمر، الشواهد، اللغات، البلد)، وسيقوم النظام بتنبيهك تلقائياً عند صدور سحوبات جديدة أو فتح عقود عمل ومنح تطابق شروطك بدقة.
                </p>
              </div>
            </div>

            {alertSaveStatus && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{alertSaveStatus}</span>
              </div>
            )}

            <form onSubmit={handleSaveAlerts} className="space-y-4 pt-2 text-xs">
              
              {/* Active Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">تفعيل التنبيهات الذكية التلقائية</span>
                  <span className="text-[11px] text-slate-500">استلام إشعارات بالفرص التي تناسب بروفايلك فور إدراجها</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={alerts.enabled} 
                    onChange={e => setAlerts({ ...alerts, enabled: e.target.checked })} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Profile Criteria Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-slate-800 dark:text-slate-200">الوجهة المستهدفة الرئيسية:</label>
                  <select
                    value={alerts.targetCountry}
                    onChange={e => setAlerts({ ...alerts, targetCountry: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                  >
                    <option value="كندا">🇨🇦 كندا (Express Entry & كيبك)</option>
                    <option value="ألمانيا">🇩🇪 ألمانيا (Chancenkarte & عقد عمل)</option>
                    <option value="فرنسا">🇫🇷 فرنسا (موسمي وعقود رسمية)</option>
                    <option value="أستراليا">🇦🇺 أستراليا (Subclass 189/190)</option>
                    <option value="هولندا">🇳🇱 هولندا والاتحاد الأوروبي</option>
                    <option value="الكل">🌍 أي فرصة دولية ممتازة</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-800 dark:text-slate-200">مستواك الدراسي:</label>
                  <select
                    value={alerts.educationLevel}
                    onChange={e => setAlerts({ ...alerts, educationLevel: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                  >
                    <option value="إجازة / ماستر">إجازة جامعية أو ماستر (Bac+3 / Bac+5)</option>
                    <option value="دبلوم تقني">دبلوم تقني متخصص (OFPPT / BTS / DUT)</option>
                    <option value="شهادة بكالوريا">شهادة البكالوريا فقط</option>
                    <option value="مهنة حرة أو بدون شهادة">خبرة ميدانية / مهن يدوية</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-800 dark:text-slate-200">مستوى اللغات:</label>
                  <select
                    value={alerts.languageSkill}
                    onChange={e => setAlerts({ ...alerts, languageSkill: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                  >
                    <option value="فرنسية جيدة">الفرنسية بطلاقة (B2/C1)</option>
                    <option value="إنجليزية متوسطة فما فوق">الإنجليزية بطلاقة (IELTS 6.5+)</option>
                    <option value="ألمانية B1+">الألمانية (مستوى B1 فما فوق)</option>
                    <option value="مبتدئ في اللغات">مستوى متوسط في اللغات</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-800 dark:text-slate-200">البريد الإلكتروني للتنبيهات:</label>
                  <input
                    type="email"
                    value={alerts.email || user?.email || ''}
                    onChange={e => setAlerts({ ...alerts, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-600 text-left dir-ltr"
                  />
                </div>
              </div>

              {/* Notification Categories Checklist */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="font-bold text-slate-900 dark:text-white block">أرسل لي تنبيهات فورية عند:</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alerts.notificationCategories.immigrationDraws}
                      onChange={e => setAlerts({
                        ...alerts,
                        notificationCategories: { ...alerts.notificationCategories, immigrationDraws: e.target.checked }
                      })}
                      className="w-4 h-4 text-blue-600 rounded-md"
                    />
                    <span>🏛️ صدور سحوبات جديدة لكندا (Express Entry) أو تحديثات بطاقة الفرصة الألمانية</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alerts.notificationCategories.jobContracts}
                      onChange={e => setAlerts({
                        ...alerts,
                        notificationCategories: { ...alerts.notificationCategories, jobContracts: e.target.checked }
                      })}
                      className="w-4 h-4 text-blue-600 rounded-md"
                    />
                    <span>💼 إدراج عقود عمل جديدة مع رعاية مشغل دولي (LMIA أو Make-it-in-Germany)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alerts.notificationCategories.scholarships}
                      onChange={e => setAlerts({
                        ...alerts,
                        notificationCategories: { ...alerts.notificationCategories, scholarships: e.target.checked }
                      })}
                      className="w-4 h-4 text-blue-600 rounded-md"
                    />
                    <span>🎓 فتح باب التقديم للمنح الأوروبية الكاملة (رومانيا، المجر، إيطاليا DSU)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alerts.notificationCategories.moroccoConcours}
                      onChange={e => setAlerts({
                        ...alerts,
                        notificationCategories: { ...alerts.notificationCategories, moroccoConcours: e.target.checked }
                      })}
                      className="w-4 h-4 text-blue-600 rounded-md"
                    />
                    <span>🇲🇦 إعلان مباريات الوظيفة العمومية ومصانع المناطق الحرة بالمغرب</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ إعدادات التنبيهات الذكية</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: STORED AI DIAGNOSTICS */}
      {activeSubTab === 'diagnostics' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                سجل تشخيصات المساعد الذكي للهجرة 🤖 ({diagnostics.length})
              </h2>
              <p className="text-xs text-slate-500">
                نتائج التقييمات الذكية السابقة لملفك مع أفضل المسارات المقترحة ونسب التوافق.
              </p>
            </div>

            <button
              onClick={() => onSelectTab('ai-assistant')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>إجراء تشخيص ذكي جديد</span>
            </button>
          </div>

          {diagnostics.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">لم تقم بإجراء تشخيص ذكي بعد</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  خلال دقيقة واحدة، يقوم المساعد الذكي بتحليل عمرك وشواهدك ولغاتك ليحدد أفضل 3 برامج هجرة ودراسة تملك فيها أعلى فرصة نجاح.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('ai-assistant')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
              >
                ابدأ تشخيص ملفك الآن مجاناً 🚀
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {diagnostics.map((diag, idx) => (
                <div
                  key={diag.id || idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        تشخيص ملف: {diag.diploma || 'مؤهل جامعي / تقني'} · {diag.ageBracket || 'الفئة العمرية'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(diag.date).toLocaleDateString('ar-MA')}
                    </span>
                  </div>

                  {/* Top Recommendations inside this diagnostic */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {diag.topMatches?.map((match, mi) => (
                      <div
                        key={mi}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{match.flag}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                            توافق {match.matchScore}%
                          </span>
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white leading-snug">
                          {match.title}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {match.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
