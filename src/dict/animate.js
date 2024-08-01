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

export const WEB_LAYOUT_ANIMATION = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
    },
  },
};

export const DEFAULT_MODAL_FORM_ANIMATION = {
  initial: {
    scale: 0.95,
    y: -15,
  },
  animate: {
    scale: 1,
    y: 0,
    transition: {
      type: 'easeInOut',
      duration: 0.2,
    },
  },
  exit: {
    scale: 0.98,
    y: -10,
    transition: {
      type: 'easeInOut',
      duration: 0.2,
    },
  },
};

export const DEFAULT_MODAL_ANIMATION = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
};

export const DEFAULT_PROGRESS_ANIMATION = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    delay: 0.1,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
};

export const DEFAULT_FILE_UPLOADER_ANIMATION = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    delay: 0.1,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
};

export const USER_INFO_WRAPPER_ANIMATE = {
  initial: { width: 0, opacity: 0 },
  animate: { width: 'auto', opacity: 1 },
  exit: { width: 0, opacity: 0 },
  transition: { duration: 0.1 },
};

export const USER_INFO_LOGOUT_ANIMATE = {
  initial: { x: 0 },
  animate: (isHovered) => ({ x: isHovered ? 0 : 0 }),
  transition: { duration: 0.1 },
};

export const USER_INFO_SPAN_ANIMATE = {
  initial: { width: 0, opacity: 0 },
  animate: { width: 'auto', opacity: 1 },
  exit: { width: 0, opacity: 0 },
  transition: { duration: 0.1 },
};
