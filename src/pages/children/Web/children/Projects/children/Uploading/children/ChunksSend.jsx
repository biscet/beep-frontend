import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useUnit } from 'effector-react';
import {
  confirmSTTFx,
} from 'src/models/Web/Projects/Uploading';
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
  const [theme] = useUnit([$theme]);
  const confirmPending = useUnit(confirmSTTFx.pending);
  const [fakeProgress, setFakeProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const timeline = useMemo(() => ([
    { second: 1, percent: 10 },
    { second: 3, percent: 37 },
    { second: 4, percent: 50 },
    { second: 6, percent: 86 },
    { second: 7, percent: 98 },
    { second: 8, percent: 100 },
  ]), []);

  useEffect(() => {
    const handler = handleBeforeUnload(t('Сейчас идет загрузка файла. Пожалуйста, не покидайте эту страницу до окончания загрузки видео.'));

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, []);

  useEffect(() => {
    const timers = [];

    if (!confirmPending) {
      setFakeProgress(100);
    } else {
      setFakeProgress(0);

      timeline.forEach(({ second, percent }) => {
        const timer = setTimeout(() => {
          setFakeProgress(percent);
        }, second * 1000);
        timers.push(timer);
      });
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [confirmPending, timeline]);

  useEffect(() => {
    if (confirmPending && !hasStarted) {
      setHasStarted(true);
    }
  }, [confirmPending, hasStarted]);

  const displayProgress = confirmPending ? fakeProgress : (hasStarted ? 100 : 0);

  return (
    <div className="projects-uploading__loading-chunk loading-chunk">
      <img
        className="loading-chunk__gif"
        src={theme === THEMES.LIGHT ? '/images/stickman-dark.gif' : '/images/stickman-light.gif'}
        alt="get-beeped chunk loader"
      />

      <div className="progress-bar">
        <div className="progress-bar__container">
          <div className="progress-bar__fill" style={progressFillStyle(displayProgress)} />
        </div>

        <p className="progress-bar__percent">{`${displayProgress}%`}</p>
      </div>

      <p className="loading-chunk__caption">{t('Пожалуйста, не покидайте эту страницу до окончания загрузки файла.')}</p>
    </div>
  );
};
