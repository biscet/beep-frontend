import { HELMET_FIELDS } from './fields/models/app';
import { PAGES_PATH, WEB_PATH } from './path';

const {
  DEFAULT, LOGIN, REGISTRATION, WEB,
} = PAGES_PATH;

const { DASHBOARD, PROJECTS } = WEB_PATH;

export const HELMET_ROUTES = [
  DEFAULT,
  LOGIN,
  REGISTRATION,
  `${WEB}/${DASHBOARD}`,
  `${WEB}/${PROJECTS}`,
];

export const HELMET_DICT = {
  [DEFAULT]: {
    [HELMET_FIELDS.TITLE]: 'beep - ^%#@',
    [HELMET_FIELDS.DESCRIPTION]: 'Загрузите ваше видео, и наш AI обработает его, убирая маты. Получите очищенную аудиодорожку быстро и легко. Бесплатная и быстрая обработка видео онлайн.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, запикивание мата, удаление мата из видео, AI обработка видео, аудиодорожка без мата, онлайн обработка видео, бесплатная обработка видео, beep, video',
  },
  [LOGIN]: {
    [HELMET_FIELDS.TITLE]: 'beep - Вход',
    [HELMET_FIELDS.DESCRIPTION]: 'Войдите в свой аккаунт, чтобы загружать видео для AI обработки и скачивать очищенные аудиодорожки. Быстрая и удобная регистрация.',
    [HELMET_FIELDS.KEYWORDS]: 'вход в аккаунт, логин, регистрация, загрузка видео, обработка видео, AI обработка, удаление мата, аудиодорожка без мата, beep, video, login',
  },
  [REGISTRATION]: {
    [HELMET_FIELDS.TITLE]: 'beep - Регистрация',
    [HELMET_FIELDS.DESCRIPTION]: 'Зарегистрируйте аккаунт, чтобы загружать видео для AI обработки и скачивать очищенные аудиодорожки. Быстрая и удобная регистрация.',
    [HELMET_FIELDS.KEYWORDS]: 'логин, регистрация, загрузка видео, обработка видео, AI обработка, удаление мата, аудиодорожка без мата, beep, video, login',
  },
  [`${WEB}/${DASHBOARD}`]: {
    [HELMET_FIELDS.TITLE]: 'beep - Дашборд',
    [HELMET_FIELDS.DESCRIPTION]: 'Дашборд.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, дашборд, dashboard, beep, video',
  },
  [`${WEB}/${PROJECTS}`]: {
    [HELMET_FIELDS.TITLE]: 'beep - Проекты',
    [HELMET_FIELDS.DESCRIPTION]: 'Список ваших проектов.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, проекты, projects, beep, video',
  },
};