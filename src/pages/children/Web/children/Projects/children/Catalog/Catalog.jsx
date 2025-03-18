import React from 'react';
import { HeaderCatalog } from 'src/ui/components/Helpers';
import { ProjectList } from './children/ProjectList';
import { InputSearchField, PaginationComponent } from './children/Fields';

export const Catalog = () => (
  <div className="projects-catalog">
    <HeaderCatalog SearchField={InputSearchField} />
    <ProjectList />
    <PaginationComponent />
  </div>
);