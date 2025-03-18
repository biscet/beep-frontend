/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
const getAviDuration = (file, resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('load', (event) => {
    const buffer = event.target.result;
    const dataView = new DataView(buffer);

    const riff = String.fromCodePoint(
      dataView.getUint8(0),
      dataView.getUint8(1),
      dataView.getUint8(2),
      dataView.getUint8(3),
    );

    if (riff !== 'RIFF') {
      reject(new Error('Не возможно загрузить данный формат файла в вашем браузере'));
      return;
    }

    const aviHeader = String.fromCodePoint(
      dataView.getUint8(8),
      dataView.getUint8(9),
      dataView.getUint8(10),
      dataView.getUint8(11),
    );

    if (aviHeader !== 'AVI ') {
      reject(new Error('Не возможно загрузить данный формат файла в вашем браузере'));
      return;
    }

    let avihPosition = -1;
    for (let i = 0; i < buffer.byteLength - 4; i++) {
      const chunkID = String.fromCodePoint(
        dataView.getUint8(i),
        dataView.getUint8(i + 1),
        dataView.getUint8(i + 2),
        dataView.getUint8(i + 3),
      );
      if (chunkID === 'avih') {
        avihPosition = i;
        break;
      }
    }

    if (avihPosition === -1) {
      reject(new Error('Не возможно загрузить данный формат файла в вашем браузере'));
      return;
    }

    const totalFrames = dataView.getUint32(avihPosition + 24, true);
    const microSecPerFrame = dataView.getUint32(avihPosition + 8, true);

    if (totalFrames === 0) {
      reject(new Error('Не возможно загрузить данный формат файла в вашем браузере'));
      return;
    }

    resolve(Math.ceil((microSecPerFrame * totalFrames) / 1_000_000));
  });

  reader.readAsArrayBuffer(file);
};

const getDefaultMediaDuration = (file, resolve, reject) => {
  const url = URL.createObjectURL(file);
  const mediaElement = document.createElement(
    file.type.includes('video') ? 'video' : 'audio',
  );

  mediaElement.src = url;

  mediaElement.addEventListener('loadedmetadata', () => {
    const { duration } = mediaElement;
    URL.revokeObjectURL(url);
    resolve(Math.ceil(duration));
  });

  mediaElement.addEventListener('error', () => {
    URL.revokeObjectURL(url);
  });

  if (!mediaElement.canPlayType(file.type)) {
    reject(new Error('Не возможно загрузить данный формат файла в вашем браузере'));
    return;
  }

  mediaElement.load();
};

export const getMediaDuration = (file) => new Promise((resolve, reject) => {
  if (file.type === 'video/x-msvideo') {
    getAviDuration(file, resolve, reject);
  }

  if (file.type !== 'video/x-msvideo') {
    getDefaultMediaDuration(file, resolve, reject);
  }
});