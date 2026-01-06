import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ProjectCard } from '../components/ProjectCard';

const projects = [
  {
    title: 'Intelligent Search Engine',
    description: 'A high-performance search system with semantic understanding, real-time indexing, and ML-powered ranking algorithms.',
    tags: ['Python', 'Elasticsearch', 'ML', 'FastAPI'],
    link: '#',
    github: '#',
    accent: 'blue' as const,
  },
  {
    title: 'Data Pipeline Framework',
    description: 'Scalable ETL framework processing millions of records daily with automatic retry, monitoring, and alerting.',
    tags: ['Go', 'Apache Kafka', 'PostgreSQL', 'Docker'],
    link: '#',
    github: '#',
    accent: 'purple' as const,
  },
  {
    title: 'Real-time Analytics Dashboard',
    description: 'Interactive visualization platform with live data streaming, custom charts, and collaborative features.',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
    link: '#',
    github: '#',
    accent: 'pink' as const,
  },
  {
    title: 'API Gateway Service',
    description: 'Microservices gateway handling authentication, rate limiting, and request routing for distributed systems.',
    tags: ['Rust', 'gRPC', 'Redis', 'Kubernetes'],
    link: '#',
    github: '#',
    accent: 'cyan' as const,
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div id="projects" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 py-32">
      <div className="max-w-6xl w-full">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-accent-pink text-sm font-medium tracking-widest uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            A selection of systems I've designed and built, each solving unique challenges.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1 + index * 0.1,
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors group"
          >
            View all projects on GitHub
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};
