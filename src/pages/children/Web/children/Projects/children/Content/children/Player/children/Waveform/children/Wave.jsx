/* eslint-disable no-plusplus */
import { useUnit } from 'effector-react';
import React from 'react';
import { Group, Rect } from 'react-konva';
import { THEMES } from 'src/dict/theme';
import { $theme } from 'src/models/Helpers/Theme';

export const Wave = ({
  peaks, dimensions, duration, currentTime,
}) => {
  const theme = useUnit($theme);

  if (!peaks || peaks.length === 0) return null;

  const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
  const { width, height } = dimensions;
  const halfHeight = Math.ceil(height / 2.8);
  const { length } = peaks;
  const barGap = 2 * pixelRatio;
  const barWidth = (width - 200) / length;
  const barRadius = 2;
  const barIndexScale = width / (barWidth + barGap) / length;

  const bars = [];
  let prevX = 0;
  let maxTop = 0;
  let maxBottom = 0;

  for (let i = 0; i <= length; i++) {
    const x = Math.round(i * barIndexScale);

    if (x > prevX) {
      const topBarHeight = Math.round(maxTop * halfHeight);
      const bottomBarHeight = Math.round(maxBottom * halfHeight);
      const barHeight = Math.max(topBarHeight + bottomBarHeight, 4);
      const y = halfHeight - topBarHeight;

      bars.push({
        x: prevX * (barWidth + barGap),
        y,
        width: barWidth,
        height: barHeight,
        cornerRadius: barRadius * 100,
      });

      prevX = x;
      maxTop = 0;
      maxBottom = 0;
    }

    const magnitudeTop = Math.abs(peaks[i] || 0);
    const magnitudeBottom = Math.abs(peaks[i] || 0);

    if (magnitudeTop > maxTop) maxTop = magnitudeTop;
    if (magnitudeBottom > maxBottom) maxBottom = magnitudeBottom;
  }

  const darkOverlayWidth = (currentTime / duration) * width;

  return (
    <Group>
      {bars.map((bar, index) => (
        <Rect
          key={index}
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={bar.height}
          fill="#a282ef"
          cornerRadius={bar.cornerRadius}
        />
      ))}

      {(width > 0) && (darkOverlayWidth > 0) ? (
        <Rect
          x={darkOverlayWidth}
          y={-20}
          width={width - darkOverlayWidth}
          height={height}
          fill={theme === THEMES.DARK ? 'rgba(28, 23, 29, 0.5)' : 'rgba(255, 255, 255, 0.5)'}
        />
      ) : null}
    </Group>

  );
};
