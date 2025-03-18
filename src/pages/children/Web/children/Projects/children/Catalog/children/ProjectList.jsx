import React, { useContext, useRef } from 'react';
import { createComponent } from 'effector-react';
import { $catalogProjects, $isLoading, $isViewAddButtonCombineData } from 'src/models/Web/Projects/Catalog';
import { cx, get, isEmpty } from 'src/lib/lodash';
import {
  BACKEND_PROJECT_STATUS_FIELDS, CATALOG_FIELDS, PROJECT_STATUS_FIELDS,
  TYPES_FIELDS,
} from 'src/dict/fields/models/projects';
import { imageStyle, prependObstacleFn } from 'src/lib/helpers';
import { goToProjectFn } from 'src/models/Web/Projects/Viewing';
import {
  AddPlusSVG, DoneSVG, EmptyPreviewSVG, ErrorSVG, ProcessSVG,
} from 'src/ui/media/images';
import { $typeCatalog } from 'src/models/Helpers/HeaderCatalog';
import { TYPES_CATALOG_FIELDS } from 'src/dict/header-catalog';
import { I18nContext, ShimmerProjectCatalog } from 'src/ui/components/Helpers';
import { $modalIsOpen, closeModalFn, openModalFn } from 'src/models/Helpers/Modal';
import { MODAL_FIELDS } from 'src/dict/modal';
import { CreateProject } from 'src/ui/components/modals';
import { listUpContainerHook } from 'src/ui/hooks';
import { convertMinutesToHoursAndMinutes } from 'src/lib/date';
import { $innerSizes } from 'src/models/Helpers/Resize';

const {
  NAME, ID, PREVIEW_IMAGE,
  STATUS, TYPE, ESTIMATE,
} = CATALOG_FIELDS;

const isModal = (modalIsOpen) => () => {
  if (modalIsOpen) {
    closeModalFn();
  } else {
    openModalFn({ [MODAL_FIELDS.CHILDREN]: CreateProject });
  }
};

export const ProjectList = createComponent(
  [$catalogProjects, $typeCatalog, $isLoading, $modalIsOpen, $isViewAddButtonCombineData, $innerSizes],
  (_, units) => {
    const t = useContext(I18nContext);
    const [catalogProjects, typeCatalog, isLoading, modalIsOpen, isViewAddButtonCombineData, { width }] = units;

    const listRef = useRef(null);

    listUpContainerHook(listRef, isLoading, [catalogProjects]);

    return (
      <div
        ref={listRef}
        className={cx({
          defaultClass: [''],
          activeClass: 'projects-catalog__list',
          nonActiveClass: 'projects-catalog__list-row list-row',
          condition: (typeCatalog === TYPES_CATALOG_FIELDS.COLUMN) || (width < 1281),
        })}
      >
        {(typeCatalog === TYPES_CATALOG_FIELDS.ROW) && (width > 1280) ? (
          <div className="list-row__header">
            <div>{t('Проект')}</div>
            <div>{t('Статус проекта')}</div>
          </div>
        ) : null}

        {isLoading ? <ShimmerProjectCatalog cardType={typeCatalog} count={catalogProjects.length} /> : null}

        {(isEmpty(catalogProjects) || isLoading)
          ? null
          : catalogProjects.map((project, i) => {
            const name = get(project, NAME, '-');
            const id = get(project, ID, '-');
            const previewImage = get(project, PREVIEW_IMAGE, '');
            const status = get(project, STATUS, '-');
            const time = Number(get(project, ESTIMATE, 0));
            const { hours, mins } = convertMinutesToHoursAndMinutes(isEmpty(time) ? 2 : time);
            const type = get(project, TYPE, TYPES_FIELDS.AUDIO);
            const showPreview = (type === TYPES_FIELDS.AUDIO) || isEmpty(previewImage);
            const conditionShowTime = ![
              BACKEND_PROJECT_STATUS_FIELDS.DONE,
              BACKEND_PROJECT_STATUS_FIELDS.ERROR,
              BACKEND_PROJECT_STATUS_FIELDS.CREATED,
            ].includes(status);

            let StatusSVG = null;
            let statusClassName = null;

            switch (status) {
              case BACKEND_PROJECT_STATUS_FIELDS.DONE: {
                StatusSVG = DoneSVG;
                statusClassName = 'status_done';
                break;
              }
              case BACKEND_PROJECT_STATUS_FIELDS.ERROR: {
                StatusSVG = ErrorSVG;
                statusClassName = 'status_error';
                break;
              }
              default: {
                StatusSVG = ProcessSVG;
                statusClassName = 'status_processing';
                break;
              }
            }

            return (
              <div
                className="projects-catalog__card card"
                key={i}
                data-card={(typeCatalog === TYPES_CATALOG_FIELDS.ROW) && (width > 1280) ? 'false' : 'true'}
                onClick={prependObstacleFn(goToProjectFn, id)}
              >
                {!showPreview ? <div className="card__preview" style={imageStyle(previewImage)} /> : (
                  <div className="card__preview">
                    <EmptyPreviewSVG />
                  </div>
                )}
                <div
                  className="card__title"
                  data-card={(typeCatalog === TYPES_CATALOG_FIELDS.ROW) && (width > 1280) ? 'false' : 'true'}
                >
                  {name}
                </div>
                <div className="card__footer">
                  <div className={cx({
                    defaultClass: ['card__status', 'status'],
                    activeClass: statusClassName,
                  })}
                  >
                    <StatusSVG />
                    {t(get(PROJECT_STATUS_FIELDS, status))}
                  </div>

                  <div className="time">
                    {conditionShowTime ? t('{{value1}}ч {{value2}}м', [hours, mins]) : null}
                  </div>
                </div>
              </div>
            );
          })}

        {isViewAddButtonCombineData ? (
          <div
            className="projects-catalog__card card"
            data-card={typeCatalog === TYPES_CATALOG_FIELDS.ROW ? 'false' : 'true'}
            onClick={isModal(modalIsOpen)}
          >
            {typeCatalog === TYPES_CATALOG_FIELDS.ROW ? <div /> : null}
            <div
              className="card__add-project"
              data-card={typeCatalog === TYPES_CATALOG_FIELDS.ROW ? 'false' : 'true'}
            >
              <AddPlusSVG />
              {t('Создать новый проект')}
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);