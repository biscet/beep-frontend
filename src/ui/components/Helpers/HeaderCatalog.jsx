import { useUnit } from 'effector-react';
import React from 'react';
import { TYPES_CATALOG_FIELDS } from 'src/dict/header-catalog';
import { prependFn } from 'src/lib/helpers';
import { cx } from 'src/lib/lodash';
import { $typeCatalog, changeTypeCatalogFn } from 'src/models/Helpers/HeaderCatalog';
import { $innerSizes } from 'src/models/Helpers/Resize';
import { ColumnSVG, RowSVG } from 'src/ui/media/images';

export const HeaderCatalog = ({ SearchField }) => {
  const [typeCatalog, { width }] = useUnit([$typeCatalog, $innerSizes]);

  return (
    <div className="header-catalog">
      <div className="header-catalog__search">
        <SearchField />
      </div>

      {width > 1280 ? (
        <div className="header-catalog__type-list type-list">
          <div
            onClick={prependFn(changeTypeCatalogFn, TYPES_CATALOG_FIELDS.COLUMN)}
            className={cx({
              defaultClass: ['type-list__item', 'item'],
              activeClass: 'item_active',
              condition: typeCatalog === TYPES_CATALOG_FIELDS.COLUMN,
            })}
          >
            <ColumnSVG />
          </div>
          <div
            onClick={prependFn(changeTypeCatalogFn, TYPES_CATALOG_FIELDS.ROW)}
            className={cx({
              defaultClass: ['type-list__item', 'item'],
              activeClass: 'item_active',
              condition: typeCatalog === TYPES_CATALOG_FIELDS.ROW,
            })}
          >
            <RowSVG />
          </div>
        </div>
      ) : null}
    </div>
  );
};