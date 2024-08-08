export const CREATE_PROJECT_FIELDS = {
  NAME: 'project_name',
  TYPE: 'project_type',
  UUID: 'project_id',
};

export const TYPES_FIELDS = {
  VIDEO: 'beep-video',
  AUDIO: 'beep-audio',
};

export const BACKEND_PROJECT_STATUS_FIELDS = {
  DONE: 'Завершена',
  IN_PROGRESS: 'В процессе',
  ERROR: 'Ошибка',
  POSTPROCESSING: 'Постпроцессинг',
  PREPROCESSING: 'Препроцессинг',
  UPLOADED_FILE: 'Файл загружен',
  CREATED: 'Создана',
};

export const PROJECT_STATUS_FIELDS = {
  [BACKEND_PROJECT_STATUS_FIELDS.DONE]: 'Готово',
  [BACKEND_PROJECT_STATUS_FIELDS.IN_PROGRESS]: 'В обработке',
  [BACKEND_PROJECT_STATUS_FIELDS.ERROR]: 'Ошибка обработки',
  [BACKEND_PROJECT_STATUS_FIELDS.POSTPROCESSING]: 'В обработке',
  [BACKEND_PROJECT_STATUS_FIELDS.PREPROCESSING]: 'В обработке',
  [BACKEND_PROJECT_STATUS_FIELDS.UPLOADED_FILE]: 'Файл подготавливается к обработке',
  [BACKEND_PROJECT_STATUS_FIELDS.CREATED]: 'Создан',
};

export const PROJECT_FIELDS = {
  ID: 'project_id',
  NAME: 'project_name',
  PROJECT: 'project_details',
  OPERATION_ID: 'operation_id',
  TYPE: 'project_type',
  STATUS: 'status_name',
  ESTIMATE: 'minutes_cost',
};

export const UPLOADING_FIELDS = {
  FILE: 'file',
};

export const CATALOG_FIELDS = {
  OPERATION_ID: 'operation_id',
  ID: 'project_id',
  NAME: 'project_name',
  TYPE: 'project_type',
  STATUS: 'status_name',
};

export const CHUNK_UPLOAD_FIELDS = {
  FILE: 'file',
  INDEX: 'chunk_index',
  PROJECT_ID: 'project_id',
  NAME: 'original_name',
  EXT: 'extension',
  EXT_TYPE: 'ext_type',
  TOTAL_CHUNKS: 'total_chunks',
  ETAGS: 'etags',
  STT_ID: 'stt_file_upload_id',
  WAV_ID: 'wav_file_upload_id',
  USER_ID: 'user_file_upload_id',
  VIDEO_DURATION: 'video_duration',
  PROJECT_TYPE: 'project_type',
  OPERATION_ID: 'operation_id',
  TYPE: 'project_type',
};

export const ETAGS_FIELDS = {
  STT: 'stt',
  USER: 'user',
  WAV: 'wav',
};

export const DEFAULT_CHUNK_SIZE = 1 * 1024 * 1024;