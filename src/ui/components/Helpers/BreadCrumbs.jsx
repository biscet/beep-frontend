import React, { useContext } from 'react';
import { useUnit } from 'effector-react';
import { $currentBreadCrumbs } from 'src/models/Helpers/BreadCrumbs';
import { BREAD_CRUMBS_FIELD, BREAD_CRUMBS_ROUTE } from 'src/dict/breadcrumbs';
import { cx, get } from 'src/lib/lodash';
import { v4 as uuidv4 } from 'uuid';
import { PAGES_PATH } from 'src/dict/path';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { I18nContext } from './i18n';

const {
  NAME, ACTIVE, TRANSLATE, PATH, LINK,
} = BREAD_CRUMBS_FIELD;

export const BreadCrumbs = () => {
  const t = useContext(I18nContext);
  const { [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: breadcrumbs } = useUnit($currentBreadCrumbs);

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((breadcrumb, i) => {
        const translated = get(breadcrumb, TRANSLATE, true);
        const name = get(breadcrumb, NAME, '-');
        const active = get(breadcrumb, ACTIVE, true);
        const path = get(breadcrumb, PATH, uuidv4());
        const link = get(breadcrumb, LINK, PAGES_PATH.WEB);
        const translatedName = translated ? t(name) : name;
        const onClick = active === false ? pushHistoryFn(link) : null;

        return (
          <React.Fragment key={path}>
            <div
              className={cx({
                defaultClass: ['breadcrumbs__item', 'item'],
                activeClass: 'item_active',
                condition: active,
              })}
              onClick={onClick}
              title={translatedName}
            >
              {translatedName}
            </div>

            {i < breadcrumbs.length - 1
              ? <div className="breadcrumbs__item item item_divider">{'>'}</div>
              : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};