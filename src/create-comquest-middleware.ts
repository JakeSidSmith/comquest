import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { ThunkAction, ThunkDispatch } from '../node_modules/redux-thunk';
import { COMQUEST_MAGIC_SYMBOL } from './constants';

export function createComquestMiddleware<S>() {
  return function comquestMiddleware(
    _store: MiddlewareAPI<ThunkDispatch<S, undefined, AnyAction>, S>
  ) {
    return (next: ThunkDispatch<S, undefined, AnyAction>) => (
      action: AnyAction | ThunkAction<any, S, undefined, AnyAction>
    ) => {
      if (typeof action === 'function') {
        return next(action);
      }

      if (
        typeof action.meta !== 'object' ||
        typeof action.meta.comquest !== 'symbol' ||
        action.meta.comquest !== COMQUEST_MAGIC_SYMBOL
      ) {
        return next(action);
      }
    };
  };
}
