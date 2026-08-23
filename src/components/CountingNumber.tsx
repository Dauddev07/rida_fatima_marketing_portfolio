import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useInView, animate } from 'framer-motion';

interface CountingNumberProps {
  value: string;
  className?: string;
  style?: CSSProperties;
  duration?: number;
}

// Splits "−35%" / "+40%" / "2×" / "300%" / "90" into a sign, a counted
// integer, and a trailing unit -- non-numeric values like "P.1" pass through
// untouched.
const VALUE_PATTERN = /^([−+]?)(\d+)(.*)$/;

export default function CountingNumber({ value, className, style, duration = 1.6 }: CountingNumberProps) {
  const match = value.match(VALUE_PATTERN);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match || !isInView) return;
    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits, 10);
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(`${prefix}${Math.round(latest)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div ref={ref} className={className} style={style}>
      {display}
    </div>
  );
}
