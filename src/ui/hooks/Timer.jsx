import { useEffect, useRef, useState } from 'react';
import { secondToMinute } from 'src/lib/date';

export const timerHook = (value) => {
  const [seconds, setSeconds] = useState(value);
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateSeconds = () => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    };

    intervalRef.current = setInterval(updateSeconds, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    setSeconds(value);
  }, [value]);

  return {
    time: seconds < 1 ? null : secondToMinute(seconds),
    seconds,
  };
};