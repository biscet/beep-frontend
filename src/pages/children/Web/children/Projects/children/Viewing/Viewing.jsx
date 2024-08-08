import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/Helpers';
import {
  NameProjectField, TypeProjectField, IdProjectField,
  StatusProjectField, EstimateProjectField, PresetProjectField,
  SoundProjectField, DictProjectField,
} from './children/Fields';
import { NavigateByStatus } from './children/NavigationButton';

export const Viewing = () => {
  const t = useContext(I18nContext);

  return (
    <div className="projects-viewing">
      <div className="projects-viewing__wrapper">
        <div className="shape-container">
          <div className="projects-viewing__shape shape shape_one" />
          <div className="projects-viewing__shape shape shape_two" />
          <div className="projects-viewing__shape shape shape_three" />
          <div className="projects-viewing__shape shape shape_four" />
        </div>

        <h3 className="projects-viewing__heading">{t('Информация о проекте')}</h3>

        <NameProjectField />
        <TypeProjectField />
        <IdProjectField />
        <StatusProjectField />
        <EstimateProjectField />
        <PresetProjectField />
        <SoundProjectField />
        <DictProjectField />

        <NavigateByStatus />
      </div>

      <div className="projects-viewing__bottom-box" />
    </div>
  );
};