import { Skeleton } from "@/components/ui/skeleton";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Loading() {
  const t = await getTranslations('app');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse-slower"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Premium Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent"></div>

        {/* Central Loading Experience */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-12">

            {/* Premium Logo Section */}
            <div className="relative">
              {/* Main Logo Container with Glass Morphism */}
              <div className="relative mx-auto w-40 h-60 md:w-56 md:h-80">
                {/* Glass morphism background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"></div>

                {/* DreamToApp Logo with Premium Effects */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-32 h-32 md:w-40 md:h-40">
                    {/* Main Logo Container */}
                    <div className="relative w-full h-full">
                      {/* Logo with Premium Effects */}
                      <Image
                        src="/assets/dreamtoapp/dreamToApp.svg"
                        alt="DreamToApp Logo"
                        width={160}
                        height={160}
                        className="w-full h-full object-contain animate-float brightness-0 invert drop-shadow-2xl"
                        priority
                        style={{
                          filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
                        }}
                      />

                      {/* Premium shine effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient-x rounded-full pointer-events-none"></div>

                      {/* Holographic border glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/30 via-brand-secondary/30 to-brand-accent/30 animate-pulse pointer-events-none"></div>

                      {/* Inner glow effect */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Floating particles around logo */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-brand-accent rounded-full animate-float opacity-80"></div>
                    <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-brand-secondary rounded-full animate-float-slow opacity-60"></div>
                    <div className="absolute top-1/2 -right-3 w-1 h-1 bg-brand-primary rounded-full animate-pulse opacity-70"></div>
                    <div className="absolute -top-3 left-1/2 w-1 h-1 bg-brand-accent rounded-full animate-float opacity-50"></div>
                    <div className="absolute -left-3 top-1/4 w-1.5 h-1.5 bg-brand-secondary rounded-full animate-float-slow opacity-40"></div>
                  </div>
                </div>

                {/* Premium loading ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-gradient-to-r from-brand-primary/30 via-brand-secondary/30 to-brand-accent/30 animate-spin">
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent border-t-brand-primary animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
            </div>

            {/* Premium Brand Section */}
            <div className="space-y-8">
              {/* Company Name with Premium Typography */}
              <div className="relative">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight">
                  <span className="bg-gradient-to-r from-white via-brand-secondary to-white bg-clip-text text-transparent animate-gradient-move">
                    {t('name')}
                  </span>
                </h1>

                {/* Subtle text shadow for depth */}
                <div className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black text-white/20 tracking-tight blur-sm -z-10">
                  {t('name')}
                </div>
              </div>

              {/* Premium Slogan */}
              <div className="relative max-w-3xl mx-auto">
                <div className="text-xl md:text-2xl lg:text-3xl text-slate-300 font-light leading-relaxed tracking-wide">
                  <span className="relative inline-block">
                    {t('slogan')}
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent animate-gradient-x"></div>
                  </span>
                </div>
              </div>

              {/* Premium Loading Indicators */}
              <div className="flex flex-col items-center space-y-6 mt-12">
                {/* Progress bar */}
                <div className="w-80 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent animate-gradient-x rounded-full"></div>
                </div>

                {/* Loading text */}
                <p className="text-slate-400 text-sm font-medium tracking-wider uppercase">
                  Initializing Experience...
                </p>

                {/* Premium action buttons skeleton */}
                <div className="flex gap-6 mt-8">
                  <div className="relative group">
                    <Skeleton className="h-14 w-40 rounded-full bg-slate-700/50" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 animate-pulse"></div>
                  </div>
                  <div className="relative group">
                    <Skeleton className="h-14 w-40 rounded-full bg-slate-700/50" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-secondary/20 to-brand-accent/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Footer */}
        <div className="relative py-8 px-6 border-t border-slate-700/50">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full animate-pulse"></div>
              <span className="text-slate-400 text-sm font-medium">DreamToApp</span>
            </div>
            <div className="text-slate-500 text-xs">
              Loading your digital experience...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 