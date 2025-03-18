import { useUnit } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { THEMES } from 'src/dict/theme';
import { mergeBlurTimestamps } from 'src/lib/helpers';
import { isEmpty } from 'src/lib/lodash';
import { $theme } from 'src/models/Helpers/Theme';

export const Timestamps = ({
  timestamps, duration, dimensions,
}) => {
  const theme = useUnit($theme);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mergedTimestamps, setMergedTimestamps] = useState([]);

  useEffect(() => {
    setMergedTimestamps(
      !isEmpty(timestamps) ? mergeBlurTimestamps(timestamps).reverse() : [],
    );
  }, []);

  const { width } = dimensions;

  const getSegmentLeftPosition = (startTime) => (startTime / duration) * 100;

  const onMouseLeaveBeep = () => setHoveredIndex(null);

  return (
    !isEmpty(mergedTimestamps) && mergedTimestamps.map((group, index) => {
      const startTime = group[0].start_time;
      const leftPosition = getSegmentLeftPosition(startTime) * (width / 100);

      const onMouseEnterBeep = () => setHoveredIndex(index);

      if (width === 0) { return null; }

      return (
        <Group
          x={leftPosition}
          key={index}
          onMouseEnter={onMouseEnterBeep}
          onMouseLeave={onMouseLeaveBeep}
        >
          {hoveredIndex === index ? (
            <Group>
              <Rect
                x={16}
                width={100}
                height={32}
                stroke="#a282ef"
                strokeWidth={2}
                cornerRadius={[0, 8, 8, 0]}
                fill={theme === THEMES.DARK ? '#1c171d' : '#ffffff'}
              />
              <Text
                text="@#"
                y={4}
                fontSize={14}
                fontFamily="Inter, sans-serif"
                fill={theme === THEMES.DARK ? '#1c171d' : '#ffffff'}
                padding={5}
                align="center"
                verticalAlign="center"
              />
            </Group>
          ) : null}

          <Group>
            <Rect
              width={32}
              height={32}
              fill="#a282ef"
              stroke={theme === THEMES.DARK ? '#1c171d' : '#ffffff'}
              strokeWidth={1}
              cornerRadius={16}
            />
            <Text
              text="@#"
              y={4}
              fontSize={14}
              fontFamily="Inter, sans-serif"
              fill={theme === THEMES.DARK ? '#1c171d' : '#ffffff'}
              padding={5}
              align="center"
              verticalAlign="center"
            />
          </Group>
        </Group>
      );
    })
  );
};