import { useEffect, useRef, type RefObject } from 'react';
import FadeIn from '../components/FadeIn';
import { brandRow1, brandRow2, brands, type Brand } from '../data/brands';

function tripled(items: Brand[]) {
  return [...items, ...items, ...items];
}

interface MarqueeRowProps {
  images: Brand[];
  direction: 1 | -1;
  sectionRef: RefObject<HTMLElement | null>;
}

const TILE_WIDTH = 420;
const TILE_GAP = 12;
const TILE_PITCH = TILE_WIDTH + TILE_GAP;

function MarqueeRow({ images, direction, sectionRef }: MarqueeRowProps) {
  const setWidth = images.length * TILE_PITCH;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Everything here writes straight to the DOM via refs instead of going
  // through React state. Both the ambient scroll-driven motion (which reads
  // window scroll on every 'scroll' event -- and on a phone, momentum
  // scrolling can fire dozens of those a second) and the manual drag (which
  // reads touchmove -- similarly high-frequency) were previously calling
  // setState on every single event, forcing a full React re-render each
  // time. Desktop CPUs hide that cost; phones don't, which is what made the
  // motion feel stuttery on mobile. Refs skip React's render cycle entirely,
  // so updates are as cheap as a plain style write.
  const scrollXRef = useRef(0);
  const manualOffsetRef = useRef(0);

  const applyTransform = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${scrollXRef.current + manualOffsetRef.current}px)`;
    }
  };

  useEffect(() => {
    const computeScrollX = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;
      const sectionTop = sectionEl.getBoundingClientRect().top + window.scrollY;
      const rawOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      const raw = direction === 1 ? rawOffset - 200 : -(rawOffset - 200);
      const wrapped = ((raw % setWidth) + setWidth) % setWidth;
      scrollXRef.current = direction === 1 ? wrapped - setWidth : -wrapped;
      applyTransform();
    };

    computeScrollX();
    window.addEventListener('scroll', computeScrollX, { passive: true });
    return () => window.removeEventListener('scroll', computeScrollX);
  }, [direction, setWidth, sectionRef]);

  const applyDelta = (delta: number) => {
    manualOffsetRef.current = ((manualOffsetRef.current + delta) % setWidth + setWidth) % setWidth;
    applyTransform();
  };

  // A trackpad/mouse wheel keeps sending small, decaying deltaX events on
  // its own after one swipe (that's OS-level momentum), which is why
  // desktop already glides to a stop. Touch gives us nothing after
  // touchend -- since we preventDefault() on touchmove to claim the
  // gesture, we also throw away any native scroll inertia -- so a swipe
  // just stops dead the instant the finger lifts. This replays the same
  // feel manually: track velocity while dragging, then keep applying it
  // with exponential decay after release until it's imperceptible.
  const velocityRef = useRef(0);
  const momentumFrameRef = useRef<number | null>(null);

  const stopMomentum = () => {
    if (momentumFrameRef.current !== null) {
      cancelAnimationFrame(momentumFrameRef.current);
      momentumFrameRef.current = null;
    }
  };

  const startMomentum = () => {
    stopMomentum();
    let lastTs = 0;
    const FRICTION_PER_16MS = 0.94;
    const step = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;
      velocityRef.current *= Math.pow(FRICTION_PER_16MS, dt / 16.67);
      if (Math.abs(velocityRef.current) < 0.02) {
        momentumFrameRef.current = null;
        return;
      }
      applyDelta(velocityRef.current * dt);
      momentumFrameRef.current = requestAnimationFrame(step);
    };
    momentumFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // A vertical scroll gesture (normal up/down wheel or trackpad scroll)
    // must NOT be captured here -- let it fall through and scroll the page
    // like normal, which is exactly what drives the ambient motion above.
    // Only a genuine sideways gesture nudges this specific row.
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      stopMomentum();
      e.preventDefault();
      applyDelta(-e.deltaX);
    };

    // Touch devices never fire 'wheel' events at all -- this is the touch
    // equivalent, using the same left-alone-unless-sideways rule.
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastMoveTs = 0;
    let mode: 'horizontal' | 'vertical' | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      stopMomentum();
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      lastX = startX;
      lastMoveTs = e.timeStamp;
      velocityRef.current = 0;
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
      const dt = e.timeStamp - lastMoveTs;
      lastX = touch.clientX;
      lastMoveTs = e.timeStamp;
      if (dt > 0) velocityRef.current = dx / dt;
      applyDelta(dx);
    };

    const handleTouchEnd = () => {
      if (mode === 'horizontal' && Math.abs(velocityRef.current) > 0.02) {
        startMomentum();
      }
      mode = null;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
      stopMomentum();
    };
  }, [setWidth]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden" style={{ height: 270 }}>
      <div
        ref={innerRef}
        className="absolute left-0 top-0 flex gap-3"
        style={{ willChange: 'transform', transform: 'translateX(0px)' }}
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
                  'linear-gradient(180deg, rgba(13,10,8,0) 55%, rgba(13,10,8,0.78) 100%)',
              }}
            />
            <span
              className="absolute bottom-4 left-5 uppercase tracking-wide text-lg"
              style={{ color: '#F3EEE4', fontFamily: "'Playfair Display', Georgia, serif" }}
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

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-16"
      style={{ background: '#15110D', overflowX: 'clip' }}
    >
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight px-6 mb-3 text-[9vw] sm:text-[7vw] md:text-[5.5vw]">
          Brands I&apos;ve worked with
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={16}>
        <p
          className="text-center uppercase tracking-widest text-xs mb-14 sm:mb-16 md:mb-20"
          style={{ color: 'rgba(243,238,228,0.45)', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Swipe sideways over a row to browse
        </p>
      </FadeIn>

      <div className="flex flex-col gap-3">
        <MarqueeRow images={brandRow1} direction={1} sectionRef={sectionRef} />
        <MarqueeRow images={brandRow2} direction={-1} sectionRef={sectionRef} />
      </div>

      <div
        className="relative mt-16 sm:mt-20 border-t-2 border-b-2 py-5 sm:py-6 overflow-hidden"
        style={{
          borderColor: 'rgba(198,161,91,0.45)',
          background: 'rgba(198,161,91,0.06)',
          boxShadow: '0 0 24px rgba(198,161,91,0.12), inset 0 0 40px rgba(198,161,91,0.05)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex w-max gap-10 uppercase tracking-[0.2em] text-base sm:text-lg font-medium"
          style={{
            color: '#F3EEE4',
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
                  background: '#C6A15B',
                  boxShadow: '0 0 8px rgba(198,161,91,0.9)',
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
