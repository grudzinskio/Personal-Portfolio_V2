import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

export const LoopVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const isInView = useInView(containerRef, { margin: '-30%' });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.9]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {
        // Autoplay may be blocked, but that's okay
      });
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="min-h-[150vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center py-32 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="w-full max-w-5xl px-6 md:px-8"
        >
          {/* Video container with glow */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent-blue/20 via-accent-purple/20 to-accent-pink/20 blur-3xl opacity-50 rounded-3xl" />
            
            {/* Video wrapper */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-dark-900/50 backdrop-blur-sm">
              {/* Browser-like header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-dark-900/80 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="flex-1 mx-4">
                  <div className="max-w-md mx-auto px-4 py-1.5 bg-dark-800 rounded-md text-xs text-dark-400 text-center font-mono">
                    localhost:3000
                  </div>
                </div>
              </div>
              
              {/* Video */}
              <video
                ref={videoRef}
                src="/loop_video.mp4"
                muted
                loop
                playsInline
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center text-dark-500 text-sm mt-8"
          >
            Systems in action
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
