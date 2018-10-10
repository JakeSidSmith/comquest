import {
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_RESET_REQUEST_STATE,
} from '../constants';
import { ComquestAction, ComquestActionTypes } from '../types';

export function createComquestResetRequestStateAction(
  actionTypes: ComquestActionTypes
): () => ComquestAction {
  return () => ({
    type: actionTypes.RESET_REQUEST_STATE,
    meta: {
      comquest: COMQUEST_MAGIC_SYMBOL,
      comquestActionType: COMQUEST_RESET_REQUEST_STATE,
      comquestActionTypes: actionTypes,
    },
  });
}
