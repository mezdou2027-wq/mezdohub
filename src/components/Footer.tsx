import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, Mail, Scale, Lock, FileText } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenLegal?: (sub: 'privacy' | 'terms' | 'disclaimer' | 'cookies') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenLegal }) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';

  return (
    <footer className="border-t border-slate-800 bg-[#0F172A] text-slate-400 py-12 mt-20 transition-all text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-8 border-b border-slate-850">
          
          {/* Col 1: About */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                M
              </div>
              <span className="text-xl font-black text-white">MezdoHub</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              {isAr 
                ? 'منصة عربية تساعد الأفراد على اكتشاف الفرص وبناء مستقبلهم المهني من خلال خدمات وأدوات رقمية حديثة وموثوقة.'
                : 'MezdoHub accompagne les étudiants, les professionnels, les freelances et les chercheurs d\'opportunités vers leur évolution professionnelle.'}
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{isAr ? 'منصة موثوقة ومجانية للاستخدام العام' : 'Plateforme fiable et sécurisée'}</span>
            </div>
          </div>

          {/* Col 2: International Pathways */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase text-white">
              {isAr ? 'الفرص والهجرة' : 'Opportunités'}
            </h4>
            <ul className="text-xs space-y-2">
              <li><button onClick={() => onSelectTab('dashboard')} className="hover:text-blue-400 cursor-pointer font-bold text-blue-400">{isAr ? 'حسابي ومفضلتي ⭐' : 'Mon Espace'}</button></li>
              <li><button onClick={() => onSelectTab('pillar-seo')} className="hover:text-blue-400 cursor-pointer">{isAr ? 'أدلة الهجرة المرجعية 2026' : 'Guides SEO 2026'}</button></li>
              <li><button onClick={() => onSelectTab('study-abroad')} className="hover:text-blue-400 cursor-pointer">{isAr ? 'الدراسة والمنح بالخارج' : 'Bourses & Études'}</button></li>
              <li><button onClick={() => onSelectTab('global-jobs')} className="hover:text-blue-400 cursor-pointer">{isAr ? 'عقود العمل الدولية' : 'Emploi International'}</button></li>
            </ul>
          </div>

          {/* Col 3: Career & Side Hustles */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase text-white">
              {isAr ? 'الثقة والوسائط' : 'Confiance & Médias'}
            </h4>
            <ul className="text-xs space-y-2">
              <li><button onClick={() => onSelectTab('why-mezdohub')} className="hover:text-blue-400 cursor-pointer text-emerald-400 font-bold">{isAr ? 'لماذا MezdoHub؟ (ميثاق الثقة)' : 'Pourquoi MezdoHub'}</button></li>
              <li><button onClick={() => onSelectTab('shorts')} className="hover:text-blue-400 cursor-pointer">{isAr ? 'فيديوهات سريعة (TikTok / Shorts)' : 'Shorts 30s'}</button></li>
              <li><button onClick={() => onSelectTab('side-hustles')} className="hover:text-blue-400 cursor-pointer">{isAr ? 'الوظائف الجانبية (Canva/Etsy)' : 'Side Hustles'}</button></li>
              <li><button onClick={() => onSelectTab('cv-builder')} className="hover:text-blue-400 cursor-pointer">{isAr ? 'صانع السيرة الذاتية ATS' : 'CV ATS Pro'}</button></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase text-white">
              {isAr ? 'الخصوصية والقانون' : 'Légal & Conformité'}
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <button 
                  onClick={() => onOpenLegal ? onOpenLegal('privacy') : onSelectTab('legal')} 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {isAr ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal ? onOpenLegal('terms') : onSelectTab('legal')} 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {isAr ? 'الشروط والأحكام' : 'Conditions d\'utilisation'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal ? onOpenLegal('disclaimer') : onSelectTab('legal')} 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {isAr ? 'إخلاء المسؤولية' : 'Avertissement légal'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenLegal ? onOpenLegal('cookies') : onSelectTab('legal')} 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {isAr ? 'ملفات تعريف الارتباط' : 'Gestion des cookies'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('content-hub')} 
                  className="hover:text-blue-400 cursor-pointer text-amber-300 font-bold"
                >
                  {isAr ? 'مركز المحتوى والجمارك 📦' : 'Content Hub & Douane'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('author-eeat')} 
                  className="hover:text-blue-400 cursor-pointer text-indigo-300 font-bold"
                >
                  {isAr ? 'ملف الكاتب وميثاق E-E-A-T 🏛️' : 'Auteur & E-E-A-T'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('audit-health')} 
                  className="hover:text-blue-400 cursor-pointer text-emerald-400 font-bold"
                >
                  {isAr ? 'فحص جاهزية AdSense التقني 🛡️' : 'AdSense Audit Score'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('owner-crm')} 
                  className="hover:text-amber-400 cursor-pointer text-amber-400 font-black flex items-center gap-1"
                  title="الدخول للوحة تحكم المالك والإدارة"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>{isAr ? 'لوحة تحكم المالك 👑' : 'Espace Propriétaire 👑'}</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Vision 3.0 Signature */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span className="font-medium text-slate-400">
            MezdoHub · {isAr ? 'الفرصة التالية تبدأ هنا.' : 'La prochaine opportunité commence ici.'}
          </span>
          <span>© {new Date().getFullYear()} MezdoHub. {isAr ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}</span>
        </div>
      </div>
    </footer>
  );
};
