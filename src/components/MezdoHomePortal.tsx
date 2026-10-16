import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Briefcase, 
  Globe, 
  Laptop, 
  Compass, 
  FileCheck, 
  Wrench, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  ShieldCheck, 
  Quote,
  GraduationCap,
  Coins,
  Plane,
  Sparkles,
  Bot,
  FileDown,
  Download
} from 'lucide-react';
import { trackNewsletterSignup } from '../services/analytics';
import { FaqSection } from './FaqSection';
import { ReviewsSection } from './ReviewsSection';
import { SmartRelatedContent } from './SmartRelatedContent';

interface MezdoHomePortalProps {
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
  onOpenLeadMagnet?: () => void;
}

export const MezdoHomePortal: React.FC<MezdoHomePortalProps> = ({ onSelectTab, onOpenLeadMagnet }) => {
  const { lang } = useTheme();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) return;
    try {
      const existing = JSON.parse(localStorage.getItem('mezdohub_subscribers') || '[]');
      localStorage.setItem('mezdohub_subscribers', JSON.stringify([
        ...existing,
        { email: emailInput, date: new Date().toISOString() }
      ]));
    } catch {}
    
    // Track GA4 complete_registration conversion
    trackNewsletterSignup(emailInput);

    setSubscribed(true);
  };

  return (
    <div className={`space-y-20 sm:space-y-28 animate-fade-in ${isAr ? 'text-right' : 'text-left font-[\'Inter\',sans-serif]'}`}>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1: HERO SECTION (Modern SaaS · Stripe / Linear Aesthetic)
          White Background #FFFFFF · 90% Neutral Grays · 10% Blue Accent #2563EB
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="pt-4 sm:pt-10 max-w-5xl mx-auto space-y-10">
        
        {/* Text Container with Generous White Space */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#F1F5F9] dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700">
            <span>
              {isAr 
                ? 'MezdoHub Vision 3.0 · منصة المستقبل المهني' 
                : 'MezdoHub 3.0 · Plateforme Professionnelle d\'Opportunités'}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] dark:text-white leading-[1.15] tracking-tight">
            {isAr ? (
              <>
                كل فرصة تحتاجها لبناء مستقبلك<br />
                <span className="text-[#2563EB]">في مكان واحد</span>
              </>
            ) : (
              <>
                Construisez votre avenir professionnel<br />
                <span className="text-[#2563EB]">en toute confiance</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#64748B] dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {isAr ? (
              'منصة عربية تجمع الوظائف والفرص الدولية والعمل الحر والتوجيه المهني والأدوات الذكية لمساعدتك على الوصول إلى أفضل نسخة من مستقبلك.'
            ) : (
              'Une plateforme tout-en-un pour l\'emploi, les opportunités internationales, le freelancing, l\'orientation professionnelle et les outils intelligents qui vous accompagnent vers un meilleur avenir.'
            )}
          </p>

          {/* Actions: Blue Primary CTA #2563EB + Transparent Secondary Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('compass')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-xs cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'افتح بوصلة الفرص واتخذ قرارك 🧭' : 'Ouvrir la Boussole MezdoHub 🧭'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('explore-services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-[#334155] dark:text-slate-200 font-semibold text-sm border border-[#CBD5E1] dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'استكشف الفرص' : 'Explorer les opportunités'}</span>
            </button>
          </div>

          {/* Trust Line */}
          <div className="pt-6">
            <p className="text-xs font-medium text-[#64748B] dark:text-slate-400 tracking-wide">
              {isAr ? (
                'وظائف • فرص دولية • عمل حر • توجيه مهني • أدوات ذكية'
              ) : (
                'Emploi • Opportunités internationales • Freelancing • Orientation • Outils intelligents'
              )}
            </p>
          </div>

        </div>

        {/* High-End Photography of Diverse Professionals in Modern Workspace */}
        <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 shadow-sm bg-[#F8FAFC] dark:bg-slate-900">
          <div className="relative aspect-[16/9] w-full">
            <img 
              src="/src/assets/images/hero_professionals_1791184436993.jpg" 
              alt="Diverse professionals collaborating in a modern workspace" 
              className="w-full h-full object-cover"
            />
            {/* Subtle overlay badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-800 text-xs font-medium text-[#0F172A] dark:text-white shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{isAr ? 'مجتمع يضم أكثر من 5,000 مهني وباحث عن فرص' : 'Plus de 5 000 professionnels connectés'}</span>
            </div>
          </div>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MEZDOHUB COMPASS: THE STRATEGIC DECISION ENGINE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-5xl mx-auto space-y-6">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl space-y-8">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{isAr ? "المنتج الجديد: MezdoHub Compass" : "Nouveau : MezdoHub Compass"}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {isAr 
                  ? "بوصلة الفرص الذكية: ما هو الطريق المناسب لحالتك؟ 🧭" 
                  : "Boussole des Opportunités : Quelle voie pour votre avenir ?"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {isAr
                  ? "توقف عن الحيرة بين الفيديوهات والمقالات المتضاربة. أجب عن 5 أسئلة صريحة عن سنك وشواهدك ولغاتك وميزانيتك، واحصل على أفضل 3 مسارات حقيقية مع نسبة النجاح والتكلفة وخطة تنفيذ أسبوعية."
                  : "Ne perdez plus votre temps avec des conseils contradictoires. 5 questions concrètes pour découvrir vos 3 meilleures options réalistes avec plan d'action complet."}
              </p>
            </div>

            <button
              onClick={() => onSelectTab("compass")}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>{isAr ? "بدء التشخيص مجاناً" : "Démarrer le diagnostic"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

          {/* The 5 Quick-Launch Compass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {[
              { id: "immigration", titleAr: "بوصلة الهجرة", titleFr: "Immigration", subAr: "ألمانيا، فرنسا، كندا", icon: Plane, badgeAr: "الأكثر طلباً" },
              { id: "study", titleAr: "بوصلة الدراسة", titleFr: "Bourses & Études", subAr: "منح 100% وتكوين مأجور", icon: GraduationCap, badgeAr: "ممولة بالكامل" },
              { id: "jobs", titleAr: "بوصلة العمل", titleFr: "Emploi 6 mois", subAr: "خطة وظيفة في 6 أشهر", icon: Briefcase, badgeAr: "سوق الشغل" },
              { id: "shift", titleAr: "التحول المهني", titleFr: "Reconversion", subAr: "الخروج من الوظيفة للـ Tech", icon: Compass, badgeAr: "مضاعفة الدخل" },
              { id: "side-hustle", titleAr: "الدخل الإضافي", titleFr: "Side Hustle", subAr: "أول 5,000 درهم شهرياً", icon: Coins, badgeAr: "بدون رأس مال" }
            ].map(c => {
              const IconComp = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectTab("compass", c.id)}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-right transition-all flex flex-col justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 group-hover:scale-105 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {c.badgeAr}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                      {isAr ? c.titleAr : c.titleFr}
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {c.subAr}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          NEW: 5 STRATEGIC PILLARS SHOWCASE (الركائز الاستراتيجية الخمس لمنصة MezdoHub)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-5xl mx-auto space-y-6">
        
        {/* Banner Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white shadow-lg space-y-6 relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'أدوات الجيل الجديد 2026' : 'Outils Nouvelle Génération 2026'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {isAr 
                  ? 'المساعد الذكي للهجرة والدليل المرجعي المجاني 🇲🇦' 
                  : 'Assistant IA d\'Immigration & Guide Gratuit'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {isAr 
                  ? 'شخّص أهليتك للهجرة لكندا وألمانيا وأوروبا في دقيقة واحدة باستخدام الذكاء الاصطناعي، أو حمّل الدليل الإرشادي الشامل بصيغة PDF مجاناً.'
                  : 'Évaluez votre éligibilité pour le Canada, l\'Allemagne et l\'Europe en 1 minute grâce à notre IA, ou téléchargez le guide complet PDF.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => onSelectTab('ai-assistant')}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Bot className="w-4 h-4" />
                <span>{isAr ? 'جرّب المساعد الذكي للهجرة' : 'Lancer l\'Assistant IA'}</span>
              </button>

              {onOpenLeadMagnet && (
                <button
                  onClick={onOpenLeadMagnet}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 cursor-pointer flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>{isAr ? 'تحميل دليل 2026 PDF' : 'Télécharger le Guide PDF'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Access Grid to the Core Features */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-white/10 text-right">
            
            <button
              onClick={() => onSelectTab('dashboard')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-colors cursor-pointer group"
            >
              <span className="text-base">⭐</span>
              <h4 className="text-xs font-bold text-white mt-1 group-hover:text-blue-300">
                {isAr ? 'حسابي ومفضلتي' : 'Mon Espace'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isAr ? 'حفظ الفرص وتتبع الملفات' : 'Sauvegardes & Suivi'}
              </p>
            </button>

            <button
              onClick={() => onSelectTab('pillar-seo')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-colors cursor-pointer group"
            >
              <span className="text-base">🏛️</span>
              <h4 className="text-xs font-bold text-white mt-1 group-hover:text-blue-300">
                {isAr ? 'الأدلة المرجعية' : 'Guides Référentiels'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isAr ? 'كندا، ألمانيا، أستراليا' : 'Canada, Allemagne'}
              </p>
            </button>

            <button
              onClick={() => onSelectTab('global-jobs', 'aggregator')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-colors cursor-pointer group"
            >
              <span className="text-base">💼</span>
              <h4 className="text-xs font-bold text-white mt-1 group-hover:text-blue-300">
                {isAr ? 'مجمّع الوظائف' : 'Job Aggregator'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isAr ? 'EURES · Job Bank' : 'Sources Officielles'}
              </p>
            </button>

            <button
              onClick={() => onSelectTab('study-abroad', 'universities')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-colors cursor-pointer group"
            >
              <span className="text-base">🎓</span>
              <h4 className="text-xs font-bold text-white mt-1 group-hover:text-blue-300">
                {isAr ? 'قاعدة الجامعات' : 'Universités & Bourses'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isAr ? 'منح مجانية بالخارج' : 'Frais 0€'}
              </p>
            </button>

            <button
              onClick={() => onSelectTab('shorts')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-colors cursor-pointer group"
            >
              <span className="text-base">⚡</span>
              <h4 className="text-xs font-bold text-white mt-1 group-hover:text-rose-400">
                {isAr ? 'فيديوهات 30 ثانية' : 'Shorts 30s'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isAr ? 'Reels & TikTok' : 'Vidéo Courte'}
              </p>
            </button>

            <button
              onClick={() => onSelectTab('why-mezdohub')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-colors cursor-pointer group"
            >
              <span className="text-base">🛡️</span>
              <h4 className="text-xs font-bold text-white mt-1 group-hover:text-emerald-400">
                {isAr ? 'ميثاق الثقة' : 'Charte Confiance'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isAr ? 'لماذا MezdoHub؟' : '100% Officiel'}
              </p>
            </button>

          </div>

        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2: WHY MEZDOHUB? (لماذا MEZDOHUB؟)
          All cards: White background (#FFFFFF), Border: #E2E8F0, Single Accent: #2563EB
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-5xl mx-auto space-y-8">
        
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
            {isAr ? 'لماذا MezdoHub؟' : 'Pourquoi choisir MezdoHub ?'}
          </h2>
          <p className="text-sm text-[#64748B] dark:text-slate-400">
            {isAr 
              ? 'صممت المنصة لتكون مرجعك الموثوق لبناء مسارك المهني دون تشتت.' 
              : 'Une seule plateforme conçue pour accompagner votre progression étape par étape.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center text-[#2563EB]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F172A] dark:text-white">
              {isAr ? 'منصة واحدة لكل ما تحتاجه' : 'Une seule plateforme pour avancer'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'بدلاً من التنقل بين عشرات المواقع، اجمع فرصك وخططك وأدواتك المهنية في مكان واحد.'
                : 'Plus besoin de naviguer entre plusieurs sites. Retrouvez vos opportunités, ressources et outils au même endroit.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center text-[#2563EB]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F172A] dark:text-white">
              {isAr ? 'فرص موثوقة ومحدثة' : 'Des opportunités fiables'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'نساعدك على الوصول إلى فرص مهنية حقيقية ومعلومات مفيدة لاتخاذ قرارات أفضل.'
                : 'Accédez à des offres, informations et ressources soigneusement vérifiées pour vous aider à prendre les bonnes décisions.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center text-[#2563EB]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0F172A] dark:text-white">
              {isAr ? 'طريق أوضح نحو النجاح' : 'Un parcours plus clair'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'سواء كنت طالباً أو باحثاً عن عمل أو مستقلاً، ستجد الموارد التي تساعدك على التقدم خطوة بعد خطوة.'
                : 'Que vous soyez étudiant, demandeur d’emploi, freelance ou professionnel, MezdoHub vous aide à progresser étape par étape.'}
            </p>
          </div>

        </div>

        {/* Dedicated Trust Charter Link Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {isAr ? 'ميثاق النزاهة والشفافية: لسنا مكتب هجرة ولا نبيع التأشيرات 🛡️' : 'Charte de transparence & intégrité MezdoHub'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {isAr ? 'تعرف على التزامنا بعدم تقاضي أي عمولات وتوجيهك فقط للبوابات الحكومية الرسمية.' : 'Découvrez nos engagements éthiques et nos sources gouvernementales vérifiées.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('why-mezdohub')}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          >
            {isAr ? 'قراءة ميثاق الثقة الكامل' : 'Lire la Charte'}
          </button>
        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3: WHAT DO YOU WANT TO ACHIEVE TODAY?
          Strict Card Discipline: Background White, Border #E2E8F0, Icon #2563EB
          No 5-color competition!
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="explore-services" className="max-w-5xl mx-auto space-y-8">
        
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
            {isAr ? 'الخدمات والمسارات' : 'Services & Parcours'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
            {isAr ? 'ماذا تريد أن تحقق اليوم؟' : 'Que souhaitez-vous accomplir aujourd\'hui ?'}
          </h2>
          <p className="text-sm text-[#64748B] dark:text-slate-400">
            {isAr ? 'اختر مسارك للوصول المباشر إلى الأدوات والفرص المناسبة:' : 'Sélectionnez votre voie pour accéder directement aux opportunités ciblées :'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* 1. International Migration */}
          <div 
            onClick={() => onSelectTab('migration')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] transition-all cursor-pointer shadow-xs group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[#2563EB] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                {isAr ? 'الهجرة القانونية إلى 7 دول' : 'Immigration Légale (7 Pays)'}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'دليلك الشامل لكندا، أستراليا، ألمانيا، فرنسا، أمريكا، هولندا، والسويد مع الرواتب وتكاليف المعيشة بالدرهم.'
                  : 'Guides complets pour le Canada, l\'Australie, l\'Allemagne, la France, les USA et l\'Europe.'}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#2563EB] flex items-center gap-1.5 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
              <span>{isAr ? 'استكشاف مسارات الهجرة' : 'Explorer les programmes'}</span>
              <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
            </div>
          </div>

          {/* 2. Study Abroad & Scholarships */}
          <div 
            onClick={() => onSelectTab('study-abroad')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] transition-all cursor-pointer shadow-xs group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                {isAr ? 'الدراسة والمنح الممولة 100%' : 'Bourses & Études à l\'Étranger'}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'منح تركيا، ألمانيا DAAD، المجر، رومانيا، وإيراسموس موندوس، وخطوات استخراج القبول والتأشيرة.'
                  : 'Bourses d\'études entièrement financées et procédures de visa pour étudiants marocains.'}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#2563EB] flex items-center gap-1.5 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
              <span>{isAr ? 'استكشاف المنح والجامعات' : 'Voir les bourses'}</span>
              <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
            </div>
          </div>

          {/* 3. Global & Seasonal Jobs */}
          <div 
            onClick={() => onSelectTab('global-jobs')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] transition-all cursor-pointer shadow-xs group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                {isAr ? 'عقود العمل الدولية والموسمية' : 'Emplois Internationaux & Saisonniers'}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'وظائف ألمانيا وكندا والنرويج، عقود الفلاحة الموسمية بإسبانيا وفرنسا، والعمل عن بعد بالدولار.'
                  : 'Contrats de travail qualifiés, saisons agricoles en Europe, et télétravail international.'}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#2563EB] flex items-center gap-1.5 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
              <span>{isAr ? 'تصفح الوظائف الدولية' : 'Explorer les offres'}</span>
              <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
            </div>
          </div>

          {/* 4. Side Hustles & Digital Income */}
          <div 
            onClick={() => onSelectTab('side-hustles')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] transition-all cursor-pointer shadow-xs group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                {isAr ? 'الوظائف الجانبية والربح الرقمي' : 'Side Hustles & Revenus Digitaux'}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'الربح من تصاميم Canva، المنتجات الرقمية على Etsy، العمل الحر، وبطاقة المقاول الذاتي بالمغرب.'
                  : 'Canva, Etsy, freelancing sur Fiverr, Print on Demand, et statut Auto-Entrepreneur.'}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#2563EB] flex items-center gap-1.5 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
              <span>{isAr ? 'بدء العمل الحر والدخل الإضافي' : 'Lancer un Side Hustle'}</span>
              <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
            </div>
          </div>

          {/* 5. Morocco Industry Jobs & Public Concours */}
          <div 
            onClick={() => onSelectTab('local-jobs')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] transition-all cursor-pointer shadow-xs group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[#2563EB] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                {isAr ? 'وظائف المغرب والمباريات العمومية' : 'Emploi Maroc & Concours Publics'}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'مصانع طنجة والقنيطرة وكازا، 14 مباراة عمومية مؤكدة (التعليم، الأمن، الجمارك، الدرك)، ومستجدات الـ SMIC والضريبة على الدخل 2026.'
                  : 'Industries de Tanger, Kénitra, Casa, 14 concours officiels et actualités SMIC & impôts 2026.'}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#2563EB] flex items-center gap-1.5 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
              <span>{isAr ? 'تصفح وظائف ومباريات المغرب' : 'Voir les opportunités'}</span>
              <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
            </div>
          </div>

          {/* 6. Professional ATS Resume Builder */}
          <div 
            onClick={() => onSelectTab('cv-builder')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] transition-all cursor-pointer shadow-xs group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                {isAr ? 'صانع السيرة الذاتية الذكي ATS' : 'Générateur de CV ATS Professionnel'}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                {isAr 
                  ? 'سيرة ذاتية متوافقة 100% مع روبوتات الفرز الآلي وتصدير فوري بصيغة PDF مجاناً دون علامة مائية.'
                  : 'Créez un CV optimisé pour les robots ATS des multinationales et exportez en PDF.'}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#2563EB] flex items-center gap-1.5 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
              <span>{isAr ? 'إنشاء سيرة ذاتية مجاناً' : 'Créer mon CV ATS'}</span>
              <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
            </div>
          </div>

        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4: WHY DO USERS CHOOSE MEZDOHUB?
          Clean Surface Container: Background #F8FAFC, High Contrast Typography
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-8 sm:p-10 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
          {isAr ? 'لماذا يختار المستخدمون MezdoHub؟' : 'Pourquoi les utilisateurs choisissent MezdoHub ?'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-[#334155] dark:text-slate-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{isAr ? 'الوصول إلى فرص متنوعة من مكان واحد.' : 'Toutes les opportunités au même endroit.'}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{isAr ? 'واجهة بسيطة وسريعة الاستخدام.' : 'Une expérience simple et intuitive.'}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{isAr ? 'أدوات تساعدك على اتخاذ قرارات أفضل.' : 'Des outils pour prendre de meilleures décisions.'}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{isAr ? 'محتوى وفرص محدثة باستمرار.' : 'Des ressources régulièrement mises à jour.'}</span>
          </div>
          <div className="flex items-start gap-2.5 sm:col-span-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{isAr ? 'تجربة مصممة للناطقين بالعربية والفرنسية.' : 'Une plateforme moderne pensée pour les utilisateurs francophones et arabophones.'}</span>
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4.5: INTERACTIVE TOOLS & CALCULATORS DIRECTORY
          Direct 1-Click Launchers for All Restored Tools
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              {isAr ? 'مركز الأدوات والحاسبات الذكية' : 'Hub des Calculateurs & Outils'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white mt-1">
              {isAr ? 'أدوات تفاعلية مجانية مصممة لتسهيل قراراتك' : 'Outils interactifs gratuits & précis'}
            </h2>
          </div>
          <span className="text-xs text-[#64748B] dark:text-slate-400">
            {isAr ? 'تعمل 100% في جهازك بسرعة فائقة' : '100% instantané et sécurisé'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          {/* Tool 1: DV Lottery Photo Checker */}
          <div 
            onClick={() => onSelectTab('dv-lottery')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center font-bold">
                📸
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                مجاني 100%
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'فاحص صورة قرعة أمريكا 2027' : 'Vérificateur Photo DV 2027'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'فحص بيومتري فوري للأبعاد (600x600) والوزن وتمركز الوجه قبل التسجيل الرسمي.' : 'Analyse de conformité 600x600 px.'}
            </p>
          </div>

          {/* Tool 2: ATS Resume Builder */}
          <div 
            onClick={() => onSelectTab('cv-builder')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center font-bold">
                📄
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                تصدير PDF فوري
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'صانع السيرة الذاتية المهنية ATS' : 'Créateur de CV ATS Maroc'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'نموذج كلاسيكي معتمد للشركات ومصانع السيارات مع تحميل فوري بصيغة PDF.' : 'Conforme aux normes de recrutement.'}
            </p>
          </div>

          {/* Tool 3: Net Salary Calculator */}
          <div 
            onClick={() => onSelectTab('local-jobs', 'salary-calc')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center font-bold">
                🧮
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                قانون المالية 2026
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'حاسبة الراتب الصافي (Salaire Net)' : 'Simulateur Salaire Net Maroc'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'حساب الراتب الصافي الحقيقي بعد خصم CNSS و AMO والضريبة على الدخل IGR.' : 'Calcul brut en net avec déductions.'}
            </p>
          </div>

          {/* Tool 4: Demande d'Emploi Generator */}
          <div 
            onClick={() => onSelectTab('local-jobs', 'demande-maker')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold">
                ✍️
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                فرنسية وعربية
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'مولد الطلب الخطي (Demande d\'Emploi)' : 'Lettre de Demande d\'Emploi'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'صيغ إدارية قانونية جاهزة للنسخ والتقديم المباشر للمصانع والوظائف والمباريات.' : 'Modèles prêts pour usines et concours.'}
            </p>
          </div>

          {/* Tool 5: PayPal to Moroccan Banks */}
          <div 
            onClick={() => onSelectTab('freelance-money', 'paypal')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold">
                💳
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                CIH / التجاري
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'حاسبة سحب PayPal إلى بنوك المغرب' : 'PayPal vers Banques Marocaines'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'احتساب دقيق لعمولات بايبال وهامش الصرف وفارق السعر حتى وصول الدرهم لحسابك.' : 'Simulation exacte des frais bancaires.'}
            </p>
          </div>

          {/* Tool 6: Auto-Entrepreneur Tax & Invoice */}
          <div 
            onClick={() => onSelectTab('freelance-money', 'auto-entrepreneur')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold">
                🧾
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
                مطابق للـ ICE
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'محاكي المقاول الذاتي ومولد الفواتير' : 'Impôts & Facture Auto-Entrepreneur'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'احتساب ضريبة 1% و 2% و CNSS وتوليد فواتير قانونية معفاة من TVA.' : 'Calculateur fiscal et modèle officiel.'}
            </p>
          </div>

          {/* Tool 7: Germany Chancenkarte Points */}
          <div 
            onClick={() => onSelectTab('migration', 'germany-calc')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 flex items-center justify-center font-bold">
                🇩🇪
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
                نظام 6 نقاط
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'حاسبة نقاط فيزا ألمانيا (Chancenkarte)' : 'Simulateur Chancenkarte Allemagne'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'فحص نقاط تأشيرة البحث عن عمل الجديدة بألمانيا لحاملي دبلومات OFPPT والجامعة.' : 'Test d\'éligibilité officiel à 6 points.'}
            </p>
          </div>

          {/* Tool 8: Canada Express Entry */}
          <div 
            onClick={() => onSelectTab('migration', 'canada-check')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 flex items-center justify-center font-bold">
                🇨🇦
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300">
                الحرف الماهرة
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'فاحص معايير الهجرة لكندا (Express Entry)' : 'Éligibilité Express Entry Canada'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'تقييم شروط السفر والعمل في كندا للتقنيين وأصحاب الخبرات المهنية.' : 'Évaluation des compétences requises.'}
            </p>
          </div>

          {/* Tool 9: LifeMap Arab Diagnostic */}
          <div 
            onClick={() => onSelectTab('lifemap-arab')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center font-bold">
                🧭
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                تشخيص ذكي
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
              {isAr ? 'بوصلة التوجيه وتحديد المسار LifeMap' : 'Boussole d\'Orientation LifeMap'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'اختبار تفاعلي سريع لمساعدتك على اكتشاف نقاط قوتك والوظائف الأنسب لك.' : 'Diagnostic de profil professionnel.'}
            </p>
          </div>

          {/* Tool 10: Short Videos Hub (30s Reels) */}
          <div 
            onClick={() => onSelectTab('shorts')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-rose-500 cursor-pointer transition-all shadow-xs space-y-2 group sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-rose-50/50 via-purple-50/30 to-white dark:from-rose-950/20 dark:via-purple-950/10 dark:to-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center font-bold">
                  🎬
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                  مشغل ريلز تفاعلي ⚡
                </span>
              </div>
              <span className="text-xs font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-[-3px] transition-transform">
                <span>تشغيل الفيديوهات الآن</span>
                <span>←</span>
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-rose-600 transition-colors">
              {isAr ? 'فيديوهات 30 ثانية: زبدة فرص الهجرة والدراسة والعمل الحر (TikTok & Reels 2026)' : 'Shorts 30s : Guides Express Vidéo'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'مشغل تفاعلي حقيقي بأسلوب الريلز العمودي، قراءة صوتية بالذكاء الاصطناعي، وسيناريوهات جاهزة للمحتوى مع روابط البوابات الرسمية.' : 'Reels et capsules vidéo interactives avec lecture audio et guides officiels.'}
            </p>
          </div>

          {/* Tool 11: Content Hub & Moroccan Customs (AliExpress, Temu, Shein) */}
          <div 
            onClick={() => onSelectTab('content-hub')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-amber-500 cursor-pointer transition-all shadow-xs space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold">
                📦
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                1000+ كلمة
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-amber-600 transition-colors">
              {isAr ? 'مركز المقالات والجمارك (AliExpress و Temu و Shein)' : 'Centre de Guides & Douanes'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'دليل رسوم الجمارك والـ TVA 20%، الهجرة لإسبانيا وفرنسا، والحساب البنكي المغلق بألمانيا.' : 'Guides approfondis sur les douanes, visas européens et études.'}
            </p>
          </div>

          {/* Tool 12: AdSense & SEO Technical Audit Health Dashboard */}
          <div 
            onClick={() => onSelectTab('audit-health')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition-all shadow-xs space-y-2 group sm:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center font-bold">
                🛡️
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono">
                98/100 AUDIT
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover:text-emerald-600 transition-colors">
              {isAr ? 'لوحة فحص AdSense التقني ومؤشرات Core Web Vitals المباشرة' : 'Audit Technique AdSense & Web Vitals'}
            </h3>
            <p className="text-[#64748B] dark:text-slate-400 text-[11px] leading-relaxed">
              {isAr ? 'فحص ملفات ads.txt و sitemap.xml و robots.txt ومؤشرات LCP / INP / CLS وفهرسة Search Console في الزمن الحقيقي.' : 'Diagnostic technique en temps réel des standards Google Publisher.'}
            </p>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5: HOW TO START? (كيف تبدأ؟)
          Step 1, Step 2, Step 3
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-4xl mx-auto space-y-8 text-center">
        
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
            {isAr ? 'كيف تبدأ؟' : 'Comment démarrer ?'}
          </h2>
          <p className="text-sm text-[#64748B] dark:text-slate-400">
            {isAr ? 'ثلاث خطوات بسيطة ومباشرة للبدء:' : 'Trois étapes simples pour débuter :'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white">
              {isAr ? 'اختر هدفك' : '1. Définissez votre objectif'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'حدد ما تبحث عنه: وظيفة، هجرة، عمل حر أو تطوير مهني.'
                : 'Emploi, migration, freelancing ou développement professionnel.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white">
              {isAr ? 'اكتشف الفرص المناسبة' : '2. Explorez les opportunités adaptées'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'استكشف الخدمات والموارد المصممة لمساعدتك.'
                : 'Accédez aux ressources et services correspondant à vos besoins.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-bold text-sm text-[#0F172A] dark:text-white">
              {isAr ? 'ابدأ رحلتك' : '3. Passez à l\'action'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
              {isAr 
                ? 'اتخذ الخطوة التالية نحو مستقبلك بثقة أكبر.'
                : 'Commencez votre parcours avec davantage de visibilité et de confiance.'}
            </p>
          </div>

        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6: NUMBERS THAT REFLECT GROWTH (أرقام تعكس النمو)
          Minimal Clean Stat Metric Bar
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-8 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white font-mono">5,000+</div>
            <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200 block">
              {isAr ? 'مستخدمون نشطون' : 'Utilisateurs actifs'}
            </span>
            <span className="text-[11px] text-[#64748B] dark:text-slate-400 block">
              {isAr ? 'ساعدنا آلاف المستخدمين' : 'Communauté active'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#2563EB] font-mono">300+</div>
            <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200 block">
              {isAr ? 'فرص وموارد' : 'Opportunités disponibles'}
            </span>
            <span className="text-[11px] text-[#64748B] dark:text-slate-400 block">
              {isAr ? 'مصادر متاحة باستمرار' : 'Ressources continues'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white font-mono">50+</div>
            <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200 block">
              {isAr ? 'أدوات ذكية' : 'Outils intelligents'}
            </span>
            <span className="text-[11px] text-[#64748B] dark:text-slate-400 block">
              {isAr ? 'توفير الوقت والجهد' : 'Gain de temps'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white font-mono">24/7</div>
            <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200 block">
              {isAr ? 'متاحة دائماً' : 'Disponible 24/7'}
            </span>
            <span className="text-[11px] text-[#64748B] dark:text-slate-400 block">
              {isAr ? 'وصول سريع من أي جهاز' : 'Accès partout'}
            </span>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7: VERIFIED REVIEWS & USER EXPERIENCES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-5xl mx-auto">
        <ReviewsSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7.4: SMART INTERNAL LINKING ENGINE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-5xl mx-auto">
        <SmartRelatedContent currentContext="home" onSelectTab={onSelectTab} />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7.5: FREQUENTLY ASKED QUESTIONS (FAQ)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-5xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
        <FaqSection />
      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 8: CTA (مستقبل أفضل يبدأ بخطوة واحدة)
          Clean Minimalist Box · Single Blue Button
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-8 sm:p-12 rounded-2xl bg-[#0F172A] text-white text-center space-y-5 max-w-3xl mx-auto shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-black">
          {isAr ? 'مستقبل أفضل يبدأ بخطوة واحدة' : 'Votre prochaine étape commence aujourd\'hui'}
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          {isAr 
            ? 'انضم إلى مجتمع يسعى للنمو واكتشاف الفرص وبناء مستقبل مهني أقوى.' 
            : 'Rejoignez une communauté qui avance, apprend et saisit de nouvelles opportunités.'}
        </p>

        {subscribed ? (
          <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold max-w-md mx-auto">
            {isAr ? 'تم استلام بريدك بنجاح. مرحباً بك في MezdoHub.' : 'Inscription confirmée. Bienvenue sur MezdoHub.'}
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder={isAr ? 'أدخل بريدك الإلكتروني...' : 'Votre adresse email...'}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-[#2563EB]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer active:scale-95 transition-all shrink-0"
            >
              {isAr ? 'ابدأ مجاناً' : 'Commencer gratuitement'}
            </button>
          </form>
        )}
      </section>

    </div>
  );
};
