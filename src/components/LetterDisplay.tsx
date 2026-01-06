/**
 * LetterDisplay - Individual letter rendering for GSAP animations
 * Each letter gets the 'letter' class for scroll-triggered animations
 */

interface LetterDisplayProps {
  word: string;
  colorClass: string;
}

export function LetterDisplay({ word, colorClass }: LetterDisplayProps) {
  const letters = word.split('');

  return (
    <>
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`letter inline-block ${colorClass} text-5xl md:text-7xl lg:text-8xl font-bold`}
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </>
  );
}

export default LetterDisplay;
