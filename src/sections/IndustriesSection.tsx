import FadeIn from '../components/FadeIn';

const industries = [
  'Real Estate',
  'Marketing',
  'Advertising',
  'Fashion',
  'Technology',
  'Automotive',
  'EV',
  'Healthcare',
  'Education',
  'Hospitality',
  'Engineering',
  'B2B',
];

const stats = [
  '12 industries',
  '3 continents',
  '15+ brands',
  '8 years',
  'remote-first',
  'strategy → copy → campaign',
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 sm:py-24 md:py-28 overflow-hidden">
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight px-6 mb-12 sm:mb-16"
          style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
        >
          Industries
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-3 px-4 sm:px-6">
          {industries.map((tag) => (
            <span
              key={tag}
              className="rounded-full border whitespace-nowrap px-3.5 py-2 sm:px-6 sm:py-3 text-xs sm:text-base transition-colors duration-300 hover:bg-[#D7F25C] hover:text-[#1B050B]"
              style={{ borderColor: 'rgba(246,235,227,0.4)', color: '#F6EBE3' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </FadeIn>

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
            animation: 'rf-ticker-industries 18s linear infinite',
          }}
        >
          {[...stats, ...stats].map((stat, i) => (
            <span key={i} className="flex items-center gap-10 flex-shrink-0">
              {stat}
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
        @keyframes rf-ticker-industries {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
