import React from 'react';
import { createComponent } from 'effector-react';
import { $catalogProjects, $countCatalogProjects } from 'src/models/Web/Projects/Catalog';
import { get, isEmpty } from 'src/lib/lodash';
import { CATALOG_FIELDS } from 'src/dict/fields/models/projects';
import { Pagination } from 'src/ui/components/Helpers';
import { prependObstacleFn } from 'src/lib/helpers';
import { goToProjectFn } from 'src/models/Web/Projects/Viewing';

const { NAME, ID } = CATALOG_FIELDS;

const ProjectList = createComponent(
  $catalogProjects, (_, catalogProjects) => (
    isEmpty(catalogProjects)
      ? 'Empty'
      : catalogProjects.map((project, i) => {
        const name = get(project, NAME, '-');
        const id = get(project, ID, '-');

        return (
          <div
            key={i}
            onClick={prependObstacleFn(goToProjectFn, id)}
          >
            {name}
          </div>
        );
      })),
);

const PaginationComponent = createComponent(
  $countCatalogProjects, (_, countCatalogProjects) => (
    <Pagination total={countCatalogProjects} />
  ),
);

export const Catalog = () => (
  <div>
    <ProjectList />

    <br />
    <br />
    <br />

    <PaginationComponent />
  </div>
);