import React from 'react';
import ReactDOM from 'react-dom';
import { useUnit } from 'effector-react';
import { isEmpty } from 'src/lib/lodash';
import { $modal } from 'src/models/Helpers/Modal';
import { MODAL_FIELDS } from 'src/dict/modal';

const { PROPS, CHILDREN } = MODAL_FIELDS;

export const Modal = ({ container }) => {
  const { [CHILDREN]: children, [PROPS]: props } = useUnit($modal);

  return !isEmpty(children) ? (
    ReactDOM.createPortal(
      React.createElement(children, { ...props }),
      isEmpty(container) ? document.body : container,
    )
  ) : null;
};