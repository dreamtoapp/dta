import { serviceIcon, technology } from "@/constant/icons";
type CardData = {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: { text: string; icon: React.ElementType }[];
};

export const cardData: CardData[] = [
  {
    title: "websiteDevelopmentTitle",
    description: "websiteDevelopmentDescription",
    icon: serviceIcon.website.icon,
    tags: [
      { text: technology.js.name, icon: technology.js.icon },
      { text: technology.html.name, icon: technology.html.icon },
      { text: technology.css.name, icon: technology.css.icon },
      { text: technology.react.name, icon: technology.react.icon },
      { text: technology.nextjs.name, icon: technology.nextjs.icon },
      { text: technology.xd.name, icon: technology.xd.icon },
      { text: technology.figma.name, icon: technology.figma.icon },
      { text: technology.mongodb.name, icon: technology.mongodb.icon },
      { text: technology.prisma.name, icon: technology.prisma.icon },
      { text: technology.mysql.name, icon: technology.mysql.icon },
      { text: technology.firebase.name, icon: technology.firebase.icon },
      { text: technology.nodeJs.name, icon: technology.nodeJs.icon },

    ],
  },
  {
    title: "mobileAppDevelopmentTitle",
    description: "mobileAppDevelopmentDescription",
    icon: serviceIcon.mobileApp.icon,
    tags: [
      { text: technology.react.name, icon: technology.react.icon },
      { text: technology.reactNative.name, icon: technology.reactNative.icon },
      { text: technology.mongodb.name, icon: technology.mongodb.icon },
      { text: technology.firebase.name, icon: technology.firebase.icon },
      { text: technology.sqlite.name, icon: technology.sqlite.icon },
      { text: technology.mysql.name, icon: technology.mysql.icon },
      { text: technology.figma.name, icon: technology.figma.icon },
      { text: technology.prisma.name, icon: technology.prisma.icon },
      
    ],
  },
  // {
  //   title: "crmDevelopmentTitle",
  //   description: "crmDevelopmentDescription",
  //   icon: serviceIcon.crm.icon,
  //   tags: [
  //     { text: technology.react.name, icon: technology.react.icon },
  //     { text: technology.nextjs.name, icon: technology.nextjs.icon },
  //     { text: technology.sentry.name, icon: technology.sentry.icon },
  //     { text: technology.figma.name, icon: technology.figma.icon },
  //     { text: technology.mongodb.name, icon: technology.mongodb.icon },
  //     { text: technology.prisma.name, icon: technology.prisma.icon },
  //   ],
  // },
  {
    title: "ecommerceDevelopmentTitle",
    description: "ecommerceDevelopmentDescription",
    icon: serviceIcon.ecomm.icon,
    tags: [
      { text: technology.react.name, icon: technology.react.icon },
      { text: technology.nextjs.name, icon: technology.nextjs.icon },
      { text: technology.figma.name, icon: technology.figma.icon },
      { text: technology.mongodb.name, icon: technology.mongodb.icon },
      { text: technology.prisma.name, icon: technology.prisma.icon },
      { text: technology.mysql.name, icon: technology.mysql.icon },
      { text: technology.nodeJs.name, icon: technology.nodeJs.icon },
      { text: technology.shopify.name, icon: technology.shopify.icon },
      { text: technology.twilio.name, icon: technology.twilio.icon },
      { text: technology.firebase.name, icon: technology.firebase.icon },
    ],
  },
  {
    title: "uiUxDesignTitle",
    description: "uiUxDesignDescription",
    icon: serviceIcon.uiux.icon,
    tags: [
      { text: technology.figma.name, icon: technology.figma.icon },
      { text: technology.xd.name, icon: technology.xd.icon },
      { text: technology.photoshop.name, icon: technology.photoshop.icon },
      { text: technology.illustrator.name, icon: technology.illustrator.icon },
    ],
  },
  {
    title: "digitalMarketingTitle",
    description: "digitalMarketingDescription",
    icon: serviceIcon.dm.icon,
    tags: [
      { text: technology.photoshop.name, icon: technology.photoshop.icon },
      { text: technology.illustrator.name, icon: technology.illustrator.icon },
      { text: technology.buffer.name, icon: technology.buffer.icon },
      { text: technology.tiktok.name, icon: technology.tiktok.icon },
      { text: technology.snapchat.name, icon: technology.snapchat.icon },
      { text: technology.youtube.name, icon: technology.youtube.icon },
      { text: technology.instgram.name, icon: technology.instgram.icon },
      { text: technology.twitter.name, icon: technology.twitter.icon },
    ],
  },
  {
    title: "visualIdentityTitle",
    description: "visualIdentityDescription",
    icon: serviceIcon.vd.icon,
    tags: [
      { text: technology.photoshop.name, icon: technology.photoshop.icon },
      { text: technology.illustrator.name, icon: technology.illustrator.icon },
    ],
  },
];
