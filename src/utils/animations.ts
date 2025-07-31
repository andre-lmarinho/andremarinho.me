import type { MotionProps } from 'framer-motion';

export type AnimationProps = Pick<
  MotionProps,
  'initial' | 'animate' | 'whileInView' | 'variants' | 'transition' | 'viewport'
>;

export const animations = {
  // Header
  HeaderImage: (reduce: boolean): AnimationProps => ({}),
  DarkModeButton: (reduce: boolean): AnimationProps => ({}),

  // Hero
  H1: (reduce: boolean): AnimationProps => ({}),
  HeroParagraphContainer: (reduce: boolean): AnimationProps => ({}),
  HeroParagraph: (reduce: boolean): AnimationProps => ({}),
  HeroImage: (reduce: boolean): AnimationProps => ({}),

  // Projects
  H2: (reduce: boolean): AnimationProps => ({}),
  ProjectList: (reduce: boolean): AnimationProps => ({}),
  ProjectCard: (reduce: boolean): AnimationProps => ({}),
  ProjectTechList: (reduce: boolean): AnimationProps => ({}),
  ProjectTechItem: (reduce: boolean): AnimationProps => ({}),

  // Footer
  FooterParagraph: (reduce: boolean): AnimationProps => ({}),
  FooterSocialList: (reduce: boolean): AnimationProps => ({}),
  FooterSocialItem: (reduce: boolean): AnimationProps => ({}),
};
