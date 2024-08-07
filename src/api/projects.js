import { axios } from 'src/lib/axios';

export const getCatalogProjectsSign = (data) => {
  const params = new URLSearchParams(data);
  return axios.get('/get-user-projects', { params });
};

export const getProjectSign = (data) => {
  const params = new URLSearchParams(data);
  return axios.get('/get-project-details', { params });
};

export const postCreateProjectSign = (data) => axios.post('/create-project', data);

export const postUploadChunkSign = (data) => axios.postForm('/upload-chunk', data);

export const postCompleteUploadChunkSign = async (data) => axios.post('/complete-chunk-upload', await data);

export const postConfirmSTTSign = async (data) => axios.post('/confirm-stt', await data);