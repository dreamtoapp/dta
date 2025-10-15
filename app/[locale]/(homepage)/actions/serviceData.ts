import { serviceIcon, technology } from "@/constant/icons";
type CardData = {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: { text: string; icon: React.ElementType }[];
  // Optional Cloudinary public id for a header image (test only; you can update manually)
  imagePublicId?: string;
};

export const cardData: CardData[] = [
  {
    title: "websiteDevelopmentTitle",
    description: "websiteDevelopmentDescription",
    icon: serviceIcon.website.icon,
    // Test image public id (you can replace/update manually)
    imagePublicId: "v1758728821/website_wbnje1.png",
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
    imagePublicId: "v1758728821/mobile_application_fvymvs.png",
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

  {
    title: "ecommerceDevelopmentTitle",
    description: "ecommerceDevelopmentDescription",
    icon: serviceIcon.ecomm.icon,
    imagePublicId: "v1758728821/ecommer_face_dbzpnb.png",
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
  // {
  //   title: "uiUxDesignTitle",
  //   description: "uiUxDesignDescription",
  //   icon: serviceIcon.uiux.icon,
  //   imagePublicId: "v1758728821/visual_identity_rqjjre.png",
  //   tags: [
  //     { text: technology.figma.name, icon: technology.figma.icon },
  //     { text: technology.xd.name, icon: technology.xd.icon },
  //     { text: technology.photoshop.name, icon: technology.photoshop.icon },
  //     { text: technology.illustrator.name, icon: technology.illustrator.icon },
  //   ],
  // },
  {
    title: "digitalMarketingTitle",
    description: "digitalMarketingDescription",
    icon: serviceIcon.dm.icon,
    imagePublicId: "v1758728821/DIGITAL_MARKETING_tfqsgj.png",
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
  // {
  //   title: "visualIdentityTitle",
  //   description: "visualIdentityDescription",
  //   icon: serviceIcon.vd.icon,
  //   imagePublicId: "v1758728821/visual_identity_rqjjre.png",
  //   tags: [
  //     { text: technology.photoshop.name, icon: technology.photoshop.icon },
  //     { text: technology.illustrator.name, icon: technology.illustrator.icon },
  //   ],
  // },
];
