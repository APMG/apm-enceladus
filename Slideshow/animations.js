const slideMovement = 100;
export const animationDuration = 400;

const fade = {
  opacity: {
    ease: 'easeInOut',
    duration: animationDuration
  }
};

const spring = {
  fade,
  x: {
    type: 'spring',
    stiffness: 150,
    damping: 14
  }
};

export const slideAnimation = {
  states: {
    main: {
      x: 0,
      opacity: 1,
      transition: spring
    },
    prev: {
      x: slideMovement,
      opacity: 0,
      transition: spring
    },
    next: {
      x: -slideMovement,
      opacity: 0,
      transition: spring
    }
  },
  logic: 'slide'
};

export const fadeAnimation = {
  states: {
    fadein: {
      opacity: 1,
      transition: fade
    },
    fadeout: {
      opacity: 0,
      transition: fade
    }
  },
  logic: 'fade'
};

export function logic(type, i, j) {
  switch (type) {
    case 'slide':
      return i === j ? 'main' : i > j ? 'next' : 'prev';
    case 'fade':
      return i === j ? 'fadein' : 'fadeout';
    default:
      return;
  }
}
