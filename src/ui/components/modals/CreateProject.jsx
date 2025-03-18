import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/Helpers';
import { Button, Input, ModalForm } from 'src/ui/components/Form';
import { CloseSVG, LoaderSpinnerSVG } from 'src/ui/media/images';
import { CREATE_PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { getReflectPropsField } from 'src/lib/form';
import { useForm } from 'effector-forms';
import {
  $createProjectDone, $disabledCreateProjectCombineData, createProjectForm,
} from 'src/models/Web/Projects';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { createComponent } from 'effector-react';
import { cx } from 'src/lib/lodash';
import { reflect } from '@effector/reflect';

const ProjectNameField = reflect({
  view: Input,
  bind: {
    ...getReflectPropsField(CREATE_PROJECT_FIELDS.NAME, createProjectForm),
    placeholder: 'Название проекта',
    name: CREATE_PROJECT_FIELDS.NAME,
    nonActiveClass: 'create-project__input input_full',
  },
});

const FormButton = createComponent(
  [$disabledCreateProjectCombineData, $createProjectDone], (_, units) => {
    const t = useContext(I18nContext);
    const [disabledCreateProjectCombineData, createProjectDone] = units;

    return (
      <Button
        type={BUTTON_TYPES.SUBMIT}
        disabled={disabledCreateProjectCombineData}
        nonActiveClass="create-project__button button_full"
        form="createProject"
      >
        {!createProjectDone ? t('Далее') : <LoaderSpinnerSVG />}
      </Button>
    );
  },
);

export const CreateProject = ({ closeModalFn }) => {
  const t = useContext(I18nContext);
  const { hasError } = useForm(createProjectForm);

  return (
    <ModalForm
      className="modal__form form form_create-project create-project"
      submit={createProjectForm.submit}
      id="createProject"
    >
      <h1 className="form__heading">{t('Создание проекта')}</h1>

      <p
        className={cx({
          defaultClass: ['form__caption', 'caption'],
          activeClass: 'caption_error',
          condition: hasError(),
        })}
      >
        {t('Название проекта должно содержать от 1 до 255 символов.')}
      </p>

      <ProjectNameField />
      <FormButton />

      <div className="form__close" onClick={closeModalFn}>
        <CloseSVG />
      </div>
    </ModalForm>
  );
};