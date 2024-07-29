import { MODAL_FIELDS } from 'src/dict/modal';
import { sample } from 'effector';
import { $pathnameUrl } from 'src/models/App';
import {
  $modal, closeModalFn, openModalFn, $modalIsOpen,
} from '.';

const { PROPS, CHILDREN, IS_OPEN } = MODAL_FIELDS;

$modal
  .on(openModalFn, (_, modal) => ({
    [CHILDREN]: modal[CHILDREN],
    [PROPS]: { ...modal[PROPS], closeModalFn },
    [IS_OPEN]: true,
  }))
  .reset(closeModalFn);

sample({
  clock: $modal,
  source: $modal,
  fn: ({ [IS_OPEN]: isOpen }) => isOpen,
  target: $modalIsOpen,
});

sample({
  clock: $pathnameUrl,
  target: closeModalFn,
});