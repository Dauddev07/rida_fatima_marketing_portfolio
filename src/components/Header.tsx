import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const NAV_LINKS = [
  { label: 'Brands', href: '#brands' },
  { label: 'What I Do', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Results', href: '#results' },
  { label: 'About', href: '#about' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // The header is sticky, so anchor-jumping to a section (nav click, hash
  // link, "back to top") lands the section's top flush with the viewport
  // top -- which is exactly where the sticky header sits, cropping the
  // section's heading behind it. `scroll-padding-top` on <html> reserves
  // that space for anchor scrolling site-wide, so it needs to track the
  // header's actual (responsive) height.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const updateOffset = () => {
      document.documentElement.style.setProperty('--header-h', `${el.getBoundingClientRect().height}px`);
    };

    updateOffset();
    const resizeObserver = new ResizeObserver(updateOffset);
    resizeObserver.observe(el);
    window.addEventListener('resize', updateOffset);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateOffset);
    };
  }, [isMenuOpen]);

  return (
    <FadeIn delay={0} y={-20} as="header" ref={headerRef} className="sticky top-0 z-50">
      <div
        className="flex items-center justify-between gap-4 px-6 md:px-10 py-4 md:py-5"
        style={{
          background: 'rgba(13,10,8,0.72)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(243,238,228,0.12)',
        }}
      >
        <a
          href="#top"
          className="flex-shrink-0"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.4rem', color: '#F3EEE4' }}
        >
          Rida Fatima
          <span
            style={{
              color: '#C6A15B',
              animation: 'rf-blink 2.6s ease-in-out infinite',
              display: 'inline-block',
            }}
          >
            .
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative uppercase tracking-wider text-sm pb-1"
              style={{ color: 'rgba(243,238,228,0.72)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {link.label}
              <span
                className="absolute left-0 bottom-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ background: '#C6A15B' }}
              />
            </a>
          ))}
        </nav>

        <div className="hidden xs:block">
          <ContactButton label="Work With Me" href="#contact" compact />
        </div>

        <button
          type="button"
          className="flex xs:hidden items-center justify-center rounded-full flex-shrink-0"
          style={{ width: 40, height: 40, border: '1px solid rgba(243,238,228,0.3)', color: '#F3EEE4' }}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className="hidden xs:flex md:hidden gap-6 overflow-x-auto px-6 py-3"
        style={{
          background: 'rgba(13,10,8,0.72)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(243,238,228,0.12)',
          scrollbarWidth: 'none',
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex-shrink-0 uppercase tracking-wider text-xs whitespace-nowrap"
            style={{ color: 'rgba(243,238,228,0.72)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {isMenuOpen && (
        <div
          className="xs:hidden flex flex-col gap-1 px-6 py-4"
          style={{
            background: 'rgba(13,10,8,0.95)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(243,238,228,0.12)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-2.5 uppercase tracking-wider text-sm"
              style={{ color: '#F3EEE4', fontFamily: "'JetBrains Mono', monospace" }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <ContactButton label="Work With Me" href="#contact" compact />
          </div>
        </div>
      )}

      <style>{`
        @keyframes rf-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </FadeIn>
  );
}
