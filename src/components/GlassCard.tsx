import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'blue' | 'purple' | 'pink' | 'none';
}

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = 'none',
  ...props 
}: GlassCardProps) => {
  const glowStyles = {
    blue: 'hover:shadow-[0_0_60px_-15px_rgba(0,112,243,0.3)]',
    purple: 'hover:shadow-[0_0_60px_-15px_rgba(121,40,202,0.3)]',
    pink: 'hover:shadow-[0_0_60px_-15px_rgba(255,0,128,0.3)]',
    none: '',
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        ${hover ? 'transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12]' : ''}
        ${hover ? 'hover:-translate-y-1' : ''}
        ${glowStyles[glow]}
        ${className}
      `}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
