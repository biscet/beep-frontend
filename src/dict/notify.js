export const NOTIFY_FIELDS = {
  CALLBACK: 'notify',
  MESSAGE: 'message',
  DATA: 'data',
  TRANSLATE: 'translate',
};

export const NOTIFY_CONFIG = (data) => ({
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  draggable: true,
  theme: 'light',
  ...data,
});