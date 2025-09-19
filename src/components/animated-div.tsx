
'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface AnimatedDivProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedDiv({ children, delay = 0, ...props }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
