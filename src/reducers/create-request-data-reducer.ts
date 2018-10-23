import { AxiosResponse } from 'axios';
import {
  ActionHandlers,
  ComquestActionTypes,
  ComquestRequestData,
  ComquestSuccessAction,
} from '../types';
import { createReducerFromHandlers } from './create-reducer-from-handlers';

export function createComquestRequestDataReducer<
  P = AxiosResponse,
  D = AxiosResponse
>(actionTypes: ComquestActionTypes) {
  const initialState: ComquestRequestData<P> = {};

  function handleSuccess(
    _state: ComquestRequestData<P> | undefined,
    action: ComquestSuccessAction<P, D>
  ): ComquestRequestData<P> {
    return {
      data: action.payload,
    };
  }

  function handleClear() {
    return {};
  }

  const handlers: ActionHandlers<ComquestRequestData<P>> = {
    [actionTypes.SUCCESS]: handleSuccess,
    [actionTypes.CLEAR_REQUEST_DATA]: handleClear,
  };

  return createReducerFromHandlers(handlers, initialState);
}
