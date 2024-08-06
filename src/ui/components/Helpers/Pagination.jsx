import React, { useContext, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { isEmpty } from 'src/lib/lodash';
import { $pagination, $paginationCurrentPage, goToPageByPaginationFn } from 'src/models/Helpers/Pagination';
import { PAGINATION_ACTIONS, PAGINATION_FIELDS } from 'src/dict/pagination';
import { I18nContext } from './i18n';

const changePaginationUnit = (unit, currentPage, total) => () => {
  const maxPages = Math.ceil(total / unit);
  console.log(maxPages, currentPage);
};

export const Pagination = React.memo(({ total }) => {
  const t = useContext(I18nContext);
  let page = useUnit($paginationCurrentPage);
  const paginationUnit = useUnit($pagination);
  const limit = paginationUnit;
  const maxPages = Math.ceil(total / limit);

  useEffect(() => {
    if (page > maxPages && maxPages !== 0) {
      console.log('error');
    }
  }, [total, page]);

  if (isEmpty(page)) page = '1';

  const currentPage = Number.parseInt(page, 10);

  if (isEmpty(total) || total <= 0) return null;

  if (maxPages < 2) {
    return (
      <div className="pagination">
        <div className="pagination-flex-box" style={{ fontSize: 14 }}>
          {t('Всего: ')}
          {' '}
          {isEmpty(total) ? 0 : total}
        </div>
      </div>
    );
  }

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
    items.push(
      <div
        key={number}
        className={`pagination__item ${number === currentPage ? 'pagination__active' : ''}`}
        data-active={number === currentPage ? 'true' : 'false'}
        onClick={() => goToPageByPaginationFn({
          [PAGINATION_FIELDS.ACTION]: PAGINATION_ACTIONS.FROM,
          [PAGINATION_FIELDS.DATA_NUMBER]: number,
        })}
      >
        {number}
      </div>,
    );
  }

  return (
    <div className="pagination">
      <div className="pagination-flex-box" style={{ fontSize: 14 }}>
        {t('Всего: ')}
        {' '}
        {isEmpty(total) ? 0 : total}
      </div>

      <div className="pagination-flex-box">
        {currentPage > 1 && (
          <>
            <div className="pagination__item" onClick={null}>
              first
            </div>

            <div className="pagination__item" onClick={null}>
              left
            </div>
          </>
        )}

        {items}

        {currentPage < rightSide && (
          <>
            <div className="pagination__item" onClick={null}>
              right
            </div>
            <div className="pagination__item" onClick={null}>
              last
            </div>
          </>
        )}
      </div>

      <div className="pagination-flex-box">
        {[5, 10, 15, 20, 25, 30].map((el, i) => (
          <div
            className={`pagination__item ${el === paginationUnit ? 'pagination__active' : ''}`}
            key={i}
            onClick={changePaginationUnit(el, currentPage, total)}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
});
