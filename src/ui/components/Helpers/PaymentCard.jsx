import React, { useContext } from 'react';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { Button } from 'src/ui/components/Form';
import { I18nContext, ShimmerPaymentsButton, ShimmerPaymentsQuantity } from 'src/ui/components/Helpers';
import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse';
import { MOUSE_PARALLAX_CONTAINER_STYLE } from 'src/dict/config';
import { useUnit } from 'effector-react';
import {
  $isPricePage, getPaymentCardsInfoFx,
} from 'src/models/Payment';
import { goToLoginPageFn } from 'src/models/Login';
import { $isWebPaymentPage, $loadingEcqireId, paymentLogicTriggerFn } from 'src/models/Payment/Packs';
import { isEmpty } from 'src/lib/lodash';
import { LoaderSpinnerSVG } from 'src/ui/media/images';

export const PaymentCard = ({
  title, body, Icon, minutes, price, field,
}) => {
  const t = useContext(I18nContext);
  const [isPricesPage, loading, isWebPaymentPage, loadingEcqireId] = useUnit(
    [$isPricePage, getPaymentCardsInfoFx.pending, $isWebPaymentPage, $loadingEcqireId],
  );

  const onClick = () => {
    if (isPricesPage) {
      goToLoginPageFn();
    }

    if (isWebPaymentPage) {
      paymentLogicTriggerFn(field);
    }
  };

  return (
    <MouseParallaxContainer
      globalFactorX={0.05}
      globalFactorY={0.05}
      containerStyle={MOUSE_PARALLAX_CONTAINER_STYLE}
      className="card-payment"
    >
      <h3>{t(title)}</h3>
      <h4>{t(body)}</h4>

      <MouseParallaxChild
        factorX={0.5}
        factorY={0.5}
        className="card-payment__icon"
      >
        <Icon />
      </MouseParallaxChild>

      {loading ? <ShimmerPaymentsQuantity />
        : (
          <div className="card-payment__minutes">
            {t('Количество минут: ')}
            <span>{minutes}</span>
          </div>
        )}

      {loading ? <ShimmerPaymentsButton />
        : (
          <Button
            type={BUTTON_TYPES.BUTTON}
            onClick={onClick}
            disabled={price <= 0 || !isEmpty(loadingEcqireId)}
          >
            {!isEmpty(loadingEcqireId) && (field === loadingEcqireId)
              ? <LoaderSpinnerSVG />
              : t('Купить за {{value1}}₽', [price])}
          </Button>
        )}
    </MouseParallaxContainer>
  );
};