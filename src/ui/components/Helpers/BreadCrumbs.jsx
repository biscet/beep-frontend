import React, { useContext } from 'react';
import { useUnit } from 'effector-react';
import { $currentBreadCrumbs } from 'src/models/Helpers/BreadCrumbs';
import { BREAD_CRUMBS_FIELD, BREAD_CRUMBS_ROUTE } from 'src/dict/breadcrumbs';
import { cx, get } from 'src/lib/lodash';
import { $initApp } from 'src/models/App';
import { I18nContext } from './i18n';

const {
  NAME, ACTIVE, TRANSLATE,
} = BREAD_CRUMBS_FIELD;

export const BreadCrumbs = () => {
  const t = useContext(I18nContext);
  const [{ [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: breadcrumbs }, initApp] = useUnit([$currentBreadCrumbs, $initApp]);

  return (
    <div className="breadcrumbs">
      {!initApp
        ? <div className="shimmer shimmer_side-bar-breadcrumbs" />
        : breadcrumbs.map((breadcrumb, i) => {
          const translated = get(breadcrumb, TRANSLATE, true);
          const name = get(breadcrumb, NAME, '-');
          const active = get(breadcrumb, ACTIVE, true);
          const translatedName = translated ? t(name) : name;

          return (
            <React.Fragment key={i}>
              <div
                className={cx({
                  defaultClass: ['breadcrumbs__item', 'item'],
                  activeClass: 'item_active',
                  condition: active,
                })}
                title={translatedName}
              >
                {translatedName}
              </div>

              {i < breadcrumbs.length - 1
                ? <div className="breadcrumbs__item item item_divider">·</div>
                : null}
            </React.Fragment>
          );
        })}
    </div>
  );
};