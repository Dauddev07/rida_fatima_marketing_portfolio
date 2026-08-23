import { motion } from 'framer-motion';
import type { ComponentType, ElementType, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: ElementType;
}

// motion.create() must NOT be called inside the component body -- it mints a
// brand-new component type every call. If a parent re-renders often (like
// MarqueeSection, which updates state on every scroll tick to drive the
// ambient motion), FadeIn would re-render too, calling motion.create() again
// each time. React then sees a different component type than last render,
// unmounts the old instance, and mounts a fresh one -- which resets Framer
// Motion's internal viewport-tracking state and replays the reveal animation
// from scratch. Caching one stable component per tag fixes it.
const motionComponentCache = new Map<ElementType, ComponentType<any>>();
function getMotionComponent(as: ElementType): ComponentType<any> {
  let Component = motionComponentCache.get(as);
  if (!Component) {
    Component = motion.create(as) as ComponentType<any>;
    motionComponentCache.set(as, Component);
  }
  return Component;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  as = 'div',
}: FadeInProps) {
  const MotionTag = getMotionComponent(as);

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
