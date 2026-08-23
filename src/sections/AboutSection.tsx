import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';

// Reuses the same four decorative treatments from the hero's floating blobs
// -- her original brand accents, just relocated to frame the About section.
const BLOB_STYLES: React.CSSProperties[] = [
  { background: 'radial-gradient(circle at 35% 35%, #B5502E, #5B2333)' },
  { background: '#C6A15B' },
  { background: 'transparent', border: '2px solid #7C6A58' },
  { background: 'rgba(124,106,88,0.25)', filter: 'blur(6px)' },
];

function Blob({ style, variant }: { style: React.CSSProperties; variant: number }) {
  return <div className="absolute rounded-full" style={{ ...BLOB_STYLES[variant], ...style }} />;
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
      style={{ background: '#15110D' }}
    >
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[6%] left-[3%] sm:left-[5%] md:left-[8%] w-[90px] sm:w-[130px] md:w-[170px] aspect-square"
      >
        <Blob variant={0} style={{ width: '100%', height: '100%' }} />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[10%] left-[4%] sm:left-[7%] md:left-[11%] w-[70px] sm:w-[100px] md:w-[130px] aspect-square"
      >
        <Blob variant={1} style={{ width: '100%', height: '100%' }} />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[6%] right-[3%] sm:right-[5%] md:right-[8%] w-[90px] sm:w-[130px] md:w-[170px] aspect-square"
      >
        <Blob variant={2} style={{ width: '100%', height: '100%' }} />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[10%] right-[4%] sm:right-[7%] md:right-[11%] w-[100px] sm:w-[140px] md:w-[180px] aspect-square"
      >
        <Blob variant={3} style={{ width: '100%', height: '100%' }} />
      </FadeIn>

      <div className="relative flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-3xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <AnimatedText
            text="I started as a writer. That's still the advantage. Eight years in, I've written for switchgear manufacturers and restaurants, for education providers and NYC startups. The industries change; the job doesn't. Find what's actually true about a brand, say it in a way people want to hear, then put it where the right people are looking."
            className="text-center leading-relaxed max-w-[600px] font-medium"
            style={{ color: '#F3EEE4', fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <FadeIn delay={0.2} y={20}>
            <p
              className="text-center leading-relaxed max-w-[560px] font-light"
              style={{ color: 'rgba(243,238,228,0.7)', fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }}
            >
              I read English literature at Shah Abdul Latif University — two
              degrees in how language moves people. Turns out that's the
              whole discipline.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {[
                { label: 'Focus', value: 'Social, content and brand strategy' },
                { label: 'Work style', value: 'Remote, project or retainer' },
                { label: 'Study', value: 'MA English Literature, 2024' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl px-5 py-4 text-center sm:text-left"
                  style={{ background: '#F3EEE4' }}
                >
                  <div
                    className="uppercase tracking-widest text-xs"
                    style={{ color: '#5B2333', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: '#0D0A08' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4} y={20}>
            <span
              className="uppercase tracking-widest text-xs"
              style={{ color: 'rgba(243,238,228,0.5)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              Rida Fatima — Pakistan / Remote
            </span>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
