export const FILE_UPLOADER_VARIATION = {
  PRIMARY: 'primary',
};

export const FILE_UPLOADER_FIELDS = {
  BINARY: 'binary',
  FILE: 'file',
  MAX_FILES: 'maxFiles',
  ACCEPT: 'accept',
};

export const FILE_UPLOADER_DEFAULT_SETTINGS = {
  [FILE_UPLOADER_FIELDS.ACCEPT]: {
    'audio/wav': ['.wav'],
    'audio/mp3': ['.mp3'],
    // 'audio/aiff': ['.aiff', '.aif'],
    'video/mp4': ['.mp4'],
    // 'video/quicktime': ['.mov'],
    // 'video/x-msvideo': ['.avi'],
  },
  [FILE_UPLOADER_FIELDS.MAX_FILES]: 1,
};
