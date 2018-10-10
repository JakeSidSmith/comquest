import {
  COMQUEST_CLEAR_REQUEST_ERRORS,
  COMQUEST_MAGIC_SYMBOL,
} from '../constants';
import { ComquestAction, ComquestActionTypes } from '../types';

export function createComquestClearRequestErrorsAction(
  actionTypes: ComquestActionTypes
): () => ComquestAction {
  return () => ({
    type: actionTypes.CLEAR_REQUEST_ERRORS,
    meta: {
      comquest: COMQUEST_MAGIC_SYMBOL,
      comquestActionType: COMQUEST_CLEAR_REQUEST_ERRORS,
      comquestActionTypes: actionTypes,
    },
  });
}
