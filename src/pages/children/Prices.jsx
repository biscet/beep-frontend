import React from 'react';
import { LawyerFooter } from 'src/ui/components/Helpers';
import { FirstCardSVG, SecondCardSVG, ThirdCardSVG } from 'src/ui/media/images';
import { PaymentCard } from 'src/ui/components/Helpers/PaymentCard';
import { useUnit } from 'effector-react';
import { $pricesInfoForFrontCombineData } from 'src/models/Payment';
import {
  PRICE_INFO_FIELDS, PRICES_NAMES_FIELDS,
  PRICES_TEXTS_FIELDS,
} from 'src/dict/fields/models/payment';

const {
  QUANTITY, PRICE, TITLE, BODY,
} = PRICE_INFO_FIELDS;

export const Prices = () => {
  const {
    [PRICES_NAMES_FIELDS.TEN]: tenMinutesData,
    [PRICES_NAMES_FIELDS.SIXTY]: sixtyMinutesData,
    [PRICES_NAMES_FIELDS.HUNDRED]: hundredMinutesData,
  } = useUnit($pricesInfoForFrontCombineData);

  return (
    <div className="prices-page">
      <div className="prices-page__content">
        <PaymentCard
          title={PRICES_TEXTS_FIELDS[PRICES_NAMES_FIELDS.TEN][TITLE]}
          body={PRICES_TEXTS_FIELDS[PRICES_NAMES_FIELDS.TEN][BODY]}
          minutes={tenMinutesData[QUANTITY]}
          price={tenMinutesData[PRICE]}
          Icon={FirstCardSVG}
        />
        <PaymentCard
          title={PRICES_TEXTS_FIELDS[PRICES_NAMES_FIELDS.SIXTY][TITLE]}
          body={PRICES_TEXTS_FIELDS[PRICES_NAMES_FIELDS.SIXTY][BODY]}
          minutes={sixtyMinutesData[QUANTITY]}
          price={sixtyMinutesData[PRICE]}
          Icon={SecondCardSVG}
        />
        <PaymentCard
          title={PRICES_TEXTS_FIELDS[PRICES_NAMES_FIELDS.HUNDRED][TITLE]}
          body={PRICES_TEXTS_FIELDS[PRICES_NAMES_FIELDS.HUNDRED][BODY]}
          minutes={hundredMinutesData[QUANTITY]}
          price={hundredMinutesData[PRICE]}
          Icon={ThirdCardSVG}
        />

        <div className="prices-page__shape shape shape_one" />
        <div className="prices-page__shape shape shape_two" />
        <div className="prices-page__shape shape shape_three" />
      </div>

      <LawyerFooter defaultPage={false} />
    </div>
  );
};