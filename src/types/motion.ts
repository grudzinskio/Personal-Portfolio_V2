import type { Variants } from 'framer-motion';

export type MotionVariants = Variants;

export type ScrollProgress = number; // 0 to 1

export interface AnimationConfig {
  ease: readonly [number, number, number, number];
  duration: number;
}
