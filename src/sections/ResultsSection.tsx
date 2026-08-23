import FadeIn from '../components/FadeIn';

interface Result {
  value: string;
  description: string;
  bg: string;
  text: string;
  valueColor?: string;
}

const results: Result[] = [
  {
    value: '300%',
    description: 'ROI on admissions campaigns through funnel and audience work.',
    bg: '#B5502E',
    text: '#0D0A08',
  },
  {
    value: '−35%',
    description: 'Cost per lead across Meta and Google, conversion quality held.',
    bg: '#C6A15B',
    text: '#0D0A08',
  },
  {
    value: '2×',
    description: 'Average engagement for international brands, inside one quarter.',
    bg: '#7C6A58',
    text: '#0D0A08',
  },
  {
    value: '+40%',
    description: 'Client conversion rate from landing page and funnel rebuilds.',
    bg: '#5B2333',
    text: '#F3EEE4',
  },
  {
    value: '90',
    description: 'Days to move an emerging brand into consistent inbound leads.',
    bg: '#F3EEE4',
    text: '#0D0A08',
  },
  {
    value: 'P.1',
    description: 'First-page rankings won on competitive keywords through outreach and authority links.',
    bg: '#0D0A08',
    text: '#F3EEE4',
    valueColor: '#C6A15B',
  },
];

export default function ResultsSection() {
  return (
    <section id="results" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
        >
          Results
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {results.map((result, i) => (
          <FadeIn key={result.value} delay={i * 0.08} y={30}>
            <div
              className="rounded-[28px] p-6 sm:p-8 h-full"
              style={{ background: result.bg }}
            >
              <div
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  color: result.valueColor ?? result.text,
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {result.value}
              </div>
              <p
                className="mt-4 leading-relaxed"
                style={{
                  color: result.text,
                  opacity: 0.75,
                  fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
                }}
              >
                {result.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
