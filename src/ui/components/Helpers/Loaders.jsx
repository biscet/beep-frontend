import React from 'react';
import { createComponent } from 'effector-react';
import { $layoutLoader, $pagesLoader } from 'src/models/Helpers/Loader';
import { $theme } from 'src/models/Helpers/Theme';
import { THEMES } from 'src/dict/theme';

export const LoaderLayout = createComponent([$layoutLoader, $theme], (_, units) => {
  const [layoutLoader, theme] = units;

  return layoutLoader ? (
    <div className="loader-layout">
      <img
        className="loader-layout__gif"
        src={theme === THEMES.LIGHT ? '/images/stickman-dark.gif' : '/images/stickman-light.gif'}
        alt="get-beeped chunk loader"
      />
    </div>
  ) : null;
});

export const LoaderPages = createComponent([$pagesLoader, $theme], (_, units) => {
  const [pagesLoader, theme] = units;

  return pagesLoader ? (
    <div className="loader-pages">
      <img
        className="loader-pages__gif"
        src={theme === THEMES.LIGHT ? '/images/stickman-dark.gif' : '/images/stickman-light.gif'}
        alt="get-beeped chunk loader"
      />
    </div>
  ) : null;
});