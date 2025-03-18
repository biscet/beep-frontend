import React, { useContext } from 'react';
import { I18nContext, ShimmerProjectViewingValues } from 'src/ui/components/Helpers';
import { useUnit } from 'effector-react';
import { $isLoading } from 'src/models/Web/Projects/Viewing';
import { NavigateByStatus } from './children/NavigationButton';
import {
  NameProjectField, TypeProjectField, IdProjectField,
  StatusProjectField, EstimateProjectField,
  // PresetProjectField,SoundProjectField, DictProjectField,
} from './children/Fields';

export const Viewing = () => {
  const t = useContext(I18nContext);
  const isLoading = useUnit($isLoading);

  return (
    <div className="projects-viewing">
      <div className="projects-viewing__wrapper">
        <h3 className="projects-viewing__heading">{t('Информация о проекте')}</h3>

        {isLoading ? <ShimmerProjectViewingValues /> : (
          <>
            <NameProjectField />
            <TypeProjectField />
            <IdProjectField />
            <StatusProjectField />
            <EstimateProjectField />
            {/* <PresetProjectField />
            <SoundProjectField />
            <DictProjectField /> */}
          </>
        )}

        <NavigateByStatus />
      </div>

      <div className="projects-viewing__bottom-box" />
    </div>
  );
};