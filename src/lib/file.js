import { DEFAULT_CHUNK_SIZE } from 'src/dict/fields/models/projects';

export const downloadS3File = (href, download) => async (event) => {
  event.preventDefault();

  const fileUrl = href;

  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = download;

  link.click();

  URL.revokeObjectURL(link.href);
};

export const extractFileFormat = (url) => {
  const match = url.match(/\.(\w+)(\?|$)/);
  return match ? match[1] : null;
};

export const createSlicedFile = (file, startChunk) => new File([file.slice(
  startChunk, Math.min(startChunk + DEFAULT_CHUNK_SIZE, file.size),
)], file.name, { type: file.type });

export const getFileExtension = (filename) => {
  const parts = filename.split('.');
  const ext = parts.pop();
  const name = parts.join('.');
  return { name, ext };
};

export const formatFileSize = (bytes) => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex += 1;
  }

  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
};