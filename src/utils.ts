import { COMQUEST_MAGIC_SYMBOL } from './constants';
import { ComquestAction } from './types';

export function isComquestAction(action: any): action is ComquestAction {
  return (
    action && action.meta && action.meta.comquest === COMQUEST_MAGIC_SYMBOL
  );
}
