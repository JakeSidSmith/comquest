import { COMQUEST_MAGIC_SYMBOL, COMQUEST_RESET_STATE } from '../constants';
import { ComquestAction, ComquestActionTypes } from '../types';

export function createResetStateAction(
  actionTypes: ComquestActionTypes
): () => ComquestAction {
  return () => ({
    type: actionTypes.RESET_STATE,
    meta: {
      comquest: COMQUEST_MAGIC_SYMBOL,
      genericType: COMQUEST_RESET_STATE,
      actionTypes,
    },
  });
}
