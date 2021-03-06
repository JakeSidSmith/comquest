import { AxiosError, AxiosResponse } from 'axios';
import { AnyAction, MiddlewareAPI } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  ComquestFailureAction,
  ComquestMiddlewareOptions,
  ComquestSuccessAction,
} from '../types';
import { isComquestFailureAction, isComquestSuccessAction } from '../utils';

export function createMiddleware<
  S,
  D = AxiosResponse,
  E = AxiosError,
  TD = D,
  TE = E
>(options: ComquestMiddlewareOptions<D, E, TD, TE>) {
  return function comquestMiddleware(
    _store: MiddlewareAPI<ThunkDispatch<S, undefined, AnyAction>, S>
  ) {
    return (next: ThunkDispatch<S, undefined, AnyAction>) => (
      action:
        | AnyAction
        | ComquestSuccessAction<D>
        | ComquestFailureAction<E>
        | ThunkAction<any, S, undefined, AnyAction>
    ) => {
      if (typeof action === 'function') {
        return next(action);
      }

      if (
        typeof options.transformResponse === 'function' &&
        isComquestSuccessAction<D>(action)
      ) {
        return next({
          ...action,
          payload: options.transformResponse(action.payload),
        });
      }

      if (
        typeof options.transformError === 'function' &&
        isComquestFailureAction<E>(action)
      ) {
        return next({
          ...action,
          payload: options.transformError(action.payload),
        });
      }

      return next(action);
    };
  };
}
