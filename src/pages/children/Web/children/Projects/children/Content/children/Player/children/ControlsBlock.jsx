import React from 'react';
import {
  PauseSVG, PlayBackSVG, PlayNextSVG, PlaySVG,
} from 'src/ui/media/images';

export const ControlsBlock = ({ mediaRef, isPlaying, setIsPlaying }) => {
  const seekUp = () => {
    if (mediaRef.current) {
      const { currentTime, duration } = mediaRef.current;
      const newTime = currentTime + 30;
      mediaRef.current.currentTime = Math.min(newTime, duration);
    }
  };

  const seekDown = () => {
    if (mediaRef.current) {
      const { currentTime } = mediaRef.current;
      const newTime = Math.max(currentTime - 30, 0);
      mediaRef.current.currentTime = newTime;
    }
  };

  const onVideoPlay = () => {
    if (isPlaying) {
      mediaRef.current.pause();
      setIsPlaying(false);
    } else {
      mediaRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="player__controls">
      <button type="button" className="player__button" onClick={seekDown}>
        <PlayBackSVG />
      </button>

      <button type="button" onClick={onVideoPlay} className="player__button">
        {!isPlaying ? <PlaySVG /> : <PauseSVG />}
      </button>

      <button type="button" className="player__button" onClick={seekUp}>
        <PlayNextSVG />
      </button>
    </div>
  );
};
