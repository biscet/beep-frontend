export const USER_FIELDS = {
  USERNAME: 'username',
  EMAIL: 'email',
  AVATAR: 'avatar',
  LOADED: 'loaded',
  ID: 'id',
  BALANCE: 'balance',
  FROZEN_BALANCE: 'frozen_balance',
};

export const USER_BACKEND_FIELDS = {
  USERNAME: 'username',
  EMAIL: 'email',
  ID: 'id',
  BALANCE: 'balance',
  FROZEN_BALANCE: 'frozen_balance',
};

export const USER_BALANCE_FIELDS = {
  BALANCE: 'new_balance',
  FROZEN_BALANCE: 'frozen_balance',
};

export const USER_CONFIRM_FIELDS = {
  EMAIL: 'email',
  CODE: 'code',
};

export const USER_RESEND_EMAIL_FIELDS = {
  EMAIL: 'email',
  SECONDS: 'seconds',
};

export const USER_CONFIRM_ERRORS = {
  'Email confirmed, user activated.': 'Электронная почта подтверждена, пользователь активирован.',
  'Invalid confirmation code or code expired': 'Неверный код подтверждения или срок действия кода истек.',
  'User not found': 'Пользователь не найден.',
};

export const DEFAULT_RESEND_CODE = 120;