export const CREATE_PROJECT_FIELDS = {
  NAME: 'project_name',
  TYPE: 'project_type',
  UUID: 'project_id',
  PRESET: 'preset_id',
};

export const TYPES_FIELDS = {
  VIDEO: 'beep-video',
  AUDIO: 'beep-audio',
  VIDEO_MP4: 'beep_mp4',
  VIDEO_MP3: 'beep_mp3',
  FILE_AUDIO: 'audio',
  FILE_VIDEO: 'video',
};

export const GET_PROJECT_FILE_FIELDS = {
  PROJECT_ID: 'project_id',
  FILE_TYPE: 'file_type',
};

export const PROJECT_FILE_FIELDS = {
  VIDEO: 'video',
  AUDIO: 'audio',
  TIMESTAMPS: 'blur_timestamps',
  URL: 'file_url',
  TYPE: 'type',
  PEAKS: 'peaks',
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
  ESTIMATE: 'estimate_finish',
  PREVIEW_IMAGE: 'thumbnail_s3_path',
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
  PREVIEW_IMAGE: 'thumbnail_s3_path',
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
  DURATION: 'duration',
  PROJECT_TYPE: 'project_type',
  OPERATION_ID: 'operation_id',
  TYPE: 'project_type',
};

export const COMPLETE_UPLOAD_CHUNKS_FIELDS = {
  DURATION: 'duration',
  CONTENT_LANGUAGEE: 'content_language',
  FILE_KEY: 'user_file_key',
};

export const ETAGS_FIELDS = {
  STT: 'stt',
  USER: 'user',
  WAV: 'wav',
};

export const VALIDATE_UNPLOAD_FIELDS = {
  DURATION: 'duration',
  PROJECT_ID: 'project_id',
  PROJECT_TYPE: 'project_type',
};

export const DEFAULT_CHUNK_SIZE = 20 * 1024 * 1024;

export const PROJECTS_VIEWING_FIELDS = {
  NAME: 'project_name',
};

export const CONTENT_PLAYER_TYPE_FIELDS = {
  VIDEO: 'type',
  AUDIO: 'audio',
};

export const PLAYER_VOLUME_FIELD = 'player_volume';
export const crossPlayerVolume = 0.5;

export const VALIDATE_FOR_UPLOAD_ERRORS = {
  'Need to top up minutes account or get a subscription': 'Необходимо пополнить счет минут или оформить подписку.',
};
