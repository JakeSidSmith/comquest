import { AxiosRequestConfig } from 'axios';
import { ComquestActionTypes, ComquestRequestOptions } from '../types';
import { createClearErrorAction } from './create-clear-error-action';
import { createClearResponseAction } from './create-clear-response-action';
import { createRequestAction } from './create-request-action';
import { createResetStateAction } from './create-reset-state-action';

export function createRequestActions<S, R>(
  actionTypes: ComquestActionTypes,
  config: AxiosRequestConfig,
  options: ComquestRequestOptions = {}
) {
  return {
    request: createRequestAction<S, R>(actionTypes, config, options),
    clearResponse: createClearResponseAction(actionTypes),
    clearError: createClearErrorAction(actionTypes),
    resetState: createResetStateAction(actionTypes),
  };
}
