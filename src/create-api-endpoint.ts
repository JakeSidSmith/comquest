import { AxiosRequestConfig } from 'axios';
import { createComquestClearRequestDataAction } from './actions/create-clear-request-data-action';
import { createComquestClearRequestErrorsAction } from './actions/create-clear-request-errors-action';
import { createComquestRequestAction } from './actions/create-request-action';
import { createComquestResetRequestStateAction } from './actions/create-reset-request-state-action';
import {
  ComquestActionTypes,
  ComquestAPIEndpoint,
  ComquestRequestOptions,
} from './types';

export function createComquestAPIEndpoint<S, D>(
  actionTypes: ComquestActionTypes,
  config: Pick<AxiosRequestConfig, Exclude<keyof AxiosRequestConfig, 'method'>>,
  options: ComquestRequestOptions
): ComquestAPIEndpoint<S> {
  return {
    get: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'get' },
      options
    ),
    post: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'post' },
      options
    ),
    put: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'put' },
      options
    ),
    head: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'head' },
      options
    ),
    delete: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'delete' },
      options
    ),
    patch: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'patch' },
      options
    ),
    options: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'options' },
      options
    ),
    clearRequestData: createComquestClearRequestDataAction(actionTypes),
    clearRequestError: createComquestClearRequestErrorsAction(actionTypes),
    resetRequestState: createComquestResetRequestStateAction(actionTypes),
  };
}
