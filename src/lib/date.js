export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatTimestampRange = (startTimeMs, endTimeMs) => {
  const startTime = Math.round(startTimeMs / 1000);
  const endTime = Math.round(endTimeMs / 1000);

  const formattedStart = formatTime(startTime);
  const formattedEnd = formatTime(endTime);

  if (startTime === endTime) {
    return formattedStart;
  }
  return `${formattedStart}-${formattedEnd}`;
};

export const secondToMinute = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const convertMinutesToHoursAndMinutes = (minutes) => {
  const totalMinutes = Math.floor(minutes);
  const remainingMinutes = Math.round((minutes - totalMinutes) * 60);

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60 + remainingMinutes;

  return { hours, mins };
};