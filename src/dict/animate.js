export const HEADER_ANIMATION = {
  animate: (complete) => (complete ? { y: 0, opacity: 1 } : { y: [-20, 0], opacity: [0, 1] }),
  transition: (complete) => (complete ? { duration: 0 } : {
    duration: 0.3, type: 'spring', delay: 0.15,
  }),
};

export const HEADER_TEXT_BUTTON_ANIMATION = {
  initial: (complete) => (complete ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }),
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.25 },
};

export const DEFAULT_LAYOUT_ANIMATION = {
  initial: {
    opacity: 0,
    scale: 0.99,
    transition: {
      duration: 0.1,
    },
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
    },
  },
};
