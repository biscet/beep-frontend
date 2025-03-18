import React from 'react';
import { useUnit } from 'effector-react';
import { $uploadingFile } from 'src/models/Web/Projects/Uploading';
import { ShimmerProjectUploading } from 'src/ui/components/Helpers';
import { $pagesLoader } from 'src/models/Helpers/Loader';
import { $detailProject } from 'src/models/Web/Projects/Viewing';
import { isEmpty } from 'src/lib/lodash';

import { UploadFile } from './children/UploadFile';
import { ChunksSend } from './children/ChunksSend';

export const Uploading = () => {
  const [uploadingFile, pagesLoader, detailProject] = useUnit(
    [$uploadingFile, $pagesLoader, $detailProject],
  );

  if (pagesLoader && isEmpty(detailProject)) {
    return <ShimmerProjectUploading />;
  }

  return uploadingFile ? <ChunksSend /> : <UploadFile />;
};