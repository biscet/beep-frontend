import { sample, split } from 'effector';
import { $pathnameUrl } from 'src/models/App';
import { isEmpty } from 'src/lib/lodash';
import { BREAD_CRUMBS_FIELD } from 'src/dict/breadcrumbs';
import { isCurrentPath } from 'src/lib/url';
import {
  $allBreadCrumbsCombineData, $currentBreadCrumbs,
  resetCurrentBCFn, triggerSplitBCLogicFn,
  setCurrentBCFn,
} from '.';

const { PATH } = BREAD_CRUMBS_FIELD;

$currentBreadCrumbs
  .reset(resetCurrentBCFn)
  .on(setCurrentBCFn, (_, breadcrumb) => breadcrumb);

sample({
  clock: $pathnameUrl,
  source: $allBreadCrumbsCombineData,
  fn: (allBreadCrumbs, pathnameUrl) => allBreadCrumbs.filter(
    ({ [PATH]: path }) => isCurrentPath(pathnameUrl, path),
  ),
  target: triggerSplitBCLogicFn,
});

split({
  source: triggerSplitBCLogicFn,
  match: {
    set: (breadcrumb) => !isEmpty(breadcrumb),
  },
  cases: {
    set: setCurrentBCFn.prepend((filteredData) => filteredData[0]),
    __: resetCurrentBCFn,
  },
});