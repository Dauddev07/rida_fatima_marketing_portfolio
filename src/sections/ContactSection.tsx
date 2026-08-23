import { Download, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'rida.fatemah29@gmail.com',
    href: 'mailto:rida.fatemah29@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 336 7353822',
    href: 'tel:+923367353822',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: '#',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: 'Follow on Instagram',
    href: '#',
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-36 overflow-hidden"
      style={{ background: '#1B050B' }}
    >
      <div
        className="absolute top-[-80px] right-[-40px] w-[320px] h-[320px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(255,107,61,0.4), rgba(140,27,46,0.2))',
          filter: 'blur(6px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <FadeIn delay={0} y={20}>
          <span
            className="inline-block rounded-full px-4 py-1.5 uppercase tracking-widest text-xs mb-8"
            style={{ background: '#D7F25C', color: '#1B050B', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Let&apos;s Connect
          </span>
        </FadeIn>

        <FadeIn delay={0.1} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)' }}
          >
            Let&apos;s make it
            <br />
            memorable.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14 sm:mt-16">
            {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-2xl px-6 py-5 transition-colors duration-200"
                style={{ border: '1px solid rgba(246,235,227,0.2)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(246,235,227,0.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 44, height: 44, background: 'rgba(215,242,92,0.15)' }}
                >
                  <Icon size={20} style={{ color: '#D7F25C' }} />
                </span>
                <span className="flex flex-col">
                  <span
                    className="uppercase tracking-widest text-xs"
                    style={{ color: 'rgba(246,235,227,0.5)', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {label}
                  </span>
                  <span style={{ color: '#F6EBE3', fontSize: '1.05rem' }}>{value}</span>
                </span>
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <a
            href="/uploads/resume.pdf"
            className="inline-flex items-center gap-3 rounded-full px-8 py-4 mt-8 uppercase tracking-widest text-sm transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(123deg, #8C1B2E 7%, #FF6B3D 37%, #B69CFF 72%, #D7F25C 100%)',
              color: '#1B050B',
              fontFamily: "'JetBrains Mono', monospace",
              boxShadow: '0px 4px 4px rgba(140,27,46,0.25), 4px 4px 12px rgba(215,242,92,0.35) inset',
              outline: '2px solid #F6EBE3',
              outlineOffset: '-3px',
            }}
          >
            <Download size={18} />
            Download CV
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
