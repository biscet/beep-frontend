import { combine } from 'effector';
import { CRUD_PATH, ROUTES_FIELDS } from 'src/dict/path';

const { PATH, ACTIVE } = ROUTES_FIELDS;
const { CATALOG } = CRUD_PATH;

export const $itemsRoutesDashboard = combine(() => [
  {
    [PATH]: CATALOG,
    [ACTIVE]: true,
  },
].filter(({ [ACTIVE]: active }) => active));
