import React from 'react';
import { useUnit } from 'effector-react';
import { LayoutGroup, motion } from 'framer-motion';
import { VARIATION_PERFORMANCE_TYPES } from 'src/dict/performance';
import { $performanceSettings } from 'src/models/Helpers/Performance';

export const motionLayout = {
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
};

export const motionLayoutGroup = ({ children }) => <>{children}</>;

export const performanceMotionLayoutHook = () => {
  const performanceSettings = useUnit($performanceSettings);

  return performanceSettings === VARIATION_PERFORMANCE_TYPES.LOW
    ? { LayoutGroup: motionLayoutGroup, motion: motionLayout }
    : { LayoutGroup, motion };
};