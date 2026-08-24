import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Fade-and-rise wrapper. Plays once, the first time the element scrolls into view. */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.8, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
