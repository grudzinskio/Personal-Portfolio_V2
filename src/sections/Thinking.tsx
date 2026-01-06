import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '../components/GlassCard';

interface ThinkingItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const thinkingItems = [
  {
    title: 'Problem',
    description: 'Every system starts with understanding the problem space. I identify constraints, edge cases, and the core requirements that will drive the architecture.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Approach',
    description: 'I design solutions that balance simplicity with extensibility. The approach must be clear, maintainable, and aligned with long-term goals.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Tradeoff',
    description: 'Every decision involves tradeoffs. I make them explicit, document the reasoning, and ensure the chosen path serves the system\'s purpose.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
];

const ThinkingItem = ({ title, description, icon, index }: ThinkingItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15,
      }}
    >
      <GlassCard
        className="p-8 h-full"
        glow={index === 0 ? 'blue' : index === 1 ? 'purple' : 'pink'}
      >
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${
          index === 0 ? 'bg-accent-blue/10 text-accent-blue' :
          index === 1 ? 'bg-accent-purple/10 text-accent-purple' :
          'bg-accent-pink/10 text-accent-pink'
        }`}>
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-medium text-white mb-4">{title}</h3>

        {/* Description */}
        <p className="text-dark-300 leading-relaxed">{description}</p>
      </GlassCard>
    </motion.div>
  );
};

export const Thinking = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div id="about" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 py-32">
      <div className="max-w-6xl w-full">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4">
            My Approach
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            How I Think
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            A systematic approach to building software that scales and endures.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {thinkingItems.map((item, index) => (
            <ThinkingItem
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
