import { HELMET_FIELDS } from './fields/models/app';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from './path';

const {
  DEFAULT, LOGIN, REGISTRATION, WEB,
} = PAGES_PATH;

const { PRESETS, PROJECTS } = WEB_PATH;

export const HELMET_ROUTES = [
  DEFAULT,
  LOGIN,
  REGISTRATION,
  [WEB, PRESETS],
  [WEB, PROJECTS],
  [WEB, PROJECTS, CRUD_PATH.VIEWING],
  [WEB, PROJECTS, CRUD_PATH.UPLOADING],
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
  [[WEB, PRESETS].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'beep - Шаблоны',
    [HELMET_FIELDS.DESCRIPTION]: 'Шаблоны.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, шаблоны, Presets, beep, video',
  },
  [[WEB, PROJECTS].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'beep - Все проекты',
    [HELMET_FIELDS.DESCRIPTION]: 'Список ваших проектов.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, проекты, projects, beep, video',
  },
  [[WEB, PROJECTS, CRUD_PATH.VIEWING].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'beep - Ваш проект',
    [HELMET_FIELDS.DESCRIPTION]: 'Ваш проект.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, проекты, projects, upload, загрузка, beep, video',
  },
  [[WEB, PROJECTS, CRUD_PATH.UPLOADING].join('/')]: {
    [HELMET_FIELDS.TITLE]: 'beep - Загрузка файла',
    [HELMET_FIELDS.DESCRIPTION]: 'Загрузка файла в ваш проект.',
    [HELMET_FIELDS.KEYWORDS]: 'обработка видео, проекты, projects, upload, загрузка, beep, video',
  },
};