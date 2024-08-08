import React, { useContext } from 'react';
import { reflect } from '@effector/reflect';

import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { BACKEND_PROJECT_STATUS_FIELDS, PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { get, isEmpty } from 'src/lib/lodash';
import { $pathnameUUID } from 'src/models/App';
import { goToProjectUploadFn } from 'src/models/Web/Projects/Uploading';
import { $detailProject } from 'src/models/Web/Projects/Viewing';
import { Button } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';
import { ArrowSVG } from 'src/ui/media/images';

const { CREATED } = BACKEND_PROJECT_STATUS_FIELDS;

export const NavigateByStatus = reflect({
  view: ({ status, id }) => {
    const t = useContext(I18nContext);

    if (isEmpty(status) || CREATED !== status) { return null; }

    const onClick = () => {
      if (CREATED === status) { goToProjectUploadFn(id); }
    };

    return (
      <div className="projects-viewing__button-box">
        <Button
          type={BUTTON_TYPES.BUTTON}
          onClick={onClick}
          nonActiveClass="button_large"
          variant={BUTTON_VARIATION.PRIMARY}
        >
          {t('Загрузить файл')}
          <ArrowSVG />
        </Button>
      </div>
    );
  },
  bind: {
    status: $detailProject.map((data) => {
      const status = get(data, PROJECT_FIELDS.STATUS, '');
      if (isEmpty(status)) { return null; }
      return status;
    }),
    id: $pathnameUUID,
  },
});