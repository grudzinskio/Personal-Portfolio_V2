import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Intro } from './sections/Intro';
import { Thinking } from './sections/Thinking';
import { Systems } from './sections/Systems';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { LoopVideo } from './sections/LoopVideo';
import { Contact } from './sections/Contact';

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Intro section animations
  const introScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  // Statement section animations
  const statementOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.18, 0.22], [0, 1, 1, 0]);
  const statementY = useTransform(scrollYProgress, [0.08, 0.14], [40, 0]);
  const statementScale = useTransform(scrollYProgress, [0.18, 0.22], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated Background */}
      <Background />

      {/* Navigation */}
      <Navbar />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Section 1: Intro Hero */}
      <section id="home" className="sticky top-0 h-screen flex items-center justify-center z-10">
        <motion.div
          style={{
            scale: introScale,
            opacity: introOpacity,
            y: introY,
          }}
          className="w-full"
        >
          <Intro />
        </motion.div>
      </section>

      {/* Spacer for intro scroll */}
      <div className="h-[50vh]" />

      {/* Section 2: Statement */}
      <section className="sticky top-0 h-screen flex items-center justify-center z-20">
        <motion.div
          style={{
            opacity: statementOpacity,
            y: statementY,
            scale: statementScale,
          }}
          className="text-center px-6 md:px-8 relative"
        >
          {/* Glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-gradient-radial from-accent-purple/10 via-transparent to-transparent blur-3xl pointer-events-none" />
          
          <p className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-white relative">
            I build systems that{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple">
              make sense
            </span>
            .
          </p>
        </motion.div>
      </section>

      {/* Spacer for statement scroll */}
      <div className="h-[50vh]" />

      {/* Section 3: Thinking */}
      <section className="relative z-20">
        <Thinking />
      </section>

      {/* Section 4: Systems */}
      <section className="relative z-20">
        <Systems />
      </section>

      {/* Section 5: Projects */}
      <section className="relative z-20">
        <Projects />
      </section>

      {/* Section 6: Experience */}
      <section className="relative z-20">
        <Experience />
      </section>

      {/* Section 7: Loop Video */}
      <section className="relative z-20">
        <LoopVideo />
      </section>

      {/* Section 8: Contact / Footer */}
      <section className="relative z-20">
        <Contact />
      </section>
    </div>
  );
};
