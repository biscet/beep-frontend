import { $countCatalogProjects, catalogForm } from 'src/models/Web/Projects/Catalog';
import { PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { Pagination } from 'src/ui/components/Helpers';
import { Input } from 'src/ui/components/Form';
import { INPUT_TYPES, INPUT_VARIATION } from 'src/dict/fields/input';
import { reflect } from '@effector/reflect';
import { getReflectPropsField } from 'src/lib/form';

export const PaginationComponent = reflect({
  view: Pagination,
  bind: {
    total: $countCatalogProjects,
  },
});

export const InputSearchField = reflect({
  view: Input,
  bind: {
    ...getReflectPropsField(PROJECT_FIELDS.NAME, catalogForm),
    type: INPUT_TYPES.TEXT,
    variant: INPUT_VARIATION.SEARCH,
    name: PROJECT_FIELDS.NAME,
    placeholder: 'Поиск проекта...',
  },
});