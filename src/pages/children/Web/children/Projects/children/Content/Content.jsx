import React from 'react';
import { useUnit } from 'effector-react';
import { CONTENT_PLAYER_TYPE_FIELDS, PROJECT_FILE_FIELDS } from 'src/dict/fields/models/projects';
import { $filesContent, $isLoading } from 'src/models/Web/Projects/Content';
import { get } from 'src/lib/lodash';

import { ShimmerProjectContent } from 'src/ui/components/Helpers';
import { Player } from './children/Player/Player';
import { DownloadButton } from './children/DownloadButton';

export const Content = () => {
  const [{
    [PROJECT_FILE_FIELDS.VIDEO]: video,
    [PROJECT_FILE_FIELDS.AUDIO]: audio,
    [PROJECT_FILE_FIELDS.TYPE]: type,
  }, isLoading] = useUnit([$filesContent, $isLoading]);

  const videoUrl = get(video, PROJECT_FILE_FIELDS.URL, '');
  const videoTimestamps = get(video, PROJECT_FILE_FIELDS.TIMESTAMPS, []);
  const videoPeaks = get(video, PROJECT_FILE_FIELDS.PEAKS, []);

  const audioUrl = get(audio, PROJECT_FILE_FIELDS.URL, '');
  const audioTimestamps = get(audio, PROJECT_FILE_FIELDS.TIMESTAMPS, []);
  const audioPeaks = get(audio, PROJECT_FILE_FIELDS.PEAKS, []);

  const url = type === CONTENT_PLAYER_TYPE_FIELDS.AUDIO ? audioUrl : videoUrl;
  const timestamps = type === CONTENT_PLAYER_TYPE_FIELDS.AUDIO ? audioTimestamps : videoTimestamps;
  const peaks = type === CONTENT_PLAYER_TYPE_FIELDS.AUDIO ? audioPeaks : videoPeaks;

  return (
    <div className="projects-content">
      <div className="projects-content__wrapper">
        {type && !isLoading ? (
          <>
            <Player
              type={type}
              url={url}
              peaks={peaks}
              timestamps={timestamps}
            />

            <DownloadButton href={url} />
          </>
        ) : <ShimmerProjectContent />}
      </div>
    </div>
  );
};