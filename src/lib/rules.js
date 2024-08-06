import { FILE_UPLOADER_FIELDS } from 'src/dict/fields/file-uploader';
import { isEmpty } from 'src/lib/lodash';
import { fileContract } from './contracts';

export const emailPattern = /\S+@\S+\.\S+/;
export const passwordPattern = /^.{8,}$/;
export const userNamePattern = /^[\dA-Za-z]{4,30}$/;
export const projectNamePattern = /^.{1,255}$/;
export const uuidPattern = /[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}/i;

export const rules = {
  required: () => ({
    name: 'required',
    validator: (value) => ({
      isValid: !isEmpty(value),
      errorText: 'Данное поле обязательно для заполнения.',
    }),
  }),
  email: () => ({
    name: 'email',
    validator: (value) => ({
      isValid: emailPattern.test(value),
      errorText: 'Указан некорректный email-адрес.',
    }),
  }),
  username: () => ({
    name: 'username',
    validator: (value) => ({
      isValid: userNamePattern.test(value),
      errorText: 'Указано некорректное имя пользователя, оно должно содержать от 4 до 30 символов и может включать только буквы и цифры.',
    }),
  }),
  password: () => ({
    name: 'password',
    validator: (value) => ({
      isValid: passwordPattern.test(value),
      errorText: 'Длина пароля должна быть не менее 8 символов.',
    }),
  }),
  projectName: () => ({
    name: 'projectName',
    validator: (value) => ({
      isValid: projectNamePattern.test(value),
      errorText: '',
    }),
  }),
  fileVideoSize: () => ({
    name: 'fileVideoSize',
    validator: ({ [FILE_UPLOADER_FIELDS.FILE]: file }) => ({
      isValid: fileContract(file, 30, 'video'),
      errorText: 'Размер видео файла не должен привышать 30ГБ.',
    }),
  }),
  fileAudioSize: () => ({
    name: 'fileAudioSize',
    validator: ({ [FILE_UPLOADER_FIELDS.FILE]: file }) => ({
      isValid: fileContract(file, 10, 'audio'),
      errorText: 'Размер аудио файла не должен привышать 10ГБ.',
    }),
  }),
};