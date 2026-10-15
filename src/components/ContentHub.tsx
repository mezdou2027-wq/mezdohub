import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Share2, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Compass, 
  ChevronDown, 
  ChevronUp,
  Bookmark,
  Building2,
  FileText,
  BadgeAlert
} from 'lucide-react';
import { CONTENT_HUB_ARTICLES, ContentArticle } from '../data/contentHubArticles';
import { updateStructuredData, getArticleSchema, getFaqPageSchema } from '../services/schemaGenerator';

interface ContentHubProps {
  onBack?: () => void;
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
  initialArticleId?: string;
}

export const ContentHub: React.FC<ContentHubProps> = ({ 
  onBack, 
  onSelectTab, 
  initialArticleId 
}) => {
  const [selectedArticle, setSelectedArticle] = useState<ContentArticle | null>(() => {
    if (initialArticleId) {
      return CONTENT_HUB_ARTICLES.find(a => a.id === initialArticleId || a.slug === initialArticleId) || null;
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync schema when reading article
  useEffect(() => {
    if (selectedArticle) {
      // 1. Article schema
      const articleSchema = getArticleSchema({
        title: selectedArticle.title,
        headline: selectedArticle.title,
        description: selectedArticle.description,
        datePublished: selectedArticle.publishedDate,
        dateModified: selectedArticle.updatedDate,
        authorName: selectedArticle.author.name,
        publisherName: 'MezdoHub',
        url: `${window.location.origin}/?tab=content-hub&id=${selectedArticle.id}`
      });
      updateStructuredData('article-schema-ld', articleSchema);

      // 2. FAQ schema for rich snippet
      const faqSchema = getFaqPageSchema(selectedArticle.faqs);
      updateStructuredData('faq-schema-ld', faqSchema);
    }
  }, [selectedArticle]);

  // Filter articles
  const filteredArticles = CONTENT_HUB_ARTICLES.filter(art => {
    const matchesCat = activeCategory === 'all' || art.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShare = (art: ContentArticle) => {
    const url = `${window.location.origin}/?tab=content-hub&id=${art.id}`;
    if (navigator.share) {
      navigator.share({ title: art.title, text: art.description, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId(art.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-['Cairo',sans-serif] text-right">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={selectedArticle ? () => setSelectedArticle(null) : onBack}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{selectedArticle ? 'العودة للمقالات' : 'رجوع'}</span>
              </button>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              📚 مركز المعرفة والمحتوى التخصصي (Content Hub)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {selectedArticle ? selectedArticle.title : 'أدلة مرجعية مفصلة: جمارك، هجرة، دراسة، وعمل حر'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('audit-health')}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>لوحة فحص AdSense و SEO 🛡️</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: SINGLE ARTICLE DEEP READING VIEW */}
      {selectedArticle ? (
        <article className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* Article Meta Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-800/40 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-blue-200">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 font-bold border border-blue-400/30">
                {selectedArticle.categoryLabelAr}
              </span>
              <div className="flex items-center gap-4 font-mono text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{selectedArticle.readingTime}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>محدث: {new Date(selectedArticle.updatedDate).toLocaleDateString('ar-MA')}</span>
                </span>
                <span>{selectedArticle.wordCount} كلمة</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-3xl font-black leading-snug">
              {selectedArticle.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {selectedArticle.description}
            </p>

            {/* Author Attribution Card */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-1.5 rounded-2xl bg-white/10 border border-white/20">
                  {selectedArticle.author.avatar}
                </span>
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-1.5">
                    <span>بقلم: {selectedArticle.author.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/30 text-emerald-300 font-normal">
                      خبير معتمد E-E-A-T
                    </span>
                  </div>
                  <span className="text-[11px] text-blue-200 block">
                    {selectedArticle.author.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedId === selectedArticle.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedId === selectedArticle.id ? 'تم النسخ!' : 'مشاركة الدليل'}</span>
                </button>

                <button
                  onClick={() => onSelectTab('author-eeat')}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>ملف الكاتب وميثاق الدقة</span>
                  <ArrowLeft className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Connected Tool Banner (High Internal Conversion) */}
          <div className="p-5 rounded-2xl bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-300 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>أداة تفاعلية مرتبطة بهذا الموضوع</span>
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {selectedArticle.relatedToolLabel}
              </h4>
            </div>

            <button
              onClick={() => onSelectTab(selectedArticle.relatedToolTab, selectedArticle.relatedToolSubTab)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer shrink-0 transition-transform active:scale-95"
            >
              <span>تشغيل الأداة مباشرة ⚡</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Article Body Content */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
            {selectedArticle.sections.map((sec, sIdx) => (
              <section key={sIdx} className="space-y-3.5">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white border-r-4 border-blue-600 pr-3">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.callout && (
                  <div className={`p-4 rounded-2xl border text-xs font-bold leading-relaxed ${
                    sec.callout.type === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
                      : sec.callout.type === 'tip'
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                      : 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200'
                  }`}>
                    {sec.callout.text}
                  </div>
                )}
              </section>
            ))}

            {/* Official Government Citations */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>المصادر الرسمية المعتمدة لهذا المقال (Official Verification):</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedArticle.officialSources.map((src, srcIdx) => (
                  <a
                    key={srcIdx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{src.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* In-Article FAQ Accordion with Schema.org JSON-LD Tagging */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>الأسئلة الأكثر شيوعاً حول هذا الدليل (Schema FAQ):</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ متوافق مع Google Rich Snippets
              </span>
            </div>

            <div className="space-y-2.5">
              {selectedArticle.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer hover:text-blue-600"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Articles Pathways */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>أدلة ومقالات أخرى قد تهمك في نفس المسار:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTENT_HUB_ARTICLES.filter(a => a.id !== selectedArticle.id).slice(0, 2).map(other => (
                <div
                  key={other.id}
                  onClick={() => {
                    setSelectedArticle(other);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-2 group"
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                    {other.categoryLabelAr}
                  </span>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                    {other.title}
                  </h5>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 pt-1">
                    <span>قراءة الدليل</span>
                    <ArrowLeft className="w-3 h-3 group-hover:translate-x-[-3px] transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </article>
      ) : (
        /* VIEW 2: ARTICLE DIRECTORY & BROWSER */
        <div className="space-y-6">
          
          {/* Search & Category Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all', label: 'جميع المقالات (5) 📚' },
                { id: 'customs', label: 'الجمارك والطرود 📦' },
                { id: 'immigration', label: 'الهجرة وتأشيرات العمل ✈️' },
                { id: 'study', label: 'دراسة وعمل ألمانيا 🇩🇪' },
                { id: 'freelance', label: 'العمل الحر الرقمي 💻' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الأدلة (AliExpress، إسبانيا، ألمانيا...)"
                className="w-full pl-3 pr-9 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(art => (
              <div
                key={art.id}
                onClick={() => {
                  setSelectedArticle(art);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer shadow-xs hover:shadow-xl flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {art.categoryLabelAr}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {art.readingTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {art.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{art.author.avatar}</span>
                    <span className="text-[11px] text-slate-500">{art.author.name}</span>
                  </div>

                  <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-[-3px] transition-transform">
                    <span>قراءة الدليل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
