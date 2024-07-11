import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { htmlContainer } from 'src/dict/config';
import { $theme } from 'src/models/Helpers/Theme';

export const Theme = () => {
  const theme = useUnit($theme);

  useEffect(() => {
    htmlContainer.classList = [theme];
  }, [theme]);

  return null;
};
