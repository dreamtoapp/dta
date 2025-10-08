import { FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaShopify, FaBuffer, FaWhatsapp, FaTiktok, FaSnapchatGhost, FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaStackOverflow, FaUserSecret, FaCode, FaFacebook } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiFirebase, SiMysql, SiSqlite, SiTypescript, SiAdobe, SiFigma, SiSentry, SiTwilio, SiAdobephotoshop, SiAdobeillustrator, SiPrisma, SiVuedotjs } from 'react-icons/si';
import { Rocket, Users, Paintbrush, Globe, Smartphone, Award, Shield, Smile, Mail, Phone, FileText, Home as LucideHome, CalendarClock, Youtube as LucideYoutube, Instagram as LucideInstagram, Twitter as LucideTwitter, ShoppingCart, Megaphone, Palette, Briefcase, Tag, Link, Terminal, Star, Heart, TrendingUp, FolderOpen, Image, Monitor, Grid, Layout, Hash, Square, BookOpen } from 'lucide-react';
import ServiceIcon from '@/components/naviqation/ServiceIcon';

// If a logo is missing in react-icons, fallback to a similar or generic icon.

export const technology = {
  js: { name: "JavaScript", icon: FaJs },
  html: { name: "HTML", icon: FaHtml5 },
  css: { name: "CSS", icon: FaCss3Alt },
  react: { name: "React", icon: FaReact },
  nextjs: { name: "Next.js", icon: SiNextdotjs },
  nodeJs: { name: "Node.js", icon: FaNodeJs },
  mongodb: { name: "MongoDB", icon: SiMongodb },
  firebase: { name: "Firebase", icon: SiFirebase },
  reactNative: { name: "React Native", icon: FaReact },
  mysql: { name: "MySQL", icon: SiMysql },
  sqlite: { name: "SQLite", icon: SiSqlite },
  typescript: { name: "TypeScript", icon: SiTypescript },
  prisma: { name: "Prisma", icon: SiPrisma },
  xd: { name: "Adobe XD", icon: SiAdobe },
  figma: { name: "Figma", icon: SiFigma },
  sentry: { name: "Sentry", icon: SiSentry },
  shopify: { name: "Shopify", icon: FaShopify },
  twilio: { name: "Twilio", icon: SiTwilio },
  photoshop: { name: "Photoshop", icon: SiAdobephotoshop },
  illustrator: { name: "Illustrator", icon: SiAdobeillustrator },
  buffer: { name: "Buffer", icon: FaBuffer },
  whatsapp: { name: "WhatsApp", icon: FaWhatsapp },
  tiktok: { name: "TikTok", icon: FaTiktok },
  ts: { name: "TypeScript", icon: Rocket },
  snapchat: { name: "snapchat", icon: FaSnapchatGhost },
  youtube: { name: "youtube", icon: LucideYoutube },
  instgram: { name: "instgram", icon: LucideInstagram },
  twitter: { name: "twitter", icon: LucideTwitter },
  vscode: { name: "VSCode", icon: Terminal },
  linkedin: { name: "LinkedIn", icon: FaLinkedin },
  facebook: { name: "Facebook", icon: FaFacebook },
  workSample: { name: "workSample", icon: Briefcase },
  priceDown: { name: "price Down", icon: Tag },
  linkYouLike: { name: "link You Like", icon: Link },
};

export const social = {
  snapchat: FaSnapchatGhost,
  youtube: LucideYoutube,
  instagram: LucideInstagram,
  twitter: LucideTwitter,
  facebook: FaFacebook,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
};

export const misc = {
  rocket: Rocket,
  users: Users,
  paint: Paintbrush,
  web: Globe,
  mobile: Smartphone,
  award: Award,
  stackoverflow: FaStackOverflow,
  smilyDollar: Smile,
  custom: FaUserSecret,
  code: FaCode,
  calendartime: CalendarClock,
  shield: Shield,
  emailIcon: Mail,
  phoneIcon: Phone,
  formIcon: FileText,
  home: LucideHome,
  blog: BookOpen, // Blog - open book for articles and insights
  influencer: Megaphone, // Influencer - megaphone for broadcasting messages
  influencerAlt: Star, // Alternative influencer icon - stars/followers
  influencerCommunity: Users, // Alternative influencer icon - people/community
  portfolio: Hash, // Ultra-modern portfolio - hash/grid pattern (Currently Used)
  portfolioAlt: Grid, // Modern portfolio - grid layout display
  portfolioLayout: Layout, // Portfolio alternative - layout design
  portfolioMonitor: Monitor, // Modern portfolio - digital showcase
  portfolioSingle: Square, // Minimal portfolio - single item
};

// export const whyChooseUs = {
//   dollar: FaSmile,
//   ecustom: FaUserSecret,
//   expert: FaCode,
//   timeFlex: FaCalendarAlt,
// };




export const serviceIcon = {
  serviceMenu: { name: "Service Menu", icon: ServiceIcon }, // SVG-based service menu icon
  website: { name: "Website", icon: Globe },
  mobileApp: { name: "Mobile App", icon: Smartphone },
  crm: { name: "CRM", icon: Users },
  ecomm: { name: "Ecomm", icon: ShoppingCart }, // ShoppingCart is available in lucide-react
  uiux: { name: "UI/UX", icon: Paintbrush },
  dm: { name: "Digital Marketing", icon: Megaphone },
  branding: { name: "Visual Identity", icon: Palette }, // الهوية البصرية
  "visual-identity": { name: "Visual Identity", icon: Palette },
  vd: { name: "Video", icon: Rocket },
};

export const whyChooseUs = {
  dollar: Smile,
  ecustom: FaUserSecret,
  expert: FaCode,
  timeFlex: CalendarClock,
  shield: Shield,
};

export const contactUs = {
  whatsapp: { name: "whatsapp", icon: FaWhatsapp },
  email: { name: "email", icon: Mail },
  phone: { name: "phone", icon: Phone },
  form: { name: "form", icon: FileText },
  tiktok: { name: "tiktok", icon: FaTiktok },
  snapchat: { name: "snapchat", icon: FaSnapchatGhost },
  youtube: { name: "youtube", icon: LucideYoutube },
  instgram: { name: "instgram", icon: LucideInstagram },
  twitter: { name: "twitter", icon: LucideTwitter },
  facebook: { name: "facebook", icon: FaFacebook },
};

export const normalIcons = {
  team: { name: "Team", icon: Users },
  home: { name: "Home", icon: LucideHome },
};
