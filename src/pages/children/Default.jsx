import React, { useContext } from 'react';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { PAGES_PATH } from 'src/dict/path';
import { Button } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';
import { ArrowSVG } from 'src/ui/media/images';
import { MouseParallaxChild } from 'react-parallax-mouse';

export const Default = () => {
  const t = useContext(I18nContext);

  return (
    <div className="default-page">
      <div className="default-page__box">
        <div className="default-page__texts">
          <h1>{t('Встречайте beep')}</h1>
          <p>{t('Приложение позволяет загрузить видео, которое обрабатывается на сервере, заглушая ненормативную лексику. После обработки пользователю предоставляется возможность посмотреть, где именно была заглушена ненормативная лексика, а также скачать отдельную звуковую дорожку с получившимся результатом.')}</p>
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
          <div className="preview__box" />

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

      <div className="default-page__copyright">© beep 2024</div>
    </div>
  );
};
