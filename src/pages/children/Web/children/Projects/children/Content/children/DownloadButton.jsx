import React, { useContext } from 'react';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { Button } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';
import { DownloadSVG } from 'src/ui/media/images';

export const DownloadButton = React.memo(({ href }) => {
  const t = useContext(I18nContext);

  return (
    <div className="projects-content__button-box">
      <Button
        type={BUTTON_TYPES.DOWNLOAD}
        href={href}
      >
        <DownloadSVG />
        {t('Скачать файл')}
      </Button>
    </div>
  );
});