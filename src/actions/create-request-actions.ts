import { AxiosRequestConfig } from 'axios';
import { ComquestActionTypes, ComquestRequestOptions } from '../types';
import { createComquestClearRequestDataAction } from './create-clear-request-data-action';
import { createComquestClearRequestErrorsAction } from './create-clear-request-errors-action';
import { createComquestRequestAction } from './create-request-action';
import { createComquestResetRequestStateAction } from './create-reset-request-state-action';

export function createComquestRequestActions<S, R>(
  actionTypes: ComquestActionTypes,
  config: AxiosRequestConfig,
  options: ComquestRequestOptions = {}
) {
  return {
    request: createComquestRequestAction<S, R>(actionTypes, config, options),
    clearRequestData: createComquestClearRequestDataAction(actionTypes),
    clearRequestErrors: createComquestClearRequestErrorsAction(actionTypes),
    resetRequestState: createComquestResetRequestStateAction(actionTypes),
  };
}
