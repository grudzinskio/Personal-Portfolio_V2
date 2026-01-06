import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LetterDisplay } from './LetterDisplay';

gsap.registerPlugin(ScrollTrigger);

function getRandomRotation(): number {
  return Math.random() * 160 - 80;
}

function animateLettersOnScroll(containerRef: React.RefObject<HTMLDivElement>): gsap.core.Tween[] {
  const lettersContainer = containerRef.current;
  const letterElements = lettersContainer?.querySelectorAll('.letter');

  if (!letterElements || letterElements.length === 0) return [];

  const animations: gsap.core.Tween[] = [];

  letterElements.forEach((letter) => {
    const isSubtext = letter.closest('.subtext-container');
    
    // Randomize direction: 50% chance to go up, 50% to go down
    const verticalDirection = Math.random() > 0.5 ? 1 : -1;
    const blastDistance = Math.random() * 800 + 400;

    if (isSubtext) {
      // INITIAL STATE: Completely hidden and centered on the name's position
      gsap.set(letter, { y: 0, opacity: 0 });

      const anim = gsap.to(letter, {
        y: verticalDirection * blastDistance, 
        x: (Math.random() - 0.5) * 1200, // Wide horizontal scatter
        opacity: 1,
        rotation: getRandomRotation() * 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "15% top",
          scrub: 0.1, // Near-instant response
        },
      });
      animations.push(anim);
    } else {
      // THE NAME: Also scatters up and down for a chaotic "shattering" effect
      gsap.set(letter, { y: 0, opacity: 1 });

      const anim = gsap.to(letter, {
        y: -verticalDirection * blastDistance * 1.2, // Opposite direction of subtext for contrast
        x: (Math.random() - 0.5) * 800,
        opacity: 0,
        rotation: getRandomRotation(),
        ease: 'power2.out',
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "25% top",
          scrub: 0.2,
        },
      });
      animations.push(anim);
    }
  });

  return animations;
}

export function LetterCollision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeoutId = setTimeout(() => {
      animationsRef.current = animateLettersOnScroll(containerRef);
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      animationsRef.current.forEach(anim => {
        if (anim?.scrollTrigger) anim.scrollTrigger.kill();
        if (anim?.kill) anim.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-transparent">
      {/* Sticky wrapper keeps content centered in viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-end overflow-hidden pb-12 sm:pb-20 px-6 sm:px-12">
        
        {/* Container for everything at the bottom */}
        <div className="relative w-full">
          
          {/* THE NAME (Hero) */}
          <div className="hero-container relative z-20">
            <div className="flex flex-wrap items-center leading-none mb-3">
              <div className="text-4xl sm:text-5xl md:text-8xl font-normal text-white/80 flex">
                <LetterDisplay word="Hello, " colorClass="text-white/80" />
                <div className="w-3 md:w-6"></div>
                <LetterDisplay word="I'm" colorClass="text-white/80" />
              </div>
            </div>

            <div className="flex flex-wrap items-center leading-none">
              <div className="whitespace-nowrap text-4xl sm:text-6xl md:text-9xl font-bold text-white">
                <LetterDisplay word="Oliver" colorClass="text-white" />
              </div>
              <div className="w-4 md:w-12"></div>
              <div className="whitespace-nowrap text-4xl sm:text-6xl md:text-9xl font-bold">
                <LetterDisplay 
                  word="Grudzinski" 
                  colorClass="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-400" 
                />
              </div>
            </div>
          </div>

          {/* SUBTEXT (The hidden scramble letters) */}
          {/* Absolute positioning with 'top-0' ensures it is overlaid exactly on the hero text */}
          <div className="subtext-container absolute top-0 left-0 w-full flex flex-wrap gap-4 pointer-events-none z-10">
            <LetterDisplay word="building " colorClass="text-zinc-500" />
            <LetterDisplay word="innovative " colorClass="text-zinc-500" />
            <LetterDisplay word="solutions" colorClass="text-zinc-500" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default LetterCollision;