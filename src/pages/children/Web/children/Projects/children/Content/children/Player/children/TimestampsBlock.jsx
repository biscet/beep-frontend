import React, { useEffect, useState } from 'react';
import { formatTimestampRange } from 'src/lib/date';
import { mergeBlurTimestamps } from 'src/lib/helpers';
import { cx, isEmpty } from 'src/lib/lodash';

const onClickBeep = (e) => { e.stopPropagation(); };

export const TimestampsBlock = ({ timestamps, duration, handleSeek }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mergedTimestamps, setMergedTimestamps] = useState([]);

  useEffect(() => {
    setMergedTimestamps(
      !isEmpty(timestamps) ? mergeBlurTimestamps(timestamps) : [],
    );
  }, []);

  const getSegmentLeftPosition = (startTime) => (startTime / (duration * 1000)) * 100;

  const onMouseLeaveBeep = () => setHoveredIndex(null);

  return (
    <div className="track__timestamps-container">
      <div className="track__timestamps">
        {!isEmpty(mergedTimestamps) ? mergedTimestamps.map((group, index) => {
          const startTime = group[0].start_time;
          const styles = {
            left: `calc(${getSegmentLeftPosition(startTime)}%)`,
            zIndex: mergedTimestamps.length - index,
          };

          const onMouseEnterBeep = () => setHoveredIndex(index);

          return (
            <div
              key={`timestamp${index}`}
              className="timestamp"
              style={styles}
              onClick={onClickBeep}
              onMouseEnter={onMouseEnterBeep}
              onMouseLeave={onMouseLeaveBeep}
            >
              <span className="timestamp__beep">@#</span>

              {hoveredIndex === index && (
                <div className="timestamp__tooltip">
                  {group.map((timestamp, idx) => {
                    const time = formatTimestampRange(timestamp.start_time, timestamp.end_time);

                    const onTooltipClick = (e) => handleSeek(
                      timestamp.start_time > 0 ? (timestamp.start_time / 1000) : 0,
                      e,
                    );

                    return (
                      <React.Fragment key={`tooltip${idx}`}>
                        <div
                          onClick={onTooltipClick}
                          className={cx({
                            defaultClass: [
                              'timestamp__tooltip-range', 'tooltip-range',
                            ],
                            activeClass: 'tooltip-range__first-children',
                            condition: idx === 0,
                          })}
                        >
                          {time}
                        </div>
                        {group.length - 1 !== idx ? (
                          <span className="timestamp__tooltip-divider" />
                        ) : null}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }) : null}
      </div>
    </div>
  );
};