import { COMQUEST_CLEAR_ERROR, COMQUEST_MAGIC_SYMBOL } from '../constants';
import { ComquestAction, ComquestActionTypes } from '../types';

export function createClearErrorAction(
  actionTypes: ComquestActionTypes
): () => ComquestAction {
  return () => ({
    type: actionTypes.CLEAR_ERROR,
    meta: {
      comquest: COMQUEST_MAGIC_SYMBOL,
      genericType: COMQUEST_CLEAR_ERROR,
      actionTypes,
    },
  });
}
