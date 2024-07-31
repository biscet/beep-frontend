import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/Helpers';
import { Button, Input, ModalForm } from 'src/ui/components/Form';
import { CloseSVG, LoaderSpinnerSVG } from 'src/ui/media/images';
import { CREATE_PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { getPropsField } from 'src/lib/form';
import { useForm } from 'effector-forms';
import {
  $createProjectDone, $disabledCreateProjectCombineData, createProjectForm,
} from 'src/models/Web/Projects';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { useUnit } from 'effector-react';
import { cx } from 'src/lib/lodash';

export const CreateProject = ({ closeModalFn }) => {
  const t = useContext(I18nContext);
  const { submit, ...restProps } = useForm(createProjectForm);
  const [disabledCreateProjectCombineData, createProjectDone] = useUnit(
    [$disabledCreateProjectCombineData, $createProjectDone],
  );

  return (
    <ModalForm
      className="modal__form form form_create-project create-project"
      submit={submit}
    >
      <h1 className="form__heading">{t('Создание проекта')}</h1>

      <p
        className={cx({
          defaultClass: ['form__caption', 'caption'],
          activeClass: 'caption_error',
          condition: restProps.hasError(),
        })}
      >
        {t('Название проекта должно быть уникальным и содержать от 1 до 255 символов.')}
      </p>

      <Input
        placeholder="Название проекта"
        name={CREATE_PROJECT_FIELDS.NAME}
        {...getPropsField({
          fieldName: CREATE_PROJECT_FIELDS.NAME, props: restProps,
        })}
        nonActiveClass="create-project__input input_full"
      />

      <Button
        type={BUTTON_TYPES.SUBMIT}
        disabled={disabledCreateProjectCombineData}
        nonActiveClass="create-project__button button_full"
      >
        {!createProjectDone ? t('Далее') : <LoaderSpinnerSVG />}
      </Button>

      <div className="form__close" onClick={closeModalFn}>
        <CloseSVG />
      </div>
    </ModalForm>
  );
};