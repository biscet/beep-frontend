export const PRICE_INFO_FIELDS = {
  QUANTITY: 'quantity',
  PRICE: 'actual_price',
  SYSTEM_NAME: 'system_name',
  TITLE: 'name',
  BODY: 'description',
  ID: 'id',
};

export const PRICES_NAMES_FIELDS = {
  TEN: 'ten_minutes',
  SIXTY: 'sixty_minutes',
  HUNDRED: 'hundred_minutes',
};

export const ECQUIRE_NAMES_FIELDS = {
  ID: 'goods_id',
  HTML: 'html',
};

export const PRICES_TEXTS_FIELDS = {
  [PRICES_NAMES_FIELDS.TEN]: {
    [PRICE_INFO_FIELDS.TITLE]: 'Немного минут',
    [PRICE_INFO_FIELDS.BODY]: 'Подойдет для коротких видео',
  },
  [PRICES_NAMES_FIELDS.SIXTY]: {
    [PRICE_INFO_FIELDS.TITLE]: 'Продлевать будете?',
    [PRICE_INFO_FIELDS.BODY]: 'Забипать подкаст',
  },
  [PRICES_NAMES_FIELDS.HUNDRED]: {
    [PRICE_INFO_FIELDS.TITLE]: 'Солидный пак минут',
    [PRICE_INFO_FIELDS.BODY]: 'Для хорошего домашнего видео',
  },
};