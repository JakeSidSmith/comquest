import {
  COMQUEST_CLEAR_REQUEST_DATA,
  COMQUEST_MAGIC_SYMBOL,
} from '../constants';
import { ComquestAction, ComquestActionTypes } from '../types';

export function createComquestClearRequestDataAction(
  actionTypes: ComquestActionTypes
): () => ComquestAction {
  return () => ({
    type: actionTypes.CLEAR_REQUEST_DATA,
    meta: {
      comquest: COMQUEST_MAGIC_SYMBOL,
      comquestActionType: COMQUEST_CLEAR_REQUEST_DATA,
      comquestActionTypes: actionTypes,
    },
  });
}
