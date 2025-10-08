import { BlogStatus } from '@prisma/client';

export const getBlogCategories = () => [
  {
    nameEn: 'Web Development',
    nameAr: 'تطوير الويب',
    slugEn: 'web-development',
    slugAr: 'تطوير-الويب',
    descriptionEn: 'Latest insights on web development technologies and best practices',
    descriptionAr: 'أحدث الرؤى حول تقنيات تطوير الويب وأفضل الممارسات',
    displayOrder: 1,
    isActive: true,
  },
  {
    nameEn: 'Mobile Development',
    nameAr: 'تطوير تطبيقات الجوال',
    slugEn: 'mobile-development',
    slugAr: 'تطوير-تطبيقات-الجوال',
    descriptionEn: 'Mobile app development tips, frameworks, and tutorials',
    descriptionAr: 'نصائح تطوير تطبيقات الجوال والأطر والدروس',
    displayOrder: 2,
    isActive: true,
  },
  {
    nameEn: 'Digital Marketing',
    nameAr: 'التسويق الرقمي',
    slugEn: 'digital-marketing',
    slugAr: 'التسويق-الرقمي',
    descriptionEn: 'Digital marketing strategies and campaigns',
    descriptionAr: 'استراتيجيات وحملات التسويق الرقمي',
    displayOrder: 3,
    isActive: true,
  },
  {
    nameEn: 'Tech Trends',
    nameAr: 'الاتجاهات التقنية',
    slugEn: 'tech-trends',
    slugAr: 'الاتجاهات-التقنية',
    descriptionEn: 'Latest technology trends and innovations',
    descriptionAr: 'أحدث الاتجاهات والابتكارات التقنية',
    displayOrder: 4,
    isActive: true,
  },
];

export const getBlogPosts = (categoryIds: string[], defaultOg: string) => [
  {
    titleEn: 'Getting Started with Next.js 15: A Complete Guide',
    titleAr: 'البدء مع Next.js 15: دليل شامل',
    slugEn: 'nextjs-15-complete-guide',
    slugAr: 'دليل-nextjs-15-الشامل',
    excerptEn: 'Learn how to build modern web applications with Next.js 15, featuring the latest App Router, Server Components, and more.',
    excerptAr: 'تعلم كيفية بناء تطبيقات ويب حديثة باستخدام Next.js 15، مع أحدث App Router ومكونات الخادم والمزيد.',
    contentEn: `# Introduction to Next.js 15

Next.js 15 introduces groundbreaking features that make building web applications faster and more efficient than ever before.

## Key Features

### 1. App Router
The new App Router brings improved performance and better developer experience. It leverages React Server Components by default.

### 2. Server Components
Server Components allow you to render components on the server, reducing bundle size and improving load times.

### 3. Improved Performance
Next.js 15 includes automatic optimizations for images, fonts, and third-party scripts.

## Getting Started

To create a new Next.js 15 project:

1. Run npx create-next-app@latest
2. Choose your preferences
3. Start building

## Conclusion

Next.js 15 is a powerful framework that combines the best of server-side and client-side rendering.`,
    contentAr: `# مقدمة إلى Next.js 15

يقدم Next.js 15 ميزات رائدة تجعل بناء تطبيقات الويب أسرع وأكثر كفاءة من أي وقت مضى.

## الميزات الرئيسية

### 1. App Router
يجلب App Router الجديد أداءً محسّنًا وتجربة أفضل للمطورين. يستفيد من مكونات خادم React افتراضيًا.

### 2. مكونات الخادم
تسمح لك مكونات الخادم بعرض المكونات على الخادم، مما يقلل من حجم الحزمة ويحسن أوقات التحميل.

### 3. تحسين الأداء
يتضمن Next.js 15 تحسينات تلقائية للصور والخطوط والبرامج النصية من جهات خارجية.

## البدء

لإنشاء مشروع Next.js 15 جديد:

1. قم بتشغيل npx create-next-app@latest
2. اختر تفضيلاتك
3. ابدأ البناء

## الخلاصة

Next.js 15 هو إطار عمل قوي يجمع بين أفضل ما في العرض من جانب الخادم والعميل.`,
    metaTitleEn: 'Next.js 15 Complete Guide - Learn Modern Web Development',
    metaTitleAr: 'دليل Next.js 15 الشامل - تعلم تطوير الويب الحديث',
    metaDescriptionEn: 'Complete guide to Next.js 15 with App Router, Server Components, and performance optimizations for building modern web apps.',
    metaDescriptionAr: 'دليل شامل لـ Next.js 15 مع App Router ومكونات الخادم وتحسينات الأداء لبناء تطبيقات ويب حديثة.',
    featuredImage: defaultOg,
    imageAlt: 'DreamToApp Open Graph Image',
    categoryId: categoryIds[0],
    tags: ['nextjs', 'react', 'web-development', 'javascript', 'typescript'],
    author: 'DreamToApp Team',
    status: BlogStatus.PUBLISHED,
    publishedAt: new Date('2024-10-01'),
    readingTime: 8,
    views: 1245,
    relatedPostIds: [],
  },
  {
    titleEn: 'Flutter vs React Native: Which is Best for Your Mobile App?',
    titleAr: 'Flutter مقابل React Native: أيهما الأفضل لتطبيقك للجوال؟',
    slugEn: 'flutter-vs-react-native-comparison',
    slugAr: 'مقارنة-flutter-react-native',
    excerptEn: 'An in-depth comparison of Flutter and React Native to help you choose the right framework for your next mobile app project.',
    excerptAr: 'مقارنة متعمقة بين Flutter و React Native لمساعدتك في اختيار الإطار المناسب لمشروع تطبيق الجوال القادم.',
    contentEn: `# Flutter vs React Native

Choosing the right framework for mobile development is crucial for your project's success.

## Performance

### Flutter
- Compiles to native code
- Consistent 60fps performance
- Smaller app size

### React Native
- JavaScript bridge
- Good performance
- Larger community

## Developer Experience

Both frameworks offer excellent developer experience with hot reload and strong tooling.

## Conclusion

Choose Flutter for complex animations and custom UI. Choose React Native if you have existing React expertise.`,
    contentAr: `# Flutter مقابل React Native

اختيار الإطار المناسب لتطوير تطبيقات الجوال أمر بالغ الأهمية لنجاح مشروعك.

## الأداء

### Flutter
- يتم تجميعه إلى كود أصلي
- أداء ثابت 60 إطارًا في الثانية
- حجم تطبيق أصغر

### React Native
- جسر JavaScript
- أداء جيد
- مجتمع أكبر

## تجربة المطور

يقدم كلا الإطارين تجربة ممتازة للمطورين مع إعادة التحميل السريع والأدوات القوية.

## الخلاصة

اختر Flutter للرسوم المتحركة المعقدة وواجهة المستخدم المخصصة. اختر React Native إذا كانت لديك خبرة React موجودة.`,
    metaTitleEn: 'Flutter vs React Native: Complete Comparison Guide 2024',
    metaTitleAr: 'Flutter مقابل React Native: دليل المقارنة الشامل 2024',
    metaDescriptionEn: 'In-depth comparison of Flutter and React Native frameworks to help you choose the best option for your mobile app development project.',
    metaDescriptionAr: 'مقارنة متعمقة بين إطاري Flutter و React Native لمساعدتك في اختيار الخيار الأفضل لمشروع تطوير تطبيق الجوال الخاص بك.',
    featuredImage: defaultOg,
    imageAlt: 'DreamToApp Open Graph Image',
    categoryId: categoryIds[1],
    tags: ['flutter', 'react-native', 'mobile-development', 'comparison'],
    author: 'DreamToApp Team',
    status: BlogStatus.PUBLISHED,
    publishedAt: new Date('2024-09-15'),
    readingTime: 6,
    views: 892,
    relatedPostIds: [],
  },
  {
    titleEn: 'SEO Best Practices for Modern Websites in 2024',
    titleAr: 'أفضل ممارسات SEO للمواقع الحديثة في 2024',
    slugEn: 'seo-best-practices-2024',
    slugAr: 'أفضل-ممارسات-seo-2024',
    excerptEn: 'Essential SEO strategies to improve your website ranking and organic traffic in 2024.',
    excerptAr: 'استراتيجيات SEO الأساسية لتحسين ترتيب موقعك وحركة المرور العضوية في 2024.',
    contentEn: `# SEO Best Practices 2024

Search Engine Optimization is constantly evolving. Here are the key strategies for 2024.

## Core Web Vitals

- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## Content Quality

Focus on creating valuable, user-focused content that answers search intent.

## Technical SEO

- Mobile-first indexing
- Structured data
- XML sitemaps
- Fast page speed

## Conclusion

Implementing these SEO best practices will help improve your organic visibility.`,
    contentAr: `# أفضل ممارسات SEO 2024

تحسين محركات البحث يتطور باستمرار. إليك الاستراتيجيات الرئيسية لعام 2024.

## Core Web Vitals

- أكبر رسم محتوى (LCP)
- تأخير الإدخال الأول (FID)
- تحول التخطيط التراكمي (CLS)

## جودة المحتوى

ركز على إنشاء محتوى قيم يركز على المستخدم يجيب على نية البحث.

## SEO التقني

- الفهرسة للجوال أولاً
- البيانات المنظمة
- خرائط مواقع XML
- سرعة صفحة سريعة

## الخلاصة

تنفيذ أفضل ممارسات SEO هذه سيساعد في تحسين ظهورك العضوي.`,
    metaTitleEn: 'SEO Best Practices 2024: Complete Guide to Website Optimization',
    metaTitleAr: 'أفضل ممارسات SEO 2024: دليل شامل لتحسين المواقع',
    metaDescriptionEn: 'Learn essential SEO strategies for 2024 including Core Web Vitals, technical SEO, and content optimization to boost your organic rankings.',
    metaDescriptionAr: 'تعلم استراتيجيات SEO الأساسية لعام 2024 بما في ذلك Core Web Vitals و SEO التقني وتحسين المحتوى لتعزيز ترتيبك العضوي.',
    featuredImage: defaultOg,
    imageAlt: 'DreamToApp Open Graph Image',
    categoryId: categoryIds[2],
    tags: ['seo', 'digital-marketing', 'web-development', 'google'],
    author: 'DreamToApp Team',
    status: BlogStatus.PUBLISHED,
    publishedAt: new Date('2024-09-28'),
    readingTime: 7,
    views: 1567,
    relatedPostIds: [],
  },
];
