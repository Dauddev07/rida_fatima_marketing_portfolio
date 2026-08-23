import { useEffect, useRef, useState } from 'react';
import FadeIn from '../components/FadeIn';
import { brandRow1, brandRow2, brands, type Brand } from '../data/brands';

function tripled(items: Brand[]) {
  return [...items, ...items, ...items];
}

interface MarqueeRowProps {
  images: Brand[];
  offset: number;
  direction: 1 | -1;
}

const TILE_WIDTH = 420;
const TILE_GAP = 12;
const TILE_PITCH = TILE_WIDTH + TILE_GAP;

function MarqueeRow({ images, offset, direction }: MarqueeRowProps) {
  const setWidth = images.length * TILE_PITCH;

  // Scroll-driven position, wrapped with modulo so it cycles through every
  // tile continuously regardless of how far the page actually scrolls.
  const raw = direction === 1 ? offset - 200 : -(offset - 200);
  const wrapped = ((raw % setWidth) + setWidth) % setWidth;
  const scrollX = direction === 1 ? wrapped - setWidth : -wrapped;

  // A sideways scroll gesture (horizontal trackpad swipe, shift+wheel) nudges
  // this row directly. It stays wherever it's left -- there's no snap-back;
  // it just keeps riding the ambient scroll-driven motion from that point on.
  const [manualOffset, setManualOffset] = useState(0);
  // The wheel listener lives on this OUTER, never-transformed wrapper --
  // not on the sliding row itself. A transformed element's hit-test box
  // moves with it, so once the row had slid far enough, the cursor (which
  // stays put on screen) would fall off its bounding box and stop
  // receiving wheel events entirely -- which is exactly what "gets stuck"
  // looked like. The wrapper's box never moves, so it always stays under
  // the cursor.
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // A vertical scroll gesture (normal up/down wheel or trackpad scroll)
      // must NOT be captured here -- let it fall through and scroll the
      // page like normal. The page scroll is exactly what drives the
      // ambient forward/backward motion via the window scroll listener
      // below, which already loops infinitely and never stops on its own.
      // Only a genuine sideways gesture (a horizontal trackpad swipe, or
      // shift+wheel) should nudge this specific row.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      e.preventDefault();
      // Wrap with modulo instead of clamping -- so scrolling past the last
      // tile loops seamlessly back to the first one, in either direction,
      // forever, rather than hitting a dead stop at the end of the row.
      setManualOffset((prev) => {
        const next = prev - e.deltaX;
        return ((next % setWidth) + setWidth) % setWidth;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [setWidth]);

  // Touch devices never fire 'wheel' events at all, so the handler above
  // does nothing on a phone -- this is the touch equivalent. Same rule:
  // a mostly-vertical touch drag is left alone (normal page scroll), and
  // only a mostly-horizontal drag moves the row, following the finger.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let mode: 'horizontal' | 'vertical' | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      lastX = startX;
      mode = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];

      if (mode === null) {
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        mode = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
      }

      if (mode !== 'horizontal') return;

      e.preventDefault();
      const dx = touch.clientX - lastX;
      lastX = touch.clientX;
      setManualOffset((prev) => {
        const next = prev + dx;
        return ((next % setWidth) + setWidth) % setWidth;
      });
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [setWidth]);

  const translateX = scrollX + manualOffset;

  return (
    <div ref={wrapperRef} className="relative overflow-hidden" style={{ height: 270 }}>
      <div
        className="absolute left-0 top-0 flex gap-3"
        style={{
          willChange: 'transform',
          transform: `translateX(${translateX}px)`,
        }}
      >
        {tripled(images).map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="relative rounded-2xl overflow-hidden flex-shrink-0"
            style={{ width: TILE_WIDTH, height: 270 }}
          >
            <img
              src={brand.image}
              alt={brand.name}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(27,5,11,0) 55%, rgba(27,5,11,0.78) 100%)',
              }}
            />
            <span
              className="absolute bottom-4 left-5 uppercase tracking-wide text-lg"
              style={{ color: '#F6EBE3', fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const value = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(value);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-16"
      style={{ background: '#38101B', overflowX: 'clip' }}
    >
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight px-6 mb-3 text-[9vw] sm:text-[7vw] md:text-[5.5vw]">
          Brands I&apos;ve worked with
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={16}>
        <p
          className="text-center uppercase tracking-widest text-xs mb-14 sm:mb-16 md:mb-20"
          style={{ color: 'rgba(246,235,227,0.45)', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Swipe sideways over a row to browse
        </p>
      </FadeIn>

      <div className="flex flex-col gap-3">
        <MarqueeRow images={brandRow1} offset={offset} direction={1} />
        <MarqueeRow images={brandRow2} offset={offset} direction={-1} />
      </div>

      <div
        className="relative mt-16 sm:mt-20 border-t-2 border-b-2 py-5 sm:py-6 overflow-hidden"
        style={{
          borderColor: 'rgba(215,242,92,0.45)',
          background: 'rgba(215,242,92,0.06)',
          boxShadow: '0 0 24px rgba(215,242,92,0.12), inset 0 0 40px rgba(215,242,92,0.05)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex w-max gap-10 uppercase tracking-[0.2em] text-base sm:text-lg font-medium"
          style={{
            color: '#F6EBE3',
            fontFamily: "'JetBrains Mono', monospace",
            animation: 'rf-ticker 40s linear infinite',
          }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} className="flex items-center gap-10 flex-shrink-0">
              {brand.name}
              <span
                className="rounded-full flex-shrink-0"
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  background: '#D7F25C',
                  boxShadow: '0 0 8px rgba(215,242,92,0.9)',
                }}
              />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rf-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
