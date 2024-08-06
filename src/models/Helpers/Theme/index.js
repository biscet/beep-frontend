import { crossTheme, THEME_FIELD } from 'src/dict/theme';
import { allDomain, AppGate } from 'src/models/App';
import { persist } from 'effector-storage/local';
import { themeContract } from 'src/lib/contracts';
import { trackMediaQuery } from '@withease/web-api';

const themeDomain = allDomain.createDomain('Theme');

export const changeThemeFn = themeDomain.createEvent();

export const $theme = themeDomain.createStore(crossTheme, { name: THEME_FIELD });

persist({ store: $theme, key: THEME_FIELD, contract: themeContract() });

const { $matches: $matchesTheme } = trackMediaQuery('(prefers-color-scheme: dark)', { setup: AppGate.open });
export { $matchesTheme };