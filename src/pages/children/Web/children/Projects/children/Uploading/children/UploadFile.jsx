import { reflect } from '@effector/reflect';
import { createComponent } from 'effector-react';
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

const FormButton = createComponent(
  $disabledUploadingProjectCombineData,
  (_, disabledUploadingProjectCombineData) => {
    const t = useContext(I18nContext);
    return (
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON_VARIATION.RAINBOW}
        disabled={disabledUploadingProjectCombineData}
        form="uploadFileWithProject"
      >
        {t('Начать обработку')}
        <ArrowSVG />
      </Button>
    );
  },
);

export const UploadFile = () => (
  <Form className="projects-uploading" id="uploadFileWithProject" submit={uploadingForm.submit}>
    <div className="projects-uploading__wrapper">
      <div className="projects-uploading__file">
        <FileUploaderField />
      </div>

      <div className="projects-uploading__bottom-side">
        <FormButton />
      </div>
    </div>
  </Form>
);