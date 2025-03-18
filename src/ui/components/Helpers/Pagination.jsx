import React, { useContext } from 'react';
import { useUnit } from 'effector-react';
import { isEmpty } from 'src/lib/lodash';
import { $pagination, $paginationCurrentPage, goToPageByPaginationFn } from 'src/models/Helpers/Pagination';
import { PAGINATION_ACTIONS, PAGINATION_FIELDS } from 'src/dict/pagination';
import { PaginationArrowSVG } from 'src/ui/media/images';
import { $innerSizes } from 'src/models/Helpers/Resize';
import { I18nContext } from './i18n';

const changePage = (number) => () => goToPageByPaginationFn({
  [PAGINATION_FIELDS.ACTION]: PAGINATION_ACTIONS.FROM,
  [PAGINATION_FIELDS.DATA_NUMBER]: number,
});

export const Pagination = ({ total }) => {
  const t = useContext(I18nContext);
  let page = useUnit($paginationCurrentPage);
  const [paginationUnit, { width }] = useUnit([$pagination, $innerSizes]);
  const limit = paginationUnit;
  const maxPages = Math.ceil(total / limit);

  if (isEmpty(page)) page = '1';

  const currentPage = Number.parseInt(page, 10);

  const items = [];

  let leftSide = currentPage - 2;
  if (leftSide <= 0) {
    leftSide = 1;
  }

  let rightSide = currentPage + 2;
  if (rightSide > maxPages) {
    rightSide = maxPages;
  }

  // eslint-disable-next-line no-plusplus
  for (let number = leftSide; number <= rightSide; number++) {
    if (number !== 1 && number !== maxPages) {
      items.push(
        <div
          key={number}
          className={`pagination__item item ${number === currentPage ? 'item_active' : ''}`}
          data-active={number === currentPage ? 'true' : 'false'}
          onClick={changePage(number)}
          data-disabled="false"
        >
          {number}
        </div>,
      );
    }
  }

  return (
    <div className="pagination">
      <div className="pagination__flex-box">
        <div
          className="pagination__item item item_back"
          onClick={currentPage > 1 ? changePage(currentPage - 1) : null}
          data-active={currentPage === 1 ? 'true' : 'false'}
          data-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          <PaginationArrowSVG />
          {width < 700 ? null : t('Назад')}
        </div>
        <div
          onClick={changePage(1)}
          data-disabled="false"
          data-active={currentPage === 1 ? 'true' : 'false'}
          className={`pagination__item item ${currentPage === 1 ? 'item_active' : ''}`}
        >
          1
        </div>

        {currentPage > 4
          ? (<div className="pagination__item" data-disabled="false" data-active="true">...</div>)
          : null}

        {items}

        {currentPage + 3 < maxPages
          ? (<div className="pagination__item" data-disabled="false" data-active="true">...</div>)
          : null}

        {maxPages > 1
          ? (
            <div
              className={`pagination__item item ${currentPage === maxPages ? 'item_active' : ''}`}
              onClick={currentPage !== maxPages ? changePage(maxPages) : null}
              data-active={currentPage === maxPages ? 'true' : 'false'}
              data-disabled="false"
            >
              {maxPages}
            </div>
          ) : null}

        <div
          className="pagination__item item item_next"
          onClick={currentPage < maxPages ? changePage(currentPage + 1) : null}
          data-active={currentPage === maxPages ? 'true' : 'false'}
          data-disabled={currentPage === maxPages ? 'true' : 'false'}
        >
          {width < 700 ? null : t('Дальше')}
          <PaginationArrowSVG />
        </div>
      </div>
    </div>
  );
};
