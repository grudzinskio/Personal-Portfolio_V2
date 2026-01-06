import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  accent: 'blue' | 'purple' | 'pink' | 'cyan';
}

const accentColors = {
  blue: {
    bg: 'from-accent-blue/20 to-accent-blue/5',
    border: 'hover:border-accent-blue/30',
    text: 'text-accent-blue',
    glow: 'group-hover:shadow-[0_0_60px_-20px_rgba(0,112,243,0.4)]',
  },
  purple: {
    bg: 'from-accent-purple/20 to-accent-purple/5',
    border: 'hover:border-accent-purple/30',
    text: 'text-accent-purple',
    glow: 'group-hover:shadow-[0_0_60px_-20px_rgba(121,40,202,0.4)]',
  },
  pink: {
    bg: 'from-accent-pink/20 to-accent-pink/5',
    border: 'hover:border-accent-pink/30',
    text: 'text-accent-pink',
    glow: 'group-hover:shadow-[0_0_60px_-20px_rgba(255,0,128,0.4)]',
  },
  cyan: {
    bg: 'from-accent-cyan/20 to-accent-cyan/5',
    border: 'hover:border-accent-cyan/30',
    text: 'text-accent-cyan',
    glow: 'group-hover:shadow-[0_0_60px_-20px_rgba(0,223,216,0.4)]',
  },
};

export const ProjectCard = ({
  title,
  description,
  tags,
  link,
  github,
  accent,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = accentColors[accent];

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-2xl bg-dark-900/50 border border-white/[0.08] overflow-hidden transition-all duration-300 ${colors.border} ${colors.glow}`}
    >
      {/* Gradient overlay at top */}
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${colors.bg} opacity-50`} />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-shine bg-[length:200%_100%] animate-shine" />

      {/* Content */}
      <div className="relative p-8" style={{ transform: 'translateZ(20px)' }}>
        {/* Header with icon placeholder */}
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 ${colors.text} mb-6`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-medium text-white mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-dark-400 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono text-dark-300 bg-white/5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm ${colors.text} hover:underline`}
            >
              View Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
