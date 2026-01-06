import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export const GradientText = ({ children, className = '', animate = true }: GradientTextProps) => {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-white via-dark-200 to-dark-400 ${
        animate ? 'bg-[length:200%_auto] animate-gradient' : ''
      } ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.span>
  );
};

export const AccentGradientText = ({ children, className = '' }: GradientTextProps) => {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-[length:200%_auto] animate-gradient ${className}`}
    >
      {children}
    </span>
  );
};
