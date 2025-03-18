import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { Wave } from './children/Wave';
// import { Timestamps } from './children/TimeStamps';

export const Waveform = ({ peaks, duration, currentTime }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    updateDimensions();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const { width, height } = dimensions;

  return (
    <div ref={containerRef} className="track__wave-container">
      <Stage width={width} height={height} className="track__wave">
        <Layer>
          <Wave
            peaks={peaks}
            dimensions={dimensions}
            duration={duration}
            currentTime={currentTime}
          />
          {/* <Timestamps
            duration={duration}
            timestamps={timestamps}
            handleSeek={handleSeek}
            dimensions={dimensions}
          /> */}
        </Layer>
      </Stage>
    </div>
  );
};
