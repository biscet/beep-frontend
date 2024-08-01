import { useForm } from 'effector-forms';
import React, { useContext } from 'react';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { UPLOADING_FIELDS } from 'src/dict/fields/models/projects';
import { getPropsField } from 'src/lib/form';
import { uploadingForm } from 'src/models/Web/Projects/Uploading';
import { Button, FileUploader, Form } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';
import { ArrowSVG } from 'src/ui/media/images';

export const Uploading = () => {
  const t = useContext(I18nContext);
  const { submit, ...restProps } = useForm(uploadingForm);

  return (
    <Form className="projects-uploading" submit={submit}>
      <div className="projects-uploading__wrapper">
        <FileUploader
          name={UPLOADING_FIELDS.FILE}
          {...getPropsField({
            fieldName: UPLOADING_FIELDS.FILE, props: restProps,
          })}
        />

        <div className="projects-uploading__shape shape shape_one" />
        <div className="projects-uploading__shape shape shape_two" />
        <div className="projects-uploading__shape shape shape_three" />
      </div>

      <div className="projects-uploading__bottom-side">
        <Button
          type={BUTTON_TYPES.SUBMIT}
          variant={BUTTON_VARIATION.RAINBOW}
        >
          {t('Начать обработку')}
          <ArrowSVG />
        </Button>
      </div>
    </Form>
  );
};