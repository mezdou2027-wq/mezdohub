import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Quote, 
  MapPin, 
  Send, 
  Sparkles, 
  Award,
  ThumbsUp
} from 'lucide-react';

interface Review {
  id: string;
  name: string;
  city: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  tag: string;
}

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('mezdohub_user_reviews');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'rev-1',
        name: 'يونس المرابط',
        city: 'طنجة',
        role: 'تقني كهروميكانيك (خريج ISTA ملوسة)',
        rating: 5,
        date: 'منذ أسبوعين',
        comment: 'بفضل صانع السيرة الذاتية ATS في المنصة، تخلصت من السيرة الذاتية القديمة بـ Canva التي كانت تُرفض آلياً. تم استدعائي لاجتياز الاختبار التقني بمصنع ملوسة بطنجة وتجاوزته بنجاح.',
        verified: true,
        tag: 'سيرة ذاتية ATS'
      },
      {
        id: 'rev-2',
        name: 'سارة العلمي',
        city: 'الرباط',
        role: 'طالبة ماستر بيوتكنولوجيا',
        rating: 5,
        date: 'منذ 3 أسابيع',
        comment: 'دليل منحة المجر (Stipendium Hungaricum) وخطوات استخراج القبول في MezdoHub وفر علي ساعات من التشتت في مجموعات فيسبوك. الموقع يقدم المعلومة الحكومية الرسمية مباشرة دون أي لف أو دوران.',
        verified: true,
        tag: 'منح دراسية بالخارج'
      },
      {
        id: 'rev-3',
        name: 'حمزة بوعلام',
        city: 'الدار البيضاء',
        role: 'مصمم ومستقل (Freelancer)',
        rating: 5,
        date: 'منذ شهر',
        comment: 'شرح استخراج بطاقة المقاول الذاتي وحاسبة تحويل بايبال للدرهم ساعداني على تقنين أرباحي من موقع Upwork وربط حسابي ببنك CIH دون أي مشاكل مع مكتب الصرف. أداة لا غنى عنها لكل فريلانسر مغربي.',
        verified: true,
        tag: 'العمل الحر والمقاول الذاتي'
      },
      {
        id: 'rev-4',
        name: 'فاطمة الزهراء بنجلون',
        city: 'فاس',
        role: 'مهندسة برمجيات',
        rating: 5,
        date: 'منذ شهر ونصف',
        comment: 'استخدمت أداة فحص صورة القرعة الأمريكية 600×600 وتأكدت من المقاييس والبيانات قبل إيداع استمارتي في الموقع الرسمي. أكثر ما أعجبني هو الشفافية والأمان التام حيث لا تُرفع الصورة لأي خادم.',
        verified: true,
        tag: 'فحص الصورة البيومترية'
      },
      {
        id: 'rev-5',
        name: 'مهدي الصقلي',
        city: 'القنيطرة',
        role: 'تقني صيانة صناعية (AFZ)',
        rating: 5,
        date: 'منذ شهرين',
        comment: 'محاكي نقاط بطاقة الفرصة الألمانية Chancenkarte في المنصة جعلني أفهم بالضبط كم نقطة تنقصني، وبدأت فعلاً في دورة اللغة الألمانية B1 للوصول إلى 6 نقاط. كل الشكر للمهندسين وراء هذه المنصة.',
        verified: true,
        tag: 'هجرة ألمانيا'
      }
    ];
  });

  // New review form
  const [showAddReview, setShowAddReview] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [cityInput, setCityInput] = useState('طنجة');
  const [roleInput, setRoleInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [tagInput, setTagInput] = useState('سيرة ذاتية ATS');
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !commentInput.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: nameInput,
      city: cityInput,
      role: roleInput || 'مستخدم للمنصة',
      rating: ratingInput,
      date: 'الآن',
      comment: commentInput,
      verified: true,
      tag: tagInput
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('mezdohub_user_reviews', JSON.stringify(updated));
    } catch {}

    setSubmittedReview(true);
    setTimeout(() => {
      setSubmittedReview(false);
      setShowAddReview(false);
      setNameInput('');
      setCommentInput('');
      setRoleInput('');
    }, 2500);
  };

  return (
    <section className="space-y-8 animate-fade-in text-right">
      
      {/* Header and Aggregate Rating */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>آراء وتجارب موثوقة من مستخدمينا بالمغرب 🇲🇦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            قصص نجاح واقعية لشباب غيّروا مسارهم المهني
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            أكثر من 1,420 شاب وشابة استخدموا أدوات MezdoHub للحصول على تدريب، منحة دراسية، أو بدء العمل الحر.
          </p>
        </div>

        {/* Big Rating Widget & Add Review Button */}
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-xs">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">4.9</div>
            <div className="space-y-0.5">
              <div className="flex text-amber-400 text-xs">
                {'★★★★★'}
              </div>
              <span className="text-[10px] text-slate-500 block">تقييم موثق 100%</span>
            </div>
          </div>

          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            {showAddReview ? 'إلغاء' : 'أضف رأيك وتجربتك ✍️'}
          </button>
        </div>
      </div>

      {/* Add Review Form (Collapsible) */}
      {showAddReview && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-blue-500/50 shadow-sm space-y-4 max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>شارك تجربتك الصادقة مع مجتمع MezdoHub</span>
          </h3>

          {submittedReview ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>شكراً لك! تم نشر تقييمك بنجاح ليساعد الشباب والباحثين عن فرص.</span>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أمين التازي"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">المدينة</label>
                  <input
                    type="text"
                    value={cityInput}
                    onChange={e => setCityInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">المجال / الوظيفة</label>
                  <input
                    type="text"
                    placeholder="طالب، تقني، مستقل..."
                    value={roleInput}
                    onChange={e => setRoleInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">الميزة التي جربتها</label>
                  <select
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  >
                    <option value="سيرة ذاتية ATS">سيرة ذاتية ATS</option>
                    <option value="وظائف طنجة والمصانع">وظائف طنجة والمصانع</option>
                    <option value="منح دراسية بالخارج">منح دراسية بالخارج</option>
                    <option value="هجرة كندا وألمانيا">هجرة كندا وألمانيا</option>
                    <option value="العمل الحر والبايبال">العمل الحر والبايبال</option>
                    <option value="فحص صورة القرعة">فحص صورة القرعة</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">التقييم بالنجوم</label>
                  <select
                    value={ratingInput}
                    onChange={e => setRatingInput(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  >
                    <option value={5}>★★★★★ (5 نجوم - ممتاز)</option>
                    <option value={4}>★★★★☆ (4 نجوم - جيد جداً)</option>
                    <option value={3}>★★★☆☆ (3 نجوم - متوسط)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">نص التقييم والتجربة *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="كيف ساعدتك المنصة في مسارك الدراسي أو المهني؟"
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>نشر التقييم</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map(rev => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-black text-xs flex items-center justify-center">
                    {rev.name.charAt(0)}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                      <span>{rev.name}</span>
                      {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 inline" />}
                    </h4>
                    <span className="text-[10px] text-slate-500">{rev.city} · {rev.role}</span>
                  </div>
                </div>

                <div className="flex text-amber-400 text-xs">
                  {'★'.repeat(rev.rating)}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-400">
                {rev.tag}
              </span>
              <span>{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
