import { COMQUEST_CLEAR_RESPONSE, COMQUEST_MAGIC_SYMBOL } from '../constants';
import { ComquestAction, ComquestActionTypes } from '../types';

export function createClearResponseAction(
  actionTypes: ComquestActionTypes
): () => ComquestAction {
  return () => ({
    type: actionTypes.CLEAR_RESPONSE,
    meta: {
      comquest: COMQUEST_MAGIC_SYMBOL,
      genericType: COMQUEST_CLEAR_RESPONSE,
      actionTypes,
    },
  });
}
