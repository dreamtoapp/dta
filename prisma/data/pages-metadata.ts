/**
 * ========================================
 * 🤖 INSTRUCTIONS FOR AI ASSISTANTS
 * ========================================
 * 
 * When working with this file, you MUST act as a SENIOR SEO CONTENT WRITER with:
 * - 10+ years of experience in digital marketing
 * - Expertise in Saudi Arabian market and Arabic language
 * - Deep knowledge of Google SEO algorithms (2024)
 * - Background in tech company content strategy
 * 
 * YOUR ROLE:
 * 1. Write compelling, conversion-focused metadata
 * 2. Strictly follow all character limits (titles: 70, descriptions: 160)
 * 3. Integrate keywords naturally (NO keyword stuffing)
 * 4. Use active voice and powerful CTAs
 * 5. Maintain cultural sensitivity for Saudi/Arab audience
 * 6. Apply enterprise-level SEO best practices
 * 7. Benchmark against top companies (Aramco, STC, Amazon, Samsung)
 * 
 * WHEN CREATING/EDITING CONTENT:
 * ✅ DO: Read all field specifications below FIRST
 * ✅ DO: Count characters precisely (use tools if needed)
 * ✅ DO: Test readability on both desktop and mobile
 * ✅ DO: Include location keywords (Jeddah, Saudi Arabia, KSA)
 * ✅ DO: Add social proof (numbers, years, ratings) when available
 * ✅ DO: End descriptions with clear CTAs (Get quote, Book now, Apply today)
 * ✅ DO: Use compelling power words (Leading, Expert, Transform, Discover)
 * ✅ DO: Maintain brand voice (professional yet approachable)
 * ❌ DON'T: Exceed character limits (causes truncation in search results)
 * ❌ DON'T: Use generic or vague language
 * ❌ DON'T: Copy from competitors
 * ❌ DON'T: Ignore Arabic cultural nuances
 * 
 * QUALITY CHECKLIST (Before submitting any content):
 * □ Title ≤70 characters? (CRITICAL)
 * □ Description 150-160 characters? (OPTIMAL)
 * □ Primary keyword in first 100 chars?
 * □ CTA included at end?
 * □ Active voice used?
 * □ Location keywords present?
 * □ Unique content (not duplicated)?
 * □ Compelling and click-worthy?
 * □ Arabic content culturally appropriate?
 * □ Grammar and spelling perfect?
 * 
 * ========================================
 * PAGES METADATA CONFIGURATION
 * ========================================
 * 
 * This file contains SEO metadata for all pages in the DreamToApp website.
 * Each entry follows Google SEO best practices and Saudi Arabian market standards.
 * 
 * ========================================
 * FIELD SPECIFICATIONS & REQUIREMENTS
 * ========================================
 * 
 * 1. pagePath (string, required)
 *    - Unique URL path identifier (e.g., '/', '/services', '/contactus')
 *    - Must start with '/'
 *    - Used as primary key in database
 *    - Example: '/services'
 * 
 * 2. pageName (string, required)
 *    - Human-readable name for admin reference only
 *    - Not displayed to end users
 *    - Example: 'Services Page'
 * 
 * 3. titleEn (string, required, MAX: 70 characters)
 *    - English page title for <title> tag and search results
 *    - CRITICAL: Must be ≤70 characters (Google truncates longer titles)
 *    - Best practice: 50-60 characters for optimal display
 *    - Include primary keyword near the beginning
 *    - Format: "Primary Keyword - Secondary Keyword | Brand Name"
 *    - Example: "Web Development Services in Jeddah | DreamToApp"
 * 
 * 4. titleAr (string, required, MAX: 70 characters)
 *    - Arabic page title (same rules as titleEn)
 *    - Must maintain RTL (right-to-left) readability
 *    - Example: "خدمات تطوير المواقع في جدة | دريم تو آب"
 * 
 * 5. descriptionEn (string, required, MAX: 160 characters)
 *    - English meta description for search results snippet
 *    - CRITICAL: Must be ≤160 characters (Google truncates at ~155-160)
 *    - Optimal range: 150-160 characters for maximum visibility
 *    - Must include:
 *      a) Primary keyword naturally integrated
 *      b) Clear value proposition
 *      c) Call-to-action (CTA) at the end
 *      d) Location keywords when relevant (Jeddah, Saudi Arabia)
 *    - Use active voice and compelling language
 *    - Example: "Leading web development in Jeddah. Expert services in mobile apps, e-commerce & UI/UX. Get your free quote today!"
 * 
 * 6. descriptionAr (string, required, MAX: 160 characters)
 *    - Arabic meta description (same rules as descriptionEn)
 *    - Must be culturally appropriate for Saudi market
 *    - Example: "شركة رائدة في تطوير المواقع في جدة. خدمات احترافية في التطبيقات والتجارة الإلكترونية. احصل على عرض مجاني!"
 * 
 * 7. keywordsEn (string, optional)
 *    - Comma-separated English keywords
 *    - Not a direct ranking factor but helps with content strategy
 *    - Include: primary keywords, secondary keywords, long-tail keywords, location keywords
 *    - Example: "web development Jeddah, mobile apps Saudi Arabia, e-commerce solutions"
 * 
 * 8. keywordsAr (string, optional)
 *    - Comma-separated Arabic keywords (same purpose as keywordsEn)
 *    - Example: "تطوير مواقع جدة, تطبيقات جوال السعودية"
 * 
 * 9. ogTitleEn (string, optional, recommended MAX: 60 characters)
 *    - English OpenGraph title for social media sharing (Facebook, LinkedIn)
 *    - If empty, falls back to titleEn
 *    - Can be more marketing-focused than page title
 *    - Optimal: 40-60 characters
 *    - Example: "Transform Your Business with Expert Digital Solutions"
 * 
 * 10. ogTitleAr (string, optional, recommended MAX: 60 characters)
 *     - Arabic OpenGraph title (same rules as ogTitleEn)
 * 
 * 11. ogDescriptionEn (string, optional, recommended MAX: 200 characters)
 *     - English OpenGraph description for social media previews
 *     - If empty, falls back to descriptionEn
 *     - Can be longer than meta description (up to 200 chars)
 *     - More flexible, can include additional selling points
 *     - Example: "Partner with Jeddah's leading agency. 7+ years of excellence, 98% client satisfaction."
 * 
 * 12. ogDescriptionAr (string, optional, recommended MAX: 200 characters)
 *     - Arabic OpenGraph description (same rules as ogDescriptionEn)
 * 
 * 13. ogImage (string, optional, must be valid URL)
 *     - Full URL to OpenGraph image (shared on social media)
 *     - Recommended size: 1200x630 pixels
 *     - Must be accessible public URL (HTTPS)
 *     - If empty, uses default site image
 *     - Example: "https://www.dreamto.app/og-images/homepage.png"
 * 
 * 14. twitterTitleEn (string, optional, MAX: 70 characters)
 *     - English Twitter Card title
 *     - If empty, falls back to ogTitleEn or titleEn
 *     - Can include emojis for Twitter engagement
 *     - Example: "DreamToApp - Web Development Experts 🚀"
 * 
 * 15. twitterTitleAr (string, optional, MAX: 70 characters)
 *     - Arabic Twitter Card title (same rules as twitterTitleEn)
 * 
 * 16. twitterDescriptionEn (string, optional, MAX: 200 characters)
 *     - English Twitter Card description
 *     - If empty, falls back to ogDescriptionEn or descriptionEn
 *     - More casual tone allowed, emojis encouraged
 *     - Example: "Expert team ✓ | Modern tech ✓ | 24/7 support ✓. Start your project today!"
 * 
 * 17. twitterDescriptionAr (string, optional, MAX: 200 characters)
 *     - Arabic Twitter Card description (same rules as twitterDescriptionEn)
 * 
 * 18. category (string, optional)
 *     - Content category for admin organization
 *     - Example: "Software Development & Digital Transformation"
 * 
 * 19. author (string, optional, default: "DreamToApp Team")
 *     - Content author attribution
 *     - Example: "DreamToApp Expert Team"
 * 
 * 20. canonicalUrl (string, optional, must be valid URL)
 *     - Full canonical URL to prevent duplicate content issues
 *     - Must be absolute URL (https://...)
 *     - If empty, auto-generated from pagePath
 *     - Example: "https://www.dreamto.app/services"
 * 
 * 21. robotsIndex (boolean, required, default: true)
 *     - Allow search engines to index this page
 *     - Set to false for: thank you pages, internal admin pages, duplicate content
 *     - true = indexed in search results
 *     - false = hidden from search results
 * 
 * 22. robotsFollow (boolean, required, default: true)
 *     - Allow search engines to follow links on this page
 *     - Set to false for: low-quality pages, external affiliate links
 *     - true = crawlers follow links
 *     - false = crawlers ignore links
 * 
 * ========================================
 * DREAMTOAPP BRAND VOICE & TONE
 * ========================================
 * 
 * When writing content, embody DreamToApp's brand personality:
 * 
 * 🎯 BRAND ATTRIBUTES:
 * - Professional yet approachable (not corporate or cold)
 * - Innovative and forward-thinking (tech-savvy)
 * - Results-oriented (focus on outcomes and success)
 * - Trustworthy and reliable (7+ years experience)
 * - Saudi-proud (emphasize local expertise in Jeddah/KSA)
 * 
 * ✍️ WRITING STYLE:
 * - Use "we" and "our" (collaborative, partnership approach)
 * - Address audience as "you" (direct, conversational)
 * - Short, punchy sentences (easier to scan)
 * - Action-oriented verbs (Start, Transform, Launch, Build)
 * - Confident but not arrogant (we're the best, not the only)
 * 
 * 🗣️ VOICE EXAMPLES:
 * ✅ GOOD: "Transform your business with expert digital solutions"
 * ❌ BAD: "We provide various IT services and stuff"
 * ✅ GOOD: "Leading web development agency in Jeddah"
 * ❌ BAD: "One of the companies that do web development"
 * ✅ GOOD: "Get your free quote today!"
 * ❌ BAD: "Contact us if you want"
 * 
 * 🌍 CULTURAL CONSIDERATIONS (Saudi Market):
 * - Respect Islamic values (avoid haram/inappropriate content)
 * - Use formal Arabic (Modern Standard Arabic) for business content
 * - Gender-neutral language when possible
 * - Emphasize trust, reliability, and long-term partnership
 * - Include local references (Jeddah, Saudi Arabia, KSA)
 * - Show understanding of local business culture
 * 
 * 📱 MOBILE-FIRST MINDSET:
 * - 70%+ of Saudi users browse on mobile
 * - Keep sentences short for mobile readability
 * - Front-load important information
 * - Use emojis strategically (Twitter only, not meta descriptions)
 * 
 * ========================================
 * SEO BEST PRACTICES (MUST FOLLOW)
 * ========================================
 * 
 * ✅ DO:
 * - Keep titles under 70 characters
 * - Keep descriptions between 150-160 characters
 * - Include primary keyword in first 100 characters of description
 * - Use active voice and action verbs (Get, Start, Discover, Transform)
 * - Include clear CTA (Call-to-Action) at end of descriptions
 * - Add location keywords (Jeddah, Saudi Arabia, KSA)
 * - Use unique content for each page
 * - Include social proof when available (numbers, ratings, years)
 * - Test readability on mobile devices
 * 
 * ❌ DON'T:
 * - Exceed character limits (causes truncation)
 * - Keyword stuff (unnatural keyword repetition)
 * - Use duplicate descriptions across pages
 * - Write vague or generic descriptions
 * - Use ALL CAPS or excessive punctuation
 * - Include HTML tags or special characters
 * - Copy competitor descriptions
 * - Use passive voice excessively
 * 
 * ========================================
 * BENCHMARKED AGAINST
 * ========================================
 * - Google SEO Guidelines 2024
 * - Aramco (aramco.com) - Saudi enterprise standard
 * - STC (stc.com.sa) - Saudi telecom leader
 * - Amazon - E-commerce best practices
 * - Samsung - Tech company SEO standards
 * 
 * ========================================
 * VALIDATION RULES
 * ========================================
 * All entries are validated through:
 * - Zod schema in app/dashboard/metadata/components/MetadataForm.tsx
 * - Character count validation
 * - URL format validation for ogImage and canonicalUrl
 * - Required field enforcement
 * 
 * ========================================
 * HOW TO UPDATE
 * ========================================
 * 1. Edit this file directly for bulk updates
 * 2. OR use the admin dashboard at: /dashboard/metadata
 * 3. After changes, verify character counts
 * 4. Test on Google Search Console
 * 5. Monitor click-through rates (CTR)
 * 
 * ========================================
 * 📋 QUICK REFERENCE FOR AI (CHEAT SHEET)
 * ========================================
 * 
 * CRITICAL LIMITS:
 * - titleEn/titleAr: MAX 70 chars ⚠️
 * - descriptionEn/descriptionAr: MAX 160 chars (optimal: 150-160) ⚠️
 * - ogTitleEn/ogTitleAr: MAX 60 chars (recommended)
 * - ogDescriptionEn/ogDescriptionAr: MAX 200 chars
 * - twitterTitleEn/twitterTitleAr: MAX 70 chars
 * - twitterDescriptionEn/twitterDescriptionAr: MAX 200 chars
 * 
 * REQUIRED FIELDS (Cannot be empty):
 * ✓ pagePath, pageName
 * ✓ titleEn, titleAr
 * ✓ descriptionEn, descriptionAr
 * ✓ robotsIndex, robotsFollow
 * 
 * OPTIONAL FIELDS (Can be empty):
 * ○ keywords, og* fields, twitter* fields
 * ○ category, author, canonicalUrl
 * 
 * DESCRIPTION FORMULA:
 * [Primary Keyword/Service] in [Location]. [Value Proposition]. [Social Proof]. [Strong CTA]!
 * 
 * Example: "Leading web development in Jeddah. Expert services in mobile apps & e-commerce. 7+ years experience. Get free quote today!"
 *           ^^^^^^^^^^^^^^^^^^^^^^^^         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        ^^^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^^^^^^^^
 *           Keyword + Location               Value Proposition                             Social Proof        CTA
 * 
 * POWER WORDS TO USE:
 * - Leading, Expert, Top, #1, Premier, Professional
 * - Transform, Launch, Start, Discover, Build, Create
 * - Fast, Quick, Easy, Simple, Free, Proven
 * - 24/7, Today, Now, Within 24 hours, Guaranteed
 * 
 * CTA EXAMPLES:
 * - "Get your free quote today!"
 * - "Book your consultation now!"
 * - "Start your project today!"
 * - "Apply now!"
 * - "Contact us today!"
 * 
 * LOCATION KEYWORDS (Must include):
 * - Jeddah, Saudi Arabia, KSA
 * - Use in first 100 characters of description
 * 
 * WHEN TO SET robotsIndex = false:
 * - Thank you pages
 * - Confirmation pages
 * - Internal admin pages
 * - Duplicate content pages
 * - Login/private pages
 * 
 * AI FINAL CHECKLIST:
 * 1. [ ] Read AI Instructions section at top
 * 2. [ ] Counted all characters (use character counter tool)
 * 3. [ ] Titles ≤70 chars
 * 4. [ ] Descriptions 150-160 chars
 * 5. [ ] Keywords in first 100 chars
 * 6. [ ] CTA at end of description
 * 7. [ ] Location keywords included
 * 8. [ ] Active voice used
 * 9. [ ] Unique content (not duplicated)
 * 10. [ ] Brand voice maintained (professional yet approachable)
 * 11. [ ] Cultural sensitivity for Saudi market
 * 12. [ ] No grammar/spelling errors
 * 
 * ========================================
 * Last Updated: 2025-10-03
 * Maintained by: DreamToApp SEO Team
 * Total Documentation: 320+ lines
 * AI-Optimized: ✅ YES
 * ========================================
 */

export const pagesMetadata = [
  {
    pagePath: '/',
    pageName: 'Homepage',
    titleEn: 'DreamToApp - #1 Web & App Development Company in Jeddah | Saudi Arabia',
    titleAr: 'دريم تو آب - شركة تطوير المواقع والتطبيقات رقم 1 في جدة | السعودية',
    descriptionEn: 'Leading web & mobile development in Jeddah, Saudi Arabia. Expert services in web apps, mobile dev, e-commerce & UI/UX. Get your free quote today!',
    descriptionAr: 'شركة رائدة في تطوير المواقع والتطبيقات في جدة. خدمات احترافية في الويب والجوال والتجارة الإلكترونية. احصل على عرض سعر مجاني اليوم!',
    keywordsEn: 'web development Jeddah, mobile app development Saudi Arabia, software company Jeddah, website design Jeddah, digital transformation Saudi Arabia, best IT company Jeddah, e-commerce development Saudi Arabia, UI/UX design Jeddah',
    keywordsAr: 'تطوير مواقع جدة, تطبيقات جوال السعودية, شركة برمجة جدة, تصميم مواقع جدة, التحول الرقمي السعودية, أفضل شركة تقنية جدة, تطوير متاجر إلكترونية السعودية, تصميم واجهات المستخدم جدة',
    ogTitleEn: 'DreamToApp - Transform Your Business with Expert Digital Solutions',
    ogTitleAr: 'دريم تو آب - حول عملك مع حلول رقمية احترافية',
    ogDescriptionEn: 'Partner with Jeddah\'s leading web & mobile development agency. 7+ years of excellence, 98% client satisfaction. From startups to enterprises - we deliver results.',
    ogDescriptionAr: 'شريكك الأمثل في تطوير المواقع والتطبيقات في جدة. أكثر من 7 سنوات من التميز، 98% رضا العملاء. من الشركات الناشئة إلى المؤسسات - نحقق النتائج.',
    twitterTitleEn: 'DreamToApp - Web & App Development Experts in Jeddah 🚀',
    twitterTitleAr: 'دريم تو آب - خبراء تطوير المواقع والتطبيقات في جدة 🚀',
    twitterDescriptionEn: 'Transform your digital presence with Jeddah\'s top-rated development agency. Expert team | Modern tech stack | 24/7 support. Start your project today!',
    twitterDescriptionAr: 'حول حضورك الرقمي مع أفضل شركة تطوير في جدة. فريق خبير | تقنيات حديثة | دعم 24/7. ابدأ مشروعك اليوم!',
    category: 'Software Development & Digital Transformation',
    author: 'DreamToApp Expert Team',
    canonicalUrl: 'https://www.dreamto.app',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/services',
    pageName: 'Services',
    titleEn: 'Digital Services - Web, Mobile, E-commerce & Marketing in Jeddah',
    titleAr: 'الخدمات الرقمية - حلول الويب، التطبيقات والتجارة الإلكترونية في جدة',
    descriptionEn: 'Full-service digital agency in Jeddah. Web development, mobile apps (iOS/Android), e-commerce, UI/UX design & digital marketing. Book free consultation!',
    descriptionAr: 'وكالة رقمية متكاملة في جدة. تطوير مواقع، تطبيقات جوال (iOS/Android)، تجارة إلكترونية، UI/UX وتسويق رقمي. احجز استشارتك المجانية!',
    keywordsEn: 'web development services Jeddah, mobile app development Saudi Arabia, e-commerce solutions Jeddah, UI UX design services, digital marketing agency Jeddah, Next.js development, React Native apps Saudi Arabia, Shopify development Jeddah',
    keywordsAr: 'خدمات تطوير المواقع جدة, تطوير تطبيقات الجوال السعودية, حلول التجارة الإلكترونية جدة, خدمات تصميم واجهات المستخدم, وكالة تسويق رقمي جدة, تطوير Next.js, تطبيقات React Native السعودية, تطوير Shopify جدة',
    ogTitleEn: 'Complete Digital Services in Jeddah - Web, Mobile, Marketing & More',
    ogTitleAr: 'خدمات رقمية متكاملة في جدة - الويب، التطبيقات، التسويق والمزيد',
    ogDescriptionEn: 'Your one-stop solution for all digital needs in Saudi Arabia. From responsive websites to native mobile apps and powerful e-commerce platforms. Trusted by 100+ businesses in Jeddah.',
    ogDescriptionAr: 'حلك الشامل لجميع احتياجاتك الرقمية في السعودية. من المواقع المتجاوبة إلى تطبيقات الجوال ومنصات التجارة الإلكترونية القوية. موثوق من قبل +100 شركة في جدة.',
    twitterTitleEn: '6 Core Services That Transform Your Business | DreamToApp',
    twitterTitleAr: '6 خدمات أساسية تحول عملك | دريم تو آب',
    twitterDescriptionEn: 'Web Development • Mobile Apps • E-commerce • UI/UX • Branding • Marketing. All-in-one digital solutions for Saudi businesses. Let\'s build something amazing! 💡',
    twitterDescriptionAr: 'تطوير المواقع • تطبيقات الجوال • التجارة الإلكترونية • UI/UX • الهوية البصرية • التسويق. حلول رقمية شاملة للأعمال السعودية. لنبني شيئًا مذهلاً! 💡',
    category: 'Digital Services & Solutions',
    author: 'DreamToApp Services Team',
    canonicalUrl: 'https://www.dreamto.app/services',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/contactus',
    pageName: 'Contact Us',
    titleEn: 'Contact Us - Get Free Quote & Consultation | DreamToApp Jeddah',
    titleAr: 'تواصل معنا - احصل على استشارة وعرض سعر مجاني | دريم تو آب جدة',
    descriptionEn: 'Contact DreamToApp in Jeddah for expert consultation. Fast response, free quotes & 24/7 support. Start your digital transformation today!',
    descriptionAr: 'تواصل مع دريم تو آب في جدة للحصول على استشارة احترافية. استجابة سريعة، عروض مجانية ودعم 24/7. ابدأ التحول الرقمي اليوم!',
    keywordsEn: 'contact web development Jeddah, get quote app development Saudi Arabia, free consultation Jeddah, web agency contact, DreamToApp support, project inquiry Jeddah, IT consultation Saudi Arabia',
    keywordsAr: 'تواصل تطوير مواقع جدة, عرض سعر تطوير تطبيقات السعودية, استشارة مجانية جدة, اتصل بوكالة ويب, دعم دريم تو آب, استفسار مشروع جدة, استشارة تقنية السعودية',
    ogTitleEn: 'Get in Touch - Free Consultation & Custom Quote | DreamToApp',
    ogTitleAr: 'تواصل معنا - استشارة مجانية وعرض سعر مخصص | دريم تو آب',
    ogDescriptionEn: 'Connect with Jeddah\'s premier digital agency. Expert team ready to discuss your web, mobile, or e-commerce project. Free consultation available. Response within 24 hours guaranteed.',
    ogDescriptionAr: 'تواصل مع وكالة رقمية رائدة في جدة. فريق خبير جاهز لمناقشة مشروع الويب، التطبيق أو التجارة الإلكترونية. استشارة مجانية متاحة. الرد مضمون خلال 24 ساعة.',
    twitterTitleEn: 'Got a Project? Let\'s Talk! | Free Consultation in Jeddah 📞',
    twitterTitleAr: 'لديك مشروع؟ لنتحدث! | استشارة مجانية في جدة 📞',
    twitterDescriptionEn: 'Quick response ⚡ | Expert consultation 💡 | Free quotes 💰 | 24/7 support 🛟. Your digital transformation partner in Saudi Arabia. Contact us now!',
    twitterDescriptionAr: 'استجابة سريعة ⚡ | استشارة احترافية 💡 | عروض مجانية 💰 | دعم 24/7 🛟. شريكك في التحول الرقمي بالسعودية. تواصل معنا الآن!',
    category: 'Contact & Support',
    author: 'DreamToApp Customer Service',
    canonicalUrl: 'https://www.dreamto.app/contactus',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/privacy',
    pageName: 'Privacy Policy',
    titleEn: 'Privacy Policy - Data Protection & Security | DreamToApp',
    titleAr: 'سياسة الخصوصية - حماية البيانات والأمان | دريم تو آب',
    descriptionEn: 'DreamToApp Privacy Policy: How we protect your data. GDPR-compliant practices for collecting, using & securing your information in Saudi Arabia.',
    descriptionAr: 'سياسة الخصوصية لدريم تو آب: كيف نحمي بياناتك. ممارسات متوافقة مع GDPR لجمع واستخدام وتأمين معلوماتك في السعودية.',
    keywordsEn: 'privacy policy Saudi Arabia, data protection Jeddah, GDPR compliance, personal data security, privacy statement, information protection, confidentiality policy',
    keywordsAr: 'سياسة الخصوصية السعودية, حماية البيانات جدة, الامتثال لـ GDPR, أمان البيانات الشخصية, بيان الخصوصية, حماية المعلومات, سياسة السرية',
    ogTitleEn: 'Your Data, Your Privacy - Protected with Industry Standards',
    ogTitleAr: 'بياناتك، خصوصيتك - محمية بمعايير الصناعة',
    ogDescriptionEn: 'Transparent privacy practices at DreamToApp. We prioritize your data security with advanced encryption and compliance with international privacy standards.',
    ogDescriptionAr: 'ممارسات خصوصية شفافة في دريم تو آب. نعطي الأولوية لأمان بياناتك مع التشفير المتقدم والامتثال للمعايير الدولية للخصوصية.',
    twitterTitleEn: 'Privacy Policy - Transparent Data Protection Practices',
    twitterTitleAr: 'سياسة الخصوصية - ممارسات شفافة لحماية البيانات',
    twitterDescriptionEn: 'Your trust matters. Read how we protect your privacy with industry-leading security measures and full compliance with data protection regulations.',
    twitterDescriptionAr: 'ثقتك مهمة. اقرأ كيف نحمي خصوصيتك بإجراءات أمنية رائدة في الصناعة وامتثال كامل لقوانين حماية البيانات.',
    category: 'Legal & Compliance',
    author: 'DreamToApp Legal Team',
    canonicalUrl: 'https://www.dreamto.app/privacy',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/terms',
    pageName: 'Terms & Conditions',
    titleEn: 'Terms & Conditions - Service Agreement | DreamToApp',
    titleAr: 'الشروط والأحكام - اتفاقية الخدمة | دريم تو آب',
    descriptionEn: 'DreamToApp Terms & Conditions. Understand our service agreements, client rights, project delivery terms & legal framework for web and mobile services.',
    descriptionAr: 'الشروط والأحكام لدريم تو آب. افهم اتفاقيات خدماتنا، حقوق العملاء، شروط تسليم المشاريع والإطار القانوني لخدمات الويب والتطبيقات.',
    keywordsEn: 'terms of service, service agreement, client contract, legal terms, user agreement, service conditions Saudi Arabia, project terms',
    keywordsAr: 'شروط الخدمة, اتفاقية الخدمة, عقد العميل, الشروط القانونية, اتفاقية المستخدم, شروط الخدمة السعودية, شروط المشروع',
    ogTitleEn: 'Service Terms & Client Rights - Clear, Fair, Transparent',
    ogTitleAr: 'شروط الخدمة وحقوق العميل - واضحة، عادلة، شفافة',
    ogDescriptionEn: 'Review our comprehensive terms of service. Fair agreements, clear deliverables, and client-first policies that protect both parties in every project.',
    ogDescriptionAr: 'راجع شروط الخدمة الشاملة لدينا. اتفاقيات عادلة، نتائج واضحة، وسياسات تعطي الأولوية للعميل تحمي جميع الأطراف في كل مشروع.',
    twitterTitleEn: 'Terms & Conditions - Fair & Transparent Service Agreement',
    twitterTitleAr: 'الشروط والأحكام - اتفاقية خدمة عادلة وشفافة',
    twitterDescriptionEn: 'Clear terms, fair policies, and mutual respect. Read our service agreement to understand our commitment to delivering excellence in every project.',
    twitterDescriptionAr: 'شروط واضحة، سياسات عادلة، واحترام متبادل. اقرأ اتفاقية خدمتنا لفهم التزامنا بتقديم التميز في كل مشروع.',
    category: 'Legal & Compliance',
    author: 'DreamToApp Legal Team',
    canonicalUrl: 'https://www.dreamto.app/terms',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/start-your-dream',
    pageName: 'Start Your Dream',
    titleEn: 'Start Your Dream Project - Get Custom Quote in 24 Hours | DreamToApp',
    titleAr: 'ابدأ مشروع أحلامك - عرض سعر مخصص خلال 24 ساعة | دريم تو آب',
    descriptionEn: 'Launch your digital dream! Submit project details and get a custom quote within 24 hours. Expert guidance, transparent pricing & proven delivery in Jeddah.',
    descriptionAr: 'أطلق حلمك الرقمي! قدم تفاصيل مشروعك واحصل على عرض سعر مخصص خلال 24 ساعة. إرشاد احترافي، تسعير شفاف وتسليم مثبت في جدة.',
    keywordsEn: 'start project online, web development quote, mobile app estimate, project request form, free consultation, custom quote Jeddah, digital project Saudi Arabia',
    keywordsAr: 'بدء مشروع أونلاين, عرض سعر تطوير موقع, تقدير تطبيق جوال, نموذج طلب مشروع, استشارة مجانية, عرض سعر مخصص جدة, مشروع رقمي السعودية',
    ogTitleEn: 'Turn Your Vision Into Digital Reality - Free Project Consultation',
    ogTitleAr: 'حول رؤيتك إلى واقع رقمي - استشارة مشروع مجانية',
    ogDescriptionEn: 'From concept to launch, we guide you every step. Share your dream project and receive expert advice, timeline estimates, and competitive pricing. No commitment required.',
    ogDescriptionAr: 'من الفكرة إلى الإطلاق، نرشدك في كل خطوة. شارك مشروع أحلامك واحصل على مشورة احترافية، تقديرات زمنية، وأسعار تنافسية. لا التزام مطلوب.',
    twitterTitleEn: 'Got an Idea? We Turn Dreams Into Apps! 🚀💡',
    twitterTitleAr: 'لديك فكرة؟ نحول الأحلام إلى تطبيقات! 🚀💡',
    twitterDescriptionEn: 'Your journey starts here! Share your project vision → Get expert consultation → Receive custom quote → Launch your digital success. Quick turnaround guaranteed!',
    twitterDescriptionAr: 'رحلتك تبدأ هنا! شارك رؤية مشروعك ← احصل على استشارة احترافية ← استلم عرض سعر مخصص ← أطلق نجاحك الرقمي. تنفيذ سريع مضمون!',
    category: 'Project Inquiry & Quotes',
    author: 'DreamToApp Project Team',
    canonicalUrl: 'https://www.dreamto.app/start-your-dream',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/influencers',
    pageName: 'Influencers',
    titleEn: 'Top Influencers in Saudi Arabia | Instagram, TikTok & YouTube Stars',
    titleAr: 'أفضل المؤثرين في السعودية | نجوم إنستغرام وتيك توك ويوتيوب',
    descriptionEn: 'Connect with 500+ verified Saudi influencers on Instagram, TikTok, YouTube & Snapchat. Browse portfolios, check engagement rates & book campaigns directly.',
    descriptionAr: 'تواصل مع +500 مؤثر سعودي معتمد على إنستغرام وتيك توك ويوتيوب وسناب شات. تصفح المعارض، تحقق من التفاعل واحجز حملات مباشرة.',
    keywordsEn: 'Saudi influencers, Instagram influencers Saudi Arabia, TikTok influencers Jeddah, YouTube creators KSA, influencer marketing Saudi Arabia, brand collaborations, social media influencers Jeddah, verified influencers platform',
    keywordsAr: 'المؤثرين السعوديين, مؤثري إنستغرام السعودية, مؤثري تيك توك جدة, صناع محتوى يوتيوب السعودية, التسويق بالمؤثرين السعودية, تعاون العلامات التجارية, مؤثري وسائل التواصل جدة, منصة مؤثرين معتمدين',
    ogTitleEn: 'Saudi Arabia\'s Premier Influencer Marketplace - 500+ Verified Creators',
    ogTitleAr: 'سوق المؤثرين الأول في السعودية - +500 صانع محتوى معتمد',
    ogDescriptionEn: 'The largest influencer network in Saudi Arabia. Filter by platform, category, followers, and engagement. Direct booking, transparent pricing, verified profiles. Start your campaign today!',
    ogDescriptionAr: 'أكبر شبكة مؤثرين في السعودية. فلتر حسب المنصة، الفئة، المتابعين، والتفاعل. حجز مباشر، تسعير شفاف، ملفات معتمدة. ابدأ حملتك اليوم!',
    twitterTitleEn: '500+ Saudi Influencers Ready to Boost Your Brand 📈✨',
    twitterTitleAr: '+500 مؤثر سعودي جاهز لتعزيز علامتك التجارية 📈✨',
    twitterDescriptionEn: 'Find the perfect match for your brand! Browse verified influencers with detailed analytics. Instagram • TikTok • YouTube • Snapchat. Book campaigns in minutes!',
    twitterDescriptionAr: 'ابحث عن المؤثر المثالي لعلامتك! تصفح المؤثرين المعتمدين مع تحليلات تفصيلية. إنستغرام • تيك توك • يوتيوب • سناب شات. احجز حملات في دقائق!',
    category: 'Influencer Marketing Platform',
    author: 'DreamToApp Influencer Team',
    canonicalUrl: 'https://www.dreamto.app/influencers',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/influencers/register',
    pageName: 'Influencer Registration',
    titleEn: 'Join as Influencer - Monetize Your Social Media | DreamToApp',
    titleAr: 'انضم كمؤثر - استثمر حساباتك الاجتماعية | دريم تو آب',
    descriptionEn: 'Influencer with 5K+ followers? Join Saudi Arabia\'s top platform. Get brand collaborations, fair compensation & professional support. Sign up free today!',
    descriptionAr: 'مؤثر لديك +5 آلاف متابع؟ انضم لمنصة المؤثرين الأولى بالسعودية. احصل على تعاون مع العلامات، تعويض عادل ودعم احترافي. سجل مجانًا!',
    keywordsEn: 'become influencer Saudi Arabia, influencer registration, monetize Instagram, join influencer platform, brand partnerships Saudi Arabia, influencer opportunities Jeddah',
    keywordsAr: 'كن مؤثر السعودية, تسجيل مؤثر, استثمار إنستغرام, انضم لمنصة مؤثرين, شراكات العلامات السعودية, فرص المؤثرين جدة',
    ogTitleEn: 'Influencer Registration - Join 500+ Creators Earning with Brands',
    ogTitleAr: 'تسجيل المؤثرين - انضم لـ +500 صانع محتوى يربحون مع العلامات',
    ogDescriptionEn: 'Turn your followers into income! Register your profile, showcase your work, set your rates, and get matched with premium brands in Saudi Arabia. Free to join, easy to earn.',
    ogDescriptionAr: 'حول متابعيك إلى دخل! سجل ملفك، اعرض أعمالك، حدد أسعارك، واحصل على مطابقة مع علامات تجارية ممتازة في السعودية. التسجيل مجاني، الربح سهل.',
    twitterTitleEn: 'Influencers: Get Paid for Your Influence! Join Now 💰',
    twitterTitleAr: 'المؤثرون: احصل على دخل من تأثيرك! سجل الآن 💰',
    twitterDescriptionEn: 'Free registration • Direct brand deals • Fair pricing • Professional contracts • Monthly payments. Join the leading influencer network in Saudi Arabia! 🚀',
    twitterDescriptionAr: 'تسجيل مجاني • صفقات مباشرة مع العلامات • تسعير عادل • عقود احترافية • دفعات شهرية. انضم لشبكة المؤثرين الرائدة في السعودية! 🚀',
    category: 'Influencer Platform Registration',
    author: 'DreamToApp Influencer Onboarding',
    canonicalUrl: 'https://www.dreamto.app/influencers/register',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/influencers/contract',
    pageName: 'Influencer Contract',
    titleEn: 'Influencer Partnership Agreement - Fair Terms | DreamToApp',
    titleAr: 'اتفاقية شراكة المؤثرين - شروط عادلة | دريم تو آب',
    descriptionEn: 'Review our influencer partnership agreement. Fair compensation, clear deliverables, IP protection & transparent terms. Designed to protect influencers & brands.',
    descriptionAr: 'راجع اتفاقية شراكة المؤثرين. تعويض عادل، نتائج واضحة، حماية الملكية الفكرية وشروط شفافة. مصممة لحماية المؤثرين والعلامات.',
    keywordsEn: 'influencer contract, partnership agreement, influencer terms, brand collaboration agreement, influencer legal protection, fair influencer contract Saudi Arabia',
    keywordsAr: 'عقد المؤثر, اتفاقية شراكة, شروط المؤثر, اتفاقية تعاون العلامة, الحماية القانونية للمؤثر, عقد مؤثر عادل السعودية',
    ogTitleEn: 'Influencer Contract - Transparent Terms That Protect You',
    ogTitleAr: 'عقد المؤثر - شروط شفافة تحميك',
    ogDescriptionEn: 'Our influencer contract puts you first. Clear payment terms, campaign guidelines, content rights, and dispute resolution. Read the full agreement before signing up.',
    ogDescriptionAr: 'عقد المؤثر لدينا يعطيك الأولوية. شروط دفع واضحة، إرشادات الحملة، حقوق المحتوى، وحل النزاعات. اقرأ الاتفاقية الكاملة قبل التسجيل.',
    twitterTitleEn: 'Influencer Contract - Fair, Clear, and Protective',
    twitterTitleAr: 'عقد المؤثر - عادل، واضح، وحامي',
    twitterDescriptionEn: 'Know your rights! Our influencer agreement ensures fair compensation, clear expectations, and legal protection for all creators on our platform.',
    twitterDescriptionAr: 'اعرف حقوقك! اتفاقية المؤثرين لدينا تضمن تعويضًا عادلاً، توقعات واضحة، وحماية قانونية لجميع صناع المحتوى على منصتنا.',
    category: 'Legal Agreement',
    author: 'DreamToApp Legal Team',
    canonicalUrl: 'https://www.dreamto.app/influencers/contract',
    robotsIndex: true,
    robotsFollow: false,
  },
  {
    pagePath: '/worksample',
    pageName: 'Work Samples',
    titleEn: 'Portfolio - 100+ Successful Projects | Web & Mobile Apps in KSA',
    titleAr: 'معرض الأعمال - +100 مشروع ناجح | مواقع وتطبيقات في السعودية',
    descriptionEn: 'Explore 100+ successful projects in Saudi Arabia. Real websites, mobile apps & e-commerce platforms built for leading brands. See the quality before you hire!',
    descriptionAr: 'استكشف +100 مشروع ناجح في السعودية. مواقع حقيقية، تطبيقات جوال ومنصات تجارة إلكترونية بنيناها لعلامات رائدة. شاهد الجودة قبل التوظيف!',
    keywordsEn: 'web development portfolio Jeddah, mobile app portfolio Saudi Arabia, case studies, project showcase, successful websites Saudi Arabia, app development examples, client projects Jeddah, e-commerce portfolio',
    keywordsAr: 'معرض تطوير مواقع جدة, معرض تطبيقات جوال السعودية, دراسات الحالة, عرض المشاريع, مواقع ناجحة السعودية, أمثلة تطوير التطبيقات, مشاريع العملاء جدة, معرض التجارة الإلكترونية',
    ogTitleEn: 'Real Projects, Real Results - See What We\'ve Built',
    ogTitleAr: 'مشاريع حقيقية، نتائج حقيقية - شاهد ما بنيناه',
    ogDescriptionEn: 'From e-commerce giants to sleek mobile apps - browse our portfolio of award-winning projects. Each one a testament to innovation, quality, and client success in Saudi Arabia.',
    ogDescriptionAr: 'من عمالقة التجارة الإلكترونية إلى تطبيقات الجوال الأنيقة - تصفح معرض مشاريعنا الحائزة على جوائز. كل واحد شهادة على الابتكار والجودة ونجاح العميل في السعودية.',
    twitterTitleEn: 'Portfolio That Speaks Louder Than Words 📱💼',
    twitterTitleAr: 'معرض أعمال يتحدث أعلى من الكلمات 📱💼',
    twitterDescriptionEn: 'Pictures worth 1000 words! Browse 100+ live projects: Corporate sites • E-commerce stores • Mobile apps • Dashboards. Proof of our excellence in Jeddah. 🚀',
    twitterDescriptionAr: 'صور تساوي 1000 كلمة! تصفح +100 مشروع حي: مواقع شركات • متاجر إلكترونية • تطبيقات جوال • لوحات تحكم. دليل تميزنا في جدة. 🚀',
    category: 'Portfolio & Showcase',
    author: 'DreamToApp Portfolio Team',
    canonicalUrl: 'https://www.dreamto.app/worksample',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/team',
    pageName: 'Our Team',
    titleEn: 'Our Team - Expert Developers, Designers & Marketers in Jeddah',
    titleAr: 'فريقنا - مطورون ومصممون ومسوقون خبراء في جدة',
    descriptionEn: 'Meet the talented professionals behind DreamToApp. Experienced developers, creative designers & strategic marketers delivering excellence in Jeddah, KSA.',
    descriptionAr: 'تعرف على المحترفين وراء دريم تو آب. مطورون ذوو خبرة، مصممون مبدعون ومسوقون استراتيجيون يقدمون التميز في جدة، السعودية.',
    keywordsEn: 'development team Jeddah, expert developers Saudi Arabia, UI UX designers Jeddah, digital marketing team, tech team Saudi Arabia, about our team',
    keywordsAr: 'فريق التطوير جدة, مطورون خبراء السعودية, مصممي واجهات جدة, فريق التسويق الرقمي, فريق تقني السعودية, عن فريقنا',
    ogTitleEn: 'The Minds Behind DreamToApp - Passion Meets Expertise',
    ogTitleAr: 'العقول وراء دريم تو آب - الشغف يلتقي الخبرة',
    ogDescriptionEn: 'A diverse team of 15+ specialists combining technical excellence with creative innovation. From senior developers to award-winning designers - we\'re your success partners.',
    ogDescriptionAr: 'فريق متنوع من +15 متخصص يجمع بين التميز التقني والابتكار الإبداعي. من المطورين المحترفين إلى المصممين الحائزين على جوائز - نحن شركاء نجاحك.',
    twitterTitleEn: 'Meet the Dream Team Behind Your Digital Success 🌟',
    twitterTitleAr: 'تعرف على فريق الأحلام وراء نجاحك الرقمي 🌟',
    twitterDescriptionEn: 'Passionate developers 💻 • Creative designers 🎨 • Strategic marketers 📊. A collaborative team dedicated to turning your vision into reality. We\'re hiring! Apply now.',
    twitterDescriptionAr: 'مطورون شغوفون 💻 • مصممون مبدعون 🎨 • مسوقون استراتيجيون 📊. فريق تعاوني مكرس لتحويل رؤيتك إلى واقع. نحن نوظف! تقدم الآن.',
    category: 'About & Culture',
    author: 'DreamToApp HR Team',
    canonicalUrl: 'https://www.dreamto.app/team',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/team/apply',
    pageName: 'Join Our Team',
    titleEn: 'Careers - Join DreamToApp | Developer, Designer & Marketing Jobs',
    titleAr: 'الوظائف - انضم لدريم تو آب | وظائف مطورين ومصممين ومسوقين',
    descriptionEn: 'Join Jeddah\'s fastest-growing tech team! Hiring developers, designers & marketers. Competitive salary, growth opportunities & innovative projects. Apply now!',
    descriptionAr: 'انضم لأسرع فريق تقني نموًا في جدة! نوظف مطورين ومصممين ومسوقين. راتب تنافسي، فرص نمو ومشاريع مبتكرة. تقدم الآن!',
    keywordsEn: 'developer jobs Jeddah, web developer careers Saudi Arabia, UI UX designer jobs Jeddah, digital marketing jobs Saudi Arabia, IT jobs Jeddah, tech careers Saudi Arabia, apply developer position',
    keywordsAr: 'وظائف مطورين جدة, وظائف مطور ويب السعودية, وظائف مصمم واجهات جدة, وظائف تسويق رقمي السعودية, وظائف تقنية جدة, وظائف تكنولوجيا السعودية, تقدم لوظيفة مطور',
    ogTitleEn: 'Join DreamToApp - Build Your Career with the Best Team in Jeddah',
    ogTitleAr: 'انضم لدريم تو آب - ابنِ مسيرتك المهنية مع أفضل فريق في جدة',
    ogDescriptionEn: 'We\'re growing! Open positions for talented developers, creative designers, and strategic marketers. Work on exciting projects, learn cutting-edge tech, and grow your career.',
    ogDescriptionAr: 'نحن ننمو! مناصب مفتوحة للمطورين الموهوبين، المصممين المبدعين، والمسوقين الاستراتيجيين. اعمل على مشاريع مثيرة، تعلم أحدث التقنيات، وطور مسيرتك المهنية.',
    twitterTitleEn: 'We\'re Hiring! Join Jeddah\'s Top Tech Team 🚀💼',
    twitterTitleAr: 'نحن نوظف! انضم لأفضل فريق تقني في جدة 🚀💼',
    twitterDescriptionEn: 'Dream job alert! 💡 Work on cutting-edge projects | Competitive packages | Professional growth | Amazing team culture. Developers, designers & marketers - apply today!',
    twitterDescriptionAr: 'تنبيه وظيفة الأحلام! 💡 اعمل على مشاريع متطورة | رواتب تنافسية | نمو مهني | ثقافة فريق مذهلة. مطورون، مصممون ومسوقون - تقدم اليوم!',
    category: 'Careers & Recruitment',
    author: 'DreamToApp HR Team',
    canonicalUrl: 'https://www.dreamto.app/team/apply',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/team/job-roles',
    pageName: 'Job Roles',
    titleEn: 'Job Roles - Developer, Designer & Marketing Positions | DreamToApp',
    titleAr: 'الوظائف المتاحة - مطور ومصمم ومناصب تسويق | دريم تو آب',
    descriptionEn: 'Open positions at DreamToApp Jeddah. Full-stack developers, React specialists, UI/UX designers & digital marketers wanted. See full job descriptions.',
    descriptionAr: 'المناصب المفتوحة في دريم تو آب جدة. مطورون متكاملون، متخصصو React، مصممو UI/UX ومسوقون رقميون. شاهد الأوصاف الوظيفية الكاملة.',
    keywordsEn: 'job descriptions, open positions, developer roles, designer positions, marketing jobs, job requirements Jeddah, tech job openings Saudi Arabia',
    keywordsAr: 'الأوصاف الوظيفية, المناصب المفتوحة, أدوار المطورين, مناصب المصممين, وظائف التسويق, متطلبات الوظائف جدة, فرص عمل تقنية السعودية',
    ogTitleEn: 'Available Positions - Find Your Role at DreamToApp',
    ogTitleAr: 'المناصب المتاحة - ابحث عن دورك في دريم تو آب',
    ogDescriptionEn: 'Current openings: Senior React Developer, UI/UX Designer, Digital Marketing Specialist, and more. Competitive salary, benefits, and growth opportunities in Jeddah.',
    ogDescriptionAr: 'الوظائف الحالية: مطور React محترف، مصمم UI/UX، أخصائي تسويق رقمي، والمزيد. راتب تنافسي، مزايا، وفرص نمو في جدة.',
    twitterTitleEn: 'Open Positions - Your Next Career Move Starts Here 📋',
    twitterTitleAr: 'وظائف متاحة - خطوتك المهنية القادمة تبدأ هنا 📋',
    twitterDescriptionEn: 'Browse all open roles and their requirements. Full job specs | Salary ranges | Benefits package | Application process. Find your perfect fit at DreamToApp!',
    twitterDescriptionAr: 'تصفح جميع الأدوار المفتوحة ومتطلباتها. مواصفات وظيفية كاملة | نطاقات الرواتب | حزمة المزايا | عملية التقديم. ابحث عن المناسب لك في دريم تو آب!',
    category: 'Job Listings & Requirements',
    author: 'DreamToApp Recruitment',
    canonicalUrl: 'https://www.dreamto.app/team/job-roles',
    robotsIndex: true,
    robotsFollow: true,
  },
  {
    pagePath: '/team/thank-you',
    pageName: 'Application Thank You',
    titleEn: 'Application Received - Thank You for Applying | DreamToApp',
    titleAr: 'تم استلام الطلب - شكراً على التقديم | دريم تو آب',
    descriptionEn: 'Thank you for applying to DreamToApp! Application received successfully. Our HR team will review and contact you within 7 business days.',
    descriptionAr: 'شكراً على التقديم لدريم تو آب! تم استلام طلبك بنجاح. سيراجعه فريق الموارد البشرية ويتواصل معك خلال 7 أيام عمل.',
    keywordsEn: 'application received, job application confirmation, career application thank you',
    keywordsAr: 'تم استلام الطلب, تأكيد طلب الوظيفة, شكر طلب وظيفة',
    ogTitleEn: 'Application Received - We\'ll Be In Touch Soon!',
    ogTitleAr: 'تم استلام الطلب - سنتواصل معك قريبًا!',
    ogDescriptionEn: 'Your journey with DreamToApp starts here. We\'ve received your application and our team is excited to review your qualifications. Expect to hear from us soon!',
    ogDescriptionAr: 'رحلتك مع دريم تو آب تبدأ هنا. لقد استلمنا طلبك وفريقنا متحمس لمراجعة مؤهلاتك. توقع أن تسمع منا قريبًا!',
    twitterTitleEn: 'Application Submitted Successfully ✅',
    twitterTitleAr: 'تم تقديم الطلب بنجاح ✅',
    twitterDescriptionEn: 'Thanks for your interest! We\'ll review your application carefully. Check your email for next steps. Good luck! 🤞',
    twitterDescriptionAr: 'شكرًا لاهتمامك! سنراجع طلبك بعناية. تحقق من بريدك الإلكتروني للخطوات التالية. حظًا موفقًا! 🤞',
    category: 'Application Confirmation',
    author: 'DreamToApp HR',
    canonicalUrl: 'https://www.dreamto.app/team/thank-you',
    robotsIndex: false,
    robotsFollow: false,
  },
  {
    pagePath: '/thank-you',
    pageName: 'Thank You',
    titleEn: 'Thank You - Message Received | We\'ll Contact You Soon',
    titleAr: 'شكراً لك - تم استلام رسالتك | سنتواصل معك قريبًا',
    descriptionEn: 'Thank you for contacting DreamToApp! Message received and we\'ll respond within 24 hours. Our team is excited to discuss your project.',
    descriptionAr: 'شكراً على التواصل مع دريم تو آب! لقد استلمنا رسالتك وسنرد خلال 24 ساعة. فريقنا متحمس لمناقشة مشروعك.',
    keywordsEn: 'message received, contact confirmation, inquiry received, thank you page',
    keywordsAr: 'تم استلام الرسالة, تأكيد التواصل, تم استلام الاستفسار, صفحة شكر',
    ogTitleEn: 'Message Received - Your Project Journey Begins!',
    ogTitleAr: 'تم استلام الرسالة - رحلة مشروعك تبدأ!',
    ogDescriptionEn: 'We\'ve got your message! Our expert team will review your project details and get back to you with a detailed proposal within 24 hours. Exciting times ahead!',
    ogDescriptionAr: 'لقد وصلتنا رسالتك! سيراجع فريقنا الخبير تفاصيل مشروعك ويعود إليك بعرض مفصل خلال 24 ساعة. أوقات مثيرة قادمة!',
    twitterTitleEn: 'Message Received! Expect Our Reply Soon 📧✅',
    twitterTitleAr: 'تم استلام الرسالة! توقع ردنا قريبًا 📧✅',
    twitterDescriptionEn: 'Thanks for reaching out! We\'ll review your inquiry and respond within 24 hours. Check your email inbox. Let\'s make your digital dream come true! 🚀',
    twitterDescriptionAr: 'شكرًا على التواصل! سنراجع استفسارك ونرد خلال 24 ساعة. تحقق من بريدك الإلكتروني. لنحقق حلمك الرقمي! 🚀',
    category: 'Contact Confirmation',
    author: 'DreamToApp Customer Service',
    canonicalUrl: 'https://www.dreamto.app/thank-you',
    robotsIndex: false,
    robotsFollow: false,
  },
];
