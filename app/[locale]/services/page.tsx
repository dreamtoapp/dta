import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Palette,
  TrendingUp,
  Eye,
  ArrowRight,
  Zap,
  Target,
  Sparkles,
  Star,
  CheckCircle,
  Award,
  Clock,
  Shield,
  Rocket,
  ChevronRight,
  Play,
  Users,
  Code,
  Layers,
  BarChart3,
  Lightbulb,
  Heart,
  ThumbsUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Megaphone,
} from "lucide-react"
import Image from "next/image"
import React from "react"
import { getTranslations, getLocale } from "next-intl/server"
import Link from '@/components/link'
import MotionDiv from '@/components/MotionDiv'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Service {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  color: string
  textColor: string
  bgColor: string
  gradient: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
  rating: number
  company: string
}

interface HeroSectionProps {
  t: any
  locale: string
}

interface ServicesSectionProps {
  t: any
  services: Service[]
}

interface WhyChooseUsSectionProps {
  t: any
}

interface TestimonialsSectionProps {
  t: any
  testimonials: Testimonial[]
}

interface CTASectionProps {
  t: any
  locale: string
}

interface StatsSectionProps {
  t: any
}



const getStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DreamToApp",
  alternateName: "DreamToApp",
  description: "We combine creativity and technology to provide customized solutions for your business in Jeddah, Saudi Arabia",
  url: "https://dreamtoapp.com",
  logo: "https://dreamtoapp.com/assets/dreamtoapp/dreamToApp.svg",
  image: "https://dreamtoapp.com/assets/dreamtoapp/dreamToApp.svg",
  telephone: "+966554113107",
  email: "info@dreamto.app",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jeddah",
    addressLocality: "Jeddah",
    addressRegion: "Makkah Province",
    addressCountry: "SA",
    postalCode: "20000"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "21.4858",
    longitude: "39.1925"
  },
  areaServed: {
    "@type": "Country",
    name: "Saudi Arabia"
  },
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "21.4858",
      longitude: "39.1925"
    },
    geoRadius: "50000"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966554113107",
    contactType: "customer service",
    availableLanguage: ["Arabic", "English"],
    areaServed: "SA"
  },
  sameAs: [
    "https://facebook.com/dreamtoapp",
    "https://twitter.com/dreamtoapp",
    "https://linkedin.com/company/dreamtoapp",
    "https://instagram.com/dreamtoapp"
  ],
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technology Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development",
          description: "We turn your ideas into exceptional websites that impress visitors and engage them with your brand",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile Application Development",
          description: "We create innovative and user-friendly applications that allow your clients to access your services easily",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce Development",
          description: "We build a complete online store that reflects your brand identity",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description: "We provide innovative modern designs that focus on user experience",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing",
          description: "We position your brand at the forefront of competition through integrated marketing strategies",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Visual Identity Design",
          description: "We create a unique visual identity that reflects your brand's personality",
        },
      }
    ]
  }
});

// ============================================================================
// HERO SECTION COMPONENTS
// ============================================================================

const HeroBadge: React.FC<{ t: any }> = ({ t }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Badge variant="secondary" className="w-fit mb-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <Sparkles className="w-4 h-4 mr-2 text-primary" />
      {t("heroBadge")}
    </Badge>
  </MotionDiv>
)

const HeroTitle: React.FC<{ t: any }> = ({ t }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground mt-0">
      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {t("heroTitle1")}
      </span>
      <br />
      <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
        {t("heroTitle2")}
      </span>
    </h1>
  </MotionDiv>
)

const HeroDescription: React.FC<{ t: any }> = ({ t }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
      {t("heroDescription")}
    </p>
  </MotionDiv>
)

const HeroCTAs: React.FC<{ t: any; locale: string }> = ({ t, locale }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="flex flex-col sm:flex-row gap-4 items-center"
  >
    <Link href={`/${locale}/worksample`} passHref>
      <Button size="lg" variant="outline" className="border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300 transform hover:scale-105">
        {t("ctaViewPortfolio")}
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/20">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      <span className="text-sm text-muted-foreground font-medium ml-2">{t("rating")}</span>
    </div>
  </MotionDiv>
)



const HeroImage: React.FC = () => (
  <MotionDiv
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="relative"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/30 rounded-3xl blur-3xl animate-pulse"></div>
    <Card className="relative border-0 shadow-2xl bg-card/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
      <CardContent className="p-0">
        <Image
          src="/assets/dreamtoapp/dreamToApp.svg"
          alt="Innovative Technology Solutions - Website Development, Mobile Apps, and Digital Marketing Services"
          width={600}
          height={500}
          className="rounded-lg"
          priority
        />
      </CardContent>
    </Card>
  </MotionDiv>
)

const HeroSection: React.FC<HeroSectionProps> = ({ t, locale }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-8">
              <HeroBadge t={t} />
              <HeroTitle t={t} />
              <HeroDescription t={t} />
            </div>
            <HeroCTAs t={t} locale={locale} />
          </div>
          <HeroImage />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SERVICES SECTION COMPONENTS
// ============================================================================

const ServicesHeader: React.FC<{ t: any }> = ({ t }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-center mb-20"
  >
    <Badge variant="outline" className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <Zap className="w-4 h-4 mr-2 text-primary" />
      {t("professionalServices")}
    </Badge>
    <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
      {t("tecnoUsed")}
    </h2>
    <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
      {t("blendingCreativity")}
    </p>
  </MotionDiv>
)

const ServiceIcon: React.FC<{ service: Service }> = ({ service }) => (
  <div className="flex justify-center mt-6 mb-4">
    <div className={`${service.bgColor} p-6 rounded-2xl border shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 ${service.gradient}`}>
      {React.createElement(service.icon, { className: `w-12 h-12 ${service.textColor}` })}
    </div>
  </div>
)



const ServiceFeatures: React.FC<{ service: Service; t: any }> = ({ service, t }) => (
  <div className="space-y-4">
    <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-primary" />
      {t("keyFeatures")}
    </h4>
    <div className="grid grid-cols-1 gap-3">
      {service.features.map((feature: string, featureIndex: number) => (
        <div key={featureIndex} className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <CheckCircle className={`w-4 h-4 ${service.textColor} flex-shrink-0`} />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </div>
      ))}
    </div>
  </div>
)

const ServiceCard: React.FC<{ service: Service; t: any; index: number }> = ({ service, t, index }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Card className="group hover:shadow-2xl transition-all duration-500 border hover:border-primary/30 hover:-translate-y-2 bg-card/80 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <ServiceIcon service={service} />
      <CardHeader className="pb-4 relative z-10">
        <CardTitle className={`text-2xl font-bold group-hover:${service.textColor} transition-colors`}>
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        <CardDescription className="text-muted-foreground leading-relaxed text-base">
          {service.description}
        </CardDescription>
        <ServiceFeatures service={service} t={t} />
        {/* <Button className={`w-full group-hover:${service.bgColor} group-hover:text-foreground transition-all duration-300 transform group-hover:scale-105`}>
          {t("learnMoreAbout", { service: service.title })}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button> */}
      </CardContent>
    </Card>
  </MotionDiv>
)

const ServicesSection: React.FC<ServicesSectionProps> = ({ t, services }) => {
  return (
    <section className="py-32 bg-gradient-to-br from-muted/20 via-background to-muted/10 relative overflow-hidden" id="services">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      <div className="relative container mx-auto px-4">
        <ServicesHeader t={t} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} t={t} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// WHY CHOOSE US SECTION COMPONENTS
// ============================================================================

const WhyChooseUsHeader: React.FC<{ t: any }> = ({ t }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="space-y-6"
  >
    <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <Award className="w-4 h-4 mr-2 text-primary" />
      {t("whyChooseUs")}
    </Badge>
    <h2 className="text-5xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
      {t("innovateFutureSolutions")}
    </h2>
    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
      {t("whyChooseUsDesc")}
    </p>
  </MotionDiv>
)

const WhyChooseUsItem: React.FC<{ item: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }; index: number }> = ({ item, index }) => (
  <MotionDiv
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="flex gap-6 group hover:bg-muted/30 p-4 rounded-xl transition-all duration-300">
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-4 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <item.icon className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
      </div>
    </div>
  </MotionDiv>
)

const WhyChooseUsImage: React.FC = () => (
  <MotionDiv
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="relative"
  >
    <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
      <CardContent className="p-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 opacity-70 blur-sm z-10 pointer-events-none" />
        <Image
          src="/assets/dta.svg"
          alt="DreamToApp Logo - Professional team working on innovative technology solutions"
          width={500}
          height={400}
          className="rounded-lg opacity-80 relative z-20"
          loading="lazy"
        />
      </CardContent>
    </Card>
  </MotionDiv>
)

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ t }) => {
  const whyChooseItems = [
    {
      icon: Rocket,
      title: t("fastDelivery"),
      description: t("fastDeliveryDesc"),
    },
    {
      icon: Shield,
      title: t("secureSolutions"),
      description: t("secureSolutionsDesc"),
    },
    {
      icon: Clock,
      title: t("support247"),
      description: t("support247Desc"),
    },
  ]

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <WhyChooseUsHeader t={t} />
            <div className="grid gap-8">
              {whyChooseItems.map((item, index) => (
                <WhyChooseUsItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
          <WhyChooseUsImage />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TESTIMONIALS SECTION COMPONENTS
// ============================================================================

const TestimonialsHeader: React.FC<{ t: any }> = ({ t }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-center mb-20"
  >
    <Badge variant="outline" className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <Star className="w-4 h-4 mr-2 text-primary" />
      {t("clientTestimonials")}
    </Badge>
    <h2 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
      {t("whatOurClientsSay")}
    </h2>
    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
      {t("testimonialsIntro")}
    </p>
  </MotionDiv>
)

const TestimonialRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
)

const TestimonialAuthor: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="flex items-center gap-4 pt-6">
    <Avatar className="w-12 h-12">
      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
        {testimonial.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
    <div>
      <div className="font-bold text-foreground">{testimonial.name}</div>
      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
      <div className="text-xs text-primary font-medium">{testimonial.company}</div>
    </div>
  </div>
)

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-8 space-y-6 relative z-10">
        <TestimonialRating rating={testimonial.rating} />
        <blockquote className="text-muted-foreground italic leading-relaxed text-lg">
          "{testimonial.content}"
        </blockquote>
        <TestimonialAuthor testimonial={testimonial} />
      </CardContent>
    </Card>
  </MotionDiv>
)

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ t, testimonials }) => {
  return (
    <section className="py-32 bg-gradient-to-br from-muted/20 via-background to-muted/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:35px_35px]" />
      <div className="relative container mx-auto px-4">
        <TestimonialsHeader t={t} />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA & STATS SECTION COMPONENTS
// ============================================================================

const CTAContent: React.FC<{ t: any; locale: string }> = ({ t, locale }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-5xl mx-auto space-y-10"
  >
    <Badge className="bg-background/20 text-primary-foreground border-primary-foreground/30 text-lg px-6 py-3">
      <Sparkles className="w-5 h-5 mr-2" />
      {t("limitedTimeOffer")}
    </Badge>
    <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-primary-foreground/80 bg-clip-text text-transparent">
      {t("highDiscounts")}
    </h2>
    <p className="text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
      {t("ctaReady")}
    </p>
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <Link href={`/${locale}/contactus`} passHref>
        <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg">
          <MessageCircle className="w-6 h-6 mr-3" />
          {t("ctaContactUs")}
        </Button>
      </Link>
      <Link href={`/${locale}/start-your-dream`} passHref>
        <Button
          size="lg"
          variant="outline"
          className="border-primary-foreground text-primary-foreground bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg"
        >
          {t("ctaStartYourDream")}
          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  </MotionDiv>
)

const CTASection: React.FC<CTASectionProps> = ({ t, locale }) => {
  return (
    <section className="py-32 bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      <div className="relative container mx-auto px-4 text-center">
        <CTAContent t={t} locale={locale} />
      </div>
    </section>
  )
}

const StatItem: React.FC<{ value: string; label: string; index: number }> = ({ value, label, index }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="space-y-3 text-center group hover:bg-muted/30 p-6 rounded-xl transition-all duration-300">
      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
        {value}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  </MotionDiv>
)

const StatsSection: React.FC<StatsSectionProps> = ({ t }) => {
  const stats = [
    { value: "98%", label: t("clientSatisfaction") },
    { value: "24/7", label: t("supportAvailable") },
    { value: "7+", label: t("yearsExperience") },
  ]

  return (
    <section className="py-20 bg-background border-t relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:25px_25px]" />
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function ServicesPage() {
  const t = await getTranslations("services")
  const locale = await getLocale()
  const services = [
    // {
    //   icon: Globe,
    //   title: t("websiteDevelopmentTitle"),
    //   description: t("websiteDevelopmentDescription"),
    //   features: [t("responsiveDesign"), t("fastLoading"), t("seoOptimized"), t("userFriendly")],
    //   color: "bg-primary",
    //   textColor: "text-primary",
    //   bgColor: "bg-primary/10",
    //   gradient: "bg-gradient-to-br from-primary/20 to-primary/5"
    // },
    {
      icon: Smartphone,
      title: t("mobileAppDevelopmentTitle"),
      description: t("mobileAppDevelopmentDescription"),
      features: [t("crossPlatform"), t("nativePerformance"), t("pushNotifications"), t("offlineSupport")],
      color: "bg-secondary",
      textColor: "text-secondary",
      bgColor: "bg-secondary/10",
      gradient: "bg-gradient-to-br from-secondary/20 to-secondary/5"
    },
    {
      icon: ShoppingCart,
      title: t("ecommerceDevelopmentTitle"),
      description: t("ecommerceDevelopmentDescription"),
      features: [t("securePayments"), t("inventoryManagement"), t("multiCurrency"), t("analyticsDashboard")],
      color: "bg-destructive",
      textColor: "text-destructive",
      bgColor: "bg-destructive/10",
      gradient: "bg-gradient-to-br from-destructive/20 to-destructive/5"
    },
    {
      icon: Palette,
      title: t("uiUxDesignTitle"),
      description: t("uiUxDesignDescription"),
      features: [t("userResearch"), t("prototyping"), t("designSystems"), t("usabilityTesting")],
      color: "bg-muted",
      textColor: "text-muted-foreground",
      bgColor: "bg-muted/50",
      gradient: "bg-gradient-to-br from-muted/30 to-muted/10"
    },
    {
      icon: TrendingUp,
      title: t("digitalMarketingTitle"),
      description: t("digitalMarketingDescription"),
      features: [t("seoOptimization"), t("socialMedia"), t("ppcCampaigns"), t("contentStrategy")],
      color: "bg-accent",
      textColor: "text-accent-foreground",
      bgColor: "bg-accent/10",
      gradient: "bg-gradient-to-br from-accent/20 to-accent/5"
    },
    {
      icon: Eye,
      title: t("visualIdentityTitle"),
      description: t("visualIdentityDescription"),
      features: [t("logoDesign"), t("brandGuidelines"), t("marketingMaterials"), t("brandStrategy")],
      color: "bg-primary",
      textColor: "text-primary",
      bgColor: "bg-primary/10",
      gradient: "bg-gradient-to-br from-primary/20 to-primary/5"
    },
    {
      icon: Megaphone,
      title: t("influencerMarketingTitle"),
      description: t("influencerMarketingDescription"),
      features: [t("verifiedInfluencerNetwork"), t("detailedAnalytics"), t("campaignManagement"), t("directBooking")],
      color: "bg-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-600/10",
      gradient: "bg-gradient-to-br from-purple-600/20 to-purple-600/5"
    },
  ]

  const testimonials = [
    {
      name: t("testimonial1Name"),
      role: t("testimonial1Role"),
      company: t("testimonial1Company"),
      content: t("testimonial1Content"),
      avatar: "/assets/testimonials/client1.webp",
      rating: 5,
    },
    {
      name: t("testimonial2Name"),
      role: t("testimonial2Role"),
      company: t("testimonial2Company"),
      content: t("testimonial2Content"),
      avatar: "/assets/testimonials/client2.webp",
      rating: 5,
    },
    {
      name: t("testimonial3Name"),
      role: t("testimonial3Role"),
      company: t("testimonial3Company"),
      content: t("testimonial3Content"),
      avatar: "/assets/testimonials/client3.webp",
      rating: 5,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }} />
      <div className="min-h-screen bg-background">
        <HeroSection t={t} locale={locale} />
        <ServicesSection t={t} services={services} />
        <WhyChooseUsSection t={t} />
        <TestimonialsSection t={t} testimonials={testimonials} />
        <CTASection t={t} locale={locale} />
        <StatsSection t={t} />
      </div>
    </>
  )
}
