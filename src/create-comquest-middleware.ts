import { AnyAction, MiddlewareAPI } from 'redux';
import { ComquestAction } from 'types';
import { ThunkAction, ThunkDispatch } from '../node_modules/redux-thunk';
import { isComquestAction } from './utils';

export function createComquestMiddleware<S>() {
  return function comquestMiddleware(
    _store: MiddlewareAPI<ThunkDispatch<S, undefined, AnyAction>, S>
  ) {
    return (next: ThunkDispatch<S, undefined, AnyAction>) => (
      action:
        | AnyAction
        | ComquestAction
        | ThunkAction<any, S, undefined, AnyAction>
    ) => {
      if (typeof action === 'function') {
        return next(action);
      }

      if (isComquestAction(action)) {
        return next(action);
      }
    };
  };
}
