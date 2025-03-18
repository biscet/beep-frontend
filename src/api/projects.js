import { projectsInstance, processingInstance } from 'src/lib/axios';

export const getCatalogProjectsSign = (data) => {
  const params = new URLSearchParams(data);
  return projectsInstance.get('/get-user-projects', { params });
};

export const getProjectSign = (data) => {
  const params = new URLSearchParams(data);
  return projectsInstance.get('/get-project-details', { params });
};

export const getFileDetailsSign = (data) => {
  const params = new URLSearchParams(data);
  return projectsInstance.get('/get-file-details', { params });
};

export const postCreateProjectSign = (data) => projectsInstance.post('/create-project', data);

export const postValidateForUploadSign = async (data) => processingInstance.post('/validate-for-upload', await data);

export const postUploadChunkSign = (data) => processingInstance.postForm('/upload-chunk', data);

export const postCompleteUploadChunkSign = async (data) => processingInstance.post('/complete-chunk-upload', await data);

export const postConfirmSTTSign = async (data) => processingInstance.post('/confirm-stt', await data);