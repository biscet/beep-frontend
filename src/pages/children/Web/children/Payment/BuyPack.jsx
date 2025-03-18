import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $htmlEcquireContent } from 'src/models/Payment/Packs';
import { isEmpty } from 'src/lib/lodash';

export const BuyPack = () => {
  const htmlEcquireContent = useUnit($htmlEcquireContent);

  useEffect(() => {
    if (!isEmpty(htmlEcquireContent)) {
      document.open();
      document.write(htmlEcquireContent);
      document.close();
    }
  }, [htmlEcquireContent]);

  return null;
};