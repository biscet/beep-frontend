import { axios } from 'src/lib/axios';

export const getCatalogProjectsSign = (data) => axios.get('/projects/get_user_projects', data);

export const postCreateProjectSign = (data) => axios.post('/preprocessing/create-project', data);