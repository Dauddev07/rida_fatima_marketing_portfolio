import { ArrowUp, Instagram, Linkedin, Mail } from 'lucide-react';
import FadeIn from './FadeIn';

const NAV_LINKS = [
  { label: 'Brands', href: '#brands' },
  { label: 'What I Do', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Results', href: '#results' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: Mail, href: 'mailto:rida.fatemah29@gmail.com', label: 'Email' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0D0A08', borderTop: '1px solid rgba(243,238,228,0.12)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 sm:py-16">
        <FadeIn delay={0} y={20}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            <div className="flex flex-col gap-3 max-w-xs">
              <a
                href="#top"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#F3EEE4' }}
              >
                Rida Fatima<span style={{ color: '#C6A15B' }}>.</span>
              </a>
              <p style={{ color: 'rgba(243,238,228,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Marketing strategist and copywriter, building brands people
                actually remember.
              </p>
            </div>

            <nav className="flex flex-col gap-2">
              <span
                className="uppercase tracking-widest text-xs mb-1"
                style={{ color: 'rgba(243,238,228,0.4)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                Explore
              </span>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: '#F3EEE4', fontSize: '0.95rem' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col items-start md:items-end gap-5">
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center rounded-full transition-colors duration-200"
                    style={{ width: 42, height: 42, border: '1px solid rgba(243,238,228,0.25)', color: '#F3EEE4' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#C6A15B';
                      e.currentTarget.style.color = '#0D0A08';
                      e.currentTarget.style.borderColor = '#C6A15B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#F3EEE4';
                      e.currentTarget.style.borderColor = 'rgba(243,238,228,0.25)';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              <a
                href="#top"
                className="flex items-center gap-2 uppercase tracking-widest text-xs transition-opacity hover:opacity-70"
                style={{ color: 'rgba(243,238,228,0.6)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                <ArrowUp size={14} />
                Back to top
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <div
            className="flex flex-wrap justify-between gap-4 mt-12 pt-6 uppercase tracking-widest text-xs border-t"
            style={{ color: 'rgba(243,238,228,0.4)', borderColor: 'rgba(243,238,228,0.12)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span>© 2026 Rida Fatima</span>
            <span>Marketing strategist · Content · Brand</span>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
