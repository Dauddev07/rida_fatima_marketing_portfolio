import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { workItems, type WorkItem } from '../data/work';

// Mirrors the original per-project palette from Rida's own portfolio -- each
// case study got its own bold accent color rather than one uniform card.
const CARD_THEMES = [
  { bg: '#0D0A08', text: '#F3EEE4', accent: '#C6A15B', border: 'rgba(243,238,228,0.3)' },
  { bg: '#7C6A58', text: '#0D0A08', accent: '#4A3D30', border: 'rgba(13,10,8,0.3)' },
  { bg: '#B5502E', text: '#0D0A08', accent: '#3D1A22', border: 'rgba(13,10,8,0.3)' },
  { bg: '#5B2333', text: '#F3EEE4', accent: '#C6A15B', border: 'rgba(243,238,228,0.3)' },
  { bg: '#0D0A08', text: '#F3EEE4', accent: '#7C6A58', border: 'rgba(243,238,228,0.3)' },
  { bg: '#F3EEE4', text: '#0D0A08', accent: '#8C3D22', border: 'rgba(13,10,8,0.3)' },
];

interface WorkCardProps {
  item: WorkItem;
  index: number;
  totalCards: number;
}

function WorkCard({ item, index, totalCards }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  return (
    <div
      ref={cardRef}
      className="sticky top-[calc(6rem+var(--stack-offset))] md:top-[calc(8rem+var(--stack-offset))] h-[70vh] sm:h-[60vh]"
      style={{ '--stack-offset': `${index * 22}px` } as CSSProperties}
    >
      <motion.div
        style={{ scale, background: theme.bg, borderColor: theme.border }}
        className="h-full rounded-[32px] sm:rounded-[44px] md:rounded-[56px] border-2 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-hidden"
      >
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span
                className="font-black leading-none"
                style={{ color: theme.text, fontSize: 'clamp(2.5rem, 7vw, 90px)', fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {item.number}
              </span>
              <span
                className="uppercase tracking-widest text-xs sm:text-sm"
                style={{ color: theme.accent, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.category}
              </span>
            </div>
            <h3
              className="font-medium mt-3 mb-4 leading-snug"
              style={{ color: theme.text, fontSize: 'clamp(1.15rem, 2.6vw, 2.1rem)', fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {item.name}
            </h3>
            <p
              className="font-light leading-relaxed max-w-md hidden sm:block"
              style={{ color: theme.text, opacity: 0.75, fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
            >
              {item.description}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap mt-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest"
                style={{ borderColor: theme.border, color: theme.text, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-[180px]">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover rounded-[24px] sm:rounded-[32px] md:rounded-[44px]"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section
      id="work"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#15110D' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
        >
          Selected Work
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-6">
        {workItems.map((item, i) => (
          <WorkCard key={item.number} item={item} index={i} totalCards={workItems.length} />
        ))}
      </div>
    </section>
  );
}
