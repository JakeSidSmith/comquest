import { AxiosError } from 'axios';
import {
  ActionHandlers,
  ComquestActionTypes,
  ComquestFailureAction,
  ComquestRequestError,
} from '../types';
import { createReducerFromHandlers } from './create-reducer-from-handlers';

export function createComquestRequestErrorReducer<
  P = AxiosError,
  E = AxiosError
>(actionTypes: ComquestActionTypes) {
  const initialState: ComquestRequestError<P> = {};

  function handleFailure(
    _state: ComquestRequestError<P> | undefined,
    action: ComquestFailureAction<P, E>
  ): ComquestRequestError<P> {
    return {
      error: action.payload,
    };
  }

  function handleClear() {
    return {};
  }

  const handlers: ActionHandlers<ComquestRequestError<P>> = {
    [actionTypes.FAILURE]: handleFailure,
    [actionTypes.CLEAR_REQUEST_ERRORS]: handleClear,
  };

  return createReducerFromHandlers(handlers, initialState);
}
