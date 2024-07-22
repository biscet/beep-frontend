import React from 'react';

export const LoaderSpinnerSVG = React.memo(({ className }) => (
  <svg viewBox="0 0 50 50" id="spinner" className={className}>
    <circle className="ring" cx="25" cy="25" r="22.5" />
    <circle className="line" cx="25" cy="25" r="22.5" />
  </svg>
));
