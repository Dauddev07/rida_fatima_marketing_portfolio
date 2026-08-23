import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const NBSP = ' ';

function Char({ char, index, total, progress }: CharProps) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const display = char === ' ' ? NBSP : char;

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ visibility: 'hidden' }}>{display}</span>
      <motion.span
        style={{ position: 'absolute', left: 0, top: 0, opacity }}
        aria-hidden="true"
      >
        {display}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {characters.map((char, i) => (
        <Char
          key={i}
          char={char}
          index={i}
          total={characters.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
