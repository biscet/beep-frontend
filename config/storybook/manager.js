import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.dark,
  initialActive: 'sidebar',
  showPanel: true,
  panelPosition: 'right',
  showNav: true,
  enableShortcuts: true,
  isFullscreen: false,
  showToolbar: true,
});