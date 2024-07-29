import { MODAL_FIELDS } from 'src/dict/modal';
import { allDomain } from 'src/models/App';

const { PROPS, CHILDREN, IS_OPEN } = MODAL_FIELDS;

const modalDomain = allDomain.createDomain('Modal');

export const openModalFn = modalDomain.createEvent();
export const closeModalFn = modalDomain.createEvent();

export const $modal = modalDomain.createStore({ [PROPS]: null, [CHILDREN]: null, [IS_OPEN]: false });

export const $modalIsOpen = modalDomain.createStore(false);
