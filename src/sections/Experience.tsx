import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '../components/GlassCard';

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  index: number;
}

const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading development of distributed systems and ML infrastructure. Architecting scalable solutions that handle millions of requests daily.',
    technologies: ['Python', 'Go', 'Kubernetes', 'TensorFlow'],
  },
  {
    role: 'Software Engineer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Built core backend services and data pipelines. Implemented real-time analytics and improved system reliability by 40%.',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    role: 'Junior Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: 'Developed full-stack web applications and contributed to open-source projects. Focused on performance optimization and accessibility.',
    technologies: ['React', 'Python', 'Docker', 'Redis'],
  },
];

const ExperienceItem = ({ role, company, period, description, technologies, index }: ExperienceItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15,
      }}
      className="relative"
    >
      <GlassCard className="p-8" hover={true}>
        {/* Period badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-medium mb-4">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {period}
        </div>

        {/* Role & Company */}
        <h3 className="text-xl font-medium text-white mb-1">{role}</h3>
        <p className="text-dark-400 mb-4">{company}</p>

        {/* Description */}
        <p className="text-dark-300 text-sm leading-relaxed mb-6">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono text-dark-300 bg-white/5 rounded-md border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div id="experience" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 py-32">
      <div className="max-w-4xl w-full">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-accent-cyan text-sm font-medium tracking-widest uppercase mb-4">
            Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Experience
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Building expertise through challenging problems and meaningful projects.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-purple/50 to-accent-pink/50 hidden md:block" />

          {/* Experience items */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-dark-900 border-2 border-accent-blue" style={{ top: `${index * 33 + 10}%` }} />
                
                <ExperienceItem {...exp} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Skills summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-lg font-medium text-white mb-6">Core Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['TypeScript', 'Python', 'Go', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm text-dark-200 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
