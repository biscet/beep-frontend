import { CONFIG } from './config';
import { HELMET_FIELDS } from './fields/models/app';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from './path';

const {
  DEFAULT, LOGIN, REGISTRATION, WEB,
  OFFER, PRIVACY, PRICES,
} = PAGES_PATH;

const { PRESETS, PROJECTS, PAYMENT } = WEB_PATH;

export const HELMET_ROUTES = [
  DEFAULT,
  LOGIN,
  REGISTRATION,
  OFFER,
  PRIVACY,
  PRICES,
  [WEB, PAYMENT],
  [WEB, PRESETS],
  [WEB, PROJECTS],
  [WEB, PROJECTS, CRUD_PATH.VIEWING],
  [WEB, PROJECTS, CRUD_PATH.UPLOADING],
  [WEB, PROJECTS, CRUD_PATH.CONTENT],
];

export const HELMET_DICT = {
  [DEFAULT]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - ^%#@',
    [HELMET_FIELDS.DESCRIPTION]: 'Загрузите ваше видео, и наш AI обработает его, убирая маты. Получите очищенную аудиодорожку быстро и легко. Бесплатная и быстрая обработка видео онлайн.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, запикивание мата, удаление мата из видео, AI обработка видео, аудиодорожка без мата, онлайн обработка видео, бесплатная обработка видео, get-beeped, video, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${DEFAULT}`,
  },
  [LOGIN]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Вход',
    [HELMET_FIELDS.DESCRIPTION]: 'Войдите в свой аккаунт, чтобы загружать видео для AI обработки и скачивать очищенные аудиодорожки. Быстрая и удобная регистрация.',
    [HELMET_FIELDS.KEYWORDS]: 'вход в аккаунт, логин, регистрация, загрузка видео, обработка видео, AI обработка, удаление мата, аудиодорожка без мата, get-beeped, video, login, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${LOGIN}`,
  },
  [REGISTRATION]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Регистрация',
    [HELMET_FIELDS.DESCRIPTION]: 'Зарегистрируйте аккаунт, чтобы загружать видео для AI обработки и скачивать очищенные аудиодорожки. Быстрая и удобная регистрация.',
    [HELMET_FIELDS.KEYWORDS]: 'логин, регистрация, загрузка видео, обработка видео, AI обработка, удаление мата, аудиодорожка без мата, get-beeped, video, login, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${REGISTRATION}`,
  },
  [OFFER]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Оферта',
    [HELMET_FIELDS.DESCRIPTION]: 'Оферта get-beeped',
    [HELMET_FIELDS.KEYWORDS]: 'оферта, логин, регистрация, загрузка видео, обработка видео, AI обработка, удаление мата, аудиодорожка без мата, get-beeped, video, login, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${OFFER}`,
  },
  [PRIVACY]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Политика конфиденциальности',
    [HELMET_FIELDS.DESCRIPTION]: 'Политика конфиденциальности get-beeped',
    [HELMET_FIELDS.KEYWORDS]: 'политика конфиденциальности, AI обработка, удаление мата, аудиодорожка без мата, get-beeped, video, login, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${PRIVACY}`,
  },
  [PRICES]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Цены',
    [HELMET_FIELDS.DESCRIPTION]: 'Цены на услуги get-beeped',
    [HELMET_FIELDS.KEYWORDS]: 'цены, пакеты, минуты, AI обработка, удаление мата, аудиодорожка без мата, get-beeped, video, login, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${PRICES}`,
  },
  [[WEB, PAYMENT].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Покупка минут',
    [HELMET_FIELDS.DESCRIPTION]: 'Шаблоны.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, шаблоны, Presets, get-beeped, video, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${WEB}/${PAYMENT}`,
  },
  [[WEB, PRESETS].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Шаблоны',
    [HELMET_FIELDS.DESCRIPTION]: 'Шаблоны.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, шаблоны, Presets, get-beeped, video, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${WEB}/${PRESETS}/${CRUD_PATH.CATALOG}`,
  },
  [[WEB, PROJECTS].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Все проекты',
    [HELMET_FIELDS.DESCRIPTION]: 'Список ваших проектов.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, проекты, projects, get-beeped, video, мат, beep',
    [HELMET_FIELDS.CANONICAL]: `${CONFIG.SITEMAP_URL}${WEB}/${PROJECTS}/${CRUD_PATH.CATALOG}`,
  },
  [[WEB, PROJECTS, CRUD_PATH.VIEWING].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Ваш проект',
    [HELMET_FIELDS.DESCRIPTION]: 'Ваш проект.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, проекты, projects, upload, загрузка, get-beeped, video, мат, beep',
  },
  [[WEB, PROJECTS, CRUD_PATH.UPLOADING].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Загрузка файла',
    [HELMET_FIELDS.DESCRIPTION]: 'Загрузка файла в ваш проект.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, проекты, projects, upload, загрузка, get-beeped, video, мат, beep',
  },
  [[WEB, PROJECTS, CRUD_PATH.CONTENT].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'get-beeped - Страница просмотра',
    [HELMET_FIELDS.DESCRIPTION]: 'Загрузка файла в ваш проект.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, проекты, projects, upload, загрузка, get-beeped, video, мат, beep',
  },
};