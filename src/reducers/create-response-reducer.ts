import { AxiosResponse } from 'axios';
import {
  ActionHandlers,
  ComquestActionTypes,
  ComquestResponse,
  ComquestSuccessAction,
} from '../types';
import { createReducerFromHandlers } from './create-reducer-from-handlers';

export function createResponseReducer<P = AxiosResponse, D = AxiosResponse>(
  actionTypes: ComquestActionTypes
) {
  const initialState: ComquestResponse<P> = {};

  function handleSuccess(
    _state: ComquestResponse<P> | undefined,
    action: ComquestSuccessAction<P, D>
  ): ComquestResponse<P> {
    return {
      response: action.payload,
    };
  }

  function handleClear() {
    return {};
  }

  const handlers: ActionHandlers<ComquestResponse<P>> = {
    [actionTypes.SUCCESS]: handleSuccess,
    [actionTypes.CLEAR_RESPONSE]: handleClear,
  };

  return createReducerFromHandlers(handlers, initialState);
}
