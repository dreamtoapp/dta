import localFont from 'next/font/local';

export const tajawal = localFont({
  src: [
    {
      path: '../fonts/Tajawal-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Tajawal-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Tajawal-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Tajawal-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Tajawal-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Tajawal-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/Tajawal-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});
