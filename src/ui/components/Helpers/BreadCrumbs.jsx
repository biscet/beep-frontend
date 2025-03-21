import React, { useContext } from 'react';
import { createComponent } from 'effector-react';
import { $currentBreadCrumbs } from 'src/models/Helpers/BreadCrumbs';
import { BREAD_CRUMBS_FIELD, BREAD_CRUMBS_ROUTE } from 'src/dict/breadcrumbs';
import { cx, get, isEmpty } from 'src/lib/lodash';
import { $initApp } from 'src/models/App';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { I18nContext } from './i18n';
import { ShimmerBreadCrumbs } from './Shimmer';

const {
  NAME, ACTIVE, TRANSLATE, LINK, LOADING,
} = BREAD_CRUMBS_FIELD;

export const BreadCrumbs = createComponent([$currentBreadCrumbs, $initApp], (_, units) => {
  const t = useContext(I18nContext);
  const [{ [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: breadcrumbs }, initApp] = units;

  return (
    <div className="breadcrumbs">
      {!initApp
        ? <ShimmerBreadCrumbs />
        : breadcrumbs.map((breadcrumb, i) => {
          const translated = get(breadcrumb, TRANSLATE, true);
          const name = get(breadcrumb, NAME, '-');
          const link = get(breadcrumb, LINK, '');
          const active = get(breadcrumb, ACTIVE, true);
          const translatedName = translated ? t(name) : name;
          const loading = get(breadcrumb, LOADING, false);

          const goToPage = () => {
            if (!isEmpty(link)) {
              pushHistoryFn(link);
            }
          };

          return (
            <React.Fragment key={i}>
              {loading ? <div className="breadcrumbs__item item item_active">...</div> : (
                <div
                  className={cx({
                    defaultClass: [
                      'breadcrumbs__item',
                      'item',
                      !isEmpty(link) ? 'item_link' : '',
                    ],
                    activeClass: 'item_active',
                    condition: active,
                  })}
                  title={translatedName}
                  onClick={goToPage}
                >
                  {translatedName}
                </div>
              )}

              {i < breadcrumbs.length - 1
                ? <div className="breadcrumbs__item item item_divider">·</div>
                : null}
            </React.Fragment>
          );
        })}
    </div>
  );
});