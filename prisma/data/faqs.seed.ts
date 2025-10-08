// Centralized FAQ seed data for all pages

export const homepageFAQs = [
  {
    pagePath: '/',
    questionEn: 'What services do you offer (web, mobile, ecommerce, design, marketing)?',
    questionAr: 'ما الخدمات التي نقدمها (مواقع، تطبيقات، متاجر، تصميم، تسويق)؟',
    answerEn: 'We build high‑performance websites, iOS/Android apps (Flutter/React Native), secure ecommerce stores, conversion‑focused UI/UX, and full‑funnel digital marketing. All delivered by an in‑house Saudi team.',
    answerAr: 'نطوّر مواقع عالية الأداء، وتطبيقات iOS/Android (Flutter/React Native)، ومتاجر إلكترونية آمنة، وتجارب UI/UX تركز على التحويل، وتسويق رقمي متكامل — بفريق سعودي داخلي.',
    displayOrder: 0,
    isActive: true,
  },
  {
    pagePath: '/',
    questionEn: 'How long does a typical project take (website/app)?',
    questionAr: 'كم يستغرق تنفيذ المشروع (موقع/تطبيق) عادة؟',
    answerEn: 'Websites: 3–6 weeks for standard builds, 6–10 weeks for custom. Mobile apps: 8–16 weeks depending on features, integrations, and QA. We share a clear timeline and milestones before we start.',
    answerAr: 'المواقع: من 3 إلى 6 أسابيع للمشاريع القياسية و6–10 أسابيع للمشاريع المخصصة. التطبيقات: 8–16 أسبوعاً حسب المزايا والتكاملات وجودة الاختبارات. نشاركك خطّة زمنية ومعالم واضحة قبل البدء.',
    displayOrder: 1,
    isActive: true,
  },
  {
    pagePath: '/',
    questionEn: 'How much does a project cost and what affects the price?',
    questionAr: 'كم تكلفة المشروع وما العوامل المؤثرة في السعر؟',
    answerEn: 'Pricing depends on scope, design depth, integrations, content, and support level. We offer fixed‑price packages and retainers. You get a transparent proposal with deliverables, timeline, and investment.',
    answerAr: 'تعتمد التكلفة على نطاق العمل وعمق التصميم والتكاملات والمحتوى ومستوى الدعم. نوفر باقات بسعر ثابت واشتراكات شهرية. تحصل على عرض واضح يتضمن التسليمات والجدول الزمني والتكلفة.',
    displayOrder: 2,
    isActive: true,
  },
  {
    pagePath: '/',
    questionEn: 'Do you provide maintenance, hosting, and post‑launch support?',
    questionAr: 'هل تقدمون الصيانة والاستضافة والدعم بعد الإطلاق؟',
    answerEn: 'Yes. We provide managed hosting, uptime monitoring, security updates, performance optimization, analytics, and A/B testing. Support SLAs are available for mission‑critical products.',
    answerAr: 'نعم. نقدم استضافة مُدارة، ومراقبة الاستقرار، وتحديثات الأمان، وتحسين الأداء، والتحليلات، واختبارات A/B. تتوفر اتفاقيات مستوى خدمة للدعم للمشاريع الحسّاسة.',
    displayOrder: 3,
    isActive: true,
  },
  {
    pagePath: '/',
    questionEn: 'Can you sign an NDA and work with existing systems (ERP/CRM)?',
    questionAr: 'هل توقّعون اتفاقية عدم إفشاء ويمكنكم العمل مع الأنظمة القائمة (ERP/CRM)؟',
    answerEn: 'Absolutely. We sign NDAs and integrate with popular ERPs/CRMs (SAP, Odoo, Zoho, HubSpot) and payment/shipping gateways commonly used in KSA.',
    answerAr: 'بالتأكيد. نوقع اتفاقيات عدم إفشاء ونندمج مع أشهر أنظمة ERP/CRM (مثل SAP وOdoo وZoho وHubSpot) ومع بوابات الدفع والشحن الشائعة في السعودية.',
    displayOrder: 4,
    isActive: true,
  },
];

export const servicesFAQs = [
  {
    pagePath: '/services',
    questionEn: 'Do you build SEO‑ready, Core Web Vitals‑passing websites?',
    questionAr: 'هل تطوّرون مواقع متوافقة مع السيو وتنجح في Core Web Vitals؟',
    answerEn: 'Yes. We ship semantic HTML, structured data (Schema.org), image/CDN optimization, lazy loading, and caching. Our builds target Lighthouse 90+ and pass Core Web Vitals on real devices.',
    answerAr: 'نعم. نعتمد HTML دلالياً وبيانات منظّمة (Schema.org) وتحسين الصور وCDN والتحميل الكسول والتخزين المؤقّت. نستهدف 90+ في Lighthouse ونجتاز Core Web Vitals على أجهزة حقيقية.',
    displayOrder: 0,
    isActive: true,
  },
  {
    pagePath: '/services',
    questionEn: 'Which tech stack do you use for mobile apps and when?',
    questionAr: 'ما التقنيات التي تستخدمونها لتطبيقات الموبايل ومتى؟',
    answerEn: 'We use Flutter/React Native for cross‑platform speed and native modules for performance‑critical features (camera, maps, payments). CI/CD and store publishing are included.',
    answerAr: 'نستخدم Flutter/React Native للتطوير المتعدد المنصّات، مع وحدات أصلية للوظائف الحسّاسة (الكاميرا، الخرائط، الدفع). نوفر CI/CD ورفع التطبيقات للمتاجر.',
    displayOrder: 1,
    isActive: true,
  },
  {
    pagePath: '/services',
    questionEn: 'How do you secure ecommerce (payments, fraud, PCI)?',
    questionAr: 'كيف تؤمّنون المتاجر الإلكترونية (الدفع، الاحتيال، PCI)؟',
    answerEn: 'We integrate trusted KSA gateways (Mada, STC Pay, HyperPay, Tap), enforce HTTPS, tokenization, rate limiting, audit logs, and follow PCI‑DSS best practices.',
    answerAr: 'نستخدم بوابات دفع موثوقة في السعودية (مدى، STC Pay، HyperPay، Tap) مع HTTPS، وترميز بطاقات، وتقييد معدّل الطلبات، وسجلات تدقيق، وأفضل ممارسات PCI‑DSS.',
    displayOrder: 2,
    isActive: true,
  },
  {
    pagePath: '/services',
    questionEn: 'Do you offer ongoing SEO and performance optimization?',
    questionAr: 'هل تقدّمون تحسينات مستمرة للسيو والأداء؟',
    answerEn: 'Yes. We deliver technical SEO fixes, content guidance, link‑safe improvements, and performance budgets with continuous monitoring and reporting.',
    answerAr: 'نعم. نقدم تحسينات سيو تقنية، وإرشادات محتوى، وتطويرات آمنة للروابط، وميزانيات أداء مع مراقبة وتقارير مستمرة.',
    displayOrder: 3,
    isActive: true,
  },
  {
    pagePath: '/services',
    questionEn: 'What after‑launch SLAs and warranty do you provide?',
    questionAr: 'ما الضمان واتفاقيات الدعم بعد الإطلاق؟',
    answerEn: 'We include a bug‑fix warranty window and offer SLAs for response/resolution times, security patching, backups, and 24/7 monitoring for critical systems.',
    answerAr: 'نوفر فترة ضمان لإصلاح الأخطاء، واتفاقيات دعم بمدد استجابة/حل، وتحديثات أمان، ونسخ احتياطي، ومراقبة على مدار الساعة للأنظمة الحسّاسة.',
    displayOrder: 4,
    isActive: true,
  },
];

export const influencersFAQs = [
  {
    pagePath: '/influencers',
    questionEn: 'How do I join as an influencer?',
    questionAr: 'كيف أنضم كمؤثر؟',
    answerEn: 'Go to the influencers page and click Join as Influencer. Fill the form and our team will verify and contact you.',
    answerAr: 'اذهب إلى صفحة المؤثرين واضغط "انضم كمؤثر" ثم املأ النموذج وسيتواصل معك فريقنا بعد التحقق.',
    displayOrder: 0,
    isActive: true,
  },
  {
    pagePath: '/influencers',
    questionEn: 'Do you verify influencer accounts?',
    questionAr: 'هل تقومون بالتحقق من حسابات المؤثرين؟',
    answerEn: 'Yes. We verify identity and audience quality before featuring an influencer in campaigns.',
    answerAr: 'نعم، نتحقق من الهوية وجودة الجمهور قبل إدراج المؤثر في الحملات.',
    displayOrder: 1,
    isActive: true,
  },
  {
    pagePath: '/influencers',
    questionEn: 'How are campaign rates calculated and paid?',
    questionAr: 'كيف تُحتسب أسعار الحملات وكيف يتم الدفع؟',
    answerEn: 'Rates depend on platform, reach, engagement, and deliverables. We provide transparent pricing and issue payments securely after deliverables are approved.',
    answerAr: 'تختلف الأسعار حسب المنصّة والوصول والتفاعل والتسليمات. نوفّر تسعيراً شفافاً ويتم الدفع بأمان بعد اعتماد التسليمات.',
    displayOrder: 2,
    isActive: true,
  },
];

export const worksampleFAQs = [
  {
    pagePath: '/worksample',
    questionEn: 'What industries do you serve and can you share case studies?',
    questionAr: 'ما القطاعات التي نخدمها وهل توجد دراسات حالة؟',
    answerEn: 'We deliver for retail, F&B, healthcare, education, logistics, and startups. Case studies highlight KPIs like conversion rate, CLV, and app retention.',
    answerAr: 'نخدم قطاعات التجزئة والمطاعم والصحة والتعليم واللوجستيات والشركات الناشئة. دراسات الحالة تُبرز مؤشرات مثل معدل التحويل وقيمة العميل الدائمة واحتفاظ التطبيق.',
    displayOrder: 0,
    isActive: true,
  },
  {
    pagePath: '/worksample',
    questionEn: 'Can you work with our brand guidelines and design systems?',
    questionAr: 'هل يمكنكم الالتزام بدليل الهوية وأنظمة التصميم؟',
    answerEn: 'Yes. We adopt your brand tokens, typography, and components, or we can build a reusable design system from scratch.',
    answerAr: 'نعم. نلتزم بقيم الهوية الطباعية واللونية ومكوّناتكم، أو ننشئ نظام تصميم قابل لإعادة الاستخدام من الصفر.',
    displayOrder: 1,
    isActive: true,
  },
];

export const teamFAQs = [
  {
    pagePath: '/team',
    questionEn: 'Are you hiring now and do you accept remote applicants?',
    questionAr: 'هل لديكم توظيف حالي وهل تقبلون العمل عن بُعد؟',
    answerEn: 'Yes. Open roles are listed on the Team page. We support hybrid/remote arrangements for qualified candidates in KSA and MENA.',
    answerAr: 'نعم. تظهر الوظائف المتاحة في صفحة الفريق. ندعم العمل الهجين/عن بُعد للمرشحين المؤهلين داخل السعودية والمنطقة.',
    displayOrder: 0,
    isActive: true,
  },
  {
    pagePath: '/team',
    questionEn: 'Do you offer internships and training programs?',
    questionAr: 'هل توفرون برامج تدريبية وفرص تدريب تعاوني؟',
    answerEn: 'We run mentorship‑based internships in engineering, design, and marketing with real product exposure and certificates of completion.',
    answerAr: 'لدينا فرص تدريب بإشراف خبراء في الهندسة والتصميم والتسويق مع تطبيق عملي وشهادات إتمام.',
    displayOrder: 1,
    isActive: true,
  },
];

export const contactusFAQs = [
  {
    pagePath: '/contactus',
    questionEn: 'How fast will you respond and what is the next step?',
    questionAr: 'كم يستغرق الرد وما هي الخطوة التالية؟',
    answerEn: 'We reply within 24 hours (business days). You will receive a short discovery call invite and a checklist of what we need to prepare an estimate.',
    answerAr: 'نرد خلال 24 ساعة (أيام العمل). ستصلك دعوة لمكالمة تعريفية سريعة وقائمة بالمتطلبات اللازمة لتجهيز عرض السعر.',
    displayOrder: 0,
    isActive: true,
  },
  {
    pagePath: '/contactus',
    questionEn: 'Which communication channels do you support?',
    questionAr: 'ما قنوات التواصل المتاحة؟',
    answerEn: 'We support email, WhatsApp Business, Google Meet/Zoom, and on‑site meetings in Jeddah by appointment.',
    answerAr: 'ندعم البريد الإلكتروني وواتساب للأعمال وGoogle Meet/Zoom والاجتماعات الميدانية في جدة حسب الموعد.',
    displayOrder: 1,
    isActive: true,
  },
];

export const allFAQs = [
  ...homepageFAQs,
  ...servicesFAQs,
  ...influencersFAQs,
  ...worksampleFAQs,
  ...teamFAQs,
  ...contactusFAQs,
];


