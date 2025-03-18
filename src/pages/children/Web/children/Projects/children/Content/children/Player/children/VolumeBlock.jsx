import { createComponent } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'src/lib/lodash';
import { $playerVolume, setVolumeFn } from 'src/models/Web/Projects/Content';
import { VolumeSVG } from 'src/ui/media/images';

export const VolumeBlock = createComponent($playerVolume, ({ mediaRef }, playerVolume) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    if (!isEmpty(mediaRef) && mediaRef.current) {
      mediaRef.current.volume = playerVolume;
    }
  }, [mediaRef, playerVolume]);

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolumeFn(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
  };

  const onMouseEnterVolume = () => setShowVolumeSlider(true);
  const onMouseLeaveVolume = () => setShowVolumeSlider(false);

  return (
    <div className="player__volume">
      <button
        type="button"
        className="player__button"
        onMouseEnter={onMouseEnterVolume}
        onMouseLeave={onMouseLeaveVolume}
      >
        <VolumeSVG />
      </button>

      {showVolumeSlider ? (
        <div
          className="player__volume-range"
          onMouseEnter={onMouseEnterVolume}
          onMouseLeave={onMouseLeaveVolume}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={playerVolume}
            onChange={handleVolumeChange}
            className="custom-range"
          />
        </div>
      ) : null}
    </div>
  );
});
