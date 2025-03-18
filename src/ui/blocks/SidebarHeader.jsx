/* eslint-disable unicorn/prefer-spread */
import { useUnit } from 'effector-react';
import React, { useRef, useState, useEffect } from 'react';
import { USER_FIELDS } from 'src/dict/fields/models/user';
import { $balances } from 'src/models/User';
import {
  LanguagePicker,
  ThemePicker, BreadCrumbs,
} from 'src/ui/components/Helpers';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { NavLink } from 'react-router-dom';
import Odometer from 'odometer';
import { isEmpty } from 'src/lib/lodash';
import { $openMobileSidebar, openMobileSidebarFn } from 'src/models/App';
import { prependFn } from 'src/lib/helpers';
import { $innerSizes } from 'src/models/Helpers/Resize';
import { BuySVG, MoneySVG } from '../media/images';

const OdometerField = ({ value, className }) => {
  const [odometer, setOdometer] = useState(null);

  const targetRef = useRef(null);

  const odometerValue = !isEmpty(value) ? value.toString().split('').map(Number) : null;

  useEffect(() => {
    if (!isEmpty(targetRef.current) && isEmpty(odometer)) {
      setOdometer(new Odometer({
        el: targetRef.current, value, format: '', duration: 100,
      }));
    }
  }, [targetRef]);

  useEffect(() => {
    if (!isEmpty(odometer)) {
      odometer.update(value);
    }
  }, [value, targetRef]);

  return (
    <>
      <div className={className} ref={targetRef} />
      {isEmpty(odometer) ? (
        <div className={className}>
          {!isEmpty(odometerValue) ? odometerValue.map(
            (num, i) => (
              <div
                className="balance__odometer-sceleton"
                key={i}
              >
                {num}
              </div>
            ),
          ) : null}
        </div>
      ) : null}
    </>
  );
};

const Balance = () => {
  const {
    [USER_FIELDS.BALANCE]: balance,
    [USER_FIELDS.FROZEN_BALANCE]: frozenBalance,
  } = useUnit($balances);

  return (
    <div className="sidebar-header__balance balance">
      <MoneySVG />

      <OdometerField value={balance} className="balance__general" />
      <span className="balance__general balance__divider">{' / '}</span>
      <OdometerField value={Math.abs(frozenBalance)} className="balance__frozen" />

      <NavLink to={`/${PAGES_PATH.WEB}/${WEB_PATH.PAYMENT}/${CRUD_PATH.PACKS}`} className="balance__buy-time">
        <BuySVG />
      </NavLink>
    </div>
  );
};

export const SidebarHeader = () => {
  const [openMobileSidebar, { width }] = useUnit([$openMobileSidebar, $innerSizes]);

  return width < 1281 ? (
    <div className="sidebar-header">
      <div className="sidebar-header__top-side">
        <div
          className="sidebar-header__burger"
          onClick={prependFn(openMobileSidebarFn, !openMobileSidebar)}
        >
          <span />
          <span />
          <span />
        </div>

        <Balance />
      </div>

      <div className="sidebar-header__bottom-side">
        <BreadCrumbs />
      </div>
    </div>
  ) : (
    <div className="sidebar-header">
      <BreadCrumbs />

      <div className="sidebar-header__right-side">
        <ThemePicker />
        <LanguagePicker abrvLeftSide={false} />
        <Balance />
      </div>
    </div>
  );
};