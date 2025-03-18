import React, { useContext, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $etagsChunks, $totalChunksForFile } from 'src/models/Web/Projects/Uploading';
import { progressFillStyle } from 'src/lib/helpers';
import { $theme } from 'src/models/Helpers/Theme';
import { THEMES } from 'src/dict/theme';
import { I18nContext } from 'src/ui/components/Helpers';

const handleBeforeUnload = (msg) => (event) => {
  const message = msg;
  event.preventDefault();
  event.returnValue = message;
  return message;
};

export const ChunksSend = () => {
  const t = useContext(I18nContext);
  const [etagsChunks, totalChunksForFile, theme] = useUnit(
    [$etagsChunks, $totalChunksForFile, $theme],
  );

  useEffect(() => {
    const handler = handleBeforeUnload(t('Сейчас идет загрузка файла. Пожалуйста, не покидайте эту страницу до окончания загрузки видео.'));

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, []);

  const uploadProgress = totalChunksForFile !== 0
    ? Math.ceil((etagsChunks.length / totalChunksForFile) * 100)
    : 0;

  return (
    <div className="projects-uploading__loading-chunk loading-chunk">
      <img
        className="loading-chunk__gif"
        src={theme === THEMES.LIGHT ? '/images/stickman-dark.gif' : '/images/stickman-light.gif'}
        alt="get-beeped chunk loader"
      />

      <div className="progress-bar">
        <div className="progress-bar__container">
          <div className="progress-bar__fill" style={progressFillStyle(uploadProgress)} />
        </div>

        <p className="progress-bar__percent">{`${uploadProgress}%`}</p>
      </div>

      <p className="loading-chunk__caption">{t('Пожалуйста, не покидайте эту страницу до окончания загрузки файла.')}</p>
    </div>
  );
};
