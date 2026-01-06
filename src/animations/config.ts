// Easing curves
export const easeSlow = [0.25, 0.1, 0.25, 1] as const;
export const easeSmooth = [0.43, 0.13, 0.23, 0.96] as const;
export const easeBounce = [0.68, -0.55, 0.265, 1.55] as const;
export const easeOut = [0, 0, 0.2, 1] as const;

// Durations
export const durationSlow = 1.2;
export const durationMedium = 0.8;
export const durationFast = 0.4;

// Main animation config
export const animationConfig = {
  ease: easeSlow,
  duration: durationSlow,
} as const;

// Spring configurations
export const springConfig = {
  gentle: { stiffness: 120, damping: 14 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 260, damping: 20 },
  slow: { stiffness: 80, damping: 20 },
} as const;

// Stagger delays
export const staggerConfig = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// Viewport animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durationMedium,
      ease: easeSlow,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durationMedium,
      ease: easeSlow,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durationMedium,
      ease: easeSlow,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durationMedium,
      ease: easeSlow,
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durationMedium,
      ease: easeSlow,
    },
  },
};

// Container variants for staggered children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.normal,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.fast,
      delayChildren: 0.1,
    },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 },
};

export const tapScale = {
  scale: 0.98,
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: easeSlow },
};
