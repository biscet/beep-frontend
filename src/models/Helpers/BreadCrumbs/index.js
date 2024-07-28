import { allDomain } from 'src/models/App';

const breadCrumbsDomain = allDomain.createDomain('BreadCrumbs');

export const $breadCrumbs = breadCrumbsDomain.createStore([]);