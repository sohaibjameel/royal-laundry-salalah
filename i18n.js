(function () {
  var AR = {
    'skip': 'تخطَّ إلى المحتوى',
    'nav.services': 'الأسعار',
    'nav.process': 'طريقة العمل',
    'nav.areas': 'المناطق',
    'nav.contact': 'تواصل معنا',
    'cta.book': 'اطلب استلام',
    'cta.free': 'اطلب استلاماً مجانياً',
    'cta.whatsapp': 'راسلنا على واتساب',
    'hero.place': 'صلالة، ظفار',
    'hero.title': 'سجادكم يُغسل بعناية ملكية.',
    'hero.lead': 'نستلم سجادكم وغنفاتكم من باب البيت، نغسلها غسيلاً عميقاً، ونعيدها نظيفة وفوّاحة خلال ٤٨ ساعة عادةً.',
    'fact1.a': 'مجاناً', 'fact1.b': 'الاستلام والتوصيل',
    'fact2.a': '٤٨ ساعة', 'fact2.b': 'مدة التسليم المعتادة',
    'fact3.a': 'بطاقة أو نقداً', 'fact3.b': 'عند التسليم',
    'hero.hint': 'حرّك المؤشر فوق السجادة',
    'services.title': 'أسعار واضحة قبل الحجز',
    'services.lead': 'بلا مفاجآت عند الباب. قِس سجادتك وعُدّ غنفاتك، وتعرف المبلغ مسبقاً.',
    'services.note': 'أسعار تجريبية للعرض، والأسعار النهائية من الغسيل الملكي.',
    'p.carpets': 'السجاد والموكيت',
    'p.c1': 'سجاد آلي', 'p.c2': 'سجاد يدوي وصوف', 'p.c3': 'سجادة صلاة',
    'p.blankets': 'الغنفات والبطانيات',
    'p.b1': 'غنفة مفردة', 'p.b2': 'غنفة مزدوجة', 'p.b3': 'لحاف',
    'omr': 'ر.ع', 'per.m2': '/ م²', 'per.pc': '/ قطعة',
    'compare.title': 'شاهد الفرق',
    'compare.lead': 'اسحب المؤشر. يزول الرمل والغبار والبقع اليومية، وتعود الألوان.',
    'ba.before': 'قبل', 'ba.after': 'بعد', 'ba.label': 'قارن قبل وبعد',
    'process.title': 'من بابك وإليه في أربع خطوات',
    's1.t': 'احجز', 's1.d': 'أرسل القطع والوقت المناسب عبر واتساب أو النموذج أدناه.',
    's2.t': 'نستلم', 's2.d': 'يستلم السائق من بيتك في أي مكان في صلالة.',
    's3.t': 'غسيل عميق', 's3.d': 'ننفض الغبار، نغسل بالشامبو، نشطف ونجفف تماماً.',
    's4.t': 'نوصّل', 's4.d': 'تعود إلى بابك ملفوفة ومغلّفة. ادفع بالبطاقة أو نقداً.',
    'areas.title': 'نغطي صلالة كاملة',
    'areas.lead': 'استلام وتوصيل في هذه المناطق. في مكان آخر في ظفار؟ اسألنا على واتساب.',
    'a1': 'السعادة', 'a2': 'الدهاريز', 'a3': 'عوقد', 'a4': 'الحافة', 'a5': 'صلالة الغربية', 'a6': 'الوادي', 'a7': 'ريسوت', 'a8': 'طاقة',
    'reviews.title': 'ماذا تقول العائلات في صلالة',
    'r1': '«استلموا ثلاث سجادات كبيرة يوم الخميس ورجّعوها يوم السبت. ريحتها نظيفة.»', 'r1n': 'أم فيصل، السعادة',
    'r2': '«سجادة المجلس رجعت كأنها جديدة. والسائق كان في الموعد بالذهاب والإياب.»', 'r2n': 'سالم، عوقد',
    'r3': '«الحجز سهل على واتساب، والغنفات رجعت ناعمة ومطوية.»', 'r3n': 'مريم، الدهاريز',
    'book.title': 'احجز الاستلام',
    'book.lead': 'عبّئ النموذج ويفتح لك واتساب والطلب جاهز للإرسال. نؤكد معك الموعد.',
    'call': 'اتصال', 'wa': 'واتساب',
    'hours': 'من السبت إلى الخميس، ٨ صباحاً حتى ١٠ مساءً',
    'f.name': 'الاسم', 'f.area': 'المنطقة', 'f.choose': 'اختر منطقتك',
    'f.carpets': 'سجاد', 'f.blankets': 'غنفات', 'f.date': 'يوم الاستلام', 'f.time': 'الوقت',
    't1': 'صباحاً (٩–١٢)', 't2': 'عصراً (٤–٧)', 't3': 'مساءً (٧–١٠)',
    'f.submit': 'أرسل الحجز على واتساب',
    'foot.credit': 'تصميم الموقع: صهيب جميل',
    'err.name': 'اكتب اسمك حتى نعرف من نخاطب.',
    'err.area': 'اختر منطقتك حتى نرسل السائق.',
    'err.items': 'أضف سجادة أو غنفة واحدة على الأقل.',
    'err.date': 'اختر يوم الاستلام.'
  };
  var EN_ERR = {
    'err.name': 'Add your name so we know who to ask for.',
    'err.area': 'Choose your area so we can send the driver.',
    'err.items': 'Add at least one carpet or blanket.',
    'err.date': 'Choose a pickup day.'
  };

  var EN = {};
  var nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(function (el) { EN[el.getAttribute('data-i18n')] = el.innerHTML; });
  Object.keys(EN_ERR).forEach(function (k) { EN[k] = EN_ERR[k]; });

  var current = 'en';
  try { var saved = localStorage.getItem('rl-lang'); if (saved === 'ar') current = 'ar'; } catch (e) {}

  function apply(lang) {
    current = lang;
    var dict = lang === 'ar' ? AR : EN;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    nodes.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    var btn = document.getElementById('langToggle');
    btn.textContent = lang === 'ar' ? 'English' : 'العربية';
    btn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    document.title = lang === 'ar'
      ? 'الغسيل الملكي | غسيل السجاد والغنفات في صلالة'
      : 'Royal Laundry | Carpet & Blanket Washing in Salalah';
    try { localStorage.setItem('rl-lang', lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent('rl-lang', { detail: lang }));
  }

  window.RL_T = function (key) { return (current === 'ar' ? AR : EN)[key] || key; };
  window.RL_LANG = function () { return current; };

  document.getElementById('langToggle').addEventListener('click', function () {
    apply(current === 'ar' ? 'en' : 'ar');
  });
  if (current === 'ar') apply('ar');
})();
