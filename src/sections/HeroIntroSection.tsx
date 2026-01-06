import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutData from '../data/about.json';

// Optimized code snippets - reduced size for better performance
const codeSnippets = [
  `const buildTheFuture = async () => {
  const skills = ['React', 'Python', 'AI/ML'];
  const passion = 'Innovation';
  
  return skills.map(skill => 
    applyTo(skill, passion)
  );
};`,
  `function solveProblems(challenge) {
  const approach = analyze(challenge);
  const solution = design(approach);
  
  return implement(solution)
    .then(test)
    .then(deploy);
}`,
  `class Engineer {
  constructor() {
    this.skills = new Set();
    this.learning = true;
  }
  
  async grow() {
    while (this.learning) {
      await this.learn();
      await this.build();
      await this.share();
    }
  }
}`
];

export const HeroIntroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-16 sm:py-20 md:py-32">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple">Full Stack Engineer</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="block text-white">Crafting Digital</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">Experiences</span>
              </h2>
              
              <div className="h-1 w-20 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full" />
            </div>
            
            {/* Description */}
            <div className="space-y-4">
              {aboutData.personal.description.slice(0, 2).map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-sm sm:text-base md:text-lg text-dark-300 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple mb-1">3</div>
                <div className="text-xs sm:text-sm text-dark-400">Internships</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-pink mb-1">4+</div>
                <div className="text-xs sm:text-sm text-dark-400">Hackathon Placements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-pink to-accent-blue mb-1">7+</div>
                <div className="text-xs sm:text-sm text-dark-400">Years Coding</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column: Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <CodeEditorWindow />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Optimized Code Editor with better performance
const CodeEditorWindow = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(editorRef, { once: false, amount: 0.3 });

  useEffect(() => {
    // Only animate when in view
    if (!isInView) return;

    const currentSnippet = codeSnippets[currentSnippetIndex];
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (isTyping) {
      if (displayedCode.length < currentSnippet.length) {
        // Typing - faster speed
        timeoutRef.current = setTimeout(() => {
          setDisplayedCode(currentSnippet.slice(0, displayedCode.length + 1));
        }, 20);
      } else {
        // Finished typing, wait before clearing
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Clearing - faster speed
      if (displayedCode.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedCode(displayedCode.slice(0, -1));
        }, 10);
      } else {
        // Move to next snippet
        timeoutRef.current = setTimeout(() => {
          setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
          setIsTyping(true);
        }, 500);
      }
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedCode, isTyping, currentSnippetIndex, isInView]);

  // Simple syntax highlighting
  const renderCode = (code: string) => {
    return code.split('\n').map((line, lineIdx) => {
      // Basic keyword highlighting
      const highlighted = line
        .replace(/\b(const|let|var|function|class|async|await|return|if|else|while|for|new|this)\b/g, '<span class="text-blue-400">$1</span>')
        .replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green-400">$&</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');
      
      return (
        <div key={lineIdx} dangerouslySetInnerHTML={{ __html: highlighted }} />
      );
    });
  };

  return (
    <div ref={editorRef} className="bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] md:h-[600px] flex flex-col">
      {/* Window Header */}
      <div className="flex items-center gap-2 px-5 py-4 bg-black/20 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm text-dark-400 font-mono">code.js</span>
        </div>
      </div>
      
      {/* Code Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm md:text-base text-white/90 overflow-auto bg-black/5">
        <pre className="whitespace-pre-wrap m-0">
          <code className="text-zinc-300">
            {renderCode(displayedCode)}
            {isTyping && <span className="text-accent-blue animate-pulse">|</span>}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default HeroIntroSection;
