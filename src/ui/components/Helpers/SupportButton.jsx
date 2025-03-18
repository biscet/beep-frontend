import React, { useContext, useState } from 'react';
import { SupportSVG } from 'src/ui/media/images';
import { motion, AnimatePresence } from 'framer-motion';
import { SUPPORT_BUTTON_ANIMATE, SUPPORT_BUTTON_SPAN_ANIMATE } from 'src/dict/animate';
import { I18nContext } from './i18n';

export const SupportButton = React.memo(() => {
  const t = useContext(I18nContext);
  const [isHovered, setIsHoveredButton] = useState(false);

  const onHoverStart = () => setIsHoveredButton(true);
  const onHoverEnd = () => setIsHoveredButton(false);

  return (
    <motion.a
      href="https://t.me/beep_support_bot"
      target="__blank"
      rel="noopener noreferrer"
      className="default-content__support"
      key="default-content__support"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      initial={SUPPORT_BUTTON_ANIMATE.initial}
      animate={SUPPORT_BUTTON_ANIMATE.animate(isHovered)}
      transition={SUPPORT_BUTTON_ANIMATE.transition}
    >
      <SupportSVG />

      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={SUPPORT_BUTTON_SPAN_ANIMATE.initial}
            animate={SUPPORT_BUTTON_SPAN_ANIMATE.animate}
            exit={SUPPORT_BUTTON_SPAN_ANIMATE.exit}
            transition={SUPPORT_BUTTON_SPAN_ANIMATE.transition}
          >
            {t('Чат с поддержкой')}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
});