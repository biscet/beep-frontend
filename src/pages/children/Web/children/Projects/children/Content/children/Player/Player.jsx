import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { isEmpty } from 'src/lib/lodash';
import { I18nContext, ShimmerProjectContentWaveSurfer } from 'src/ui/components/Helpers';

import { CONTENT_PLAYER_TYPE_FIELDS } from 'src/dict/fields/models/projects';
import { VolumeBlock } from './children/VolumeBlock';
import { ControlsBlock } from './children/ControlsBlock';
import { FullScreenBlock } from './children/FullScreenBlock';
import { TimestampsBlock } from './children/TimestampsBlock';
import { Waveform } from './children/Waveform/Waveform';

const overlayStyles = (hoveredPlayer) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 20%, transparent 80%, rgba(0,0,0,0.5))',
  opacity: hoveredPlayer ? 1 : 0,
  transition: 'opacity 0.3s ease',
});

const visibleContent = (isReady) => (isReady ? null : {
  display: 'none',
});

export const Player = ({
  type, url, timestamps, peaks,
}) => {
  const t = useContext(I18nContext);
  const [duration, setDuration] = useState(0);
  const [hoveredPlayer, setHoveredPlayer] = useState(false);
  const [currentTime, setCurrentTime] = useState(0.01);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRef = useRef(null);
  const trackRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const videoElement = mediaRef.current;

    if (videoElement) {
      const handleTimeUpdate = () => {
        setCurrentTime(videoElement.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(videoElement.duration);
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }

    return null;
  }, []);

  const handleSeek = (time, e) => {
    mediaRef.current.currentTime = time;

    if (!isEmpty(e)) { e.stopPropagation(); }
  };

  const handleClickOnTrack = (e) => {
    const trackClick = e.target.className.includes('track');
    const track = trackRef.current;
    const clickPosition = e.nativeEvent.offsetX;
    const trackWidth = track.offsetWidth - 64;
    const clickTime = (
      (trackClick && clickPosition < 32 ? 0.01 : clickPosition) / trackWidth
    ) * duration;

    handleSeek(clickTime);
  };

  const onHoverEnterPlayer = () => setHoveredPlayer(true);
  const onHoverLeavePlayer = () => setHoveredPlayer(false);

  const isReady = duration > 0;

  return (
    <>
      <div
        className="player"
        ref={playerRef}
        onMouseEnter={onHoverEnterPlayer}
        onMouseLeave={onHoverLeavePlayer}
        style={visibleContent(isReady)}
      >

        {type === CONTENT_PLAYER_TYPE_FIELDS.VIDEO ? (
          <video
            ref={mediaRef}
            src={url}
            loop
            className="player__media-container"
          >
            {t('Ваш браузер не поддерживает видео.')}
          </video>
        ) : (
          <audio
            ref={mediaRef}
            src={url}
            loop
            className="player__media-container"
          >
            {t('Ваш браузер не поддерживает аудио.')}
          </audio>
        )}

        <div style={overlayStyles(hoveredPlayer)} />

        <div className="player__footer">
          <VolumeBlock mediaRef={mediaRef} />
          <ControlsBlock mediaRef={mediaRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <FullScreenBlock playerRef={playerRef} type={type} />
        </div>
      </div>

      <div
        className="track"
        onClick={handleClickOnTrack}
        style={visibleContent(isReady)}
        ref={trackRef}
      >
        <Waveform
          peaks={peaks}
          duration={duration}
          timestamps={timestamps}
          handleSeek={handleSeek}
          currentTime={currentTime}
        />

        <TimestampsBlock duration={duration} timestamps={timestamps} handleSeek={handleSeek} />
      </div>

      {!isReady ? <ShimmerProjectContentWaveSurfer /> : null}
    </>
  );
};
