interface ContactButtonProps {
  label?: string;
  href?: string;
  compact?: boolean;
}

export default function ContactButton({
  label = 'Contact Me',
  href = 'mailto:rida.fatemah29@gmail.com',
  compact = false,
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={
        compact
          ? 'inline-block rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-xs font-medium uppercase tracking-widest text-[#1B050B] transition-transform duration-200 hover:-translate-y-0.5'
          : 'inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-[#1B050B] transition-transform duration-200 hover:-translate-y-0.5'
      }
      style={{
        background: 'linear-gradient(123deg, #8C1B2E 7%, #FF6B3D 37%, #B69CFF 72%, #D7F25C 100%)',
        boxShadow: '0px 4px 4px rgba(140,27,46,0.25), 4px 4px 12px rgba(215,242,92,0.35) inset',
        outline: '2px solid #F6EBE3',
        outlineOffset: '-3px',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {label}
    </a>
  );
}
