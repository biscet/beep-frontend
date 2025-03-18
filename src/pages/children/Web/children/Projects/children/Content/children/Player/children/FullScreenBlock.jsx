import React, { useEffect, useState } from 'react';
import { CONTENT_PLAYER_TYPE_FIELDS } from 'src/dict/fields/models/projects';
import { FullScreenSVG } from 'src/ui/media/images';

const events = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'mozfullscreenchange',
  'MSFullscreenChange',
];

export const FullScreenBlock = ({ playerRef, type }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    events.forEach((event) => document.addEventListener(event, handleFullScreenChange));

    return () => {
      events.forEach((event) => document.removeEventListener(event, handleFullScreenChange));
    };
  }, []);

  const goFullScreen = () => {
    const requestFullscreen = playerRef.current.requestFullscreen
      || playerRef.current.mozRequestFullScreen
      || playerRef.current.webkitRequestFullscreen
      || playerRef.current.msRequestFullscreen;

    const exitFullscreen = document.exitFullscreen
      || document.mozCancelFullScreen
      || document.webkitExitFullscreen
      || document.msExitFullscreen;

    if (!isFullScreen && requestFullscreen) {
      requestFullscreen.call(playerRef.current);
    } else if (isFullScreen && exitFullscreen) {
      exitFullscreen.call(document);
    }
  };

  return CONTENT_PLAYER_TYPE_FIELDS.AUDIO !== type ? (
    <div className="player__full-screen">
      <button type="button" className="player__button" onClick={goFullScreen}>
        <FullScreenSVG />
      </button>
    </div>
  ) : <div />;
};