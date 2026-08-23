import { useEffect, useState } from 'react';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';

export default function HeroSection() {
  // The header is sticky and lives outside this section (so it stays put on
  // every section, not just the hero) -- which means it takes up real space
  // above the hero rather than overlaying it. To make the hero fill exactly
  // the rest of the first screen (no more, no less, and nothing else
  // peeking in), we measure the header's actual rendered height and size
  // the hero to the remainder. A ResizeObserver keeps it correct if the
  // header's height ever changes (e.g. the mobile menu opening).
  const [heroMinHeight, setHeroMinHeight] = useState('100dvh');

  useEffect(() => {
    const headerEl = document.querySelector('header');
    if (!headerEl) return;

    const updateHeight = () => {
      const headerHeight = headerEl.getBoundingClientRect().height;
      setHeroMinHeight(`calc(100dvh - ${headerHeight}px)`);
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(headerEl);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex flex-col"
      style={{ overflowX: 'clip', minHeight: heroMinHeight }}
    >
      <div className="overflow-hidden mt-10 sm:mt-8 md:mt-6">
        <FadeIn delay={0.1} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.95] w-full text-center text-[13vw] sm:text-[10vw] md:text-[9vw] lg:text-[8.5vw]">
            Strategy that
            <br />
            sells the story
          </h1>
        </FadeIn>
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <FadeIn delay={0.5} y={30}>
          <Magnet padding={150} strength={4}>
            <div
              className="rounded-full flex items-center justify-center text-center w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px]"
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(181,80,46,0.45), rgba(13,10,8,0.9) 72%)',
                border: '2px solid rgba(198,161,91,0.55)',
                boxShadow: '0 0 60px rgba(181,80,46,0.18)',
              }}
            >
              <span className="hero-heading font-black uppercase text-5xl sm:text-6xl md:text-7xl">
                R.
              </span>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      <div className="flex px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.3} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[220px] sm:max-w-[320px] md:max-w-[420px]"
            style={{ color: '#F3EEE4', fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Eight years building brands people actually remember — social,
            content and campaigns across twelve industries and three
            continents.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
