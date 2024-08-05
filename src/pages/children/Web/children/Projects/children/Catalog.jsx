import React from 'react';
import { useUnit } from 'effector-react';
import { $catalogProjectsCombineData } from 'src/models/Web/Projects/Catalog';
import { get, isEmpty } from 'src/lib/lodash';
import { CATALOG_FIELDS } from 'src/dict/fields/models/projects';
import { goToProjectUploadFn } from 'src/models/Web/Projects/Uploading';
import { Pagination } from 'src/ui/components/Helpers';

const { NAME, ID } = CATALOG_FIELDS;

export const Catalog = () => {
  const [projects, totalProjects] = useUnit($catalogProjectsCombineData);

  return isEmpty(projects) ? 'Empty' : (
    <div>
      {projects.map((project, i) => {
        const name = get(project, NAME, '-');
        const id = get(project, ID, '-');

        const goToProject = () => {
          goToProjectUploadFn(id);
        };

        return <div key={i} onClick={goToProject}>{name}</div>;
      })}

      <br />
      <br />
      <br />

      <Pagination total={totalProjects} />
    </div>
  );
};