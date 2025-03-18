import React, { useContext } from 'react';
import { $detailProject } from 'src/models/Web/Projects/Viewing';
import { I18nContext } from 'src/ui/components/Helpers';
import {
  BACKEND_PROJECT_STATUS_FIELDS, PROJECT_FIELDS, PROJECT_STATUS_FIELDS, TYPES_FIELDS,
} from 'src/dict/fields/models/projects';
import { get, isEmpty } from 'src/lib/lodash';
import { reflect } from '@effector/reflect';
import {
  BurgerSVG, CharsSVG, DoneSVG, EditSVG,
  ErrorSVG, ProcessSVG, SettingsSVG, TimerSVG,
  // SoundSVG, StaffSVG, DictSVG,
} from 'src/ui/media/images';
import { convertMinutesToHoursAndMinutes } from 'src/lib/date';

const { DONE, ERROR, CREATED } = BACKEND_PROJECT_STATUS_FIELDS;

const FIELD_TYPES = {
  TEXT: 'text',
  TIME: 'time',
  SOUND: 'sound',
};

const Field = ({
  name, body, divider, editable,
  Icon, type, translateBody,
}) => {
  const t = useContext(I18nContext);
  let variantBody = '';

  if (isEmpty(body)) { return null; }

  switch (type) {
    case FIELD_TYPES.TIME: {
      variantBody = t('{{value1}}ч {{value2}}м', [body.hours, body.mins]);
      break;
    }
    default: {
      variantBody = translateBody ? t(body) : body;
      break;
    }
  }

  return (
    <>
      {divider ? <div className="projects-viewing__divider" /> : null}

      <div className="projects-viewing__field field">
        <div className="field__group">
          {!isEmpty(Icon) ? <Icon /> : null}

          <div className="field__text">
            <span>{`${t(name)} `}</span>
            {variantBody}
          </div>
        </div>

        {editable ? (
          <div className="field__editable">
            <EditSVG />
          </div>
        ) : null}
      </div>
    </>
  );
};

export const NameProjectField = reflect({
  view: Field,
  bind: {
    body: $detailProject.map((data) => get(data, PROJECT_FIELDS.NAME, '-')),
    name: 'Название проекта:',
    divider: false,
    editable: false,
    Icon: CharsSVG,
    translateBody: false,
    type: FIELD_TYPES.TEXT,
  },
});

export const TypeProjectField = reflect({
  view: Field,
  bind: {
    body: $detailProject.map((data) => {
      const type = get(data, PROJECT_FIELDS.TYPE, '');
      if (isEmpty(type)) { return '-'; }
      return type === TYPES_FIELDS.VIDEO ? 'Видео' : 'Аудио';
    }),
    name: 'Тип проекта:',
    divider: true,
    editable: false,
    Icon: BurgerSVG,
    translateBody: true,
    type: FIELD_TYPES.TEXT,
  },
});

export const IdProjectField = reflect({
  view: Field,
  bind: {
    body: $detailProject.map((data) => get(data, PROJECT_FIELDS.ID, '-')),
    name: 'ID проекта:',
    divider: true,
    editable: false,
    Icon: SettingsSVG,
    translateBody: false,
    type: FIELD_TYPES.TEXT,
  },
});

export const StatusProjectField = reflect({
  view: Field,
  bind: {
    body: $detailProject.map((data) => {
      const status = get(data, PROJECT_FIELDS.STATUS, '');
      if (isEmpty(status)) { return '-'; }
      return get(PROJECT_STATUS_FIELDS, status);
    }),
    name: 'Статус:',
    divider: true,
    editable: false,
    translateBody: true,
    type: FIELD_TYPES.TEXT,
    Icon: $detailProject.map((data) => {
      const status = get(data, PROJECT_FIELDS.STATUS, '');

      if (DONE === status) {
        return DoneSVG;
      }

      if (ERROR === status) {
        return ErrorSVG;
      }

      return ProcessSVG;
    }),
  },
});

export const EstimateProjectField = reflect({
  view: Field,
  bind: {
    body: $detailProject.map((data) => {
      const time = Number(get(data, PROJECT_FIELDS.ESTIMATE, 0));
      const status = get(data, PROJECT_FIELDS.STATUS, '');
      const conditionShowTime = [DONE, ERROR, CREATED].includes(status);

      if (!conditionShowTime && time <= 0) {
        return convertMinutesToHoursAndMinutes(2);
      }

      if (isEmpty(time) || conditionShowTime) { return null; }

      return convertMinutesToHoursAndMinutes(time);
    }),
    name: 'До окончания обработки:',
    divider: true,
    editable: false,
    Icon: TimerSVG,
    type: FIELD_TYPES.TIME,
    translateBody: true,
  },
});

// export const PresetProjectField = reflect({
//   view: Field,
//   bind: {
//     body: 'Cтандартный',
//     name: 'Шаблон:',
//     divider: true,
//     editable: true,
//     Icon: StaffSVG,
//     translateBody: true,
//     type: FIELD_TYPES.TEXT,
//   },
// });

// export const SoundProjectField = reflect({
//   view: Field,
//   bind: {
//     body: '-',
//     name: 'Звук:',
//     divider: true,
//     editable: true,
//     Icon: SoundSVG,
//     translateBody: false,
//     type: FIELD_TYPES.SOUND,
//   },
// });

// export const DictProjectField = reflect({
//   view: Field,
//   bind: {
//     body: 'яблоко, компьютер, река, солнце, книга, телефон, город, музыка, самолет, цветок, лес, океан, машина, дом, мост, дождь, звезда, гора, зима, школа, ветер, письмо, магазин, кошка, собака, дождь, звезда, гора, зима, школа, ветер, письмо, магазин, кошка, собака',
//     name: 'Словарь:',
//     divider: true,
//     editable: true,
//     Icon: DictSVG,
//     translateBody: false,
//     type: FIELD_TYPES.TEXT,
//   },
// });
