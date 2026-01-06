import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * SlidingImages - Horizontal parallax image slider
 * Showcases featured projects with scroll-driven animation
 */
export const SlidingImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create horizontal slide effect - opposite directions
  const x1 = useTransform(scrollYProgress, [0, 1], ["-25%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);

  // Image sets for two rows
  const slider1Images = [
    { src: "/projects/CPAproject.jpg", alt: "AI CPA Project" },
    { src: "/projects/MARLProject.png", alt: "MARL Project" },
    { src: "/projects/QAProject.jpg", alt: "QA Assistant" },
    { src: "/projects/PhotoSynProject.png", alt: "Photosynthesizers" },
  ];

  const slider2Images = [
    { src: "/projects/DiabetesProject.png", alt: "Diabetes Prediction" },
    { src: "/projects/WordleProject.png", alt: "Wordle Game" },
    { src: "/projects/ActionsProject.png", alt: "Automated Documentation" },
    { src: "/projects/PersonalWebsite.png", alt: "Personal Website" },
  ];

  const handleImageClick = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative py-20 sm:py-24 md:py-32 overflow-x-hidden">
      <div className="mb-12 sm:mb-16 text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">Work</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
          Click any image to explore all projects
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* First sliding row - moves left */}
        <motion.div
          style={{ x: x1 }}
          className="flex gap-4 sm:gap-6 will-change-transform"
        >
          {slider1Images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] h-[210px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/50 transition-all cursor-pointer group relative bg-white/5 backdrop-blur-sm"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Duplicate for seamless loop effect */}
          {slider1Images.map((image, index) => (
            <motion.div
              key={`dup-${index}`}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] h-[210px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/50 transition-all cursor-pointer group relative bg-white/5 backdrop-blur-sm"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Second sliding row - moves right */}
        <motion.div
          style={{ x: x2 }}
          className="flex gap-4 sm:gap-6 will-change-transform"
        >
          {slider2Images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] h-[210px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/50 transition-all cursor-pointer group relative bg-white/5 backdrop-blur-sm"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Duplicate for seamless loop effect */}
          {slider2Images.map((image, index) => (
            <motion.div
              key={`dup-${index}`}
              whileHover={{ scale: 1.05, y: -8 }}
              className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] h-[210px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/50 transition-all cursor-pointer group relative bg-white/5 backdrop-blur-sm"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SlidingImages;
