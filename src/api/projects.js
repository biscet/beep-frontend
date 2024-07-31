import { axios } from 'src/lib/axios';

export const getCatalogProjectsSign = (data) => axios.get('/get_user_projects?offset=0&limit=5', data);

export const getProjectSign = (data) => axios.get('/get_project_details', data);

export const postCreateProjectSign = (data) => axios.post('/create-project', data);