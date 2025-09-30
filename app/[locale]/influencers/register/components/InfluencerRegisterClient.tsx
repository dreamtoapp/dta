"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, TrendingUp, Users } from "lucide-react"
import InfluencerRegistrationForm from "./InfluencerRegistrationForm"
import ViewContractDialog from "./ViewContractDialog"

interface InfluencerRegisterClientProps {
  locale: string
}

const InfluencerRegisterClient: React.FC<InfluencerRegisterClientProps> = ({ locale }) => {
  const isArabic = locale === 'ar'

  // Introduction text
  const introText = isArabic
    ? "هل أنت مؤثر وتبحث عن فرص حقيقية للتعاون مع العلامات التجارية؟ منصتنا تجمعك مباشرة مع الشركات التي تناسب محتواك وجمهورك، لتوسع تأثيرك وتزيد أرباحك بكل سهولة واحترافية."
    : "Are you an influencer looking for real collaboration opportunities with brands? Our platform directly connects you with companies that match your content and audience, to expand your influence and increase your earnings easily and professionally."

  // Professional benefits with titles and descriptions
  const influencerBenefits = isArabic ? [
    {
      title: "أظهر محتواك للشركات",
      description: "أنشئ ملفًا شخصيًا جذابًا يعرض محتواك، جمهورك، وأسلوبك ليتمكن المعلنون من التعرف عليك بسهولة."
    },
    {
      title: "احصل على فرص تعاون حصرية",
      description: "حملات تسويقية من منتجات وخدمات تتوافق مع جمهورك، بدون عناء البحث."
    },
    {
      title: "تحكم كامل في عروضك",
      description: "اختر العروض التي تناسبك وحدد أسعارك وشروطك بكل حرية ومرونة."
    },
    {
      title: "تقارير أداء دقيقة",
      description: "تابع نتائج كل حملة تعرف مدى تأثيرك على العلامات التجارية، وطور استراتيجيتك بشكل ذكي."
    },
    {
      title: "مدفوعات سريعة وآمنة",
      description: "استلم مستحقاتك مباشرة بعد انتهاء الحملات، بدون تأخير أو مشاكل مالية."
    },
    {
      title: "تواصل مباشر مع الشركات",
      description: "تفاوض ونسق بسهولة مع فرق التسويق دون وسيط، لتضمن تجربة احترافية وسلسة."
    },
    {
      title: "نمو وتطوير مستمر",
      description: "أدوات ونصائح تساعدك على تحسين محتواك، زيادة جمهورك، وتعزيز تأثيرك في السوق."
    }
  ] : [
    {
      title: "Showcase Your Content to Companies",
      description: "Create an attractive profile displaying your content, audience, and style so advertisers can easily discover you."
    },
    {
      title: "Get Exclusive Collaboration Opportunities",
      description: "Marketing campaigns from products and services that match your audience, without the hassle of searching."
    },
    {
      title: "Full Control Over Your Offers",
      description: "Choose offers that suit you and set your prices and terms with complete freedom and flexibility."
    },
    {
      title: "Accurate Performance Reports",
      description: "Track each campaign's results to understand your impact on brands and develop your strategy intelligently."
    },
    {
      title: "Fast and Secure Payments",
      description: "Receive your payments directly after campaigns end, without delays or financial issues."
    },
    {
      title: "Direct Communication with Companies",
      description: "Negotiate and coordinate easily with marketing teams without intermediaries, ensuring a professional and smooth experience."
    },
    {
      title: "Continuous Growth and Development",
      description: "Tools and tips to help you improve your content, increase your audience, and enhance your market influence."
    }
  ]

  // Simple business-focused platform benefits
  const platformBenefits = isArabic ? [
    "مؤثرون تم التحقق منهم لضمان الجودة والمصداقية",
    "شبكة متنوعة من المؤثرين في جميع المجالات",
    "تقارير تحليلية تفصيلية لقياس نجاح الحملات",
    "محتوى احترافي يتناسب مع هوية علامتك التجارية"
  ] : [
    "Verified influencers ensuring quality and credibility",
    "Diverse network of influencers across all niches",
    "Detailed analytics reports to measure campaign success",
    "Professional content aligned with your brand identity"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-background to-muted/20 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {isArabic ? 'انضم كمؤثر' : 'Join as an Influencer'}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {introText}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>{isArabic ? '500+ مؤثر' : '500+ Influencers'}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>{isArabic ? '1000+ حملة' : '1000+ Campaigns'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Dream to App Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-border/50">
            <CardContent className="p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                {isArabic ? 'من نحن – Dream to App' : 'About Us – Dream to App'}
              </h2>

              <div className="space-y-6 text-base leading-relaxed">
                <p>
                  {isArabic
                    ? 'نحن في Dream to App وكالة سعودية متخصصة في بناء المنصات الرقمية والتسويق الإلكتروني، بقيادة Khalid Ali، مؤسس الوكالة. بدأنا من المملكة العربية السعودية لنكون قريبين من السوق الخليجي، ونفخر بوجود فرعنا الثاني في الإسكندرية – مصر، لنخدم عملاءنا في العالم العربي بأعلى معايير الاحترافية والجودة.'
                    : 'At Dream to App, we are a Saudi-based agency specializing in building digital platforms and digital marketing, led by Khalid Ali, the agency founder. We started in Saudi Arabia to be close to the Gulf market, and we are proud to have our second branch in Alexandria, Egypt, to serve our clients in the Arab world with the highest standards of professionalism and quality.'}
                </p>

                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                  <h3 className="font-bold mb-2">
                    {isArabic ? 'رسالتنا' : 'Our Mission'}
                  </h3>
                  <p className="text-sm">
                    {isArabic
                      ? 'أن نكون الجسر الذي يربط بين المؤثرين المبدعين والعلامات التجارية، من خلال منصة موثوقة وآمنة توفر فرصًا عادلة للطرفين.'
                      : 'To be the bridge connecting creative influencers with brands, through a trusted and secure platform providing fair opportunities for both parties.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold mb-3">
                    {isArabic ? 'لماذا تنضم إلينا كمؤثر؟' : 'Why Join Us as an Influencer?'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {isArabic
                          ? 'وكالة رسمية ومسجلة في السعودية مع تواجد دولي (فرع الإسكندرية).'
                          : 'Official registered agency in Saudi Arabia with international presence (Alexandria branch).'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {isArabic
                          ? 'إدارة احترافية بقيادة مباشرة من المؤسس، ومتابعة دقيقة لكل حملة.'
                          : 'Professional management with direct leadership from the founder, and precise monitoring of each campaign.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {isArabic
                          ? 'فرص حقيقية للتعاون مع شركات وعلامات تجارية تبحث عن مؤثرين مميزين.'
                          : 'Real collaboration opportunities with companies and brands looking for distinguished influencers.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {isArabic
                          ? 'ضمان حقوقك من خلال اتفاقيات واضحة ومدفوعات آمنة وسريعة.'
                          : 'Protection of your rights through clear agreements and secure, fast payments.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        {isArabic
                          ? 'انتشار أكبر لأننا نسوق للوكالة وللمؤثرين معنا في السوق الخليجي والمصري.'
                          : 'Greater exposure as we market both the agency and our influencers in the Gulf and Egyptian markets.'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits for Influencers - Professional List */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            {isArabic ? 'مميزات الانضمام' : 'Benefits of Joining'}
          </h2>
          <Card className="border-border/50">
            <CardContent className="p-8">
              <div className="space-y-6">
                {influencerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-base mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits for Business - Simple List */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            {isArabic ? 'ضمان الجودة للعلامات التجارية' : 'Quality Assurance for Brands'}
          </h2>
          <Card className="border-border/50">
            <CardContent className="p-8">
              <ul className="space-y-4">
                {platformBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* View Agreement Button */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground mb-4">
            {isArabic
              ? "هل أنت مسجل بالفعل وتريد مراجعة الاتفاقية؟"
              : "Already registered and want to review the agreement?"}
          </p>
          <ViewContractDialog locale={locale} />
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <InfluencerRegistrationForm locale={locale} />
        </div>
      </section>
    </div>
  )
}

export default InfluencerRegisterClient
