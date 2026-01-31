import { localBackend } from 'src/services/local-backend';

export const getCatalogProjectsSign = (data) => {
  const params = new URLSearchParams(data);
  return localBackend.getCatalogProjects(Object.fromEntries(params));
};

export const getProjectSign = (data) => {
  const params = new URLSearchParams(data);
  return localBackend.getProjectDetails(Object.fromEntries(params));
};

export const getFileDetailsSign = (data) => {
  const params = new URLSearchParams(data);
  return localBackend.getFileDetails(Object.fromEntries(params));
};

export const postCreateProjectSign = (data) => localBackend.createProject(data);

export const postValidateForUploadSign = async (data) => localBackend.validateForUpload(await data);

export const postUploadChunkSign = (data) => localBackend.uploadChunk(data);

export const postCompleteUploadChunkSign = async (data) => localBackend.completeChunkUpload(await data);

export const postConfirmSTTSign = async (data) => localBackend.confirmStt(await data);
