import { CRUD_PATH, PAGES_PATH, WEB_PATH } from '../src/dict/path';

const { PROJECTS } = WEB_PATH;
const { CATALOG } = CRUD_PATH;
const {
  DEFAULT, LOGIN, REGISTRATION,
  OFFER, PRIVACY, WEB, PRICES,
} = PAGES_PATH;

export const dynamicRoutes = [
  DEFAULT, LOGIN, REGISTRATION, OFFER, PRIVACY, PRICES,
  `${WEB}/${PROJECTS}/${CATALOG}`,
];

export const robots = [
  { userAgent: '*', allow: '/' },
  { userAgent: 'Googlebot', disallow: '/private-data/' },
  { userAgent: 'Bingbot', disallow: '/temp/' },
  { userAgent: 'Yandex', disallow: '/no-index/', crawlDelay: 5 },
  { userAgent: 'Mail.Ru', disallow: '/restricted/' },
];