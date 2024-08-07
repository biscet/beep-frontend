export const CREATE_PROJECT_FIELDS = {
  NAME: 'project_name',
  TYPE: 'project_type',
  UUID: 'project_id',
};

export const PROJECT_FIELDS = {
  ID: 'project_id',
  NAME: 'project_name',
  PROJECT: 'project_details',
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
};

export const ETAGS_FIELDS = {
  STT: 'stt',
  USER: 'user',
  WAV: 'wav',
};

export const DEFAULT_CHUNK_SIZE = 1 * 1024 * 1024;