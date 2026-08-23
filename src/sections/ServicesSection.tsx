import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

interface Service {
  number: string;
  name: string;
  description: string;
}

const services: Service[] = [
  {
    number: '01',
    name: 'Social Media',
    description:
      'Channel strategy, calendars and creative direction that hold a voice steady across every platform — and grow it.',
  },
  {
    number: '02',
    name: 'Content & Copy',
    description:
      'Long-form, short-form, ad copy, scripts, landing pages. Words built to move a reader one step further.',
  },
  {
    number: '03',
    name: 'Brand Strategy',
    description:
      'Positioning, messaging architecture and tone — the decisions everything else gets built on top of.',
  },
  {
    number: '04',
    name: 'LinkedIn & Growth',
    description:
      'Founder ghostwriting, funnels and paid campaigns — authority first, pipeline right behind it.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#0D0A08' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
        >
          What I Do
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <motion.div
              className="group flex items-center gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 cursor-pointer"
              style={{
                borderTop:
                  i === 0 ? '1px solid rgba(243,238,228,0.15)' : undefined,
                borderBottom: '1px solid rgba(243,238,228,0.15)',
              }}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.span
                className="font-black leading-none flex-shrink-0"
                style={{
                  color: '#C6A15B',
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
                variants={{ rest: { x: 0 }, hover: { x: -8 } }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {service.number}
              </motion.span>

              <motion.div
                className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4 flex-1"
                variants={{ rest: { x: 0 }, hover: { x: 16 } }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3
                  className="font-medium uppercase"
                  style={{
                    color: '#F3EEE4',
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#F3EEE4',
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.65,
                  }}
                >
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
