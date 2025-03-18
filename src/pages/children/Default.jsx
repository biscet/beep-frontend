import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { PAGES_PATH } from 'src/dict/path';
import { Button } from 'src/ui/components/Form';
import { I18nContext, LawyerFooter } from 'src/ui/components/Helpers';
import { ArrowSVG } from 'src/ui/media/images';
import { MouseParallaxChild } from 'react-parallax-mouse';
import { useUnit } from 'effector-react';
import { $pathnameUrl } from 'src/models/App';

export const Default = () => {
  const t = useContext(I18nContext);
  const pathname = useUnit($pathnameUrl);
  const [muted, setMuted] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    if (pathname !== '/') {
      videoRef.current.style = 'opacity: 0;';
    }
  }, [pathname]);

  const onClick = () => {
    setMuted(!muted);
  };

  return (
    <div className="default-page">
      <div className="default-page__box">
        <div className="default-page__texts">
          <h1>{t('Встречайте beep')}</h1>
          <p>{t('Сервис помогает автоматически заглушать ненормативную лексику или любые нежелательные слова в ваших видео и аудио. Просто загрузите файл, и мы забипаем его. После обработки вы сможете увидеть, где именно были сделаны исправления и скачать готовый файл. Быстро, просто и удобно!')}</p>
          <Button
            type={BUTTON_TYPES.LINK}
            variant={BUTTON_VARIATION.SECONDARY}
            path={`/${PAGES_PATH.LOGIN}`}
          >
            {t('Загрузить видео')}
            <ArrowSVG />
          </Button>
        </div>

        <div className="default-page__preview preview">
          <video
            className="preview__box"
            src="/videos/beeped.mp4"
            muted={muted}
            loop
            autoPlay
            ref={videoRef}
          >
            {t('Ваш браузер не поддерживает видео.')}
          </video>

          <Button
            type={BUTTON_TYPES.BUTTON}
            onClick={onClick}
          >
            {t(muted ? 'Включить звук' : 'Выключить звук')}
          </Button>

          <div className="preview__symbol symbol symbol_one">
            <MouseParallaxChild
              factorX={0.2}
              factorY={0.3}
              inverted
            >
              @#%
            </MouseParallaxChild>
          </div>
          <div className="preview__symbol symbol symbol_two">
            <MouseParallaxChild
              factorX={0.1}
              factorY={0.2}
            >
              ^%#@
            </MouseParallaxChild>
          </div>
          <div className="preview__symbol symbol symbol_three">
            <MouseParallaxChild
              factorX={0.3}
              factorY={0.5}
            >
              #$^
            </MouseParallaxChild>
          </div>

          <div className="preview__shape shape shape_one" />
          <div className="preview__shape shape shape_two" />
          <div className="preview__shape shape shape_three" />
        </div>
      </div>

      <LawyerFooter />
    </div>
  );
};
