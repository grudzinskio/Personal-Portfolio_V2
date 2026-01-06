import { motion } from 'framer-motion';

/**
 * NavigationPanels - Cool interactive navigation cards
 * Modern, clickable panels with hover effects and animations
 */

interface Panel {
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
}

export const NavigationPanels = () => {
  const panels: Panel[] = [
    {
      title: 'About',
      description: 'Learn about my journey, education, and expertise',
      icon: '👤',
      href: '#about',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'Skills',
      description: 'Explore my technical skills and proficiencies',
      icon: '✨',
      href: '#systems',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Projects',
      description: 'View my portfolio of work and achievements',
      icon: '💼',
      href: '#projects',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
    {
      title: 'Contact',
      description: "Let's connect and build something amazing",
      icon: '📧',
      href: '#contact',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Explore
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">More</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto px-4">
            Discover more about my work, skills, and how we can collaborate
          </p>
        </motion.div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {panels.map((panel, index) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={panel.href} onClick={(e) => scrollToSection(e, panel.href)}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-full group"
                >
                  {/* Card with glassmorphism */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:border-accent-blue/50">
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="inline-flex bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 text-3xl sm:text-4xl">
                        {panel.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent-blue transition-colors">
                        {panel.title}
                      </h3>

                      {/* Description */}
                      <p className="text-dark-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                        {panel.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="relative z-10 flex items-center text-accent-blue font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Explore</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>

                    {/* Bottom gradient accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavigationPanels;
