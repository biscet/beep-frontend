import { reflect } from '@effector/reflect';
import { useUnit } from 'effector-react';
import React, { useContext } from 'react';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { UPLOADING_FIELDS } from 'src/dict/fields/models/projects';
import { getReflectPropsField } from 'src/lib/form';
import { $disabledUploadingProjectCombineData, uploadingForm } from 'src/models/Web/Projects/Uploading';
import { Button, FileUploader, Form } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';
import { ArrowSVG } from 'src/ui/media/images';

const FileUploaderField = reflect({
  view: FileUploader,
  bind: {
    ...getReflectPropsField(UPLOADING_FIELDS.FILE, uploadingForm),
    name: UPLOADING_FIELDS.FILE,
  },
});

export const Uploading = () => {
  const t = useContext(I18nContext);
  const [disabledUploadingProjectCombineData] = useUnit([$disabledUploadingProjectCombineData]);

  return (
    <Form className="projects-uploading" submit={uploadingForm.submit}>
      <div className="projects-uploading__wrapper">
        <FileUploaderField />

        <div className="projects-uploading__shape shape shape_one" />
        <div className="projects-uploading__shape shape shape_two" />
        <div className="projects-uploading__shape shape shape_three" />
      </div>

      <div className="projects-uploading__bottom-side">
        <Button
          type={BUTTON_TYPES.SUBMIT}
          variant={BUTTON_VARIATION.RAINBOW}
          disabled={disabledUploadingProjectCombineData}
        >
          {t('Начать обработку')}
          <ArrowSVG />
        </Button>
      </div>
    </Form>
  );
};