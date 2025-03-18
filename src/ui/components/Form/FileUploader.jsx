import React, { useContext, useState } from 'react';
import { FILE_UPLOADER_DEFAULT_SETTINGS, FILE_UPLOADER_FIELDS, FILE_UPLOADER_VARIATION } from 'src/dict/fields/file-uploader';
import { cx, isEmpty } from 'src/lib/lodash';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_FILE_UPLOADER_ANIMATION, DEFAULT_PROGRESS_ANIMATION } from 'src/dict/animate';
import { DoneUploaderSVG, UploaderSVG } from 'src/ui/media/images';
import { progressFillStyle } from 'src/lib/helpers';
import { formatFileSize } from 'src/lib/file';
import { I18nContext } from '../Helpers';

const {
  BINARY, FILE, MAX_FILES, ACCEPT,
} = FILE_UPLOADER_FIELDS;

const getAllFormats = (accept) => {
  const allFormats = [];

  Object.values(accept).map((formats) => [
    allFormats.push(...formats),
  ]);

  return allFormats;
};

const onDropFile = (onChange, setUploadProgress) => (acceptedFiles) => {
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();

    reader.addEventListener('progress', (data) => {
      if (data.lengthComputable) {
        const percentLoaded = Math.round((data.loaded / data.total) * 100);
        setUploadProgress(percentLoaded);
      }
    });

    reader.addEventListener('load', () => {
      onChange({ [FILE]: file, [BINARY]: reader.result });
      setUploadProgress(0);
    });

    reader.readAsArrayBuffer(file);
  });
};

export const FileUploader = ({
  conditionClass, activeClass, nonActiveClass, onChange, variant,
  maxFiles, accept, errorText, hasError, firstError, ...rest
}) => {
  const t = useContext(I18nContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile(onChange, setUploadProgress), maxFiles, accept,
  });
  const { onClick, onKeyDown, ...restRootProps } = getRootProps();

  const className = cx({
    defaultClass: ['file-uploader', `file-uploader_${variant}`],
    activeClass,
    nonActiveClass,
    condition: conditionClass,
  });

  const supportFormats = getAllFormats(accept).join(', ');

  return (
    <div
      className={className}
      {...restRootProps}
      {...rest}
    >
      <input {...getInputProps()} />

      {hasError(firstError) ? errorText : null}

      <AnimatePresence exitBeforeEnter>
        {uploadProgress > 0 && uploadProgress < 100
          ? (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={DEFAULT_PROGRESS_ANIMATION}
              key="progress"
            >
              <p className="container__text-upload">
                {t('Файл загружается...')}
              </p>

              <div className="progress-bar">
                <div className="progress-bar__container">
                  <div className="progress-bar__fill" style={progressFillStyle(uploadProgress)} />
                </div>

                <p className="progress-bar__percent">{`${uploadProgress}%`}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="file-uploader__container container"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={DEFAULT_FILE_UPLOADER_ANIMATION}
              key="file-uploader-container"
            >
              <div className="container__icon icon">
                {isEmpty(rest.value) || isDragActive ? (
                  <UploaderSVG
                    className={cx({
                      defaultClass: [''],
                      activeClass: 'icon icon_drag',
                      condition: isDragActive,
                    })}
                  />
                ) : (
                  <DoneUploaderSVG
                    className={cx({
                      defaultClass: [''],
                      activeClass: 'icon icon_drag',
                      condition: isDragActive,
                    })}
                  />
                )}
              </div>

              {isEmpty(rest.value) || isDragActive ? (
                <p className="container__text">
                  {t(isDragActive ? 'Перетащите файл сюда' : 'Перетащите файл сюда или нажмите кнопку ниже, чтобы выбрать его на компьютере')}
                </p>
              ) : (
                <>
                  <p className="container__text-upload">
                    {t('Файл успешно загружен. Чтобы выбрать другой файл, перетащите сюда или нажмите кнопку ниже, чтобы выбрать его на компьютере')}
                  </p>

                  <p className="container__file-name">{rest.value[FILE].name}</p>
                  <p className="container__file-size">{formatFileSize(rest.value[FILE].size)}</p>
                </>
              )}

              {isDragActive ? null : (
                <button
                  type="button"
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                  className="button button_secondary button_large"
                >
                  {t(isEmpty(rest.value) ? 'Выбрать файл' : 'Выбрать другой файл')}
                </button>
              )}

              <p className="container__formats">
                {`${t('Поддерживаемые форматы:')} ${supportFormats}`}
              </p>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

FileUploader.defaultProps = {
  activeClass: '',
  nonActiveClass: '',
  conditionClass: false,
  variant: FILE_UPLOADER_VARIATION.PRIMARY,
  onChange: () => {},
  maxFiles: FILE_UPLOADER_DEFAULT_SETTINGS[MAX_FILES],
  accept: FILE_UPLOADER_DEFAULT_SETTINGS[ACCEPT],
  errorText: '',
  name: '',
  hasError: (error) => error !== null,
  firstError: null,
};