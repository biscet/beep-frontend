import React from 'react';
import { useUnit } from 'effector-react';
import { prependObstacleFn } from 'src/lib/helpers';
import { $pathnameUUID } from 'src/models/App';
import { goToProjectUploadFn } from 'src/models/Web/Projects/Uploading';

export const Viewing = () => {
  const uuid = useUnit($pathnameUUID);

  return <div onClick={prependObstacleFn(goToProjectUploadFn, uuid)}>Viewing</div>;
};