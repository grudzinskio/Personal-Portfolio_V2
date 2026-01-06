import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SystemStageProps {
  label: string;
  description: string;
  index: number;
  isLast: boolean;
}

const stages = [
  { label: 'Input', description: 'Data ingestion and validation' },
  { label: 'Retrieval', description: 'Efficient data fetching strategies' },
  { label: 'Ranking', description: 'Intelligent sorting and prioritization' },
  { label: 'Reasoning', description: 'Logic and decision-making' },
  { label: 'Output', description: 'Clean, structured responses' },
];

const SystemStage = ({ label, description, index, isLast }: SystemStageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.1,
      }}
      className="relative flex items-start gap-6"
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className="relative"
        >
          <div className={`w-4 h-4 rounded-full border-2 ${
            isInView ? 'border-accent-blue bg-accent-blue/20' : 'border-dark-600 bg-dark-800'
          } transition-colors duration-500`} />
          {/* Glow */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.5, 0], scale: [1, 2] }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="absolute inset-0 rounded-full bg-accent-blue"
            />
          )}
        </motion.div>
        
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="w-px bg-gradient-to-b from-accent-blue/50 to-dark-700 flex-1 mt-2"
            style={{ minHeight: '60px' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-dark-500">0{index + 1}</span>
          <h3 className="text-xl md:text-2xl font-medium text-white">{label}</h3>
        </div>
        <p className="text-dark-400 text-sm md:text-base">{description}</p>
      </div>
    </motion.div>
  );
};

export const Systems = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 py-32">
      <div className="max-w-4xl w-full">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-accent-purple text-sm font-medium tracking-widest uppercase mb-4">
            Pipeline
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Systems I Build
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            From input to output, every stage is designed with purpose and precision.
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-dark-700 via-dark-800 to-transparent" />
          
          {/* Stages */}
          <div className="relative">
            {stages.map((stage, index) => (
              <SystemStage
                key={stage.label}
                label={stage.label}
                description={stage.description}
                index={index}
                isLast={index === stages.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Code-like decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-6 rounded-xl bg-dark-900/50 border border-white/5 font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <code className="text-dark-400">
            <span className="text-accent-purple">const</span>{' '}
            <span className="text-accent-blue">pipeline</span>{' '}
            <span className="text-dark-500">=</span>{' '}
            <span className="text-accent-pink">{'{'}</span>
            <br />
            <span className="text-dark-500 ml-4">input</span>
            <span className="text-dark-500">:</span>{' '}
            <span className="text-green-400">'validated'</span>,
            <br />
            <span className="text-dark-500 ml-4">processing</span>
            <span className="text-dark-500">:</span>{' '}
            <span className="text-green-400">'optimized'</span>,
            <br />
            <span className="text-dark-500 ml-4">output</span>
            <span className="text-dark-500">:</span>{' '}
            <span className="text-green-400">'reliable'</span>
            <br />
            <span className="text-accent-pink">{'}'}</span>;
          </code>
        </motion.div>
      </div>
    </div>
  );
};
