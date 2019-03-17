import { AxiosError } from 'axios';
import {
  ActionHandlers,
  ComquestActionTypes,
  ComquestError,
  ComquestFailureAction,
} from '../types';
import { createReducerFromHandlers } from './create-reducer-from-handlers';

export function createErrorReducer<P = AxiosError, E = AxiosError>(
  actionTypes: ComquestActionTypes
) {
  const initialState: ComquestError<P> = {};

  function handleFailure(
    _state: ComquestError<P> | undefined,
    action: ComquestFailureAction<P, E>
  ): ComquestError<P> {
    return {
      error: action.payload,
    };
  }

  function handleClear() {
    return {};
  }

  const handlers: ActionHandlers<ComquestError<P>> = {
    [actionTypes.FAILURE]: handleFailure,
    [actionTypes.CLEAR_ERROR]: handleClear,
  };

  return createReducerFromHandlers(handlers, initialState);
}
