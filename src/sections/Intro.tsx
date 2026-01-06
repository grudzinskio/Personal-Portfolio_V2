import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const Intro = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center px-6 md:px-8 relative"
    >
      {/* Glow effect behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-radial from-accent-blue/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      
      {/* Greeting */}
      <motion.p
        variants={itemVariants}
        className="text-dark-400 text-lg md:text-xl mb-4 font-light tracking-wide"
      >
        Hello, I'm
      </motion.p>

      {/* Name with gradient */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight tracking-tight mb-6"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-dark-300">
          Oliver Grudzinski
        </span>
      </motion.h1>

      {/* Subtitle / Role */}
      <motion.p
        variants={itemVariants}
        className="text-xl md:text-2xl text-dark-300 font-light mb-8"
      >
        Building systems that{' '}
        <span className="text-white font-normal">make sense</span>
      </motion.p>

      {/* Short description */}
      <motion.p
        variants={itemVariants}
        className="text-dark-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12"
      >
        Software engineer focused on elegant solutions, 
        scalable architecture, and thoughtful design.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative px-8 py-3 bg-white text-dark-950 font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">View Projects</span>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
        
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-3 text-dark-200 font-medium rounded-lg border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get in Touch
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute -bottom-32 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-dark-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
