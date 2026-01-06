import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#systems' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState('Home');
  
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const navGroupRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement>>({});

  const targetItem = hoveredItem || activeItem;

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 10);
    
    // Calculate scroll progress for fade out
    const maxScroll = window.innerHeight * 0.2;
    const currentScroll = latest;
    const progress = Math.min(currentScroll / maxScroll, 1);
    setScrollProgress(progress);
    
    // Update active section based on scroll position
    const sections = navItems.map(item => ({
      id: item.href.replace('#', ''),
      label: item.label
    }));
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i].id);
      if (section && latest >= section.offsetTop - 100) {
        setActiveItem(sections[i].label);
        break;
      }
    }
  });

  // Position moving bubble
  useEffect(() => {
    const moveBubble = () => {
      if (!navGroupRef.current || !bubbleRef.current) return;
      const link = linkRefs.current[targetItem];
      if (!link) return;
      const groupRect = navGroupRef.current.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      const top = rect.top - groupRect.top;
      const left = rect.left - groupRect.left;
      bubbleRef.current.style.opacity = '1';
      bubbleRef.current.style.transform = `translate(${left}px, ${top}px)`;
      bubbleRef.current.style.width = `${rect.width}px`;
      bubbleRef.current.style.height = `${rect.height}px`;
    };
    const id = requestAnimationFrame(moveBubble);
    return () => cancelAnimationFrame(id);
  }, [targetItem, activeItem]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate opacity based on scroll progress
  const navOpacity = 1 - scrollProgress;
  const navTransform = `translateY(-${scrollProgress * 10}px)`;
  
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: navOpacity }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-2 bg-dark-950/80 backdrop-blur-xl shadow-xl border-b border-white/5'
            : 'py-3 bg-dark-950/40 backdrop-blur-md border-b border-white/10'
        }`}
        style={{ 
          opacity: navOpacity,
          transform: navTransform,
          pointerEvents: scrollProgress > 0.9 ? 'none' : 'auto'
        }}
      >
        <div className="w-full relative flex items-center px-4 md:px-8">
          <motion.a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="text-lg font-medium text-white hover:text-dark-200 transition-colors p-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            OG
          </motion.a>

          {/* Desktop nav - centered */}
          <div
            ref={navGroupRef}
            onMouseLeave={() => setHoveredItem(null)}
            className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2"
          >
            {/* Moving highlight bubble */}
            <span
              ref={bubbleRef}
              className="absolute top-0 left-0 z-0 rounded-full bg-gradient-to-r from-accent-purple/30 to-accent-blue/20 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 ease-out pointer-events-none"
              style={{ opacity: 0, transform: 'translate(0,0)', width: 0, height: 0 }}
            />
            {navItems.map((item) => (
              <a
                key={item.label}
                ref={(el) => { if (el) linkRefs.current[item.label] = el; }}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onFocus={() => setHoveredItem(item.label)}
                onBlur={() => setHoveredItem(null)}
                className={`relative z-10 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  item.label === activeItem 
                    ? 'text-accent-purple' 
                    : 'text-dark-300 hover:text-white hover:scale-105'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile nav button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-3 text-white z-50 rounded-lg hover:bg-accent-purple/10 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-dark-950/95 backdrop-blur-lg z-50 flex md:hidden">
          <div className="relative m-auto w-[85%] max-w-sm rounded-3xl border border-white/10 bg-dark-900/95 p-8 shadow-2xl flex flex-col items-stretch">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute -top-4 -right-4 h-12 w-12 rounded-full border border-white/10 bg-dark-900 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col space-y-4 text-lg">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    scrollToSection(e, item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`px-6 py-4 rounded-xl transition-all duration-300 text-center font-medium ${
                    item.label === activeItem
                      ? 'bg-gradient-to-r from-accent-purple/30 to-accent-blue/20 text-accent-purple border border-accent-purple/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                      : 'text-white/80 hover:text-white border border-white/10 bg-dark-900/30 hover:bg-accent-purple/10 hover:border-accent-purple/30'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
