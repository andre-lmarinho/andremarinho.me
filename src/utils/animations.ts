import type { MotionProps } from 'framer-motion';

export type AnimationProps = Pick<
  MotionProps,
  'initial' | 'animate' | 'whileInView' | 'variants' | 'transition' | 'viewport'
>;

export const animations = {
  // Header
  HeaderImage: (reduce: boolean): AnimationProps => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: -8 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, x: 0 },
    transition: { duration: reduce ? 0.15 : 0.18 },
  }),
  DarkModeButton: (reduce: boolean): AnimationProps => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: -8 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: [0, -1, 0] },
    transition: { duration: reduce ? 0.15 : 0.18 },
  }),

  // Hero
  H1: (reduce: boolean): AnimationProps => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.15 : 0.22 },
  }),
  HeroParagraphContainer: (reduce: boolean): AnimationProps => ({
    initial: 'hidden',
    animate: 'visible',
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: reduce ? 0 : 0.04 } },
    },
  }),
  HeroParagraph: (reduce: boolean): AnimationProps => ({
    variants: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    transition: { duration: reduce ? 0.15 : 0.2 },
  }),
  HeroImage: (reduce: boolean): AnimationProps => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: -10, filter: 'blur(4px)' },
    animate: reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: reduce ? 0.15 : 0.4 },
  }),

  // Projects
  H2: (reduce: boolean): AnimationProps => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: -6 },
    whileInView: reduce ? { opacity: 1 } : { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: reduce ? 0.15 : 0.16 },
  }),
  ProjectList: (reduce: boolean): AnimationProps => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: reduce ? 0 : 0.09 } },
    },
  }),
  ProjectCard: (reduce: boolean): AnimationProps => ({
    variants: {
      hidden: reduce
        ? { opacity: 0 }
        : { opacity: 0, y: 12, scale: 0.95, boxShadow: '0 0 0 rgba(0,0,0,0)' },
      visible: reduce
        ? { opacity: 1 }
        : { opacity: 1, y: 0, scale: 1, boxShadow: '0 5px 10px rgba(0,0,0,0.05)' },
    },
    transition: { duration: reduce ? 0.15 : 0.3 },
  }),
  ProjectTechList: (reduce: boolean): AnimationProps => ({
    initial: 'hidden',
    animate: 'visible',
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
    },
  }),
  ProjectTechItem: (reduce: boolean): AnimationProps => ({
    variants: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    transition: { duration: reduce ? 0.15 : 0.2 },
  }),

  // Footer
  FooterParagraph: (reduce: boolean): AnimationProps => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: reduce ? 0.15 : 0.2 },
  }),
  FooterSocialList: (reduce: boolean): AnimationProps => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
    },
  }),
  FooterSocialItem: (reduce: boolean): AnimationProps => ({
    variants: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    transition: { duration: reduce ? 0.15 : 0.2 },
  }),
};
