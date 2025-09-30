'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  header?: string;
  subheader?: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  discountPercentage?: number;
  isActive: boolean;
}

interface HomepageHeroSliderProps {
  slides?: HeroSlide[];
  debug?: boolean;
}

export default function HomepageHeroSlider({ slides, debug: _debugUnused = false }: HomepageHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // debug removed

  const displaySlides = useMemo(() => (slides && slides.length > 0) ? slides : [], [slides]);
  const cleanSlides = useMemo(() => displaySlides.filter((s) => !!s?.imageUrl), [displaySlides]);
  const eagerAll = cleanSlides.length <= 5;

  // Do not fetch here; slides should come from props (server)

  useEffect(() => {
    if (!isAutoPlaying || cleanSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cleanSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, cleanSlides.length]);

  // Pause autoplay when slider is not visible to save CPU/GPU
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
        setIsAutoPlaying(true);
      } else {
        setIsAutoPlaying(false);
      }
    }, { threshold: [0, 0.2, 0.5, 1] });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const goToSlide = (index: number) => {
    setIsImageLoaded(false);
    setPreviousSlide(currentSlide);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    // Clean up after transition
    setTimeout(() => {
      setPreviousSlide(null);
      setIsTransitioning(false);
    }, 700);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (cleanSlides.length <= 1) return;
      if (e.key === 'ArrowLeft') goToSlide((currentSlide - 1 + cleanSlides.length) % cleanSlides.length);
      if (e.key === 'ArrowRight') goToSlide((currentSlide + 1) % cleanSlides.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, cleanSlides.length]);

  const currentSlideData = displaySlides[currentSlide];

  return (
    <section
      ref={(n) => { sectionRef.current = n; }}
      className="relative overflow-hidden rounded-2xl shadow-2xl will-change-transform"
      aria-label="Hero banner"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX == null) return;
        const delta = e.changedTouches[0].clientX - touchStartX;
        const threshold = 40;
        if (delta > threshold) goToSlide((currentSlide - 1 + cleanSlides.length) % cleanSlides.length);
        if (delta < -threshold) goToSlide((currentSlide + 1) % cleanSlides.length);
        setTouchStartX(null);
      }}
    >
      {/* Facebook cover guidelines: mobile 16:9, desktop ~820x312 (≈205:78). */}
      <div className="relative w-full aspect-[16/9] md:aspect-[205/78] min-h-[220px] overflow-hidden">
        {/* Official pattern: flex track + slides with min-w-full; translate by -currentSlide*100% */}
        {previousSlide === null ? (
          (() => {
            const slide = cleanSlides[currentSlide];
            const idx = currentSlide;
            if (!slide) {
              return (
                <div className="absolute inset-0 bg-slate-800/60 flex items-center justify-center text-white text-sm">لا توجد شرائح صالحة للعرض</div>
              );
            }
            return (
              <>
                {failed[idx] ? (
                  <div className="absolute inset-0 bg-slate-800/60 flex items-center justify-center text-white text-sm">الصورة غير متاحة</div>
                ) : (
                  <Image
                    key={slide.id ?? idx}
                    src={slide.imageUrl}
                    alt={'Hero Slide'}
                    fill
                    className={`object-cover transition-opacity duration-500 opacity-100`}
                    priority
                    decoding="async"
                    quality={85}
                    sizes="100vw"
                    onLoad={() => { setIsImageLoaded(true); }}
                    onError={() => { setFailed((p) => ({ ...p, [idx]: true })); }}
                    placeholder="empty"
                  />
                )}
                <div className="absolute inset-0 bg-black/20" />

              </>
            );
          })()
        ) : (
          // Two-frame sliding track: previous -> current
          <div
            className="absolute inset-0 flex h-full transition-transform duration-700 ease-in-out will-change-transform"
            style={{ width: '200%', transform: isTransitioning ? 'translateX(-100%)' : 'translateX(0%)' }}
          >
            {[previousSlide, currentSlide].map((idx, localIdx) => {
              const slide = cleanSlides[idx];
              return (
                <div key={`${slide?.id ?? idx}-${localIdx}`} className="relative h-full flex-none w-full">
                  {slide && !failed[idx] ? (
                    <Image
                      src={slide.imageUrl}
                      alt={'Hero Slide'}
                      fill
                      className={`object-cover`}
                      priority={localIdx === 1}
                      decoding="async"
                      quality={85}
                      sizes="100vw"
                      onLoad={() => { if (localIdx === 1) setIsImageLoaded(true); }}
                      onError={() => { setFailed((p) => ({ ...p, [idx]: true })); }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-800/60 flex items-center justify-center text-white text-sm">الصورة غير متاحة</div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />

                </div>
              );
            })}
          </div>
        )}
        {/* Offscreen preload of next image */}
        {cleanSlides.length > 1 && (() => {
          const nextIdx = (currentSlide + 1) % cleanSlides.length;
          const next = cleanSlides[nextIdx];
          if (!next || failed[nextIdx]) return null;
          return (
            <div style={{ position: 'absolute', width: 1, height: 1, left: -9999, top: -9999 }}>
              <Image
                src={next.imageUrl}
                alt="preload"
                fill
                sizes="1px"
                priority={false}
                onError={() => setFailed((p) => ({ ...p, [nextIdx]: true }))}
              />
            </div>
          );
        })()}
        {/* Progress bar */}
        {cleanSlides.length > 1 && (
          <div key={currentSlide} className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-10">
            <div className="h-full bg-white/80 animate-[progress_5s_linear_forwards]" />
          </div>
        )}
        {/* No CTA/hints overlay; keep only navigation controls below */}

        {cleanSlides.length > 1 && (
          <>
            <button
              onClick={() => goToSlide((currentSlide - 1 + cleanSlides.length) % cleanSlides.length)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="الشريحة السابقة"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <button
              onClick={() => goToSlide((currentSlide + 1) % cleanSlides.length)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="الشريحة التالية"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {cleanSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 min-h-[32px] min-w-[32px] flex items-center justify-center ${index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                    }`}
                  aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                >
                  <span className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-transparent'}`} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Keyframes for progress bar */}
      <style>{`@keyframes progress{from{transform:translateX(-100%)}to{transform:translateX(0)}} .animate-[progress_5s_linear_forwards]{animation:progress 5s linear forwards}`}</style>
    </section>
  );
}
